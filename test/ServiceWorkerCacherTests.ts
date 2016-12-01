import { expect } from "chai";
import { stub } from "sinon";

import ServiceWorkerCacher from "../src/ServiceWorkerCacher";
import Manifest from "../src/Manifest";

describe('ServiceWorkerCacher', () => {
    let register: Sinon.SinonStub;
    let match: Sinon.SinonStub;
    let addAll: Sinon.SinonStub;
    let open: Sinon.SinonStub;
    let getItem: Sinon.SinonStub;
    let setItem: Sinon.SinonStub;

    let mockNavigatorAPI = () => {
        register = stub();
        navigator = ({
            serviceWorker: {
                register: register,
                ready: new Promise((resolve) => resolve())
            }
        } as any);
    };

    let mockCacheAPI = (matchResult: any) => {
        match = stub().returns(new Promise((resolve) => {
            resolve(matchResult);
        }));
        addAll = stub();
        let cache = ({
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

    let mockLocalStorageAPI = (val?: string) => {
        getItem = stub().returns(val);
        setItem = stub();
        (window as any).localStorage = ({
            getItem: getItem,
            setItem: setItem
        } as any);
    };

    let mockFetchAPI = (response: Promise<Response>) => {
        window.fetch = stub().returns(response);
    };

    beforeEach(() => {
        mockNavigatorAPI();
    });

    describe('#start', () => {
        it('should do nothing if the Cache API is not supported', async () => {
            // window.caches is not defined here.

            let cacher = new ServiceWorkerCacher();
            await cacher.start("http://example.com/manifest.json");
            expect(register.callCount).to.equal(0);
        });

        it("should register the service worker", async () => {
            mockCacheAPI("i'm in the cache");
            let cacher = new ServiceWorkerCacher();
            await cacher.start("http://example.com/manifest.json");
            expect(register.callCount).to.equal(1);
            expect(register.args[0][0]).to.equal("sw.js");
        });

        it("should find a manifest that's already in the cache", async () => {
            mockCacheAPI("i'm in the cache");

            let cacher = new ServiceWorkerCacher();
            await cacher.start("http://example.com/manifest.json");
            // The manifest cache was opened.
            expect(open.callCount).to.equal(1);
            expect(open.args[0][0]).to.equal("http://example.com/manifest.json");

            // The cache was checked for a match.
            expect(match.callCount).to.equal(1);
            expect(match.args[0][0]).to.equal("http://example.com/manifest.json");

            // Nothing was added to the cache since the manifest was already there.
            expect(addAll.callCount).to.equal(0);
        });

        it("should cache a manifest that's not in the cache yet", async () => {
            mockCacheAPI(undefined);

            let manifest = new Manifest({
              spine: [
                  { href: "spine-item-1.html" },
                  { href: "spine-item-2.html" }
              ],
              resources: [
                  { href: "resource-1.html" },
                  { href: "resource-2.html" }
              ]
            }, "http://example.com/manifest.json");

            // A Cacher with a mock implementation of getManifest, which
            // is tested separately.
            class MockCacher extends ServiceWorkerCacher {
                public getManifest(): Promise<Manifest> {
                    return new Promise((resolve) => resolve(manifest));
                }
            }
            let cacher = new MockCacher();
            await cacher.start("http://example.com/manifest.json");
            let urlsThatWereCached: Array<string> = [];
            // Go through each call to addAll and aggregate the cached URLs.
            addAll.args.forEach((argsFromOneCallToAddAll: Array<Array<string>>) => {
                // addAll accepts a list of urls as its first argument.
                let urls = argsFromOneCallToAddAll[0];
                urlsThatWereCached = urlsThatWereCached.concat(urls);
            });
            expect(urlsThatWereCached).to.contain("http://example.com/manifest.json");
            expect(urlsThatWereCached).to.contain("http://example.com/index.html");
            expect(urlsThatWereCached).to.contain("http://example.com/spine-item-1.html");
            expect(urlsThatWereCached).to.contain("http://example.com/spine-item-2.html");
            expect(urlsThatWereCached).to.contain("http://example.com/resource-1.html");
            expect(urlsThatWereCached).to.contain("http://example.com/resource-2.html");
        });
    });

    describe("#getManifest", () => {
        let manifestJSON = {
            metadata: {
                title: "Alice's Adventures in Wonderland"
            }
        };
        let manifest = new Manifest(manifestJSON, "http://example.com/manifest.json");

        describe("if fetching the manifest fails", () => {
            let fetchFailure = new Promise((_, reject) => reject());

            beforeEach(() => {
                mockFetchAPI(fetchFailure);
            })

            it("should return cached manifest from localStorage", async () => {
                mockLocalStorageAPI(JSON.stringify(manifestJSON));

                let cacher = new ServiceWorkerCacher();
                let response: Manifest = await cacher.getManifest("http://example.com/manifest.json");
                expect(response).to.deep.equal(manifest);
                expect(getItem.callCount).to.equal(1);
            });

            it("should return cached manifest from Cache API", async () => {
                // There's nothing in localStorage.
                mockLocalStorageAPI();
                let manifestResponse = ({
                    json: stub().returns(new Promise(resolve => resolve(manifestJSON)))
                } as any);
                mockCacheAPI(manifestResponse);
                
                let cacher = new ServiceWorkerCacher();
                let response: Manifest = await cacher.getManifest("http://example.com/manifest.json");
                expect(response).to.deep.equal(manifest);
            });
        });

        it("should return the response from fetch, and save it to localStorage", async () => {
            let fetchResponse = ({
                json: () => {
                    return new Promise(resolve => resolve(manifestJSON));
                }
            } as any);
            let fetchSuccess = new Promise(resolve => resolve(fetchResponse));

            mockFetchAPI(fetchSuccess);
            mockLocalStorageAPI();

            let cacher = new ServiceWorkerCacher();
            let response: Manifest = await cacher.getManifest("http://example.com/manifest.json");
            expect(response).to.deep.equal(manifest);
            expect(setItem.callCount).to.equal(1);
            expect(setItem.args[0][0]).to.equal("http://example.com/manifest.json-manifest");
            expect(setItem.args[0][1]).to.equal(JSON.stringify(manifestJSON));
        });
    });
});