import { expect } from "chai";
import { stub } from "sinon";
import * as jsdom from "jsdom";

import ServiceWorkerCacher from "../src/ServiceWorkerCacher";
import MemoryStore from "../src/MemoryStore";
import Manifest from "../src/Manifest";
import { CacheStatus } from "../src/Cacher";

describe('ServiceWorkerCacher', () => {
    let register: sinon.SinonStub;
    let match: sinon.SinonStub;
    let addAll: sinon.SinonStub;
    let open: sinon.SinonStub;
    let store: MemoryStore;

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
        match = stub().resolves(matchResult);
        addAll = stub().resolves();
        const cache = ({
            match: match,
            addAll: addAll
        } as any);
        open = stub().resolves(cache);
        (window as any).caches = ({
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
    });

    describe('#enable', () => {
        it("should do nothing if the Cache API is not supported and there's no fallback URL", async () => {
            (window as any).caches = null;

            const cacher = new ServiceWorkerCacher({
                store,
                manifestUrl: new URL("https://example.com/manifest.json")
            });
            await cacher.enable();
            expect(register.callCount).to.equal(0);
        });

        it("should register the service worker", async () => {
            mockCacheAPI("i'm in the cache");
            let cacher = new ServiceWorkerCacher({
                store,
                manifestUrl: new URL("https://example.com/manifest.json")
            });
            await cacher.enable();
            expect(register.callCount).to.equal(1);
            expect(register.args[0][0]).to.equal("https://example.com/sw.js");

            cacher = new ServiceWorkerCacher({
                store,
                manifestUrl: new URL("https://example.com/manifest.json"),
                serviceWorkerUrl: new URL("../../../sw.js", "https://example.com/1/2/3/4/"),
                fallbackBookCacheUrl: new URL("https://example.com/fallback.html")
            });
            await cacher.enable();
            expect(register.callCount).to.equal(2);
            expect(register.args[1][0]).to.equal("https://example.com/1/sw.js");
        });

        it("shouldn't cache anything if it has already successfully cached everything", async () => {
            mockCacheAPI("i'm in the cache");

            // A MockCacher that can have its status set externally.
            class MockCacher extends ServiceWorkerCacher {
                public setStatus(status: CacheStatus) {
                    this.cacheStatus = status;
                }
            }

            const cacher = new MockCacher({
                store,
                manifestUrl: new URL("https://example.com/manifest.json")
            });
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
            const cacher = new ServiceWorkerCacher({
                store,
                manifestUrl: new URL("https://example.com/manifest.json"),
                staticFileUrls: [
                    new URL("static-1.html", "https://example.com"),
                    new URL("static-2.html", "https://example.com")
                ]
            });
            await cacher.enable();
            let urlsThatWereCached: Array<string> = [];
            // Go through each call to addAll and aggregate the cached URLs.
            addAll.args.forEach((argsFromOneCallToAddAll: Array<Array<string>>) => {
                // addAll accepts a list of urls as its first argument.
                const urls = argsFromOneCallToAddAll[0];
                urlsThatWereCached = urlsThatWereCached.concat(urls);
            });
            expect(urlsThatWereCached).to.contain("https://example.com/manifest.json");
            expect(urlsThatWereCached).to.contain("https://example.com/static-1.html");
            expect(urlsThatWereCached).to.contain("https://example.com/static-2.html");
            expect(urlsThatWereCached).to.contain("https://example.com/spine-item-1.html");
            expect(urlsThatWereCached).to.contain("https://example.com/spine-item-2.html");
            expect(urlsThatWereCached).to.contain("https://example.com/resource-1.html");
            expect(urlsThatWereCached).to.contain("https://example.com/resource-2.html");
        });
    });

    describe('#onStatusUpdate', () => {
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

            const cacher = new ServiceWorkerCacher({
                store,
                manifestUrl: new URL("https://example.com/manifest.json")
            });

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
            process.on('unhandledRejection', (reason) => {
                console.log('REJECTION', reason)
            })
            mockCacheAPI("I'm in the cache");
            open.returns(new Promise<void>((_, reject) => reject(new Error('Status failure'))).catch(error => {console.log('Caught', error.message)}));
            const cacher = new ServiceWorkerCacher({
                store,
                manifestUrl: new URL("https://example.com/manifest.json")
            });

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
            mockCacheAPI("I'm in the cache");
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

            const cacher = new ServiceWorkerCacher({
                store,
                manifestUrl: new URL("https://example.com/manifest.json")
            });

            expect(cacher.getStatus()).to.equal(CacheStatus.Uncached);

            cacher.enable();
            expect(cacher.getStatus()).to.equal(CacheStatus.Downloading);

            await pause();
            expect(cacher.getStatus()).to.equal(CacheStatus.Downloaded);
        });

        it("should provide status updates when there's an error", async () => {
            process.on('unhandledRejection', (reason) => {
                console.log('REJECTION', reason)
            })
            mockCacheAPI("i'm in the cache");
            open.returns(new Promise<void>((_, reject) => reject(new Error('Status failure'))).catch(error => {console.log('Caught', error.message)}));
            const cacher = new ServiceWorkerCacher({
                store,
                manifestUrl: new URL("https://example.com/manifest.json")
            });

            expect(cacher.getStatus()).to.equal(CacheStatus.Uncached);

            cacher.enable();
            expect(cacher.getStatus()).to.equal(CacheStatus.Downloading);

            await pause();
            expect(cacher.getStatus()).to.equal(CacheStatus.Error);
        });
    });
});