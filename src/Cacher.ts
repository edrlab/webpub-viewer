import Manifest from "./Manifest";

interface Cacher {
    start(manifestUrl: string): Promise<void>;
    getManifest(manifestUrl: string): Promise<Manifest>;
}

export default Cacher;