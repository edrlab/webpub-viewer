export enum CacheStatus {
    /** The book has not been cached. */
    Uncached,

    /** There is a new version available (Application Cache only - refresh the page to update). */
    UpdateAvailable,

    /** The app is checking for a new version (Application Cache only). */
    CheckingForUpdate,

    /** The cache is downloading. */
    Downloading,

    /** The cache is fully downloaded and the book is available offline. */
    Downloaded,

    /** There was an error downloading the cache, and the book is not available offline. */
    Error
}


interface Cacher {
    // Kick off the downloads to enable offline use.
    enable(): Promise<void>;

    // Register a function to call when the cache status changes.
    onStatusUpdate(callback: (status: CacheStatus) => void): void;

    // Return the current CacheStatus.
    getStatus(): CacheStatus;
}

export default Cacher;