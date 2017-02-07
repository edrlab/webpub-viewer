import Store from "./Store";
import Cacher from "./Cacher";
import Navigator from "./Navigator";
import Annotator from "./Annotator";

/** Viewer application for web publications. */
export default class WebpubViewer {
    private store: Store;
    private cacher: Cacher;
    private navigator: Navigator;
    private annotator: Annotator | null;

    /** Create a WebpubViewer. */
    /** @param store A Store to save application settings or data. */
    /** @param cacher A Cacher to handle storing webpub and app resources for offline use. */
    /** @param navigator A Navigator to handle moving between spine items and resources of the publication. */
    /** @param annotator Optional Annotator that handles bookmarking, last reading position, highlights. */
    public constructor(store: Store, cacher: Cacher, navigator: Navigator, annotator: Annotator | null = null) {
        this.store = store;
        this.cacher = cacher;
        this.navigator = navigator;
        this.annotator = annotator;
    }

    /** Start the app. */
    /** @param element An element on the page loading the application, that will contain the viewer. */
    public async start(element: HTMLElement): Promise<void> {
        // This assumes that the manifest is located next to the html file that loads the viewer.
        const manifestUrl = new URL("manifest.json", window.location.href).href;

        await this.store.start(manifestUrl);

        // Not sure if these could run concurrently.
        await this.cacher.start(manifestUrl);
        if (this.annotator) {
            await this.annotator.start();
        }
        await this.navigator.start(element, manifestUrl);
    }
}