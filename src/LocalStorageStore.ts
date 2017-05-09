import Store from "./Store";
import MemoryStore from "./MemoryStore";

export interface LocalStorageStoreConfig {
    /** String to prepend to keys in localStorage. If the same prefix is shared
        across LocalStorageStores on the same domain, they will have the same
        value for each key. */
    prefix: string;
}

/** Class that stores key/value pairs in localStorage if possible
    but falls back to an in-memory store. */
export default class LocalStorageStore implements Store {
    private fallbackStore: MemoryStore | null;
    private prefix: string;
    
    public constructor(config: LocalStorageStoreConfig) {
        this.prefix = config.prefix;
        try {
            // In some browsers (eg iOS Safari in private mode), 
            // localStorage exists but throws an exception when
            // you try to write to it.
            const testKey = config.prefix + "-" + String(Math.random());
            window.localStorage.setItem(testKey, "test");
            window.localStorage.removeItem(testKey);
            this.fallbackStore = null;
        } catch (e) {
            this.fallbackStore = new MemoryStore();
        }
    }

    private getLocalStorageKey(key: string): string {
        return this.prefix + "-" + key;
    }

    public async get(key: string): Promise<string | null> {
        let value: string | null = null;
        if (!this.fallbackStore) {
            value = window.localStorage.getItem(this.getLocalStorageKey(key));
        } else {
            value = await this.fallbackStore.get(key);
        }
        return new Promise<string | null>(resolve => resolve(value));
    }

    public async set(key: string, value: string): Promise<void> {
        if (!this.fallbackStore) {
            window.localStorage.setItem(this.getLocalStorageKey(key), value);
        } else {
            await this.fallbackStore.set(key, value);
        }
        return new Promise<void>(resolve => resolve());
    }
}