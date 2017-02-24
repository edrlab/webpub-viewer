import Manifest from "./Manifest";

interface Cacher {
    getManifest(manifestUrl: URL): Promise<Manifest>;   

    // This should kick off the downloads to enable offline use.
    enable(): Promise<void>;

    renderStatus(element: HTMLElement): void;
}

export default Cacher;