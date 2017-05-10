import LocalStorageStore from "./LocalStorageStore";
import ServiceWorkerCacher from "./ServiceWorkerCacher";
import IFrameNavigator from "./IFrameNavigator";
import ColumnsPaginatedBookView from "./ColumnsPaginatedBookView";
import ScrollingBookView from "./ScrollingBookView";
import BookSettings from "./BookSettings";
import LocalAnnotator from "./LocalAnnotator";

const app = async (element: HTMLElement, manifestUrl: URL): Promise<IFrameNavigator> => {
    const bookStore = new LocalStorageStore({ prefix: manifestUrl.href });
    const cacher = new ServiceWorkerCacher({ store: bookStore, manifestUrl });
    const annotator = new LocalAnnotator({ store: bookStore });
    const paginator = new ColumnsPaginatedBookView();
    const scroller = new ScrollingBookView();
    const settingsStore = new LocalStorageStore({ prefix: "all-books" });
    const fontSizes = [ 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32 ];
    const settings = await BookSettings.create({
        store: settingsStore,
        bookViews: [paginator, scroller],
        fontSizesInPixels: fontSizes,
        defaultFontSizeInPixels: 16
    });
    return await IFrameNavigator.create({
        element,
        manifestUrl,
        store: bookStore,
        cacher,
        settings,
        annotator,
        paginator,
        scroller
    });
};

export default app;

