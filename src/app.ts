import LocalStorageStore from "./LocalStorageStore";
import ServiceWorkerCacher from "./ServiceWorkerCacher";
import IFrameNavigator from "./IFrameNavigator";
import ColumnsPaginatedBookView from "./ColumnsPaginatedBookView";
import ScrollingBookView from "./ScrollingBookView";
import BookSettings from "./BookSettings";
import LocalAnnotator from "./LocalAnnotator";

(async () => {
    const element = document.getElementById("viewer");
    const manifestUrl = new URL("manifest.json", window.location.href).href;

    if (element) {
        const store = new LocalStorageStore(manifestUrl);
        const cacher = await ServiceWorkerCacher.create(store, manifestUrl);
        const annotator = new LocalAnnotator(store);
        const paginator = new ColumnsPaginatedBookView();
        const scroller = new ScrollingBookView();
        const settings = new BookSettings([paginator, scroller]);
        await IFrameNavigator.create(element, manifestUrl, cacher, settings, annotator, paginator, scroller);
    }
})();