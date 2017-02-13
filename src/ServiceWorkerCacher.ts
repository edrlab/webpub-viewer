import Cacher from "./Cacher";
import Store from "./Store";
import Manifest from "./Manifest";

/** Class that caches responses using ServiceWorker's Cache API. */
export default class ServiceWorkerCacher implements Cacher {
    private serviceWorkerPath: string;
    private store: Store;
    private areServiceWorkersSupported: boolean;

    /** Create a ServiceWorkerCacher. */
    /** @param store Store to cache the manifest in. */
    /** @param manifestUrl URL to the webpub's manifest. */
    /** @param serviceWorkerPath Location of the service worker js file. */
    public static async create(store: Store, manifestUrl: string, serviceWorkerPath: string = "sw.js"): Promise<ServiceWorkerCacher> {
        const cacher = new this(store, serviceWorkerPath);
        await cacher.start(manifestUrl);
        return cacher;
    }

    protected constructor(store: Store, serviceWorkerPath: string) {
        this.serviceWorkerPath = serviceWorkerPath;
        this.store = store;

        const protocol = window.location.protocol;
        this.areServiceWorkersSupported = !!navigator.serviceWorker && !!window.caches && (protocol === "https:");
    }

    protected async start(manifestUrl: string): Promise<void> {
        if (this.areServiceWorkersSupported) {
            navigator.serviceWorker.register(this.serviceWorkerPath);

            return await this.verifyAndCacheManifest(manifestUrl);
        }

        return new Promise<void>(resolve => resolve());
    }

    public async getManifest(manifestUrl: string): Promise<Manifest> {
        try {
            const response = await window.fetch(manifestUrl)
            const manifestJSON = await response.json();
            await this.store.set(manifestUrl + "-manifest", JSON.stringify(manifestJSON));
            return new Manifest(manifestJSON, manifestUrl);
        } catch (err) {
            // We couldn't fetch the response, but there might be a cached version.
            const manifestString = await this.store.get(manifestUrl + "-manifest");
            if (manifestString) {
                const manifestJSON = JSON.parse(manifestString);
                return new Manifest(manifestJSON, manifestUrl);
            }
            const response = await window.caches.match(manifestUrl);
            const manifestJSON = await response.json();
            return new Manifest(manifestJSON, manifestUrl);
        }
    }

    private async verifyAndCacheManifest(manifestUrl: string): Promise<void> {
        await navigator.serviceWorker.ready;
        try {
            const cache = await window.caches.open(manifestUrl);
            const response = await cache.match(manifestUrl);
            // If the manifest wasn't already cached, we need to cache everything.
            if (!response) {
                // Invoke promises concurrently...
                const promises = [this.cacheManifest(manifestUrl), this.cacheUrls(["index.html", manifestUrl], manifestUrl)];
                // then wait for all of them to resolve.
                for (const promise of promises) {
                   await promise;
                }
            }
        } finally {
            return new Promise<void>(resolve => resolve());
        }
    }

    private async cacheUrls(urls: string[], manifestUrl: string): Promise<void> {
        const cache = await window.caches.open(manifestUrl);
        return cache.addAll((urls.map(url => new URL(url, manifestUrl).href) as any));
    }

    private async cacheManifest(manifestUrl: string): Promise<void> {
        const manifest = await this.getManifest(manifestUrl);
        const promises = [this.cacheSpine(manifest, manifestUrl), this.cacheResources(manifest, manifestUrl)];
        for (const promise of promises) {
            await promise;
        }
        return new Promise<void>(resolve => resolve());
    }

    private async cacheSpine(manifest: Manifest, manifestUrl: string): Promise<void> {
        let urls: Array<string> = [];
        for (const resource of manifest.spine) {
            if (resource.href) {
                urls.push(resource.href);
            }
        }
        return await this.cacheUrls(urls, manifestUrl);
    }

    private async cacheResources(manifest: Manifest, manifestUrl: string): Promise<void> {
        let urls: Array<string> = [];
        for (const resource of manifest.resources) {
            if (resource.href) {
                urls.push(resource.href);
            }
        }
        return await this.cacheUrls(urls, manifestUrl);
    }
}