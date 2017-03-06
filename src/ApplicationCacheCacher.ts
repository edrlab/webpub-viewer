import Cacher from "./Cacher";
import { CacheStatus } from "./Cacher";

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
    private readonly bookCacheUrl: URL;
    protected bookCacheElement: HTMLIFrameElement;
    private statusUpdateCallback: (status: CacheStatus) => void = () => {};

    public constructor(bookCacheUrl: URL) {
        this.bookCacheUrl = bookCacheUrl;
    }

    public async enable(): Promise<void> {
        this.bookCacheElement = window.document.createElement("iframe");
        this.bookCacheElement.style.display = "none";
        window.document.body.appendChild(this.bookCacheElement);
        this.bookCacheElement.src = this.bookCacheUrl.href;
        this.updateStatus();

        this.bookCacheElement.addEventListener("load", () => {
            this.updateStatus();

            const bookCache = this.bookCacheElement.contentWindow.applicationCache;

            bookCache.oncached = this.updateStatus.bind(this);
            bookCache.onchecking = this.updateStatus.bind(this);
            bookCache.ondownloading = this.updateStatus.bind(this);
            bookCache.onerror = this.handleError.bind(this);
            bookCache.onnoupdate = this.updateStatus.bind(this);
            bookCache.onupdateready = this.updateStatus.bind(this);
        });

        return new Promise<void>(resolve => resolve());
    }

    public onStatusUpdate(callback: (status: CacheStatus) => void): void {
        this.statusUpdateCallback = callback;
        this.updateStatus();
    }

    protected updateStatus() {
        let status: CacheStatus;
        let appCacheStatus = window.applicationCache.UNCACHED;
        if (this.bookCacheElement &&
            this.bookCacheElement.contentWindow.applicationCache &&
            this.bookCacheElement.contentWindow.applicationCache.status !== undefined) {
            appCacheStatus = this.bookCacheElement.contentWindow.applicationCache.status;
        }

        if (appCacheStatus === window.applicationCache.UPDATEREADY) {
            status = CacheStatus.UpdateAvailable;
        } else if (
            appCacheStatus === window.applicationCache.DOWNLOADING) {
            status = CacheStatus.Downloading;
        } else if (
            appCacheStatus === window.applicationCache.UNCACHED ||
            appCacheStatus === window.applicationCache.OBSOLETE) {
            status = CacheStatus.Uncached;
        } else if (
            appCacheStatus === window.applicationCache.CHECKING) {
            status = CacheStatus.CheckingForUpdate;
        } else {
            status = CacheStatus.Downloaded;
        }

        this.statusUpdateCallback(status);
    }

    protected handleError() {
        this.statusUpdateCallback(CacheStatus.Error);
    }
}