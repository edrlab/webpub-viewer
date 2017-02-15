import { expect } from "chai";
import { stub } from "sinon";

import BookSettings from "../src/BookSettings";
import BookView from "../src/BookView";
import MemoryStore from "../src/MemoryStore";

describe("BookSettings", () => {
    let start: Sinon.SinonStub;
    let stop: Sinon.SinonStub;
    let getCurrentPosition: Sinon.SinonStub;
    let goToPosition: Sinon.SinonStub;

    class MockBookView implements BookView {
        public id: number;
        public name: string;
        public label: string;
        public constructor(id: number, name: string, label: string) {
            this.id = id;
            this.name = name;
            this.label = label;
        }
        public setBookElement() {}
        public setTopMargin() {}
        public start(position: number) {
            start(this.id, position);
        }
        public stop() {
            stop(this.id);
        }
        public getCurrentPosition() {
            return getCurrentPosition(this.id);
        }
        public goToPosition(position: number) {
            goToPosition(this.id, position);
        }
    }

    let view1: MockBookView;
    let view2: MockBookView;
    let store: MemoryStore;
    let settings: BookSettings;

    const click = (element: any) => {
        const event = document.createEvent("HTMLEvents");
        event.initEvent("click", false, true);
        element.dispatchEvent(event);
    };

    const pause = (ms = 0): Promise<void> => {
        return new Promise<void>(resolve => setTimeout(resolve, ms));
    };

    beforeEach(async () => {
        start = stub();
        stop = stub();
        getCurrentPosition = stub().returns(0);
        goToPosition = stub();

        view1 = new MockBookView(1, "view1", "View 1");
        view2 = new MockBookView(2, "view2", "View 2");

        store = new MemoryStore();
        settings = await BookSettings.create([view1, view2], store);
    });

    describe("#create", () => {
        it("obtains the selected view from the store", async () => {
            await store.set("settings-selected-view", view2.name);
            settings = await BookSettings.create([view1, view2], store);
            expect(settings.getSelectedView()).to.equal(view2);
        });

        it("sets the selected view to the first view if there's no selected view in the store", () => {
            expect(settings.getSelectedView()).to.equal(view1);
        });
    });

    describe("#renderControls", () => {
        it("renders a link for each view", async () => {
            const element = document.createElement("div");
            settings.renderControls(element);

            let view1Link = element.querySelector("a[class='view1 active']") as HTMLAnchorElement;
            expect(view1Link.text).to.equal("View 1");
            let view2Link = element.querySelector("a[class=view2]") as HTMLAnchorElement;
            expect(view2Link.text).to.equal("View 2");

            // If there's no views or only 1 view, views don't show up in the settings.

            settings = await BookSettings.create([view1], store);
            settings.renderControls(element);
            view1Link = element.querySelector("a[class='view1 active']") as HTMLAnchorElement;
            expect(view1Link).to.be.null;
            view2Link = element.querySelector("a[class=view2]") as HTMLAnchorElement;
            expect(view2Link).to.be.null;

            settings = await BookSettings.create([], store);
            settings.renderControls(element);
            view1Link = element.querySelector("a[class='view1 active']") as HTMLAnchorElement;
            expect(view1Link).to.be.null;
        });

        it("changes view when a view link is clicked", async () => {
            const element = document.createElement("div");
            settings.renderControls(element);

            const view1Link = element.querySelector("a[class='view1 active']") as HTMLAnchorElement;
            const view2Link = element.querySelector("a[class=view2]") as HTMLAnchorElement;

            click(view2Link);
            await pause();

            expect(getCurrentPosition.callCount).to.equal(1);
            expect(getCurrentPosition.args[0][0]).to.equal(1);

            expect(stop.callCount).to.equal(1);
            expect(stop.args[0][0]).to.equal(1);

            expect(start.callCount).to.equal(1);
            expect(start.args[0][0]).to.equal(2);

            expect(settings.getSelectedView()).to.equal(view2);
            let storedView = await store.get("settings-selected-view")
            expect(storedView).to.equal(view2.name);

            expect(view1Link.className).not.to.contain("active");
            expect(view2Link.className).to.contain("active");

            click(view1Link);
            await pause();

            expect(getCurrentPosition.callCount).to.equal(2);
            expect(getCurrentPosition.args[1][0]).to.equal(2);

            expect(stop.callCount).to.equal(2);
            expect(stop.args[1][0]).to.equal(2);

            expect(start.callCount).to.equal(2);
            expect(start.args[1][0]).to.equal(1);

            expect(settings.getSelectedView()).to.equal(view1);
            storedView = await store.get("settings-selected-view")
            expect(storedView).to.equal(view1.name);

            expect(view1Link.className).to.contain("active");
            expect(view2Link.className).not.to.contain("active");
        });
    });

    describe("#onViewChange", () => {
        it("sets up view change callback", async () => {
            const element = document.createElement("div");
            settings.renderControls(element);

            const viewChanged = stub();
            settings.onViewChange(viewChanged);

            const view1Link = element.querySelector("a[class='view1 active']") as HTMLAnchorElement;
            const view2Link = element.querySelector("a[class=view2]") as HTMLAnchorElement;

            click(view2Link);
            await pause();
            expect(viewChanged.callCount).to.equal(1);

            click(view1Link);
            await pause();
            expect(viewChanged.callCount).to.equal(2);
        });
    });
});