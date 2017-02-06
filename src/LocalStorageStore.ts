import Store from "./Store";
import MemoryStore from "./MemoryStore";

/** Class that stores key/value pairs in localStorage if possible
    but falls back to an in-memory store. */
export default class LocalStorageStore implements Store {
    private fallbackStore: MemoryStore | null;
    private manifestUrl: string;
    
    public constructor() {}

    public async start(manifestUrl: string): Promise<void> {
        this.manifestUrl = manifestUrl;
        try {
            // In some browsers (eg iOS Safari in private mode), 
            // localStorage exists but throws an exception when
            // you try to write to it.
            window.localStorage.setItem("test", "test");
            window.localStorage.removeItem("test");
            this.fallbackStore = null;
        } catch (e) {
            this.fallbackStore = new MemoryStore();
            await this.fallbackStore.start();
        }
        return new Promise<void>(resolve => resolve());
    }

    private getLocalStorageKey(key: string): string {
        return this.manifestUrl + "-" + key;
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