import { expect } from "chai";
import { stub } from "sinon";
import * as jsdom from "jsdom";

import ApplicationCacheCacher from "../src/ApplicationCacheCacher";
import { CacheStatus } from "../src/Cacher";

describe("ApplicationCacheCacher", () => {
    let cacher: ApplicationCacheCacher;
    let element: HTMLElement;
    let jsdomWindow: Window;

    beforeEach(() => {
        cacher = new ApplicationCacheCacher(new URL("http://example.com/fallback.html"));

        jsdomWindow = jsdom.jsdom("", ({
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

            cacher = new MockCacher(new URL("http://example.com/fallback.html"));

            await cacher.enable();
            expect(updateStatus.callCount).to.equal(1);
            const iframe = document.body.querySelector("iframe") as HTMLIFrameElement;
            expect(iframe.src).to.equal("http://example.com/fallback.html");

            // The iframe load handler should be tested here too, but I
            // can't figure out how to mock the application cache in its
            // content window.
        });
    });

    describe("#onStatusUpdate", () => {
        it("should provide status updates based on application cache status", async () => {
            const iframe = document.createElement("iframe");
            // The element must be in a document for iframe load events to work.
            jsdomWindow.document.body.appendChild(iframe);

            iframe.src = "http://example.com/test";

            // Cacher with a mock implementation of enable, which
            // is tested separately, and a method to simulate an error.
            class MockCacher extends ApplicationCacheCacher {
                public enable() {
                    this.bookCacheElement = iframe;
                    this.updateStatus();
                    return new Promise<void>(resolve => resolve());
                }

                public error() {
                    this.handleError();
                }
            }

            const callback = stub();

            const cacher: MockCacher = new MockCacher(new URL("http://example.com/fallback.html"));
            cacher.onStatusUpdate(callback);
            expect(callback.callCount).to.equal(1);
            expect(callback.args[0][0]).to.equal(CacheStatus.Uncached);
            (iframe.contentWindow as any).applicationCache = {};

            (iframe.contentWindow as any).applicationCache.status = window.applicationCache.UPDATEREADY;
            await cacher.enable();
            expect(callback.callCount).to.equal(2);
            expect(callback.args[1][0]).to.equal(CacheStatus.UpdateAvailable);

            (iframe.contentWindow as any).applicationCache.status = window.applicationCache.DOWNLOADING;
            await cacher.enable();
            expect(callback.callCount).to.equal(3);
            expect(callback.args[2][0]).to.equal(CacheStatus.Downloading);

            (iframe.contentWindow as any).applicationCache.status = window.applicationCache.OBSOLETE;
            await cacher.enable();
            expect(callback.callCount).to.equal(4);
            expect(callback.args[3][0]).to.equal(CacheStatus.Uncached);

            (iframe.contentWindow as any).applicationCache.status = window.applicationCache.IDLE;
            await cacher.enable();
            expect(callback.callCount).to.equal(5);
            expect(callback.args[4][0]).to.equal(CacheStatus.Downloaded);

            cacher.error();
            expect(callback.callCount).to.equal(6);
            expect(callback.args[5][0]).to.equal(CacheStatus.Error);
        });
    });

    describe("#getStatus", () => {
        it("should provide current application cache status", async () => {
            const iframe = document.createElement("iframe");
            // The element must be in a document for iframe load events to work.
            jsdomWindow.document.body.appendChild(iframe);

            iframe.src = "http://example.com/test";

            // Cacher with a mock implementation of enable, which
            // is tested separately, and a method to simulate an error.
            class MockCacher extends ApplicationCacheCacher {
                public enable() {
                    this.bookCacheElement = iframe;
                    this.updateStatus();
                    return new Promise<void>(resolve => resolve());
                }

                public error() {
                    this.handleError();
                }
            }

            const cacher: MockCacher = new MockCacher(new URL("http://example.com/fallback.html"));
            expect(cacher.getStatus()).to.equal(CacheStatus.Uncached);

            (iframe.contentWindow as any).applicationCache = {};

            (iframe.contentWindow as any).applicationCache.status = window.applicationCache.UPDATEREADY;
            await cacher.enable();
            expect(cacher.getStatus()).to.equal(CacheStatus.UpdateAvailable);

            (iframe.contentWindow as any).applicationCache.status = window.applicationCache.DOWNLOADING;
            await cacher.enable();
            expect(cacher.getStatus()).to.equal(CacheStatus.Downloading);

            (iframe.contentWindow as any).applicationCache.status = window.applicationCache.OBSOLETE;
            await cacher.enable();
            expect(cacher.getStatus()).to.equal(CacheStatus.Uncached);

            (iframe.contentWindow as any).applicationCache.status = window.applicationCache.IDLE;
            await cacher.enable();
            expect(cacher.getStatus()).to.equal(CacheStatus.Downloaded);

            cacher.error();
            expect(cacher.getStatus()).to.equal(CacheStatus.Error);
        });
    });
});