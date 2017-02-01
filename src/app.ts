import WebpubViewer from "./WebpubViewer";
import ServiceWorkerCacher from "./ServiceWorkerCacher";
import IFrameNavigator from "./IFrameNavigator";
import ColumnsPaginator from "./ColumnsPaginator";
import LocalStorageAnnotator from "./LocalStorageAnnotator";

const element = document.getElementById("viewer");
if (element) {
    const cacher = new ServiceWorkerCacher();
    const annotator = new LocalStorageAnnotator();
    const paginator = new ColumnsPaginator();
    const navigator = new IFrameNavigator(cacher, paginator, annotator);
    const viewer = new WebpubViewer(cacher, navigator, annotator);
    viewer.start(element);
}