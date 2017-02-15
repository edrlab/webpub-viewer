import { expect } from "chai";
import { stub } from "sinon";
import * as jsdom from "jsdom";

import ServiceWorkerCacher from "../src/ServiceWorkerCacher";
import MemoryStore from "../src/MemoryStore";
import Manifest from "../src/Manifest";

describe('ServiceWorkerCacher', () => {
    let register: Sinon.SinonStub;
    let match: Sinon.SinonStub;
    let addAll: Sinon.SinonStub;
    let open: Sinon.SinonStub;
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
        match = stub().returns(new Promise((resolve) => {
            resolve(matchResult);
        }));
        addAll = stub();
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

    const mockFetchAPI = (response: Promise<Response>) => {
        window.fetch = stub().returns(response);
    };

    beforeEach(() => {
        jsdom.changeURL(window, "https://example.com");
        mockNavigatorAPI();
        store = new MemoryStore();
    });

    describe('#start', () => {
        it('should do nothing if the Cache API is not supported', async () => {
            // window.caches is not defined here.

            await ServiceWorkerCacher.create(store, new URL("https://example.com/manifest.json"));
            expect(register.callCount).to.equal(0);
        });

        it("should register the service worker", async () => {
            mockCacheAPI("i'm in the cache");
            await ServiceWorkerCacher.create(store, new URL("https://example.com/manifest.json"));
            expect(register.callCount).to.equal(1);
            expect(register.args[0][0]).to.equal("sw.js");

            await ServiceWorkerCacher.create(store, new URL("https://example.com/manifest.json"), "../../../sw.js");
            expect(register.callCount).to.equal(2);
            expect(register.args[1][0]).to.equal("../../../sw.js");
        });

        it("should find a manifest that's already in the cache", async () => {
            mockCacheAPI("i'm in the cache");

            await ServiceWorkerCacher.create(store, new URL("https://example.com/manifest.json"));
            // The manifest cache was opened.
            expect(open.callCount).to.equal(1);
            expect(open.args[0][0]).to.equal("https://example.com/manifest.json");

            // The cache was checked for a match.
            expect(match.callCount).to.equal(1);
            expect(match.args[0][0]).to.equal("https://example.com/manifest.json");

            // Nothing was added to the cache since the manifest was already there.
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

            // A Cacher with a mock implementation of getManifest, which
            // is tested separately.
            class MockCacher extends ServiceWorkerCacher {
                public getManifest(): Promise<Manifest> {
                    return new Promise((resolve) => resolve(manifest));
                }
            }
            await MockCacher.create(store, new URL("https://example.com/manifest.json"));
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

                const cacher = await ServiceWorkerCacher.create(store, new URL("https://example.com/manifest.json"));
                const response: Manifest = await cacher.getManifest(new URL("https://example.com/manifest.json"));
                expect(response).to.deep.equal(manifest);
            });

            it("should return cached manifest from Cache API", async () => {
                // There's nothing in the store.

                const manifestResponse = ({
                    json: stub().returns(new Promise(resolve => resolve(manifestJSON)))
                } as any);
                mockCacheAPI(manifestResponse);
                
                const cacher = await ServiceWorkerCacher.create(store, new URL("https://example.com/manifest.json"));
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

            const cacher = await ServiceWorkerCacher.create(store, new URL("https://example.com/manifest.json"));
            const response: Manifest = await cacher.getManifest(new URL("https://example.com/manifest.json"));
            expect(response).to.deep.equal(manifest);

            const key = "manifest";
            const storedValue = await store.get(key);
            expect(storedValue).to.equal(JSON.stringify(manifestJSON));
        });
    });
});