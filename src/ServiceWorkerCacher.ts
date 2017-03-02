import Cacher from "./Cacher";
import Store from "./Store";
import Manifest from "./Manifest";
import * as HTMLUtilities from "./HTMLUtilities";
import ApplicationCacheCacher from "./ApplicationCacheCacher";

const template = `
    <div class="cache-status"></div>
`;

enum CacheStatus {
    NOT_STARTED,
    STARTED,
    FINISHED
};

/** Class that caches responses using ServiceWorker's Cache API, and optionally
    falls back to the application cache if service workers aren't available. */
export default class ServiceWorkerCacher implements Cacher {
    private readonly serviceWorkerPath: string;
    private readonly store: Store;
    private readonly manifestUrl: URL;
    private readonly areServiceWorkersSupported: boolean;
    private readonly fallbackCacher: ApplicationCacheCacher | null;
    private statusElement: HTMLDivElement;
    private cacheStatus: CacheStatus = CacheStatus.NOT_STARTED;

    /** Create a ServiceWorkerCacher. */
    /** @param store Store to cache the manifest in. */
    /** @param manifestUrl URL to the webpub's manifest. */
    /** @param serviceWorkerPath Location of the service worker js file. */
    /** @param fallbackBookCacheUrl URL to give the ApplicationCacheCacher if service workers aren't supported. */
    public constructor(store: Store, manifestUrl: URL, serviceWorkerPath: string = "sw.js", fallbackBookCacheUrl?: URL) {
        this.serviceWorkerPath = serviceWorkerPath;
        this.store = store;
        this.manifestUrl = manifestUrl;

        const protocol = window.location.protocol;
        this.areServiceWorkersSupported = !!navigator.serviceWorker && !!window.caches && (protocol === "https:");
        if (!this.areServiceWorkersSupported && fallbackBookCacheUrl) {
            this.fallbackCacher = new ApplicationCacheCacher(fallbackBookCacheUrl);
        }
    }

    public async enable(): Promise<void> {
        if (this.fallbackCacher) {
            return this.fallbackCacher.enable();

        } else if (this.areServiceWorkersSupported) {
            this.cacheStatus = CacheStatus.STARTED;
            this.updateStatus();
            navigator.serviceWorker.register(this.serviceWorkerPath);

            await this.verifyAndCacheManifest(this.manifestUrl);
            this.cacheStatus = CacheStatus.FINISHED;
            this.updateStatus();
        }

        return new Promise<void>(resolve => resolve());
    }

    private async verifyAndCacheManifest(manifestUrl: URL): Promise<void> {
        await navigator.serviceWorker.ready;
        try {
            const cache = await window.caches.open(manifestUrl.href);
            const response = await cache.match(manifestUrl.href);
            // If the manifest wasn't already cached, we need to cache everything.
            if (!response) {
                // Invoke promises concurrently...
                const promises = [this.cacheManifest(manifestUrl), this.cacheUrls(["index.html", manifestUrl.href], manifestUrl)];
                // then wait for all of them to resolve.
                for (const promise of promises) {
                   await promise;
                }
            }
        } finally {
            return new Promise<void>(resolve => resolve());
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

    public renderStatus(element: HTMLElement): void {
        if (this.fallbackCacher) {
            return this.fallbackCacher.renderStatus(element);
        } else {
            element.innerHTML = template;
            this.statusElement = HTMLUtilities.findRequiredElement(element, "div[class=cache-status]") as HTMLDivElement;        
            this.updateStatus();
        }
    }

    private updateStatus(): void {
        if (this.cacheStatus === CacheStatus.FINISHED) {
            this.statusElement.innerHTML = "Downloaded for offline use";
        } else if (this.cacheStatus === CacheStatus.STARTED) {
            this.statusElement.innerHTML = "Downloading for offline use";
        } else {
            this.statusElement.innerHTML = "Not available offline";
        }
    }
}