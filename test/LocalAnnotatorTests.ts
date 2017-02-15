import { expect } from "chai";

import LocalAnnotator from "../src/LocalAnnotator";
import MemoryStore from "../src/MemoryStore";

describe("LocalAnnotator", () => {
    let annotator: LocalAnnotator;
    let store: MemoryStore;

    beforeEach(() => {
        store = new MemoryStore();
        annotator = new LocalAnnotator(store);
    });

    describe("#getLastReadingPosition", async () => {
        const storedPosition = { locator: "could be anything" };
        const key = "http://example.com/manifest.json-last-reading-position";
        await store.set(key, JSON.stringify(storedPosition));

        const retrievedPosition = await annotator.getLastReadingPosition();
        expect(retrievedPosition).to.deep.equal(storedPosition);
    });

    describe("#saveLastReadingPosition", async () => {
        const position = { locator: "could be anything" };

        await annotator.saveLastReadingPosition(position);

        const key = "http://example.com/manifest.json-last-reading-position";
        const savedPosition = store.get(key);
        expect(savedPosition).to.equal(JSON.stringify(position));
    });
});