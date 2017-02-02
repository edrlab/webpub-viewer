interface Store {
    start(): Promise<void>;
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<void>;
}

export default Store;