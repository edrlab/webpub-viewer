import { expect } from "chai";
import { stub } from "sinon";
import * as jsdom from "jsdom";

import IFrameNavigator from "../src/IFrameNavigator";
import Cacher from "../src/Cacher";
import BookView from "../src/BookView";
import PaginatedBookView from "../src/PaginatedBookView";
import Annotator from "../src/Annotator";
import Manifest from "../src/Manifest";
import BookSettings from "../src/BookSettings";

describe("IFrameNavigator", () => {
    let getManifest: Sinon.SinonStub;
    let cacher: Cacher;

    let paginatorStart: Sinon.SinonStub;
    let onFirstPage: Sinon.SinonStub;
    let onLastPage: Sinon.SinonStub;
    let goToPreviousPage: Sinon.SinonStub;
    let goToNextPage: Sinon.SinonStub;
    let goToPosition: Sinon.SinonStub;
    let paginator: PaginatedBookView;

    let getLastReadingPosition: Sinon.SinonStub;
    let saveLastReadingPosition: Sinon.SinonStub;
    let annotator: Annotator;

    let settingsStart: Sinon.SinonStub;
    let getSelectedView: Sinon.SinonStub;    
    let settings: BookSettings;

    let element: HTMLElement;
    let navigator: IFrameNavigator;
    let span: HTMLElement;
    let link: HTMLAnchorElement;
    let linkClicked: Sinon.SinonStub;
    let parentLink: HTMLAnchorElement;
    let parentLinkClicked: Sinon.SinonStub;

    class MockCacher implements Cacher {
        public start() {
            return new Promise<void>(resolve => resolve());
        }
        public getManifest(manifestUrl: string) {
            return getManifest(manifestUrl);
        }
    }

    class MockPaginator implements PaginatedBookView {
        public name = "mock"
        public label = "mock"
        public start(element: HTMLElement, position: number) {
            return paginatorStart(element, position);
        }
        public stop(): Promise<void> {
            return new Promise<void>(resolve => resolve());
        }
        public getCurrentPosition() {
            return 0.25;
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
            goToPosition(position);
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
            saveLastReadingPosition(position);
            return new Promise<any>(resolve => resolve());
        }
    }

    class MockSettings extends BookSettings {
        public start(controlsElement: HTMLElement, bookElement:  Element, bookViews: BookView[], selectedView: BookView, onViewChange: () => void) {
            return settingsStart(controlsElement, bookElement, bookViews, selectedView, onViewChange);
        }
        public getSelectedView() {
            return getSelectedView();
        }
    }

    const manifest = new Manifest({
        spine: [
            { href: "start.html" },
            { href: "item-1.html" },
            { href: "item-2.html" }
        ],
        toc: [
            { href: "item-1.html", "title": "Item 1" },
            { href: "item-2.html", "title": "Item 2" }
        ]
    }, "http://example.com/manifest.json");

    const click = (element: any) => {
        const event = document.createEvent("HTMLEvents");
        event.initEvent("click", false, true);
        element.dispatchEvent(event);
    };

    const pause = (ms = 0): Promise<void> => {
        return new Promise<void>(resolve => setTimeout(resolve, ms));
    };

    beforeEach(() => {
        getManifest = stub().returns(new Promise(resolve => resolve(manifest)));
        cacher = new MockCacher();

        paginatorStart = stub().returns(new Promise(resolve => resolve()));
        onFirstPage = stub().returns(false);
        onLastPage = stub().returns(false);
        goToPreviousPage = stub();
        goToNextPage = stub();
        goToPosition = stub();
        paginator = new MockPaginator();

        getLastReadingPosition = stub();
        saveLastReadingPosition = stub();
        annotator = new MockAnnotator();

        settingsStart = stub().returns(new Promise(resolve => resolve()));
        getSelectedView = stub().returns(paginator);
        settings = new MockSettings();        

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
        navigator = new IFrameNavigator(cacher, paginator, annotator, settings);

        span = window.document.createElement("span");
        link = window.document.createElement("a");
        link.href = "http://example.com";
        link.protocol = "http";
        link.port = "";
        link.hostname = "example.com";
        linkClicked = stub();
        link.addEventListener("click", linkClicked);

        parentLink = window.document.createElement("a");
        parentLink.href = "http://example.com";
        parentLink.protocol = "http";
        parentLink.port = "";
        parentLink.hostname = "example.com";
        parentLinkClicked = stub();
        parentLink.addEventListener("click", parentLinkClicked);
        const child = window.document.createElement("span");
        parentLink.appendChild(child);
    });

    describe("#start", () => {
        it("should set element's HTML", async () => {
            expect(element.innerHTML).not.to.contain("iframe");
            expect(element.innerHTML).not.to.contain("controls");
            expect(element.innerHTML).not.to.contain("previous-page");
            expect(element.innerHTML).not.to.contain("next-page");
            expect(element.innerHTML).not.to.contain("links-toggle");
            await navigator.start(element, "http://example.com/manifest.json");
            expect(element.innerHTML).to.contain("iframe");
            expect(element.innerHTML).to.contain("controls");
            expect(element.innerHTML).to.contain("previous-page");
            expect(element.innerHTML).to.contain("next-page");
            expect(element.innerHTML).to.contain("links-toggle");
        });

        it("should start the settings", async () => {
            await navigator.start(element, "http://example.com/manifest.json");
            expect(settingsStart.callCount).to.equal(1);
            const settingsView = element.querySelector("div[class='settings-view controls-view']") as HTMLDivElement;
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            expect(settingsStart.args[0][0]).to.equal(settingsView);
            expect(settingsStart.args[0][1]).to.equal(iframe);
            expect(settingsStart.args[0][2]).to.contain(paginator);
            expect(settingsStart.args[0][3]).to.equal(paginator);
        });

        it("should give the settings a function to update the book view when a new view is selected", async () => {
            await navigator.start(element, "http://example.com/manifest.json");
            expect(settingsStart.callCount).to.equal(1);
            let paginationControls = element.querySelector("div[class=pagination-controls]") as HTMLDivElement;
            let iframe = element.querySelector("iframe") as HTMLIFrameElement;

            await pause();
            expect(saveLastReadingPosition.callCount).to.equal(1);

            const args = settingsStart.args[0];
            const updateBookView = args[4];
            updateBookView();
            expect(paginationControls.style.display).not.to.equal("none");

            // A scroll event does nothing when the paginator is selected.
            iframe.contentDocument.body.onscroll(new UIEvent("scroll"));
            expect(saveLastReadingPosition.callCount).to.equal(1);

            const scroller = args[2][0];
            getSelectedView.returns(scroller);

            await navigator.start(element, "http://example.com/manifest.json");
            expect(settingsStart.callCount).to.equal(2);
            paginationControls = element.querySelector("div[class=pagination-controls]") as HTMLDivElement;
            iframe = element.querySelector("iframe") as HTMLIFrameElement;

            await pause();
            expect(saveLastReadingPosition.callCount).to.equal(2);

            updateBookView();
            expect(paginationControls.style.display).to.equal("none");

            // Now a scroll event saves the new reading position.
            await iframe.contentDocument.body.onscroll(new UIEvent("scroll"));
            expect(saveLastReadingPosition.callCount).to.equal(3);
        });

        it("should start the selected book view", async () => {
            await navigator.start(element, "http://example.com/manifest.json");
            await pause();
            expect(paginatorStart.callCount).to.equal(1);
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            expect(paginatorStart.args[0][0]).to.equal(iframe);
            expect(paginatorStart.args[0][1]).to.equal(0);
        });

        it("should load first spine item in the iframe", async () => {
            await navigator.start(element, "http://example.com/manifest.json");
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

        it("should navigate to the first spine item", async () => {
            await navigator.start(element, "http://example.com/manifest.json");
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            iframe.src = "http://example.com/some-other-page.html";

            const startLink = element.querySelector("a[rel=start]") as HTMLAnchorElement;
            expect(startLink.href).to.equal("http://example.com/start.html");
            click(startLink);
            expect(iframe.src).to.equal("http://example.com/start.html");
        });

        it("should navigate to the previous spine item", async () => {
            await navigator.start(element, "http://example.com/manifest.json");
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
            await navigator.start(element, "http://example.com/manifest.json");
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

        it("should toggle the navigation links", async () => {
            jsdom.changeURL(window, "http://example.com");
            await navigator.start(element, "http://example.com/manifest.json");
            const links = element.querySelector("ul[class=links]") as HTMLUListElement;
            const toggleElement = element.querySelector("div[class=links-toggle]");
            
            // Initially, the navigation links are visible.
            expect(links.style.display).not.to.equal("none");

            const iframe = element.querySelector("iframe") as HTMLIFrameElement;

            // If you click a link in the iframe, it doesn't toggle the links.
            iframe.contentDocument.elementFromPoint = stub().returns(link);
            click(toggleElement);
            expect(linkClicked.callCount).to.equal(1);
            expect(links.style.display).not.to.equal("none");

            // If the link is on a different origin, it opens in a new window.
            const openStub = stub(window, "open");
            link.hostname = "anotherexample.com";
            click(toggleElement);
            expect(linkClicked.callCount).to.equal(1);
            expect(openStub.callCount).to.equal(1);
            openStub.restore();

            // If you click an element inside a link, it still doesn't toggle.
            iframe.contentDocument.elementFromPoint = stub().returns(parentLink);
            click(toggleElement);
            expect(parentLinkClicked.callCount).to.equal(1);
            expect(links.style.display).not.to.equal("none");

            // But if you click somewhere else, it toggles.
            iframe.contentDocument.elementFromPoint = stub().returns(span);
            click(toggleElement);
            expect(links.style.display).to.equal("none");
            click(toggleElement);
            expect(links.style.display).not.to.equal("none");
        });

        it("should go to previous page", async () => {
            jsdom.changeURL(window, "http://example.com");
            await navigator.start(element, "http://example.com/manifest.json");
            const previousPageElement = element.querySelector("div[class=previous-page]");
            
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;

            // If you click a link in the iframe, it doesn't change the page.
            iframe.contentDocument.elementFromPoint = stub().returns(link);
            click(previousPageElement);
            expect(linkClicked.callCount).to.equal(1);
            expect(onFirstPage.callCount).to.equal(0);
            expect(goToPreviousPage.callCount).to.equal(0);

            iframe.contentDocument.elementFromPoint = stub().returns(span);

            // If you're not on the first page, it goes to the previous page.
            click(previousPageElement);
            expect(onFirstPage.callCount).to.equal(1);
            expect(goToPreviousPage.callCount).to.equal(1);

            await pause();
            expect(saveLastReadingPosition.callCount).to.equal(2);
            expect(saveLastReadingPosition.args[1][0]).to.deep.equal({
                resource: "http://example.com/start.html",
                position: 0.25
            });

            // If you're on the first page of the first spine item, it does nothing.
            onFirstPage.returns(true);
            click(previousPageElement);
            expect(onFirstPage.callCount).to.equal(2);
            expect(goToPreviousPage.callCount).to.equal(1);
            expect(iframe.src).to.equal("http://example.com/start.html");

            // If you're on the first page of a later spine item, it goes to the
            // last page of the previous spine item.
            iframe.src = "http://example.com/item-2.html";
            await pause();
            iframe.contentDocument.elementFromPoint = stub().returns(span);
            expect(paginatorStart.callCount).to.equal(2);

            click(previousPageElement);
            expect(onFirstPage.callCount).to.equal(3);
            expect(goToPreviousPage.callCount).to.equal(1);
            expect(iframe.src).to.equal("http://example.com/item-1.html");

            await pause();
            expect(paginatorStart.callCount).to.equal(3);
            expect(paginatorStart.args[2][0]).to.equal(iframe);
            expect(paginatorStart.args[2][1]).to.equal(1);

            expect(saveLastReadingPosition.callCount).to.equal(4);
            expect(saveLastReadingPosition.args[3][0]).to.deep.equal({
                resource: "http://example.com/item-1.html",
                position: 0.25
            });
        });

        it("should go to next page", async () => {
            jsdom.changeURL(window, "http://example.com");
            await navigator.start(element, "http://example.com/manifest.json");
            const nextPageElement = element.querySelector("div[class=next-page]");
            
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;

            // If you click a link in the iframe, it doesn't change the page.
            iframe.contentDocument.elementFromPoint = stub().returns(link);
            click(nextPageElement);
            expect(linkClicked.callCount).to.equal(1);
            expect(onLastPage.callCount).to.equal(0);
            expect(goToNextPage.callCount).to.equal(0);

            iframe.contentDocument.elementFromPoint = stub().returns(span);

            // If you're not on the last page, it goes to the next page.
            click(nextPageElement);
            expect(onLastPage.callCount).to.equal(1);
            expect(goToNextPage.callCount).to.equal(1);

            await pause();
            expect(saveLastReadingPosition.callCount).to.equal(2);
            expect(saveLastReadingPosition.args[1][0]).to.deep.equal({
                resource: "http://example.com/start.html",
                position: 0.25
            });

            // If you're on the last page of the last spine item, it does nothing.
            iframe.src = "http://example.com/item-2.html";
            await pause();
            iframe.contentDocument.elementFromPoint = stub().returns(span);
            onLastPage.returns(true);

            click(nextPageElement);
            expect(onLastPage.callCount).to.equal(2);
            expect(goToNextPage.callCount).to.equal(1);
            expect(iframe.src).to.equal("http://example.com/item-2.html");

            // If you're on the last page of an earlier spine item, it goes to the
            // first page of the next spine item.
            iframe.src = "http://example.com/item-1.html";
            await pause();
            iframe.contentDocument.elementFromPoint = stub().returns(span);
            expect(paginatorStart.callCount).to.equal(3);

            click(nextPageElement);
            expect(onLastPage.callCount).to.equal(3);
            expect(goToNextPage.callCount).to.equal(1);
            expect(iframe.src).to.equal("http://example.com/item-2.html");

            await pause();
            expect(paginatorStart.callCount).to.equal(4);
            expect(paginatorStart.args[3][0]).to.equal(iframe);
            expect(paginatorStart.args[3][1]).to.equal(0);

            expect(saveLastReadingPosition.callCount).to.equal(5);
            expect(saveLastReadingPosition.args[4][0]).to.deep.equal({
                resource: "http://example.com/item-2.html",
                position: 0.25
            });
        });

        it("should maintain paginator position when window is resized", async () => {
            await navigator.start(element, "http://example.com/manifest.json");
            window.dispatchEvent(new Event('resize'));
            expect(goToPosition.callCount).to.equal(1);
            expect(goToPosition.args[0][0]).to.equal(0.25);
        });

        it("should show loading message while iframe is loading", async () => {
            await navigator.start(element, "http://example.com/manifest.json");
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            const loading = element.querySelector("div[class=loading]") as any;
            const next = element.querySelector("a[rel=next]") as HTMLAnchorElement;

            // Slow down the paginator so the loading message has time to appear.
            paginatorStart.returns(new Promise<void>(async (resolve) => {
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

        it("should set iframe margin", async () => {
            await navigator.start(element, "http://example.com/manifest.json");
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            const navigation = element.querySelector("div[class=controls]") as HTMLUListElement;
            (navigation as any).clientHeight = 10;
            await pause();

            const next = element.querySelector("a[rel=next]") as HTMLAnchorElement;
            click(next);
            await pause();
            expect(iframe.style.marginTop).to.equal("15px");
        });
    });

    describe("table of contents", () => {
        it("should render each link in the manifest toc", async () => {
            await navigator.start(element, "http://example.com/manifest.json");
            const toc = element.querySelector("div[class='contents-view controls-view']") as HTMLDivElement;

            const list = toc.querySelector("ul") as HTMLUListElement;
            expect(list.tagName.toLowerCase()).to.equal("ul");

            const links = list.querySelectorAll("li > a");
            expect(links.length).to.equal(2);

            const link1 = links[0] as HTMLAnchorElement;
            const link2 = links[1] as HTMLAnchorElement;
            expect(link1.href).to.equal("http://example.com/item-1.html");
            expect(link1.text).to.equal("Item 1");
            expect(link2.href).to.equal("http://example.com/item-2.html");
            expect(link2.text).to.equal("Item 2");
        });

        it("should show and hide when contents link is clicked", async () => {
            await navigator.start(element, "http://example.com/manifest.json");
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            const toc = element.querySelector("div[class='contents-view controls-view']") as HTMLDivElement;
            expect(toc.style.display).to.equal("none");
            expect(iframe.src).to.equal("http://example.com/start.html");

            const contentsLink = element.querySelector("a[rel=contents]") as HTMLAnchorElement;
            click(contentsLink);
            expect(toc.style.display).not.to.equal("none");
            expect(iframe.src).to.equal("http://example.com/start.html");

            click(contentsLink);
            expect(toc.style.display).to.equal("none");
            expect(iframe.src).to.equal("http://example.com/start.html");
        });

        it("should hide when other navigation links are clicked", async () => {
            await navigator.start(element, "http://example.com/manifest.json");
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            iframe.contentDocument.elementFromPoint = stub().returns(span);
            const toc = element.querySelector("div[class='contents-view controls-view']") as HTMLDivElement;

            const contentsLink = element.querySelector("a[rel=contents]") as HTMLAnchorElement;
            click(contentsLink);
            expect(toc.style.display).not.to.equal("none");

            iframe.src = "http://example.com/item-1.html";
            await pause();

            const nextChapterLink = element.querySelector("a[rel=next]") as HTMLAnchorElement;
            click(nextChapterLink);
            await pause();
            expect(toc.style.display).to.equal("none");

            click(contentsLink);
            expect(toc.style.display).not.to.equal("none");

            const previousChapterLink = element.querySelector("a[rel=prev]") as HTMLAnchorElement;
            click(previousChapterLink);
            await pause();
            expect(toc.style.display).to.equal("none");
        });

        it("should navigate to a toc item", async () => {
            await navigator.start(element, "http://example.com/manifest.json");
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            const toc = element.querySelector("div[class='contents-view controls-view']") as HTMLDivElement;
            expect(iframe.src).to.equal("http://example.com/start.html");

            const contentsLink = element.querySelector("a[rel=contents]") as HTMLAnchorElement;
            click(contentsLink);

            const links = toc.querySelectorAll("li > a");
            const link1 = links[0] as HTMLAnchorElement;
            const link2 = links[1] as HTMLAnchorElement;

            click(link1);
            expect(toc.style.display).to.equal("none");
            expect(iframe.src).to.equal("http://example.com/item-1.html");

            click(contentsLink);
            expect(toc.style.display).not.to.equal("none");

            click(link2);
            expect(toc.style.display).to.equal("none");
            expect(iframe.src).to.equal("http://example.com/item-2.html");
        });

        it("should set class on the active toc item", async () => {
            await navigator.start(element, "http://example.com/manifest.json");
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            const toc = element.querySelector("div[class='contents-view controls-view']") as HTMLDivElement;

            const links = toc.querySelectorAll("li > a");
            const link1 = links[0] as HTMLAnchorElement;
            const link2 = links[1] as HTMLAnchorElement;

            expect(link1.className).to.equal("");
            expect(link2.className).to.equal("");

            iframe.src = "http://example.com/item-1.html";
            await pause();
            expect(link1.className).to.equal("active");
            expect(link2.className).to.equal("");

            iframe.src = "http://example.com/item-2.html";
            await pause();
            expect(link1.className).to.equal("");
            expect(link2.className).to.equal("active");
        });
    });

    describe("settings", () => {
        it("should show and hide when settings link is clicked", async () => {
            await navigator.start(element, "http://example.com/manifest.json");
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            const settings = element.querySelector("div[class='settings-view controls-view']") as HTMLDivElement;
            expect(settings.style.display).to.equal("none");
            expect(iframe.src).to.equal("http://example.com/start.html");

            const settingsLink = element.querySelector("a[class=settings]") as HTMLAnchorElement;
            click(settingsLink);
            expect(settings.style.display).not.to.equal("none");
            expect(iframe.src).to.equal("http://example.com/start.html");

            click(settingsLink);
            expect(settings.style.display).to.equal("none");
            expect(iframe.src).to.equal("http://example.com/start.html");
        });
    });
});