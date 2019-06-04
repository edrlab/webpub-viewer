import LocalStorageStore from "../src/LocalStorageStore";
import ServiceWorkerCacher from "../src/ServiceWorkerCacher";
import PublisherFont from "../src/PublisherFont";
import SerifFont from "../src/SerifFont";
import SansFont from "../src/SansFont";
import DayTheme from "../src/DayTheme";
import SepiaTheme from "../src/SepiaTheme";
import ColumnsPaginatedBookView from "../src/ColumnsPaginatedBookView";
import NightTheme from "../src/NightTheme";
import ScrollingBookView from "../src/ScrollingBookView";
import LocalAnnotator from "../src/LocalAnnotator";
import BookSettings from "../src/BookSettings";
import IFrameNavigator from "../src/IFrameNavigator";

var getURLQueryParams = function() {
  var params = {};
  var query = window.location.search;
  if (query && query.length) {
    query = query.substring(1);
    var keyParams = query.split("&");
    for (var x = 0; x < keyParams.length; x++) {
      var keyVal = keyParams[x].split("=");
      if (keyVal.length > 1) {
        params[keyVal[0]] = decodeURIComponent(keyVal[1]);
      }
    }
  }
  return params;
};

var element = document.getElementById("viewer");
var urlParams = getURLQueryParams();
var webpubManifestUrl = new URL(urlParams["url"]);
var store = new LocalStorageStore({ prefix: webpubManifestUrl.href });
var cacher = new ServiceWorkerCacher({
  store: store,
  manifestUrl: webpubManifestUrl,
  serviceWorkerUrl: new URL("sw.js", window.location.href),
  staticFileUrls: [
    new URL(window.location.href),
    new URL("index.html", window.location.href),
    new URL("main.css", window.location.href),
    new URL("require.js", window.location.href),
    new URL("fetch.js", window.location.href),
    new URL("webpub-viewer.js", window.location.href)
  ]
});

var publisher = new PublisherFont();
var serif = new SerifFont();
var sans = new SansFont();
var fontSizes = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32];
var defaultFontSize = 20;
var day = new DayTheme();
var sepia = new SepiaTheme();
var night = new NightTheme();
var paginator = new ColumnsPaginatedBookView();
var scroller = new ScrollingBookView();
var annotator = new LocalAnnotator({ store: store });
var settingsStore = new LocalStorageStore({ prefix: "webpub-viewer" });
var upLink = {
  url: new URL("https://github.com/edrlab/webpub-viewer"),
  label: "My Library",
  ariaLabel: "Go back to the Github repository"
};

BookSettings.create({
  store: settingsStore,
  bookFonts: [publisher, serif, sans],
  fontSizesInPixels: fontSizes,
  defaultFontSizeInPixels: defaultFontSize,
  bookThemes: [day, sepia, night],
  bookViews: [paginator, scroller]
}).then(function(settings) {
  IFrameNavigator.create({
    element: element,
    manifestUrl: webpubManifestUrl,
    store: store,
    cacher: cacher,
    settings: settings,
    annotator: annotator,
    publisher: publisher,
    serif: serif,
    sans: sans,
    day: day,
    sepia: sepia,
    night: night,
    paginator: paginator,
    scroller: scroller,
    upLink: upLink,
    allowFullscreen: true
  });
});
