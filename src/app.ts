import WebpubViewer from "./WebpubViewer";
import ServiceWorkerCacher from "./ServiceWorkerCacher";
import IFrameNavigator from "./IFrameNavigator";
import ColumnsPaginator from "./ColumnsPaginator";
import LocalStorageAnnotator from "./LocalStorageAnnotator";

let element = document.getElementById("viewer");
if (element) {
    let cacher = new ServiceWorkerCacher();
    let annotator = new LocalStorageAnnotator();
    let paginator = new ColumnsPaginator();
    let navigator = new IFrameNavigator(cacher, paginator, annotator);
    let viewer = new WebpubViewer(cacher, navigator, annotator);
    viewer.start(element);
}