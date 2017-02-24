import Cacher from "./Cacher";
import Store from "./Store";
import Manifest from "./Manifest";
import * as HTMLUtilities from "./HTMLUtilities";

const template = `
    <div class="cache-status"></div>
    <iframe style="display: none">
    </iframe>
`;

/** Class that caches files using the (deprecated) application cache API. 
    This is necessary until Service Worker support improves.
    
    This class expects the application to have a cache manifest file 
    containing the application files (currently index.html, sw.js, fetch.js,
    and webpub-viewer.js), and all the book content. There must _also_ be an
    html file that includes the manifest. That second html file can be empty
    except for the html tag linking to the manifest, and its location should
    be used as the ApplicationCacheCacher's bookCacheUrl.

    The ApplicationCacheCacher will create an iframe with the bookCacheUrl to start
    the download of book content. Since the book's html files are in the manifest,
    once the cache is ready any of those files will be loaded from the cache.
    */
export default class ApplicationCacheCacher implements Cacher {
    private readonly store: Store;
    private readonly bookCacheUrl: URL;
    private statusElement: HTMLDivElement;
    private bookCacheElement: HTMLIFrameElement;

    public constructor(store: Store, bookCacheUrl: URL) {
        this.store = store;
        this.bookCacheUrl = bookCacheUrl;
    }

    public async getManifest(manifestUrl: URL): Promise<Manifest> {
        try {
            const response = await window.fetch(manifestUrl.href)
            const manifestJSON = await response.json();
            await this.store.set("manifest", JSON.stringify(manifestJSON));
            return new Manifest(manifestJSON, manifestUrl);
        } catch (err) {
            // We couldn't fetch the response, but there might be a cached version.
            const manifestString = await this.store.get("manifest");
            if (manifestString) {
                const manifestJSON = JSON.parse(manifestString);
                return new Manifest(manifestJSON, manifestUrl);
            } else {
                throw err;
            }
        }
    }

    public async enable(): Promise<void> {
        this.bookCacheElement.src = this.bookCacheUrl.href;
        this.updateStatus();

        this.bookCacheElement.addEventListener("load", () => {
            this.updateStatus();

            const bookCache = this.bookCacheElement.contentWindow.applicationCache;

            bookCache.oncached = this.updateStatus.bind(this);
            bookCache.onchecking = this.updateStatus.bind(this);
            bookCache.ondownloading = this.updateStatus.bind(this);
            bookCache.onerror = this.updateStatus.bind(this);
            bookCache.onnoupdate = this.updateStatus.bind(this);
            bookCache.onupdateready = this.updateStatus.bind(this);
        });

        return new Promise<void>(resolve => resolve());
    }

    public renderStatus(element: HTMLElement): void {
        element.innerHTML = template;
        this.statusElement = HTMLUtilities.findRequiredElement(element, "div[class=cache-status]") as HTMLDivElement;
        this.bookCacheElement = HTMLUtilities.findRequiredElement(element, "iframe") as HTMLIFrameElement;
        this.updateStatus();
    }

    protected updateStatus() {
        let status = "";
        let bookCacheStatus = window.applicationCache.UNCACHED;
        if (this.bookCacheElement &&
            this.bookCacheElement.contentWindow.applicationCache &&
            this.bookCacheElement.contentWindow.applicationCache.status !== undefined) {
            bookCacheStatus = this.bookCacheElement.contentWindow.applicationCache.status;
        }

        if (bookCacheStatus === window.applicationCache.UPDATEREADY) {
            status = "Update available";
        } else if (
            bookCacheStatus === window.applicationCache.DOWNLOADING) {
            status = "Downloading for offline use";
        } else if (
            bookCacheStatus === window.applicationCache.UNCACHED ||
            bookCacheStatus === window.applicationCache.OBSOLETE) {
            status = "Not available offline";
        } else if (
            bookCacheStatus === window.applicationCache.CHECKING) {
            status = "Checking for update";
        } else {
            status = "Downloaded for offline use";
        }
        this.statusElement.innerHTML = status;
    }
}