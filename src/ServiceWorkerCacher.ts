import Cacher from "./Cacher";
import { CacheStatus } from "./Cacher";
import Store from "./Store";
import Manifest from "./Manifest";

export interface ServiceWorkerCacherConfig {
    /** Store to cache the manifest in. */
    store: Store;

    /** URL to the webpub's manifest. */
    manifestUrl: URL;

    /** Location of the service worker js file. Default: sw.js */
    serviceWorkerUrl?: URL;

    /** Static files for the service worker to cache. (JS and CSS used by the application) */
    staticFileUrls?: URL[];

    /** URL to give the ApplicationCacheCacher if service workers aren't supported. */
    fallbackBookCacheUrl?: URL;
}

/** Class that caches responses using ServiceWorker's Cache API, and optionally
    falls back to the application cache if service workers aren't available. */
export default class ServiceWorkerCacher implements Cacher {
    private readonly serviceWorkerUrl: URL;
    private readonly staticFileUrls: URL[];
    private readonly store: Store;
    private readonly manifestUrl: URL;
    private readonly areServiceWorkersSupported: boolean;
    protected cacheStatus: CacheStatus = CacheStatus.Uncached;
    private statusUpdateCallback: (status: CacheStatus) => void = () => {};

    /** Create a ServiceWorkerCacher. */
    public constructor(config: ServiceWorkerCacherConfig) {
        this.serviceWorkerUrl = config.serviceWorkerUrl || new URL("sw.js", config.manifestUrl.href);
        this.staticFileUrls = config.staticFileUrls || [];
        this.store = config.store;
        this.manifestUrl = config.manifestUrl;

        const protocol = window.location.protocol;
        this.areServiceWorkersSupported = !!navigator.serviceWorker && !!window.caches && (protocol === "https:");
    }

    public async enable(): Promise<void> {
        if (this.areServiceWorkersSupported && (this.cacheStatus !== CacheStatus.Downloaded)) {
            this.cacheStatus = CacheStatus.Downloading;
            this.updateStatus();
            navigator.serviceWorker.register(this.serviceWorkerUrl.href);

            try {
                await this.verifyAndCacheManifest(this.manifestUrl);
                this.cacheStatus = CacheStatus.Downloaded;
                this.updateStatus();
            } catch (err) {
                this.cacheStatus = CacheStatus.Error;
                this.updateStatus();
            }
        }

        return new Promise<void>(resolve => resolve());
    }

    private async verifyAndCacheManifest(manifestUrl: URL): Promise<void> {
        await navigator.serviceWorker.ready;
        try {
            // Invoke promises concurrently...
            const urlsToCache = [manifestUrl.href];
            for (const url of this.staticFileUrls) {
                urlsToCache.push(url.href);
            }
            const promises = [this.cacheManifest(manifestUrl), this.cacheUrls(urlsToCache, manifestUrl)];
            // then wait for all of them to resolve.
            for (const promise of promises) {
                await promise;
            }
            return new Promise<void>(resolve => resolve());
        } catch (err) {
            return new Promise<void>((_, reject) => reject(err));
        }
    }

    private async cacheUrls(urls: string[], manifestUrl: URL): Promise<void> {
        const cache = await window.caches.open(manifestUrl.href);
        return cache.addAll((urls.map(url => new URL(url, manifestUrl.href).href) as any));
    }

    private async cacheManifest(manifestUrl: URL): Promise<void> {
        const manifest = await Manifest.getManifest(manifestUrl, this.store);
        const promises = [this.cacheSpine(manifest, manifestUrl), this.cacheResources(manifest, manifestUrl)];
        for (const promise of promises) {
            await promise;
        }
        return new Promise<void>(resolve => resolve());
    }

    private async cacheSpine(manifest: Manifest, manifestUrl: URL): Promise<void> {
        const urls: Array<string> = [];
        for (const resource of manifest.spine) {
            if (resource.href) {
                urls.push(resource.href);
            }
        }
        return await this.cacheUrls(urls, manifestUrl);
    }

    private async cacheResources(manifest: Manifest, manifestUrl: URL): Promise<void> {
        const urls: Array<string> = [];
        for (const resource of manifest.resources) {
            if (resource.href) {
                urls.push(resource.href);
            }
        }
        return await this.cacheUrls(urls, manifestUrl);
    }

    public onStatusUpdate(callback: (status: CacheStatus) => void) {
            this.statusUpdateCallback = callback;
            this.updateStatus();
    }

    public getStatus(): CacheStatus {
        return this.cacheStatus;
    }

    private updateStatus(): void {
        this.statusUpdateCallback(this.cacheStatus);
    }
}