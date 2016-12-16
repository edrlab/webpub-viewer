import Cacher from "./Cacher";
import Manifest from "./Manifest";

/** Class that caches URLs using ServiceWorker's Cache API. */
export default class ServiceWorkerCacher implements Cacher {
    private serviceWorkerPath: string;
    private supported: boolean;

    /** Create a ServiceWorkerCacher. */
    /** @param serviceWorkerPath Location of the service worker js file. */
    public constructor(serviceWorkerPath: string = "sw.js") {
        this.serviceWorkerPath = serviceWorkerPath;
    }

    public async start(manifestUrl: string): Promise<void> {
        let protocol = window.location.protocol;
        this.supported = !!navigator.serviceWorker && !!window.caches && (protocol === "https:");

        if (this.supported) {
            navigator.serviceWorker.register(this.serviceWorkerPath);

            return await this.verifyAndCacheManifest(manifestUrl);
        }

        return new Promise<void>(resolve => resolve());
    }

    public async getManifest(manifestUrl: string): Promise<Manifest> {
        try {
            let response = await window.fetch(manifestUrl)
            let manifestJSON = await response.json();
            if (window.localStorage) {
                window.localStorage.setItem(manifestUrl + "-manifest", JSON.stringify(manifestJSON));
            }
            return new Manifest(manifestJSON, manifestUrl);
        } catch (err) {
            // We couldn't fetch the response, but there might be a cached version.
            if (window.localStorage) {
                let manifestString = window.localStorage.getItem(manifestUrl + "-manifest");
                if (manifestString) {
                    let manifestJSON = JSON.parse(manifestString);
                    return new Manifest(manifestJSON, manifestUrl);
                }
            }
            let response = await window.caches.match(manifestUrl);
            let manifestJSON = await response.json();
            return new Manifest(manifestJSON, manifestUrl);
        }
    }

    private async verifyAndCacheManifest(manifestUrl: string): Promise<void> {
        await navigator.serviceWorker.ready;
        try {
            let cache = await window.caches.open(manifestUrl);
            let response = await cache.match(manifestUrl);
            // If the manifest wasn't already cached, we need to cache everything.
            if (!response) {
                // Invoke promises concurrently...
                let promises = [this.cacheManifest(manifestUrl), this.cacheUrls(["index.html", manifestUrl], manifestUrl)];
                // then wait for all of them to resolve.
                for (let promise of promises) {
                   await promise;
                }
            }
        } finally {
            return new Promise<void>(resolve => resolve());
        }
    }

    private async cacheUrls(urls: string[], manifestUrl: string): Promise<void> {
        let cache = await window.caches.open(manifestUrl);
        return cache.addAll((urls.map(url => new URL(url, manifestUrl).href) as any));
    }

    private async cacheManifest(manifestUrl: string): Promise<void> {
        let manifest = await this.getManifest(manifestUrl);
        let promises = [this.cacheSpine(manifest, manifestUrl), this.cacheResources(manifest, manifestUrl)];
        for (let promise of promises) {
            await promise;
        }
        return new Promise<void>(resolve => resolve());
    }

    private async cacheSpine(manifest: Manifest, manifestUrl: string): Promise<void> {
        let urls: Array<string> = [];
        for (let resource of manifest.spine) {
            if (resource.href) {
                urls.push(resource.href);
            }
        }
        return await this.cacheUrls(urls, manifestUrl);
    }

    private async cacheResources(manifest: Manifest, manifestUrl: string): Promise<void> {
        let urls: Array<string> = [];
        for (let resource of manifest.resources) {
            if (resource.href) {
                urls.push(resource.href);
            }
        }
        return await this.cacheUrls(urls, manifestUrl);
    }
}