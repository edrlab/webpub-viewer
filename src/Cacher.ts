export enum CacheStatus {
    // The book has not been cached.
    UNCACHED,

    // There is a new version available (Application Cache only - refresh the page to update).
    UPDATE_AVAILABLE,

    // The app is checking for a new version (Application Cache only).
    CHECKING_FOR_UPDATE,

    // The cache is downloading.
    DOWNLOADING,

    // The cache is fully downloaded and the book is available offline.
    DOWNLOADED,

    // There was an error downloading the cache, and the book is not available offline.
    ERROR
}


interface Cacher {
    // Kick off the downloads to enable offline use.
    enable(): Promise<void>;

    // Register a function to call when the cache status changes.
    onStatusUpdate(callback: (status: CacheStatus) => void): void;
}

export default Cacher;