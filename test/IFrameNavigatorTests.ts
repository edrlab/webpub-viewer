import { expect } from "chai";
import { stub } from "sinon";
import * as jsdom from "jsdom";

import IFrameNavigator from "../src/IFrameNavigator";
import Cacher from "../src/Cacher";
import Paginator from "../src/Paginator";
import Manifest from "../src/Manifest";

describe("IFrameNavigator", () => {
    let getManifest: Sinon.SinonStub;
    let cacher: Cacher;

    let paginatorStart: Sinon.SinonStub;
    let onFirstPage: Sinon.SinonStub;
    let onLastPage: Sinon.SinonStub;
    let goToPreviousPage: Sinon.SinonStub;
    let goToNextPage: Sinon.SinonStub;
    let paginator: Paginator;

    let element: HTMLElement;
    let navigator: IFrameNavigator;

    class MockCacher implements Cacher {
        public start() {
            return new Promise<void>(resolve => resolve());
        }
        public getManifest(manifestUrl: string) {
            return getManifest(manifestUrl);
        }
    }

    class MockPaginator implements Paginator {
        public start(element: HTMLElement, goingToLastPage: boolean = false) {
            return paginatorStart(element, goingToLastPage);
        }
        public getCurrentPosition() {
            return 1;
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
        public goToPosition() {}
    }

    let manifest = new Manifest({
        spine: [
            { href: "start.html" },
            { href: "item-1.html" },
            { href: "item-2.html" }
        ],
        resources: [
            { rel: ["contents"], href: "toc.html" }
        ]
    }, "http://example.com/manifest.json");

    let click = (element: any) => {
        let event = document.createEvent("HTMLEvents");
        event.initEvent("click", false, true);
        element.dispatchEvent(event);
    };

    let pause = (ms = 0): Promise<void> => {
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
        paginator = new MockPaginator();

        let window = jsdom.jsdom("", ({
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
        navigator = new IFrameNavigator(cacher, paginator);
    });

    describe("#start", () => {
        it("should set element's HTML without pagination controls", async () => {
            navigator = new IFrameNavigator(cacher);
            expect(element.innerHTML).not.to.contain("iframe");
            expect(element.innerHTML).not.to.contain("controls");
            await navigator.start(element, "http://example.com/manifest.json");
            expect(element.innerHTML).to.contain("iframe");
            expect(element.innerHTML).to.contain("controls");
            expect(element.innerHTML).not.to.contain("previous-page");
            expect(element.innerHTML).not.to.contain("next-page");
            expect(element.innerHTML).not.to.contain("links-toggle");
        });

        it("should set element's HTML with pagination controls", async () => {
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

        it("should start the paginator", async () => {
            await navigator.start(element, "http://example.com/manifest.json");
            expect(paginatorStart.callCount).to.equal(1);
            let iframe = element.querySelector("iframe") as HTMLIFrameElement;
            expect(paginatorStart.args[0][0]).to.equal(iframe);
            expect(paginatorStart.args[0][1]).to.equal(false);
        });

        it("should load first spine item in the iframe", async () => {
            await navigator.start(element, "http://example.com/manifest.json");
            let iframe = element.querySelector("iframe") as HTMLIFrameElement;
            expect(iframe).not.to.be.null;
            expect(iframe.src).to.equal("http://example.com/start.html");
        });

        it("should navigate to the first spine item", async () => {
            await navigator.start(element, "http://example.com/manifest.json");
            let iframe = element.querySelector("iframe") as HTMLIFrameElement;
            iframe.src = "http://example.com/some-other-page.html";

            let startLink = element.querySelector("a[rel=start]") as HTMLAnchorElement;
            expect(startLink.href).to.equal("http://example.com/start.html");
            click(startLink);
            expect(iframe.src).to.equal("http://example.com/start.html");
        });

        it("should navigate to the table of contents", async () => {
            await navigator.start(element, "http://example.com/manifest.json");
            let iframe = element.querySelector("iframe") as HTMLIFrameElement;
            let toc = element.querySelector("a[rel=contents]") as HTMLAnchorElement;
            expect(toc.href).to.equal("http://example.com/toc.html");
            click(toc);
            expect(iframe.src).to.equal("http://example.com/toc.html");
        });

        it("should navigate to the previous spine item", async () => {
            await navigator.start(element, "http://example.com/manifest.json");
            let iframe = element.querySelector("iframe") as HTMLIFrameElement;
            let originalSrc = iframe.src;
            let previous = element.querySelector("a[rel=prev]") as HTMLAnchorElement;

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

            // A page that's not in the spine won't.
            iframe.src = "http://example.com/toc.html";
            await pause();
            expect(previous.href).to.equal("");
            click(previous);
            expect(iframe.src).to.equal("http://example.com/toc.html");
        });

        it("should navigate to the next spine item", async () => {
            await navigator.start(element, "http://example.com/manifest.json");
            let iframe = element.querySelector("iframe") as HTMLIFrameElement;
            let next = element.querySelector("a[rel=next]") as HTMLAnchorElement;

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

            iframe.src = "http://example.com/toc.html";
            await pause();
            expect(next.href).to.equal("");
            click(next);
            expect(iframe.src).to.equal("http://example.com/toc.html");
        });

        it("should toggle the navigation links", async () => {
            await navigator.start(element, "http://example.com/manifest.json");
            let links = element.querySelector("ul[class=links]");
            let toggleElement = element.querySelector("div[class=links-toggle]");
            
            // Initially, the navigation links are visible.
            expect((links as any).style.display).not.to.equal("none");

            let iframe = element.querySelector("iframe") as HTMLIFrameElement;
            let link = window.document.createElement("a");
            let linkClicked = stub();
            link.addEventListener("click", linkClicked);
            let span = window.document.createElement("span");

            // If you click a link in the iframe, it doesn't toggle the links.
            iframe.contentDocument.elementFromPoint = stub().returns(link);
            click(toggleElement);
            expect(linkClicked.callCount).to.equal(1);
            expect((links as any).style.display).not.to.equal("none");

            // But if you click somewhere else, it does.
            iframe.contentDocument.elementFromPoint = stub().returns(span);
            click(toggleElement);
            expect((links as any).style.display).to.equal("none");
            click(toggleElement);
            expect((links as any).style.display).not.to.equal("none");
        });

        it("should go to previous page", async () => {
            await navigator.start(element, "http://example.com/manifest.json");
            let previousPageElement = element.querySelector("div[class=previous-page]");
            
            let iframe = element.querySelector("iframe") as HTMLIFrameElement;
            let link = window.document.createElement("a");
            let linkClicked = stub();
            link.addEventListener("click", linkClicked);
            let span = window.document.createElement("span");

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
            expect(paginatorStart.args[2][1]).to.equal(true);
        });

        it("should go to next page", async () => {
            await navigator.start(element, "http://example.com/manifest.json");
            let nextPageElement = element.querySelector("div[class=next-page]");
            
            let iframe = element.querySelector("iframe") as HTMLIFrameElement;
            let link = window.document.createElement("a");
            let linkClicked = stub();
            link.addEventListener("click", linkClicked);
            let span = window.document.createElement("span");

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
            expect(paginatorStart.args[3][1]).to.equal(false);
        });
    });
});