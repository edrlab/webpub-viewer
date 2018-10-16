import { expect } from "chai";
import { stub } from "sinon";

import LocalStorageStore from "../src/LocalStorageStore";

describe("LocalStorageStore", () => {
    let store: LocalStorageStore;
    let getItem: sinon.SinonStub;
    let setItem: sinon.SinonStub;

    let mockLocalStorageAPI = () => {
        (window as any).localStorage = ({
            getItem: getItem,
            setItem: setItem,
            removeItem: stub()
        } as any);
    };

    beforeEach(() => {
        getItem = stub();
        setItem = stub();
    });

    it("falls back to memory store if localStorage is not available", async () => {
        store = new LocalStorageStore({ prefix: "prefix" });

        // #get returns null for a value that has not been set.
        let value = await store.get("key");
        expect(value).to.equal(null);

        await store.set("key", "value");
        value = await store.get("key");
        expect(value).to.equal("value");
    });

    it("uses localStorage if available, and adds manifest url to keys", async () => {
        mockLocalStorageAPI();

        store = new LocalStorageStore({ prefix: "prefix" });

        getItem.returns(null);

        expect(getItem.callCount).to.equal(0);
        // store.start tested setItem to check availability.
        expect(setItem.callCount).to.equal(1);

        // #get returns null for a value that has not been set.
        let value = await store.get("key");
        expect(getItem.callCount).to.equal(1);
        expect(getItem.args[0][0]).to.equal("prefix-key");
        expect(value).to.equal(null);

        await store.set("key", "value");
        expect(setItem.callCount).to.equal(2);
        expect(setItem.args[1][0]).to.equal("prefix-key");
        expect(setItem.args[1][1]).to.equal("value");

        getItem.returns("value");
        value = await store.get("key");
        expect(value).to.equal("value");
        expect(getItem.callCount).to.equal(2);
        expect(getItem.args[1][0]).to.equal("prefix-key");
    });
});