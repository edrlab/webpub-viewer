import WebpubViewer from "./WebpubViewer";
import LocalStorageStore from "./LocalStorageStore";
import ServiceWorkerCacher from "./ServiceWorkerCacher";
import IFrameNavigator from "./IFrameNavigator";
import ColumnsPaginatedBookView from "./ColumnsPaginatedBookView";
import LocalAnnotator from "./LocalAnnotator";

const element = document.getElementById("viewer");
if (element) {
    const store = new LocalStorageStore();
    const cacher = new ServiceWorkerCacher(store);
    const annotator = new LocalAnnotator(store);
    const paginator = new ColumnsPaginatedBookView();
    const navigator = new IFrameNavigator(cacher, paginator, annotator);
    const viewer = new WebpubViewer(store, cacher, navigator, annotator);
    viewer.start(element);
}