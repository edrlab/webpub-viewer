import { expect } from "chai";
import { stub } from "sinon";
import * as jsdom from "jsdom";

import IFrameNavigator from "../src/IFrameNavigator";
import Cacher from "../src/Cacher";
import Manifest from "../src/Manifest";

describe("IFrameNavigator", () => {
    let getManifest: Sinon.SinonStub;
    let cacher: Cacher;
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
        navigator = new IFrameNavigator(cacher);
    });

    describe("#start", () => {
        it("should set element's HTML", async () => {
            expect(element.innerHTML).not.to.contain("iframe");
            expect(element.innerHTML).not.to.contain("controls");
            await navigator.start(element, "http://example.com/manifest.json");
            expect(element.innerHTML).to.contain("iframe");
            expect(element.innerHTML).to.contain("controls");
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

        it("should navigate to the previous page", async () => {
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

        it("should navigate to the next page", async () => {
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
    });
});