import Manifest from "./Manifest";

interface Cacher {
    getManifest(manifestUrl: string): Promise<Manifest>;
}

export default Cacher;