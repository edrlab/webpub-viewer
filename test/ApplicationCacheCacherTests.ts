import { expect } from "chai";
import { stub } from "sinon";
import * as jsdom from "jsdom";

import ApplicationCacheCacher from "../src/ApplicationCacheCacher";
import MemoryStore from "../src/MemoryStore";
import Manifest from "../src/Manifest";

describe("ApplicationCacheCacher", () => {
    let store: MemoryStore;
    let cacher: ApplicationCacheCacher;
    let element: HTMLElement;

    const mockFetchAPI = (response: Promise<Response>) => {
        window.fetch = stub().returns(response);
    };

    beforeEach(() => {
        store = new MemoryStore();
        cacher = new ApplicationCacheCacher(store, new URL("http://example.com/fallback.html"));

        const jsdomWindow = jsdom.jsdom("", ({
            // This is useful for debugging errors in an iframe load event.
            virtualConsole: jsdom.createVirtualConsole().sendTo(console),
            resourceLoader: (_: any, callback: any) => {
                // Load this HTML for every URL.
                callback(null, '<html manifest="manifest.appcache"></html>');
            },
            features: {
                FetchExternalResources: ["iframe"],
                ProcessExternalResources: ["iframe"]
            }
        } as any)).defaultView;

        element = jsdomWindow.document.createElement("div");

        // The element must be in a document for iframe load events to work.
        jsdomWindow.document.body.appendChild(element);

        (window as any).applicationCache = {
            UNCACHED: 0,
            IDLE: 1,
            CHECKING: 2,
            DOWNLOADING: 3,
            UPDATEREADY: 4,
            OBSOLETE: 5
        };
    });

    describe("#enable", () => {
        it("should load book cache url in iframe", async () => {
            const updateStatus = stub();

            // Cacher with a mock implementation of updateStatus, which
            // is tested separately.
            class MockCacher extends ApplicationCacheCacher {
                protected updateStatus() {
                    updateStatus();
                }
            }

            cacher = new MockCacher(store, new URL("http://example.com/fallback.html"));
            cacher.renderStatus(element);
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;

            expect(updateStatus.callCount).to.equal(1);

            await cacher.enable();
            expect(updateStatus.callCount).to.equal(2);
            expect(iframe.src).to.equal("http://example.com/fallback.html");

            // The iframe load handler should be tested here too, but I
            // can't figure out how to mock the application cache in its
            // content window.
        });
    });

    describe("#renderStatus", () => {
        it("should render status updates based on application cache status", async () => {
            // Cacher with a mock implementation of enable, which
            // is tested separately.
            class MockCacher extends ApplicationCacheCacher {
                public enable() {
                    this.updateStatus();
                    return new Promise<void>(resolve => resolve());
                }
            }

            cacher = new MockCacher(store, new URL("http://example.com/fallback.html"));
            await cacher.renderStatus(element);
            expect(element.innerHTML).to.contain("Not available");
            const iframe = element.querySelector("iframe") as HTMLIFrameElement;
            (iframe.contentWindow as any).applicationCache = {};

            (iframe.contentWindow as any).applicationCache.status = window.applicationCache.UPDATEREADY;
            await cacher.enable();
            expect(element.innerHTML).not.to.contain("Not available");
            expect(element.innerHTML).to.contain("Update");

            (iframe.contentWindow as any).applicationCache.status = window.applicationCache.DOWNLOADING;
            await cacher.enable();
            expect(element.innerHTML).not.to.contain("Update");
            expect(element.innerHTML).to.contain("Downloading");

            (iframe.contentWindow as any).applicationCache.status = window.applicationCache.OBSOLETE;
            await cacher.enable();
            expect(element.innerHTML).not.to.contain("Update");
            expect(element.innerHTML).not.to.contain("Downloading");
            expect(element.innerHTML).to.contain("Not available");

            (iframe.contentWindow as any).applicationCache.status = window.applicationCache.IDLE;
            await cacher.enable();
            expect(element.innerHTML).not.to.contain("Update");
            expect(element.innerHTML).not.to.contain("Downloading");
            expect(element.innerHTML).not.to.contain("Not available");
            expect(element.innerHTML).to.contain("Downloaded");
        });
    });

    describe("#getManifest", () => {
        const manifestJSON = {
            metadata: {
                title: "Alice's Adventures in Wonderland"
            }
        };
        const manifest = new Manifest(manifestJSON, new URL("https://example.com/manifest.json"));

        describe("if fetching the manifest fails", () => {
            const fetchFailure = new Promise((_, reject) => reject());

            beforeEach(() => {
                mockFetchAPI(fetchFailure);
            })

            it("should return cached manifest from local store", async () => {
                const key = "manifest";
                await store.set(key, JSON.stringify(manifestJSON));

                const response: Manifest = await cacher.getManifest(new URL("https://example.com/manifest.json"));
                expect(response).to.deep.equal(manifest);
            });
        });

        it("should return the response from fetch, and save it to local store", async () => {
            const fetchResponse = ({
                json: () => {
                    return new Promise(resolve => resolve(manifestJSON));
                }
            } as any);
            const fetchSuccess = new Promise(resolve => resolve(fetchResponse));

            mockFetchAPI(fetchSuccess);

            const response: Manifest = await cacher.getManifest(new URL("https://example.com/manifest.json"));
            expect(response).to.deep.equal(manifest);

            const key = "manifest";
            const storedValue = await store.get(key);
            expect(storedValue).to.equal(JSON.stringify(manifestJSON));
        });
    });
});