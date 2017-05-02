import { expect } from "chai";
import { stub } from "sinon";
import * as jsdom from "jsdom";

import IFrameNavigator from "../src/IFrameNavigator";
import Store from "../src/Store";
import Cacher from "../src/Cacher";
import { CacheStatus } from "../src/Cacher";
import PaginatedBookView from "../src/PaginatedBookView";
import ScrollingBookView from "../src/ScrollingBookView";
import Annotator from "../src/Annotator";
import Manifest from "../src/Manifest";
import BookSettings from "../src/BookSettings";
import MemoryStore from "../src/MemoryStore";
import EventHandler from "../src/EventHandler";

describe("IFrameNavigator", () => {
    let store: Store;

    let enable: Sinon.SinonStub;
    let onStatusUpdate: Sinon.SinonStub;
    let getStatus: Sinon.SinonStub;
    let cacher: Cacher;

    let paginatorStart: Sinon.SinonStub;
    let onFirstPage: Sinon.SinonStub;
    let onLastPage: Sinon.SinonStub;
    let goToPreviousPage: Sinon.SinonStub;
    let goToNextPage: Sinon.SinonStub;
    let paginatorGoToPosition: Sinon.SinonStub;
    let paginatorGoToElement: Sinon.SinonStub;
    let paginatorCurrentPage: number;
    let paginator: PaginatedBookView;

    let scrollerStart: Sinon.SinonStub;
    let scrollerAtBottom: Sinon.SinonStub;
    let scroller: ScrollingBookView;

    let getLastReadingPosition: Sinon.SinonStub;
    let saveLastReadingPosition: Sinon.SinonStub;
    let annotator: Annotator;

    let offlineStatusElement: HTMLElement;
    let renderControls: Sinon.SinonStub;
    let onViewChange: Sinon.SinonStub;
    let onFontSizeChange: Sinon.SinonStub;
    let getSelectedView: Sinon.SinonStub;
    let getSelectedFontSize: Sinon.SinonStub;
    let getOfflineStatusElement: Sinon.SinonStub;
    let settings: BookSettings;

    let setupEvents: Sinon.SinonStub;
    let eventHandler: EventHandler;

    let element: HTMLElement;
    let navigator: IFrameNavigator;

    class MockCacher implements Cacher {
        public enable() {
            return enable();
        }
        public onStatusUpdate(callback: (status: CacheStatus) => void) {
            return onStatusUpdate(callback);
        }

        public getStatus(): CacheStatus {
            return getStatus();
        }
    }

    class MockPaginator implements PaginatedBookView {
        public name = "mock";
        public label = "mock";
        public bookElement: Element;
        public sideMargin: number;
        public height: number;
        public start(position: number) {
            paginatorStart(position);
        }
        public stop() {}
        public getCurrentPosition() {
            return 0.25;
        }
        public getCurrentPage() {
            return paginatorCurrentPage;
        }
        public getPageCount() {
            return 8;
        }
        public onFirstPage() {
            return onFirstPage();
        }
        public onLastPage() {
            return onLastPage();
        }
        public goToPreviousPage() {
            goToPreviousPage();
        }
        public goToNextPage() {
            goToNextPage();
        }
        public goToPosition(position: number) {
            paginatorGoToPosition(position);
        }
        public goToElement(elementId: string) {
            paginatorGoToElement(elementId);
        }
    }

    class MockScroller extends ScrollingBookView {
        public bookElement: HTMLIFrameElement;
        public sideMargin: number;
        public start(position: number) {
            scrollerStart(position);
        }
        public getCurrentPosition() {
            return 0.25;
        }
        public atBottom() {
            return scrollerAtBottom();
        }
    }

    class MockAnnotator implements Annotator {
        public start() {
            return new Promise<void>(resolve => resolve());
        }
        public getLastReadingPosition(): Promise<any> {
            return new Promise<any>(resolve => resolve(getLastReadingPosition()));
        }
        public saveLastReadingPosition(position: any): Promise<void> {
            return saveLastReadingPosition(position);
        }
    }

    class MockSettings extends BookSettings {
        public renderControls(element: HTMLElement) {
            renderControls(element);
        }
        public onViewChange(callback: () => void) {
            onViewChange(callback);
        }
        public onFontSizeChange(callback: () => void) {
            onFontSizeChange(callback);
        }
        public getSelectedView() {
            return getSelectedView();
        }
        public getSelectedFontSize() {
            return getSelectedFontSize();
        }
        public getOfflineStatusElement() {
            return getOfflineStatusElement();
        }
    }

    class MockEventHandler extends EventHandler {
        public setupEvents(iframe: HTMLIFrameElement) {
            return setupEvents(iframe);
        }
    }

    const manifest = new Manifest({
        metadata: {
            title: "Title"
        },
        spine: [
            { href: "start.html", title: "Start" },
            { href: "item-1.html", title: "Item 1" },
            { href: "item-2.html" }
        ],
        toc: [
            {
                href: "item-1.html",
                title: "Item 1",
                children: [
                    { href: "subitem-1.html", title: "Subitem 1" },
                    { href: "subitem-2.html", title: "Subitem 2" }
                ]
            },
            { href: "item-2.html", "title": "Item 2" }
        ]
    }, new URL("http://example.com/manifest.json"));

    const click = (element: any) => {
        const event = document.createEvent("HTMLEvents");
        event.initEvent("click", false, true);
        element.dispatchEvent(event);
    };

    const pause = (ms = 0): Promise<void> => {
        return new Promise<void>(resolve => setTimeout(resolve, ms));
    };

    beforeEach(async () => {
        store = new MemoryStore();
        store.set("manifest", JSON.stringify(manifest));
        enable = stub();
        onStatusUpdate = stub();
        getStatus = stub();
        cacher = new MockCacher();

        paginatorStart = stub();
        onFirstPage = stub().returns(false);
        onLastPage = stub().returns(false);
        goToPreviousPage = stub();
        goToNextPage = stub();
        paginatorGoToPosition = stub();
        paginatorGoToElement = stub();
        paginatorCurrentPage = 2;
        paginator = new MockPaginator();

        scrollerStart = stub();
        scrollerAtBottom = stub().returns(false);
        scroller = new MockScroller();

        getLastReadingPosition = stub();
        saveLastReadingPosition = stub().returns(new Promise(resolve => resolve()));
        annotator = new MockAnnotator();

        offlineStatusElement = document.createElement("div");
        renderControls = stub();
        onViewChange = stub();
        onFontSizeChange = stub();
        getSelectedView = stub().returns(paginator);
        getSelectedFontSize = stub().returns("14px");
        getOfflineStatusElement = stub().returns(offlineStatusElement);
        settings = await MockSettings.create(store, [paginator, scroller], [14, 16]);

        setupEvents = stub();
        eventHandler = new MockEventHandler();

        const window = jsdom.jsdom("", ({
            // This is useful for debugging errors in an iframe load event.
            virtualConsole: jsdom.createVirtualConsole().sendTo(console),
            resourceLoader: (resource: any, callback: any) => {
                // Load this HTML for every URL.
                callback(null, "<html><body>Some HTML for " + resource.url.href + "</body></html>");
            },
            features: {
                FetchExternalResources: ["iframe"],
                ProcessExternalResources: ["iframe"]
            }
        } as any)).defaultView;
        element = window.document.createElement("div");

        // The element must be in a document for iframe load events to work.
        window.document.body.appendChild(element);
        (window as any).innerWidth = 1024;
        navigator = await IFrameNavigator.create(element, new URL("http://example.com/manifest.json"), store, cacher, settings, annotator, paginator, scroller, eventHandler);
    });

    describe("#start", () => {
        it("should set element's HTML", async () => {
            expect(element.innerHTML).to.contain("iframe");
            expect(element.innerHTML).to.contain("controls");
        });

        it("should render the settings controls", async () => {
            expect(renderControls.callCount).to.equal(1);
            const settingsView = element.querySelector(".settings-view") as HTMLDivElement;
            expect(renderControls.args[0][0]).to.equal(settingsView);
        });

        it("should render the book title", async () => {
            const bookTitle = element.querySelector(".book-title") as HTMLSpanElement;
            await pause();
            expect(bookTitle.innerHTML).to.equal("Title");
        });

        it("should render the chapter title", async () => {
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            const chapterTitle = element.querySelector(".chapter-title") as HTMLSpanElement;
            await pause();
            expect(chapterTitle.innerHTML).to.equal("(Start)");

            iframe.src = "http://example.com/item-1.html";
            await pause();
            expect(chapterTitle.innerHTML).to.equal("(Item 1)");

            iframe.src = "http://example.com/item-2.html";
            await pause();
            expect(chapterTitle.innerHTML).to.equal("(Chapter)");
        });

        it("should render the chapter position", async () => {
            const chapterPosition = element.querySelector(".chapter-position") as HTMLSpanElement;
            await pause();
            expect(chapterPosition.innerHTML).to.equal("Page 2 of 8");
        });

        it("should give the settings a function to update the book view when a new view is selected", async () => {
            expect(onViewChange.callCount).to.equal(1);
            let chapterTitle = element.querySelector(".chapter-title") as HTMLSpanElement;
            let chapterPosition = element.querySelector(".chapter-position") as HTMLSpanElement;
            let links = element.querySelector("ul.links.top") as HTMLUListElement;
            let linksBottom = element.querySelector("ul.links.bottom") as HTMLUListElement;

            await pause();
            expect(saveLastReadingPosition.callCount).to.equal(1);

            paginatorCurrentPage = 4;
            const updateBookView = onViewChange.args[0][0];
            updateBookView();
            expect(chapterTitle.style.display).not.to.equal("none");
            expect(chapterPosition.style.display).not.to.equal("none");
            expect(chapterPosition.innerHTML).to.equal("Page 4 of 8");
            expect(linksBottom.className).to.contain(" inactive");

            // A scroll event does nothing when the paginator is selected.
            document.body.onscroll(new UIEvent("scroll"));
            expect(saveLastReadingPosition.callCount).to.equal(1);

            getSelectedView.returns(scroller);

            updateBookView();
            expect(chapterTitle.style.display).to.equal("none");
            expect(chapterPosition.style.display).to.equal("none");
            expect(linksBottom.className).not.to.contain(" inactive");

            // Now a scroll event saves the new reading position.
            await document.body.onscroll(new UIEvent("scroll"));
            expect(saveLastReadingPosition.callCount).to.equal(2);

            // If the links are hidden, scrolling to the bottom brings up
            // the bottom links.
            links.className = "links top inactive";
            linksBottom.className = "links bottom inactive";
            scrollerAtBottom.returns(true);

            await document.body.onscroll(new UIEvent("scroll"));
            expect(linksBottom.className).not.to.contain(" inactive");

            // Scrolling back up hides the bottom links again.
            scrollerAtBottom.returns(false);

            await document.body.onscroll(new UIEvent("scroll"));
            expect(linksBottom.className).to.contain(" inactive");

            // But if you brought the links up by tapping, scrolling down and
            // back up doesn't change them.
            links.className = "links top active";
            linksBottom.className = "links bottom active";
            scrollerAtBottom.returns(true);

            await document.body.onscroll(new UIEvent("scroll"));
            expect(linksBottom.className).not.to.contain(" inactive");

            scrollerAtBottom.returns(false);

            await document.body.onscroll(new UIEvent("scroll"));
            expect(linksBottom.className).not.to.contain(" inactive");
        });

        it("should give the settings a function to call when the font size changes", async () => {
            // If the window is wide enough, the view gets a large margin.
            // This should've been set before the test started.
            expect(window.innerWidth).to.equal(1024);

            expect(onFontSizeChange.callCount).to.equal(1);
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;

            await pause();
            expect(iframe.contentDocument.body.style.fontSize).to.equal("14px");
            expect(iframe.contentDocument.body.style.lineHeight).to.equal("1.5");
            expect(paginator.sideMargin).to.equal(260);

            const updateFontSize = onFontSizeChange.args[0][0];

            getSelectedFontSize.returns("16px");
            updateFontSize();

            expect(iframe.contentDocument.body.style.fontSize).to.equal("16px");
            expect(iframe.contentDocument.body.style.lineHeight).to.equal("1.5");
            expect(paginator.sideMargin).to.equal(224);
            expect(paginatorGoToPosition.callCount).to.equal(2);

            // If the window is small, the view gets a smaller margin, but still based
            // on the font size.
            (window as any).innerWidth = 100;

            getSelectedFontSize.returns("14px");
            updateFontSize();
            expect(iframe.contentDocument.body.style.fontSize).to.equal("14px");
            expect(iframe.contentDocument.body.style.lineHeight).to.equal("1.5");
            expect(paginator.sideMargin).to.equal(28);

            getSelectedFontSize.returns("16px");
            updateFontSize();

            expect(iframe.contentDocument.body.style.fontSize).to.equal("16px");
            expect(iframe.contentDocument.body.style.lineHeight).to.equal("1.5");
            expect(paginator.sideMargin).to.equal(32);
        });

        it("should render the cache status", () => {
           expect(onStatusUpdate.callCount).to.equal(1);
           const callback = onStatusUpdate.args[0][0];

           callback(CacheStatus.Uncached);
           expect(offlineStatusElement.innerHTML).to.contain("");

           callback(CacheStatus.UpdateAvailable);
           expect(offlineStatusElement.innerHTML).to.contain("new version");

           callback(CacheStatus.CheckingForUpdate);
           expect(offlineStatusElement.innerHTML).to.contain("Checking");

           callback(CacheStatus.Downloading);
           expect(offlineStatusElement.innerHTML).to.contain("Downloading");

           callback(CacheStatus.Downloaded);
           expect(offlineStatusElement.innerHTML).to.contain("Downloaded");

           callback(CacheStatus.Error);
           expect(offlineStatusElement.innerHTML).to.contain("Error");
        });

        it("should enable the cacher on load", async () => {
            expect(enable.callCount).to.equal(1);
        });

        it("should start the selected book view", async () => {
            await pause();
            expect(paginatorStart.callCount).to.equal(1);
            expect(paginatorStart.args[0][0]).to.equal(0);

            expect(document.body.style.overflow).to.equal("hidden");
        });

        it("should set up the event handler on iframe load", async () => {
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;

            await pause();
            expect(setupEvents.callCount).to.equal(1);
            expect(setupEvents.args[0][0]).to.equal(iframe.contentDocument);

            iframe.src = "http://example.com/item-1.html";
            await pause();
            expect(setupEvents.callCount).to.equal(2);
            expect(setupEvents.args[1][0]).to.equal(iframe.contentDocument);
        });

        it("should load first spine item in the iframe", async () => {
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            expect(iframe).not.to.be.null;
            expect(iframe.src).to.equal("http://example.com/start.html");

            await pause();
            expect(saveLastReadingPosition.callCount).to.equal(1);
            expect(saveLastReadingPosition.args[0][0]).to.deep.equal({
                resource: "http://example.com/start.html",
                position: 0.25
            });
        });

        it("should navigate to an element from the iframe src", async () => {
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            iframe.src = "http://example.com/item-1.html#element";

            await pause();
            expect(iframe.src).to.equal("http://example.com/item-1.html");
            expect(paginatorGoToElement.callCount).to.equal(1);
            expect(paginatorGoToElement.args[0][0]).to.equal("element");

            expect(saveLastReadingPosition.callCount).to.equal(2);
            expect(saveLastReadingPosition.args[1][0]).to.deep.equal({
                resource: "http://example.com/item-1.html",
                position: 0.25
            });
        });

        it("should show the up link", async () => {
            const noUpLink = element.querySelector("a[rel=up]");
            // The up link isn't shown if it's not configured.
            expect(noUpLink).not.to.be.ok;

            navigator = await IFrameNavigator.create(element, new URL("http://example.com/manifest.json"), store, cacher, settings, annotator, paginator, scroller, eventHandler, new URL("http://up.com"), "Up Text");
            
            const upLink = element.querySelector("a[rel=up]") as HTMLAnchorElement;
            expect(upLink).to.be.ok;
            expect(upLink.href).to.equal("http://up.com/");
            expect(upLink.innerHTML).to.contain("Up Text");
        });

        it("should navigate to the previous spine item", async () => {
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            const originalSrc = iframe.src;
            const previous = element.querySelector("a[rel=prev]") as HTMLAnchorElement;

            // On the first page, the previous link won't be enabled.
            expect(previous.href).to.equal("");
            click(previous);
            expect(iframe.src).to.equal(originalSrc);

            // A later page will have a previous link.
            iframe.src = "http://example.com/item-2.html";
            await pause();
            expect(previous.href).to.equal("http://example.com/item-1.html");
            click(previous);
            expect(iframe.src).to.equal("http://example.com/item-1.html");

            await pause();
            expect(saveLastReadingPosition.callCount).to.equal(3);
            expect(saveLastReadingPosition.args[2][0]).to.deep.equal({
                resource: "http://example.com/item-1.html",
                position: 0.25
            });

            // A page that's not in the spine won't.
            iframe.src = "http://example.com/toc.html";
            await pause();
            expect(previous.href).to.equal("");
            click(previous);
            expect(iframe.src).to.equal("http://example.com/toc.html");
        });

        it("should navigate to the next spine item", async () => {
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            const next = element.querySelector("a[rel=next]") as HTMLAnchorElement;

            // On the last page, the previous link won't be enabled.
            iframe.src = "http://example.com/item-2.html";
            await pause();
            expect(next.href).to.equal("");
            click(next);
            expect(iframe.src).to.equal("http://example.com/item-2.html");

            // On an earlier page, it will.
            iframe.src = "http://example.com/item-1.html";
            await pause();
            expect(next.href).to.equal("http://example.com/item-2.html");
            click(next);
            expect(iframe.src).to.equal("http://example.com/item-2.html");

            await pause();
            expect(saveLastReadingPosition.callCount).to.equal(4);
            expect(saveLastReadingPosition.args[3][0]).to.deep.equal({
                resource: "http://example.com/item-2.html",
                position: 0.25
            });

            iframe.src = "http://example.com/toc.html";
            await pause();
            expect(next.href).to.equal("");
            click(next);
            expect(iframe.src).to.equal("http://example.com/toc.html");
        });

        it("should toggle the navigation links in paginated view", async () => {
            const links = element.querySelector("ul.links.top") as HTMLUListElement;
            const linksBottom = element.querySelector("ul.links.bottom") as HTMLUListElement;
            
            // Initially, the top navigation links are visible.
            // The bottom links are always hidden in paginated view.
            expect(links.className).to.contain(" active");
            expect(links.className).not.to.contain(" inactive");
            expect(linksBottom.className).to.contain(" inactive");
            expect(linksBottom.className).not.to.contain(" active");

            eventHandler.onMiddleTap(new UIEvent("mouseup"));
            expect(links.className).to.contain(" inactive");
            expect(links.className).not.to.contain(" active");
            expect(linksBottom.className).to.contain(" inactive");
            expect(linksBottom.className).not.to.contain(" active");

            eventHandler.onMiddleTap(new UIEvent("mouseup"));
            expect(links.className).to.contain(" active");
            expect(links.className).not.to.contain(" inactive");
            expect(linksBottom.className).to.contain(" inactive");
            expect(linksBottom.className).not.to.contain(" active");

            // Left and right taps don't affect the navigation links.
            eventHandler.onLeftTap(new UIEvent("mouseup"));
            expect(links.className).to.contain(" active");
            expect(links.className).not.to.contain(" inactive");
            expect(linksBottom.className).to.contain(" inactive");
            expect(linksBottom.className).not.to.contain(" active");

            eventHandler.onRightTap(new UIEvent("mouseup"));
            expect(links.className).to.contain(" active");
            expect(links.className).not.to.contain(" inactive");
            expect(linksBottom.className).to.contain(" inactive");
            expect(linksBottom.className).not.to.contain(" active");
        });

        it("should toggle the navigation links in scrolling view", async () => {
            const links = element.querySelector("ul.links.top") as HTMLUListElement;
            const linksBottom = element.querySelector("ul.links.bottom") as HTMLUListElement;
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            
            getSelectedView.returns(scroller);
            iframe.src = "http://example.com/item-1.html";
            await pause();
            
            // Initially, the navigation links are visible.
            expect(links.className).to.contain(" active");
            expect(links.className).not.to.contain(" inactive");
            expect(linksBottom.className).to.contain(" active");
            expect(linksBottom.className).not.to.contain(" inactive");

            eventHandler.onMiddleTap(new UIEvent("mouseup"));
            expect(links.className).to.contain(" inactive");
            expect(links.className).not.to.contain(" active");
            expect(linksBottom.className).to.contain(" inactive");
            expect(linksBottom.className).not.to.contain(" active");

            eventHandler.onLeftTap(new UIEvent("mouseup"));
            expect(links.className).to.contain(" active");
            expect(links.className).not.to.contain(" inactive");
            expect(linksBottom.className).to.contain(" active");
            expect(linksBottom.className).not.to.contain(" inactive");

            eventHandler.onRightTap(new UIEvent("mouseup"));
            expect(links.className).to.contain(" inactive");
            expect(links.className).not.to.contain(" active");
            expect(linksBottom.className).to.contain(" inactive");
            expect(linksBottom.className).not.to.contain(" active");

            // If you're at the bottom, tapping should only toggle the top links.
            scrollerAtBottom.returns(true);
            linksBottom.className = "links bottom active";

            eventHandler.onMiddleTap(new UIEvent("mouseup"));
            expect(links.className).not.to.contain(" inactive");
            expect(linksBottom.className).not.to.contain(" inactive");

            eventHandler.onLeftTap(new UIEvent("mouseup"));
            expect(links.className).to.contain(" inactive");
            expect(linksBottom.className).not.to.contain(" inactive");
        });

        it("should go to previous page", async () => {
            jsdom.changeURL(window, "http://example.com");
            const chapterPosition = element.querySelector(".chapter-position") as HTMLSpanElement;
            
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            paginatorCurrentPage = 4;

            // If you're not on the first page, it goes to the previous page.
            eventHandler.onLeftTap(new UIEvent("mouseup"));
            expect(onFirstPage.callCount).to.equal(1);
            expect(goToPreviousPage.callCount).to.equal(1);
            expect(chapterPosition.innerHTML).to.equal("Page 4 of 8");

            await pause();
            expect(saveLastReadingPosition.callCount).to.equal(2);
            expect(saveLastReadingPosition.args[1][0]).to.deep.equal({
                resource: "http://example.com/start.html",
                position: 0.25
            });

            eventHandler.onBackwardSwipe(new UIEvent("mouseup"));
            expect(onFirstPage.callCount).to.equal(2);
            expect(goToPreviousPage.callCount).to.equal(2);
            expect(chapterPosition.innerHTML).to.equal("Page 4 of 8");

            await pause();
            expect(saveLastReadingPosition.callCount).to.equal(3);
            expect(saveLastReadingPosition.args[2][0]).to.deep.equal({
                resource: "http://example.com/start.html",
                position: 0.25
            });

            // If you're on the first page of the first spine item, it does nothing.
            onFirstPage.returns(true);
            paginatorCurrentPage = 3;

            eventHandler.onLeftTap(new UIEvent("mouseup"));
            expect(onFirstPage.callCount).to.equal(3);
            expect(goToPreviousPage.callCount).to.equal(2);
            expect(iframe.src).to.equal("http://example.com/start.html");
            expect(chapterPosition.innerHTML).to.equal("Page 4 of 8");

            // If you're on the first page of a later spine item, it goes to the
            // last page of the previous spine item.
            iframe.src = "http://example.com/item-2.html";
            await pause();
            expect(paginatorStart.callCount).to.equal(2);

            eventHandler.onLeftTap(new UIEvent("mouseup"));
            expect(onFirstPage.callCount).to.equal(4);
            expect(goToPreviousPage.callCount).to.equal(2);
            expect(iframe.src).to.equal("http://example.com/item-1.html");

            await pause();
            expect(paginatorStart.callCount).to.equal(3);
            expect(paginatorStart.args[2][0]).to.equal(1);

            expect(saveLastReadingPosition.callCount).to.equal(5);
            expect(saveLastReadingPosition.args[4][0]).to.deep.equal({
                resource: "http://example.com/item-1.html",
                position: 0.25
            });
        });

        it("should go to next page", async () => {
            jsdom.changeURL(window, "http://example.com");
            const chapterPosition = element.querySelector(".chapter-position") as HTMLSpanElement;
            
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            paginatorCurrentPage = 4;

            // If you're not on the last page, it goes to the next page.
            eventHandler.onRightTap(new UIEvent("mouseup"));
            expect(onLastPage.callCount).to.equal(1);
            expect(goToNextPage.callCount).to.equal(1);
            expect(chapterPosition.innerHTML).to.equal("Page 4 of 8");

            await pause();
            expect(saveLastReadingPosition.callCount).to.equal(2);
            expect(saveLastReadingPosition.args[1][0]).to.deep.equal({
                resource: "http://example.com/start.html",
                position: 0.25
            });

            eventHandler.onForwardSwipe(new UIEvent("mouseup"));
            expect(onLastPage.callCount).to.equal(2);
            expect(goToNextPage.callCount).to.equal(2);
            expect(chapterPosition.innerHTML).to.equal("Page 4 of 8");

            await pause();
            expect(saveLastReadingPosition.callCount).to.equal(3);
            expect(saveLastReadingPosition.args[1][0]).to.deep.equal({
                resource: "http://example.com/start.html",
                position: 0.25
            });

            // If you're on the last page of the last spine item, it does nothing.
            iframe.src = "http://example.com/item-2.html";
            await pause();
            onLastPage.returns(true);
            paginatorCurrentPage = 3;

            eventHandler.onRightTap(new UIEvent("mouseup"));
            expect(onLastPage.callCount).to.equal(3);
            expect(goToNextPage.callCount).to.equal(2);
            expect(iframe.src).to.equal("http://example.com/item-2.html");
            expect(chapterPosition.innerHTML).to.equal("Page 4 of 8");

            // If you're on the last page of an earlier spine item, it goes to the
            // first page of the next spine item.
            iframe.src = "http://example.com/item-1.html";
            await pause();
            expect(paginatorStart.callCount).to.equal(3);

            eventHandler.onRightTap(new UIEvent("mouseup"));
            expect(onLastPage.callCount).to.equal(4);
            expect(goToNextPage.callCount).to.equal(2);
            expect(iframe.src).to.equal("http://example.com/item-2.html");

            await pause();
            expect(paginatorStart.callCount).to.equal(4);
            expect(paginatorStart.args[3][0]).to.equal(0);

            expect(saveLastReadingPosition.callCount).to.equal(6);
            expect(saveLastReadingPosition.args[5][0]).to.deep.equal({
                resource: "http://example.com/item-2.html",
                position: 0.25
            });
        });

        it("should set iframe classes on hover", async () => {
            await pause();
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;

            expect(iframe.className).to.equal("");

            eventHandler.onLeftHover();
            expect(iframe.className).to.equal("left-hover");

            eventHandler.onRightHover();
            expect(iframe.className).to.equal("right-hover");

            eventHandler.onRemoveHover();
            expect(iframe.className).to.equal("");

            // In scrolling view, hover does nothing;
            getSelectedView.returns(scroller);

            iframe.src = "http://example.com/item-1.html";
            await pause();

            eventHandler.onLeftHover();
            expect(iframe.className).to.equal("");

            eventHandler.onRightHover();
            expect(iframe.className).to.equal("");

            eventHandler.onRemoveHover();
            expect(iframe.className).to.equal("");
        });

        it("should maintain paginator position when window is resized", async () => {
            expect(paginatorGoToPosition.callCount).to.equal(1);
            window.dispatchEvent(new Event('resize'));
            expect(paginatorGoToPosition.callCount).to.equal(2);
            expect(paginatorGoToPosition.args[0][0]).to.equal(0.25);
        });

        it("should update chapter position info when window is resized", async () => {
            const chapterPosition = element.querySelector(".chapter-position") as HTMLSpanElement;
            paginatorCurrentPage = 3;
            window.dispatchEvent(new Event('resize'));
            expect(chapterPosition.innerHTML).to.equal("Page 3 of 8");
        });

        it("should set heights on view and top and bottom info when loading iframe", async () => {
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            const linksTop = element.querySelector("ul.links.top") as HTMLUListElement;
            const linksBottom = element.querySelector("ul.links.bottom") as HTMLUListElement;
            const infoTop = element.querySelector(".info.top") as HTMLDivElement;
            const infoBottom = element.querySelector(".info.bottom") as HTMLDivElement;
            (linksTop as any).clientHeight = 10;
            (linksBottom as any).clientHeight = 20;
            (window as any).innerHeight = 100;

            iframe.src = "http://example.com/item-1.html";
            await pause();

            expect(paginator.height).to.equal(60);
            expect(scroller.height).to.equal(60);
            expect(infoTop.style.height).to.equal("10px");
            expect(infoBottom.style.height).to.equal("20px");
        });

        it("should show loading message while iframe is loading", async () => {
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            const loading = element.querySelector("div[class=loading]") as any;
            const next = element.querySelector("a[rel=next]") as HTMLAnchorElement;

            // Slow down annotator so the loading message has time to appear.
            saveLastReadingPosition.returns(new Promise<void>(async (resolve) => {
                await pause(300);
                resolve();
            }));

            iframe.src = "http://example.com/item-1.html";
            await pause();
            click(next);
            await pause(250);
            expect(loading.style.display).not.to.equal("none");
            await pause(100);
            expect(loading.style.display).to.equal("none");
        });

        it("should show error message when iframe fails to load", async () => {
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            const error = element.querySelector("div[class=error]") as HTMLDivElement;
            const tryAgain = element.querySelector(".try-again") as HTMLButtonElement;

            expect(error.style.display).to.equal("none");

            // Make the annotator throw an error so the load handler won't succeed.
            saveLastReadingPosition.throws();

            iframe.src = "http://example.com/item-1.html";
            await pause();
            expect(error.style.display).not.to.equal("none");

            // If trying again fails, the error message stays up.
            click(tryAgain);
            await pause();
            expect(error.style.display).not.to.equal("none");

            // If trying again succeeds, it goes away.
            saveLastReadingPosition.returns(new Promise<void>(async (resolve) => resolve()));
            click(tryAgain);
            await pause();
            expect(error.style.display).to.equal("none");
        });
    });

    describe("table of contents", () => {
        it("should render each link in the manifest toc", async () => {
            const toc = element.querySelector(".contents-view") as HTMLDivElement;

            const list = toc.querySelector("ul") as HTMLUListElement;
            expect(list.tagName.toLowerCase()).to.equal("ul");

            const links = list.querySelectorAll("li > a");
            expect(links.length).to.equal(4);

            const link1 = links[0] as HTMLAnchorElement;
            const link2 = links[1] as HTMLAnchorElement;
            const link3 = links[2] as HTMLAnchorElement;
            const link4 = links[3] as HTMLAnchorElement;
            expect(link1.href).to.equal("http://example.com/item-1.html");
            expect(link1.text).to.equal("Item 1");
            expect(link2.href).to.equal("http://example.com/subitem-1.html");
            expect(link2.text).to.equal("Subitem 1");
            expect(link3.href).to.equal("http://example.com/subitem-2.html");
            expect(link3.text).to.equal("Subitem 2");
            expect(link4.href).to.equal("http://example.com/item-2.html");
            expect(link4.text).to.equal("Item 2");

            const sublinks = link1.parentElement.querySelectorAll("ul > li > a");
            expect(sublinks.length).to.equal(2);

            expect(sublinks[0]).to.equal(link2);
            expect(sublinks[1]).to.equal(link3);
        });

        it("should show on first load if there's no last reading position yet", async () => {
            let toc = element.querySelector(".contents-view") as HTMLDivElement;
            let contentsControl = element.querySelector("button.contents") as HTMLButtonElement;
            expect(toc.className).not.to.contain(" inactive");
            expect(contentsControl.getAttribute("aria-expanded")).to.equal("true");

            getLastReadingPosition.returns("http://example.com/item-1.html");
            navigator = await IFrameNavigator.create(element, new URL("http://example.com/manifest.json"), store, cacher, settings, annotator, paginator, scroller);
            toc = element.querySelector(".contents-view") as HTMLDivElement;
            contentsControl = element.querySelector("button.contents") as HTMLButtonElement;
            expect(toc.className).to.contain(" inactive");
            expect(contentsControl.getAttribute("aria-expanded")).to.equal("false");
        });

        it("should show and hide when contents control is clicked", async () => {
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            const toc = element.querySelector(".contents-view") as HTMLDivElement; 
            const contentsControl = element.querySelector("button.contents") as HTMLButtonElement;
            expect(toc.className).to.contain(" active");
            expect(toc.className).not.to.contain(" inactive");
            expect(contentsControl.getAttribute("aria-expanded")).to.equal("true");
            expect(iframe.src).to.equal("http://example.com/start.html");

            click(contentsControl);
            expect(toc.className).to.contain(" inactive");
            expect(toc.className).not.to.contain(" active");
            expect(contentsControl.getAttribute("aria-expanded")).to.equal("false");
            expect(iframe.src).to.equal("http://example.com/start.html");

            click(contentsControl);
            expect(toc.className).to.contain(" active");
            expect(toc.className).not.to.contain(" inactive");
            expect(contentsControl.getAttribute("aria-expanded")).to.equal("true");
            expect(iframe.src).to.equal("http://example.com/start.html");
        });

        it("should hide when other navigation links are clicked", async () => {
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            const toc = element.querySelector(".contents-view") as HTMLDivElement;
            const contentsControl = element.querySelector("button.contents") as HTMLButtonElement;

            iframe.src = "http://example.com/item-1.html";
            await pause();
            expect(toc.className).to.contain(" active");
            expect(toc.className).not.to.contain(" inactive");
            expect(contentsControl.getAttribute("aria-expanded")).to.equal("true");

            const nextChapterLink = element.querySelector("a[rel=next]") as HTMLAnchorElement;
            click(nextChapterLink);
            await pause();
            expect(toc.className).to.contain(" inactive");
            expect(toc.className).not.to.contain(" active");
            expect(contentsControl.getAttribute("aria-expanded")).to.equal("false");

            click(contentsControl);
            expect(toc.className).to.contain(" active");
            expect(toc.className).not.to.contain(" inactive");
            expect(contentsControl.getAttribute("aria-expanded")).to.equal("true");

            const previousChapterLink = element.querySelector("a[rel=prev]") as HTMLAnchorElement;
            click(previousChapterLink);
            await pause();
            expect(toc.className).to.contain(" inactive");
            expect(toc.className).not.to.contain(" active");
            expect(contentsControl.getAttribute("aria-expanded")).to.equal("false");
        });

        it("should navigate to a toc item", async () => {
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            const toc = element.querySelector(".contents-view") as HTMLDivElement;
            expect(iframe.src).to.equal("http://example.com/start.html");

            const contentsControl = element.querySelector("button.contents") as HTMLButtonElement;
            click(contentsControl);

            const links = toc.querySelectorAll("li > a");
            const link1 = links[0] as HTMLAnchorElement;
            const link2 = links[1] as HTMLAnchorElement;

            click(link1);
            expect(toc.className).to.contain(" inactive");
            expect(toc.className).not.to.contain(" active");
            expect(contentsControl.getAttribute("aria-expanded")).to.equal("false");
            expect(iframe.src).to.equal("http://example.com/item-1.html");

            click(contentsControl);
            expect(toc.className).to.contain(" active");
            expect(toc.className).not.to.contain(" inactive");
            expect(contentsControl.getAttribute("aria-expanded")).to.equal("true");

            click(link2);
            expect(toc.className).to.contain(" inactive");
            expect(toc.className).not.to.contain(" active");
            expect(contentsControl.getAttribute("aria-expanded")).to.equal("false");
            expect(iframe.src).to.equal("http://example.com/subitem-1.html");

            await pause();
            expect(saveLastReadingPosition.callCount).to.equal(3);

            // Clicking the link that's already open won't reload the iframe.
            click(contentsControl);
            click(link2);
            expect(toc.className).to.contain(" inactive");
            expect(toc.className).not.to.contain(" active");
            expect(contentsControl.getAttribute("aria-expanded")).to.equal("false");
            expect(iframe.src).to.equal("http://example.com/subitem-1.html");

            await pause();
            expect(saveLastReadingPosition.callCount).to.equal(3);
        });

        it("should set class on the active toc item", async () => {
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            const toc = element.querySelector(".contents-view") as HTMLDivElement;

            const links = toc.querySelectorAll("li > a");
            const link1 = links[0] as HTMLAnchorElement;
            const link2 = links[1] as HTMLAnchorElement;

            expect(link1.className).to.equal("");
            expect(link2.className).to.equal("");

            iframe.src = "http://example.com/item-1.html";
            await pause();
            expect(link1.className).to.equal("active");
            expect(link2.className).to.equal("");

            iframe.src = "http://example.com/subitem-1.html";
            await pause();
            expect(link1.className).to.equal("");
            expect(link2.className).to.equal("active");
        });
    });

    describe("settings", () => {
        it("should show and hide when settings control is clicked", async () => {
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            const settings = element.querySelector(".settings-view") as HTMLDivElement;
            const settingsControl = element.querySelector("button.settings") as HTMLButtonElement;
            expect(settings.className).to.contain(" inactive");
            expect(settingsControl.getAttribute("aria-expanded")).to.equal("false");
            expect(iframe.src).to.equal("http://example.com/start.html");

            click(settingsControl);
            expect(settings.className).to.contain(" active");
            expect(settings.className).not.to.contain(" inactive");
            expect(settingsControl.getAttribute("aria-expanded")).to.equal("true");
            expect(iframe.src).to.equal("http://example.com/start.html");

            click(settingsControl);
            expect(settings.className).to.contain(" inactive");
            expect(settings.className).not.to.contain(" active");
            expect(settingsControl.getAttribute("aria-expanded")).to.equal("false");
            expect(iframe.src).to.equal("http://example.com/start.html");
        });

        it("should hide when settings view is clicked", async () => {
            const settings = element.querySelector(".settings-view") as HTMLDivElement;
            const settingsControl = element.querySelector("button.settings") as HTMLButtonElement;
            expect(settings.className).to.contain(" inactive");
            expect(settings.className).not.to.contain(" active");
            expect(settingsControl.getAttribute("aria-expanded")).to.equal("false");

            click(settingsControl);
            expect(settings.className).to.contain(" active");
            expect(settings.className).not.to.contain(" inactive");
            expect(settingsControl.getAttribute("aria-expanded")).to.equal("true");

            click(settings);
            expect(settings.className).to.contain(" inactive");
            expect(settings.className).not.to.contain(" active");
            expect(settingsControl.getAttribute("aria-expanded")).to.equal("false");
        });
    });
});