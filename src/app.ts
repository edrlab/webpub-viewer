import WebpubViewer from "./WebpubViewer";
import ServiceWorkerCacher from "./ServiceWorkerCacher";
import IFrameNavigator from "./IFrameNavigator";
import LocalStorageAnnotator from "./LocalStorageAnnotator";

let element = document.getElementById("viewer");
if (element) {
    let cacher = new ServiceWorkerCacher();
    let annotator = new LocalStorageAnnotator();
    let navigator = new IFrameNavigator(cacher, annotator);
    let viewer = new WebpubViewer(cacher, navigator, annotator);
    viewer.start(element);
}