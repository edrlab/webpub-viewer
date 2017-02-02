import Store from "./Store";
import MemoryStore from "./MemoryStore";

/** Class that stores key/value pairs in localStorage if possible
    but falls back to an in-memory store. */
export default class LocalStorageStore implements Store {
    private enabled: boolean;
    private memoryStore: MemoryStore | null;
    
    public constructor() {}

    public async start(): Promise<void> {
        try {
            // In some browsers (eg iOS Safari in private mode), 
            // localStorage exists but throws an exception when
            // you try to write to it.
            window.localStorage.setItem("test", "test");
            window.localStorage.removeItem("test");
            this.enabled = true;
        } catch (e) {
            this.enabled = false;
            this.memoryStore = new MemoryStore();
            await this.memoryStore.start();
        }
        return new Promise<void>(resolve => resolve());
    }

    public async get(key: string): Promise<string | null> {
        let value: string | null = null;
        if (this.enabled) {
            value = window.localStorage.getItem(key);
        }
        if (this.memoryStore) {
            value = await this.memoryStore.get(key);
        }
        return new Promise<string | null>(resolve => resolve(value));
    }

    public async set(key: string, value: string): Promise<void> {
        if (this.enabled) {
            window.localStorage.setItem(key, value);
        }
        if (this.memoryStore) {
            await this.memoryStore.set(key, value);
        }
        return new Promise<void>(resolve => resolve());
    }
}