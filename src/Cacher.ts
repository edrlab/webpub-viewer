import Manifest from "./Manifest";

interface Cacher {
    getManifest(manifestUrl: URL): Promise<Manifest>;
}

export default Cacher;