import { expect } from "chai";
import { stub } from "sinon";

import LocalStorageAnnotator from "../src/LocalStorageAnnotator";

describe("LocalStorageAnnotator", () => {
    let annotator: LocalStorageAnnotator;
    let getItem: Sinon.SinonStub;
    let setItem: Sinon.SinonStub;

    let mockLocalStorageAPI = (val?: string) => {
        getItem = stub().returns(val);
        setItem = stub();
        (window as any).localStorage = ({
            getItem: getItem,
            setItem: setItem
        } as any);
    };

    beforeEach(() => {
        annotator = new LocalStorageAnnotator();
        annotator.start("http://example.com/manifest.json");
    });

    describe("#getLastReadingPosition", async () => {
        const storedPosition = { locator: "could be anything" };
        mockLocalStorageAPI(JSON.stringify(storedPosition));

        const retrievedPosition = await annotator.getLastReadingPosition();
        expect(retrievedPosition).to.deep.equal(storedPosition);
        expect(getItem.callCount).to.equal(1);
    });

    describe("#saveLastReadingPosition", async () => {
        const position = { locator: "could be anything" };

        await annotator.saveLastReadingPosition(position);

        expect(setItem.callCount).to.equal(1);
        expect(setItem.args[0][0]).to.deep.equal(position);
    });
});