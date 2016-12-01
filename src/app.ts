import WebpubViewer from "./WebpubViewer";
import ServiceWorkerCacher from "./ServiceWorkerCacher";
import IFrameNavigator from "./IFrameNavigator";

let element = document.getElementById("viewer");
if (element) {
    let cacher = new ServiceWorkerCacher();
    let navigator = new IFrameNavigator(cacher);
    let viewer = new WebpubViewer(cacher, navigator);
    viewer.start(element);
}