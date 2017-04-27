import { expect } from "chai";
import { stub } from "sinon";
import * as jsdom from "jsdom";

import ServiceWorkerCacher from "../src/ServiceWorkerCacher";
import MemoryStore from "../src/MemoryStore";
import Manifest from "../src/Manifest";
import ApplicationCacheCacher from "../src/ApplicationCacheCacher";
import { CacheStatus } from "../src/Cacher";

describe('ServiceWorkerCacher', () => {
    let register: Sinon.SinonStub;
    let match: Sinon.SinonStub;
    let addAll: Sinon.SinonStub;
    let open: Sinon.SinonStub;
    let store: MemoryStore;
    let element: HTMLElement;

    const mockNavigatorAPI = () => {
        register = stub();
        navigator = ({
            serviceWorker: {
                register: register,
                ready: new Promise((resolve) => resolve())
            }
        } as any);
    };

    const mockCacheAPI = (matchResult: any) => {
        match = stub().returns(new Promise((resolve) => {
            resolve(matchResult);
        }));
        addAll = stub().returns(new Promise(resolve => resolve()));
        const cache = ({
            match: match,
            addAll: addAll
        } as any);
        open = stub().returns(new Promise((resolve) => {
            resolve(cache);
        }));
        window.caches = ({
            open: open,
            match: match
        } as any);
    };

    const pause = (ms = 0): Promise<void> => {
        return new Promise<void>(resolve => setTimeout(resolve, ms));
    };

    beforeEach(() => {
        jsdom.changeURL(window, "https://example.com");
        mockNavigatorAPI();
        store = new MemoryStore();
        element = document.createElement("div");
    });

    describe('#enable', () => {
        it("should do nothing if the Cache API is not supported and there's no fallback URL", async () => {
            (window as any).caches = null;

            const cacher = new ServiceWorkerCacher(store, new URL("https://example.com/manifest.json"));
            await cacher.enable();
            expect(register.callCount).to.equal(0);
        });

        it("should fall back to application cache if the Cache API is not supported and fallback URL is provided", async () => {
            (window as any).caches = null;

            const appCacheEnableStub = stub(ApplicationCacheCacher.prototype, "enable");

            const cacher = new ServiceWorkerCacher(store, new URL("https://example.com/manifest.json"), "sw.js", new URL("https://example.com/fallback.html"));
            await cacher.enable();
            expect(register.callCount).to.equal(0);
            expect(appCacheEnableStub.callCount).to.equal(1);

            appCacheEnableStub.restore();
        });

        it("should register the service worker", async () => {
            mockCacheAPI("i'm in the cache");
            let cacher = new ServiceWorkerCacher(store, new URL("https://example.com/manifest.json"));
            await cacher.enable();
            expect(register.callCount).to.equal(1);
            expect(register.args[0][0]).to.equal("sw.js");

            cacher = new ServiceWorkerCacher(store, new URL("https://example.com/manifest.json"), "../../../sw.js", new URL("https://example.com/fallback.html"));
            await cacher.enable();
            expect(register.callCount).to.equal(2);
            expect(register.args[1][0]).to.equal("../../../sw.js");
        });

        it("shouldn't cache anything if it has already successfully cached everything", async () => {
            mockCacheAPI("i'm in the cache");

            // A MockCacher that can have its status set externally.
            class MockCacher extends ServiceWorkerCacher {
                public setStatus(status: CacheStatus) {
                    this.cacheStatus = status;
                }
            }

            const cacher = new MockCacher(store, new URL("https://example.com/manifest.json"));
            cacher.setStatus(CacheStatus.Downloaded);
            await cacher.enable();
            // The manifest cache was not opened.
            expect(open.callCount).to.equal(0);

            // The cache was not checked for a match.
            expect(match.callCount).to.equal(0);

            // Nothing was added to the cache.
            expect(addAll.callCount).to.equal(0);
        });

        it("should cache a manifest that's not in the cache yet", async () => {
            mockCacheAPI(undefined);

            const manifest = new Manifest({
              spine: [
                  { href: "spine-item-1.html" },
                  { href: "spine-item-2.html" }
              ],
              resources: [
                  { href: "resource-1.html" },
                  { href: "resource-2.html" }
              ]
            }, new URL("https://example.com/manifest.json"));

            await store.set("manifest", JSON.stringify(manifest));
            const cacher = new ServiceWorkerCacher(store, new URL("https://example.com/manifest.json"));
            await cacher.enable();
            let urlsThatWereCached: Array<string> = [];
            // Go through each call to addAll and aggregate the cached URLs.
            addAll.args.forEach((argsFromOneCallToAddAll: Array<Array<string>>) => {
                // addAll accepts a list of urls as its first argument.
                const urls = argsFromOneCallToAddAll[0];
                urlsThatWereCached = urlsThatWereCached.concat(urls);
            });
            expect(urlsThatWereCached).to.contain("https://example.com/manifest.json");
            expect(urlsThatWereCached).to.contain("https://example.com/index.html");
            expect(urlsThatWereCached).to.contain("https://example.com/spine-item-1.html");
            expect(urlsThatWereCached).to.contain("https://example.com/spine-item-2.html");
            expect(urlsThatWereCached).to.contain("https://example.com/resource-1.html");
            expect(urlsThatWereCached).to.contain("https://example.com/resource-2.html");
        });
    });

    describe('#onStatusUpdate', () => {
        it("should fall back to application cache if the Cache API is not supported and fallback URL is provided", async () => {
            (window as any).caches = null;

            const appCacheOnStatusUpdateStub = stub(ApplicationCacheCacher.prototype, "onStatusUpdate");

            const cacher = new ServiceWorkerCacher(store, new URL("https://example.com/manifest.json"), "sw.js", new URL("https://example.com/fallback.html"));
            const callback = stub();
            cacher.onStatusUpdate(callback);
            expect(appCacheOnStatusUpdateStub.callCount).to.equal(1);
            expect(appCacheOnStatusUpdateStub.args[0][0]).to.equal(callback);

            appCacheOnStatusUpdateStub.restore();
        });

        it("should provide status updates when downloading and when caching is complete", async () => {
            mockCacheAPI("i'm in the cache");
            const manifest = new Manifest({
              spine: [
                  { href: "spine-item-1.html" },
                  { href: "spine-item-2.html" }
              ],
              resources: [
                  { href: "resource-1.html" },
                  { href: "resource-2.html" }
              ]
            }, new URL("https://example.com/manifest.json"));

            await store.set("manifest", JSON.stringify(manifest));

            const cacher = new ServiceWorkerCacher(store, new URL("https://example.com/manifest.json"));

            const callback = stub();
            cacher.onStatusUpdate(callback);

            expect(callback.callCount).to.equal(1);
            expect(callback.args[0][0]).to.equal(CacheStatus.Uncached);

            cacher.enable();
            expect(callback.callCount).to.equal(2);
            expect(callback.args[1][0]).to.equal(CacheStatus.Downloading);

            await pause();
            expect(callback.callCount).to.equal(3);
            expect(callback.args[2][0]).to.equal(CacheStatus.Downloaded);
        });

        it("should provide status updates when there's an error", async () => {
            mockCacheAPI("i'm in the cache");
            open.returns(new Promise<void>((_, reject) => reject()));
            const cacher = new ServiceWorkerCacher(store, new URL("https://example.com/manifest.json"));

            const callback = stub();
            cacher.onStatusUpdate(callback);

            expect(callback.callCount).to.equal(1);
            expect(callback.args[0][0]).to.equal(CacheStatus.Uncached);

            cacher.enable();
            expect(callback.callCount).to.equal(2);
            expect(callback.args[1][0]).to.equal(CacheStatus.Downloading);

            await pause();
            expect(callback.callCount).to.equal(3);
            expect(callback.args[2][0]).to.equal(CacheStatus.Error);
        });
    });

    describe('#getStatus', () => {
        it("should provide status updates when downloading and when caching is complete", async () => {
            mockCacheAPI("i'm in the cache");
            const manifest = new Manifest({
              spine: [
                  { href: "spine-item-1.html" },
                  { href: "spine-item-2.html" }
              ],
              resources: [
                  { href: "resource-1.html" },
                  { href: "resource-2.html" }
              ]
            }, new URL("https://example.com/manifest.json"));

            await store.set("manifest", JSON.stringify(manifest));

            const cacher = new ServiceWorkerCacher(store, new URL("https://example.com/manifest.json"));

            expect(cacher.getStatus()).to.equal(CacheStatus.Uncached);

            cacher.enable();
            expect(cacher.getStatus()).to.equal(CacheStatus.Downloading);

            await pause();
            expect(cacher.getStatus()).to.equal(CacheStatus.Downloaded);
        });

        it("should provide status updates when there's an error", async () => {
            mockCacheAPI("i'm in the cache");
            open.returns(new Promise<void>((_, reject) => reject()));
            const cacher = new ServiceWorkerCacher(store, new URL("https://example.com/manifest.json"));

            expect(cacher.getStatus()).to.equal(CacheStatus.Uncached);

            cacher.enable();
            expect(cacher.getStatus()).to.equal(CacheStatus.Downloading);

            await pause();
            expect(cacher.getStatus()).to.equal(CacheStatus.Error);
        });
    });
});