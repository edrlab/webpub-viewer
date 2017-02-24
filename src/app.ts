import LocalStorageStore from "./LocalStorageStore";
import ServiceWorkerCacher from "./ServiceWorkerCacher";
import IFrameNavigator from "./IFrameNavigator";
import ColumnsPaginatedBookView from "./ColumnsPaginatedBookView";
import ScrollingBookView from "./ScrollingBookView";
import BookSettings from "./BookSettings";
import LocalAnnotator from "./LocalAnnotator";

const app = async (element: HTMLElement, manifestUrl: URL): Promise<IFrameNavigator> => {
    const store = new LocalStorageStore(manifestUrl);
    const cacher = new ServiceWorkerCacher(store, manifestUrl);
    const annotator = new LocalAnnotator(store);
    const paginator = new ColumnsPaginatedBookView();
    const scroller = new ScrollingBookView();
    const fontSizes = [ 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32 ];
    const settings = await BookSettings.create(store, [paginator, scroller], fontSizes, 16);
    return await IFrameNavigator.create(element, manifestUrl, cacher, settings, annotator, paginator, scroller);
};

export default app;

