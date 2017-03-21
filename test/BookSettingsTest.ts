import { expect } from "chai";
import { stub } from "sinon";

import BookSettings from "../src/BookSettings";
import { OfflineStatus } from "../src/BookSettings";
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
        public bookElement: Element;
        public sideMargin: number;
        public constructor(id: number, name: string, label: string) {
            this.id = id;
            this.name = name;
            this.label = label;
        }
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
        settings = await BookSettings.create(store, [view1, view2], [12, 14, 16]);
    });

    describe("#create", () => {
        it("obtains the selected view from the store", async () => {
            await store.set("settings-selected-view", view2.name);
            settings = await BookSettings.create(store, [view1, view2], []);
            expect(settings.getSelectedView()).to.equal(view2);
        });

        it("sets the selected view to the first view if there's no selected view in the store", () => {
            expect(settings.getSelectedView()).to.equal(view1);
        });

        it("obtains the selected font size from the store", async () => {
            await store.set("settings-selected-font-size", "18px");
            settings = await BookSettings.create(store, [view1, view2], [12, 14, 16, 18]);
            expect(settings.getSelectedFontSize()).to.equal("18px");
        });

        it("sets the selected font size to the default if the selected font size in the store isn't one of the options", async () => {
            await store.set("settings-selected-font-size", "12345px");
            settings = await BookSettings.create(store, [view1, view2], [12, 14, 16, 18], 18);
            expect(settings.getSelectedFontSize()).to.equal("18px");
        });

        it("sets the selected font size to the default if there's no selected font size in the store", async () => {
            settings = await BookSettings.create(store, [view1, view2], [14, 16], 14);
            expect(settings.getSelectedFontSize()).to.equal("14px");
        });

        it("sets the selected font size to the middle font size if the default isn't one of the options", async () => {
            settings = await BookSettings.create(store, [view1, view2], [14, 16], 12345);
            expect(settings.getSelectedFontSize()).to.equal("16px");
        });

        it("sets the selected font size to the middle font size (rounded up) if there's no default and no selected font size in the store", async () => {
            expect(settings.getSelectedFontSize()).to.equal("14px");

            settings = await BookSettings.create(store, [view1, view2], [12, 14]);
            expect(settings.getSelectedFontSize()).to.equal("14px");

            settings = await BookSettings.create(store, [view1, view2], [10, 12, 14, 16]);
            expect(settings.getSelectedFontSize()).to.equal("14px");
        });

        it("obtains the selected offline setting from the store", async () => {
            await store.set("settings-offline-enabled", "true");
            settings = await BookSettings.create(store, [view1], [12]);
            expect(settings.getOfflineStatus()).to.equal(OfflineStatus.Enabled);

            await store.set("settings-offline-enabled", "false");
            settings = await BookSettings.create(store, [view1], [12]);
            expect(settings.getOfflineStatus()).to.equal(OfflineStatus.Disabled);
        });

        it("has no offline selection if there isn't one in the store", async () => {
            expect(settings.getOfflineStatus()).to.equal(OfflineStatus.NoSelection);
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

            settings = await BookSettings.create(store, [view1], [12]);
            settings.renderControls(element);
            view1Link = element.querySelector("a[class='view1 active']") as HTMLAnchorElement;
            expect(view1Link).to.be.null;
            view2Link = element.querySelector("a[class=view2]") as HTMLAnchorElement;
            expect(view2Link).to.be.null;

            settings = await BookSettings.create(store, [], [12]);
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

        it("renders font size increase and decrease links", async () => {
            const element = document.createElement("div");
            settings.renderControls(element);

            let decreaseLink = element.querySelector("a[class='decrease']") as HTMLAnchorElement;
            expect(decreaseLink.text).to.contain("Decrease");
            let increaseLink = element.querySelector("a[class=increase]") as HTMLAnchorElement;
            expect(increaseLink.text).to.contain("Increase");

            // If there's no font size or only one font size, font size controls don't show up in settings.

            settings = await BookSettings.create(store, [view1], [12]);
            settings.renderControls(element);
            decreaseLink = element.querySelector("a[class='decrease']") as HTMLAnchorElement;
            expect(decreaseLink).to.be.null;
            increaseLink = element.querySelector("a[class=increase]") as HTMLAnchorElement;
            expect(increaseLink).to.be.null;

            settings = await BookSettings.create(store, [view1], []);
            settings.renderControls(element);
            decreaseLink = element.querySelector("a[class='decrease']") as HTMLAnchorElement;
            expect(decreaseLink).to.be.null;
            increaseLink = element.querySelector("a[class=increase]") as HTMLAnchorElement;
            expect(increaseLink).to.be.null;
        });

        it("decreases and increases font size", async () => {
            const element = document.createElement("div");
            settings.renderControls(element);

            const decreaseLink = element.querySelector("a[class=decrease]") as HTMLAnchorElement;
            const increaseLink = element.querySelector("a[class=increase]") as HTMLAnchorElement;

            expect(settings.getSelectedFontSize()).to.equal("14px");

            click(decreaseLink);
            await pause();
            expect(settings.getSelectedFontSize()).to.equal("12px");
            let storedFontSize = await store.get("settings-selected-font-size");
            expect(storedFontSize).to.equal("12px");

            // The decrease link is now disabled because the size can't be decreased more.
            expect(decreaseLink.className).to.contain("disabled");
            expect(increaseLink.className).not.to.contain("disabled");

            // Clicking the decrease link again does nothing.
            click(decreaseLink);
            await pause();
            expect(settings.getSelectedFontSize()).to.equal("12px");
            storedFontSize = await store.get("settings-selected-font-size");
            expect(storedFontSize).to.equal("12px");

            click(increaseLink);
            await pause();
            expect(settings.getSelectedFontSize()).to.equal("14px");
            storedFontSize = await store.get("settings-selected-font-size");
            expect(storedFontSize).to.equal("14px");

            expect(decreaseLink.className).not.to.contain("disabled");
            expect(increaseLink.className).not.to.contain("disabled");

            click(increaseLink);
            await pause();
            expect(settings.getSelectedFontSize()).to.equal("16px");
            storedFontSize = await store.get("settings-selected-font-size");
            expect(storedFontSize).to.equal("16px");

            expect(decreaseLink.className).not.to.contain("disabled");
            expect(increaseLink.className).to.contain("disabled");

            // Clicking the increase link again does nothing.
            click(increaseLink);
            await pause();
            expect(settings.getSelectedFontSize()).to.equal("16px");
            storedFontSize = await store.get("settings-selected-font-size");
            expect(storedFontSize).to.equal("16px");
        });

        it("renders offline link and status", async () => {
            const element = document.createElement("div");
            settings.renderControls(element);

            let offlineLink = element.querySelector("a[class='enable-offline']") as HTMLAnchorElement;
            expect(offlineLink.text).to.contain("Download");
            expect(offlineLink.text).to.contain("offline use");
            expect(offlineLink.style.display).not.to.equal("none");

            let offlineStatus = element.querySelector("div[class='offline-status']") as HTMLDivElement;
            expect(offlineStatus).not.to.be.null;

            click(offlineLink);
            await pause();
            expect(settings.getOfflineStatus()).to.equal(OfflineStatus.Enabled);

            const storedOfflineEnabled = await store.get("settings-offline-enabled");
            expect(storedOfflineEnabled).to.equal("true");

            store.set("settings-offline-enabled", "true");
            settings = await BookSettings.create(store, [view1], [12]);
            settings.renderControls(element);

            offlineLink = element.querySelector("a[class='enable-offline']") as HTMLAnchorElement;
            expect(offlineLink.style.display).to.equal("none");

            offlineStatus = element.querySelector("div[class='offline-status']") as HTMLDivElement;
            expect(offlineStatus).not.to.be.null;
        });

        it("blocks click events for container element when something in the ul is clicked", () => {
            let clickEventTriggered: boolean = false;
            const element = document.createElement("div");
            element.addEventListener("click", () => {
                clickEventTriggered = true;
            });

            settings.renderControls(element);
            const increaseLink = element.querySelector("a[class=increase]") as HTMLAnchorElement;
            click(increaseLink);
            expect(clickEventTriggered).to.equal(false);

            const ul = element.querySelector("ul") as HTMLUListElement;
            click(ul);
            expect(clickEventTriggered).to.equal(false);

            click(element);
            expect(clickEventTriggered).to.equal(true);
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

    describe("#onFontSizeChange", () => {
        it("sets up font change callback", async () => {
            const element = document.createElement("div");
            settings.renderControls(element);

            const fontSizeChanged = stub();
            settings.onFontSizeChange(fontSizeChanged);

            const decreaseLink = element.querySelector("a[class=decrease]") as HTMLAnchorElement;
            const increaseLink = element.querySelector("a[class=increase]") as HTMLAnchorElement;

            click(decreaseLink);
            await pause();
            expect(fontSizeChanged.callCount).to.equal(1);

            click(increaseLink);
            await pause();
            expect(fontSizeChanged.callCount).to.equal(2);
        });
    });

    describe("#onOfflineEnabled", () => {
        it("sets up offline enabled callback", async () => {
            const element = document.createElement("div");
            settings.renderControls(element);

            const offlineEnabled = stub();
            settings.onOfflineEnabled(offlineEnabled);

            const offlineLink = element.querySelector("a[class='enable-offline']") as HTMLAnchorElement;
            click(offlineLink);
            await pause();
            expect(offlineEnabled.callCount).to.equal(1);
        });
    });

    describe("#askUserToEnableOfflineUse", () => {
        it("sets offline status based on user's response", async () => {
            const offlineEnabled = stub();
            settings.onOfflineEnabled(offlineEnabled);

            const element = document.createElement("div");
            settings.renderControls(element);

            const confirmStub = stub(window, "confirm").returns(true);
            await settings.askUserToEnableOfflineUse();
            expect(settings.getOfflineStatus()).to.equal(OfflineStatus.Enabled);
            let storedSetting = await store.get("settings-offline-enabled");
            expect(storedSetting).to.equal("true");
            let offlineLink = element.querySelector("a[class='enable-offline']") as HTMLAnchorElement;
            expect(offlineLink.style.display).to.equal("none");
            expect(offlineEnabled.callCount).to.equal(1);

            confirmStub.returns(false);
            await settings.askUserToEnableOfflineUse();
            expect(settings.getOfflineStatus()).to.equal(OfflineStatus.Disabled);
            storedSetting = await store.get("settings-offline-enabled");
            expect(storedSetting).to.equal("false");
            expect(offlineLink.style.display).not.to.equal("none");
            expect(offlineEnabled.callCount).to.equal(1);
        });
    });
});