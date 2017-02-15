interface Store {
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<void>;
}

export default Store;