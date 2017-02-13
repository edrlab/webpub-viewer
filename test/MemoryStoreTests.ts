import { expect } from "chai";

import MemoryStore from "../src/MemoryStore";

describe("MemoryStore", () => {
    let store: MemoryStore;

    beforeEach(() => {
        store = new MemoryStore();
    });

    it("gets and sets", async () => {
        // #get returns null for a value that has not been set.
        let value = await store.get("key");
        expect(value).to.equal(null);

        await store.set("key", "value");
        value = await store.get("key");
        expect(value).to.equal("value");
    });
});