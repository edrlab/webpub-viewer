import { expect } from "chai";
import { stub } from "sinon";
import * as jsdom from "jsdom";

import IFrameNavigator from "../src/IFrameNavigator";
import Store from "../src/Store";
import Cacher from "../src/Cacher";
import { CacheStatus } from "../src/Cacher";
import PublisherFont from "../src/PublisherFont";
import SerifFont from "../src/SerifFont";
import SansFont from "../src/SansFont";
import DayTheme from "../src/DayTheme";
import SepiaTheme from "../src/SepiaTheme";
import NightTheme from "../src/NightTheme";
import PaginatedBookView from "../src/PaginatedBookView";
import ScrollingBookView from "../src/ScrollingBookView";
import Annotator from "../src/Annotator";
import Manifest from "../src/Manifest";
import BookSettings from "../src/BookSettings";
import MemoryStore from "../src/MemoryStore";
import EventHandler from "../src/EventHandler";

describe("IFrameNavigator", () => {
    let store: Store;

    let enable: sinon.SinonStub;
    let onStatusUpdate: sinon.SinonStub;
    let getStatus: sinon.SinonStub;
    let cacher: Cacher;

    let publisherStart: sinon.SinonStub;
    let serifStart: sinon.SinonStub;
    let sansStart: sinon.SinonStub;
    let publisher: PublisherFont;
    let serif: SerifFont;
    let sans: SansFont;

    let dayStart: sinon.SinonStub;
    let sepiaStart: sinon.SinonStub;
    let nightStart: sinon.SinonStub;
    let day: DayTheme;
    let sepia: SepiaTheme;
    let night: NightTheme;

    let paginatorStart: sinon.SinonStub;
    let onFirstPage: sinon.SinonStub;
    let onLastPage: sinon.SinonStub;
    let goToPreviousPage: sinon.SinonStub;
    let goToNextPage: sinon.SinonStub;
    let paginatorGoToPosition: sinon.SinonStub;
    let paginatorGoToElement: sinon.SinonStub;
    let paginatorCurrentPage: number;
    let paginator: PaginatedBookView;

    let scrollerStart: sinon.SinonStub;
    let scrollerAtBottom: sinon.SinonStub;
    let scroller: ScrollingBookView;

    let getLastReadingPosition: sinon.SinonStub;
    let saveLastReadingPosition: sinon.SinonStub;
    let annotator: Annotator;

    let offlineStatusElement: HTMLElement;
    let renderControls: sinon.SinonStub;
    let onFontChange: sinon.SinonStub;
    let onFontSizeChange: sinon.SinonStub;
    let onThemeChange: sinon.SinonStub;
    let onViewChange: sinon.SinonStub;
    let getSelectedFont: sinon.SinonStub;
    let getSelectedFontSize: sinon.SinonStub;
    let getSelectedTheme: sinon.SinonStub;
    let getSelectedView: sinon.SinonStub;
    let getOfflineStatusElement: sinon.SinonStub;
    let settings: BookSettings;

    let setupEvents: sinon.SinonStub;
    let eventHandler: EventHandler;

    let onFullScreenChange: sinon.SinonStub;
    let winHistoryChange: sinon.SinonStub;

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

    class MockPublisherFont extends PublisherFont {
        public bookElement: HTMLIFrameElement;
        public start() {
            publisherStart();
        };
        public stop() {};
    }

    class MockSerifFont extends SerifFont {
        public bookElement: HTMLIFrameElement;
        public start() {
            serifStart();
        };
        public stop() {};
    }

    class MockSansFont extends SansFont {
        public bookElement: HTMLIFrameElement;
        public start() {
            sansStart();
        };
        public stop() {};
    }

    class MockDayTheme extends DayTheme {
        public rootElement: HTMLHtmlElement;
        public bookElement: HTMLIFrameElement;
        public start() {
            dayStart();
        };
        public stop() {};
    }

    class MockSepiaTheme extends SepiaTheme {
        public rootElement: HTMLHtmlElement;
        public bookElement: HTMLIFrameElement;
        public start() {
            sepiaStart();
        };
        public stop() {};
    }

    class MockNightTheme extends NightTheme {
        public rootElement: HTMLHtmlElement;
        public bookElement: HTMLIFrameElement;
        public start() {
            nightStart();
        };
        public stop() {};
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
        public onFontChange(callback: () => void) {
            onFontChange(callback);
        }
        public onFontSizeChange(callback: () => void) {
            onFontSizeChange(callback);
        }
        public onThemeChange(callback: () => void) {
            onThemeChange(callback);
        }
        public onViewChange(callback: () => void) {
            onViewChange(callback);
        }
        public getSelectedFont() {
            return getSelectedFont();
        }
        public getSelectedFontSize() {
            return getSelectedFontSize();
        }
        public getSelectedTheme() {
            return getSelectedTheme();
        }
        public getSelectedView() {
            return getSelectedView();
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
            { href: "item-2.html" },
            { href: "item-3.html" }
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
        event.initEvent("click", true, true);
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

        publisherStart = stub();
        serifStart = stub();
        sansStart = stub();
        publisher = new MockPublisherFont();
        serif = new MockSerifFont();
        sans = new MockSansFont();

        dayStart = stub();
        sepiaStart = stub();
        nightStart = stub();
        day = new MockDayTheme();
        sepia = new MockSepiaTheme();
        night = new MockNightTheme();

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
        onFontChange = stub();
        onFontSizeChange = stub();
        onThemeChange = stub();
        onViewChange = stub();
        getSelectedFont = stub().returns(serif);
        getSelectedFontSize = stub().returns("14px");
        getSelectedTheme = stub().returns(sepia);
        getSelectedView = stub().returns(paginator);
        getOfflineStatusElement = stub().returns(offlineStatusElement);
        settings = await MockSettings.create({
            store,
            bookFonts: [publisher, serif, sans],
            fontSizesInPixels: [14, 16],
            bookThemes: [day, sepia, night],
            bookViews: [paginator, scroller]
        });

        setupEvents = stub();
        eventHandler = new MockEventHandler();

        onFullScreenChange = stub();
        winHistoryChange = stub();

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
        (document.documentElement as any).clientWidth = 1024;
        (navigator as IFrameNavigator) = await IFrameNavigator.create({
            element,
            manifestUrl: new URL("http://example.com/manifest.json"),
            store,
            settings,
            annotator,
            publisher,
            serif,
            sans,
            day,
            sepia,
            night,
            paginator,
            scroller,
            eventHandler
        });
    });

    describe("#start", () => {
        it("should set element's HTML", async () => {
            expect(element.innerHTML).to.contain("iframe");
            expect(element.innerHTML).to.contain("controls");
            expect(element.innerHTML).to.contain("controls-trigger");
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
            expect(chapterTitle.innerHTML).to.equal("(Item 2)");

            iframe.src = "http://example.com/item-3.html";
            await pause();
            expect(chapterTitle.innerHTML).to.equal("(Current Chapter)");

            iframe.src = "http://example.com/subitem-2.html";
            await pause();
            expect(chapterTitle.innerHTML).to.equal("(Subitem 2)");

        });

        it("should render the chapter position", async () => {
            const chapterPosition = element.querySelector(".chapter-position") as HTMLSpanElement;
            await pause();
            expect(chapterPosition.innerHTML).to.equal("Page 2 of 8");
        });

        it("should give the settings a function to call when the font size changes", async () => {
            // If the window is wide enough, the view gets a large margin.
            // This should've been set before the test started.
            expect(document.documentElement.clientWidth).to.equal(1024);

            expect(onFontSizeChange.callCount).to.equal(1);
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;

            await pause();
            expect((iframe.contentDocument as any).body.style.fontSize).to.equal("14px");
            expect((iframe.contentDocument as any).body.style.lineHeight).to.equal("1.5");
            expect(paginator.sideMargin).to.equal(260);

            const updateFontSize = onFontSizeChange.args[0][0];

            getSelectedFontSize.returns("16px");
            updateFontSize();

            expect((iframe.contentDocument as any).body.style.fontSize).to.equal("16px");
            expect((iframe.contentDocument as any).body.style.lineHeight).to.equal("1.5");
            expect(paginator.sideMargin).to.equal(224);
            expect(paginatorGoToPosition.callCount).to.equal(3);

            // If the window is small, the view gets a smaller margin, but still based
            // on the font size.
            (document.documentElement as any).clientWidth = 100;

            getSelectedFontSize.returns("14px");
            updateFontSize();
            expect((iframe.contentDocument as any).body.style.fontSize).to.equal("14px");
            expect((iframe.contentDocument as any).body.style.lineHeight).to.equal("1.5");
            expect(paginator.sideMargin).to.equal(28);

            getSelectedFontSize.returns("16px");
            updateFontSize();

            expect((iframe.contentDocument as any).body.style.fontSize).to.equal("16px");
            expect((iframe.contentDocument as any).body.style.lineHeight).to.equal("1.5");
            expect(paginator.sideMargin).to.equal(32);
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
            (document.body as any).onscroll(new UIEvent("scroll"));
            expect(saveLastReadingPosition.callCount).to.equal(1);

            getSelectedView.returns(scroller);

            updateBookView();
            expect(chapterTitle.style.display).to.equal("none");
            expect(chapterPosition.style.display).to.equal("none");
            expect(linksBottom.className).not.to.contain(" inactive");

            // Now a scroll event saves the new reading position.
            await (document.body as any).onscroll(new UIEvent("scroll"));
            expect(saveLastReadingPosition.callCount).to.equal(2);

            // If the links are hidden, scrolling to the bottom brings up
            // the bottom links.
            links.className = "links top inactive";
            linksBottom.className = "links bottom inactive";
            scrollerAtBottom.returns(true);

            await (document.body as any).onscroll(new UIEvent("scroll"));
            expect(linksBottom.className).not.to.contain(" inactive");

            // Scrolling back up hides the bottom links again.
            scrollerAtBottom.returns(false);

            await (document.body as any).onscroll(new UIEvent("scroll"));
            expect(linksBottom.className).to.contain(" inactive");

            // But if you brought the links up by tapping, scrolling down and
            // back up doesn't change them.
            links.className = "links top active";
            linksBottom.className = "links bottom active";
            scrollerAtBottom.returns(true);

            await (document.body as any).onscroll(new UIEvent("scroll"));
            expect(linksBottom.className).not.to.contain(" inactive");

            scrollerAtBottom.returns(false);

            await (document.body as any).onscroll(new UIEvent("scroll"));
            expect(linksBottom.className).not.to.contain(" inactive");
        });

        it("should render the cache status if the cacher is configured", async () => {
            (navigator as IFrameNavigator) = await IFrameNavigator.create({
                element,
                manifestUrl: new URL("http://example.com/manifest.json"),
                store,
                cacher,
                settings,
                annotator,
                publisher,
                serif,
                sans,
                day,
                sepia,
                night,
                paginator,
                scroller,
                eventHandler
            });

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

        it("should enable the cacher on load if it is configured", async () => {
            (navigator as IFrameNavigator) = await IFrameNavigator.create({
                element,
                manifestUrl: new URL("http://example.com/manifest.json"),
                store,
                cacher,
                settings,
                annotator,
                publisher,
                serif,
                sans,
                day,
                sepia,
                night,
                paginator,
                scroller,
                eventHandler
            });

            expect(enable.callCount).to.equal(1);
        });

        it("should start the selected book font", async () => {
            await pause();
            expect(publisherStart.callCount).to.equal(0);
            expect(serifStart.callCount).to.equal(1);
            expect(sansStart.callCount).to.equal(0);
        });

        it("should start the selected book theme", async () => {
            await pause();
            expect(dayStart.callCount).to.equal(0);
            expect(sepiaStart.callCount).to.equal(1);
            expect(nightStart.callCount).to.equal(0);
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
            expect(setupEvents.args[0][0]).to.equal((iframe.contentDocument as any));

            iframe.src = "http://example.com/item-1.html";
            await pause();
            expect(setupEvents.callCount).to.equal(2);
            expect(setupEvents.args[1][0]).to.equal((iframe.contentDocument as any));
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

            (navigator as IFrameNavigator) = await IFrameNavigator.create({
                element,
                manifestUrl: new URL("http://example.com/manifest.json"),
                store,
                settings,
                annotator,
                publisher,
                serif,
                sans,
                day,
                sepia,
                night,
                paginator,
                scroller,
                eventHandler,
                upLink: {
                    url: new URL("http://up.com"),
                    label: "Up Text",
                    ariaLabel: "Up Aria Text"
                }
            });
            
            let upLink = element.querySelector("a[rel=up]") as HTMLAnchorElement;
            expect(upLink).to.be.ok;
            expect(upLink.href).to.equal("http://up.com/");
            expect(upLink.innerHTML).to.contain("Up Text");
            expect(upLink.getAttribute("aria-label")).to.equal("Up Aria Text");

            // If there's no separate aria label, it uses the label.
            (navigator as IFrameNavigator) = await IFrameNavigator.create({
                element,
                manifestUrl: new URL("http://example.com/manifest.json"),
                store,
                settings,
                annotator,
                publisher,
                serif,
                sans,
                day,
                sepia,
                night,
                paginator,
                scroller,
                eventHandler,
                upLink: {
                    url: new URL("http://up.com"),
                    label: "Up Text"
                }
            });
            
            upLink = element.querySelector("a[rel=up]") as HTMLAnchorElement;
            expect(upLink).to.be.ok;
            expect(upLink.href).to.equal("http://up.com/");
            expect(upLink.innerHTML).to.contain("Up Text");
            expect(upLink.getAttribute("aria-label")).to.equal("Up Text");
        });

        it("should enable the fullscreen mode if supported and configured", async () => {
            let noFsm = element.querySelector(".fullscreen");
            // The button isn't created if it's not configured.
            expect(noFsm).not.to.be.ok;

            // Let’s force the value to be null to simulate no support
            Object.defineProperty(document, "fullscreenEnabled", {
                value: null,
                writable: true
            });

            (navigator as IFrameNavigator) = await IFrameNavigator.create({
                element,
                manifestUrl: new URL("http://example.com/manifest.json"),
                store,
                settings,
                annotator,
                publisher,
                serif,
                sans,
                day,
                sepia,
                night,
                paginator,
                scroller,
                eventHandler,
                allowFullscreen: true
            });
            
            noFsm = element.querySelector(".fullscreen");
            // The button isn't created if it's not supported.
            expect(noFsm).not.to.be.ok;

            // Let’s force the value to be true to simulate support
            Object.defineProperty(document, "webkitFullscreenEnabled", {
                value: true
            });

            (navigator as IFrameNavigator) = await IFrameNavigator.create({
                element,
                manifestUrl: new URL("http://example.com/manifest.json"),
                store,
                settings,
                annotator,
                publisher,
                serif,
                sans,
                day,
                sepia,
                night,
                paginator,
                scroller,
                eventHandler,
                allowFullscreen: true
            });
            
            const fsm = element.querySelector(".fullscreen") as HTMLButtonElement;
            expect(fsm).to.be.ok;
        });

        it("should go into fullscreen mode and exit it", async () => {

            // Mocking Fullscreen API properties

            Object.defineProperties(document, {
                "fullscreenEnabled": {
                    value: true
                },
                "fullscreenElement": {
                    // On launch, this will always be null
                    value: null,
                    writable: true
                }
            });

            // Mocking Fullscreen API methods (/!\ Tied to our own toggleFullscreen() implementation)

            document.documentElement.requestFullscreen = () => {
                document.dispatchEvent(new Event("fullscreenchange"));
                return onFullScreenChange();
            }
            document.exitFullscreen = () => {
                document.dispatchEvent(new Event("fullscreenchange"));
                return onFullScreenChange();
            }

            (navigator as IFrameNavigator) = await IFrameNavigator.create({
                element,
                manifestUrl: new URL("http://example.com/manifest.json"),
                store,
                settings,
                annotator,
                publisher,
                serif,
                sans,
                day,
                sepia,
                night,
                paginator,
                scroller,
                eventHandler,
                allowFullscreen: true
            });
            
            const fsm = element.querySelector(".fullscreen") as HTMLButtonElement;
            expect(fsm).to.be.ok;

            let fsmIcon = fsm.querySelector(".active-icon") as SVGElement;
            expect(fsmIcon.getAttribute("aria-labelledby")).to.contain("expand-icon");

            click(fsm);
            fsmIcon = fsm.querySelector(".active-icon") as SVGElement;
            expect(fsmIcon.getAttribute("aria-labelledby")).to.contain("minimize-icon");
            expect(onFullScreenChange.callCount).to.equal(1);

            click(fsm);
            fsmIcon = fsm.querySelector(".active-icon") as SVGElement;
            expect(fsmIcon.getAttribute("aria-labelledby")).to.contain("expand-icon");
            expect(onFullScreenChange.callCount).to.equal(2);
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
            iframe.src = "http://example.com/item-3.html";
            await pause();
            expect(next.href).to.equal("");
            click(next);
            expect(iframe.src).to.equal("http://example.com/item-3.html");

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
            const trigger = element.querySelector(".trigger") as HTMLButtonElement;
            const triggerIcon = trigger.querySelector("svg") as SVGElement;
            
            // Initially, the top navigation links are visible.
            // The bottom links are always hidden in paginated view.
            expect(links.className).to.contain(" active");
            expect(links.className).not.to.contain(" inactive");
            expect(triggerIcon.className).to.contain(" inactive");
            expect(linksBottom.className).to.contain(" inactive");
            expect(linksBottom.className).not.to.contain(" active");

            click(trigger);
            expect(links.className).to.contain(" inactive");
            expect(links.className).not.to.contain(" active");
            expect(triggerIcon.className).not.to.contain(" inactive");
            expect(linksBottom.className).to.contain(" inactive");
            expect(linksBottom.className).not.to.contain(" active");

            eventHandler.onMiddleTap(new UIEvent("mouseup"));
            expect(links.className).to.contain(" active");
            expect(links.className).not.to.contain(" inactive");
            expect(triggerIcon.className).to.contain(" inactive");
            expect(linksBottom.className).to.contain(" inactive");
            expect(linksBottom.className).not.to.contain(" active");

            // Left and right taps don't affect the navigation links.
            eventHandler.onLeftTap(new UIEvent("mouseup"));
            expect(links.className).to.contain(" active");
            expect(links.className).not.to.contain(" inactive");
            expect(triggerIcon.className).to.contain(" inactive");
            expect(linksBottom.className).to.contain(" inactive");
            expect(linksBottom.className).not.to.contain(" active");

            eventHandler.onRightTap(new UIEvent("mouseup"));
            expect(links.className).to.contain(" active");
            expect(links.className).not.to.contain(" inactive");
            expect(triggerIcon.className).to.contain(" inactive");
            expect(linksBottom.className).to.contain(" inactive");
            expect(linksBottom.className).not.to.contain(" active");
        });

        it("should toggle the navigation links in scrolling view", async () => {
            const links = element.querySelector("ul.links.top") as HTMLUListElement;
            const linksBottom = element.querySelector("ul.links.bottom") as HTMLUListElement;
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            const trigger = element.querySelector(".trigger") as HTMLButtonElement;
            const triggerIcon = trigger.querySelector("svg") as SVGElement;
            
            getSelectedView.returns(scroller);
            iframe.src = "http://example.com/item-1.html";
            await pause();
            
            // Initially, the navigation links are visible.
            expect(links.className).to.contain(" active");
            expect(links.className).not.to.contain(" inactive");
            expect(triggerIcon.className).to.contain(" inactive");
            expect(linksBottom.className).to.contain(" active");
            expect(linksBottom.className).not.to.contain(" inactive");

            click(trigger);
            expect(links.className).to.contain(" inactive");
            expect(links.className).not.to.contain(" active");
            expect(triggerIcon.className).not.to.contain(" inactive");
            expect(linksBottom.className).to.contain(" inactive");
            expect(linksBottom.className).not.to.contain(" active");

            eventHandler.onMiddleTap(new UIEvent("mouseup")); 
            expect(links.className).to.contain(" active");
            expect(links.className).not.to.contain(" inactive");
            expect(triggerIcon.className).to.contain(" inactive");
            expect(linksBottom.className).to.contain(" active");
            expect(linksBottom.className).not.to.contain(" inactive");

            eventHandler.onLeftTap(new UIEvent("mouseup"));
            expect(links.className).to.contain(" inactive");
            expect(links.className).not.to.contain(" active");
            expect(triggerIcon.className).not.to.contain(" inactive");
            expect(linksBottom.className).to.contain(" inactive");
            expect(linksBottom.className).not.to.contain(" active");

            eventHandler.onRightTap(new UIEvent("mouseup")); 
            expect(links.className).to.contain(" active");
            expect(links.className).not.to.contain(" inactive");
            expect(triggerIcon.className).to.contain(" inactive");
            expect(linksBottom.className).to.contain(" active");
            expect(linksBottom.className).not.to.contain(" inactive");

            // If you're at the bottom, tapping should only toggle the top links.
            scrollerAtBottom.returns(true);
            linksBottom.className = "links bottom active";

            eventHandler.onMiddleTap(new UIEvent("mouseup"));
            expect(links.className).to.contain(" inactive");
            expect(linksBottom.className).not.to.contain(" inactive");

            eventHandler.onLeftTap(new UIEvent("mouseup"));
            expect(links.className).not.to.contain(" inactive");
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

        it("should go to previous page when using the keyboard", async () => {
            jsdom.changeURL(window, "http://example.com");
            const chapterPosition = element.querySelector(".chapter-position") as HTMLSpanElement;
            
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            paginatorCurrentPage = 4;

            // If you're not on the first page, it goes to the previous page.
            eventHandler.onLeftArrow(new KeyboardEvent("keydown", { keyCode: 37 } as any));

            expect(onFirstPage.callCount).to.equal(1);
            expect(goToPreviousPage.callCount).to.equal(1);
            expect(chapterPosition.innerHTML).to.equal("Page 4 of 8");

            await pause();
            expect(saveLastReadingPosition.callCount).to.equal(2);
            expect(saveLastReadingPosition.args[1][0]).to.deep.equal({
                resource: "http://example.com/start.html",
                position: 0.25
            });

            let dispatchedLeftArrow = new KeyboardEvent("keydown", { keyCode: 37 } as any);
            window.dispatchEvent(dispatchedLeftArrow);
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

            eventHandler.onLeftArrow(new KeyboardEvent("keydown", { keyCode: 37 } as any));
            expect(onFirstPage.callCount).to.equal(3);
            expect(goToPreviousPage.callCount).to.equal(2);
            expect(iframe.src).to.equal("http://example.com/start.html");
            expect(chapterPosition.innerHTML).to.equal("Page 4 of 8");

            // If you're on the first page of a later spine item, it goes to the
            // last page of the previous spine item.
            iframe.src = "http://example.com/item-2.html";
            await pause();
            expect(paginatorStart.callCount).to.equal(2);

            eventHandler.onLeftArrow(new KeyboardEvent("keydown", { keyCode: 37 } as any));
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
            iframe.src = "http://example.com/item-3.html";
            await pause();
            onLastPage.returns(true);
            paginatorCurrentPage = 3;

            eventHandler.onRightTap(new UIEvent("mouseup"));
            expect(onLastPage.callCount).to.equal(3);
            expect(goToNextPage.callCount).to.equal(2);
            expect(iframe.src).to.equal("http://example.com/item-3.html");
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

        it("should go to next page when using the keyboard", async () => {
            jsdom.changeURL(window, "http://example.com");
            const chapterPosition = element.querySelector(".chapter-position") as HTMLSpanElement;
            
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            paginatorCurrentPage = 4;

            // If you're not on the last page, it goes to the next page.
            eventHandler.onRightArrow(new KeyboardEvent("keydown", { keyCode: 39 } as any));
            expect(onLastPage.callCount).to.equal(1);
            expect(goToNextPage.callCount).to.equal(1);
            expect(chapterPosition.innerHTML).to.equal("Page 4 of 8");

            await pause();
            expect(saveLastReadingPosition.callCount).to.equal(2);
            expect(saveLastReadingPosition.args[1][0]).to.deep.equal({
                resource: "http://example.com/start.html",
                position: 0.25
            });

            let dispatchedRightArrow = new KeyboardEvent("keydown", { keyCode: 39 } as any);
            window.dispatchEvent(dispatchedRightArrow);
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
            iframe.src = "http://example.com/item-3.html";
            await pause();
            onLastPage.returns(true);
            paginatorCurrentPage = 3;

            eventHandler.onRightArrow(new KeyboardEvent("keydown", { keyCode: 39 } as any));
            expect(onLastPage.callCount).to.equal(3);
            expect(goToNextPage.callCount).to.equal(2);
            expect(iframe.src).to.equal("http://example.com/item-3.html");
            expect(chapterPosition.innerHTML).to.equal("Page 4 of 8");

            // If you're on the last page of an earlier spine item, it goes to the
            // first page of the next spine item.
            iframe.src = "http://example.com/item-1.html";
            await pause();
            expect(paginatorStart.callCount).to.equal(3);

            eventHandler.onRightArrow(new KeyboardEvent("keydown", { keyCode: 39 } as any));
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

        it("should set iframe classes on hover in the paginated view", async () => {
            await pause();
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;

            expect(iframe.className).to.equal("");

            // On first page of first chapter, left hover should not be applied
            paginatorCurrentPage = 1;
            onFirstPage.returns(true);
            onLastPage.returns(false);

            await pause();

            expect(iframe.className).to.equal("");

            eventHandler.onLeftHover();
            expect(iframe.className).to.equal("");

            eventHandler.onRightHover();
            expect(iframe.className).to.equal("right-hover");

            eventHandler.onRemoveHover();
            expect(iframe.className).to.equal("");

            // On first page of second chapter, left hover should applied
            iframe.src = "http://example.com/item-1.html";
            paginatorCurrentPage = 1;
            onFirstPage.returns(true);
            onLastPage.returns(false);

            await pause();

            expect(iframe.className).to.equal("");

            eventHandler.onLeftHover();
            expect(iframe.className).to.equal("left-hover");

            eventHandler.onRightHover();
            expect(iframe.className).to.equal("right-hover");

            eventHandler.onRemoveHover();
            expect(iframe.className).to.equal("");

            // On any other page, left and right hover should applied
            iframe.src = "http://example.com/item-2.html";
            paginatorCurrentPage = 3;
            onFirstPage.returns(false);
            onLastPage.returns(false);

            await pause();

            expect(iframe.className).to.equal("");

            eventHandler.onLeftHover();
            expect(iframe.className).to.equal("left-hover");

            eventHandler.onRightHover();
            expect(iframe.className).to.equal("right-hover");

            eventHandler.onRemoveHover();
            expect(iframe.className).to.equal("");

            // On last page of last chapter, right hover should not be applied
            iframe.src = "http://example.com/item-3.html";
            paginatorCurrentPage = 3;
            onFirstPage.returns(false);
            onLastPage.returns(true);

            await pause();

            expect(iframe.className).to.equal("");

            eventHandler.onLeftHover();
            expect(iframe.className).to.equal("left-hover");

            eventHandler.onRightHover();
            expect(iframe.className).to.equal("");

            eventHandler.onRemoveHover();
            expect(iframe.className).to.equal("");
        });

        it("should do nothing on hover in the scrolled view", async () => {
            await pause();
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;

            const updateBookView = onViewChange.args[0][0];

            getSelectedView.returns(scroller);

            updateBookView();

            expect(iframe.className).to.equal("");

            eventHandler.onLeftHover();
            expect(iframe.className).to.equal("");

            eventHandler.onRightHover();
            expect(iframe.className).to.equal("");

            eventHandler.onRemoveHover();
            expect(iframe.className).to.equal("");
        });

        it("should maintain paginator position when window is resized", async () => {
            expect(paginatorGoToPosition.callCount).to.equal(2);
            window.dispatchEvent(new Event('resize'));
            await pause(200);

            // Note we’re debouncing so the function will be called x times
            // but ignored until the delay, which is why we can’t know exactly
            // how many times it will be. So we just check it’s > 2
            expect(paginatorGoToPosition.callCount).to.be.greaterThan(2);
            expect(paginatorGoToPosition.args[0][0]).to.equal(0.25);
        });

        it("should update chapter position info when window is resized", async () => {
            const chapterPosition = element.querySelector(".chapter-position") as HTMLSpanElement;
            paginatorCurrentPage = 3;
            window.dispatchEvent(new Event('resize'));
            await pause(200);
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
            (document.documentElement as any).clientHeight = 100;

            iframe.src = "http://example.com/item-1.html";
            await pause();

            expect(paginator.height).to.equal(60);
            expect(scroller.height).to.equal(60);
            expect(infoTop.style.height).to.equal("10px");
            expect(infoBottom.style.height).to.equal("20px");
        });

        it("should show and animate loading message while iframe is loading", async () => {
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
            await pause(200);
            expect(loading.style.display).not.to.equal("none");
            expect(loading.getAttribute("class")).to.contain("is-loading");
            await pause(150);
            expect(loading.style.display).to.equal("none");
            expect(loading.getAttribute("class")).to.not.contain("is-loading");
        });

        it("should change the iframe’s opacity once it is loaded and users settings are applied", async () => {
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            const next = element.querySelector("a[rel=next]") as HTMLAnchorElement;

            // Slow down annotator so the loading message has time to appear.
            saveLastReadingPosition.returns(new Promise<void>(async (resolve) => {
                await pause(300);
                resolve();
            }));

            iframe.src = "http://example.com/item-1.html";
            expect(iframe.style.opacity).to.equal("0");
            await pause(200);
            expect(iframe.style.opacity).to.equal("1");
            click(next);
            expect(iframe.style.opacity).to.equal("0");
        });

        it("should inject the readonly epubReadingSystem object into the iframe’s window.navigator", async () => {
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            expect(((iframe.contentWindow as any).navigator as any).epubReadingSystem).to.include.all.keys("name", "version");
            expect(((iframe.contentWindow as any).navigator as any).epubReadingSystem.name).to.equal("Webpub viewer");
            expect(((iframe.contentWindow as any).navigator as any).epubReadingSystem.version).to.have.string("0.");

            let err = "error";

            try {
                ((iframe.contentWindow as any).navigator as any).epubReadingSystem = {};
            } catch (_err) {
                err = _err;
            }

            expect(err).to.be.an.instanceOf(TypeError);
            expect(((iframe.contentWindow as any).navigator as any).epubReadingSystem).to.include.all.keys("name", "version");

            try {
                ((iframe.contentWindow as any).navigator as any).epubReadingSystem.name = "";
            } catch (_err) {
                err = _err;
            }

            expect(err).to.be.an.instanceOf(TypeError);
            expect(((iframe.contentWindow as any).navigator as any).epubReadingSystem.name).to.equal("Webpub viewer");
        });

        it("should show error message when iframe fails to load", async () => {
            jsdom.changeURL(window, "http://example.com/");

            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            const error = element.querySelector("div[class=error]") as HTMLDivElement;
            const tryAgain = element.querySelector(".try-again") as HTMLButtonElement;
            const goBack = element.querySelector(".go-back") as HTMLButtonElement;

            // Mocking browser history kinda weirdly to make sure window.history.back() has been called by the “Go back” button – location being unforgeable, spec-compliant implems won’t let us mock it in case upLink is present

            window.history.back = () => {
                jsdom.changeURL(window, "http://back.com/");
                return winHistoryChange();
            }

            expect(error.style.display).to.equal("none");

            // Make the annotator throw an error so the load handler won't succeed.
            saveLastReadingPosition.throws();

            iframe.src = "http://example.com/item-1.html";
            await pause();
            expect(error.style.display).not.to.equal("none");
            expect(window.location.href).to.equal("http://example.com/");

            // If trying again fails, the error message stays up.
            click(tryAgain);
            await pause();
            expect(error.style.display).not.to.equal("none");
            expect(window.location.href).to.equal("http://example.com/");

            // If trying again succeeds, it goes away.
            saveLastReadingPosition.returns(new Promise<void>(async (resolve) => resolve()));
            click(tryAgain);
            await pause();
            expect(error.style.display).to.equal("none");
            expect(window.location.href).to.equal("http://example.com/");

            // Make the annotator throw another error to test back button
            saveLastReadingPosition.throws();

            iframe.src = "http://example.com/item-2.html";
            await pause();
            expect(error.style.display).not.to.equal("none");
            expect(window.location.href).to.equal("http://example.com/");

            // It should go back in the window history
            click(goBack);
            await pause();
            expect(winHistoryChange.callCount).to.equal(1);
            expect(window.location.href).to.equal("http://back.com/");
        });
    });

    describe("table of contents", () => {
        it("should be hidden if the manifest has an empty toc", async () => {
            const manifest = new Manifest({
                metadata: {
                    title: "Title"
                },
                spine: [
                    { href: "start.html", title: "Start" },
                    { href: "item-1.html", title: "Item 1" },
                    { href: "item-2.html" },
                    { href: "item-3.html" }
                ]
            }, new URL("http://example.com/manifest.json"));
            store.set("manifest", JSON.stringify(manifest));

            (navigator as IFrameNavigator) = await IFrameNavigator.create({
                element,
                manifestUrl: new URL("http://example.com/manifest.json"),
                store,
                settings,
                annotator,
                publisher,
                serif,
                sans,
                day,
                sepia,
                night,
                paginator,
                scroller,
                eventHandler
            });
            const toc = element.querySelector(".contents-view") as HTMLDivElement;
            expect((toc.parentElement as any).style.display).to.equal("none");
        });

        it("should render each link in the manifest toc", async () => {
            const toc = element.querySelector(".contents-view") as HTMLDivElement;

            const list = toc.querySelector("ol") as HTMLOListElement;
            expect(list.tagName.toLowerCase()).to.equal("ol");

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

            const sublinks = (link1.parentElement as any).querySelectorAll("ol > li");
            expect(sublinks.length).to.equal(2);

            expect(sublinks[0].childElementCount).to.equal(1);
            expect(sublinks[0].children[0]).to.equal(link2);
            expect(sublinks[1].childElementCount).to.equal(1);
            expect(sublinks[1].children[0]).to.equal(link3);
        });

        it("should handle toc entries which don’t have an href", async () => {
            const manifest = new Manifest({
                metadata: {
                    title: "Title"
                },
                spine: [
                    { href: "start.html", title: "Start" },
                    { href: "item-1.html", title: "Item 1" },
                    { href: "item-2.html" },
                    { href: "item-3.html" }
                ],
                toc: [
                    {
                        title: "Item 1",
                        children: [
                            { href: "subitem-1.html", title: "Subitem 1" },
                            { href: "subitem-2.html", title: "Subitem 2" }
                        ]
                    }
                ]
            }, new URL("http://example.com/manifest.json"));
            store.set("manifest", JSON.stringify(manifest));

            (navigator as IFrameNavigator) = await IFrameNavigator.create({
                element,
                manifestUrl: new URL("http://example.com/manifest.json"),
                store,
                settings,
                annotator,
                publisher,
                serif,
                sans,
                day,
                sepia,
                night,
                paginator,
                scroller,
                eventHandler
            });
            const toc = element.querySelector(".contents-view") as HTMLDivElement;
            
            const list = toc.querySelector("ol") as HTMLOListElement;
            expect(list.tagName.toLowerCase()).to.equal("ol");

            const links = list.querySelectorAll("li > a");
            expect(links.length).to.equal(2);

            const link1 = links[0] as HTMLAnchorElement;
            const link2 = links[1] as HTMLAnchorElement;
            expect(link1.href).to.equal("http://example.com/subitem-1.html");
            expect(link1.text).to.equal("Subitem 1");
            expect(link2.href).to.equal("http://example.com/subitem-2.html");
            expect(link2.text).to.equal("Subitem 2");

            const spans = list.querySelectorAll("li > span");
            expect(spans.length).to.equal(1);

            const span1 = spans[0] as HTMLSpanElement;
            expect(span1.textContent).to.equal("Item 1");

            const sublinks = (spans[0].parentElement as any).querySelectorAll("ol > li");
            expect(sublinks.length).to.equal(2);

            expect(sublinks[0].childElementCount).to.equal(1);
            expect(sublinks[0].children[0]).to.equal(link1);
            expect(sublinks[1].childElementCount).to.equal(1);
            expect(sublinks[1].children[0]).to.equal(link2);
        });

        it("should show and hide when contents control is clicked", async () => {
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            const toc = element.querySelector(".contents-view") as HTMLDivElement; 
            const contentsControl = element.querySelector("button.contents") as HTMLButtonElement;
            const openIcon = contentsControl.querySelector(".icon.open") as SVGElement;
            const closeIcon = contentsControl.querySelector(".icon.close") as SVGElement;
            getSelectedView.returns(scroller);

            const links = toc.querySelectorAll("li > a");
            const link1 = links[0] as HTMLAnchorElement;
            const link2 = links[1] as HTMLAnchorElement;
            const link3 = links[2] as HTMLAnchorElement;
            const link4 = links[3] as HTMLAnchorElement;

            expect(toc.className).to.contain(" inactive");
            expect(toc.className).not.to.contain(" active");
            expect(contentsControl.getAttribute("aria-expanded")).to.equal("false");
            expect(iframe.src).to.equal("http://example.com/start.html");
            expect(link1.tabIndex).to.equal(-1);
            expect(link2.tabIndex).to.equal(-1);
            expect(link3.tabIndex).to.equal(-1);
            expect(link4.tabIndex).to.equal(-1);
            expect(document.body.style.overflow).not.to.equal("hidden");
            expect(openIcon.getAttribute("class")).not.to.contain(" inactive");
            expect(closeIcon.getAttribute("class")).to.contain(" inactive");

            click(contentsControl);
            expect(toc.className).to.contain(" active");
            expect(toc.className).not.to.contain(" inactive");
            expect(contentsControl.getAttribute("aria-expanded")).to.equal("true");
            expect(iframe.src).to.equal("http://example.com/start.html");
            expect(link1.tabIndex).to.equal(0);
            expect(link2.tabIndex).to.equal(0);
            expect(link3.tabIndex).to.equal(0);
            expect(link4.tabIndex).to.equal(0);
            expect(document.body.style.overflow).to.equal("hidden");
            expect(openIcon.getAttribute("class")).to.contain(" inactive");
            expect(closeIcon.getAttribute("class")).not.to.contain(" inactive");

            click(contentsControl);
            expect(toc.className).to.contain(" inactive");
            expect(toc.className).not.to.contain(" active");
            expect(contentsControl.getAttribute("aria-expanded")).to.equal("false");
            expect(iframe.src).to.equal("http://example.com/start.html");
            expect(link1.tabIndex).to.equal(-1);
            expect(link2.tabIndex).to.equal(-1);
            expect(link3.tabIndex).to.equal(-1);
            expect(link4.tabIndex).to.equal(-1);
            expect(document.body.style.overflow).not.to.equal("hidden");
            expect(openIcon.getAttribute("class")).not.to.contain(" inactive");
            expect(closeIcon.getAttribute("class")).to.contain(" inactive");
        });

        it("should hide when other navigation links are clicked", async () => {
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            const toc = element.querySelector(".contents-view") as HTMLDivElement;
            const contentsControl = element.querySelector("button.contents") as HTMLButtonElement;
            getSelectedView.returns(scroller);

            const links = toc.querySelectorAll("li > a");
            const link1 = links[0] as HTMLAnchorElement;
            const link2 = links[1] as HTMLAnchorElement;
            const link3 = links[2] as HTMLAnchorElement;
            const link4 = links[3] as HTMLAnchorElement;

            iframe.src = "http://example.com/item-1.html";
            await pause();
            click(contentsControl);

            expect(toc.className).to.contain(" active");
            expect(toc.className).not.to.contain(" inactive");
            expect(contentsControl.getAttribute("aria-expanded")).to.equal("true");
            expect(link1.tabIndex).to.equal(0);
            expect(link2.tabIndex).to.equal(0);
            expect(link3.tabIndex).to.equal(0);
            expect(link4.tabIndex).to.equal(0);
            expect(document.body.style.overflow).to.equal("hidden");

            const nextChapterLink = element.querySelector("a[rel=next]") as HTMLAnchorElement;
            click(nextChapterLink);
            await pause();
            expect(toc.className).to.contain(" inactive");
            expect(toc.className).not.to.contain(" active");
            expect(contentsControl.getAttribute("aria-expanded")).to.equal("false");
            expect(link1.tabIndex).to.equal(-1);
            expect(link2.tabIndex).to.equal(-1);
            expect(link3.tabIndex).to.equal(-1);
            expect(link4.tabIndex).to.equal(-1);
            expect(document.body.style.overflow).not.to.equal("hidden");

            click(contentsControl);
            expect(toc.className).to.contain(" active");
            expect(toc.className).not.to.contain(" inactive");
            expect(contentsControl.getAttribute("aria-expanded")).to.equal("true");
            expect(link1.tabIndex).to.equal(0);
            expect(link2.tabIndex).to.equal(0);
            expect(link3.tabIndex).to.equal(0);
            expect(link4.tabIndex).to.equal(0);
            expect(document.body.style.overflow).to.equal("hidden");

            const previousChapterLink = element.querySelector("a[rel=prev]") as HTMLAnchorElement;
            click(previousChapterLink);
            await pause();
            expect(toc.className).to.contain(" inactive");
            expect(toc.className).not.to.contain(" active");
            expect(contentsControl.getAttribute("aria-expanded")).to.equal("false");
            expect(link1.tabIndex).to.equal(-1);
            expect(link2.tabIndex).to.equal(-1);
            expect(link3.tabIndex).to.equal(-1);
            expect(link4.tabIndex).to.equal(-1);
            expect(document.body.style.overflow).not.to.equal("hidden");
        });

        it("should navigate to a toc item", async () => {
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            const toc = element.querySelector(".contents-view") as HTMLDivElement;
            expect(iframe.src).to.equal("http://example.com/start.html");
            getSelectedView.returns(scroller);

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
            expect(link1.tabIndex).to.equal(-1);
            expect(link2.tabIndex).to.equal(-1);
            expect(document.body.style.overflow).not.to.equal("hidden");

            click(contentsControl);
            expect(toc.className).to.contain(" active");
            expect(toc.className).not.to.contain(" inactive");
            expect(contentsControl.getAttribute("aria-expanded")).to.equal("true");
            expect(link1.tabIndex).to.equal(0);
            expect(link2.tabIndex).to.equal(0);
            expect(document.body.style.overflow).to.equal("hidden");

            click(link2);
            expect(toc.className).to.contain(" inactive");
            expect(toc.className).not.to.contain(" active");
            expect(contentsControl.getAttribute("aria-expanded")).to.equal("false");
            expect(iframe.src).to.equal("http://example.com/subitem-1.html");
            expect(link1.tabIndex).to.equal(-1);
            expect(link2.tabIndex).to.equal(-1);
            expect(document.body.style.overflow).not.to.equal("hidden");

            await pause();
            expect(saveLastReadingPosition.callCount).to.equal(3);

            // Clicking the link that's already open won't reload the iframe.
            click(contentsControl);
            click(link2);
            expect(toc.className).to.contain(" inactive");
            expect(toc.className).not.to.contain(" active");
            expect(contentsControl.getAttribute("aria-expanded")).to.equal("false");
            expect(iframe.src).to.equal("http://example.com/subitem-1.html");
            expect(link1.tabIndex).to.equal(-1);
            expect(link2.tabIndex).to.equal(-1);
            expect(document.body.style.overflow).not.to.equal("hidden");

            await pause();
            expect(saveLastReadingPosition.callCount).to.equal(3);
        });

        it("should navigate to a toc item that points to an anchor in a resource", async () => {
            const manifest = new Manifest({
                metadata: {
                    title: "Title"
                },
                spine: [
                    { href: "item-1.html" },
                    { href: "item-2.html" } 
                ],
                toc: [
                    { href: "item-1.html" },
                    { href: "item-2.html#chapter1" },
                    { href: "item-2.html#chapter2" } 
                ]
            }, new URL("http://example.com/manifest.json"));
            store.set("manifest", JSON.stringify(manifest));

            (navigator as IFrameNavigator) = await IFrameNavigator.create({
                element,
                manifestUrl: new URL("http://example.com/manifest.json"),
                store,
                settings,
                annotator,
                publisher,
                serif,
                sans,
                day,
                sepia,
                night,
                paginator,
                scroller,
                eventHandler
            });
            const toc = element.querySelector(".contents-view") as HTMLDivElement;
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            expect(iframe.src).to.equal("http://example.com/item-1.html");
            const contentsControl = element.querySelector("button.contents") as HTMLButtonElement;
            click(contentsControl);

            const links = toc.querySelectorAll("li > a");
            const link2 = links[1] as HTMLAnchorElement;
            const link3 = links[2] as HTMLAnchorElement;

            // Click a link that goes to an anchor in a different resource.
            click(link2);

            await pause();
            expect(iframe.src).to.equal("http://example.com/item-2.html");
            expect(paginatorGoToElement.callCount).to.equal(1);
            expect(paginatorGoToElement.args[0][0]).to.equal("chapter1");

            // Click a link that goes to another anchor in the same resource.
            click(link3);

            await pause();
            expect(iframe.src).to.equal("http://example.com/item-2.html");
            expect(paginatorGoToElement.callCount).to.equal(2);
            expect(paginatorGoToElement.args[1][0]).to.equal("chapter2");
        });

        it("should set class on the active toc item", async () => {
            const manifest = new Manifest({
                metadata: {
                    title: "Title"
                },
                spine: [
                    { href: "start.html", title: "Start" },
                    { href: "item-1.html", title: "Item 1" },
                    { href: "item-2.html" },
                    { href: "item-3.html" }
                ],
                toc: [
                    {
                        href: "item-1.html#_idParaDest-1",
                        title: "Item 1",
                        children: [
                            { href: "subitem-1.html", title: "Subitem 1" },
                            { href: "subitem-2.html", title: "Subitem 2" }
                        ]
                    },
                    { href: "item-2.html", "title": "Item 2" }
                ]
            }, new URL("http://example.com/manifest.json"));
            store.set("manifest", JSON.stringify(manifest));

            (navigator as IFrameNavigator) = await IFrameNavigator.create({
                element,
                manifestUrl: new URL("http://example.com/manifest.json"),
                store,
                settings,
                annotator,
                publisher,
                serif,
                sans,
                day,
                sepia,
                night,
                paginator,
                scroller,
                eventHandler
            });

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

        it("should close when escape is pressed", () => {
            const toc = element.querySelector(".contents-view") as HTMLDivElement; 
            const contentsControl = element.querySelector("button.contents") as HTMLButtonElement;

            click(contentsControl);
            expect(toc.className).not.to.contain(" inactive");
            expect(toc.className).to.contain(" active");

            // Press a key that's not escape.
            let event = new KeyboardEvent("keydown", { keyCode: 19 } as any);
            toc.dispatchEvent(event);
            expect(toc.className).not.to.contain(" inactive");
            expect(toc.className).to.contain(" active");

            // Press escape.
            event = new KeyboardEvent("keydown", { keyCode: 27 } as any);
            toc.dispatchEvent(event);
            expect(toc.className).to.contain(" inactive");
            expect(toc.className).not.to.contain(" active");
        });

        it("should hide rest of page from screen readers when open", () => {
            const main = element.querySelector("main") as HTMLElement;
            const navs = element.querySelectorAll("nav");
            const topNav = navs[0] as HTMLElement;
            const bottomNav = navs[1] as HTMLElement;

            const toc = element.querySelector(".contents-view") as HTMLDivElement; 
            const contentsControl = element.querySelector("button.contents") as HTMLButtonElement;

            click(contentsControl);

            // TOC and contents controls should be shown.
            expect(toc.getAttribute("aria-hidden")).to.equal("false");
            expect(contentsControl.getAttribute("aria-hidden")).to.equal("false");

            // Every child of main should be hidden.
            for (const child of Array.prototype.slice.call(main.children)) {
                expect(child.getAttribute("aria-hidden")).to.equal("true");
            }

            // Every button and link in the top nav other than the toc button should be hidden.
            for (const button of Array.prototype.slice.call(topNav.querySelectorAll(".controls > button, .controls > li button"))) {
                if (button !== contentsControl) {
                    expect(button.getAttribute("aria-hidden")).to.equal("true");
                }
            }
            for (const link of Array.prototype.slice.call(topNav.querySelectorAll(".controls > a, .controls > li a"))) {
                expect(link.getAttribute("aria-hidden")).to.equal("true");
            }

            // Every controls view except the toc should be hidden.
            for (const view of Array.prototype.slice.call(topNav.querySelectorAll(".controls-view"))) {
                if (view !== toc) {
                    expect(view.getAttribute("aria-hidden")).to.equal("true");
                }
            }

            // The bottom links should be hidden.
            for (const bottomLinks of Array.prototype.slice.call(bottomNav.querySelectorAll(".links"))) {
                expect(bottomLinks.getAttribute("aria-hidden")).to.equal("true");
            }

            click(contentsControl);

            // Hidden elements should be restored, except the toc view.

            for (const child of Array.prototype.slice.call(main.children)) {
                expect(child.getAttribute("aria-hidden")).to.equal("false");
            }

            for (const button of Array.prototype.slice.call(topNav.querySelectorAll(".controls > button, .controls > li button"))) {
                expect(button.getAttribute("aria-hidden")).to.equal("false");
            }
            for (const link of Array.prototype.slice.call(topNav.querySelectorAll(".controls > a, .controls > li a"))) {
                expect(link.getAttribute("aria-hidden")).to.equal("false");
            }

            for (const view of Array.prototype.slice.call(topNav.querySelectorAll(".controls-view"))) {
                expect(view.getAttribute("aria-hidden")).to.equal("true");
            }

            for (const bottomLinks of Array.prototype.slice.call(bottomNav.querySelectorAll(".links"))) {
                expect(bottomLinks.getAttribute("aria-hidden")).to.equal("false");
            }
        });
    });

    describe("settings", () => {
        it("should show and hide when settings control is clicked", async () => {
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            const settings = element.querySelector(".settings-view") as HTMLDivElement;
            const settingsControl = element.querySelector("button.settings") as HTMLButtonElement;
            const openIcon = settingsControl.querySelector(".icon.open") as SVGElement;
            const closeIcon = settingsControl.querySelector(".icon.close") as SVGElement;

            settings.innerHTML = "<button tabindex=-1>Test</button>";
            const button = settings.querySelector("button") as HTMLButtonElement;

            expect(settings.className).to.contain(" inactive");
            expect(settingsControl.getAttribute("aria-expanded")).to.equal("false");
            expect(iframe.src).to.equal("http://example.com/start.html");
            expect(button.tabIndex).to.equal(-1);
            expect(openIcon.getAttribute("class")).not.to.contain(" inactive");
            expect(closeIcon.getAttribute("class")).to.contain(" inactive");

            click(settingsControl);
            expect(settings.className).to.contain(" active");
            expect(settings.className).not.to.contain(" inactive");
            expect(settingsControl.getAttribute("aria-expanded")).to.equal("true");
            expect(iframe.src).to.equal("http://example.com/start.html");
            expect(button.tabIndex).to.equal(0);
            expect(openIcon.getAttribute("class")).to.contain(" inactive");
            expect(closeIcon.getAttribute("class")).not.to.contain(" inactive");

            click(settingsControl);
            expect(settings.className).to.contain(" inactive");
            expect(settings.className).not.to.contain(" active");
            expect(settingsControl.getAttribute("aria-expanded")).to.equal("false");
            expect(iframe.src).to.equal("http://example.com/start.html");
            expect(button.tabIndex).to.equal(-1);
            expect(openIcon.getAttribute("class")).not.to.contain(" inactive");
            expect(closeIcon.getAttribute("class")).to.contain(" inactive");
        });

        it("should hide settings and nav when settings view is clicked", async () => {
            const settings = element.querySelector(".settings-view") as HTMLDivElement;
            const settingsControl = element.querySelector("button.settings") as HTMLButtonElement;
            const links = element.querySelector(".links.top") as HTMLDivElement;

            settings.innerHTML = "<button tabindex=-1>Test</button>";
            const button = settings.querySelector("button") as HTMLButtonElement;

            expect(settings.className).to.contain(" inactive");
            expect(settings.className).not.to.contain(" active");
            expect(settingsControl.getAttribute("aria-expanded")).to.equal("false");
            expect(button.tabIndex).to.equal(-1);
            expect(links.className).to.contain(" active");

            click(settingsControl);
            expect(settings.className).to.contain(" active");
            expect(settings.className).not.to.contain(" inactive");
            expect(settingsControl.getAttribute("aria-expanded")).to.equal("true");
            expect(button.tabIndex).to.equal(0);
            expect(links.className).to.contain(" active");

            click(settings);
            expect(settings.className).to.contain(" inactive");
            expect(settings.className).not.to.contain(" active");
            expect(settingsControl.getAttribute("aria-expanded")).to.equal("false");
            expect(button.tabIndex).to.equal(-1);
            expect(links.className).not.to.contain(" active");
            expect(links.className).to.contain(" inactive");
        });

        it("should close when escape is pressed", () => {
            const settings = element.querySelector(".settings-view") as HTMLDivElement; 
            const settingsControl = element.querySelector("button.settings") as HTMLButtonElement;

            click(settingsControl);
            expect(settings.className).not.to.contain(" inactive");
            expect(settings.className).to.contain(" active");

            // Press a key that's not escape.
            let event = new KeyboardEvent("keydown", { keyCode: 19 } as any);
            settings.dispatchEvent(event);
            expect(settings.className).not.to.contain(" inactive");
            expect(settings.className).to.contain(" active");

            // Press escape.
            event = new KeyboardEvent("keydown", { keyCode: 27 } as any);
            settings.dispatchEvent(event);
            expect(settings.className).to.contain(" inactive");
            expect(settings.className).not.to.contain(" active");
        });

        it("should hide rest of page from screen readers when open", () => {
            const main = element.querySelector("main") as HTMLElement;
            const navs = element.querySelectorAll("nav");
            const topNav = navs[0] as HTMLElement;
            const bottomNav = navs[1] as HTMLElement;

            const settings = element.querySelector(".settings-view") as HTMLDivElement; 
            const settingsControl = element.querySelector("button.settings") as HTMLButtonElement;

            click(settingsControl);

            // Settings and its controls should be shown.
            expect(settings.getAttribute("aria-hidden")).to.equal("false");
            expect(settingsControl.getAttribute("aria-hidden")).to.equal("false");

            // Every child of main should be hidden.
            for (const child of Array.prototype.slice.call(main.children)) {
                expect(child.getAttribute("aria-hidden")).to.equal("true");
            }

            // Every button and link in the top nav other than the settings button should be hidden.
            for (const button of Array.prototype.slice.call(topNav.querySelectorAll(".controls > button, .controls > li button"))) {
                if (button !== settingsControl) {
                    expect(button.getAttribute("aria-hidden")).to.equal("true");
                }
            }
            for (const link of Array.prototype.slice.call(topNav.querySelectorAll(".controls > a, .controls > li a"))) {
                expect(link.getAttribute("aria-hidden")).to.equal("true");
            }

            // Every controls view except the settings should be hidden.
            for (const view of Array.prototype.slice.call(topNav.querySelectorAll(".controls-view"))) {
                if (view !== settings) {
                    expect(view.getAttribute("aria-hidden")).to.equal("true");
                }
            }

            // The bottom links should be hidden.
            for (const bottomLinks of Array.prototype.slice.call(bottomNav.querySelectorAll(".links"))) {
                expect(bottomLinks.getAttribute("aria-hidden")).to.equal("true");
            }

            click(settingsControl);

            // Hidden elements should be restored, except the settings view.

            for (const child of Array.prototype.slice.call(main.children)) {
                expect(child.getAttribute("aria-hidden")).to.equal("false");
            }

            for (const button of Array.prototype.slice.call(topNav.querySelectorAll(".controls > button, .controls > li button"))) {
                expect(button.getAttribute("aria-hidden")).to.equal("false");
            }
            for (const link of Array.prototype.slice.call(topNav.querySelectorAll(".controls > a, .controls > li a"))) {
                expect(link.getAttribute("aria-hidden")).to.equal("false");
            }

            for (const view of Array.prototype.slice.call(topNav.querySelectorAll(".controls-view"))) {
                expect(view.getAttribute("aria-hidden")).to.equal("true");
            }

            for (const bottomLinks of Array.prototype.slice.call(bottomNav.querySelectorAll(".links"))) {
                expect(bottomLinks.getAttribute("aria-hidden")).to.equal("false");
            }
        });
    });

    describe("scrolling suggestion", () => {
        it("should show in paginated mode but not scrolling mode", async () => {
            let scrollingSuggestion = element.querySelector(".scrolling-suggestion") as HTMLAnchorElement;
            expect(scrollingSuggestion.style.display).not.to.equal("none");

            getSelectedView.returns(scroller);            
            (navigator as IFrameNavigator) = await IFrameNavigator.create({
                element,
                manifestUrl: new URL("http://example.com/manifest.json"),
                store,
                settings,
                annotator,
                publisher,
                serif,
                sans,
                day,
                sepia,
                night,
                paginator,
                scroller,
                eventHandler
            });
            scrollingSuggestion = element.querySelector(".scrolling-suggestion") as HTMLAnchorElement;
            
            expect(scrollingSuggestion.style.display).to.equal("none");
        });

        it("should hide when book view changes to scroller and show when it changes to paginator", async () => {
            let scrollingSuggestion = element.querySelector(".scrolling-suggestion") as HTMLAnchorElement;
            const updateBookView = onViewChange.args[0][0];

            updateBookView();
            expect(scrollingSuggestion.style.display).not.to.equal("none");

            getSelectedView.returns(scroller);

            updateBookView();
            expect(scrollingSuggestion.style.display).to.equal("none");

            getSelectedView.returns(paginator);

            updateBookView();
            expect(scrollingSuggestion.style.display).not.to.equal("none");
        });
    });
});