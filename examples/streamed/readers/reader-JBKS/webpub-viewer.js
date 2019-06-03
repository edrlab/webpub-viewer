/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_LocalStorageStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _src_ServiceWorkerCacher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _src_PublisherFont__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _src_SerifFont__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _src_SansFont__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _src_DayTheme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _src_SepiaTheme__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);
/* harmony import */ var _src_ColumnsPaginatedBookView__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(12);
/* harmony import */ var _src_NightTheme__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(14);
/* harmony import */ var _src_ScrollingBookView__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(15);
/* harmony import */ var _src_LocalAnnotator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(16);
/* harmony import */ var _src_BookSettings__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(17);
/* harmony import */ var _src_IFrameNavigator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(19);














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
var store = new _src_LocalStorageStore__WEBPACK_IMPORTED_MODULE_0__["default"]({ prefix: webpubManifestUrl.href });
var cacher = new _src_ServiceWorkerCacher__WEBPACK_IMPORTED_MODULE_1__["default"]({
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

var publisher = new _src_PublisherFont__WEBPACK_IMPORTED_MODULE_2__["default"]();
var serif = new _src_SerifFont__WEBPACK_IMPORTED_MODULE_3__["default"]();
var sans = new _src_SansFont__WEBPACK_IMPORTED_MODULE_4__["default"]();
var fontSizes = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32];
var defaultFontSize = 20;
var day = new _src_DayTheme__WEBPACK_IMPORTED_MODULE_5__["default"]();
var sepia = new _src_SepiaTheme__WEBPACK_IMPORTED_MODULE_6__["default"]();
var night = new _src_NightTheme__WEBPACK_IMPORTED_MODULE_8__["default"]();
var paginator = new _src_ColumnsPaginatedBookView__WEBPACK_IMPORTED_MODULE_7__["default"]();
var scroller = new _src_ScrollingBookView__WEBPACK_IMPORTED_MODULE_9__["default"]();
var annotator = new _src_LocalAnnotator__WEBPACK_IMPORTED_MODULE_10__["default"]({ store: store });
var settingsStore = new _src_LocalStorageStore__WEBPACK_IMPORTED_MODULE_0__["default"]({ prefix: "webpub-viewer" });
var upLink = {
  url: new URL("https://github.com/edrlab/webpub-viewer"),
  label: "My Library",
  ariaLabel: "Go back to the Github repository"
};

_src_BookSettings__WEBPACK_IMPORTED_MODULE_11__["default"].create({
  store: settingsStore,
  bookFonts: [publisher, serif, sans],
  fontSizesInPixels: fontSizes,
  defaultFontSizeInPixels: defaultFontSize,
  bookThemes: [day, sepia, night],
  bookViews: [paginator, scroller]
}).then(function(settings) {
  _src_IFrameNavigator__WEBPACK_IMPORTED_MODULE_12__["default"].create({
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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MemoryStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

/** Class that stores key/value pairs in localStorage if possible
    but falls back to an in-memory store. */
var LocalStorageStore = /** @class */ (function () {
    function LocalStorageStore(config) {
        this.prefix = config.prefix;
        try {
            // In some browsers (eg iOS Safari in private mode), 
            // localStorage exists but throws an exception when
            // you try to write to it.
            var testKey = config.prefix + "-" + String(Math.random());
            window.localStorage.setItem(testKey, "test");
            window.localStorage.removeItem(testKey);
            this.fallbackStore = null;
        }
        catch (e) {
            this.fallbackStore = new _MemoryStore__WEBPACK_IMPORTED_MODULE_0__["default"]();
        }
    }
    LocalStorageStore.prototype.getLocalStorageKey = function (key) {
        return this.prefix + "-" + key;
    };
    LocalStorageStore.prototype.get = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        value = null;
                        if (!!this.fallbackStore) return [3 /*break*/, 1];
                        value = window.localStorage.getItem(this.getLocalStorageKey(key));
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.fallbackStore.get(key)];
                    case 2:
                        value = _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, new Promise(function (resolve) { return resolve(value); })];
                }
            });
        });
    };
    LocalStorageStore.prototype.set = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.fallbackStore) return [3 /*break*/, 1];
                        window.localStorage.setItem(this.getLocalStorageKey(key), value);
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.fallbackStore.set(key, value)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, new Promise(function (resolve) { return resolve(); })];
                }
            });
        });
    };
    return LocalStorageStore;
}());
/* harmony default export */ __webpack_exports__["default"] = (LocalStorageStore);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/** Class that stores key/value pairs in memory. */
var MemoryStore = /** @class */ (function () {
    function MemoryStore() {
        this.store = {};
    }
    MemoryStore.prototype.get = function (key) {
        var value = this.store[key] || null;
        return new Promise(function (resolve) { return resolve(value); });
    };
    MemoryStore.prototype.set = function (key, value) {
        this.store[key] = value;
        return new Promise(function (resolve) { return resolve(); });
    };
    return MemoryStore;
}());
/* harmony default export */ __webpack_exports__["default"] = (MemoryStore);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Cacher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _Manifest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


/** Class that caches responses using ServiceWorker's Cache API, and optionally
    falls back to the application cache if service workers aren't available. */
var ServiceWorkerCacher = /** @class */ (function () {
    /** Create a ServiceWorkerCacher. */
    function ServiceWorkerCacher(config) {
        this.cacheStatus = _Cacher__WEBPACK_IMPORTED_MODULE_0__["CacheStatus"].Uncached;
        this.statusUpdateCallback = function () { };
        this.serviceWorkerUrl = config.serviceWorkerUrl || new URL("sw.js", config.manifestUrl.href);
        this.staticFileUrls = config.staticFileUrls || [];
        this.store = config.store;
        this.manifestUrl = config.manifestUrl;
        var protocol = window.location.protocol;
        this.areServiceWorkersSupported = !!navigator.serviceWorker && !!window.caches && (protocol === "https:");
    }
    ServiceWorkerCacher.prototype.enable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.areServiceWorkersSupported && (this.cacheStatus !== _Cacher__WEBPACK_IMPORTED_MODULE_0__["CacheStatus"].Downloaded))) return [3 /*break*/, 4];
                        this.cacheStatus = _Cacher__WEBPACK_IMPORTED_MODULE_0__["CacheStatus"].Downloading;
                        this.updateStatus();
                        navigator.serviceWorker.register(this.serviceWorkerUrl.href);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.verifyAndCacheManifest(this.manifestUrl)];
                    case 2:
                        _a.sent();
                        this.cacheStatus = _Cacher__WEBPACK_IMPORTED_MODULE_0__["CacheStatus"].Downloaded;
                        this.updateStatus();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        this.cacheStatus = _Cacher__WEBPACK_IMPORTED_MODULE_0__["CacheStatus"].Error;
                        this.updateStatus();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, new Promise(function (resolve) { return resolve(); })];
                }
            });
        });
    };
    ServiceWorkerCacher.prototype.verifyAndCacheManifest = function (manifestUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var urlsToCache, _i, _a, url, promises, _b, promises_1, promise, err_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, navigator.serviceWorker.ready];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 7, , 8]);
                        urlsToCache = [manifestUrl.href];
                        for (_i = 0, _a = this.staticFileUrls; _i < _a.length; _i++) {
                            url = _a[_i];
                            urlsToCache.push(url.href);
                        }
                        promises = [this.cacheManifest(manifestUrl), this.cacheUrls(urlsToCache, manifestUrl)];
                        _b = 0, promises_1 = promises;
                        _c.label = 3;
                    case 3:
                        if (!(_b < promises_1.length)) return [3 /*break*/, 6];
                        promise = promises_1[_b];
                        return [4 /*yield*/, promise];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        _b++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, new Promise(function (resolve) { return resolve(); })];
                    case 7:
                        err_2 = _c.sent();
                        return [2 /*return*/, new Promise(function (_, reject) { return reject(err_2); })];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ServiceWorkerCacher.prototype.cacheUrls = function (urls, manifestUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var cache;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, window.caches.open(manifestUrl.href)];
                    case 1:
                        cache = _a.sent();
                        return [2 /*return*/, cache.addAll(urls.map(function (url) { return new URL(url, manifestUrl.href).href; }))];
                }
            });
        });
    };
    ServiceWorkerCacher.prototype.cacheManifest = function (manifestUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var manifest, promises, _i, promises_2, promise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _Manifest__WEBPACK_IMPORTED_MODULE_1__["default"].getManifest(manifestUrl, this.store)];
                    case 1:
                        manifest = _a.sent();
                        promises = [this.cacheSpine(manifest, manifestUrl), this.cacheResources(manifest, manifestUrl)];
                        _i = 0, promises_2 = promises;
                        _a.label = 2;
                    case 2:
                        if (!(_i < promises_2.length)) return [3 /*break*/, 5];
                        promise = promises_2[_i];
                        return [4 /*yield*/, promise];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, new Promise(function (resolve) { return resolve(); })];
                }
            });
        });
    };
    ServiceWorkerCacher.prototype.cacheSpine = function (manifest, manifestUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var urls, _i, _a, resource;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        urls = [];
                        for (_i = 0, _a = manifest.spine; _i < _a.length; _i++) {
                            resource = _a[_i];
                            if (resource.href) {
                                urls.push(resource.href);
                            }
                        }
                        return [4 /*yield*/, this.cacheUrls(urls, manifestUrl)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    ServiceWorkerCacher.prototype.cacheResources = function (manifest, manifestUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var urls, _i, _a, resource;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        urls = [];
                        for (_i = 0, _a = manifest.resources; _i < _a.length; _i++) {
                            resource = _a[_i];
                            if (resource.href) {
                                urls.push(resource.href);
                            }
                        }
                        return [4 /*yield*/, this.cacheUrls(urls, manifestUrl)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    ServiceWorkerCacher.prototype.onStatusUpdate = function (callback) {
        this.statusUpdateCallback = callback;
        this.updateStatus();
    };
    ServiceWorkerCacher.prototype.getStatus = function () {
        return this.cacheStatus;
    };
    ServiceWorkerCacher.prototype.updateStatus = function () {
        this.statusUpdateCallback(this.cacheStatus);
    };
    return ServiceWorkerCacher;
}());
/* harmony default export */ __webpack_exports__["default"] = (ServiceWorkerCacher);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CacheStatus", function() { return CacheStatus; });
var CacheStatus;
(function (CacheStatus) {
    /** The book has not been cached. */
    CacheStatus[CacheStatus["Uncached"] = 0] = "Uncached";
    /** There is a new version available (Application Cache only - refresh the page to update). */
    CacheStatus[CacheStatus["UpdateAvailable"] = 1] = "UpdateAvailable";
    /** The app is checking for a new version (Application Cache only). */
    CacheStatus[CacheStatus["CheckingForUpdate"] = 2] = "CheckingForUpdate";
    /** The cache is downloading. */
    CacheStatus[CacheStatus["Downloading"] = 3] = "Downloading";
    /** The cache is fully downloaded and the book is available offline. */
    CacheStatus[CacheStatus["Downloaded"] = 4] = "Downloaded";
    /** There was an error downloading the cache, and the book is not available offline. */
    CacheStatus[CacheStatus["Error"] = 5] = "Error";
})(CacheStatus || (CacheStatus = {}));


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Manifest = /** @class */ (function () {
    function Manifest(manifestJSON, manifestUrl) {
        this.metadata = manifestJSON.metadata || {};
        this.links = manifestJSON.links || [];
        this.spine = (manifestJSON.readingOrder || manifestJSON.spine) || [];
        this.resources = manifestJSON.resources || [];
        this.toc = manifestJSON.toc || [];
        this.manifestUrl = manifestUrl;
    }
    Manifest.getManifest = function (manifestUrl, store) {
        return __awaiter(this, void 0, void 0, function () {
            var fetchManifest, tryToUpdateManifestButIgnoreResult, manifestString, manifestJSON;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fetchManifest = function () { return __awaiter(_this, void 0, void 0, function () {
                            var response, manifestJSON;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, window.fetch(manifestUrl.href)];
                                    case 1:
                                        response = _a.sent();
                                        return [4 /*yield*/, response.json()];
                                    case 2:
                                        manifestJSON = _a.sent();
                                        if (!store) return [3 /*break*/, 4];
                                        return [4 /*yield*/, store.set("manifest", JSON.stringify(manifestJSON))];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4: return [2 /*return*/, new Manifest(manifestJSON, manifestUrl)];
                                }
                            });
                        }); };
                        tryToUpdateManifestButIgnoreResult = function () { return __awaiter(_this, void 0, void 0, function () {
                            var err_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, fetchManifest()];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        err_1 = _a.sent();
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/, new Promise(function (resolve) { return resolve(); })];
                                }
                            });
                        }); };
                        if (!store) return [3 /*break*/, 2];
                        return [4 /*yield*/, store.get("manifest")];
                    case 1:
                        manifestString = _a.sent();
                        if (manifestString) {
                            // Kick off a fetch to update the store for next time,
                            // but don't await it.
                            tryToUpdateManifestButIgnoreResult();
                            manifestJSON = JSON.parse(manifestString);
                            return [2 /*return*/, new Manifest(manifestJSON, manifestUrl)];
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/, fetchManifest()];
                }
            });
        });
    };
    Manifest.prototype.getStartLink = function () {
        if (this.spine.length > 0) {
            return this.spine[0];
        }
        return null;
    };
    Manifest.prototype.getPreviousSpineItem = function (href) {
        var index = this.getSpineIndex(href);
        if (index !== null && index > 0) {
            return this.spine[index - 1];
        }
        return null;
    };
    Manifest.prototype.getNextSpineItem = function (href) {
        var index = this.getSpineIndex(href);
        if (index !== null && index < (this.spine.length - 1)) {
            return this.spine[index + 1];
        }
        return null;
    };
    Manifest.prototype.getSpineItem = function (href) {
        var index = this.getSpineIndex(href);
        if (index !== null) {
            return this.spine[index];
        }
        return null;
    };
    Manifest.prototype.getSpineIndex = function (href) {
        for (var index = 0; index < this.spine.length; index++) {
            var item = this.spine[index];
            if (item.href) {
                var itemUrl = new URL(item.href, this.manifestUrl.href).href;
                if (itemUrl === href) {
                    return index;
                }
            }
        }
        return null;
    };
    Manifest.prototype.getTOCItem = function (href) {
        var _this = this;
        var findItem = function (href, links) {
            for (var index = 0; index < links.length; index++) {
                var item = links[index];
                if (item.href) {
                    var itemUrl = new URL(item.href, _this.manifestUrl.href).href;
                    if (itemUrl === href) {
                        return item;
                    }
                }
                if (item.children) {
                    var childItem = findItem(href, item.children);
                    if (childItem !== null) {
                        return childItem;
                    }
                }
            }
            return null;
        };
        return findItem(href, this.toc);
    };
    return Manifest;
}());
/* harmony default export */ __webpack_exports__["default"] = (Manifest);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);

var PublisherFont = /** @class */ (function () {
    function PublisherFont() {
        this.name = "publisher-font";
        this.label = "Publisher";
    }
    PublisherFont.prototype.start = function () {
        var rootFrame = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["setAttr"](rootFrame, "data-viewer-font", "publisher");
    };
    PublisherFont.prototype.stop = function () {
        var rootFrame = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["removeAttr"](rootFrame, "data-viewer-font");
    };
    return PublisherFont;
}());
/* harmony default export */ __webpack_exports__["default"] = (PublisherFont);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findElement", function() { return findElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findRequiredElement", function() { return findRequiredElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findIframeElement", function() { return findIframeElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findRequiredIframeElement", function() { return findRequiredIframeElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAttr", function() { return setAttr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeAttr", function() { return removeAttr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStylesheet", function() { return createStylesheet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeStylesheet", function() { return removeStylesheet; });
/** Returns a single element matching the selector within the parentElement,
    or null if no element matches. */
function findElement(parentElement, selector) {
    return parentElement.querySelector(selector);
}
/** Returns a single element matching the selector within the parent element,
    or throws an exception if no element matches. */
function findRequiredElement(parentElement, selector) {
    var element = findElement(parentElement, selector);
    if (!element) {
        throw "required element " + selector + " not found";
    }
    else {
        return element;
    }
}
/** Returns a single element matching the selector within the parentElement in the iframe context,
    or null if no element matches. */
function findIframeElement(parentElement, selector) {
    if (parentElement === null) {
        throw "parent element is null";
    }
    else {
        return parentElement.querySelector(selector);
    }
}
/** Returns a single element matching the selector within the parent element in an iframe context,
        or throws an exception if no element matches. */
function findRequiredIframeElement(parentElement, selector) {
    var element = findIframeElement(parentElement, selector);
    if (!element) {
        throw "required element " + selector + " not found in iframe";
    }
    else {
        return element;
    }
}
/** Sets an attribute and its value for an HTML element */
function setAttr(element, attr, value) {
    element.setAttribute(attr, value);
}
/** Removes an attribute for an HTML element */
function removeAttr(element, attr) {
    element.removeAttribute(attr);
}
/** Creates an internal stylesheet in an HTML element */
function createStylesheet(element, id, cssStyles) {
    var head = element.querySelector("head");
    var stylesheet = document.createElement("style");
    stylesheet.id = id;
    stylesheet.textContent = cssStyles;
    head.appendChild(stylesheet);
}
/** Removes an existing internal stylesheet in an HTML element */
function removeStylesheet(element, id) {
    var head = element.querySelector("head");
    var stylesheet = head.querySelector("#" + id);
    head.removeChild(stylesheet);
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);

var SerifFont = /** @class */ (function () {
    function SerifFont() {
        this.name = "serif-font";
        this.label = "Serif";
    }
    SerifFont.prototype.start = function () {
        var rootFrame = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["setAttr"](rootFrame, "data-viewer-font", "serif");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["createStylesheet"](rootFrame, "serif-font-internal", "* {font-family: 'Iowan Old Style', 'Sitka Text', Palatino, 'Book Antiqua', serif !important;}");
    };
    SerifFont.prototype.stop = function () {
        var rootFrame = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["removeAttr"](rootFrame, "data-viewer-font");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["removeStylesheet"](rootFrame, "serif-font-internal");
    };
    return SerifFont;
}());
/* harmony default export */ __webpack_exports__["default"] = (SerifFont);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);

var SansFont = /** @class */ (function () {
    function SansFont() {
        this.name = "sans-font";
        this.label = "Sans-serif";
    }
    SansFont.prototype.start = function () {
        var rootFrame = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["setAttr"](rootFrame, "data-viewer-font", "sans");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["createStylesheet"](rootFrame, "sans-font-internal", "* {font-family: Seravek, Calibri, Roboto, Arial, sans-serif !important;}");
    };
    SansFont.prototype.stop = function () {
        var rootFrame = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["removeAttr"](rootFrame, "data-viewer-font");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["removeStylesheet"](rootFrame, "sans-font-internal");
    };
    return SansFont;
}());
/* harmony default export */ __webpack_exports__["default"] = (SansFont);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);

var DayTheme = /** @class */ (function () {
    function DayTheme() {
        this.name = "day-theme";
        this.label = "Day";
    }
    DayTheme.prototype.start = function () {
        var rootElement = document.documentElement;
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["setAttr"](rootElement, "data-viewer-theme", "day");
    };
    DayTheme.prototype.stop = function () {
        var rootElement = document.documentElement;
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["removeAttr"](rootElement, "data-viewer-theme");
    };
    return DayTheme;
}());
/* harmony default export */ __webpack_exports__["default"] = (DayTheme);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);

var SepiaTheme = /** @class */ (function () {
    function SepiaTheme() {
        this.name = "sepia-theme";
        this.label = "Sepia";
    }
    SepiaTheme.prototype.start = function () {
        var rootElement = document.documentElement;
        var rootFrame = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["setAttr"](rootElement, "data-viewer-theme", "sepia");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["createStylesheet"](rootFrame, "sepia-mode-internal", ":root {background-color: #f6ecd9 !important}  img, svg {background-color: transparent !important; mix-blend-mode: multiply;}");
    };
    SepiaTheme.prototype.stop = function () {
        var rootElement = document.documentElement;
        var rootFrame = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["removeAttr"](rootElement, "data-viewer-theme");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["removeStylesheet"](rootFrame, "sepia-mode-internal");
    };
    return SepiaTheme;
}());
/* harmony default export */ __webpack_exports__["default"] = (SepiaTheme);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _BrowserUtilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);


var ColumnsPaginatedBookView = /** @class */ (function () {
    function ColumnsPaginatedBookView() {
        this.name = "columns-paginated-view";
        this.label = "Paginated";
        this.sideMargin = 0;
        this.height = 0;
        this.hasFixedScrollWidth = false;
    }
    ColumnsPaginatedBookView.prototype.start = function (position) {
        // any is necessary because CSSStyleDeclaration type does not include
        // all the vendor-prefixed attributes.
        var body = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "body");
        body.style.webkitColumnCount = "1";
        body.style.MozColumnCount = "1";
        body.style.columnCount = "1";
        body.style.webkitColumnFill = "auto";
        body.style.MozColumnFill = "auto";
        body.style.columnFill = "auto";
        body.style.overflow = "hidden";
        body.style.position = "relative";
        body.style.webkitFontSmoothing = "subpixel-antialiased";
        this.setSize();
        var viewportElement = document.createElement("meta");
        viewportElement.name = "viewport";
        viewportElement.content = "width=device-width, initial-scale=1, maximum-scale=1";
        var head = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findIframeElement"](this.bookElement.contentDocument, "head");
        if (head) {
            head.appendChild(viewportElement);
        }
        this.checkForFixedScrollWidth();
        this.goToPosition(position);
        // This is delayed to prevent a bug in iOS 10.3 that causes
        // the top links to be displayed in the middle of the page.
        setTimeout(function () {
            document.body.style.overflow = "hidden";
            // This prevents overscroll/bouncing on iOS.
            document.body.style.position = "fixed";
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.top = "0";
            document.body.style.bottom = "0";
        }, 0);
    };
    ColumnsPaginatedBookView.prototype.checkForFixedScrollWidth = function () {
        // Determine if the scroll width changes when the left position
        // changes. This differs across browsers and sometimes across
        // books in the same browser.
        var body = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "body");
        var originalLeft = (body.style.left || "0px").slice(0, -2);
        var originalScrollWidth = body.scrollWidth;
        body.style.left = (originalLeft - 1) + "px";
        this.hasFixedScrollWidth = (body.scrollWidth === originalScrollWidth);
        body.style.left = originalLeft + "px";
    };
    ColumnsPaginatedBookView.prototype.setSize = function () {
        // any is necessary because CSSStyleDeclaration type does not include
        // all the vendor-prefixed attributes.
        var body = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "body");
        var width = (_BrowserUtilities__WEBPACK_IMPORTED_MODULE_1__["getWidth"]() - this.sideMargin * 2) + "px";
        body.style.columnWidth = width;
        body.style.webkitColumnWidth = width;
        body.style.MozColumnWidth = width;
        body.style.columnGap = this.sideMargin * 2 + "px";
        body.style.webkitColumnGap = this.sideMargin * 2 + "px";
        body.style.MozColumnGap = this.sideMargin * 2 + "px";
        body.style.height = this.height + "px";
        body.style.width = width;
        body.style.marginLeft = this.sideMargin + "px";
        body.style.marginRight = this.sideMargin + "px";
        body.style.marginTop = "0px";
        body.style.marginBottom = "0px";
        this.bookElement.contentDocument.documentElement.style.height = this.height + "px";
        this.bookElement.style.height = this.height + "px";
        this.bookElement.style.width = _BrowserUtilities__WEBPACK_IMPORTED_MODULE_1__["getWidth"]() + "px";
        var images = body.querySelectorAll("img");
        for (var _i = 0, images_1 = images; _i < images_1.length; _i++) {
            var image = images_1[_i];
            image.style.maxWidth = "100%";
            // Determine how much vertical space there is for the image.
            var nextElement = image;
            var totalMargins = 0;
            while (nextElement !== body) {
                var computedStyle = window.getComputedStyle(nextElement);
                if (computedStyle.marginTop) {
                    totalMargins += parseInt(computedStyle.marginTop.slice(0, -2), 10);
                }
                if (computedStyle.marginBottom) {
                    totalMargins += parseInt(computedStyle.marginBottom.slice(0, -2), 10);
                }
                nextElement = nextElement.parentElement;
            }
            image.style.maxHeight = (this.height - totalMargins) + "px";
            // Without this, an image at the end of a resource can end up
            // with an extra empty column after it.
            image.style.verticalAlign = "top";
        }
    };
    ColumnsPaginatedBookView.prototype.stop = function () {
        document.body.style.overflow = "auto";
        document.body.style.position = "static";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.top = "";
        document.body.style.bottom = "";
        var body = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "body");
        body.style.columnCount = "";
        body.style.webkitColumnCount = "";
        body.style.MozColumnCount = "";
        body.style.columnGap = "";
        body.style.webkitColumnGap = "";
        body.style.MozColumnGap = "";
        body.style.columnFill = "";
        body.style.webkitColumnFill = "";
        body.style.MozColumnFill = "";
        body.style.overflow = "";
        body.style.position = "";
        body.style.webkitFontSmoothing = "";
        body.style.columnWidth = "";
        body.style.webkitColumnWidth = "";
        body.style.MozColumnWidth = "";
        body.style.height = "";
        body.style.width = "";
        body.style.marginLeft = "";
        body.style.marginRight = "";
        body.style.marginTop = "";
        body.style.marginBottom = "";
        this.bookElement.contentDocument.documentElement.style.height = "";
        this.bookElement.style.height = "";
        this.bookElement.style.width = "";
        var images = body.querySelectorAll("img");
        for (var _i = 0, images_2 = images; _i < images_2.length; _i++) {
            var image = images_2[_i];
            image.style.maxWidth = "";
            image.style.maxHeight = "";
            image.style.display = "";
            image.style.marginLeft = "";
            image.style.marginRight = "";
        }
    };
    /** Returns the total width of the columns that are currently
        positioned to the left of the iframe viewport. */
    ColumnsPaginatedBookView.prototype.getLeftColumnsWidth = function () {
        var body = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "body");
        var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
        var isXML = this.bookElement.src.indexOf(".xml") !== -1;
        if (isFirefox && isXML) {
            // Feedbooks epubs have resources with .xml file extensions for historical
            // reasons. Firefox handles these differently than XHTML files, and setting
            // a left position as well as overflow:hidden causes the pages to be blank.
            return body.scrollLeft;
        }
        return -(body.style.left || "0px").slice(0, -2);
    };
    /** Returns the total width of the columns that are currently
        positioned to the right of the iframe viewport. */
    ColumnsPaginatedBookView.prototype.getRightColumnsWidth = function () {
        // scrollWidth includes the column in the iframe viewport as well as
        // columns to the right.
        var body = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "body");
        var scrollWidth = body.scrollWidth;
        var width = this.getColumnWidth();
        var rightWidth = scrollWidth + this.sideMargin - width;
        if (this.hasFixedScrollWidth) {
            // In some browsers (IE and Firefox with certain books), 
            // scrollWidth doesn't change when some columns
            // are off to the left, so we need to subtract them.
            var leftWidth = this.getLeftColumnsWidth();
            rightWidth = Math.max(0, rightWidth - leftWidth);
        }
        if (rightWidth === this.sideMargin) {
            return 0;
        }
        else {
            return rightWidth;
        }
    };
    /** Returns the width of one column. */
    ColumnsPaginatedBookView.prototype.getColumnWidth = function () {
        var body = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "body");
        return body.offsetWidth + this.sideMargin * 2;
    };
    /** Shifts the columns so that the specified width is positioned
        to the left of the iframe viewport. */
    ColumnsPaginatedBookView.prototype.setLeftColumnsWidth = function (width) {
        var body = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "body");
        var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
        var isXML = this.bookElement.src.indexOf(".xml") !== -1;
        if (isFirefox && isXML) {
            // Feedbooks epubs have resources with .xml file extensions for historical
            // reasons. Firefox handles these differently than XHTML files, and setting
            // a left position as well as overflow:hidden causes the pages to be blank.
            body.scrollLeft = width;
        }
        else {
            body.style.left = -width + "px";
        }
    };
    /** Returns number in range [0..1) representing the
        proportion of columns that are currently positioned
        to the left of the iframe viewport. */
    ColumnsPaginatedBookView.prototype.getCurrentPosition = function () {
        var width = this.getColumnWidth();
        var leftWidth = this.getLeftColumnsWidth();
        var rightWidth = this.getRightColumnsWidth();
        var totalWidth = leftWidth + width + rightWidth;
        return leftWidth / totalWidth;
    };
    /** Returns the current 1-indexed page number. */
    ColumnsPaginatedBookView.prototype.getCurrentPage = function () {
        return this.getCurrentPosition() * this.getPageCount() + 1;
    };
    /** Returns the total number of pages. */
    ColumnsPaginatedBookView.prototype.getPageCount = function () {
        var width = this.getColumnWidth();
        var leftWidth = this.getLeftColumnsWidth();
        var rightWidth = this.getRightColumnsWidth();
        var totalWidth = leftWidth + width + rightWidth;
        return totalWidth / width;
    };
    ColumnsPaginatedBookView.prototype.onFirstPage = function () {
        var leftWidth = this.getLeftColumnsWidth();
        return (leftWidth <= 0);
    };
    ColumnsPaginatedBookView.prototype.onLastPage = function () {
        var rightWidth = this.getRightColumnsWidth();
        return (rightWidth <= 0);
    };
    ColumnsPaginatedBookView.prototype.goToPreviousPage = function () {
        var leftWidth = this.getLeftColumnsWidth();
        var width = this.getColumnWidth();
        this.setLeftColumnsWidth(leftWidth - width);
    };
    ColumnsPaginatedBookView.prototype.goToNextPage = function () {
        var leftWidth = this.getLeftColumnsWidth();
        var width = this.getColumnWidth();
        this.setLeftColumnsWidth(leftWidth + width);
    };
    /** Goes to a position specified by a number in the range [0..1].
        The position should be a number as returned by getCurrentPosition,
        or 1 to go to the last page. The position will be rounded down so
        it matches the position of one of the columns. */
    /** @param position Number in range [0..1] */
    ColumnsPaginatedBookView.prototype.goToPosition = function (position) {
        this.setSize();
        // If the window has changed size since the columns were set up,
        // we need to reset position so we can determine the new total width.
        this.setLeftColumnsWidth(0);
        var width = this.getColumnWidth();
        var rightWidth = this.getRightColumnsWidth();
        var totalWidth = width + rightWidth;
        var newLeftWidth = position * totalWidth;
        // Round the new left width so it's a multiple of the column width.
        var roundedLeftWidth = Math.round(newLeftWidth / width) * width;
        if (roundedLeftWidth >= totalWidth) {
            // We've gone too far and all the columns are off to the left.
            // Move one column back into the viewport.
            roundedLeftWidth = roundedLeftWidth - width;
        }
        this.setLeftColumnsWidth(roundedLeftWidth);
    };
    ColumnsPaginatedBookView.prototype.goToElement = function (elementId, relative) {
        var element = this.bookElement.contentDocument.getElementById(elementId);
        if (element) {
            // Get the element's position in the iframe, and
            // round that to figure out the column it's in.
            // There is a bug in Safari when using getBoundingClientRect
            // on an element that spans multiple columns. Temporarily
            // set the element's height to fit it on one column so we
            // can determine the first column position.
            var originalHeight = element.style.height;
            element.style.height = "0";
            var left = element.getBoundingClientRect().left;
            var width = this.getColumnWidth();
            var roundedLeftWidth = Math.floor(left / width) * width;
            if (relative) {
                var origin = this.getLeftColumnsWidth();
                roundedLeftWidth = (Math.floor(left / width) * width) + origin;
            }
            // Restore element's original height.
            element.style.height = originalHeight;
            this.setLeftColumnsWidth(roundedLeftWidth);
        }
    };
    return ColumnsPaginatedBookView;
}());
/* harmony default export */ __webpack_exports__["default"] = (ColumnsPaginatedBookView);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWidth", function() { return getWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHeight", function() { return getHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isZoomed", function() { return isZoomed; });
/** Returns the current width of the document. */
function getWidth() {
    return document.documentElement.clientWidth;
}
/** Returns the current height of the document. */
function getHeight() {
    return document.documentElement.clientHeight;
}
/** Returns true if the browser is zoomed in with pinch-to-zoom on mobile. */
function isZoomed() {
    return (getWidth() !== window.innerWidth);
}


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);

var NightTheme = /** @class */ (function () {
    function NightTheme() {
        this.name = "night-theme";
        this.label = "Night";
    }
    NightTheme.prototype.start = function () {
        var rootElement = document.documentElement;
        var rootFrame = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["setAttr"](rootElement, "data-viewer-theme", "night");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["createStylesheet"](rootFrame, "night-mode-internal", ":root {background-color: #111 !important; color: #FFFFFF !important} :not(a) {background-color: transparent !important; color: #FFFFFF !important; border-color: currentColor !important;} a {color: #53CEEA !important;}");
    };
    NightTheme.prototype.stop = function () {
        var rootElement = document.documentElement;
        var rootFrame = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["removeAttr"](rootElement, "data-viewer-theme");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["removeStylesheet"](rootFrame, "night-mode-internal");
    };
    return NightTheme;
}());
/* harmony default export */ __webpack_exports__["default"] = (NightTheme);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BrowserUtilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _HTMLUtilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);


var ScrollingBookView = /** @class */ (function () {
    function ScrollingBookView() {
        this.name = "scrolling-book-view";
        this.label = "Scrolling";
        this.sideMargin = 0;
        this.height = 0;
    }
    ScrollingBookView.prototype.setIFrameSize = function () {
        // Remove previous iframe height so body scroll height will be accurate.
        this.bookElement.style.height = "";
        this.bookElement.style.width = _BrowserUtilities__WEBPACK_IMPORTED_MODULE_0__["getWidth"]() + "px";
        var body = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_1__["findRequiredIframeElement"](this.bookElement.contentDocument, "body");
        var width = (_BrowserUtilities__WEBPACK_IMPORTED_MODULE_0__["getWidth"]() - this.sideMargin * 2) + "px";
        body.style.width = width;
        body.style.marginLeft = this.sideMargin + "px";
        body.style.marginRight = this.sideMargin + "px";
        var minHeight = this.height;
        var bodyHeight = body.scrollHeight;
        this.bookElement.style.height = Math.max(minHeight, bodyHeight) + "px";
        var images = Array.prototype.slice.call(body.querySelectorAll("img"));
        for (var _i = 0, images_1 = images; _i < images_1.length; _i++) {
            var image = images_1[_i];
            image.style.maxWidth = width;
        }
    };
    ScrollingBookView.prototype.start = function (position) {
        this.goToPosition(position);
    };
    ScrollingBookView.prototype.stop = function () {
        this.bookElement.style.height = "";
        this.bookElement.style.width = "";
        var body = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_1__["findRequiredIframeElement"](this.bookElement.contentDocument, "body");
        body.style.width = "";
        body.style.marginLeft = "";
        body.style.marginRight = "";
        var images = Array.prototype.slice.call(body.querySelectorAll("img"));
        for (var _i = 0, images_2 = images; _i < images_2.length; _i++) {
            var image = images_2[_i];
            image.style.maxWidth = "";
        }
    };
    ScrollingBookView.prototype.getCurrentPosition = function () {
        return document.body.scrollTop / document.body.scrollHeight;
    };
    ScrollingBookView.prototype.atBottom = function () {
        return (document.body.scrollHeight - document.body.scrollTop) === _BrowserUtilities__WEBPACK_IMPORTED_MODULE_0__["getHeight"]();
    };
    ScrollingBookView.prototype.goToPosition = function (position) {
        this.setIFrameSize();
        document.body.scrollTop = document.body.scrollHeight * position;
    };
    ScrollingBookView.prototype.goToElement = function (elementId) {
        var element = this.bookElement.contentDocument.getElementById(elementId);
        if (element) {
            // Put the element as close to the top as possible.
            element.scrollIntoView();
            // Unless we're already at the bottom, scroll up so the element is
            // in the middle, and not covered by the top nav.
            if ((document.body.scrollHeight - element.offsetTop) >= this.height) {
                document.body.scrollTop = Math.max(0, document.body.scrollTop - this.height / 3);
            }
        }
    };
    return ScrollingBookView;
}());
/* harmony default export */ __webpack_exports__["default"] = (ScrollingBookView);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/** Annotator that stores annotations locally, in the browser. */
var LocalAnnotator = /** @class */ (function () {
    function LocalAnnotator(config) {
        this.store = config.store;
    }
    LocalAnnotator.prototype.getLastReadingPosition = function () {
        return __awaiter(this, void 0, void 0, function () {
            var positionString, position_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.store.get(LocalAnnotator.LAST_READING_POSITION)];
                    case 1:
                        positionString = _a.sent();
                        if (positionString) {
                            position_1 = JSON.parse(positionString);
                            return [2 /*return*/, new Promise(function (resolve) { return resolve(position_1); })];
                        }
                        return [2 /*return*/, new Promise(function (resolve) { return resolve(); })];
                }
            });
        });
    };
    LocalAnnotator.prototype.saveLastReadingPosition = function (position) {
        return __awaiter(this, void 0, void 0, function () {
            var positionString;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        positionString = JSON.stringify(position);
                        return [4 /*yield*/, this.store.set(LocalAnnotator.LAST_READING_POSITION, positionString)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new Promise(function (resolve) { return resolve(); })];
                }
            });
        });
    };
    LocalAnnotator.LAST_READING_POSITION = "last-reading-position";
    return LocalAnnotator;
}());
/* harmony default export */ __webpack_exports__["default"] = (LocalAnnotator);


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _IconLib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var template = function (sections) { return "\n    <ul class=\"settings-menu\" role=\"menu\">\n        " + sections + "\n    </ul>\n"; };
var sectionTemplate = function (options) { return "\n    <li><ul class=\"settings-options\">\n        " + options + "\n    </ul></li>\n"; };
var optionTemplate = function (liClassName, buttonClassName, label, role, svgIcon, buttonId) { return "\n    <li class='" + liClassName + "'><button id='" + buttonId + "' class='" + buttonClassName + "' role='" + role + "' tabindex=-1>" + label + svgIcon + "</button></li>\n"; };
var offlineTemplate = "\n    <li>\n        <div class='offline-status'></div>\n    </li>\n";
var BookSettings = /** @class */ (function () {
    function BookSettings(store, bookFonts, fontSizes, bookThemes, bookViews) {
        this.fontChangeCallback = function () { };
        this.fontSizeChangeCallback = function () { };
        this.themeChangeCallback = function () { };
        this.viewChangeCallback = function () { };
        this.store = store;
        this.bookFonts = bookFonts;
        this.fontSizes = fontSizes;
        this.bookThemes = bookThemes;
        this.bookViews = bookViews;
    }
    BookSettings.create = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var fontSizes, settings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fontSizes = config.fontSizesInPixels.map(function (fontSize) { return fontSize + "px"; });
                        settings = new this(config.store, config.bookFonts, fontSizes, config.bookThemes, config.bookViews);
                        return [4 /*yield*/, settings.initializeSelections(config.defaultFontSizeInPixels ? config.defaultFontSizeInPixels + "px" : undefined)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, settings];
                }
            });
        });
    };
    BookSettings.prototype.initializeSelections = function (defaultFontSize) {
        return __awaiter(this, void 0, void 0, function () {
            var selectedFont, selectedFontName, _i, _a, bookFont, selectedFontSize, selectedFontSizeIsAvailable, averageFontSizeIndex, selectedTheme, selectedThemeName, _b, _c, bookTheme, selectedView, selectedViewName, _d, _e, bookView;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!(this.bookFonts.length >= 1)) return [3 /*break*/, 2];
                        selectedFont = this.bookFonts[0];
                        return [4 /*yield*/, this.store.get(BookSettings.SELECTED_FONT_KEY)];
                    case 1:
                        selectedFontName = _f.sent();
                        if (selectedFontName) {
                            for (_i = 0, _a = this.bookFonts; _i < _a.length; _i++) {
                                bookFont = _a[_i];
                                if (bookFont.name === selectedFontName) {
                                    selectedFont = bookFont;
                                    break;
                                }
                            }
                        }
                        this.selectedFont = selectedFont;
                        _f.label = 2;
                    case 2:
                        if (!(this.fontSizes.length >= 1)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.store.get(BookSettings.SELECTED_FONT_SIZE_KEY)];
                    case 3:
                        selectedFontSize = _f.sent();
                        selectedFontSizeIsAvailable = (selectedFontSize && this.fontSizes.indexOf(selectedFontSize) !== -1);
                        // If not, or the user selected a size that's no longer an option, is there a default font size?
                        if ((!selectedFontSize || !selectedFontSizeIsAvailable) && defaultFontSize) {
                            selectedFontSize = defaultFontSize;
                            selectedFontSizeIsAvailable = (selectedFontSize && this.fontSizes.indexOf(selectedFontSize) !== -1);
                        }
                        // If there's no selection and no default, pick a font size in the middle of the options.
                        if (!selectedFontSize || !selectedFontSizeIsAvailable) {
                            averageFontSizeIndex = Math.floor(this.fontSizes.length / 2);
                            selectedFontSize = this.fontSizes[averageFontSizeIndex];
                        }
                        this.selectedFontSize = selectedFontSize;
                        _f.label = 4;
                    case 4:
                        if (!(this.bookThemes.length >= 1)) return [3 /*break*/, 6];
                        selectedTheme = this.bookThemes[0];
                        return [4 /*yield*/, this.store.get(BookSettings.SELECTED_THEME_KEY)];
                    case 5:
                        selectedThemeName = _f.sent();
                        if (selectedThemeName) {
                            for (_b = 0, _c = this.bookThemes; _b < _c.length; _b++) {
                                bookTheme = _c[_b];
                                if (bookTheme.name === selectedThemeName) {
                                    selectedTheme = bookTheme;
                                    break;
                                }
                            }
                        }
                        this.selectedTheme = selectedTheme;
                        _f.label = 6;
                    case 6:
                        if (!(this.bookViews.length >= 1)) return [3 /*break*/, 8];
                        selectedView = this.bookViews[0];
                        return [4 /*yield*/, this.store.get(BookSettings.SELECTED_VIEW_KEY)];
                    case 7:
                        selectedViewName = _f.sent();
                        if (selectedViewName) {
                            for (_d = 0, _e = this.bookViews; _d < _e.length; _d++) {
                                bookView = _e[_d];
                                if (bookView.name === selectedViewName) {
                                    selectedView = bookView;
                                    break;
                                }
                            }
                        }
                        this.selectedView = selectedView;
                        _f.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    BookSettings.prototype.renderControls = function (element) {
        var sections = [];
        if (this.bookFonts.length > 1) {
            var fontOptions = this.bookFonts.map(function (bookFont) {
                return optionTemplate("reading-style", bookFont.name, bookFont.label, "menuitem", _IconLib__WEBPACK_IMPORTED_MODULE_1__["icons"].checkDupe, bookFont.label);
            });
            sections.push(sectionTemplate(fontOptions.join("")));
        }
        if (this.fontSizes.length > 1) {
            var fontSizeOptions = optionTemplate("font-setting", "decrease", "A-", "menuitem", "", "decrease-font") + optionTemplate("font-setting", "increase", "A+", "menuitem", "", "increase-font");
            sections.push(sectionTemplate(fontSizeOptions));
        }
        if (this.bookThemes.length > 1) {
            var themeOptions = this.bookThemes.map(function (bookTheme) {
                return optionTemplate("reading-theme", bookTheme.name, bookTheme.label, "menuitem", _IconLib__WEBPACK_IMPORTED_MODULE_1__["icons"].checkDupe, bookTheme.label);
            });
            sections.push(sectionTemplate(themeOptions.join("")));
        }
        if (this.bookViews.length > 1) {
            var viewOptions = this.bookViews.map(function (bookView) {
                return optionTemplate("reading-style", bookView.name, bookView.label, "menuitem", _IconLib__WEBPACK_IMPORTED_MODULE_1__["icons"].checkDupe, bookView.label);
            });
            sections.push(sectionTemplate(viewOptions.join("")));
        }
        sections.push(offlineTemplate);
        element.innerHTML = template(sections.join(""));
        this.fontButtons = {};
        if (this.bookFonts.length > 1) {
            for (var _i = 0, _a = this.bookFonts; _i < _a.length; _i++) {
                var bookFont = _a[_i];
                this.fontButtons[bookFont.name] = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredElement"](element, "button[class=" + bookFont.name + "]");
            }
            this.updateFontButtons();
        }
        this.fontSizeButtons = {};
        if (this.fontSizes.length > 1) {
            for (var _b = 0, _c = ["decrease", "increase"]; _b < _c.length; _b++) {
                var fontSizeName = _c[_b];
                this.fontSizeButtons[fontSizeName] = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredElement"](element, "button[class=" + fontSizeName + "]");
            }
            this.updateFontSizeButtons();
        }
        this.themeButtons = {};
        if (this.bookThemes.length > 1) {
            for (var _d = 0, _e = this.bookThemes; _d < _e.length; _d++) {
                var bookTheme = _e[_d];
                this.themeButtons[bookTheme.name] = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredElement"](element, "button[class=" + bookTheme.name + "]");
            }
            this.updateThemeButtons();
        }
        this.viewButtons = {};
        if (this.bookViews.length > 1) {
            for (var _f = 0, _g = this.bookViews; _f < _g.length; _f++) {
                var bookView = _g[_f];
                this.viewButtons[bookView.name] = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredElement"](element, "button[class=" + bookView.name + "]");
            }
            this.updateViewButtons();
        }
        this.offlineStatusElement = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredElement"](element, 'div[class="offline-status"]');
        this.setupEvents();
        // Clicking the settings view outside the ul hides it, but clicking inside the ul keeps it up.
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredElement"](element, "ul").addEventListener("click", function (event) {
            event.stopPropagation();
        });
    };
    BookSettings.prototype.onFontChange = function (callback) {
        this.fontChangeCallback = callback;
    };
    BookSettings.prototype.onFontSizeChange = function (callback) {
        this.fontSizeChangeCallback = callback;
    };
    BookSettings.prototype.onThemeChange = function (callback) {
        this.themeChangeCallback = callback;
    };
    BookSettings.prototype.onViewChange = function (callback) {
        this.viewChangeCallback = callback;
    };
    BookSettings.prototype.setupEvents = function () {
        var _this = this;
        var _loop_1 = function (font) {
            var button = this_1.fontButtons[font.name];
            if (button) {
                button.addEventListener("click", function (event) {
                    _this.selectedFont.stop();
                    font.start();
                    _this.selectedFont = font;
                    _this.updateFontButtons();
                    _this.storeSelectedFont(font);
                    _this.fontChangeCallback();
                    event.preventDefault();
                });
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.bookFonts; _i < _a.length; _i++) {
            var font = _a[_i];
            _loop_1(font);
        }
        if (this.fontSizes.length > 1) {
            this.fontSizeButtons["decrease"].addEventListener("click", function (event) {
                var currentFontSizeIndex = _this.fontSizes.indexOf(_this.selectedFontSize);
                if (currentFontSizeIndex > 0) {
                    var newFontSize = _this.fontSizes[currentFontSizeIndex - 1];
                    _this.selectedFontSize = newFontSize;
                    _this.fontSizeChangeCallback();
                    _this.updateFontSizeButtons();
                    _this.storeSelectedFontSize(newFontSize);
                }
                event.preventDefault();
            });
            this.fontSizeButtons["increase"].addEventListener("click", function (event) {
                var currentFontSizeIndex = _this.fontSizes.indexOf(_this.selectedFontSize);
                if (currentFontSizeIndex < _this.fontSizes.length - 1) {
                    var newFontSize = _this.fontSizes[currentFontSizeIndex + 1];
                    _this.selectedFontSize = newFontSize;
                    _this.fontSizeChangeCallback();
                    _this.updateFontSizeButtons();
                    _this.storeSelectedFontSize(newFontSize);
                }
                event.preventDefault();
            });
        }
        var _loop_2 = function (theme) {
            var button = this_2.themeButtons[theme.name];
            if (button) {
                button.addEventListener("click", function (event) {
                    _this.selectedTheme.stop();
                    theme.start();
                    _this.selectedTheme = theme;
                    _this.updateThemeButtons();
                    _this.storeSelectedTheme(theme);
                    _this.themeChangeCallback();
                    event.preventDefault();
                });
            }
        };
        var this_2 = this;
        for (var _b = 0, _c = this.bookThemes; _b < _c.length; _b++) {
            var theme = _c[_b];
            _loop_2(theme);
        }
        var _loop_3 = function (view) {
            var button = this_3.viewButtons[view.name];
            if (button) {
                button.addEventListener("click", function (event) {
                    var position = _this.selectedView.getCurrentPosition();
                    _this.selectedView.stop();
                    view.start(position);
                    _this.selectedView = view;
                    _this.updateViewButtons();
                    _this.storeSelectedView(view);
                    _this.viewChangeCallback();
                    event.preventDefault();
                });
            }
        };
        var this_3 = this;
        for (var _d = 0, _e = this.bookViews; _d < _e.length; _d++) {
            var view = _e[_d];
            _loop_3(view);
        }
    };
    BookSettings.prototype.updateFontButtons = function () {
        for (var _i = 0, _a = this.bookFonts; _i < _a.length; _i++) {
            var font = _a[_i];
            if (font === this.selectedFont) {
                this.fontButtons[font.name].className = font.name + " active";
                this.fontButtons[font.name].setAttribute("aria-label", font.label + " font enabled");
            }
            else {
                this.fontButtons[font.name].className = font.name;
                this.fontButtons[font.name].setAttribute("aria-label", font.label + " font disabled");
            }
        }
    };
    BookSettings.prototype.updateFontSizeButtons = function () {
        var currentFontSizeIndex = this.fontSizes.indexOf(this.selectedFontSize);
        if (currentFontSizeIndex === 0) {
            this.fontSizeButtons["decrease"].className = "decrease disabled";
        }
        else {
            this.fontSizeButtons["decrease"].className = "decrease";
        }
        if (currentFontSizeIndex === this.fontSizes.length - 1) {
            this.fontSizeButtons["increase"].className = "increase disabled";
        }
        else {
            this.fontSizeButtons["increase"].className = "increase";
        }
    };
    BookSettings.prototype.updateThemeButtons = function () {
        for (var _i = 0, _a = this.bookThemes; _i < _a.length; _i++) {
            var theme = _a[_i];
            if (theme === this.selectedTheme) {
                this.themeButtons[theme.name].className = theme.name + " active";
                this.themeButtons[theme.name].setAttribute("aria-label", theme.label + " mode enabled");
            }
            else {
                this.themeButtons[theme.name].className = theme.name;
                this.themeButtons[theme.name].setAttribute("aria-label", theme.label + " mode disabled");
            }
        }
    };
    BookSettings.prototype.updateViewButtons = function () {
        for (var _i = 0, _a = this.bookViews; _i < _a.length; _i++) {
            var view = _a[_i];
            if (view === this.selectedView) {
                this.viewButtons[view.name].className = view.name + " active";
                this.viewButtons[view.name].setAttribute("aria-label", view.label + " mode enabled");
            }
            else {
                this.viewButtons[view.name].className = view.name;
                this.viewButtons[view.name].setAttribute("aria-label", view.label + " mode disabled");
            }
        }
    };
    BookSettings.prototype.getSelectedFont = function () {
        return this.selectedFont;
    };
    BookSettings.prototype.getSelectedFontSize = function () {
        return this.selectedFontSize;
    };
    BookSettings.prototype.getSelectedTheme = function () {
        return this.selectedTheme;
    };
    BookSettings.prototype.getSelectedView = function () {
        return this.selectedView;
    };
    BookSettings.prototype.getOfflineStatusElement = function () {
        return this.offlineStatusElement;
    };
    BookSettings.prototype.storeSelectedFont = function (font) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.store.set(BookSettings.SELECTED_FONT_KEY, font.name)];
            });
        });
    };
    BookSettings.prototype.storeSelectedFontSize = function (fontSize) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.store.set(BookSettings.SELECTED_FONT_SIZE_KEY, fontSize)];
            });
        });
    };
    BookSettings.prototype.storeSelectedTheme = function (theme) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.store.set(BookSettings.SELECTED_THEME_KEY, theme.name)];
            });
        });
    };
    BookSettings.prototype.storeSelectedView = function (view) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.store.set(BookSettings.SELECTED_VIEW_KEY, view.name)];
            });
        });
    };
    BookSettings.SELECTED_FONT_KEY = "settings-selected-font";
    BookSettings.SELECTED_FONT_SIZE_KEY = "settings-selected-font-size";
    BookSettings.SELECTED_THEME_KEY = "settings-selected-theme";
    BookSettings.SELECTED_VIEW_KEY = "settings-selected-view";
    return BookSettings;
}());
/* harmony default export */ __webpack_exports__["default"] = (BookSettings);
;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WIDTH_ATTR", function() { return WIDTH_ATTR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEIGHT_ATTR", function() { return HEIGHT_ATTR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VIEWBOX_ATTR", function() { return VIEWBOX_ATTR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "icons", function() { return icons; });
var WIDTH_ATTR = 24;
var HEIGHT_ATTR = 24;
var VIEWBOX_ATTR = "0 0 24 24";
var iconTemplate = function (id, title, path, classAttr) {
    if (classAttr === void 0) { classAttr = "icon"; }
    return "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"" + WIDTH_ATTR + "\" height=\"" + HEIGHT_ATTR + "\" viewBox=\"" + VIEWBOX_ATTR + "\" preserveAspectRatio=\"xMidYMid meet\" role=\"img\" class=\"" + classAttr + "\" aria-labelledBy=\"" + id + "\">\n  <title id=\"" + id + "\">" + title + "</title>\n  " + path + "\n</svg>";
};
var iconSymbol = function (id, title, path, classAttr) {
    if (classAttr === void 0) { classAttr = "svgIcon use"; }
    return "<svg xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"xMidYMid meet\" role=\"img\" class=\"" + classAttr + "\">\n  <defs>\n    <symbol id=\"" + id + "\" viewBox=\"" + VIEWBOX_ATTR + "\">\n      <title>" + title + "</title>\n      " + path + "\n    </symbol>\n  </defs>\n</svg>";
};
var iconUse = function (id, classAttr) { return "<svg xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"xMidYMid meet\" class=\"" + classAttr + "\" role=\"img\" aria-labelledby=\"" + id + "\">\n  <use xlink:href=\"#" + id + "\"></use>\n</svg>"; };
var icons = {
    "checkOriginal": iconSymbol("check-icon", "Checked", "<path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z\"/>"),
    "checkDupe": iconUse("check-icon", "checkedIcon"),
    "closeOriginal": iconSymbol("close-icon", "Close", "<path d=\"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z\"/>"),
    "closeDupe": iconUse("close-icon", "icon close inactive-icon"),
    "error": iconTemplate("error-icon", "Warning", "<path d=\"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z\"/>"),
    "home": "<path d=\"M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z\"/>",
    "expand": iconTemplate("expand-icon", "Enter fullscreen", "<path d=\"M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z\"/>", "icon active-icon"),
    "loading": iconTemplate("loading-icon", "Loading", "<path d=\"M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z\"/>"),
    "menu": iconTemplate("menu-icon", "Show and hide navigation bar", "<path d=\"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z\"/>", "icon menu open inactive-icon"),
    "minimize": iconTemplate("minimize-icon", "Exit fullscreen", "<path d=\"M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z\"/>", "icon inactive-icon"),
    "next": iconTemplate("next-icon", "Next Chapter", "<path d=\"M6.49 20.13l1.77 1.77 9.9-9.9-9.9-9.9-1.77 1.77L14.62 12l-8.13 8.13z\"/>"),
    "previous": iconTemplate("previous-icon", "Previous Chapter", "<path d=\"M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z\"/>"),
    "settings": iconTemplate("settings-icon", "Settings", "<path d=\"M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z\"/>", "icon open"),
    "toc": iconTemplate("toc-icon", "Table of Contents", "<path d=\"M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z\"/>", "icon open")
};


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Cacher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _Manifest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _EventHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);
/* harmony import */ var _BrowserUtilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/* harmony import */ var _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _IconLib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(18);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var epubReadingSystemObject = {
    name: "Webpub viewer",
    version: "0.1.0"
};
var epubReadingSystem = Object.freeze(epubReadingSystemObject);
var upLinkTemplate = function (href, label, ariaLabel) { return "\n  <a rel=\"up\" href='" + href + "' aria-label=\"" + ariaLabel + "\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"" + _IconLib__WEBPACK_IMPORTED_MODULE_5__["WIDTH_ATTR"] + "\" height=\"" + _IconLib__WEBPACK_IMPORTED_MODULE_5__["HEIGHT_ATTR"] + "\" viewBox=\"" + _IconLib__WEBPACK_IMPORTED_MODULE_5__["VIEWBOX_ATTR"] + "\" aria-labelledby=\"up-label\" preserveAspectRatio=\"xMidYMid meet\" role=\"img\" class=\"icon\">\n      <title id=\"up-label\">" + label + "</title>\n      " + _IconLib__WEBPACK_IMPORTED_MODULE_5__["icons"].home + "\n    </svg>\n    <span class=\"setting-text up\">" + label + "</span>\n  </a>\n"; };
var template = "\n  <nav class=\"publication\">\n    <div class=\"controls-trigger\">\n      <button class=\"trigger\" aria-haspopup=\"true\" aria-expanded=\"true\">\n        " + _IconLib__WEBPACK_IMPORTED_MODULE_5__["icons"].menu + "\n      </button>\n    </div>\n    <div class=\"controls\">\n        " + _IconLib__WEBPACK_IMPORTED_MODULE_5__["icons"].closeOriginal + "\n        " + _IconLib__WEBPACK_IMPORTED_MODULE_5__["icons"].checkOriginal + "\n      <a href=\"#settings-control\" class=\"scrolling-suggestion\" style=\"display: none\">\n          We recommend scrolling mode for use with screen readers and keyboard navigation.\n          Go to settings to switch to scrolling mode.\n      </a>\n      <ul class=\"links top active\">\n        <li>\n          <button class=\"contents disabled\" aria-labelledby=\"contents-label\" aria-haspopup=\"true\" aria-expanded=\"false\">\n            " + _IconLib__WEBPACK_IMPORTED_MODULE_5__["icons"].toc + "\n            " + _IconLib__WEBPACK_IMPORTED_MODULE_5__["icons"].closeDupe + "\n            <span class=\"setting-text contents\" id=\"contents-label\">Contents</span>\n          </button>\n          <div class=\"contents-view controls-view inactive\" aria-hidden=\"true\"></div>\n        </li>\n        <li>\n          <button id=\"settings-control\" class=\"settings\" aria-labelledby=\"settings-label\" aria-expanded=\"false\" aria-haspopup=\"true\">\n            " + _IconLib__WEBPACK_IMPORTED_MODULE_5__["icons"].settings + "\n            " + _IconLib__WEBPACK_IMPORTED_MODULE_5__["icons"].closeDupe + "\n            <span class=\"setting-text settings\" id=\"settings-label\">Settings</span>\n          </button>\n          <div class=\"settings-view controls-view inactive\" aria-hidden=\"true\"></div>\n        </li>\n      </ul>\n    </div>\n    <!-- /controls -->\n  </nav>\n  <main style=\"overflow: hidden\" tabindex=-1>\n    <div class=\"loading\" style=\"display:none;\">\n      " + _IconLib__WEBPACK_IMPORTED_MODULE_5__["icons"].loading + "\n    </div>\n    <div class=\"error\" style=\"display:none;\">\n      <span>\n        " + _IconLib__WEBPACK_IMPORTED_MODULE_5__["icons"].error + "\n      </span>\n      <span>There was an error loading this page.</span>\n      <button class=\"go-back\">Go back</button>\n      <button class=\"try-again\">Try again</button>\n    </div>\n    <div class=\"info top\">\n      <span class=\"book-title\"></span>\n    </div>\n    <iframe allowtransparency=\"true\" title=\"book text\" style=\"border:0; overflow: hidden;\"></iframe>\n    <div class=\"info bottom\">\n      <span class=\"chapter-position\"></span>\n      <span class=\"chapter-title\"></span>\n    </div>\n  </main>\n  <nav class=\"publication\">\n    <div class=\"controls\">\n      <ul class=\"links bottom active\">\n        <li>\n          <a rel=\"prev\" class=\"disabled\" role=\"button\" aria-labelledby=\"previous-label\">\n          " + _IconLib__WEBPACK_IMPORTED_MODULE_5__["icons"].previous + "\n          <span class=\"chapter-control\" id=\"previous-label\">Previous Chapter</span>\n          </a>\n        </li>\n        <li aria-label=\"chapters\">Chapters</li>\n        <li>\n          <a rel=\"next\" class=\"disabled\" role=\"button\" aria-labelledby=\"next-label\">\n            <span class=\"chapter-control\" id =\"next-label\">Next Chapter</span>\n            " + _IconLib__WEBPACK_IMPORTED_MODULE_5__["icons"].next + "\n          </a>\n        </li>\n      </ul>\n    </div>\n    <!-- /controls -->\n  </nav>\n";
/** Class that shows webpub resources in an iframe, with navigation controls outside the iframe. */
var IFrameNavigator = /** @class */ (function () {
    function IFrameNavigator(store, cacher, settings, annotator, publisher, serif, sans, day, sepia, night, paginator, scroller, eventHandler, upLinkConfig, allowFullscreen) {
        if (cacher === void 0) { cacher = null; }
        if (annotator === void 0) { annotator = null; }
        if (publisher === void 0) { publisher = null; }
        if (serif === void 0) { serif = null; }
        if (sans === void 0) { sans = null; }
        if (day === void 0) { day = null; }
        if (sepia === void 0) { sepia = null; }
        if (night === void 0) { night = null; }
        if (paginator === void 0) { paginator = null; }
        if (scroller === void 0) { scroller = null; }
        if (eventHandler === void 0) { eventHandler = null; }
        if (upLinkConfig === void 0) { upLinkConfig = null; }
        if (allowFullscreen === void 0) { allowFullscreen = null; }
        this.upLink = null;
        this.fullscreen = null;
        this.canFullscreen = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled;
        this.store = store;
        this.cacher = cacher;
        this.settings = settings;
        this.annotator = annotator;
        this.publisher = publisher;
        this.serif = serif;
        this.sans = sans;
        this.day = day;
        this.sepia = sepia;
        this.night = night;
        this.paginator = paginator;
        this.scroller = scroller;
        this.eventHandler = eventHandler || new _EventHandler__WEBPACK_IMPORTED_MODULE_2__["default"]();
        this.upLinkConfig = upLinkConfig;
        this.allowFullscreen = allowFullscreen;
    }
    IFrameNavigator.create = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var navigator;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        navigator = new this(config.store, config.cacher || null, config.settings, config.annotator || null, config.publisher || null, config.serif || null, config.sans || null, config.day || null, config.sepia || null, config.night || null, config.paginator || null, config.scroller || null, config.eventHandler || null, config.upLink || null, config.allowFullscreen || null);
                        return [4 /*yield*/, navigator.start(config.element, config.manifestUrl)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, navigator];
                }
            });
        });
    };
    IFrameNavigator.prototype.start = function (element, manifestUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var settingsButtons, lastSettingsButton, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        element.innerHTML = template;
                        this.manifestUrl = manifestUrl;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.iframe = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](element, "iframe");
                        this.scrollingSuggestion = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](element, ".scrolling-suggestion");
                        this.nextChapterLink = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](element, "a[rel=next]");
                        this.previousChapterLink = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](element, "a[rel=prev]");
                        this.contentsControl = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](element, "button.contents");
                        this.settingsControl = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](element, "button.settings");
                        this.links = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](element, "ul.links.top");
                        this.linksBottom = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](element, "ul.links.bottom");
                        this.tocView = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](element, ".contents-view");
                        this.settingsView = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](element, ".settings-view");
                        this.loadingMessage = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](element, "div[class=loading]");
                        this.errorMessage = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](element, "div[class=error]");
                        this.tryAgainButton = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](element, "button[class=try-again]");
                        this.goBackButton = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](element, "button[class=go-back]");
                        this.infoTop = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](element, "div[class='info top']");
                        this.infoBottom = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](element, "div[class='info bottom']");
                        this.bookTitle = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](this.infoTop, "span[class=book-title]");
                        this.chapterTitle = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](this.infoBottom, "span[class=chapter-title]");
                        this.chapterPosition = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](this.infoBottom, "span[class=chapter-position]");
                        this.menuControl = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](element, "button.trigger");
                        this.newPosition = null;
                        this.newElementId = null;
                        this.isBeingStyled = true;
                        this.isLoading = true;
                        this.setupEvents();
                        if (this.publisher) {
                            this.publisher.bookElement = this.iframe;
                        }
                        if (this.serif) {
                            this.serif.bookElement = this.iframe;
                        }
                        if (this.sans) {
                            this.sans.bookElement = this.iframe;
                        }
                        if (this.day) {
                            this.day.bookElement = this.iframe;
                        }
                        if (this.sepia) {
                            this.sepia.bookElement = this.iframe;
                        }
                        if (this.night) {
                            this.night.bookElement = this.iframe;
                        }
                        if (this.paginator) {
                            this.paginator.bookElement = this.iframe;
                        }
                        if (this.scroller) {
                            this.scroller.bookElement = this.iframe;
                        }
                        this.settings.renderControls(this.settingsView);
                        this.settings.onFontChange(this.updateFont.bind(this));
                        this.settings.onFontSizeChange(this.updateFontSize.bind(this));
                        this.settings.onViewChange(this.updateBookView.bind(this));
                        settingsButtons = this.settingsView.querySelectorAll("button");
                        if (settingsButtons && settingsButtons.length > 0) {
                            lastSettingsButton = settingsButtons[settingsButtons.length - 1];
                            this.setupModalFocusTrap(this.settingsView, this.settingsControl, lastSettingsButton);
                        }
                        if (this.cacher) {
                            this.cacher.onStatusUpdate(this.updateOfflineCacheStatus.bind(this));
                            this.enableOffline();
                        }
                        if (this.scroller && (this.settings.getSelectedView() !== this.scroller)) {
                            this.scrollingSuggestion.style.display = "block";
                        }
                        return [4 /*yield*/, this.loadManifest()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        err_1 = _a.sent();
                        // There's a mismatch between the template and the selectors above,
                        // or we weren't able to insert the template in the element.
                        return [2 /*return*/, new Promise(function (_, reject) { return reject(err_1); }).catch(function () { })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    IFrameNavigator.prototype.setupEvents = function () {
        var _this = this;
        this.iframe.addEventListener("load", this.handleIFrameLoad.bind(this));
        var delay = 200;
        var timeout;
        window.addEventListener("resize", function () {
            clearTimeout(timeout);
            timeout = setTimeout(_this.handleResize.bind(_this), delay);
        });
        this.previousChapterLink.addEventListener("click", this.handlePreviousChapterClick.bind(this));
        this.nextChapterLink.addEventListener("click", this.handleNextChapterClick.bind(this));
        this.contentsControl.addEventListener("click", this.handleContentsClick.bind(this));
        this.settingsControl.addEventListener("click", this.handleSettingsClick.bind(this));
        this.settingsView.addEventListener("click", this.handleToggleLinksClick.bind(this));
        this.tryAgainButton.addEventListener("click", this.tryAgain.bind(this));
        this.goBackButton.addEventListener("click", this.goBack.bind(this));
        this.menuControl.addEventListener("click", this.handleToggleLinksClick.bind(this));
        this.contentsControl.addEventListener("keydown", this.hideTOCOnEscape.bind(this));
        this.tocView.addEventListener("keydown", this.hideTOCOnEscape.bind(this));
        this.settingsControl.addEventListener("keydown", this.hideSettingsOnEscape.bind(this));
        this.settingsView.addEventListener("keydown", this.hideSettingsOnEscape.bind(this));
        window.addEventListener("keydown", this.handleKeyboardNavigation.bind(this));
        if (this.allowFullscreen && this.canFullscreen) {
            document.addEventListener("fullscreenchange", this.toggleFullscreenIcon.bind(this));
            document.addEventListener("webkitfullscreenchange", this.toggleFullscreenIcon.bind(this));
            document.addEventListener("mozfullscreenchange", this.toggleFullscreenIcon.bind(this));
            document.addEventListener("MSFullscreenChange", this.toggleFullscreenIcon.bind(this));
        }
    };
    IFrameNavigator.prototype.setupModalFocusTrap = function (modal, closeButton, lastFocusableElement) {
        var _this = this;
        // Trap keyboard focus in a modal dialog when it's displayed.
        var TAB_KEY = 9;
        // Going backwards from the close button sends you to the last focusable element.
        closeButton.addEventListener("keydown", function (event) {
            if (_this.isDisplayed(modal)) {
                var tab = (event.keyCode === TAB_KEY);
                var shift = !!event.shiftKey;
                if (tab && shift) {
                    lastFocusableElement.focus();
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        });
        // Going forward from the last focusable element sends you to the close button.
        lastFocusableElement.addEventListener("keydown", function (event) {
            if (_this.isDisplayed(modal)) {
                var tab = (event.keyCode === TAB_KEY);
                var shift = !!event.shiftKey;
                if (tab && !shift) {
                    closeButton.focus();
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        });
    };
    IFrameNavigator.prototype.handleKeyboardNavigation = function (event) {
        var LEFT_ARROW = 37;
        var RIGHT_ARROW = 39;
        if (this.settings.getSelectedView() === this.paginator) {
            if (event.keyCode === LEFT_ARROW) {
                this.handlePreviousPageClick(event);
            }
            else if (event.keyCode === RIGHT_ARROW) {
                this.handleNextPageClick(event);
            }
        }
    };
    ;
    IFrameNavigator.prototype.updateFont = function () {
        this.handleResize();
    };
    IFrameNavigator.prototype.updateFontSize = function () {
        this.handleResize();
    };
    IFrameNavigator.prototype.updateBookView = function () {
        var _this = this;
        var doNothing = function () { };
        if (this.settings.getSelectedView() === this.paginator) {
            this.scrollingSuggestion.style.display = "block";
            document.body.onscroll = function () { };
            this.chapterTitle.style.display = "inline";
            this.chapterPosition.style.display = "inline";
            if (this.eventHandler) {
                this.eventHandler.onBackwardSwipe = this.handlePreviousPageClick.bind(this);
                this.eventHandler.onForwardSwipe = this.handleNextPageClick.bind(this);
                this.eventHandler.onLeftTap = this.handlePreviousPageClick.bind(this);
                this.eventHandler.onMiddleTap = this.handleToggleLinksClick.bind(this);
                this.eventHandler.onRightTap = this.handleNextPageClick.bind(this);
                this.eventHandler.onLeftHover = this.handleLeftHover.bind(this);
                this.eventHandler.onRightHover = this.handleRightHover.bind(this);
                this.eventHandler.onRemoveHover = this.handleRemoveHover.bind(this);
                this.eventHandler.onInternalLink = this.handleInternalLink.bind(this);
                this.eventHandler.onLeftArrow = this.handleKeyboardNavigation.bind(this);
                this.eventHandler.onRightArrow = this.handleKeyboardNavigation.bind(this);
            }
            if (this.isDisplayed(this.linksBottom)) {
                this.toggleDisplay(this.linksBottom);
            }
        }
        else if (this.settings.getSelectedView() === this.scroller) {
            this.scrollingSuggestion.style.display = "none";
            document.body.onscroll = function () {
                _this.saveCurrentReadingPosition();
                if (_this.scroller && _this.scroller.atBottom()) {
                    // Bring up the bottom nav when you get to the bottom,
                    // if it wasn't already displayed.
                    if (!_this.isDisplayed(_this.linksBottom)) {
                        _this.toggleDisplay(_this.linksBottom);
                    }
                }
                else {
                    // Remove the bottom nav when you scroll back up,
                    // if it was displayed because you were at the bottom.
                    if (_this.isDisplayed(_this.linksBottom) && !_this.isDisplayed(_this.links)) {
                        _this.toggleDisplay(_this.linksBottom);
                    }
                }
            };
            this.chapterTitle.style.display = "none";
            this.chapterPosition.style.display = "none";
            if (this.eventHandler) {
                this.eventHandler.onBackwardSwipe = doNothing;
                this.eventHandler.onForwardSwipe = doNothing;
                this.eventHandler.onLeftTap = this.handleToggleLinksClick.bind(this);
                this.eventHandler.onMiddleTap = this.handleToggleLinksClick.bind(this);
                this.eventHandler.onRightTap = this.handleToggleLinksClick.bind(this);
                this.eventHandler.onLeftHover = doNothing;
                this.eventHandler.onRightHover = doNothing;
                this.eventHandler.onRemoveHover = doNothing;
                this.eventHandler.onInternalLink = doNothing;
                this.eventHandler.onLeftArrow = doNothing;
                this.eventHandler.onRightArrow = doNothing;
                this.handleRemoveHover();
            }
            if (this.isDisplayed(this.links) && !this.isDisplayed(this.linksBottom)) {
                this.toggleDisplay(this.linksBottom);
            }
        }
        this.updatePositionInfo();
    };
    IFrameNavigator.prototype.enableOffline = function () {
        if (this.cacher && this.cacher.getStatus() !== _Cacher__WEBPACK_IMPORTED_MODULE_0__["CacheStatus"].Downloaded) {
            this.cacher.enable();
        }
    };
    IFrameNavigator.prototype.updateOfflineCacheStatus = function (status) {
        var statusElement = this.settings.getOfflineStatusElement();
        var statusMessage = "";
        if (status === _Cacher__WEBPACK_IMPORTED_MODULE_0__["CacheStatus"].Uncached) {
            statusMessage = "";
        }
        else if (status === _Cacher__WEBPACK_IMPORTED_MODULE_0__["CacheStatus"].UpdateAvailable) {
            statusMessage = "A new version is available. Refresh to update.";
        }
        else if (status === _Cacher__WEBPACK_IMPORTED_MODULE_0__["CacheStatus"].CheckingForUpdate) {
            statusMessage = "Checking for update.";
        }
        else if (status === _Cacher__WEBPACK_IMPORTED_MODULE_0__["CacheStatus"].Downloading) {
            statusMessage = "Downloading...";
        }
        else if (status === _Cacher__WEBPACK_IMPORTED_MODULE_0__["CacheStatus"].Downloaded) {
            statusMessage = "Downloaded for offline use";
        }
        else if (status === _Cacher__WEBPACK_IMPORTED_MODULE_0__["CacheStatus"].Error) {
            statusMessage = "Error downloading for offline use";
        }
        statusElement.innerHTML = statusMessage;
    };
    IFrameNavigator.prototype.loadManifest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var manifest, toc, createTOC_1, upUrl, upLabel, upAriaLabel, upHTML, upParent, fullscreenHTML, fullscreenParent, lastReadingPosition, startLink, startUrl, position, err_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, _Manifest__WEBPACK_IMPORTED_MODULE_1__["default"].getManifest(this.manifestUrl, this.store)];
                    case 1:
                        manifest = _a.sent();
                        toc = manifest.toc;
                        if (toc.length) {
                            this.contentsControl.className = "contents";
                            createTOC_1 = function (parentElement, links) {
                                var listElement = document.createElement("ol");
                                var lastLink = null;
                                for (var _i = 0, links_1 = links; _i < links_1.length; _i++) {
                                    var link = links_1[_i];
                                    var listItemElement = document.createElement("li");
                                    var linkElement = document.createElement("a");
                                    var spanElement = document.createElement("span");
                                    linkElement.tabIndex = -1;
                                    var href = "";
                                    if (link.href) {
                                        href = new URL(link.href, _this.manifestUrl.href).href;
                                        linkElement.href = href;
                                        linkElement.innerHTML = link.title || "";
                                        listItemElement.appendChild(linkElement);
                                    }
                                    else {
                                        spanElement.innerHTML = link.title || "";
                                        listItemElement.appendChild(spanElement);
                                    }
                                    if (link.children && link.children.length > 0) {
                                        createTOC_1(listItemElement, link.children);
                                    }
                                    listElement.appendChild(listItemElement);
                                    lastLink = linkElement;
                                }
                                // Trap keyboard focus inside the TOC while it's open.
                                if (lastLink) {
                                    _this.setupModalFocusTrap(_this.tocView, _this.contentsControl, lastLink);
                                }
                                listElement.addEventListener("click", function (event) {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    if (event.target && event.target.tagName.toLowerCase() === "a") {
                                        var linkElement = event.target;
                                        if (linkElement.className.indexOf("active") !== -1) {
                                            // This TOC item is already loaded. Hide the TOC
                                            // but don't navigate.
                                            _this.hideTOC();
                                        }
                                        else {
                                            // Set focus back to the contents toggle button so screen readers
                                            // don't get stuck on a hidden link.
                                            _this.contentsControl.focus();
                                            _this.navigate({
                                                resource: linkElement.href,
                                                position: 0
                                            });
                                        }
                                    }
                                });
                                parentElement.appendChild(listElement);
                            };
                            createTOC_1(this.tocView, toc);
                        }
                        else {
                            this.contentsControl.parentElement.style.display = "none";
                        }
                        if (this.upLinkConfig && this.upLinkConfig.url) {
                            upUrl = this.upLinkConfig.url;
                            upLabel = this.upLinkConfig.label || "";
                            upAriaLabel = this.upLinkConfig.ariaLabel || upLabel;
                            upHTML = upLinkTemplate(upUrl.href, upLabel, upAriaLabel);
                            upParent = document.createElement("li");
                            upParent.classList.add("uplink-wrapper");
                            upParent.innerHTML = upHTML;
                            this.links.insertBefore(upParent, this.links.firstChild);
                            this.upLink = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](this.links, "a[rel=up]");
                        }
                        if (this.allowFullscreen && this.canFullscreen) {
                            fullscreenHTML = "<button id=\"fullscreen-control\" class=\"fullscreen\" aria-hidden=\"false\">" + _IconLib__WEBPACK_IMPORTED_MODULE_5__["icons"].expand + " " + _IconLib__WEBPACK_IMPORTED_MODULE_5__["icons"].minimize + "</button>";
                            fullscreenParent = document.createElement("li");
                            fullscreenParent.innerHTML = fullscreenHTML;
                            this.links.appendChild(fullscreenParent);
                            this.fullscreen = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](this.links, "#fullscreen-control");
                            this.fullscreen.addEventListener("click", this.toggleFullscreen.bind(this));
                        }
                        lastReadingPosition = null;
                        if (!this.annotator) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.annotator.getLastReadingPosition()];
                    case 2:
                        lastReadingPosition = (_a.sent());
                        _a.label = 3;
                    case 3:
                        startLink = manifest.getStartLink();
                        startUrl = null;
                        if (startLink && startLink.href) {
                            startUrl = new URL(startLink.href, this.manifestUrl.href).href;
                        }
                        if (lastReadingPosition) {
                            this.navigate(lastReadingPosition);
                        }
                        else if (startUrl) {
                            position = {
                                resource: startUrl,
                                position: 0
                            };
                            this.navigate(position);
                        }
                        return [2 /*return*/, new Promise(function (resolve) { return resolve(); })];
                    case 4:
                        err_2 = _a.sent();
                        this.abortOnError();
                        return [2 /*return*/, new Promise(function (_, reject) { return reject(err_2); }).catch(function () { })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    IFrameNavigator.prototype.handleIFrameLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bookViewPosition, currentLocation, elementId, manifest, previous, next, chapterTitle, spineItem, tocItem, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.errorMessage.style.display = "none";
                        this.showLoadingMessageAfterDelay();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        this.hideTOC();
                        bookViewPosition = 0;
                        if (this.newPosition) {
                            bookViewPosition = this.newPosition.position;
                            this.newPosition = null;
                        }
                        this.updateFont();
                        this.updateFontSize();
                        this.updateBookView();
                        this.settings.getSelectedFont().start();
                        this.settings.getSelectedTheme().start();
                        this.settings.getSelectedView().start(bookViewPosition);
                        if (this.newElementId) {
                            this.settings.getSelectedView().goToElement(this.newElementId);
                            this.newElementId = null;
                        }
                        currentLocation = this.iframe.src;
                        if (this.iframe.contentDocument && this.iframe.contentDocument.location && this.iframe.contentDocument.location.href) {
                            currentLocation = this.iframe.contentDocument.location.href;
                        }
                        if (currentLocation.indexOf("#") !== -1) {
                            elementId = currentLocation.slice(currentLocation.indexOf("#") + 1);
                            // Set the element to go to the next time the iframe loads.
                            this.newElementId = elementId;
                            // Reload the iframe without the anchor.
                            this.iframe.src = currentLocation.slice(0, currentLocation.indexOf("#"));
                            return [2 /*return*/, new Promise(function (resolve) { return resolve(); })];
                        }
                        this.updatePositionInfo();
                        return [4 /*yield*/, _Manifest__WEBPACK_IMPORTED_MODULE_1__["default"].getManifest(this.manifestUrl, this.store)];
                    case 2:
                        manifest = _a.sent();
                        previous = manifest.getPreviousSpineItem(currentLocation);
                        if (previous && previous.href) {
                            this.previousChapterLink.href = new URL(previous.href, this.manifestUrl.href).href;
                            this.previousChapterLink.className = "";
                        }
                        else {
                            this.previousChapterLink.removeAttribute("href");
                            this.previousChapterLink.className = "disabled";
                            this.handleRemoveHover();
                        }
                        next = manifest.getNextSpineItem(currentLocation);
                        if (next && next.href) {
                            this.nextChapterLink.href = new URL(next.href, this.manifestUrl.href).href;
                            this.nextChapterLink.className = "";
                        }
                        else {
                            this.nextChapterLink.removeAttribute("href");
                            this.nextChapterLink.className = "disabled";
                            this.handleRemoveHover();
                        }
                        this.setActiveTOCItem(currentLocation);
                        if (manifest.metadata.title) {
                            this.bookTitle.innerHTML = manifest.metadata.title;
                        }
                        chapterTitle = void 0;
                        spineItem = manifest.getSpineItem(currentLocation);
                        if (spineItem !== null) {
                            chapterTitle = spineItem.title;
                        }
                        if (!chapterTitle) {
                            tocItem = manifest.getTOCItem(currentLocation);
                            if (tocItem !== null && tocItem.title) {
                                chapterTitle = tocItem.title;
                            }
                        }
                        if (chapterTitle) {
                            this.chapterTitle.innerHTML = "(" + chapterTitle + ")";
                        }
                        else {
                            this.chapterTitle.innerHTML = "(Current Chapter)";
                        }
                        if (this.eventHandler) {
                            this.eventHandler.setupEvents(this.iframe.contentDocument);
                        }
                        if (!this.annotator) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.saveCurrentReadingPosition()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        this.hideLoadingMessage();
                        this.showIframeContents();
                        Object.defineProperty(this.iframe.contentWindow.navigator, "epubReadingSystem", { value: epubReadingSystem, writable: false });
                        return [2 /*return*/, new Promise(function (resolve) { return resolve(); })];
                    case 5:
                        err_3 = _a.sent();
                        this.abortOnError();
                        return [2 /*return*/, new Promise(function (_, reject) { return reject(err_3); }).catch(function () { })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    IFrameNavigator.prototype.abortOnError = function () {
        this.errorMessage.style.display = "block";
        if (this.isLoading) {
            this.hideLoadingMessage();
        }
    };
    IFrameNavigator.prototype.tryAgain = function () {
        this.iframe.src = this.iframe.src;
        this.enableOffline();
    };
    IFrameNavigator.prototype.goBack = function () {
        window.history.back();
    };
    IFrameNavigator.prototype.isDisplayed = function (element) {
        return element.className.indexOf(" active") !== -1;
    };
    IFrameNavigator.prototype.showElement = function (element, control) {
        element.className = element.className.replace(" inactive", "");
        if (element.className.indexOf(" active") === -1) {
            element.className += " active";
        }
        element.setAttribute("aria-hidden", "false");
        if (control) {
            control.setAttribute("aria-expanded", "true");
            var openIcon = control.querySelector(".icon.open");
            if (openIcon && (openIcon.getAttribute("class") || "").indexOf(" inactive-icon") === -1) {
                var newIconClass = (openIcon.getAttribute("class") || "") + " inactive-icon";
                openIcon.setAttribute("class", newIconClass);
            }
            var closeIcon = control.querySelector(".icon.close");
            if (closeIcon) {
                var newIconClass = (closeIcon.getAttribute("class") || "").replace(" inactive-icon", "");
                closeIcon.setAttribute("class", newIconClass);
            }
        }
        // Add buttons and links in the element to the tab order.
        var buttons = Array.prototype.slice.call(element.querySelectorAll("button"));
        var links = Array.prototype.slice.call(element.querySelectorAll("a"));
        for (var _i = 0, buttons_1 = buttons; _i < buttons_1.length; _i++) {
            var button = buttons_1[_i];
            button.tabIndex = 0;
        }
        for (var _a = 0, links_2 = links; _a < links_2.length; _a++) {
            var link = links_2[_a];
            link.tabIndex = 0;
        }
    };
    IFrameNavigator.prototype.hideElement = function (element, control) {
        element.className = element.className.replace(" active", "");
        if (element.className.indexOf(" inactive") === -1) {
            element.className += " inactive";
        }
        element.setAttribute("aria-hidden", "true");
        if (control) {
            control.setAttribute("aria-expanded", "false");
            var openIcon = control.querySelector(".icon.open");
            if (openIcon) {
                var newIconClass = (openIcon.getAttribute("class") || "").replace(" inactive-icon", "");
                openIcon.setAttribute("class", newIconClass);
            }
            var closeIcon = control.querySelector(".icon.close");
            if (closeIcon && (closeIcon.getAttribute("class") || "").indexOf(" inactive-icon") === -1) {
                var newIconClass = (closeIcon.getAttribute("class") || "") + " inactive-icon";
                closeIcon.setAttribute("class", newIconClass);
            }
        }
        // Remove buttons and links in the element from the tab order.
        var buttons = Array.prototype.slice.call(element.querySelectorAll("button"));
        var links = Array.prototype.slice.call(element.querySelectorAll("a"));
        for (var _i = 0, buttons_2 = buttons; _i < buttons_2.length; _i++) {
            var button = buttons_2[_i];
            button.tabIndex = -1;
        }
        for (var _a = 0, links_3 = links; _a < links_3.length; _a++) {
            var link = links_3[_a];
            link.tabIndex = -1;
        }
    };
    IFrameNavigator.prototype.showModal = function (modal, control) {
        // Hide the rest of the page for screen readers.
        this.iframe.setAttribute("aria-hidden", "true");
        this.scrollingSuggestion.setAttribute("aria-hidden", "true");
        if (this.upLink) {
            this.upLink.setAttribute("aria-hidden", "true");
        }
        if (this.fullscreen) {
            this.fullscreen.setAttribute("aria-hidden", "true");
        }
        this.contentsControl.setAttribute("aria-hidden", "true");
        this.settingsControl.setAttribute("aria-hidden", "true");
        this.linksBottom.setAttribute("aria-hidden", "true");
        this.loadingMessage.setAttribute("aria-hidden", "true");
        this.errorMessage.setAttribute("aria-hidden", "true");
        this.infoTop.setAttribute("aria-hidden", "true");
        this.infoBottom.setAttribute("aria-hidden", "true");
        if (control) {
            control.setAttribute("aria-hidden", "false");
        }
        this.showElement(modal, control);
    };
    IFrameNavigator.prototype.hideModal = function (modal, control) {
        // Restore the page for screen readers.
        this.iframe.setAttribute("aria-hidden", "false");
        this.scrollingSuggestion.setAttribute("aria-hidden", "false");
        if (this.upLink) {
            this.upLink.setAttribute("aria-hidden", "false");
        }
        if (this.fullscreen) {
            this.fullscreen.setAttribute("aria-hidden", "false");
        }
        this.contentsControl.setAttribute("aria-hidden", "false");
        this.settingsControl.setAttribute("aria-hidden", "false");
        this.linksBottom.setAttribute("aria-hidden", "false");
        this.loadingMessage.setAttribute("aria-hidden", "false");
        this.errorMessage.setAttribute("aria-hidden", "false");
        this.infoTop.setAttribute("aria-hidden", "false");
        this.infoBottom.setAttribute("aria-hidden", "false");
        this.hideElement(modal, control);
    };
    IFrameNavigator.prototype.toggleFullscreenIcon = function () {
        if (this.fullscreen) {
            var activeIcon = this.fullscreen.querySelector(".icon.active-icon");
            var inactiveIcon = this.fullscreen.querySelector(".icon.inactive-icon");
            if (activeIcon && (activeIcon.getAttribute("class") || "").indexOf(" inactive-icon") === -1) {
                var newIconClass = "icon inactive-icon";
                activeIcon.setAttribute("class", newIconClass);
            }
            if (inactiveIcon) {
                var newIconClass = "icon active-icon";
                inactiveIcon.setAttribute("class", newIconClass);
            }
        }
    };
    IFrameNavigator.prototype.toggleFullscreen = function () {
        if (this.fullscreen) {
            var doc = document;
            var docEl = document.documentElement;
            var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
            var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
            if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
                requestFullScreen.call(docEl);
            }
            else {
                cancelFullScreen.call(doc);
            }
        }
    };
    IFrameNavigator.prototype.toggleDisplay = function (element, control) {
        if (!this.isDisplayed(element)) {
            this.showElement(element, control);
        }
        else {
            this.hideElement(element, control);
        }
    };
    IFrameNavigator.prototype.toggleModal = function (modal, control) {
        if (!this.isDisplayed(modal)) {
            this.showModal(modal, control);
        }
        else {
            this.hideModal(modal, control);
        }
    };
    IFrameNavigator.prototype.handleToggleLinksClick = function (event) {
        this.hideTOC();
        this.hideSettings();
        this.toggleDisplay(this.links, this.menuControl);
        if (this.settings.getSelectedView() === this.scroller) {
            if (!this.scroller.atBottom()) {
                this.toggleDisplay(this.linksBottom);
            }
        }
        event.preventDefault();
        event.stopPropagation();
    };
    IFrameNavigator.prototype.handlePreviousPageClick = function (event) {
        if (this.paginator) {
            if (this.paginator.onFirstPage()) {
                if (this.previousChapterLink.hasAttribute("href")) {
                    var position = {
                        resource: this.previousChapterLink.href,
                        position: 1
                    };
                    this.navigate(position);
                }
            }
            else {
                this.paginator.goToPreviousPage();
                this.updatePositionInfo();
                this.saveCurrentReadingPosition();
            }
            event.preventDefault();
            event.stopPropagation();
        }
    };
    IFrameNavigator.prototype.handleNextPageClick = function (event) {
        if (this.paginator) {
            if (this.paginator.onLastPage()) {
                if (this.nextChapterLink.hasAttribute("href")) {
                    var position = {
                        resource: this.nextChapterLink.href,
                        position: 0
                    };
                    this.navigate(position);
                }
            }
            else {
                this.paginator.goToNextPage();
                this.updatePositionInfo();
                this.saveCurrentReadingPosition();
            }
            event.preventDefault();
            event.stopPropagation();
        }
    };
    IFrameNavigator.prototype.handleLeftHover = function () {
        if (this.paginator) {
            if (this.paginator.onFirstPage() && !this.previousChapterLink.hasAttribute("href")) {
                this.iframe.className = "";
            }
            else {
                this.iframe.className = "left-hover";
            }
        }
    };
    IFrameNavigator.prototype.handleRightHover = function () {
        if (this.paginator) {
            if (this.paginator.onLastPage() && !this.nextChapterLink.hasAttribute("href")) {
                this.iframe.className = "";
            }
            else {
                this.iframe.className = "right-hover";
            }
        }
    };
    IFrameNavigator.prototype.handleRemoveHover = function () {
        this.iframe.className = "";
    };
    IFrameNavigator.prototype.handleInternalLink = function (event) {
        var element = event.target;
        var currentLocation = this.iframe.src.split("#")[0];
        if (this.iframe.contentDocument && this.iframe.contentDocument.location && this.iframe.contentDocument.location.href) {
            currentLocation = this.iframe.contentDocument.location.href.split("#")[0];
        }
        if (element && element.tagName.toLowerCase() === "a") {
            if (element.href.split("#")[0] === currentLocation) {
                var elementId = element.href.split("#")[1];
                this.settings.getSelectedView().goToElement(elementId, true);
                this.updatePositionInfo();
                this.saveCurrentReadingPosition();
                event.preventDefault();
                event.stopPropagation();
            }
        }
    };
    IFrameNavigator.prototype.handleResize = function () {
        var selectedView = this.settings.getSelectedView();
        var oldPosition = selectedView.getCurrentPosition();
        var fontSize = this.settings.getSelectedFontSize();
        var body = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredIframeElement"](this.iframe.contentDocument, "body");
        body.style.fontSize = fontSize;
        body.style.lineHeight = "1.5";
        // Disable text selection as we can’t handle this correctly anyway
        body.style.webkitUserSelect = "none";
        body.style.MozUserSelect = "none";
        body.style.msUserSelect = "none";
        body.style.userSelect = "none";
        var fontSizeNumber = parseInt(fontSize.slice(0, -2));
        var sideMargin = fontSizeNumber * 2;
        if (_BrowserUtilities__WEBPACK_IMPORTED_MODULE_3__["getWidth"]() > fontSizeNumber * 45) {
            var extraMargin = Math.floor((_BrowserUtilities__WEBPACK_IMPORTED_MODULE_3__["getWidth"]() - fontSizeNumber * 40) / 2);
            sideMargin = sideMargin + extraMargin;
        }
        if (this.paginator) {
            this.paginator.sideMargin = sideMargin;
        }
        if (this.scroller) {
            this.scroller.sideMargin = sideMargin;
        }
        // If the links are hidden, show them temporarily
        // to determine the top and bottom heights.
        var linksHidden = !this.isDisplayed(this.links);
        if (linksHidden) {
            this.toggleDisplay(this.links);
        }
        var topHeight = this.links.clientHeight;
        this.infoTop.style.height = topHeight + "px";
        if (linksHidden) {
            this.toggleDisplay(this.links);
        }
        var linksBottomHidden = !this.isDisplayed(this.linksBottom);
        if (linksBottomHidden) {
            this.toggleDisplay(this.linksBottom);
        }
        var bottomHeight = this.linksBottom.clientHeight;
        this.infoBottom.style.height = bottomHeight + "px";
        if (linksBottomHidden) {
            this.toggleDisplay(this.linksBottom);
        }
        if (this.paginator) {
            this.paginator.height = (_BrowserUtilities__WEBPACK_IMPORTED_MODULE_3__["getHeight"]() - topHeight - bottomHeight - 10);
        }
        if (this.scroller) {
            this.scroller.height = (_BrowserUtilities__WEBPACK_IMPORTED_MODULE_3__["getHeight"]() - topHeight - bottomHeight - 10);
        }
        selectedView.goToPosition(oldPosition);
        this.updatePositionInfo();
    };
    IFrameNavigator.prototype.updatePositionInfo = function () {
        if (this.settings.getSelectedView() === this.paginator) {
            var currentPage = Math.round(this.paginator.getCurrentPage());
            var pageCount = Math.round(this.paginator.getPageCount());
            this.chapterPosition.innerHTML = "Page " + currentPage + " of " + pageCount;
        }
        else {
            this.chapterPosition.innerHTML = "";
        }
    };
    IFrameNavigator.prototype.handlePreviousChapterClick = function (event) {
        if (this.previousChapterLink.hasAttribute("href")) {
            var position = {
                resource: this.previousChapterLink.href,
                position: 0
            };
            this.navigate(position);
        }
        event.preventDefault();
        event.stopPropagation();
    };
    IFrameNavigator.prototype.handleNextChapterClick = function (event) {
        if (this.nextChapterLink.hasAttribute("href")) {
            var position = {
                resource: this.nextChapterLink.href,
                position: 0
            };
            this.navigate(position);
        }
        event.preventDefault();
        event.stopPropagation();
    };
    IFrameNavigator.prototype.handleContentsClick = function (event) {
        this.hideSettings();
        this.toggleModal(this.tocView, this.contentsControl);
        // While the TOC is displayed, prevent scrolling in the book.
        if (this.settings.getSelectedView() === this.scroller) {
            if (this.isDisplayed(this.tocView)) {
                document.body.style.overflow = "hidden";
            }
            else {
                document.body.style.overflow = "auto";
            }
        }
        event.preventDefault();
        event.stopPropagation();
    };
    IFrameNavigator.prototype.hideTOC = function () {
        this.hideModal(this.tocView, this.contentsControl);
        if (this.settings.getSelectedView() === this.scroller) {
            document.body.style.overflow = "auto";
        }
    };
    IFrameNavigator.prototype.hideTOCOnEscape = function (event) {
        var ESCAPE_KEY = 27;
        if (this.isDisplayed(this.tocView) && event.keyCode === ESCAPE_KEY) {
            this.hideTOC();
        }
    };
    IFrameNavigator.prototype.setActiveTOCItem = function (resource) {
        var allItems = Array.prototype.slice.call(this.tocView.querySelectorAll("li > a"));
        for (var _i = 0, allItems_1 = allItems; _i < allItems_1.length; _i++) {
            var item = allItems_1[_i];
            item.className = "";
        }
        var activeItem = this.tocView.querySelector('li > a[href^="' + resource + '"]');
        if (activeItem) {
            activeItem.className = "active";
        }
    };
    IFrameNavigator.prototype.handleSettingsClick = function (event) {
        this.hideTOC();
        this.toggleModal(this.settingsView, this.settingsControl);
        event.preventDefault();
        event.stopPropagation();
    };
    IFrameNavigator.prototype.hideSettings = function () {
        this.hideModal(this.settingsView, this.settingsControl);
    };
    IFrameNavigator.prototype.hideSettingsOnEscape = function (event) {
        var ESCAPE_KEY = 27;
        if (this.isDisplayed(this.settingsView) && event.keyCode === ESCAPE_KEY) {
            this.hideSettings();
        }
    };
    IFrameNavigator.prototype.navigate = function (readingPosition) {
        this.hideIframeContents();
        this.showLoadingMessageAfterDelay();
        this.newPosition = readingPosition;
        if (readingPosition.resource.indexOf("#") === -1) {
            this.iframe.src = readingPosition.resource;
        }
        else {
            // We're navigating to an anchor within the resource,
            // rather than the resource itself. Go to the resource
            // first, then go to the anchor.
            this.newElementId = readingPosition.resource.slice(readingPosition.resource.indexOf("#") + 1);
            var newResource = readingPosition.resource.slice(0, readingPosition.resource.indexOf("#"));
            if (newResource === this.iframe.src) {
                // The resource isn't changing, but handle it like a new
                // iframe load to hide the menus and popups and go to the 
                // new element.
                this.handleIFrameLoad();
            }
            else {
                this.iframe.src = newResource;
            }
        }
    };
    IFrameNavigator.prototype.showIframeContents = function () {
        var _this = this;
        this.isBeingStyled = false;
        // We set a timeOut so that settings can be applied when opacity is still 0
        setTimeout(function () {
            if (!_this.isBeingStyled) {
                _this.iframe.style.opacity = "1";
            }
        }, 150);
    };
    IFrameNavigator.prototype.showLoadingMessageAfterDelay = function () {
        var _this = this;
        this.isLoading = true;
        setTimeout(function () {
            if (_this.isLoading) {
                _this.loadingMessage.style.display = "block";
                _this.loadingMessage.classList.add("is-loading");
            }
        }, 200);
    };
    IFrameNavigator.prototype.hideIframeContents = function () {
        this.isBeingStyled = true;
        this.iframe.style.opacity = "0";
    };
    IFrameNavigator.prototype.hideLoadingMessage = function () {
        this.isLoading = false;
        this.loadingMessage.style.display = "none";
        this.loadingMessage.classList.remove("is-loading");
    };
    IFrameNavigator.prototype.saveCurrentReadingPosition = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resource, position;
            return __generator(this, function (_a) {
                if (this.annotator) {
                    resource = this.iframe.src;
                    position = this.settings.getSelectedView().getCurrentPosition();
                    return [2 /*return*/, this.annotator.saveLastReadingPosition({
                            resource: resource,
                            position: position
                        })];
                }
                else {
                    return [2 /*return*/, new Promise(function (resolve) { return resolve(); })];
                }
                return [2 /*return*/];
            });
        });
    };
    return IFrameNavigator;
}());
/* harmony default export */ __webpack_exports__["default"] = (IFrameNavigator);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BrowserUtilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);

var EventHandler = /** @class */ (function () {
    function EventHandler() {
        var _this = this;
        this.pendingMouseEventStart = null;
        this.pendingMouseEventEnd = null;
        this.pendingTouchEventStart = null;
        this.pendingTouchEventEnd = null;
        this.onLeftTap = function () { };
        this.onMiddleTap = function () { };
        this.onRightTap = function () { };
        this.onBackwardSwipe = function () { };
        this.onForwardSwipe = function () { };
        this.onLeftArrow = function () { };
        this.onRightArrow = function () { };
        this.onLeftHover = function () { };
        this.onRightHover = function () { };
        this.onRemoveHover = function () { };
        this.onInternalLink = function () { };
        this.handleMouseEventStart = function (event) {
            _this.pendingMouseEventStart = event;
        };
        this.handleTouchEventStart = function (event) {
            if (_BrowserUtilities__WEBPACK_IMPORTED_MODULE_0__["isZoomed"]()) {
                return;
            }
            if (event.changedTouches.length !== 1) {
                // This is a multi-touch event. Ignore.
                return;
            }
            _this.pendingTouchEventStart = event;
        };
        this.handleMouseEventEnd = function (event) {
            if (!_this.pendingMouseEventStart) {
                // Somehow we got an end event without a start event. Ignore it.
                return;
            }
            var devicePixelRatio = window.devicePixelRatio;
            var xDevicePixels = (_this.pendingMouseEventStart.clientX - event.clientX) / devicePixelRatio;
            var yDevicePixels = (_this.pendingMouseEventStart.clientY - event.clientY) / devicePixelRatio;
            // Is the end event in the same place as the start event?
            if (Math.abs(xDevicePixels) < EventHandler.CLICK_PIXEL_TOLERANCE && Math.abs(yDevicePixels) < EventHandler.CLICK_PIXEL_TOLERANCE) {
                if (_this.pendingMouseEventEnd) {
                    // This was a double click. Let the browser handle it.
                    _this.pendingMouseEventStart = null;
                    _this.pendingMouseEventEnd = null;
                    return;
                }
                // This was a single click.
                _this.pendingMouseEventStart = null;
                _this.pendingMouseEventEnd = event;
                setTimeout(_this.handleClick, EventHandler.DOUBLE_CLICK_MS);
                return;
            }
            _this.pendingMouseEventEnd = null;
            // This is a swipe or highlight. Let the browser handle it.
            // (Swipes aren't handled on desktop.)
            _this.pendingMouseEventStart = null;
        };
        this.handleTouchEventEnd = function (event) {
            event.preventDefault();
            if (_BrowserUtilities__WEBPACK_IMPORTED_MODULE_0__["isZoomed"]()) {
                return;
            }
            if (event.changedTouches.length !== 1) {
                // This is a multi-touch event. Ignore.
                return;
            }
            if (!_this.pendingTouchEventStart) {
                // Somehow we got an end event without a start event. Ignore it.
                return;
            }
            var startTouch = _this.pendingTouchEventStart.changedTouches[0];
            var endTouch = event.changedTouches[0];
            if (!startTouch) {
                // Somehow we saved a touch event with no touches.
                return;
            }
            var devicePixelRatio = window.devicePixelRatio;
            var xDevicePixels = (startTouch.clientX - endTouch.clientX) / devicePixelRatio;
            var yDevicePixels = (startTouch.clientY - endTouch.clientY) / devicePixelRatio;
            // Is the end event in the same place as the start event?
            if (Math.abs(xDevicePixels) < EventHandler.TAP_PIXEL_TOLERANCE && Math.abs(yDevicePixels) < EventHandler.TAP_PIXEL_TOLERANCE) {
                if (_this.pendingTouchEventEnd) {
                    // This was a double tap. Let the browser handle it.
                    _this.pendingTouchEventStart = null;
                    _this.pendingTouchEventEnd = null;
                    return;
                }
                // This was a single tap or long press.
                if (event.timeStamp - _this.pendingTouchEventStart.timeStamp > EventHandler.LONG_PRESS_MS) {
                    // This was a long press. Let the browser handle it.
                    _this.pendingTouchEventStart = null;
                    _this.pendingTouchEventEnd = null;
                    return;
                }
                // This was a single tap.
                _this.pendingTouchEventStart = null;
                _this.pendingTouchEventEnd = event;
                setTimeout(_this.handleTap, EventHandler.DOUBLE_TAP_MS);
                return;
            }
            _this.pendingTouchEventEnd = null;
            if (event.timeStamp - _this.pendingTouchEventStart.timeStamp > EventHandler.SLOW_SWIPE_MS) {
                // This is a slow swipe / highlight. Let the browser handle it.
                _this.pendingTouchEventStart = null;
                return;
            }
            // This is a swipe. 
            var slope = (startTouch.clientY - endTouch.clientY) / (startTouch.clientX - endTouch.clientX);
            if (Math.abs(slope) > 0.5) {
                // This is a mostly vertical swipe. Ignore.
                _this.pendingTouchEventStart = null;
                return;
            }
            // This was a horizontal swipe.
            if (xDevicePixels < 0) {
                _this.onBackwardSwipe(event);
            }
            else {
                _this.onForwardSwipe(event);
            }
            _this.pendingTouchEventStart = null;
        };
        this.handleClick = function () {
            if (!_this.pendingMouseEventEnd) {
                // Another click happened already.
                return;
            }
            if (_this.checkForLink(_this.pendingMouseEventEnd)) {
                // This was a single click on a link. Do nothing.
                _this.pendingMouseEventEnd = null;
                return;
            }
            // This was a single click.
            var x = _this.pendingMouseEventEnd.clientX;
            var width = window.innerWidth;
            if (x / width < 0.3) {
                _this.onLeftTap(_this.pendingMouseEventEnd);
            }
            else if (x / width > 0.7) {
                _this.onRightTap(_this.pendingMouseEventEnd);
            }
            else {
                _this.onMiddleTap(_this.pendingMouseEventEnd);
            }
            _this.pendingMouseEventEnd = null;
            return;
        };
        this.handleTap = function () {
            if (!_this.pendingTouchEventEnd) {
                // Another tap happened already.
                return;
            }
            if (_this.checkForLink(_this.pendingTouchEventEnd)) {
                _this.handleLinks(_this.pendingTouchEventEnd);
                // This was a single tap on a link. Do nothing.
                _this.pendingTouchEventEnd = null;
                return;
            }
            // This was a single tap.
            var touch = _this.pendingTouchEventEnd.changedTouches[0];
            if (!touch) {
                // Somehow we got a touch event with no touches.
                return;
            }
            var x = touch.clientX;
            var width = window.innerWidth;
            if (x / width < 0.3) {
                _this.onLeftTap(_this.pendingTouchEventEnd);
            }
            else if (x / width > 0.7) {
                _this.onRightTap(_this.pendingTouchEventEnd);
            }
            else {
                _this.onMiddleTap(_this.pendingTouchEventEnd);
            }
            _this.pendingTouchEventEnd = null;
            return;
        };
        this.checkForLink = function (event) {
            var nextElement = event.target;
            while (nextElement && nextElement.tagName.toLowerCase() !== "body") {
                if (nextElement.tagName.toLowerCase() === "a" && nextElement.href) {
                    return nextElement;
                }
                else {
                    nextElement = nextElement.parentElement;
                }
            }
            return null;
        };
        this.handleMouseMove = function (event) {
            var x = event.clientX;
            var width = window.innerWidth;
            if (x / width < 0.3) {
                _this.onLeftHover();
            }
            else if (x / width > 0.7) {
                _this.onRightHover();
            }
            else {
                _this.onRemoveHover();
            }
        };
        this.handleMouseLeave = function () {
            _this.onRemoveHover();
        };
        this.handleLinks = function (event) {
            var link = _this.checkForLink(event);
            if (link) {
                // Open external links in new tabs.
                var isSameOrigin = (window.location.protocol === link.protocol &&
                    window.location.port === link.port &&
                    window.location.hostname === link.hostname);
                var isInternal = (link.href.indexOf("#"));
                if (!isSameOrigin) {
                    window.open(link.href, "_blank");
                    event.preventDefault();
                    event.stopPropagation();
                }
                else if (isSameOrigin && isInternal !== -1) {
                    _this.onInternalLink(event);
                }
                else if (isSameOrigin && isInternal === -1) {
                    link.click();
                }
            }
        };
        this.handleKeyboard = function (event) {
            var LEFT_ARROW = 37;
            var RIGHT_ARROW = 39;
            var TAB_KEY = 9;
            if (event.keyCode === LEFT_ARROW) {
                _this.onLeftArrow(event);
            }
            else if (event.keyCode === RIGHT_ARROW) {
                _this.onRightArrow(event);
            }
            else if (event.keyCode === TAB_KEY) {
                event.preventDefault();
            }
        };
    }
    EventHandler.prototype.setupEvents = function (element) {
        if (element !== null) {
            element.addEventListener("touchstart", this.handleTouchEventStart.bind(this));
            element.addEventListener("touchend", this.handleTouchEventEnd.bind(this));
            element.addEventListener("mousedown", this.handleMouseEventStart.bind(this));
            element.addEventListener("mouseup", this.handleMouseEventEnd.bind(this));
            element.addEventListener("mouseenter", this.handleMouseMove.bind(this));
            element.addEventListener("mousemove", this.handleMouseMove.bind(this));
            element.addEventListener("mouseleave", this.handleMouseLeave.bind(this));
            // Most click handling is done in the touchend and mouseup event handlers,
            // but if there's a click on an external link we need to cancel the click
            // event to prevent it from opening in the iframe.
            element.addEventListener("click", this.handleLinks.bind(this));
            element.addEventListener("keydown", this.handleKeyboard.bind(this));
        }
        else {
            throw "cannot setup events for null";
        }
    };
    EventHandler.CLICK_PIXEL_TOLERANCE = 10;
    EventHandler.TAP_PIXEL_TOLERANCE = 10;
    EventHandler.DOUBLE_CLICK_MS = 200;
    EventHandler.LONG_PRESS_MS = 500;
    EventHandler.DOUBLE_TAP_MS = 200;
    EventHandler.SLOW_SWIPE_MS = 500;
    return EventHandler;
}());
/* harmony default export */ __webpack_exports__["default"] = (EventHandler);


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vdmlld2VyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9Mb2NhbFN0b3JhZ2VTdG9yZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvTWVtb3J5U3RvcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NlcnZpY2VXb3JrZXJDYWNoZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NhY2hlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvTWFuaWZlc3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1B1Ymxpc2hlckZvbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0hUTUxVdGlsaXRpZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NlcmlmRm9udC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU2Fuc0ZvbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RheVRoZW1lLnRzIiwid2VicGFjazovLy8uL3NyYy9TZXBpYVRoZW1lLnRzIiwid2VicGFjazovLy8uL3NyYy9Db2x1bW5zUGFnaW5hdGVkQm9va1ZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Jyb3dzZXJVdGlsaXRpZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL05pZ2h0VGhlbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Njcm9sbGluZ0Jvb2tWaWV3LnRzIiwid2VicGFjazovLy8uL3NyYy9Mb2NhbEFubm90YXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQm9va1NldHRpbmdzLnRzIiwid2VicGFjazovLy8uL3NyYy9JY29uTGliLnRzIiwid2VicGFjazovLy8uL3NyYy9JRnJhbWVOYXZpZ2F0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0V2ZW50SGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FB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LGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUN2RTthQUFNO1lBQ0gsTUFBTSw4QkFBOEIsQ0FBQztTQUN4QztJQUNMLENBQUM7SUExQnVCLGtDQUFxQixHQUFHLEVBQUUsQ0FBQztJQUMzQixnQ0FBbUIsR0FBRyxFQUFFLENBQUM7SUFDekIsNEJBQWUsR0FBRyxHQUFHLENBQUM7SUFDdEIsMEJBQWEsR0FBRyxHQUFHLENBQUM7SUFDcEIsMEJBQWEsR0FBRyxHQUFHLENBQUM7SUFDcEIsMEJBQWEsR0FBRyxHQUFHLENBQUM7SUFtUmhELG1CQUFDO0NBQUE7QUE3U29CLDJFQUFZIiwiZmlsZSI6IndlYnB1Yi12aWV3ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJpbXBvcnQgTG9jYWxTdG9yYWdlU3RvcmUgZnJvbSBcIi4uL3NyYy9Mb2NhbFN0b3JhZ2VTdG9yZVwiO1xuaW1wb3J0IFNlcnZpY2VXb3JrZXJDYWNoZXIgZnJvbSBcIi4uL3NyYy9TZXJ2aWNlV29ya2VyQ2FjaGVyXCI7XG5pbXBvcnQgUHVibGlzaGVyRm9udCBmcm9tIFwiLi4vc3JjL1B1Ymxpc2hlckZvbnRcIjtcbmltcG9ydCBTZXJpZkZvbnQgZnJvbSBcIi4uL3NyYy9TZXJpZkZvbnRcIjtcbmltcG9ydCBTYW5zRm9udCBmcm9tIFwiLi4vc3JjL1NhbnNGb250XCI7XG5pbXBvcnQgRGF5VGhlbWUgZnJvbSBcIi4uL3NyYy9EYXlUaGVtZVwiO1xuaW1wb3J0IFNlcGlhVGhlbWUgZnJvbSBcIi4uL3NyYy9TZXBpYVRoZW1lXCI7XG5pbXBvcnQgQ29sdW1uc1BhZ2luYXRlZEJvb2tWaWV3IGZyb20gXCIuLi9zcmMvQ29sdW1uc1BhZ2luYXRlZEJvb2tWaWV3XCI7XG5pbXBvcnQgTmlnaHRUaGVtZSBmcm9tIFwiLi4vc3JjL05pZ2h0VGhlbWVcIjtcbmltcG9ydCBTY3JvbGxpbmdCb29rVmlldyBmcm9tIFwiLi4vc3JjL1Njcm9sbGluZ0Jvb2tWaWV3XCI7XG5pbXBvcnQgTG9jYWxBbm5vdGF0b3IgZnJvbSBcIi4uL3NyYy9Mb2NhbEFubm90YXRvclwiO1xuaW1wb3J0IEJvb2tTZXR0aW5ncyBmcm9tIFwiLi4vc3JjL0Jvb2tTZXR0aW5nc1wiO1xuaW1wb3J0IElGcmFtZU5hdmlnYXRvciBmcm9tIFwiLi4vc3JjL0lGcmFtZU5hdmlnYXRvclwiO1xuXG52YXIgZ2V0VVJMUXVlcnlQYXJhbXMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHBhcmFtcyA9IHt9O1xuICB2YXIgcXVlcnkgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICBpZiAocXVlcnkgJiYgcXVlcnkubGVuZ3RoKSB7XG4gICAgcXVlcnkgPSBxdWVyeS5zdWJzdHJpbmcoMSk7XG4gICAgdmFyIGtleVBhcmFtcyA9IHF1ZXJ5LnNwbGl0KFwiJlwiKTtcbiAgICBmb3IgKHZhciB4ID0gMDsgeCA8IGtleVBhcmFtcy5sZW5ndGg7IHgrKykge1xuICAgICAgdmFyIGtleVZhbCA9IGtleVBhcmFtc1t4XS5zcGxpdChcIj1cIik7XG4gICAgICBpZiAoa2V5VmFsLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgcGFyYW1zW2tleVZhbFswXV0gPSBkZWNvZGVVUklDb21wb25lbnQoa2V5VmFsWzFdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHBhcmFtcztcbn07XG5cbnZhciBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWV3ZXJcIik7XG52YXIgdXJsUGFyYW1zID0gZ2V0VVJMUXVlcnlQYXJhbXMoKTtcbnZhciB3ZWJwdWJNYW5pZmVzdFVybCA9IG5ldyBVUkwodXJsUGFyYW1zW1widXJsXCJdKTtcbnZhciBzdG9yZSA9IG5ldyBMb2NhbFN0b3JhZ2VTdG9yZSh7IHByZWZpeDogd2VicHViTWFuaWZlc3RVcmwuaHJlZiB9KTtcbnZhciBjYWNoZXIgPSBuZXcgU2VydmljZVdvcmtlckNhY2hlcih7XG4gIHN0b3JlOiBzdG9yZSxcbiAgbWFuaWZlc3RVcmw6IHdlYnB1Yk1hbmlmZXN0VXJsLFxuICBzZXJ2aWNlV29ya2VyVXJsOiBuZXcgVVJMKFwic3cuanNcIiwgd2luZG93LmxvY2F0aW9uLmhyZWYpLFxuICBzdGF0aWNGaWxlVXJsczogW1xuICAgIG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpLFxuICAgIG5ldyBVUkwoXCJpbmRleC5odG1sXCIsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKSxcbiAgICBuZXcgVVJMKFwibWFpbi5jc3NcIiwgd2luZG93LmxvY2F0aW9uLmhyZWYpLFxuICAgIG5ldyBVUkwoXCJyZXF1aXJlLmpzXCIsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKSxcbiAgICBuZXcgVVJMKFwiZmV0Y2guanNcIiwgd2luZG93LmxvY2F0aW9uLmhyZWYpLFxuICAgIG5ldyBVUkwoXCJ3ZWJwdWItdmlld2VyLmpzXCIsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuICBdXG59KTtcblxudmFyIHB1Ymxpc2hlciA9IG5ldyBQdWJsaXNoZXJGb250KCk7XG52YXIgc2VyaWYgPSBuZXcgU2VyaWZGb250KCk7XG52YXIgc2FucyA9IG5ldyBTYW5zRm9udCgpO1xudmFyIGZvbnRTaXplcyA9IFsxMiwgMTQsIDE2LCAxOCwgMjAsIDIyLCAyNCwgMjYsIDI4LCAzMCwgMzJdO1xudmFyIGRlZmF1bHRGb250U2l6ZSA9IDIwO1xudmFyIGRheSA9IG5ldyBEYXlUaGVtZSgpO1xudmFyIHNlcGlhID0gbmV3IFNlcGlhVGhlbWUoKTtcbnZhciBuaWdodCA9IG5ldyBOaWdodFRoZW1lKCk7XG52YXIgcGFnaW5hdG9yID0gbmV3IENvbHVtbnNQYWdpbmF0ZWRCb29rVmlldygpO1xudmFyIHNjcm9sbGVyID0gbmV3IFNjcm9sbGluZ0Jvb2tWaWV3KCk7XG52YXIgYW5ub3RhdG9yID0gbmV3IExvY2FsQW5ub3RhdG9yKHsgc3RvcmU6IHN0b3JlIH0pO1xudmFyIHNldHRpbmdzU3RvcmUgPSBuZXcgTG9jYWxTdG9yYWdlU3RvcmUoeyBwcmVmaXg6IFwid2VicHViLXZpZXdlclwiIH0pO1xudmFyIHVwTGluayA9IHtcbiAgdXJsOiBuZXcgVVJMKFwiaHR0cHM6Ly9naXRodWIuY29tL2VkcmxhYi93ZWJwdWItdmlld2VyXCIpLFxuICBsYWJlbDogXCJNeSBMaWJyYXJ5XCIsXG4gIGFyaWFMYWJlbDogXCJHbyBiYWNrIHRvIHRoZSBHaXRodWIgcmVwb3NpdG9yeVwiXG59O1xuXG5Cb29rU2V0dGluZ3MuY3JlYXRlKHtcbiAgc3RvcmU6IHNldHRpbmdzU3RvcmUsXG4gIGJvb2tGb250czogW3B1Ymxpc2hlciwgc2VyaWYsIHNhbnNdLFxuICBmb250U2l6ZXNJblBpeGVsczogZm9udFNpemVzLFxuICBkZWZhdWx0Rm9udFNpemVJblBpeGVsczogZGVmYXVsdEZvbnRTaXplLFxuICBib29rVGhlbWVzOiBbZGF5LCBzZXBpYSwgbmlnaHRdLFxuICBib29rVmlld3M6IFtwYWdpbmF0b3IsIHNjcm9sbGVyXVxufSkudGhlbihmdW5jdGlvbihzZXR0aW5ncykge1xuICBJRnJhbWVOYXZpZ2F0b3IuY3JlYXRlKHtcbiAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgIG1hbmlmZXN0VXJsOiB3ZWJwdWJNYW5pZmVzdFVybCxcbiAgICBzdG9yZTogc3RvcmUsXG4gICAgY2FjaGVyOiBjYWNoZXIsXG4gICAgc2V0dGluZ3M6IHNldHRpbmdzLFxuICAgIGFubm90YXRvcjogYW5ub3RhdG9yLFxuICAgIHB1Ymxpc2hlcjogcHVibGlzaGVyLFxuICAgIHNlcmlmOiBzZXJpZixcbiAgICBzYW5zOiBzYW5zLFxuICAgIGRheTogZGF5LFxuICAgIHNlcGlhOiBzZXBpYSxcbiAgICBuaWdodDogbmlnaHQsXG4gICAgcGFnaW5hdG9yOiBwYWdpbmF0b3IsXG4gICAgc2Nyb2xsZXI6IHNjcm9sbGVyLFxuICAgIHVwTGluazogdXBMaW5rLFxuICAgIGFsbG93RnVsbHNjcmVlbjogdHJ1ZVxuICB9KTtcbn0pO1xuIiwiaW1wb3J0IFN0b3JlIGZyb20gXCIuL1N0b3JlXCI7XG5pbXBvcnQgTWVtb3J5U3RvcmUgZnJvbSBcIi4vTWVtb3J5U3RvcmVcIjtcblxuZXhwb3J0IGludGVyZmFjZSBMb2NhbFN0b3JhZ2VTdG9yZUNvbmZpZyB7XG4gICAgLyoqIFN0cmluZyB0byBwcmVwZW5kIHRvIGtleXMgaW4gbG9jYWxTdG9yYWdlLiBJZiB0aGUgc2FtZSBwcmVmaXggaXMgc2hhcmVkXG4gICAgICAgIGFjcm9zcyBMb2NhbFN0b3JhZ2VTdG9yZXMgb24gdGhlIHNhbWUgZG9tYWluLCB0aGV5IHdpbGwgaGF2ZSB0aGUgc2FtZVxuICAgICAgICB2YWx1ZSBmb3IgZWFjaCBrZXkuICovXG4gICAgcHJlZml4OiBzdHJpbmc7XG59XG5cbi8qKiBDbGFzcyB0aGF0IHN0b3JlcyBrZXkvdmFsdWUgcGFpcnMgaW4gbG9jYWxTdG9yYWdlIGlmIHBvc3NpYmxlXG4gICAgYnV0IGZhbGxzIGJhY2sgdG8gYW4gaW4tbWVtb3J5IHN0b3JlLiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9jYWxTdG9yYWdlU3RvcmUgaW1wbGVtZW50cyBTdG9yZSB7XG4gICAgcHJpdmF0ZSBmYWxsYmFja1N0b3JlOiBNZW1vcnlTdG9yZSB8IG51bGw7XG4gICAgcHJpdmF0ZSBwcmVmaXg6IHN0cmluZztcbiAgICBcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY29uZmlnOiBMb2NhbFN0b3JhZ2VTdG9yZUNvbmZpZykge1xuICAgICAgICB0aGlzLnByZWZpeCA9IGNvbmZpZy5wcmVmaXg7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBJbiBzb21lIGJyb3dzZXJzIChlZyBpT1MgU2FmYXJpIGluIHByaXZhdGUgbW9kZSksIFxuICAgICAgICAgICAgLy8gbG9jYWxTdG9yYWdlIGV4aXN0cyBidXQgdGhyb3dzIGFuIGV4Y2VwdGlvbiB3aGVuXG4gICAgICAgICAgICAvLyB5b3UgdHJ5IHRvIHdyaXRlIHRvIGl0LlxuICAgICAgICAgICAgY29uc3QgdGVzdEtleSA9IGNvbmZpZy5wcmVmaXggKyBcIi1cIiArIFN0cmluZyhNYXRoLnJhbmRvbSgpKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0ZXN0S2V5LCBcInRlc3RcIik7XG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGVzdEtleSk7XG4gICAgICAgICAgICB0aGlzLmZhbGxiYWNrU3RvcmUgPSBudWxsO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLmZhbGxiYWNrU3RvcmUgPSBuZXcgTWVtb3J5U3RvcmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TG9jYWxTdG9yYWdlS2V5KGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJlZml4ICsgXCItXCIgKyBrZXk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGdldChrZXk6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgICAgICBpZiAoIXRoaXMuZmFsbGJhY2tTdG9yZSkge1xuICAgICAgICAgICAgdmFsdWUgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5nZXRMb2NhbFN0b3JhZ2VLZXkoa2V5KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZSA9IGF3YWl0IHRoaXMuZmFsbGJhY2tTdG9yZS5nZXQoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ocmVzb2x2ZSA9PiByZXNvbHZlKHZhbHVlKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHNldChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAoIXRoaXMuZmFsbGJhY2tTdG9yZSkge1xuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuZ2V0TG9jYWxTdG9yYWdlS2V5KGtleSksIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZmFsbGJhY2tTdG9yZS5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KHJlc29sdmUgPT4gcmVzb2x2ZSgpKTtcbiAgICB9XG59IiwiaW1wb3J0IFN0b3JlIGZyb20gXCIuL1N0b3JlXCI7XG5cbi8qKiBDbGFzcyB0aGF0IHN0b3JlcyBrZXkvdmFsdWUgcGFpcnMgaW4gbWVtb3J5LiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVtb3J5U3RvcmUgaW1wbGVtZW50cyBTdG9yZSB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBzdG9yZToge1trZXk6IHN0cmluZ106IHN0cmluZ307XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc3RvcmUgPSB7fTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0KGtleTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5zdG9yZVtrZXldIHx8IG51bGw7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmcgfCBudWxsPihyZXNvbHZlID0+IHJlc29sdmUodmFsdWUpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMuc3RvcmVba2V5XSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4ocmVzb2x2ZSA9PiByZXNvbHZlKCkpO1xuICAgIH1cbn0iLCJpbXBvcnQgQ2FjaGVyIGZyb20gXCIuL0NhY2hlclwiO1xuaW1wb3J0IHsgQ2FjaGVTdGF0dXMgfSBmcm9tIFwiLi9DYWNoZXJcIjtcbmltcG9ydCBTdG9yZSBmcm9tIFwiLi9TdG9yZVwiO1xuaW1wb3J0IE1hbmlmZXN0IGZyb20gXCIuL01hbmlmZXN0XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VydmljZVdvcmtlckNhY2hlckNvbmZpZyB7XG4gICAgLyoqIFN0b3JlIHRvIGNhY2hlIHRoZSBtYW5pZmVzdCBpbi4gKi9cbiAgICBzdG9yZTogU3RvcmU7XG5cbiAgICAvKiogVVJMIHRvIHRoZSB3ZWJwdWIncyBtYW5pZmVzdC4gKi9cbiAgICBtYW5pZmVzdFVybDogVVJMO1xuXG4gICAgLyoqIExvY2F0aW9uIG9mIHRoZSBzZXJ2aWNlIHdvcmtlciBqcyBmaWxlLiBEZWZhdWx0OiBzdy5qcyAqL1xuICAgIHNlcnZpY2VXb3JrZXJVcmw/OiBVUkw7XG5cbiAgICAvKiogU3RhdGljIGZpbGVzIGZvciB0aGUgc2VydmljZSB3b3JrZXIgdG8gY2FjaGUuIChKUyBhbmQgQ1NTIHVzZWQgYnkgdGhlIGFwcGxpY2F0aW9uKSAqL1xuICAgIHN0YXRpY0ZpbGVVcmxzPzogVVJMW107XG5cbiAgICAvKiogVVJMIHRvIGdpdmUgdGhlIEFwcGxpY2F0aW9uQ2FjaGVDYWNoZXIgaWYgc2VydmljZSB3b3JrZXJzIGFyZW4ndCBzdXBwb3J0ZWQuICovXG4gICAgZmFsbGJhY2tCb29rQ2FjaGVVcmw/OiBVUkw7XG59XG5cbi8qKiBDbGFzcyB0aGF0IGNhY2hlcyByZXNwb25zZXMgdXNpbmcgU2VydmljZVdvcmtlcidzIENhY2hlIEFQSSwgYW5kIG9wdGlvbmFsbHlcbiAgICBmYWxscyBiYWNrIHRvIHRoZSBhcHBsaWNhdGlvbiBjYWNoZSBpZiBzZXJ2aWNlIHdvcmtlcnMgYXJlbid0IGF2YWlsYWJsZS4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlcnZpY2VXb3JrZXJDYWNoZXIgaW1wbGVtZW50cyBDYWNoZXIge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgc2VydmljZVdvcmtlclVybDogVVJMO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgc3RhdGljRmlsZVVybHM6IFVSTFtdO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgc3RvcmU6IFN0b3JlO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbWFuaWZlc3RVcmw6IFVSTDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGFyZVNlcnZpY2VXb3JrZXJzU3VwcG9ydGVkOiBib29sZWFuO1xuICAgIHByb3RlY3RlZCBjYWNoZVN0YXR1czogQ2FjaGVTdGF0dXMgPSBDYWNoZVN0YXR1cy5VbmNhY2hlZDtcbiAgICBwcml2YXRlIHN0YXR1c1VwZGF0ZUNhbGxiYWNrOiAoc3RhdHVzOiBDYWNoZVN0YXR1cykgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gICAgLyoqIENyZWF0ZSBhIFNlcnZpY2VXb3JrZXJDYWNoZXIuICovXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNvbmZpZzogU2VydmljZVdvcmtlckNhY2hlckNvbmZpZykge1xuICAgICAgICB0aGlzLnNlcnZpY2VXb3JrZXJVcmwgPSBjb25maWcuc2VydmljZVdvcmtlclVybCB8fCBuZXcgVVJMKFwic3cuanNcIiwgY29uZmlnLm1hbmlmZXN0VXJsLmhyZWYpO1xuICAgICAgICB0aGlzLnN0YXRpY0ZpbGVVcmxzID0gY29uZmlnLnN0YXRpY0ZpbGVVcmxzIHx8IFtdO1xuICAgICAgICB0aGlzLnN0b3JlID0gY29uZmlnLnN0b3JlO1xuICAgICAgICB0aGlzLm1hbmlmZXN0VXJsID0gY29uZmlnLm1hbmlmZXN0VXJsO1xuXG4gICAgICAgIGNvbnN0IHByb3RvY29sID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sO1xuICAgICAgICB0aGlzLmFyZVNlcnZpY2VXb3JrZXJzU3VwcG9ydGVkID0gISFuYXZpZ2F0b3Iuc2VydmljZVdvcmtlciAmJiAhIXdpbmRvdy5jYWNoZXMgJiYgKHByb3RvY29sID09PSBcImh0dHBzOlwiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZW5hYmxlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAodGhpcy5hcmVTZXJ2aWNlV29ya2Vyc1N1cHBvcnRlZCAmJiAodGhpcy5jYWNoZVN0YXR1cyAhPT0gQ2FjaGVTdGF0dXMuRG93bmxvYWRlZCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2FjaGVTdGF0dXMgPSBDYWNoZVN0YXR1cy5Eb3dubG9hZGluZztcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3RhdHVzKCk7XG4gICAgICAgICAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3Rlcih0aGlzLnNlcnZpY2VXb3JrZXJVcmwuaHJlZik7XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy52ZXJpZnlBbmRDYWNoZU1hbmlmZXN0KHRoaXMubWFuaWZlc3RVcmwpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVTdGF0dXMgPSBDYWNoZVN0YXR1cy5Eb3dubG9hZGVkO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU3RhdHVzKCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlU3RhdHVzID0gQ2FjaGVTdGF0dXMuRXJyb3I7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTdGF0dXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHJlc29sdmUoKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyB2ZXJpZnlBbmRDYWNoZU1hbmlmZXN0KG1hbmlmZXN0VXJsOiBVUkwpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVhZHk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBJbnZva2UgcHJvbWlzZXMgY29uY3VycmVudGx5Li4uXG4gICAgICAgICAgICBjb25zdCB1cmxzVG9DYWNoZSA9IFttYW5pZmVzdFVybC5ocmVmXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdXJsIG9mIHRoaXMuc3RhdGljRmlsZVVybHMpIHtcbiAgICAgICAgICAgICAgICB1cmxzVG9DYWNoZS5wdXNoKHVybC5ocmVmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHByb21pc2VzID0gW3RoaXMuY2FjaGVNYW5pZmVzdChtYW5pZmVzdFVybCksIHRoaXMuY2FjaGVVcmxzKHVybHNUb0NhY2hlLCBtYW5pZmVzdFVybCldO1xuICAgICAgICAgICAgLy8gdGhlbiB3YWl0IGZvciBhbGwgb2YgdGhlbSB0byByZXNvbHZlLlxuICAgICAgICAgICAgZm9yIChjb25zdCBwcm9taXNlIG9mIHByb21pc2VzKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgcHJvbWlzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHJlc29sdmUoKSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChfLCByZWplY3QpID0+IHJlamVjdChlcnIpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgY2FjaGVVcmxzKHVybHM6IHN0cmluZ1tdLCBtYW5pZmVzdFVybDogVVJMKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGNhY2hlID0gYXdhaXQgd2luZG93LmNhY2hlcy5vcGVuKG1hbmlmZXN0VXJsLmhyZWYpO1xuICAgICAgICByZXR1cm4gY2FjaGUuYWRkQWxsKCh1cmxzLm1hcCh1cmwgPT4gbmV3IFVSTCh1cmwsIG1hbmlmZXN0VXJsLmhyZWYpLmhyZWYpIGFzIGFueSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgY2FjaGVNYW5pZmVzdChtYW5pZmVzdFVybDogVVJMKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IG1hbmlmZXN0ID0gYXdhaXQgTWFuaWZlc3QuZ2V0TWFuaWZlc3QobWFuaWZlc3RVcmwsIHRoaXMuc3RvcmUpO1xuICAgICAgICBjb25zdCBwcm9taXNlcyA9IFt0aGlzLmNhY2hlU3BpbmUobWFuaWZlc3QsIG1hbmlmZXN0VXJsKSwgdGhpcy5jYWNoZVJlc291cmNlcyhtYW5pZmVzdCwgbWFuaWZlc3RVcmwpXTtcbiAgICAgICAgZm9yIChjb25zdCBwcm9taXNlIG9mIHByb21pc2VzKSB7XG4gICAgICAgICAgICBhd2FpdCBwcm9taXNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHJlc29sdmUoKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBjYWNoZVNwaW5lKG1hbmlmZXN0OiBNYW5pZmVzdCwgbWFuaWZlc3RVcmw6IFVSTCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCB1cmxzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgICAgIGZvciAoY29uc3QgcmVzb3VyY2Ugb2YgbWFuaWZlc3Quc3BpbmUpIHtcbiAgICAgICAgICAgIGlmIChyZXNvdXJjZS5ocmVmKSB7XG4gICAgICAgICAgICAgICAgdXJscy5wdXNoKHJlc291cmNlLmhyZWYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNhY2hlVXJscyh1cmxzLCBtYW5pZmVzdFVybCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBjYWNoZVJlc291cmNlcyhtYW5pZmVzdDogTWFuaWZlc3QsIG1hbmlmZXN0VXJsOiBVUkwpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgdXJsczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHJlc291cmNlIG9mIG1hbmlmZXN0LnJlc291cmNlcykge1xuICAgICAgICAgICAgaWYgKHJlc291cmNlLmhyZWYpIHtcbiAgICAgICAgICAgICAgICB1cmxzLnB1c2gocmVzb3VyY2UuaHJlZik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY2FjaGVVcmxzKHVybHMsIG1hbmlmZXN0VXJsKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25TdGF0dXNVcGRhdGUoY2FsbGJhY2s6IChzdGF0dXM6IENhY2hlU3RhdHVzKSA9PiB2b2lkKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXR1c1VwZGF0ZUNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXR1cygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTdGF0dXMoKTogQ2FjaGVTdGF0dXMge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWNoZVN0YXR1cztcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVN0YXR1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdGF0dXNVcGRhdGVDYWxsYmFjayh0aGlzLmNhY2hlU3RhdHVzKTtcbiAgICB9XG59IiwiZXhwb3J0IGVudW0gQ2FjaGVTdGF0dXMge1xuICAgIC8qKiBUaGUgYm9vayBoYXMgbm90IGJlZW4gY2FjaGVkLiAqL1xuICAgIFVuY2FjaGVkLFxuXG4gICAgLyoqIFRoZXJlIGlzIGEgbmV3IHZlcnNpb24gYXZhaWxhYmxlIChBcHBsaWNhdGlvbiBDYWNoZSBvbmx5IC0gcmVmcmVzaCB0aGUgcGFnZSB0byB1cGRhdGUpLiAqL1xuICAgIFVwZGF0ZUF2YWlsYWJsZSxcblxuICAgIC8qKiBUaGUgYXBwIGlzIGNoZWNraW5nIGZvciBhIG5ldyB2ZXJzaW9uIChBcHBsaWNhdGlvbiBDYWNoZSBvbmx5KS4gKi9cbiAgICBDaGVja2luZ0ZvclVwZGF0ZSxcblxuICAgIC8qKiBUaGUgY2FjaGUgaXMgZG93bmxvYWRpbmcuICovXG4gICAgRG93bmxvYWRpbmcsXG5cbiAgICAvKiogVGhlIGNhY2hlIGlzIGZ1bGx5IGRvd25sb2FkZWQgYW5kIHRoZSBib29rIGlzIGF2YWlsYWJsZSBvZmZsaW5lLiAqL1xuICAgIERvd25sb2FkZWQsXG5cbiAgICAvKiogVGhlcmUgd2FzIGFuIGVycm9yIGRvd25sb2FkaW5nIHRoZSBjYWNoZSwgYW5kIHRoZSBib29rIGlzIG5vdCBhdmFpbGFibGUgb2ZmbGluZS4gKi9cbiAgICBFcnJvclxufVxuXG5cbmludGVyZmFjZSBDYWNoZXIge1xuICAgIC8vIEtpY2sgb2ZmIHRoZSBkb3dubG9hZHMgdG8gZW5hYmxlIG9mZmxpbmUgdXNlLlxuICAgIGVuYWJsZSgpOiBQcm9taXNlPHZvaWQ+O1xuXG4gICAgLy8gUmVnaXN0ZXIgYSBmdW5jdGlvbiB0byBjYWxsIHdoZW4gdGhlIGNhY2hlIHN0YXR1cyBjaGFuZ2VzLlxuICAgIG9uU3RhdHVzVXBkYXRlKGNhbGxiYWNrOiAoc3RhdHVzOiBDYWNoZVN0YXR1cykgPT4gdm9pZCk6IHZvaWQ7XG5cbiAgICAvLyBSZXR1cm4gdGhlIGN1cnJlbnQgQ2FjaGVTdGF0dXMuXG4gICAgZ2V0U3RhdHVzKCk6IENhY2hlU3RhdHVzO1xufVxuXG5leHBvcnQgZGVmYXVsdCBDYWNoZXI7IiwiaW1wb3J0IFN0b3JlIGZyb20gXCIuL1N0b3JlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWV0YWRhdGEge1xuICAgIHRpdGxlPzogc3RyaW5nO1xuICAgIGF1dGhvcj86IHN0cmluZztcbiAgICBpZGVudGlmaWVyPzogc3RyaW5nO1xuICAgIGxhbmd1YWdlPzogc3RyaW5nO1xuICAgIG1vZGlmaWVkPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExpbmsge1xuICAgIHJlbD86IEFycmF5PHN0cmluZz47XG4gICAgaHJlZj86IHN0cmluZztcbiAgICB0eXBlPzogc3RyaW5nO1xuICAgIHRpdGxlPzogc3RyaW5nO1xuICAgIGNoaWxkcmVuPzogQXJyYXk8TGluaz47XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hbmlmZXN0IHtcbiAgICBwdWJsaWMgcmVhZG9ubHkgbWV0YWRhdGE6IE1ldGFkYXRhO1xuICAgIHB1YmxpYyByZWFkb25seSBsaW5rczogQXJyYXk8TGluaz47XG4gICAgcHVibGljIHJlYWRvbmx5IHNwaW5lOiBBcnJheTxMaW5rPjtcbiAgICBwdWJsaWMgcmVhZG9ubHkgcmVzb3VyY2VzOiBBcnJheTxMaW5rPjtcbiAgICBwdWJsaWMgcmVhZG9ubHkgdG9jOiBBcnJheTxMaW5rPjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IG1hbmlmZXN0VXJsOiBVUkw7XG5cbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGdldE1hbmlmZXN0KG1hbmlmZXN0VXJsOiBVUkwsIHN0b3JlPzogU3RvcmUpOiBQcm9taXNlPE1hbmlmZXN0PiB7XG4gICAgICAgIGNvbnN0IGZldGNoTWFuaWZlc3QgPSBhc3luYyAoKTogUHJvbWlzZTxNYW5pZmVzdD4gPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB3aW5kb3cuZmV0Y2gobWFuaWZlc3RVcmwuaHJlZilcbiAgICAgICAgICAgIGNvbnN0IG1hbmlmZXN0SlNPTiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIGlmIChzdG9yZSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHN0b3JlLnNldChcIm1hbmlmZXN0XCIsIEpTT04uc3RyaW5naWZ5KG1hbmlmZXN0SlNPTikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBNYW5pZmVzdChtYW5pZmVzdEpTT04sIG1hbmlmZXN0VXJsKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB0cnlUb1VwZGF0ZU1hbmlmZXN0QnV0SWdub3JlUmVzdWx0ID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCBmZXRjaE1hbmlmZXN0KCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAvLyBJZ25vcmUgZXJyb3JzLlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KHJlc29sdmUgPT4gcmVzb2x2ZSgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlc3BvbmQgaW1tZWRpYXRlbHkgd2l0aCB0aGUgbWFuaWZlc3QgZnJvbSB0aGUgc3RvcmUsIGlmIHBvc3NpYmxlLlxuICAgICAgICBpZiAoc3RvcmUpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hbmlmZXN0U3RyaW5nID0gYXdhaXQgc3RvcmUuZ2V0KFwibWFuaWZlc3RcIik7XG4gICAgICAgICAgICBpZiAobWFuaWZlc3RTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICAvLyBLaWNrIG9mZiBhIGZldGNoIHRvIHVwZGF0ZSB0aGUgc3RvcmUgZm9yIG5leHQgdGltZSxcbiAgICAgICAgICAgICAgICAvLyBidXQgZG9uJ3QgYXdhaXQgaXQuXG4gICAgICAgICAgICAgICAgdHJ5VG9VcGRhdGVNYW5pZmVzdEJ1dElnbm9yZVJlc3VsdCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hbmlmZXN0SlNPTiA9IEpTT04ucGFyc2UobWFuaWZlc3RTdHJpbmcpO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTWFuaWZlc3QobWFuaWZlc3RKU09OLCBtYW5pZmVzdFVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmV0Y2hNYW5pZmVzdCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihtYW5pZmVzdEpTT046IGFueSwgbWFuaWZlc3RVcmw6IFVSTCkge1xuICAgICAgICB0aGlzLm1ldGFkYXRhID0gbWFuaWZlc3RKU09OLm1ldGFkYXRhIHx8IHt9O1xuICAgICAgICB0aGlzLmxpbmtzID0gbWFuaWZlc3RKU09OLmxpbmtzIHx8IFtdO1xuICAgICAgICB0aGlzLnNwaW5lID0gKG1hbmlmZXN0SlNPTi5yZWFkaW5nT3JkZXIgfHwgbWFuaWZlc3RKU09OLnNwaW5lKSB8fCBbXTtcbiAgICAgICAgdGhpcy5yZXNvdXJjZXMgPSBtYW5pZmVzdEpTT04ucmVzb3VyY2VzIHx8IFtdO1xuICAgICAgICB0aGlzLnRvYyA9IG1hbmlmZXN0SlNPTi50b2MgfHwgW107XG4gICAgICAgIHRoaXMubWFuaWZlc3RVcmwgPSBtYW5pZmVzdFVybDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U3RhcnRMaW5rKCk6IExpbmsgfCBudWxsIHtcbiAgICAgICAgaWYgKHRoaXMuc3BpbmUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3BpbmVbMF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFByZXZpb3VzU3BpbmVJdGVtKGhyZWY6IHN0cmluZyk6IExpbmsgfCBudWxsIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmdldFNwaW5lSW5kZXgoaHJlZik7XG4gICAgICAgIGlmIChpbmRleCAhPT0gbnVsbCAmJiBpbmRleCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNwaW5lW2luZGV4IC0gMV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE5leHRTcGluZUl0ZW0oaHJlZjogc3RyaW5nKTogTGluayB8IG51bGwge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0U3BpbmVJbmRleChocmVmKTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSBudWxsICYmIGluZGV4IDwgKHRoaXMuc3BpbmUubGVuZ3RoIC0xKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3BpbmVbaW5kZXggKyAxXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U3BpbmVJdGVtKGhyZWY6IHN0cmluZyk6IExpbmsgfCBudWxsIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmdldFNwaW5lSW5kZXgoaHJlZik7XG4gICAgICAgIGlmIChpbmRleCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3BpbmVbaW5kZXhdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0U3BpbmVJbmRleChocmVmOiBzdHJpbmcpOiBudW1iZXIgfCBudWxsIHtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuc3BpbmUubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5zcGluZVtpbmRleF07XG4gICAgICAgICAgICBpZiAoaXRlbS5ocmVmKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbVVybCA9IG5ldyBVUkwoaXRlbS5ocmVmLCB0aGlzLm1hbmlmZXN0VXJsLmhyZWYpLmhyZWY7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1VcmwgPT09IGhyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VE9DSXRlbShocmVmOiBzdHJpbmcpOiBMaW5rIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IGZpbmRJdGVtID0gKGhyZWY6IHN0cmluZywgbGlua3M6IEFycmF5PExpbms+KTogTGluayB8IG51bGwgPT4ge1xuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxpbmtzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBsaW5rc1tpbmRleF07XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaHJlZikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtVXJsID0gbmV3IFVSTChpdGVtLmhyZWYsIHRoaXMubWFuaWZlc3RVcmwuaHJlZikuaHJlZjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1VcmwgPT09IGhyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkSXRlbSA9IGZpbmRJdGVtKGhyZWYsIGl0ZW0uY2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRJdGVtICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2hpbGRJdGVtO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpbmRJdGVtKGhyZWYsIHRoaXMudG9jKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQm9va0ZvbnQgZnJvbSBcIi4vQm9va0ZvbnRcIjtcbmltcG9ydCAqIGFzIEhUTUxVdGlsaXRpZXMgZnJvbSBcIi4vSFRNTFV0aWxpdGllc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQdWJsaXNoZXJGb250IGltcGxlbWVudHMgQm9va0ZvbnQge1xuICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9IFwicHVibGlzaGVyLWZvbnRcIjtcbiAgcHVibGljIHJlYWRvbmx5IGxhYmVsID0gXCJQdWJsaXNoZXJcIjtcblxuICBwdWJsaWMgYm9va0VsZW1lbnQ6IEhUTUxJRnJhbWVFbGVtZW50O1xuXG4gIHB1YmxpYyBzdGFydCgpOiB2b2lkIHtcbiAgICBjb25zdCByb290RnJhbWUgPSBIVE1MVXRpbGl0aWVzLmZpbmRSZXF1aXJlZElmcmFtZUVsZW1lbnQodGhpcy5ib29rRWxlbWVudC5jb250ZW50RG9jdW1lbnQsIFwiaHRtbFwiKSBhcyBIVE1MSHRtbEVsZW1lbnQ7XG5cbiAgICBIVE1MVXRpbGl0aWVzLnNldEF0dHIocm9vdEZyYW1lLCBcImRhdGEtdmlld2VyLWZvbnRcIiwgXCJwdWJsaXNoZXJcIik7XG4gIH1cblxuICBwdWJsaWMgc3RvcCgpOiB2b2lkIHtcbiAgICBjb25zdCByb290RnJhbWUgPSBIVE1MVXRpbGl0aWVzLmZpbmRSZXF1aXJlZElmcmFtZUVsZW1lbnQodGhpcy5ib29rRWxlbWVudC5jb250ZW50RG9jdW1lbnQsIFwiaHRtbFwiKSBhcyBIVE1MSHRtbEVsZW1lbnQ7XG5cbiAgICBIVE1MVXRpbGl0aWVzLnJlbW92ZUF0dHIocm9vdEZyYW1lLCBcImRhdGEtdmlld2VyLWZvbnRcIik7XG4gIH1cbn0iLCIvKiogUmV0dXJucyBhIHNpbmdsZSBlbGVtZW50IG1hdGNoaW5nIHRoZSBzZWxlY3RvciB3aXRoaW4gdGhlIHBhcmVudEVsZW1lbnQsXG4gICAgb3IgbnVsbCBpZiBubyBlbGVtZW50IG1hdGNoZXMuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZEVsZW1lbnQocGFyZW50RWxlbWVudDogRWxlbWVudCB8IERvY3VtZW50LCBzZWxlY3Rvcjogc3RyaW5nKTogRWxlbWVudCB8IG51bGwge1xuICAgIHJldHVybiBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xufVxuXG4vKiogUmV0dXJucyBhIHNpbmdsZSBlbGVtZW50IG1hdGNoaW5nIHRoZSBzZWxlY3RvciB3aXRoaW4gdGhlIHBhcmVudCBlbGVtZW50LFxuICAgIG9yIHRocm93cyBhbiBleGNlcHRpb24gaWYgbm8gZWxlbWVudCBtYXRjaGVzLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmRSZXF1aXJlZEVsZW1lbnQocGFyZW50RWxlbWVudDogRWxlbWVudCB8IERvY3VtZW50LCBzZWxlY3Rvcjogc3RyaW5nKTogRWxlbWVudCB7XG4gICAgY29uc3QgZWxlbWVudCA9IGZpbmRFbGVtZW50KHBhcmVudEVsZW1lbnQsIHNlbGVjdG9yKTtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgdGhyb3cgXCJyZXF1aXJlZCBlbGVtZW50IFwiICsgc2VsZWN0b3IgKyBcIiBub3QgZm91bmRcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG59XG5cbi8qKiBSZXR1cm5zIGEgc2luZ2xlIGVsZW1lbnQgbWF0Y2hpbmcgdGhlIHNlbGVjdG9yIHdpdGhpbiB0aGUgcGFyZW50RWxlbWVudCBpbiB0aGUgaWZyYW1lIGNvbnRleHQsXG4gICAgb3IgbnVsbCBpZiBubyBlbGVtZW50IG1hdGNoZXMuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZElmcmFtZUVsZW1lbnQocGFyZW50RWxlbWVudDogRG9jdW1lbnQgfCBudWxsLCBzZWxlY3Rvcjogc3RyaW5nKTogRWxlbWVudCB8IG51bGwge1xuICAgIGlmIChwYXJlbnRFbGVtZW50ID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IFwicGFyZW50IGVsZW1lbnQgaXMgbnVsbFwiXG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgfVxufVxuICAgIFxuLyoqIFJldHVybnMgYSBzaW5nbGUgZWxlbWVudCBtYXRjaGluZyB0aGUgc2VsZWN0b3Igd2l0aGluIHRoZSBwYXJlbnQgZWxlbWVudCBpbiBhbiBpZnJhbWUgY29udGV4dCxcbiAgICAgICAgb3IgdGhyb3dzIGFuIGV4Y2VwdGlvbiBpZiBubyBlbGVtZW50IG1hdGNoZXMuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZFJlcXVpcmVkSWZyYW1lRWxlbWVudChwYXJlbnRFbGVtZW50OiBEb2N1bWVudCB8IG51bGwsIHNlbGVjdG9yOiBzdHJpbmcpOiBFbGVtZW50IHtcbiAgICBjb25zdCBlbGVtZW50ID0gZmluZElmcmFtZUVsZW1lbnQocGFyZW50RWxlbWVudCwgc2VsZWN0b3IpO1xuICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICB0aHJvdyBcInJlcXVpcmVkIGVsZW1lbnQgXCIgKyBzZWxlY3RvciArIFwiIG5vdCBmb3VuZCBpbiBpZnJhbWVcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG59XG5cbi8qKiBTZXRzIGFuIGF0dHJpYnV0ZSBhbmQgaXRzIHZhbHVlIGZvciBhbiBIVE1MIGVsZW1lbnQgKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRBdHRyKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBhdHRyOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyLCB2YWx1ZSk7XG59XG5cbi8qKiBSZW1vdmVzIGFuIGF0dHJpYnV0ZSBmb3IgYW4gSFRNTCBlbGVtZW50ICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQXR0cihlbGVtZW50OiBIVE1MRWxlbWVudCwgYXR0cjogc3RyaW5nKTogdm9pZCB7XG4gICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XG59XG5cbi8qKiBDcmVhdGVzIGFuIGludGVybmFsIHN0eWxlc2hlZXQgaW4gYW4gSFRNTCBlbGVtZW50ICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3R5bGVzaGVldChlbGVtZW50OiBEb2N1bWVudCB8IEhUTUxFbGVtZW50LCBpZDogc3RyaW5nLCBjc3NTdHlsZXM6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGhlYWQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoZWFkXCIpIGFzIEhUTUxIZWFkRWxlbWVudDtcbiAgICBjb25zdCBzdHlsZXNoZWV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpXG4gICAgc3R5bGVzaGVldC5pZCA9IGlkO1xuICAgIHN0eWxlc2hlZXQudGV4dENvbnRlbnQgPSBjc3NTdHlsZXM7XG4gICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZXNoZWV0KTtcbn1cblxuLyoqIFJlbW92ZXMgYW4gZXhpc3RpbmcgaW50ZXJuYWwgc3R5bGVzaGVldCBpbiBhbiBIVE1MIGVsZW1lbnQgKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVTdHlsZXNoZWV0KGVsZW1lbnQ6IERvY3VtZW50IHwgSFRNTEVsZW1lbnQsIGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBoZWFkID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiaGVhZFwiKSBhcyBIVE1MSGVhZEVsZW1lbnQ7XG4gICAgY29uc3Qgc3R5bGVzaGVldCA9IGhlYWQucXVlcnlTZWxlY3RvcihcIiNcIiArIGlkKSBhcyBIVE1MU3R5bGVFbGVtZW50O1xuICAgIGhlYWQucmVtb3ZlQ2hpbGQoc3R5bGVzaGVldCk7XG59XG4iLCJpbXBvcnQgQm9va0ZvbnQgZnJvbSBcIi4vQm9va0ZvbnRcIjtcbmltcG9ydCAqIGFzIEhUTUxVdGlsaXRpZXMgZnJvbSBcIi4vSFRNTFV0aWxpdGllc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXJpZkZvbnQgaW1wbGVtZW50cyBCb29rRm9udCB7XG4gIHB1YmxpYyByZWFkb25seSBuYW1lID0gXCJzZXJpZi1mb250XCI7XG4gIHB1YmxpYyByZWFkb25seSBsYWJlbCA9IFwiU2VyaWZcIjtcblxuICBwdWJsaWMgYm9va0VsZW1lbnQ6IEhUTUxJRnJhbWVFbGVtZW50O1xuXG4gIHB1YmxpYyBzdGFydCgpOiB2b2lkIHtcbiAgICBjb25zdCByb290RnJhbWUgPSBIVE1MVXRpbGl0aWVzLmZpbmRSZXF1aXJlZElmcmFtZUVsZW1lbnQodGhpcy5ib29rRWxlbWVudC5jb250ZW50RG9jdW1lbnQsIFwiaHRtbFwiKSBhcyBIVE1MSHRtbEVsZW1lbnQ7XG5cbiAgICBIVE1MVXRpbGl0aWVzLnNldEF0dHIocm9vdEZyYW1lLCBcImRhdGEtdmlld2VyLWZvbnRcIiwgXCJzZXJpZlwiKTtcbiAgICBIVE1MVXRpbGl0aWVzLmNyZWF0ZVN0eWxlc2hlZXQocm9vdEZyYW1lLCBcInNlcmlmLWZvbnQtaW50ZXJuYWxcIiwgXCIqIHtmb250LWZhbWlseTogJ0lvd2FuIE9sZCBTdHlsZScsICdTaXRrYSBUZXh0JywgUGFsYXRpbm8sICdCb29rIEFudGlxdWEnLCBzZXJpZiAhaW1wb3J0YW50O31cIik7XG4gIH1cblxuICBwdWJsaWMgc3RvcCgpOiB2b2lkIHtcbiAgICBjb25zdCByb290RnJhbWUgPSBIVE1MVXRpbGl0aWVzLmZpbmRSZXF1aXJlZElmcmFtZUVsZW1lbnQodGhpcy5ib29rRWxlbWVudC5jb250ZW50RG9jdW1lbnQsIFwiaHRtbFwiKSBhcyBIVE1MSHRtbEVsZW1lbnQ7XG5cbiAgICBIVE1MVXRpbGl0aWVzLnJlbW92ZUF0dHIocm9vdEZyYW1lLCBcImRhdGEtdmlld2VyLWZvbnRcIik7XG4gICAgSFRNTFV0aWxpdGllcy5yZW1vdmVTdHlsZXNoZWV0KHJvb3RGcmFtZSwgXCJzZXJpZi1mb250LWludGVybmFsXCIpO1xuICB9XG59IiwiaW1wb3J0IEJvb2tGb250IGZyb20gXCIuL0Jvb2tGb250XCI7XG5pbXBvcnQgKiBhcyBIVE1MVXRpbGl0aWVzIGZyb20gXCIuL0hUTUxVdGlsaXRpZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Fuc0ZvbnQgaW1wbGVtZW50cyBCb29rRm9udCB7XG4gIHB1YmxpYyByZWFkb25seSBuYW1lID0gXCJzYW5zLWZvbnRcIjtcbiAgcHVibGljIHJlYWRvbmx5IGxhYmVsID0gXCJTYW5zLXNlcmlmXCI7XG5cbiAgcHVibGljIGJvb2tFbGVtZW50OiBIVE1MSUZyYW1lRWxlbWVudDtcblxuICBwdWJsaWMgc3RhcnQoKTogdm9pZCB7XG4gICAgY29uc3Qgcm9vdEZyYW1lID0gSFRNTFV0aWxpdGllcy5maW5kUmVxdWlyZWRJZnJhbWVFbGVtZW50KHRoaXMuYm9va0VsZW1lbnQuY29udGVudERvY3VtZW50LCBcImh0bWxcIikgYXMgSFRNTEh0bWxFbGVtZW50O1xuXG4gICAgSFRNTFV0aWxpdGllcy5zZXRBdHRyKHJvb3RGcmFtZSwgXCJkYXRhLXZpZXdlci1mb250XCIsIFwic2Fuc1wiKTtcbiAgICBIVE1MVXRpbGl0aWVzLmNyZWF0ZVN0eWxlc2hlZXQocm9vdEZyYW1lLCBcInNhbnMtZm9udC1pbnRlcm5hbFwiLCBcIioge2ZvbnQtZmFtaWx5OiBTZXJhdmVrLCBDYWxpYnJpLCBSb2JvdG8sIEFyaWFsLCBzYW5zLXNlcmlmICFpbXBvcnRhbnQ7fVwiKTtcbiAgfVxuXG4gIHB1YmxpYyBzdG9wKCk6IHZvaWQge1xuICAgIGNvbnN0IHJvb3RGcmFtZSA9IEhUTUxVdGlsaXRpZXMuZmluZFJlcXVpcmVkSWZyYW1lRWxlbWVudCh0aGlzLmJvb2tFbGVtZW50LmNvbnRlbnREb2N1bWVudCwgXCJodG1sXCIpIGFzIEhUTUxIdG1sRWxlbWVudDtcblxuICAgIEhUTUxVdGlsaXRpZXMucmVtb3ZlQXR0cihyb290RnJhbWUsIFwiZGF0YS12aWV3ZXItZm9udFwiKTtcbiAgICBIVE1MVXRpbGl0aWVzLnJlbW92ZVN0eWxlc2hlZXQocm9vdEZyYW1lLCBcInNhbnMtZm9udC1pbnRlcm5hbFwiKTtcbiAgfVxufSIsImltcG9ydCBCb29rVGhlbWUgZnJvbSBcIi4vQm9va1RoZW1lXCI7XG5pbXBvcnQgKiBhcyBIVE1MVXRpbGl0aWVzIGZyb20gXCIuL0hUTUxVdGlsaXRpZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF5VGhlbWUgaW1wbGVtZW50cyBCb29rVGhlbWUge1xuICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9IFwiZGF5LXRoZW1lXCI7XG4gIHB1YmxpYyByZWFkb25seSBsYWJlbCA9IFwiRGF5XCI7XG5cbiAgcHVibGljIHJvb3RFbGVtZW50OiBIVE1MSHRtbEVsZW1lbnQ7XG4gIHB1YmxpYyBib29rRWxlbWVudDogSFRNTElGcmFtZUVsZW1lbnQ7XG5cbiAgcHVibGljIHN0YXJ0KCk6IHZvaWQge1xuICAgIGNvbnN0IHJvb3RFbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgSFRNTFV0aWxpdGllcy5zZXRBdHRyKHJvb3RFbGVtZW50LCBcImRhdGEtdmlld2VyLXRoZW1lXCIsIFwiZGF5XCIpO1xuICB9XG5cbiAgcHVibGljIHN0b3AoKTogdm9pZCB7XG4gICAgY29uc3Qgcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICBIVE1MVXRpbGl0aWVzLnJlbW92ZUF0dHIocm9vdEVsZW1lbnQsIFwiZGF0YS12aWV3ZXItdGhlbWVcIik7XG4gIH1cbn0iLCJpbXBvcnQgQm9va1RoZW1lIGZyb20gXCIuL0Jvb2tUaGVtZVwiO1xuaW1wb3J0ICogYXMgSFRNTFV0aWxpdGllcyBmcm9tIFwiLi9IVE1MVXRpbGl0aWVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlcGlhVGhlbWUgaW1wbGVtZW50cyBCb29rVGhlbWUge1xuICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9IFwic2VwaWEtdGhlbWVcIjtcbiAgcHVibGljIHJlYWRvbmx5IGxhYmVsID0gXCJTZXBpYVwiO1xuXG4gIHB1YmxpYyByb290RWxlbWVudDogSFRNTEh0bWxFbGVtZW50O1xuICBwdWJsaWMgYm9va0VsZW1lbnQ6IEhUTUxJRnJhbWVFbGVtZW50O1xuXG4gIHB1YmxpYyBzdGFydCgpOiB2b2lkIHtcbiAgICBjb25zdCByb290RWxlbWVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICBjb25zdCByb290RnJhbWUgPSBIVE1MVXRpbGl0aWVzLmZpbmRSZXF1aXJlZElmcmFtZUVsZW1lbnQodGhpcy5ib29rRWxlbWVudC5jb250ZW50RG9jdW1lbnQsIFwiaHRtbFwiKSBhcyBIVE1MSHRtbEVsZW1lbnQ7XG5cbiAgICBIVE1MVXRpbGl0aWVzLnNldEF0dHIocm9vdEVsZW1lbnQsIFwiZGF0YS12aWV3ZXItdGhlbWVcIiwgXCJzZXBpYVwiKTtcbiAgICBIVE1MVXRpbGl0aWVzLmNyZWF0ZVN0eWxlc2hlZXQocm9vdEZyYW1lLCBcInNlcGlhLW1vZGUtaW50ZXJuYWxcIiwgXCI6cm9vdCB7YmFja2dyb3VuZC1jb2xvcjogI2Y2ZWNkOSAhaW1wb3J0YW50fSAgaW1nLCBzdmcge2JhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7IG1peC1ibGVuZC1tb2RlOiBtdWx0aXBseTt9XCIpO1xuICB9XG5cbiAgcHVibGljIHN0b3AoKTogdm9pZCB7XG4gICAgY29uc3Qgcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgY29uc3Qgcm9vdEZyYW1lID0gSFRNTFV0aWxpdGllcy5maW5kUmVxdWlyZWRJZnJhbWVFbGVtZW50KHRoaXMuYm9va0VsZW1lbnQuY29udGVudERvY3VtZW50LCBcImh0bWxcIikgYXMgSFRNTEh0bWxFbGVtZW50O1xuXG4gICAgSFRNTFV0aWxpdGllcy5yZW1vdmVBdHRyKHJvb3RFbGVtZW50LCBcImRhdGEtdmlld2VyLXRoZW1lXCIpO1xuICAgIEhUTUxVdGlsaXRpZXMucmVtb3ZlU3R5bGVzaGVldChyb290RnJhbWUsIFwic2VwaWEtbW9kZS1pbnRlcm5hbFwiKTtcbiAgfVxufSIsImltcG9ydCBQYWdpbmF0ZWRCb29rVmlldyBmcm9tIFwiLi9QYWdpbmF0ZWRCb29rVmlld1wiO1xuaW1wb3J0ICogYXMgSFRNTFV0aWxpdGllcyBmcm9tIFwiLi9IVE1MVXRpbGl0aWVzXCI7XG5pbXBvcnQgKiBhcyBCcm93c2VyVXRpbGl0aWVzIGZyb20gXCIuL0Jyb3dzZXJVdGlsaXRpZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sdW1uc1BhZ2luYXRlZEJvb2tWaWV3IGltcGxlbWVudHMgUGFnaW5hdGVkQm9va1ZpZXcge1xuICAgIHB1YmxpYyByZWFkb25seSBuYW1lID0gXCJjb2x1bW5zLXBhZ2luYXRlZC12aWV3XCI7XG4gICAgcHVibGljIHJlYWRvbmx5IGxhYmVsID0gXCJQYWdpbmF0ZWRcIjtcblxuICAgIHB1YmxpYyBib29rRWxlbWVudDogSFRNTElGcmFtZUVsZW1lbnQ7XG4gICAgcHVibGljIHNpZGVNYXJnaW46IG51bWJlciA9IDA7XG4gICAgcHVibGljIGhlaWdodDogbnVtYmVyID0gMDtcblxuICAgIHByb3RlY3RlZCBoYXNGaXhlZFNjcm9sbFdpZHRoOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwdWJsaWMgc3RhcnQocG9zaXRpb246IG51bWJlcik6IHZvaWQge1xuICAgICAgICAvLyBhbnkgaXMgbmVjZXNzYXJ5IGJlY2F1c2UgQ1NTU3R5bGVEZWNsYXJhdGlvbiB0eXBlIGRvZXMgbm90IGluY2x1ZGVcbiAgICAgICAgLy8gYWxsIHRoZSB2ZW5kb3ItcHJlZml4ZWQgYXR0cmlidXRlcy5cbiAgICAgICAgY29uc3QgYm9keSA9IEhUTUxVdGlsaXRpZXMuZmluZFJlcXVpcmVkSWZyYW1lRWxlbWVudCh0aGlzLmJvb2tFbGVtZW50LmNvbnRlbnREb2N1bWVudCwgXCJib2R5XCIpIGFzIGFueTtcbiAgICAgICAgYm9keS5zdHlsZS53ZWJraXRDb2x1bW5Db3VudCA9IFwiMVwiO1xuICAgICAgICBib2R5LnN0eWxlLk1vekNvbHVtbkNvdW50ID0gXCIxXCI7XG4gICAgICAgIGJvZHkuc3R5bGUuY29sdW1uQ291bnQgPSBcIjFcIjtcbiAgICAgICAgYm9keS5zdHlsZS53ZWJraXRDb2x1bW5GaWxsID0gXCJhdXRvXCI7XG4gICAgICAgIGJvZHkuc3R5bGUuTW96Q29sdW1uRmlsbCA9IFwiYXV0b1wiO1xuICAgICAgICBib2R5LnN0eWxlLmNvbHVtbkZpbGwgPSBcImF1dG9cIjtcbiAgICAgICAgYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG4gICAgICAgIGJvZHkuc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCI7XG4gICAgICAgIGJvZHkuc3R5bGUud2Via2l0Rm9udFNtb290aGluZyA9IFwic3VicGl4ZWwtYW50aWFsaWFzZWRcIjtcbiAgICAgICAgdGhpcy5zZXRTaXplKCk7XG4gICAgICAgIGNvbnN0IHZpZXdwb3J0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJtZXRhXCIpO1xuICAgICAgICB2aWV3cG9ydEVsZW1lbnQubmFtZSA9IFwidmlld3BvcnRcIjtcbiAgICAgICAgdmlld3BvcnRFbGVtZW50LmNvbnRlbnQgPSBcIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLCBtYXhpbXVtLXNjYWxlPTFcIjtcbiAgICAgICAgY29uc3QgaGVhZCA9IEhUTUxVdGlsaXRpZXMuZmluZElmcmFtZUVsZW1lbnQodGhpcy5ib29rRWxlbWVudC5jb250ZW50RG9jdW1lbnQsIFwiaGVhZFwiKTtcbiAgICAgICAgaWYgKGhlYWQpIHtcbiAgICAgICAgICAgIGhlYWQuYXBwZW5kQ2hpbGQodmlld3BvcnRFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hlY2tGb3JGaXhlZFNjcm9sbFdpZHRoKCk7XG5cbiAgICAgICAgdGhpcy5nb1RvUG9zaXRpb24ocG9zaXRpb24pO1xuXG4gICAgICAgIC8vIFRoaXMgaXMgZGVsYXllZCB0byBwcmV2ZW50IGEgYnVnIGluIGlPUyAxMC4zIHRoYXQgY2F1c2VzXG4gICAgICAgIC8vIHRoZSB0b3AgbGlua3MgdG8gYmUgZGlzcGxheWVkIGluIHRoZSBtaWRkbGUgb2YgdGhlIHBhZ2UuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG4gICAgICAgICAgICAvLyBUaGlzIHByZXZlbnRzIG92ZXJzY3JvbGwvYm91bmNpbmcgb24gaU9TLlxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUubGVmdCA9IFwiMFwiO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5yaWdodCA9IFwiMFwiO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS50b3AgPSBcIjBcIjtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYm90dG9tID0gXCIwXCI7XG4gICAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjaGVja0ZvckZpeGVkU2Nyb2xsV2lkdGgoKTogdm9pZCB7XG4gICAgICAgIC8vIERldGVybWluZSBpZiB0aGUgc2Nyb2xsIHdpZHRoIGNoYW5nZXMgd2hlbiB0aGUgbGVmdCBwb3NpdGlvblxuICAgICAgICAvLyBjaGFuZ2VzLiBUaGlzIGRpZmZlcnMgYWNyb3NzIGJyb3dzZXJzIGFuZCBzb21ldGltZXMgYWNyb3NzXG4gICAgICAgIC8vIGJvb2tzIGluIHRoZSBzYW1lIGJyb3dzZXIuXG4gICAgICAgIGNvbnN0IGJvZHkgPSBIVE1MVXRpbGl0aWVzLmZpbmRSZXF1aXJlZElmcmFtZUVsZW1lbnQodGhpcy5ib29rRWxlbWVudC5jb250ZW50RG9jdW1lbnQsIFwiYm9keVwiKSBhcyBhbnk7XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsTGVmdCA9IChib2R5LnN0eWxlLmxlZnQgfHwgXCIwcHhcIikuc2xpY2UoMCwgLTIpO1xuICAgICAgICBjb25zdCBvcmlnaW5hbFNjcm9sbFdpZHRoID0gYm9keS5zY3JvbGxXaWR0aDtcbiAgICAgICAgYm9keS5zdHlsZS5sZWZ0ID0gKG9yaWdpbmFsTGVmdCAtIDEpICsgXCJweFwiO1xuICAgICAgICB0aGlzLmhhc0ZpeGVkU2Nyb2xsV2lkdGggPSAoYm9keS5zY3JvbGxXaWR0aCA9PT0gb3JpZ2luYWxTY3JvbGxXaWR0aCk7XG4gICAgICAgIGJvZHkuc3R5bGUubGVmdCA9IG9yaWdpbmFsTGVmdCArIFwicHhcIjtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFNpemUoKTogdm9pZCB7XG4gICAgICAgIC8vIGFueSBpcyBuZWNlc3NhcnkgYmVjYXVzZSBDU1NTdHlsZURlY2xhcmF0aW9uIHR5cGUgZG9lcyBub3QgaW5jbHVkZVxuICAgICAgICAvLyBhbGwgdGhlIHZlbmRvci1wcmVmaXhlZCBhdHRyaWJ1dGVzLlxuICAgICAgICBjb25zdCBib2R5ID0gSFRNTFV0aWxpdGllcy5maW5kUmVxdWlyZWRJZnJhbWVFbGVtZW50KHRoaXMuYm9va0VsZW1lbnQuY29udGVudERvY3VtZW50LCBcImJvZHlcIikgYXMgYW55O1xuXG4gICAgICAgIGNvbnN0IHdpZHRoID0gKEJyb3dzZXJVdGlsaXRpZXMuZ2V0V2lkdGgoKSAtIHRoaXMuc2lkZU1hcmdpbiAqIDIpICsgXCJweFwiO1xuICAgICAgICBib2R5LnN0eWxlLmNvbHVtbldpZHRoID0gd2lkdGg7XG4gICAgICAgIGJvZHkuc3R5bGUud2Via2l0Q29sdW1uV2lkdGggPSB3aWR0aDtcbiAgICAgICAgYm9keS5zdHlsZS5Nb3pDb2x1bW5XaWR0aCA9IHdpZHRoO1xuICAgICAgICBib2R5LnN0eWxlLmNvbHVtbkdhcCA9IHRoaXMuc2lkZU1hcmdpbiAqIDIgKyBcInB4XCI7XG4gICAgICAgIGJvZHkuc3R5bGUud2Via2l0Q29sdW1uR2FwID0gdGhpcy5zaWRlTWFyZ2luICogMiArIFwicHhcIjtcbiAgICAgICAgYm9keS5zdHlsZS5Nb3pDb2x1bW5HYXAgPSB0aGlzLnNpZGVNYXJnaW4gKiAyICsgXCJweFwiO1xuICAgICAgICBib2R5LnN0eWxlLmhlaWdodCA9IHRoaXMuaGVpZ2h0ICsgXCJweFwiO1xuICAgICAgICBib2R5LnN0eWxlLndpZHRoID0gd2lkdGg7XG4gICAgICAgIGJvZHkuc3R5bGUubWFyZ2luTGVmdCA9IHRoaXMuc2lkZU1hcmdpbiArIFwicHhcIjtcbiAgICAgICAgYm9keS5zdHlsZS5tYXJnaW5SaWdodCA9IHRoaXMuc2lkZU1hcmdpbiArIFwicHhcIjtcbiAgICAgICAgYm9keS5zdHlsZS5tYXJnaW5Ub3AgPSBcIjBweFwiO1xuICAgICAgICBib2R5LnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiMHB4XCI7XG4gICAgICAgICh0aGlzLmJvb2tFbGVtZW50LmNvbnRlbnREb2N1bWVudCBhcyBhbnkpLmRvY3VtZW50RWxlbWVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLmhlaWdodCArIFwicHhcIjtcbiAgICAgICAgdGhpcy5ib29rRWxlbWVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLmhlaWdodCArIFwicHhcIjtcbiAgICAgICAgdGhpcy5ib29rRWxlbWVudC5zdHlsZS53aWR0aCA9IEJyb3dzZXJVdGlsaXRpZXMuZ2V0V2lkdGgoKSArIFwicHhcIjtcblxuICAgICAgICBjb25zdCBpbWFnZXMgPSBib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbWdcIik7XG4gICAgICAgIGZvciAoY29uc3QgaW1hZ2Ugb2YgaW1hZ2VzKSB7XG4gICAgICAgICAgICBpbWFnZS5zdHlsZS5tYXhXaWR0aCA9IFwiMTAwJVwiO1xuXG4gICAgICAgICAgICAvLyBEZXRlcm1pbmUgaG93IG11Y2ggdmVydGljYWwgc3BhY2UgdGhlcmUgaXMgZm9yIHRoZSBpbWFnZS5cbiAgICAgICAgICAgIGxldCBuZXh0RWxlbWVudCA9IGltYWdlO1xuICAgICAgICAgICAgbGV0IHRvdGFsTWFyZ2lucyA9IDA7XG4gICAgICAgICAgICB3aGlsZSAobmV4dEVsZW1lbnQgIT09IGJvZHkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobmV4dEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGlmIChjb21wdXRlZFN0eWxlLm1hcmdpblRvcCkge1xuICAgICAgICAgICAgICAgICAgICB0b3RhbE1hcmdpbnMgKz0gcGFyc2VJbnQoY29tcHV0ZWRTdHlsZS5tYXJnaW5Ub3Auc2xpY2UoMCwgLTIpLCAxMClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNvbXB1dGVkU3R5bGUubWFyZ2luQm90dG9tKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsTWFyZ2lucyArPSBwYXJzZUludChjb21wdXRlZFN0eWxlLm1hcmdpbkJvdHRvbS5zbGljZSgwLCAtMiksIDEwKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCA9IG5leHRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbWFnZS5zdHlsZS5tYXhIZWlnaHQgPSAodGhpcy5oZWlnaHQgLSB0b3RhbE1hcmdpbnMpICsgXCJweFwiO1xuXG4gICAgICAgICAgICAvLyBXaXRob3V0IHRoaXMsIGFuIGltYWdlIGF0IHRoZSBlbmQgb2YgYSByZXNvdXJjZSBjYW4gZW5kIHVwXG4gICAgICAgICAgICAvLyB3aXRoIGFuIGV4dHJhIGVtcHR5IGNvbHVtbiBhZnRlciBpdC5cbiAgICAgICAgICAgIGltYWdlLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSBcInRvcFwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0b3AoKTogdm9pZCB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImF1dG9cIjtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5wb3NpdGlvbiA9IFwic3RhdGljXCI7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUubGVmdCA9IFwiXCI7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUucmlnaHQgPSBcIlwiO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnRvcCA9IFwiXCI7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYm90dG9tID0gXCJcIjtcblxuICAgICAgICBjb25zdCBib2R5ID0gSFRNTFV0aWxpdGllcy5maW5kUmVxdWlyZWRJZnJhbWVFbGVtZW50KHRoaXMuYm9va0VsZW1lbnQuY29udGVudERvY3VtZW50LCBcImJvZHlcIikgYXMgYW55O1xuICAgICAgICBib2R5LnN0eWxlLmNvbHVtbkNvdW50ID0gXCJcIjtcbiAgICAgICAgYm9keS5zdHlsZS53ZWJraXRDb2x1bW5Db3VudCA9IFwiXCI7XG4gICAgICAgIGJvZHkuc3R5bGUuTW96Q29sdW1uQ291bnQgPSBcIlwiO1xuICAgICAgICBib2R5LnN0eWxlLmNvbHVtbkdhcCA9IFwiXCI7XG4gICAgICAgIGJvZHkuc3R5bGUud2Via2l0Q29sdW1uR2FwID0gXCJcIjtcbiAgICAgICAgYm9keS5zdHlsZS5Nb3pDb2x1bW5HYXAgPSBcIlwiO1xuICAgICAgICBib2R5LnN0eWxlLmNvbHVtbkZpbGwgPSBcIlwiO1xuICAgICAgICBib2R5LnN0eWxlLndlYmtpdENvbHVtbkZpbGwgPSBcIlwiO1xuICAgICAgICBib2R5LnN0eWxlLk1vekNvbHVtbkZpbGwgPSBcIlwiO1xuICAgICAgICBib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJcIjtcbiAgICAgICAgYm9keS5zdHlsZS5wb3NpdGlvbiA9IFwiXCI7XG4gICAgICAgIGJvZHkuc3R5bGUud2Via2l0Rm9udFNtb290aGluZyA9IFwiXCI7XG4gICAgICAgIGJvZHkuc3R5bGUuY29sdW1uV2lkdGggPSBcIlwiO1xuICAgICAgICBib2R5LnN0eWxlLndlYmtpdENvbHVtbldpZHRoID0gXCJcIjtcbiAgICAgICAgYm9keS5zdHlsZS5Nb3pDb2x1bW5XaWR0aCA9IFwiXCI7XG4gICAgICAgIGJvZHkuc3R5bGUuaGVpZ2h0ID0gXCJcIjtcbiAgICAgICAgYm9keS5zdHlsZS53aWR0aCA9IFwiXCI7XG4gICAgICAgIGJvZHkuc3R5bGUubWFyZ2luTGVmdCA9IFwiXCI7XG4gICAgICAgIGJvZHkuc3R5bGUubWFyZ2luUmlnaHQgPSBcIlwiO1xuICAgICAgICBib2R5LnN0eWxlLm1hcmdpblRvcCA9IFwiXCI7XG4gICAgICAgIGJvZHkuc3R5bGUubWFyZ2luQm90dG9tID0gXCJcIjtcbiAgICAgICAgKHRoaXMuYm9va0VsZW1lbnQuY29udGVudERvY3VtZW50IGFzIGFueSkuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmhlaWdodCA9IFwiXCI7XG4gICAgICAgIHRoaXMuYm9va0VsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gXCJcIjtcbiAgICAgICAgdGhpcy5ib29rRWxlbWVudC5zdHlsZS53aWR0aCA9IFwiXCI7XG5cbiAgICAgICAgY29uc3QgaW1hZ2VzID0gYm9keS5xdWVyeVNlbGVjdG9yQWxsKFwiaW1nXCIpO1xuICAgICAgICBmb3IgKGNvbnN0IGltYWdlIG9mIGltYWdlcykge1xuICAgICAgICAgICAgaW1hZ2Uuc3R5bGUubWF4V2lkdGggPSBcIlwiO1xuICAgICAgICAgICAgaW1hZ2Uuc3R5bGUubWF4SGVpZ2h0ID0gXCJcIjtcbiAgICAgICAgICAgIGltYWdlLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgICAgICAgaW1hZ2Uuc3R5bGUubWFyZ2luTGVmdCA9IFwiXCI7XG4gICAgICAgICAgICBpbWFnZS5zdHlsZS5tYXJnaW5SaWdodCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyB0aGUgdG90YWwgd2lkdGggb2YgdGhlIGNvbHVtbnMgdGhhdCBhcmUgY3VycmVudGx5XG4gICAgICAgIHBvc2l0aW9uZWQgdG8gdGhlIGxlZnQgb2YgdGhlIGlmcmFtZSB2aWV3cG9ydC4gKi9cbiAgICBwcml2YXRlIGdldExlZnRDb2x1bW5zV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgYm9keSA9IEhUTUxVdGlsaXRpZXMuZmluZFJlcXVpcmVkSWZyYW1lRWxlbWVudCh0aGlzLmJvb2tFbGVtZW50LmNvbnRlbnREb2N1bWVudCwgXCJib2R5XCIpIGFzIEhUTUxCb2R5RWxlbWVudDtcblxuICAgICAgICBjb25zdCBpc0ZpcmVmb3ggPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZignZmlyZWZveCcpICE9PSAtMTtcbiAgICAgICAgY29uc3QgaXNYTUwgPSB0aGlzLmJvb2tFbGVtZW50LnNyYy5pbmRleE9mKFwiLnhtbFwiKSAhPT0gLTE7XG4gICAgICAgIGlmIChpc0ZpcmVmb3ggJiYgaXNYTUwpIHtcbiAgICAgICAgICAgIC8vIEZlZWRib29rcyBlcHVicyBoYXZlIHJlc291cmNlcyB3aXRoIC54bWwgZmlsZSBleHRlbnNpb25zIGZvciBoaXN0b3JpY2FsXG4gICAgICAgICAgICAvLyByZWFzb25zLiBGaXJlZm94IGhhbmRsZXMgdGhlc2UgZGlmZmVyZW50bHkgdGhhbiBYSFRNTCBmaWxlcywgYW5kIHNldHRpbmdcbiAgICAgICAgICAgIC8vIGEgbGVmdCBwb3NpdGlvbiBhcyB3ZWxsIGFzIG92ZXJmbG93OmhpZGRlbiBjYXVzZXMgdGhlIHBhZ2VzIHRvIGJlIGJsYW5rLlxuICAgICAgICAgICAgcmV0dXJuIGJvZHkuc2Nyb2xsTGVmdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAtKGJvZHkuc3R5bGUubGVmdCB8fCBcIjBweFwiKS5zbGljZSgwLCAtMik7XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgdGhlIHRvdGFsIHdpZHRoIG9mIHRoZSBjb2x1bW5zIHRoYXQgYXJlIGN1cnJlbnRseVxuICAgICAgICBwb3NpdGlvbmVkIHRvIHRoZSByaWdodCBvZiB0aGUgaWZyYW1lIHZpZXdwb3J0LiAqL1xuICAgIHByaXZhdGUgZ2V0UmlnaHRDb2x1bW5zV2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgLy8gc2Nyb2xsV2lkdGggaW5jbHVkZXMgdGhlIGNvbHVtbiBpbiB0aGUgaWZyYW1lIHZpZXdwb3J0IGFzIHdlbGwgYXNcbiAgICAgICAgLy8gY29sdW1ucyB0byB0aGUgcmlnaHQuXG4gICAgICAgIGNvbnN0IGJvZHkgPSBIVE1MVXRpbGl0aWVzLmZpbmRSZXF1aXJlZElmcmFtZUVsZW1lbnQodGhpcy5ib29rRWxlbWVudC5jb250ZW50RG9jdW1lbnQsIFwiYm9keVwiKSBhcyBIVE1MQm9keUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHNjcm9sbFdpZHRoID0gYm9keS5zY3JvbGxXaWR0aDtcbiAgICAgICAgY29uc3Qgd2lkdGggPSB0aGlzLmdldENvbHVtbldpZHRoKCk7XG4gICAgICAgIGxldCByaWdodFdpZHRoID0gc2Nyb2xsV2lkdGggKyB0aGlzLnNpZGVNYXJnaW4gLSB3aWR0aDtcbiAgICAgICAgaWYgKHRoaXMuaGFzRml4ZWRTY3JvbGxXaWR0aCkge1xuICAgICAgICAgICAgLy8gSW4gc29tZSBicm93c2VycyAoSUUgYW5kIEZpcmVmb3ggd2l0aCBjZXJ0YWluIGJvb2tzKSwgXG4gICAgICAgICAgICAvLyBzY3JvbGxXaWR0aCBkb2Vzbid0IGNoYW5nZSB3aGVuIHNvbWUgY29sdW1uc1xuICAgICAgICAgICAgLy8gYXJlIG9mZiB0byB0aGUgbGVmdCwgc28gd2UgbmVlZCB0byBzdWJ0cmFjdCB0aGVtLlxuICAgICAgICAgICAgY29uc3QgbGVmdFdpZHRoID0gdGhpcy5nZXRMZWZ0Q29sdW1uc1dpZHRoKCk7XG4gICAgICAgICAgICByaWdodFdpZHRoID0gTWF0aC5tYXgoMCwgcmlnaHRXaWR0aCAtIGxlZnRXaWR0aCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChyaWdodFdpZHRoID09PSB0aGlzLnNpZGVNYXJnaW4pIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJpZ2h0V2lkdGg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyB0aGUgd2lkdGggb2Ygb25lIGNvbHVtbi4gKi9cbiAgICBwcml2YXRlIGdldENvbHVtbldpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGJvZHkgPSBIVE1MVXRpbGl0aWVzLmZpbmRSZXF1aXJlZElmcmFtZUVsZW1lbnQodGhpcy5ib29rRWxlbWVudC5jb250ZW50RG9jdW1lbnQsIFwiYm9keVwiKSBhcyBIVE1MQm9keUVsZW1lbnQ7XG4gICAgICAgIHJldHVybiBib2R5Lm9mZnNldFdpZHRoICsgdGhpcy5zaWRlTWFyZ2luICogMjtcbiAgICB9XG5cbiAgICAvKiogU2hpZnRzIHRoZSBjb2x1bW5zIHNvIHRoYXQgdGhlIHNwZWNpZmllZCB3aWR0aCBpcyBwb3NpdGlvbmVkXG4gICAgICAgIHRvIHRoZSBsZWZ0IG9mIHRoZSBpZnJhbWUgdmlld3BvcnQuICovXG4gICAgcHJpdmF0ZSBzZXRMZWZ0Q29sdW1uc1dpZHRoKHdpZHRoOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgYm9keSA9IEhUTUxVdGlsaXRpZXMuZmluZFJlcXVpcmVkSWZyYW1lRWxlbWVudCh0aGlzLmJvb2tFbGVtZW50LmNvbnRlbnREb2N1bWVudCwgXCJib2R5XCIpIGFzIEhUTUxCb2R5RWxlbWVudDtcblxuICAgICAgICBjb25zdCBpc0ZpcmVmb3ggPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZignZmlyZWZveCcpICE9PSAtMTtcbiAgICAgICAgY29uc3QgaXNYTUwgPSB0aGlzLmJvb2tFbGVtZW50LnNyYy5pbmRleE9mKFwiLnhtbFwiKSAhPT0gLTE7XG4gICAgICAgIGlmIChpc0ZpcmVmb3ggJiYgaXNYTUwpIHtcbiAgICAgICAgICAgIC8vIEZlZWRib29rcyBlcHVicyBoYXZlIHJlc291cmNlcyB3aXRoIC54bWwgZmlsZSBleHRlbnNpb25zIGZvciBoaXN0b3JpY2FsXG4gICAgICAgICAgICAvLyByZWFzb25zLiBGaXJlZm94IGhhbmRsZXMgdGhlc2UgZGlmZmVyZW50bHkgdGhhbiBYSFRNTCBmaWxlcywgYW5kIHNldHRpbmdcbiAgICAgICAgICAgIC8vIGEgbGVmdCBwb3NpdGlvbiBhcyB3ZWxsIGFzIG92ZXJmbG93OmhpZGRlbiBjYXVzZXMgdGhlIHBhZ2VzIHRvIGJlIGJsYW5rLlxuICAgICAgICAgICAgYm9keS5zY3JvbGxMZWZ0ID0gd2lkdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBib2R5LnN0eWxlLmxlZnQgPSAtd2lkdGggKyBcInB4XCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyBudW1iZXIgaW4gcmFuZ2UgWzAuLjEpIHJlcHJlc2VudGluZyB0aGVcbiAgICAgICAgcHJvcG9ydGlvbiBvZiBjb2x1bW5zIHRoYXQgYXJlIGN1cnJlbnRseSBwb3NpdGlvbmVkXG4gICAgICAgIHRvIHRoZSBsZWZ0IG9mIHRoZSBpZnJhbWUgdmlld3BvcnQuICovXG4gICAgcHVibGljIGdldEN1cnJlbnRQb3NpdGlvbigpOiBudW1iZXIge1xuICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMuZ2V0Q29sdW1uV2lkdGgoKTtcbiAgICAgICAgY29uc3QgbGVmdFdpZHRoID0gdGhpcy5nZXRMZWZ0Q29sdW1uc1dpZHRoKCk7XG4gICAgICAgIGNvbnN0IHJpZ2h0V2lkdGggPSB0aGlzLmdldFJpZ2h0Q29sdW1uc1dpZHRoKCk7XG4gICAgICAgIGNvbnN0IHRvdGFsV2lkdGggPSBsZWZ0V2lkdGggKyB3aWR0aCArIHJpZ2h0V2lkdGg7XG5cbiAgICAgICAgcmV0dXJuIGxlZnRXaWR0aCAvIHRvdGFsV2lkdGg7XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgdGhlIGN1cnJlbnQgMS1pbmRleGVkIHBhZ2UgbnVtYmVyLiAqL1xuICAgIHB1YmxpYyBnZXRDdXJyZW50UGFnZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDdXJyZW50UG9zaXRpb24oKSAqIHRoaXMuZ2V0UGFnZUNvdW50KCkgKyAxO1xuICAgIH1cblxuICAgIC8qKiBSZXR1cm5zIHRoZSB0b3RhbCBudW1iZXIgb2YgcGFnZXMuICovXG4gICAgcHVibGljIGdldFBhZ2VDb3VudCgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMuZ2V0Q29sdW1uV2lkdGgoKTtcbiAgICAgICAgY29uc3QgbGVmdFdpZHRoID0gdGhpcy5nZXRMZWZ0Q29sdW1uc1dpZHRoKCk7XG4gICAgICAgIGNvbnN0IHJpZ2h0V2lkdGggPSB0aGlzLmdldFJpZ2h0Q29sdW1uc1dpZHRoKCk7XG4gICAgICAgIGNvbnN0IHRvdGFsV2lkdGggPSBsZWZ0V2lkdGggKyB3aWR0aCArIHJpZ2h0V2lkdGg7XG4gICAgICAgIHJldHVybiB0b3RhbFdpZHRoIC8gd2lkdGg7XG4gICAgfVxuXG4gICAgcHVibGljIG9uRmlyc3RQYWdlKCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBsZWZ0V2lkdGggPSB0aGlzLmdldExlZnRDb2x1bW5zV2lkdGgoKTtcblxuICAgICAgICByZXR1cm4gKGxlZnRXaWR0aCA8PSAwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25MYXN0UGFnZSgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgcmlnaHRXaWR0aCA9IHRoaXMuZ2V0UmlnaHRDb2x1bW5zV2lkdGgoKTtcblxuICAgICAgICByZXR1cm4gKHJpZ2h0V2lkdGggPD0gMCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdvVG9QcmV2aW91c1BhZ2UoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGxlZnRXaWR0aCA9IHRoaXMuZ2V0TGVmdENvbHVtbnNXaWR0aCgpO1xuICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMuZ2V0Q29sdW1uV2lkdGgoKTtcblxuICAgICAgICB0aGlzLnNldExlZnRDb2x1bW5zV2lkdGgobGVmdFdpZHRoIC0gd2lkdGgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnb1RvTmV4dFBhZ2UoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGxlZnRXaWR0aCA9IHRoaXMuZ2V0TGVmdENvbHVtbnNXaWR0aCgpO1xuICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMuZ2V0Q29sdW1uV2lkdGgoKTtcblxuICAgICAgICB0aGlzLnNldExlZnRDb2x1bW5zV2lkdGgobGVmdFdpZHRoICsgd2lkdGgpO1xuICAgIH1cblxuICAgIC8qKiBHb2VzIHRvIGEgcG9zaXRpb24gc3BlY2lmaWVkIGJ5IGEgbnVtYmVyIGluIHRoZSByYW5nZSBbMC4uMV0uXG4gICAgICAgIFRoZSBwb3NpdGlvbiBzaG91bGQgYmUgYSBudW1iZXIgYXMgcmV0dXJuZWQgYnkgZ2V0Q3VycmVudFBvc2l0aW9uLFxuICAgICAgICBvciAxIHRvIGdvIHRvIHRoZSBsYXN0IHBhZ2UuIFRoZSBwb3NpdGlvbiB3aWxsIGJlIHJvdW5kZWQgZG93biBzb1xuICAgICAgICBpdCBtYXRjaGVzIHRoZSBwb3NpdGlvbiBvZiBvbmUgb2YgdGhlIGNvbHVtbnMuICovXG4gICAgLyoqIEBwYXJhbSBwb3NpdGlvbiBOdW1iZXIgaW4gcmFuZ2UgWzAuLjFdICovXG4gICAgcHVibGljIGdvVG9Qb3NpdGlvbihwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0U2l6ZSgpO1xuICAgICAgICAvLyBJZiB0aGUgd2luZG93IGhhcyBjaGFuZ2VkIHNpemUgc2luY2UgdGhlIGNvbHVtbnMgd2VyZSBzZXQgdXAsXG4gICAgICAgIC8vIHdlIG5lZWQgdG8gcmVzZXQgcG9zaXRpb24gc28gd2UgY2FuIGRldGVybWluZSB0aGUgbmV3IHRvdGFsIHdpZHRoLlxuICAgICAgICB0aGlzLnNldExlZnRDb2x1bW5zV2lkdGgoMCk7XG5cbiAgICAgICAgY29uc3Qgd2lkdGggPSB0aGlzLmdldENvbHVtbldpZHRoKCk7XG4gICAgICAgIGNvbnN0IHJpZ2h0V2lkdGggPSB0aGlzLmdldFJpZ2h0Q29sdW1uc1dpZHRoKCk7XG4gICAgICAgIGNvbnN0IHRvdGFsV2lkdGggPSB3aWR0aCArIHJpZ2h0V2lkdGg7XG5cbiAgICAgICAgY29uc3QgbmV3TGVmdFdpZHRoID0gcG9zaXRpb24gKiB0b3RhbFdpZHRoO1xuXG4gICAgICAgIC8vIFJvdW5kIHRoZSBuZXcgbGVmdCB3aWR0aCBzbyBpdCdzIGEgbXVsdGlwbGUgb2YgdGhlIGNvbHVtbiB3aWR0aC5cblxuICAgICAgICBsZXQgcm91bmRlZExlZnRXaWR0aCA9IE1hdGgucm91bmQobmV3TGVmdFdpZHRoIC8gd2lkdGgpICogd2lkdGg7XG4gICAgICAgIGlmIChyb3VuZGVkTGVmdFdpZHRoID49IHRvdGFsV2lkdGgpIHtcbiAgICAgICAgICAgIC8vIFdlJ3ZlIGdvbmUgdG9vIGZhciBhbmQgYWxsIHRoZSBjb2x1bW5zIGFyZSBvZmYgdG8gdGhlIGxlZnQuXG4gICAgICAgICAgICAvLyBNb3ZlIG9uZSBjb2x1bW4gYmFjayBpbnRvIHRoZSB2aWV3cG9ydC5cbiAgICAgICAgICAgIHJvdW5kZWRMZWZ0V2lkdGggPSByb3VuZGVkTGVmdFdpZHRoIC0gd2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRMZWZ0Q29sdW1uc1dpZHRoKHJvdW5kZWRMZWZ0V2lkdGgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnb1RvRWxlbWVudChlbGVtZW50SWQ6IHN0cmluZywgcmVsYXRpdmU/OiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSAodGhpcy5ib29rRWxlbWVudC5jb250ZW50RG9jdW1lbnQgYXMgYW55KS5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgLy8gR2V0IHRoZSBlbGVtZW50J3MgcG9zaXRpb24gaW4gdGhlIGlmcmFtZSwgYW5kXG4gICAgICAgICAgICAvLyByb3VuZCB0aGF0IHRvIGZpZ3VyZSBvdXQgdGhlIGNvbHVtbiBpdCdzIGluLlxuXG4gICAgICAgICAgICAvLyBUaGVyZSBpcyBhIGJ1ZyBpbiBTYWZhcmkgd2hlbiB1c2luZyBnZXRCb3VuZGluZ0NsaWVudFJlY3RcbiAgICAgICAgICAgIC8vIG9uIGFuIGVsZW1lbnQgdGhhdCBzcGFucyBtdWx0aXBsZSBjb2x1bW5zLiBUZW1wb3JhcmlseVxuICAgICAgICAgICAgLy8gc2V0IHRoZSBlbGVtZW50J3MgaGVpZ2h0IHRvIGZpdCBpdCBvbiBvbmUgY29sdW1uIHNvIHdlXG4gICAgICAgICAgICAvLyBjYW4gZGV0ZXJtaW5lIHRoZSBmaXJzdCBjb2x1bW4gcG9zaXRpb24uXG4gICAgICAgICAgICBjb25zdCBvcmlnaW5hbEhlaWdodCA9IGVsZW1lbnQuc3R5bGUuaGVpZ2h0O1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBcIjBcIjtcblxuICAgICAgICAgICAgY29uc3QgbGVmdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gdGhpcy5nZXRDb2x1bW5XaWR0aCgpO1xuICAgICAgICAgICAgbGV0IHJvdW5kZWRMZWZ0V2lkdGggPSBNYXRoLmZsb29yKGxlZnQgLyB3aWR0aCkgKiB3aWR0aDtcbiAgICAgICAgICAgIGlmIChyZWxhdGl2ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbiA9IHRoaXMuZ2V0TGVmdENvbHVtbnNXaWR0aCgpO1xuICAgICAgICAgICAgICAgIHJvdW5kZWRMZWZ0V2lkdGggPSAoTWF0aC5mbG9vcihsZWZ0IC8gd2lkdGgpICogd2lkdGgpICsgb3JpZ2luO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSZXN0b3JlIGVsZW1lbnQncyBvcmlnaW5hbCBoZWlnaHQuXG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmhlaWdodCA9IG9yaWdpbmFsSGVpZ2h0O1xuXG4gICAgICAgICAgICB0aGlzLnNldExlZnRDb2x1bW5zV2lkdGgocm91bmRlZExlZnRXaWR0aCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvKiogUmV0dXJucyB0aGUgY3VycmVudCB3aWR0aCBvZiB0aGUgZG9jdW1lbnQuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xufVxuXG4vKiogUmV0dXJucyB0aGUgY3VycmVudCBoZWlnaHQgb2YgdGhlIGRvY3VtZW50LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEhlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xufVxuXG4vKiogUmV0dXJucyB0cnVlIGlmIHRoZSBicm93c2VyIGlzIHpvb21lZCBpbiB3aXRoIHBpbmNoLXRvLXpvb20gb24gbW9iaWxlLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzWm9vbWVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoZ2V0V2lkdGgoKSAhPT0gd2luZG93LmlubmVyV2lkdGgpO1xufSIsImltcG9ydCBCb29rVGhlbWUgZnJvbSBcIi4vQm9va1RoZW1lXCI7XG5pbXBvcnQgKiBhcyBIVE1MVXRpbGl0aWVzIGZyb20gXCIuL0hUTUxVdGlsaXRpZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmlnaHRUaGVtZSBpbXBsZW1lbnRzIEJvb2tUaGVtZSB7XG4gIHB1YmxpYyByZWFkb25seSBuYW1lID0gXCJuaWdodC10aGVtZVwiO1xuICBwdWJsaWMgcmVhZG9ubHkgbGFiZWwgPSBcIk5pZ2h0XCI7XG5cbiAgcHVibGljIHJvb3RFbGVtZW50OiBIVE1MSHRtbEVsZW1lbnQ7XG4gIHB1YmxpYyBib29rRWxlbWVudDogSFRNTElGcmFtZUVsZW1lbnQ7XG5cbiAgcHVibGljIHN0YXJ0KCk6IHZvaWQge1xuICAgIGNvbnN0IHJvb3RFbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIGNvbnN0IHJvb3RGcmFtZSA9IEhUTUxVdGlsaXRpZXMuZmluZFJlcXVpcmVkSWZyYW1lRWxlbWVudCh0aGlzLmJvb2tFbGVtZW50LmNvbnRlbnREb2N1bWVudCwgXCJodG1sXCIpIGFzIEhUTUxIdG1sRWxlbWVudDtcblxuICAgIEhUTUxVdGlsaXRpZXMuc2V0QXR0cihyb290RWxlbWVudCwgXCJkYXRhLXZpZXdlci10aGVtZVwiLCBcIm5pZ2h0XCIpO1xuICAgIEhUTUxVdGlsaXRpZXMuY3JlYXRlU3R5bGVzaGVldChyb290RnJhbWUsIFwibmlnaHQtbW9kZS1pbnRlcm5hbFwiLCBcIjpyb290IHtiYWNrZ3JvdW5kLWNvbG9yOiAjMTExICFpbXBvcnRhbnQ7IGNvbG9yOiAjRkZGRkZGICFpbXBvcnRhbnR9IDpub3QoYSkge2JhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7IGNvbG9yOiAjRkZGRkZGICFpbXBvcnRhbnQ7IGJvcmRlci1jb2xvcjogY3VycmVudENvbG9yICFpbXBvcnRhbnQ7fSBhIHtjb2xvcjogIzUzQ0VFQSAhaW1wb3J0YW50O31cIik7XG4gIH1cblxuICBwdWJsaWMgc3RvcCgpOiB2b2lkIHtcbiAgICBjb25zdCByb290RWxlbWVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICBjb25zdCByb290RnJhbWUgPSBIVE1MVXRpbGl0aWVzLmZpbmRSZXF1aXJlZElmcmFtZUVsZW1lbnQodGhpcy5ib29rRWxlbWVudC5jb250ZW50RG9jdW1lbnQsIFwiaHRtbFwiKSBhcyBIVE1MSHRtbEVsZW1lbnQ7XG5cbiAgICBIVE1MVXRpbGl0aWVzLnJlbW92ZUF0dHIocm9vdEVsZW1lbnQsIFwiZGF0YS12aWV3ZXItdGhlbWVcIik7XG4gICAgSFRNTFV0aWxpdGllcy5yZW1vdmVTdHlsZXNoZWV0KHJvb3RGcmFtZSwgXCJuaWdodC1tb2RlLWludGVybmFsXCIpO1xuICB9XG59IiwiaW1wb3J0IEJvb2tWaWV3IGZyb20gXCIuL0Jvb2tWaWV3XCI7XG5pbXBvcnQgKiBhcyBCcm93c2VyVXRpbGl0aWVzIGZyb20gXCIuL0Jyb3dzZXJVdGlsaXRpZXNcIjtcbmltcG9ydCAqIGFzIEhUTUxVdGlsaXRpZXMgZnJvbSBcIi4vSFRNTFV0aWxpdGllc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JvbGxpbmdCb29rVmlldyBpbXBsZW1lbnRzIEJvb2tWaWV3IHtcbiAgICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9IFwic2Nyb2xsaW5nLWJvb2stdmlld1wiO1xuICAgIHB1YmxpYyByZWFkb25seSBsYWJlbCA9IFwiU2Nyb2xsaW5nXCI7XG5cbiAgICBwdWJsaWMgYm9va0VsZW1lbnQ6IEhUTUxJRnJhbWVFbGVtZW50O1xuICAgIHB1YmxpYyBzaWRlTWFyZ2luOiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBoZWlnaHQ6IG51bWJlciA9IDA7XG5cbiAgICBwcml2YXRlIHNldElGcmFtZVNpemUoKTogdm9pZCB7XG4gICAgICAgIC8vIFJlbW92ZSBwcmV2aW91cyBpZnJhbWUgaGVpZ2h0IHNvIGJvZHkgc2Nyb2xsIGhlaWdodCB3aWxsIGJlIGFjY3VyYXRlLlxuICAgICAgICB0aGlzLmJvb2tFbGVtZW50LnN0eWxlLmhlaWdodCA9IFwiXCI7XG4gICAgICAgIHRoaXMuYm9va0VsZW1lbnQuc3R5bGUud2lkdGggPSBCcm93c2VyVXRpbGl0aWVzLmdldFdpZHRoKCkgKyBcInB4XCI7XG5cbiAgICAgICAgY29uc3QgYm9keSA9IEhUTUxVdGlsaXRpZXMuZmluZFJlcXVpcmVkSWZyYW1lRWxlbWVudCh0aGlzLmJvb2tFbGVtZW50LmNvbnRlbnREb2N1bWVudCwgXCJib2R5XCIpIGFzIEhUTUxCb2R5RWxlbWVudDtcblxuICAgICAgICBjb25zdCB3aWR0aCA9IChCcm93c2VyVXRpbGl0aWVzLmdldFdpZHRoKCkgLSB0aGlzLnNpZGVNYXJnaW4gKiAyKSArIFwicHhcIjtcbiAgICAgICAgYm9keS5zdHlsZS53aWR0aCA9IHdpZHRoO1xuICAgICAgICBib2R5LnN0eWxlLm1hcmdpbkxlZnQgPSB0aGlzLnNpZGVNYXJnaW4gKyBcInB4XCI7XG4gICAgICAgIGJvZHkuc3R5bGUubWFyZ2luUmlnaHQgPSB0aGlzLnNpZGVNYXJnaW4gKyBcInB4XCI7XG5cbiAgICAgICAgY29uc3QgbWluSGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgICAgIGNvbnN0IGJvZHlIZWlnaHQgPSBib2R5LnNjcm9sbEhlaWdodDtcbiAgICAgICAgdGhpcy5ib29rRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBNYXRoLm1heChtaW5IZWlnaHQsIGJvZHlIZWlnaHQpICsgXCJweFwiO1xuXG4gICAgICAgIGNvbnN0IGltYWdlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGJvZHkucXVlcnlTZWxlY3RvckFsbChcImltZ1wiKSk7XG4gICAgICAgIGZvciAoY29uc3QgaW1hZ2Ugb2YgaW1hZ2VzKSB7XG4gICAgICAgICAgICBpbWFnZS5zdHlsZS5tYXhXaWR0aCA9IHdpZHRoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXJ0KHBvc2l0aW9uOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nb1RvUG9zaXRpb24ocG9zaXRpb24pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdG9wKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmJvb2tFbGVtZW50LnN0eWxlLmhlaWdodCA9IFwiXCI7XG4gICAgICAgIHRoaXMuYm9va0VsZW1lbnQuc3R5bGUud2lkdGggPSBcIlwiO1xuXG4gICAgICAgIGNvbnN0IGJvZHkgPSBIVE1MVXRpbGl0aWVzLmZpbmRSZXF1aXJlZElmcmFtZUVsZW1lbnQodGhpcy5ib29rRWxlbWVudC5jb250ZW50RG9jdW1lbnQsIFwiYm9keVwiKSBhcyBIVE1MQm9keUVsZW1lbnQ7XG4gICAgICAgIGJvZHkuc3R5bGUud2lkdGggPSBcIlwiO1xuICAgICAgICBib2R5LnN0eWxlLm1hcmdpbkxlZnQgPSBcIlwiO1xuICAgICAgICBib2R5LnN0eWxlLm1hcmdpblJpZ2h0ID0gXCJcIjtcblxuICAgICAgICBjb25zdCBpbWFnZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbWdcIikpO1xuICAgICAgICBmb3IgKGNvbnN0IGltYWdlIG9mIGltYWdlcykge1xuICAgICAgICAgICAgaW1hZ2Uuc3R5bGUubWF4V2lkdGggPSBcIlwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldEN1cnJlbnRQb3NpdGlvbigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgLyBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXRCb3R0b20oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQgLSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCkgPT09IEJyb3dzZXJVdGlsaXRpZXMuZ2V0SGVpZ2h0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdvVG9Qb3NpdGlvbihwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0SUZyYW1lU2l6ZSgpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0ICogcG9zaXRpb247XG4gICAgfVxuXG4gICAgcHVibGljIGdvVG9FbGVtZW50KGVsZW1lbnRJZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSAodGhpcy5ib29rRWxlbWVudC5jb250ZW50RG9jdW1lbnQgYXMgYW55KS5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgLy8gUHV0IHRoZSBlbGVtZW50IGFzIGNsb3NlIHRvIHRoZSB0b3AgYXMgcG9zc2libGUuXG4gICAgICAgICAgICBlbGVtZW50LnNjcm9sbEludG9WaWV3KCk7XG5cbiAgICAgICAgICAgIC8vIFVubGVzcyB3ZSdyZSBhbHJlYWR5IGF0IHRoZSBib3R0b20sIHNjcm9sbCB1cCBzbyB0aGUgZWxlbWVudCBpc1xuICAgICAgICAgICAgLy8gaW4gdGhlIG1pZGRsZSwgYW5kIG5vdCBjb3ZlcmVkIGJ5IHRoZSB0b3AgbmF2LlxuICAgICAgICAgICAgaWYgKChkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCAtIGVsZW1lbnQub2Zmc2V0VG9wKSA+PSB0aGlzLmhlaWdodCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gTWF0aC5tYXgoMCwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgLSB0aGlzLmhlaWdodCAvIDMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IEFubm90YXRvciBmcm9tIFwiLi9Bbm5vdGF0b3JcIjtcbmltcG9ydCBTdG9yZSBmcm9tIFwiLi9TdG9yZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIExvY2FsQW5ub3RhdG9yQ29uZmlnIHtcbiAgICBzdG9yZTogU3RvcmU7XG59XG5cbi8qKiBBbm5vdGF0b3IgdGhhdCBzdG9yZXMgYW5ub3RhdGlvbnMgbG9jYWxseSwgaW4gdGhlIGJyb3dzZXIuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2NhbEFubm90YXRvciBpbXBsZW1lbnRzIEFubm90YXRvciB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBzdG9yZTogU3RvcmU7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgTEFTVF9SRUFESU5HX1BPU0lUSU9OID0gXCJsYXN0LXJlYWRpbmctcG9zaXRpb25cIjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb25maWc6IExvY2FsQW5ub3RhdG9yQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuc3RvcmUgPSBjb25maWcuc3RvcmU7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGdldExhc3RSZWFkaW5nUG9zaXRpb24oKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgY29uc3QgcG9zaXRpb25TdHJpbmcgPSBhd2FpdCB0aGlzLnN0b3JlLmdldChMb2NhbEFubm90YXRvci5MQVNUX1JFQURJTkdfUE9TSVRJT04pO1xuICAgICAgICBpZiAocG9zaXRpb25TdHJpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gSlNPTi5wYXJzZShwb3NpdGlvblN0cmluZyk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiByZXNvbHZlKHBvc2l0aW9uKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gcmVzb2x2ZSgpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgc2F2ZUxhc3RSZWFkaW5nUG9zaXRpb24ocG9zaXRpb246IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBwb3NpdGlvblN0cmluZyA9IEpTT04uc3RyaW5naWZ5KHBvc2l0aW9uKTtcbiAgICAgICAgYXdhaXQgdGhpcy5zdG9yZS5zZXQoTG9jYWxBbm5vdGF0b3IuTEFTVF9SRUFESU5HX1BPU0lUSU9OLCBwb3NpdGlvblN0cmluZyk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHJlc29sdmUoKSk7XG4gICAgfSAgICBcbn0iLCJpbXBvcnQgQm9va1ZpZXcgZnJvbSBcIi4vQm9va1ZpZXdcIjtcbmltcG9ydCBCb29rVGhlbWUgZnJvbSBcIi4vQm9va1RoZW1lXCI7XG5pbXBvcnQgQm9va0ZvbnQgZnJvbSBcIi4vQm9va0ZvbnRcIjtcbmltcG9ydCAqIGFzIEhUTUxVdGlsaXRpZXMgZnJvbSBcIi4vSFRNTFV0aWxpdGllc1wiO1xuaW1wb3J0IFN0b3JlIGZyb20gXCIuL1N0b3JlXCI7XG5pbXBvcnQgKiBhcyBJY29uTGliIGZyb20gXCIuL0ljb25MaWJcIjtcblxuY29uc3QgdGVtcGxhdGUgPSAoc2VjdGlvbnM6IHN0cmluZykgPT4gYFxuICAgIDx1bCBjbGFzcz1cInNldHRpbmdzLW1lbnVcIiByb2xlPVwibWVudVwiPlxuICAgICAgICAke3NlY3Rpb25zfVxuICAgIDwvdWw+XG5gO1xuXG5jb25zdCBzZWN0aW9uVGVtcGxhdGUgPSAob3B0aW9uczogc3RyaW5nKSA9PiBgXG4gICAgPGxpPjx1bCBjbGFzcz1cInNldHRpbmdzLW9wdGlvbnNcIj5cbiAgICAgICAgJHtvcHRpb25zfVxuICAgIDwvdWw+PC9saT5cbmA7XG5cbmNvbnN0IG9wdGlvblRlbXBsYXRlID0gKGxpQ2xhc3NOYW1lOiBzdHJpbmcsIGJ1dHRvbkNsYXNzTmFtZTogc3RyaW5nLCBsYWJlbDogc3RyaW5nLCByb2xlOiBzdHJpbmcsIHN2Z0ljb246IHN0cmluZywgYnV0dG9uSWQ6IHN0cmluZykgPT4gYFxuICAgIDxsaSBjbGFzcz0nJHtsaUNsYXNzTmFtZX0nPjxidXR0b24gaWQ9JyR7YnV0dG9uSWR9JyBjbGFzcz0nJHtidXR0b25DbGFzc05hbWV9JyByb2xlPScke3JvbGV9JyB0YWJpbmRleD0tMT4ke2xhYmVsfSR7c3ZnSWNvbn08L2J1dHRvbj48L2xpPlxuYDtcblxuY29uc3Qgb2ZmbGluZVRlbXBsYXRlID0gYFxuICAgIDxsaT5cbiAgICAgICAgPGRpdiBjbGFzcz0nb2ZmbGluZS1zdGF0dXMnPjwvZGl2PlxuICAgIDwvbGk+XG5gO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJvb2tTZXR0aW5nc0NvbmZpZyB7XG4gICAgLyoqIFN0b3JlIHRvIHNhdmUgdGhlIHVzZXIncyBzZWxlY3Rpb25zIGluLiAqL1xuICAgIHN0b3JlOiBTdG9yZSxcblxuICAgIC8qKiBBcnJheSBvZiBCb29rRm9udHMgKi9cbiAgICBib29rRm9udHM6IEJvb2tGb250W10sXG5cbiAgICAvKiogQXJyYXkgb2YgZm9udCBzaXplcyBpbiBwaXhlbHMgc29ydGVkIGZyb20gc21hbGxlc3QgdG8gbGFyZ2VzdC4gKi9cbiAgICBmb250U2l6ZXNJblBpeGVsczogbnVtYmVyW10sXG5cbiAgICAvKiogSW5pdGlhbCBmb250IHNpemUgdG8gdXNlIHVudGlsIHRoZSB1c2VyIG1ha2VzIGEgc2VsZWN0aW9uLiAqL1xuICAgIGRlZmF1bHRGb250U2l6ZUluUGl4ZWxzPzogbnVtYmVyLFxuXG4gICAgLyoqIEFycmF5IG9mIEJvb2tUaGVtZXMgKi9cbiAgICBib29rVGhlbWVzOiBCb29rVGhlbWVbXSxcblxuICAgIC8qKiBBcnJheSBvZiBCb29rVmlld3MuICovXG4gICAgYm9va1ZpZXdzOiBCb29rVmlld1tdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb29rU2V0dGluZ3Mge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgc3RvcmU6IFN0b3JlO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgYm9va0ZvbnRzOiBCb29rRm9udFtdO1xuICAgIHByaXZhdGUgZm9udEJ1dHRvbnM6IHsgW2tleTogc3RyaW5nXTogSFRNTEJ1dHRvbkVsZW1lbnQgfTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGZvbnRTaXplczogc3RyaW5nW107XG4gICAgcHJpdmF0ZSBmb250U2l6ZUJ1dHRvbnM6IHsgW2tleTogc3RyaW5nXTogSFRNTEJ1dHRvbkVsZW1lbnQgfTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGJvb2tUaGVtZXM6IEJvb2tUaGVtZVtdO1xuICAgIHByaXZhdGUgdGhlbWVCdXR0b25zOiB7IFtrZXk6IHN0cmluZ106IEhUTUxCdXR0b25FbGVtZW50IH07XG4gICAgcHJpdmF0ZSByZWFkb25seSBib29rVmlld3M6IEJvb2tWaWV3W107XG4gICAgcHJpdmF0ZSB2aWV3QnV0dG9uczogeyBba2V5OiBzdHJpbmddOiBIVE1MQnV0dG9uRWxlbWVudCB9O1xuXG4gICAgcHJpdmF0ZSBvZmZsaW5lU3RhdHVzRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICBwcml2YXRlIGZvbnRDaGFuZ2VDYWxsYmFjazogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuICAgIHByaXZhdGUgZm9udFNpemVDaGFuZ2VDYWxsYmFjazogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuICAgIHByaXZhdGUgdGhlbWVDaGFuZ2VDYWxsYmFjazogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuICAgIHByaXZhdGUgdmlld0NoYW5nZUNhbGxiYWNrOiAoKSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgICBwcml2YXRlIHNlbGVjdGVkRm9udDogQm9va0ZvbnQ7XG4gICAgcHJpdmF0ZSBzZWxlY3RlZEZvbnRTaXplOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBzZWxlY3RlZFRoZW1lOiBCb29rVGhlbWU7XG4gICAgcHJpdmF0ZSBzZWxlY3RlZFZpZXc6IEJvb2tWaWV3O1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgU0VMRUNURURfRk9OVF9LRVkgPSBcInNldHRpbmdzLXNlbGVjdGVkLWZvbnRcIjtcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBTRUxFQ1RFRF9GT05UX1NJWkVfS0VZID0gXCJzZXR0aW5ncy1zZWxlY3RlZC1mb250LXNpemVcIjtcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBTRUxFQ1RFRF9USEVNRV9LRVkgPSBcInNldHRpbmdzLXNlbGVjdGVkLXRoZW1lXCI7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgU0VMRUNURURfVklFV19LRVkgPSBcInNldHRpbmdzLXNlbGVjdGVkLXZpZXdcIjtcblxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgY3JlYXRlKGNvbmZpZzogQm9va1NldHRpbmdzQ29uZmlnKSB7XG4gICAgICAgIGNvbnN0IGZvbnRTaXplcyA9IGNvbmZpZy5mb250U2l6ZXNJblBpeGVscy5tYXAoZm9udFNpemUgPT4gZm9udFNpemUgKyBcInB4XCIpO1xuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IG5ldyB0aGlzKGNvbmZpZy5zdG9yZSwgY29uZmlnLmJvb2tGb250cywgZm9udFNpemVzLCBjb25maWcuYm9va1RoZW1lcywgY29uZmlnLmJvb2tWaWV3cyk7XG4gICAgICAgIGF3YWl0IHNldHRpbmdzLmluaXRpYWxpemVTZWxlY3Rpb25zKGNvbmZpZy5kZWZhdWx0Rm9udFNpemVJblBpeGVscyA/IGNvbmZpZy5kZWZhdWx0Rm9udFNpemVJblBpeGVscyArIFwicHhcIiA6IHVuZGVmaW5lZCk7XG4gICAgICAgIHJldHVybiBzZXR0aW5ncztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3Ioc3RvcmU6IFN0b3JlLCBib29rRm9udHM6IEJvb2tGb250W10sIGZvbnRTaXplczogc3RyaW5nW10sIGJvb2tUaGVtZXM6IEJvb2tUaGVtZVtdLCBib29rVmlld3M6IEJvb2tWaWV3W10pIHtcbiAgICAgICAgdGhpcy5zdG9yZSA9IHN0b3JlO1xuICAgICAgICB0aGlzLmJvb2tGb250cyA9IGJvb2tGb250cztcbiAgICAgICAgdGhpcy5mb250U2l6ZXMgPSBmb250U2l6ZXM7XG4gICAgICAgIHRoaXMuYm9va1RoZW1lcyA9IGJvb2tUaGVtZXM7XG4gICAgICAgIHRoaXMuYm9va1ZpZXdzID0gYm9va1ZpZXdzO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgaW5pdGlhbGl6ZVNlbGVjdGlvbnMoZGVmYXVsdEZvbnRTaXplPzogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGlmICh0aGlzLmJvb2tGb250cy5sZW5ndGggPj0gMSkge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkRm9udCA9IHRoaXMuYm9va0ZvbnRzWzBdO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRGb250TmFtZSA9IGF3YWl0IHRoaXMuc3RvcmUuZ2V0KEJvb2tTZXR0aW5ncy5TRUxFQ1RFRF9GT05UX0tFWSk7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRGb250TmFtZSkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYm9va0ZvbnQgb2YgdGhpcy5ib29rRm9udHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvb2tGb250Lm5hbWUgPT09IHNlbGVjdGVkRm9udE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRm9udCA9IGJvb2tGb250O1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkRm9udCA9IHNlbGVjdGVkRm9udDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmZvbnRTaXplcy5sZW5ndGggPj0gMSkge1xuICAgICAgICAgICAgLy8gRmlyc3QsIGNoZWNrIGlmIHRoZSB1c2VyIGhhcyBwcmV2aW91c2x5IHNldCBhIGZvbnQgc2l6ZS5cbiAgICAgICAgICAgIGxldCBzZWxlY3RlZEZvbnRTaXplID0gYXdhaXQgdGhpcy5zdG9yZS5nZXQoQm9va1NldHRpbmdzLlNFTEVDVEVEX0ZPTlRfU0laRV9LRVkpO1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkRm9udFNpemVJc0F2YWlsYWJsZSA9IChzZWxlY3RlZEZvbnRTaXplICYmIHRoaXMuZm9udFNpemVzLmluZGV4T2Yoc2VsZWN0ZWRGb250U2l6ZSkgIT09IC0xKTtcbiAgICAgICAgICAgIC8vIElmIG5vdCwgb3IgdGhlIHVzZXIgc2VsZWN0ZWQgYSBzaXplIHRoYXQncyBubyBsb25nZXIgYW4gb3B0aW9uLCBpcyB0aGVyZSBhIGRlZmF1bHQgZm9udCBzaXplP1xuICAgICAgICAgICAgaWYgKCghc2VsZWN0ZWRGb250U2l6ZSB8fCAhc2VsZWN0ZWRGb250U2l6ZUlzQXZhaWxhYmxlKSAmJiBkZWZhdWx0Rm9udFNpemUpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEZvbnRTaXplID0gZGVmYXVsdEZvbnRTaXplO1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkRm9udFNpemVJc0F2YWlsYWJsZSA9IChzZWxlY3RlZEZvbnRTaXplICYmIHRoaXMuZm9udFNpemVzLmluZGV4T2Yoc2VsZWN0ZWRGb250U2l6ZSkgIT09IC0xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIHRoZXJlJ3Mgbm8gc2VsZWN0aW9uIGFuZCBubyBkZWZhdWx0LCBwaWNrIGEgZm9udCBzaXplIGluIHRoZSBtaWRkbGUgb2YgdGhlIG9wdGlvbnMuXG4gICAgICAgICAgICBpZiAoIXNlbGVjdGVkRm9udFNpemUgfHwgIXNlbGVjdGVkRm9udFNpemVJc0F2YWlsYWJsZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGF2ZXJhZ2VGb250U2l6ZUluZGV4ID0gTWF0aC5mbG9vcih0aGlzLmZvbnRTaXplcy5sZW5ndGggLyAyKTtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEZvbnRTaXplID0gdGhpcy5mb250U2l6ZXNbYXZlcmFnZUZvbnRTaXplSW5kZXhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEZvbnRTaXplID0gc2VsZWN0ZWRGb250U2l6ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmJvb2tUaGVtZXMubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZFRoZW1lID0gdGhpcy5ib29rVGhlbWVzWzBdO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRUaGVtZU5hbWUgPSBhd2FpdCB0aGlzLnN0b3JlLmdldChCb29rU2V0dGluZ3MuU0VMRUNURURfVEhFTUVfS0VZKTtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZFRoZW1lTmFtZSkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYm9va1RoZW1lIG9mIHRoaXMuYm9va1RoZW1lcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYm9va1RoZW1lLm5hbWUgPT09IHNlbGVjdGVkVGhlbWVOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFRoZW1lID0gYm9va1RoZW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkVGhlbWUgPSBzZWxlY3RlZFRoZW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYm9va1ZpZXdzLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRWaWV3ID0gdGhpcy5ib29rVmlld3NbMF07XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFZpZXdOYW1lID0gYXdhaXQgdGhpcy5zdG9yZS5nZXQoQm9va1NldHRpbmdzLlNFTEVDVEVEX1ZJRVdfS0VZKTtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZFZpZXdOYW1lKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBib29rVmlldyBvZiB0aGlzLmJvb2tWaWV3cykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYm9va1ZpZXcubmFtZSA9PT0gc2VsZWN0ZWRWaWV3TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRWaWV3ID0gYm9va1ZpZXc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRWaWV3ID0gc2VsZWN0ZWRWaWV3O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHJlbmRlckNvbnRyb2xzKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNlY3Rpb25zID0gW107XG5cbiAgICAgICAgaWYgKHRoaXMuYm9va0ZvbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGZvbnRPcHRpb25zID0gdGhpcy5ib29rRm9udHMubWFwKGJvb2tGb250ID0+XG4gICAgICAgICAgICAgICAgb3B0aW9uVGVtcGxhdGUoXCJyZWFkaW5nLXN0eWxlXCIsIGJvb2tGb250Lm5hbWUsIGJvb2tGb250LmxhYmVsLCBcIm1lbnVpdGVtXCIsIEljb25MaWIuaWNvbnMuY2hlY2tEdXBlLCBib29rRm9udC5sYWJlbClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBzZWN0aW9ucy5wdXNoKHNlY3Rpb25UZW1wbGF0ZShmb250T3B0aW9ucy5qb2luKFwiXCIpKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5mb250U2l6ZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgY29uc3QgZm9udFNpemVPcHRpb25zID0gb3B0aW9uVGVtcGxhdGUoXCJmb250LXNldHRpbmdcIiwgXCJkZWNyZWFzZVwiLCBcIkEtXCIsIFwibWVudWl0ZW1cIiwgXCJcIiwgXCJkZWNyZWFzZS1mb250XCIpICsgb3B0aW9uVGVtcGxhdGUoXCJmb250LXNldHRpbmdcIiwgXCJpbmNyZWFzZVwiLCBcIkErXCIsIFwibWVudWl0ZW1cIiwgXCJcIiwgXCJpbmNyZWFzZS1mb250XCIpO1xuICAgICAgICAgICAgc2VjdGlvbnMucHVzaChzZWN0aW9uVGVtcGxhdGUoZm9udFNpemVPcHRpb25zKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5ib29rVGhlbWVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IHRoZW1lT3B0aW9ucyA9IHRoaXMuYm9va1RoZW1lcy5tYXAoYm9va1RoZW1lID0+XG4gICAgICAgICAgICAgICAgb3B0aW9uVGVtcGxhdGUoXCJyZWFkaW5nLXRoZW1lXCIsIGJvb2tUaGVtZS5uYW1lLCBib29rVGhlbWUubGFiZWwsIFwibWVudWl0ZW1cIiwgSWNvbkxpYi5pY29ucy5jaGVja0R1cGUsIGJvb2tUaGVtZS5sYWJlbClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBzZWN0aW9ucy5wdXNoKHNlY3Rpb25UZW1wbGF0ZSh0aGVtZU9wdGlvbnMuam9pbihcIlwiKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYm9va1ZpZXdzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IHZpZXdPcHRpb25zID0gdGhpcy5ib29rVmlld3MubWFwKGJvb2tWaWV3ID0+XG4gICAgICAgICAgICAgICAgb3B0aW9uVGVtcGxhdGUoXCJyZWFkaW5nLXN0eWxlXCIsIGJvb2tWaWV3Lm5hbWUsIGJvb2tWaWV3LmxhYmVsLCBcIm1lbnVpdGVtXCIsIEljb25MaWIuaWNvbnMuY2hlY2tEdXBlLCBib29rVmlldy5sYWJlbClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBzZWN0aW9ucy5wdXNoKHNlY3Rpb25UZW1wbGF0ZSh2aWV3T3B0aW9ucy5qb2luKFwiXCIpKSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VjdGlvbnMucHVzaChvZmZsaW5lVGVtcGxhdGUpO1xuXG4gICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gdGVtcGxhdGUoc2VjdGlvbnMuam9pbihcIlwiKSk7XG5cbiAgICAgICAgdGhpcy5mb250QnV0dG9ucyA9IHt9O1xuICAgICAgICBpZiAodGhpcy5ib29rRm9udHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBib29rRm9udCBvZiB0aGlzLmJvb2tGb250cykge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9udEJ1dHRvbnNbYm9va0ZvbnQubmFtZV0gPSBIVE1MVXRpbGl0aWVzLmZpbmRSZXF1aXJlZEVsZW1lbnQoZWxlbWVudCwgXCJidXR0b25bY2xhc3M9XCIgKyBib29rRm9udC5uYW1lICsgXCJdXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGVGb250QnV0dG9ucygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZm9udFNpemVCdXR0b25zID0ge307XG4gICAgICAgIGlmICh0aGlzLmZvbnRTaXplcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZvbnRTaXplTmFtZSBvZiBbXCJkZWNyZWFzZVwiLCBcImluY3JlYXNlXCJdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb250U2l6ZUJ1dHRvbnNbZm9udFNpemVOYW1lXSA9IEhUTUxVdGlsaXRpZXMuZmluZFJlcXVpcmVkRWxlbWVudChlbGVtZW50LCBcImJ1dHRvbltjbGFzcz1cIiArIGZvbnRTaXplTmFtZSArIFwiXVwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudXBkYXRlRm9udFNpemVCdXR0b25zKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50aGVtZUJ1dHRvbnMgPSB7fTtcbiAgICAgICAgaWYgKHRoaXMuYm9va1RoZW1lcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGJvb2tUaGVtZSBvZiB0aGlzLmJvb2tUaGVtZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRoZW1lQnV0dG9uc1tib29rVGhlbWUubmFtZV0gPSBIVE1MVXRpbGl0aWVzLmZpbmRSZXF1aXJlZEVsZW1lbnQoZWxlbWVudCwgXCJidXR0b25bY2xhc3M9XCIgKyBib29rVGhlbWUubmFtZSArIFwiXVwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGhlbWVCdXR0b25zKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52aWV3QnV0dG9ucyA9IHt9O1xuICAgICAgICBpZiAodGhpcy5ib29rVmlld3MubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBib29rVmlldyBvZiB0aGlzLmJvb2tWaWV3cykge1xuICAgICAgICAgICAgICAgIHRoaXMudmlld0J1dHRvbnNbYm9va1ZpZXcubmFtZV0gPSBIVE1MVXRpbGl0aWVzLmZpbmRSZXF1aXJlZEVsZW1lbnQoZWxlbWVudCwgXCJidXR0b25bY2xhc3M9XCIgKyBib29rVmlldy5uYW1lICsgXCJdXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGVWaWV3QnV0dG9ucygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vZmZsaW5lU3RhdHVzRWxlbWVudCA9IEhUTUxVdGlsaXRpZXMuZmluZFJlcXVpcmVkRWxlbWVudChlbGVtZW50LCAnZGl2W2NsYXNzPVwib2ZmbGluZS1zdGF0dXNcIl0nKSBhcyBIVE1MRWxlbWVudDtcblxuICAgICAgICB0aGlzLnNldHVwRXZlbnRzKCk7XG5cbiAgICAgICAgLy8gQ2xpY2tpbmcgdGhlIHNldHRpbmdzIHZpZXcgb3V0c2lkZSB0aGUgdWwgaGlkZXMgaXQsIGJ1dCBjbGlja2luZyBpbnNpZGUgdGhlIHVsIGtlZXBzIGl0IHVwLlxuICAgICAgICBIVE1MVXRpbGl0aWVzLmZpbmRSZXF1aXJlZEVsZW1lbnQoZWxlbWVudCwgXCJ1bFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkZvbnRDaGFuZ2UoY2FsbGJhY2s6ICgpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5mb250Q2hhbmdlQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICBwdWJsaWMgb25Gb250U2l6ZUNoYW5nZShjYWxsYmFjazogKCkgPT4gdm9pZCkge1xuICAgICAgICB0aGlzLmZvbnRTaXplQ2hhbmdlQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICBwdWJsaWMgb25UaGVtZUNoYW5nZShjYWxsYmFjazogKCkgPT4gdm9pZCkge1xuICAgICAgICB0aGlzLnRoZW1lQ2hhbmdlQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICBwdWJsaWMgb25WaWV3Q2hhbmdlKGNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMudmlld0NoYW5nZUNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXR1cEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgZm9yIChjb25zdCBmb250IG9mIHRoaXMuYm9va0ZvbnRzKSB7XG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSB0aGlzLmZvbnRCdXR0b25zW2ZvbnQubmFtZV07XG4gICAgICAgICAgICBpZiAoYnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEZvbnQuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICBmb250LnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRGb250ID0gZm9udDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVGb250QnV0dG9ucygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JlU2VsZWN0ZWRGb250KGZvbnQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvbnRDaGFuZ2VDYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZm9udFNpemVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZm9udFNpemVCdXR0b25zW1wiZGVjcmVhc2VcIl0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRGb250U2l6ZUluZGV4ID0gdGhpcy5mb250U2l6ZXMuaW5kZXhPZih0aGlzLnNlbGVjdGVkRm9udFNpemUpO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Rm9udFNpemVJbmRleCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3Rm9udFNpemUgPSB0aGlzLmZvbnRTaXplc1tjdXJyZW50Rm9udFNpemVJbmRleCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRm9udFNpemUgPSBuZXdGb250U2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb250U2l6ZUNoYW5nZUNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRm9udFNpemVCdXR0b25zKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmVTZWxlY3RlZEZvbnRTaXplKG5ld0ZvbnRTaXplKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmZvbnRTaXplQnV0dG9uc1tcImluY3JlYXNlXCJdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50Rm9udFNpemVJbmRleCA9IHRoaXMuZm9udFNpemVzLmluZGV4T2YodGhpcy5zZWxlY3RlZEZvbnRTaXplKTtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudEZvbnRTaXplSW5kZXggPCB0aGlzLmZvbnRTaXplcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0ZvbnRTaXplID0gdGhpcy5mb250U2l6ZXNbY3VycmVudEZvbnRTaXplSW5kZXggKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEZvbnRTaXplID0gbmV3Rm9udFNpemU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9udFNpemVDaGFuZ2VDYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUZvbnRTaXplQnV0dG9ucygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JlU2VsZWN0ZWRGb250U2l6ZShuZXdGb250U2l6ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3QgdGhlbWUgb2YgdGhpcy5ib29rVGhlbWVzKSB7XG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSB0aGlzLnRoZW1lQnV0dG9uc1t0aGVtZS5uYW1lXTtcbiAgICAgICAgICAgIGlmIChidXR0b24pIHtcbiAgICAgICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkVGhlbWUuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGVtZS5zdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkVGhlbWUgPSB0aGVtZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUaGVtZUJ1dHRvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yZVNlbGVjdGVkVGhlbWUodGhlbWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRoZW1lQ2hhbmdlQ2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3QgdmlldyBvZiB0aGlzLmJvb2tWaWV3cykge1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gdGhpcy52aWV3QnV0dG9uc1t2aWV3Lm5hbWVdO1xuICAgICAgICAgICAgaWYgKGJ1dHRvbikge1xuICAgICAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5zZWxlY3RlZFZpZXcuZ2V0Q3VycmVudFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRWaWV3LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgdmlldy5zdGFydChwb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRWaWV3ID0gdmlldztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWaWV3QnV0dG9ucygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JlU2VsZWN0ZWRWaWV3KHZpZXcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDaGFuZ2VDYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVGb250QnV0dG9ucygpOiB2b2lkIHtcbiAgICAgICAgZm9yIChjb25zdCBmb250IG9mIHRoaXMuYm9va0ZvbnRzKSB7XG4gICAgICAgICAgICBpZiAoZm9udCA9PT0gdGhpcy5zZWxlY3RlZEZvbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvbnRCdXR0b25zW2ZvbnQubmFtZV0uY2xhc3NOYW1lID0gZm9udC5uYW1lICsgXCIgYWN0aXZlXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5mb250QnV0dG9uc1tmb250Lm5hbWVdLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgZm9udC5sYWJlbCArIFwiIGZvbnQgZW5hYmxlZFwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb250QnV0dG9uc1tmb250Lm5hbWVdLmNsYXNzTmFtZSA9IGZvbnQubmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLmZvbnRCdXR0b25zW2ZvbnQubmFtZV0uc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBmb250LmxhYmVsICsgXCIgZm9udCBkaXNhYmxlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlRm9udFNpemVCdXR0b25zKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjdXJyZW50Rm9udFNpemVJbmRleCA9IHRoaXMuZm9udFNpemVzLmluZGV4T2YodGhpcy5zZWxlY3RlZEZvbnRTaXplKTtcblxuICAgICAgICBpZiAoY3VycmVudEZvbnRTaXplSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZm9udFNpemVCdXR0b25zW1wiZGVjcmVhc2VcIl0uY2xhc3NOYW1lID0gXCJkZWNyZWFzZSBkaXNhYmxlZFwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mb250U2l6ZUJ1dHRvbnNbXCJkZWNyZWFzZVwiXS5jbGFzc05hbWUgPSBcImRlY3JlYXNlXCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3VycmVudEZvbnRTaXplSW5kZXggPT09IHRoaXMuZm9udFNpemVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHRoaXMuZm9udFNpemVCdXR0b25zW1wiaW5jcmVhc2VcIl0uY2xhc3NOYW1lID0gXCJpbmNyZWFzZSBkaXNhYmxlZFwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mb250U2l6ZUJ1dHRvbnNbXCJpbmNyZWFzZVwiXS5jbGFzc05hbWUgPSBcImluY3JlYXNlXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVRoZW1lQnV0dG9ucygpOiB2b2lkIHtcbiAgICAgICAgZm9yIChjb25zdCB0aGVtZSBvZiB0aGlzLmJvb2tUaGVtZXMpIHtcbiAgICAgICAgICAgIGlmICh0aGVtZSA9PT0gdGhpcy5zZWxlY3RlZFRoZW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aGVtZUJ1dHRvbnNbdGhlbWUubmFtZV0uY2xhc3NOYW1lID0gdGhlbWUubmFtZSArIFwiIGFjdGl2ZVwiO1xuICAgICAgICAgICAgICAgIHRoaXMudGhlbWVCdXR0b25zW3RoZW1lLm5hbWVdLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgdGhlbWUubGFiZWwgKyBcIiBtb2RlIGVuYWJsZWRcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudGhlbWVCdXR0b25zW3RoZW1lLm5hbWVdLmNsYXNzTmFtZSA9IHRoZW1lLm5hbWU7XG4gICAgICAgICAgICAgICAgdGhpcy50aGVtZUJ1dHRvbnNbdGhlbWUubmFtZV0uc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCB0aGVtZS5sYWJlbCArIFwiIG1vZGUgZGlzYWJsZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVZpZXdCdXR0b25zKCk6IHZvaWQge1xuICAgICAgICBmb3IgKGNvbnN0IHZpZXcgb2YgdGhpcy5ib29rVmlld3MpIHtcbiAgICAgICAgICAgIGlmICh2aWV3ID09PSB0aGlzLnNlbGVjdGVkVmlldykge1xuICAgICAgICAgICAgICAgIHRoaXMudmlld0J1dHRvbnNbdmlldy5uYW1lXS5jbGFzc05hbWUgPSB2aWV3Lm5hbWUgKyBcIiBhY3RpdmVcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdCdXR0b25zW3ZpZXcubmFtZV0uc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCB2aWV3LmxhYmVsICsgXCIgbW9kZSBlbmFibGVkXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdCdXR0b25zW3ZpZXcubmFtZV0uY2xhc3NOYW1lID0gdmlldy5uYW1lO1xuICAgICAgICAgICAgICAgIHRoaXMudmlld0J1dHRvbnNbdmlldy5uYW1lXS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIHZpZXcubGFiZWwgKyBcIiBtb2RlIGRpc2FibGVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNlbGVjdGVkRm9udCgpOiBCb29rRm9udCB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkRm9udDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2VsZWN0ZWRGb250U2l6ZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEZvbnRTaXplO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTZWxlY3RlZFRoZW1lKCk6IEJvb2tUaGVtZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkVGhlbWU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNlbGVjdGVkVmlldygpOiBCb29rVmlldyB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkVmlldztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0T2ZmbGluZVN0YXR1c0VsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5vZmZsaW5lU3RhdHVzRWxlbWVudDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIHN0b3JlU2VsZWN0ZWRGb250KGZvbnQ6IEJvb2tGb250KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JlLnNldChCb29rU2V0dGluZ3MuU0VMRUNURURfRk9OVF9LRVksIGZvbnQubmFtZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBzdG9yZVNlbGVjdGVkRm9udFNpemUoZm9udFNpemU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9yZS5zZXQoQm9va1NldHRpbmdzLlNFTEVDVEVEX0ZPTlRfU0laRV9LRVksIGZvbnRTaXplKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIHN0b3JlU2VsZWN0ZWRUaGVtZSh0aGVtZTogQm9va1RoZW1lKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JlLnNldChCb29rU2V0dGluZ3MuU0VMRUNURURfVEhFTUVfS0VZLCB0aGVtZS5uYW1lKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIHN0b3JlU2VsZWN0ZWRWaWV3KHZpZXc6IEJvb2tWaWV3KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JlLnNldChCb29rU2V0dGluZ3MuU0VMRUNURURfVklFV19LRVksIHZpZXcubmFtZSk7XG4gICAgfVxufTtcbiIsImV4cG9ydCBjb25zdCBXSURUSF9BVFRSOiBudW1iZXIgPSAyNDtcbmV4cG9ydCBjb25zdCBIRUlHSFRfQVRUUjogbnVtYmVyID0gMjQ7XG5leHBvcnQgY29uc3QgVklFV0JPWF9BVFRSOiBzdHJpbmcgPSBgMCAwIDI0IDI0YDtcblxuY29uc3QgaWNvblRlbXBsYXRlID0gKGlkOiBzdHJpbmcsIHRpdGxlOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgY2xhc3NBdHRyOiBzdHJpbmcgPSBgaWNvbmApID0+IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIiR7V0lEVEhfQVRUUn1cIiBoZWlnaHQ9XCIke0hFSUdIVF9BVFRSfVwiIHZpZXdCb3g9XCIke1ZJRVdCT1hfQVRUUn1cIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwieE1pZFlNaWQgbWVldFwiIHJvbGU9XCJpbWdcIiBjbGFzcz1cIiR7Y2xhc3NBdHRyfVwiIGFyaWEtbGFiZWxsZWRCeT1cIiR7aWR9XCI+XG4gIDx0aXRsZSBpZD1cIiR7aWR9XCI+JHt0aXRsZX08L3RpdGxlPlxuICAke3BhdGh9XG48L3N2Zz5gO1xuXG5jb25zdCBpY29uU3ltYm9sID0gKGlkOiBzdHJpbmcsIHRpdGxlOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgY2xhc3NBdHRyOiBzdHJpbmcgPSBgc3ZnSWNvbiB1c2VgKSA9PiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cInhNaWRZTWlkIG1lZXRcIiByb2xlPVwiaW1nXCIgY2xhc3M9XCIke2NsYXNzQXR0cn1cIj5cbiAgPGRlZnM+XG4gICAgPHN5bWJvbCBpZD1cIiR7aWR9XCIgdmlld0JveD1cIiR7VklFV0JPWF9BVFRSfVwiPlxuICAgICAgPHRpdGxlPiR7dGl0bGV9PC90aXRsZT5cbiAgICAgICR7cGF0aH1cbiAgICA8L3N5bWJvbD5cbiAgPC9kZWZzPlxuPC9zdmc+YDtcblxuY29uc3QgaWNvblVzZSA9IChpZDogc3RyaW5nLCBjbGFzc0F0dHI6IHN0cmluZykgPT4gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHByZXNlcnZlQXNwZWN0UmF0aW89XCJ4TWlkWU1pZCBtZWV0XCIgY2xhc3M9XCIke2NsYXNzQXR0cn1cIiByb2xlPVwiaW1nXCIgYXJpYS1sYWJlbGxlZGJ5PVwiJHtpZH1cIj5cbiAgPHVzZSB4bGluazpocmVmPVwiIyR7aWR9XCI+PC91c2U+XG48L3N2Zz5gO1xuXG5leHBvcnQgY29uc3QgaWNvbnMgPSB7XG4gIFwiY2hlY2tPcmlnaW5hbFwiOiBpY29uU3ltYm9sKGBjaGVjay1pY29uYCwgYENoZWNrZWRgLCBgPHBhdGggZD1cIk0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0wIDE4Yy00LjQxIDAtOC0zLjU5LTgtOHMzLjU5LTggOC04IDggMy41OSA4IDgtMy41OSA4LTggOHptNC41OS0xMi40MkwxMCAxNC4xN2wtMi41OS0yLjU4TDYgMTNsNCA0IDgtOHpcIi8+YCksXG4gIFwiY2hlY2tEdXBlXCI6IGljb25Vc2UoXCJjaGVjay1pY29uXCIsIFwiY2hlY2tlZEljb25cIiksXG4gIFwiY2xvc2VPcmlnaW5hbFwiOiBpY29uU3ltYm9sKGBjbG9zZS1pY29uYCwgYENsb3NlYCwgYDxwYXRoIGQ9XCJNMTIgMkM2LjQ3IDIgMiA2LjQ3IDIgMTJzNC40NyAxMCAxMCAxMCAxMC00LjQ3IDEwLTEwUzE3LjUzIDIgMTIgMnptMCAxOGMtNC40MSAwLTgtMy41OS04LThzMy41OS04IDgtOCA4IDMuNTkgOCA4LTMuNTkgOC04IDh6bTMuNTktMTNMMTIgMTAuNTkgOC40MSA3IDcgOC40MSAxMC41OSAxMiA3IDE1LjU5IDguNDEgMTcgMTIgMTMuNDEgMTUuNTkgMTcgMTcgMTUuNTkgMTMuNDEgMTIgMTcgOC40MXpcIi8+YCksXG4gIFwiY2xvc2VEdXBlXCI6IGljb25Vc2UoXCJjbG9zZS1pY29uXCIsIFwiaWNvbiBjbG9zZSBpbmFjdGl2ZS1pY29uXCIpLFxuICBcImVycm9yXCI6IGljb25UZW1wbGF0ZShgZXJyb3ItaWNvbmAsIGBXYXJuaW5nYCwgYDxwYXRoIGQ9XCJNMSAyMWgyMkwxMiAyIDEgMjF6bTEyLTNoLTJ2LTJoMnYyem0wLTRoLTJ2LTRoMnY0elwiLz5gKSxcbiAgXCJob21lXCI6IGA8cGF0aCBkPVwiTTEyIDUuNjlsNSA0LjVWMThoLTJ2LTZIOXY2SDd2LTcuODFsNS00LjVNMTIgM0wyIDEyaDN2OGg2di02aDJ2Nmg2di04aDNMMTIgM3pcIi8+YCxcbiAgXCJleHBhbmRcIjogaWNvblRlbXBsYXRlKGBleHBhbmQtaWNvbmAsIGBFbnRlciBmdWxsc2NyZWVuYCwgYDxwYXRoIGQ9XCJNNyAxNEg1djVoNXYtMkg3di0zem0tMi00aDJWN2gzVjVINXY1em0xMiA3aC0zdjJoNXYtNWgtMnYzek0xNCA1djJoM3YzaDJWNWgtNXpcIi8+YCwgYGljb24gYWN0aXZlLWljb25gKSxcbiAgXCJsb2FkaW5nXCI6IGljb25UZW1wbGF0ZShgbG9hZGluZy1pY29uYCwgYExvYWRpbmdgLCBgPHBhdGggZD1cIk0xMiA2djNsNC00LTQtNHYzYy00LjQyIDAtOCAzLjU4LTggOCAwIDEuNTcuNDYgMy4wMyAxLjI0IDQuMjZMNi43IDE0LjhjLS40NS0uODMtLjctMS43OS0uNy0yLjggMC0zLjMxIDIuNjktNiA2LTZ6bTYuNzYgMS43NEwxNy4zIDkuMmMuNDQuODQuNyAxLjc5LjcgMi44IDAgMy4zMS0yLjY5IDYtNiA2di0zbC00IDQgNCA0di0zYzQuNDIgMCA4LTMuNTggOC04IDAtMS41Ny0uNDYtMy4wMy0xLjI0LTQuMjZ6XCIvPmApLFxuICBcIm1lbnVcIjogaWNvblRlbXBsYXRlKGBtZW51LWljb25gLCBgU2hvdyBhbmQgaGlkZSBuYXZpZ2F0aW9uIGJhcmAsIGA8cGF0aCBkPVwiTTE2LjU5IDguNTlMMTIgMTMuMTcgNy40MSA4LjU5IDYgMTBsNiA2IDYtNi0xLjQxLTEuNDF6XCIvPmAsIGBpY29uIG1lbnUgb3BlbiBpbmFjdGl2ZS1pY29uYCksXG4gIFwibWluaW1pemVcIjogaWNvblRlbXBsYXRlKGBtaW5pbWl6ZS1pY29uYCwgYEV4aXQgZnVsbHNjcmVlbmAsIGA8cGF0aCBkPVwiTTUgMTZoM3YzaDJ2LTVINXYyem0zLThINXYyaDVWNUg4djN6bTYgMTFoMnYtM2gzdi0yaC01djV6bTItMTFWNWgtMnY1aDVWOGgtM3pcIi8+YCwgYGljb24gaW5hY3RpdmUtaWNvbmApLFxuICBcIm5leHRcIjogaWNvblRlbXBsYXRlKGBuZXh0LWljb25gLCBgTmV4dCBDaGFwdGVyYCwgYDxwYXRoIGQ9XCJNNi40OSAyMC4xM2wxLjc3IDEuNzcgOS45LTkuOS05LjktOS45LTEuNzcgMS43N0wxNC42MiAxMmwtOC4xMyA4LjEzelwiLz5gKSxcbiAgXCJwcmV2aW91c1wiOiBpY29uVGVtcGxhdGUoYHByZXZpb3VzLWljb25gLCBgUHJldmlvdXMgQ2hhcHRlcmAsIGA8cGF0aCBkPVwiTTE3LjUxIDMuODdMMTUuNzMgMi4xIDUuODQgMTJsOS45IDkuOSAxLjc3LTEuNzdMOS4zOCAxMmw4LjEzLTguMTN6XCIvPmApLFxuICBcInNldHRpbmdzXCI6IGljb25UZW1wbGF0ZShgc2V0dGluZ3MtaWNvbmAsIGBTZXR0aW5nc2AsIGA8cGF0aCBkPVwiTTE5LjQzIDEyLjk4Yy4wNC0uMzIuMDctLjY0LjA3LS45OCAwLS4zNC0uMDMtLjY2LS4wNy0uOThsMi4xMS0xLjY1Yy4xOS0uMTUuMjQtLjQyLjEyLS42NGwtMi0zLjQ2Yy0uMDktLjE2LS4yNi0uMjUtLjQ0LS4yNS0uMDYgMC0uMTIuMDEtLjE3LjAzbC0yLjQ5IDFjLS41Mi0uNC0xLjA4LS43My0xLjY5LS45OGwtLjM4LTIuNjVDMTQuNDYgMi4xOCAxNC4yNSAyIDE0IDJoLTRjLS4yNSAwLS40Ni4xOC0uNDkuNDJsLS4zOCAyLjY1Yy0uNjEuMjUtMS4xNy41OS0xLjY5Ljk4bC0yLjQ5LTFjLS4wNi0uMDItLjEyLS4wMy0uMTgtLjAzLS4xNyAwLS4zNC4wOS0uNDMuMjVsLTIgMy40NmMtLjEzLjIyLS4wNy40OS4xMi42NGwyLjExIDEuNjVjLS4wNC4zMi0uMDcuNjUtLjA3Ljk4IDAgLjMzLjAzLjY2LjA3Ljk4bC0yLjExIDEuNjVjLS4xOS4xNS0uMjQuNDItLjEyLjY0bDIgMy40NmMuMDkuMTYuMjYuMjUuNDQuMjUuMDYgMCAuMTItLjAxLjE3LS4wM2wyLjQ5LTFjLjUyLjQgMS4wOC43MyAxLjY5Ljk4bC4zOCAyLjY1Yy4wMy4yNC4yNC40Mi40OS40Mmg0Yy4yNSAwIC40Ni0uMTguNDktLjQybC4zOC0yLjY1Yy42MS0uMjUgMS4xNy0uNTkgMS42OS0uOThsMi40OSAxYy4wNi4wMi4xMi4wMy4xOC4wMy4xNyAwIC4zNC0uMDkuNDMtLjI1bDItMy40NmMuMTItLjIyLjA3LS40OS0uMTItLjY0bC0yLjExLTEuNjV6bS0xLjk4LTEuNzFjLjA0LjMxLjA1LjUyLjA1LjczIDAgLjIxLS4wMi40My0uMDUuNzNsLS4xNCAxLjEzLjg5LjcgMS4wOC44NC0uNyAxLjIxLTEuMjctLjUxLTEuMDQtLjQyLS45LjY4Yy0uNDMuMzItLjg0LjU2LTEuMjUuNzNsLTEuMDYuNDMtLjE2IDEuMTMtLjIgMS4zNWgtMS40bC0uMTktMS4zNS0uMTYtMS4xMy0xLjA2LS40M2MtLjQzLS4xOC0uODMtLjQxLTEuMjMtLjcxbC0uOTEtLjctMS4wNi40My0xLjI3LjUxLS43LTEuMjEgMS4wOC0uODQuODktLjctLjE0LTEuMTNjLS4wMy0uMzEtLjA1LS41NC0uMDUtLjc0cy4wMi0uNDMuMDUtLjczbC4xNC0xLjEzLS44OS0uNy0xLjA4LS44NC43LTEuMjEgMS4yNy41MSAxLjA0LjQyLjktLjY4Yy40My0uMzIuODQtLjU2IDEuMjUtLjczbDEuMDYtLjQzLjE2LTEuMTMuMi0xLjM1aDEuMzlsLjE5IDEuMzUuMTYgMS4xMyAxLjA2LjQzYy40My4xOC44My40MSAxLjIzLjcxbC45MS43IDEuMDYtLjQzIDEuMjctLjUxLjcgMS4yMS0xLjA3Ljg1LS44OS43LjE0IDEuMTN6TTEyIDhjLTIuMjEgMC00IDEuNzktNCA0czEuNzkgNCA0IDQgNC0xLjc5IDQtNC0xLjc5LTQtNC00em0wIDZjLTEuMSAwLTItLjktMi0ycy45LTIgMi0yIDIgLjkgMiAyLS45IDItMiAyelwiLz5gLCBgaWNvbiBvcGVuYCksXG4gIFwidG9jXCI6IGljb25UZW1wbGF0ZShgdG9jLWljb25gLCBgVGFibGUgb2YgQ29udGVudHNgLCBgPHBhdGggZD1cIk0zIDloMTRWN0gzdjJ6bTAgNGgxNHYtMkgzdjJ6bTAgNGgxNHYtMkgzdjJ6bTE2IDBoMnYtMmgtMnYyem0wLTEwdjJoMlY3aC0yem0wIDZoMnYtMmgtMnYyelwiLz5gLCBgaWNvbiBvcGVuYClcbn0iLCJpbXBvcnQgTmF2aWdhdG9yIGZyb20gXCIuL05hdmlnYXRvclwiO1xuaW1wb3J0IFN0b3JlIGZyb20gXCIuL1N0b3JlXCI7XG5pbXBvcnQgQ2FjaGVyIGZyb20gXCIuL0NhY2hlclwiO1xuaW1wb3J0IHsgQ2FjaGVTdGF0dXMgfSBmcm9tIFwiLi9DYWNoZXJcIjtcbmltcG9ydCBQdWJsaXNoZXJGb250IGZyb20gXCIuL1B1Ymxpc2hlckZvbnRcIjtcbmltcG9ydCBTZXJpZkZvbnQgZnJvbSBcIi4vU2VyaWZGb250XCI7XG5pbXBvcnQgU2Fuc0ZvbnQgZnJvbSBcIi4vU2Fuc0ZvbnRcIjtcbmltcG9ydCBEYXlUaGVtZSBmcm9tIFwiLi9EYXlUaGVtZVwiO1xuaW1wb3J0IFNlcGlhVGhlbWUgZnJvbSBcIi4vU2VwaWFUaGVtZVwiO1xuaW1wb3J0IE5pZ2h0VGhlbWUgZnJvbSBcIi4vTmlnaHRUaGVtZVwiO1xuaW1wb3J0IFBhZ2luYXRlZEJvb2tWaWV3IGZyb20gXCIuL1BhZ2luYXRlZEJvb2tWaWV3XCI7XG5pbXBvcnQgU2Nyb2xsaW5nQm9va1ZpZXcgZnJvbSBcIi4vU2Nyb2xsaW5nQm9va1ZpZXdcIjtcbmltcG9ydCBBbm5vdGF0b3IgZnJvbSBcIi4vQW5ub3RhdG9yXCI7XG5pbXBvcnQgTWFuaWZlc3QgZnJvbSBcIi4vTWFuaWZlc3RcIjtcbmltcG9ydCB7IExpbmsgfSBmcm9tIFwiLi9NYW5pZmVzdFwiO1xuaW1wb3J0IEJvb2tTZXR0aW5ncyBmcm9tIFwiLi9Cb29rU2V0dGluZ3NcIjtcbmltcG9ydCBFdmVudEhhbmRsZXIgZnJvbSBcIi4vRXZlbnRIYW5kbGVyXCI7XG5pbXBvcnQgKiBhcyBCcm93c2VyVXRpbGl0aWVzIGZyb20gXCIuL0Jyb3dzZXJVdGlsaXRpZXNcIjtcbmltcG9ydCAqIGFzIEhUTUxVdGlsaXRpZXMgZnJvbSBcIi4vSFRNTFV0aWxpdGllc1wiO1xuaW1wb3J0ICogYXMgSWNvbkxpYiBmcm9tIFwiLi9JY29uTGliXCI7XG5cbmNvbnN0IGVwdWJSZWFkaW5nU3lzdGVtT2JqZWN0OiBFcHViUmVhZGluZ1N5c3RlbU9iamVjdCA9IHtcbiAgICBuYW1lOiBcIldlYnB1YiB2aWV3ZXJcIixcbiAgICB2ZXJzaW9uOiBcIjAuMS4wXCJcbn07XG5cbmNvbnN0IGVwdWJSZWFkaW5nU3lzdGVtID0gT2JqZWN0LmZyZWV6ZShlcHViUmVhZGluZ1N5c3RlbU9iamVjdCk7XG5cbmNvbnN0IHVwTGlua1RlbXBsYXRlID0gKGhyZWY6IHN0cmluZywgbGFiZWw6IHN0cmluZywgYXJpYUxhYmVsOiBzdHJpbmcpID0+IGBcbiAgPGEgcmVsPVwidXBcIiBocmVmPScke2hyZWZ9JyBhcmlhLWxhYmVsPVwiJHthcmlhTGFiZWx9XCI+XG4gICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIke0ljb25MaWIuV0lEVEhfQVRUUn1cIiBoZWlnaHQ9XCIke0ljb25MaWIuSEVJR0hUX0FUVFJ9XCIgdmlld0JveD1cIiR7SWNvbkxpYi5WSUVXQk9YX0FUVFJ9XCIgYXJpYS1sYWJlbGxlZGJ5PVwidXAtbGFiZWxcIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwieE1pZFlNaWQgbWVldFwiIHJvbGU9XCJpbWdcIiBjbGFzcz1cImljb25cIj5cbiAgICAgIDx0aXRsZSBpZD1cInVwLWxhYmVsXCI+JHtsYWJlbH08L3RpdGxlPlxuICAgICAgJHtJY29uTGliLmljb25zLmhvbWV9XG4gICAgPC9zdmc+XG4gICAgPHNwYW4gY2xhc3M9XCJzZXR0aW5nLXRleHQgdXBcIj4ke2xhYmVsfTwvc3Bhbj5cbiAgPC9hPlxuYDtcblxuY29uc3QgdGVtcGxhdGUgPSBgXG4gIDxuYXYgY2xhc3M9XCJwdWJsaWNhdGlvblwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb250cm9scy10cmlnZ2VyXCI+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwidHJpZ2dlclwiIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgYXJpYS1leHBhbmRlZD1cInRydWVcIj5cbiAgICAgICAgJHtJY29uTGliLmljb25zLm1lbnV9XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29udHJvbHNcIj5cbiAgICAgICAgJHtJY29uTGliLmljb25zLmNsb3NlT3JpZ2luYWx9XG4gICAgICAgICR7SWNvbkxpYi5pY29ucy5jaGVja09yaWdpbmFsfVxuICAgICAgPGEgaHJlZj1cIiNzZXR0aW5ncy1jb250cm9sXCIgY2xhc3M9XCJzY3JvbGxpbmctc3VnZ2VzdGlvblwiIHN0eWxlPVwiZGlzcGxheTogbm9uZVwiPlxuICAgICAgICAgIFdlIHJlY29tbWVuZCBzY3JvbGxpbmcgbW9kZSBmb3IgdXNlIHdpdGggc2NyZWVuIHJlYWRlcnMgYW5kIGtleWJvYXJkIG5hdmlnYXRpb24uXG4gICAgICAgICAgR28gdG8gc2V0dGluZ3MgdG8gc3dpdGNoIHRvIHNjcm9sbGluZyBtb2RlLlxuICAgICAgPC9hPlxuICAgICAgPHVsIGNsYXNzPVwibGlua3MgdG9wIGFjdGl2ZVwiPlxuICAgICAgICA8bGk+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNvbnRlbnRzIGRpc2FibGVkXCIgYXJpYS1sYWJlbGxlZGJ5PVwiY29udGVudHMtbGFiZWxcIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxuICAgICAgICAgICAgJHtJY29uTGliLmljb25zLnRvY31cbiAgICAgICAgICAgICR7SWNvbkxpYi5pY29ucy5jbG9zZUR1cGV9XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNldHRpbmctdGV4dCBjb250ZW50c1wiIGlkPVwiY29udGVudHMtbGFiZWxcIj5Db250ZW50czwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudHMtdmlldyBjb250cm9scy12aWV3IGluYWN0aXZlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9kaXY+XG4gICAgICAgIDwvbGk+XG4gICAgICAgIDxsaT5cbiAgICAgICAgICA8YnV0dG9uIGlkPVwic2V0dGluZ3MtY29udHJvbFwiIGNsYXNzPVwic2V0dGluZ3NcIiBhcmlhLWxhYmVsbGVkYnk9XCJzZXR0aW5ncy1sYWJlbFwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCI+XG4gICAgICAgICAgICAke0ljb25MaWIuaWNvbnMuc2V0dGluZ3N9XG4gICAgICAgICAgICAke0ljb25MaWIuaWNvbnMuY2xvc2VEdXBlfVxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZXR0aW5nLXRleHQgc2V0dGluZ3NcIiBpZD1cInNldHRpbmdzLWxhYmVsXCI+U2V0dGluZ3M8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLXZpZXcgY29udHJvbHMtdmlldyBpbmFjdGl2ZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvZGl2PlxuICAgICAgICA8L2xpPlxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgICA8IS0tIC9jb250cm9scyAtLT5cbiAgPC9uYXY+XG4gIDxtYWluIHN0eWxlPVwib3ZlcmZsb3c6IGhpZGRlblwiIHRhYmluZGV4PS0xPlxuICAgIDxkaXYgY2xhc3M9XCJsb2FkaW5nXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmU7XCI+XG4gICAgICAke0ljb25MaWIuaWNvbnMubG9hZGluZ31cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZXJyb3JcIiBzdHlsZT1cImRpc3BsYXk6bm9uZTtcIj5cbiAgICAgIDxzcGFuPlxuICAgICAgICAke0ljb25MaWIuaWNvbnMuZXJyb3J9XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3Bhbj5UaGVyZSB3YXMgYW4gZXJyb3IgbG9hZGluZyB0aGlzIHBhZ2UuPC9zcGFuPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImdvLWJhY2tcIj5HbyBiYWNrPC9idXR0b24+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwidHJ5LWFnYWluXCI+VHJ5IGFnYWluPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImluZm8gdG9wXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImJvb2stdGl0bGVcIj48L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGlmcmFtZSBhbGxvd3RyYW5zcGFyZW5jeT1cInRydWVcIiB0aXRsZT1cImJvb2sgdGV4dFwiIHN0eWxlPVwiYm9yZGVyOjA7IG92ZXJmbG93OiBoaWRkZW47XCI+PC9pZnJhbWU+XG4gICAgPGRpdiBjbGFzcz1cImluZm8gYm90dG9tXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImNoYXB0ZXItcG9zaXRpb25cIj48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImNoYXB0ZXItdGl0bGVcIj48L3NwYW4+XG4gICAgPC9kaXY+XG4gIDwvbWFpbj5cbiAgPG5hdiBjbGFzcz1cInB1YmxpY2F0aW9uXCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRyb2xzXCI+XG4gICAgICA8dWwgY2xhc3M9XCJsaW5rcyBib3R0b20gYWN0aXZlXCI+XG4gICAgICAgIDxsaT5cbiAgICAgICAgICA8YSByZWw9XCJwcmV2XCIgY2xhc3M9XCJkaXNhYmxlZFwiIHJvbGU9XCJidXR0b25cIiBhcmlhLWxhYmVsbGVkYnk9XCJwcmV2aW91cy1sYWJlbFwiPlxuICAgICAgICAgICR7SWNvbkxpYi5pY29ucy5wcmV2aW91c31cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoYXB0ZXItY29udHJvbFwiIGlkPVwicHJldmlvdXMtbGFiZWxcIj5QcmV2aW91cyBDaGFwdGVyPC9zcGFuPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9saT5cbiAgICAgICAgPGxpIGFyaWEtbGFiZWw9XCJjaGFwdGVyc1wiPkNoYXB0ZXJzPC9saT5cbiAgICAgICAgPGxpPlxuICAgICAgICAgIDxhIHJlbD1cIm5leHRcIiBjbGFzcz1cImRpc2FibGVkXCIgcm9sZT1cImJ1dHRvblwiIGFyaWEtbGFiZWxsZWRieT1cIm5leHQtbGFiZWxcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hhcHRlci1jb250cm9sXCIgaWQgPVwibmV4dC1sYWJlbFwiPk5leHQgQ2hhcHRlcjwvc3Bhbj5cbiAgICAgICAgICAgICR7SWNvbkxpYi5pY29ucy5uZXh0fVxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gICAgPCEtLSAvY29udHJvbHMgLS0+XG4gIDwvbmF2PlxuYDtcblxuaW50ZXJmYWNlIFJlYWRpbmdQb3NpdGlvbiB7XG4gICAgcmVzb3VyY2U6IHN0cmluZztcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVwTGlua0NvbmZpZyB7XG4gICAgdXJsPzogVVJMO1xuICAgIGxhYmVsPzogc3RyaW5nO1xuICAgIGFyaWFMYWJlbD86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRnJhbWVOYXZpZ2F0b3JDb25maWcge1xuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIG1hbmlmZXN0VXJsOiBVUkw7XG4gICAgc3RvcmU6IFN0b3JlO1xuICAgIGNhY2hlcj86IENhY2hlcjtcbiAgICBzZXR0aW5nczogQm9va1NldHRpbmdzO1xuICAgIGFubm90YXRvcj86IEFubm90YXRvcjtcbiAgICBwdWJsaXNoZXI/OiBQdWJsaXNoZXJGb250O1xuICAgIHNlcmlmPzogU2VyaWZGb250O1xuICAgIHNhbnM/OiBTYW5zRm9udDtcbiAgICBkYXk/OiBEYXlUaGVtZTtcbiAgICBzZXBpYT86IFNlcGlhVGhlbWU7XG4gICAgbmlnaHQ/OiBOaWdodFRoZW1lO1xuICAgIHBhZ2luYXRvcj86IFBhZ2luYXRlZEJvb2tWaWV3O1xuICAgIHNjcm9sbGVyPzogU2Nyb2xsaW5nQm9va1ZpZXc7XG4gICAgZXZlbnRIYW5kbGVyPzogRXZlbnRIYW5kbGVyO1xuICAgIHVwTGluaz86ICBVcExpbmtDb25maWc7XG4gICAgYWxsb3dGdWxsc2NyZWVuPzogYm9vbGVhbjtcbn1cblxuLyoqIENsYXNzIHRoYXQgc2hvd3Mgd2VicHViIHJlc291cmNlcyBpbiBhbiBpZnJhbWUsIHdpdGggbmF2aWdhdGlvbiBjb250cm9scyBvdXRzaWRlIHRoZSBpZnJhbWUuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJRnJhbWVOYXZpZ2F0b3IgaW1wbGVtZW50cyBOYXZpZ2F0b3Ige1xuICAgIHByaXZhdGUgbWFuaWZlc3RVcmw6IFVSTDtcbiAgICBwcml2YXRlIHN0b3JlOiBTdG9yZTtcbiAgICBwcml2YXRlIGNhY2hlcjogQ2FjaGVyIHwgbnVsbDtcbiAgICBwcml2YXRlIHNldHRpbmdzOiBCb29rU2V0dGluZ3M7XG4gICAgcHJpdmF0ZSBhbm5vdGF0b3I6IEFubm90YXRvciB8IG51bGw7XG4gICAgcHJpdmF0ZSBwdWJsaXNoZXI6IFB1Ymxpc2hlckZvbnQgfCBudWxsO1xuICAgIHByaXZhdGUgc2VyaWY6IFNlcmlmRm9udCB8IG51bGw7XG4gICAgcHJpdmF0ZSBzYW5zOiBTYW5zRm9udCB8IG51bGw7XG4gICAgcHJpdmF0ZSBkYXk6IERheVRoZW1lIHwgbnVsbDtcbiAgICBwcml2YXRlIHNlcGlhOiBTZXBpYVRoZW1lIHwgbnVsbDtcbiAgICBwcml2YXRlIG5pZ2h0OiBOaWdodFRoZW1lIHwgbnVsbDtcbiAgICBwcml2YXRlIHBhZ2luYXRvcjogUGFnaW5hdGVkQm9va1ZpZXcgfCBudWxsO1xuICAgIHByaXZhdGUgc2Nyb2xsZXI6IFNjcm9sbGluZ0Jvb2tWaWV3IHwgbnVsbDtcbiAgICBwcml2YXRlIGV2ZW50SGFuZGxlcjogRXZlbnRIYW5kbGVyO1xuICAgIHByaXZhdGUgdXBMaW5rQ29uZmlnOiBVcExpbmtDb25maWcgfCBudWxsO1xuICAgIHByaXZhdGUgYWxsb3dGdWxsc2NyZWVuOiBib29sZWFuIHwgbnVsbDtcbiAgICBwcml2YXRlIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBzY3JvbGxpbmdTdWdnZXN0aW9uOiBIVE1MQW5jaG9yRWxlbWVudDtcbiAgICBwcml2YXRlIHVwTGluazogSFRNTEFuY2hvckVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIGZ1bGxzY3JlZW46IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBuZXh0Q2hhcHRlckxpbms6IEhUTUxBbmNob3JFbGVtZW50O1xuICAgIHByaXZhdGUgcHJldmlvdXNDaGFwdGVyTGluazogSFRNTEFuY2hvckVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBtZW51Q29udHJvbDogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBjb250ZW50c0NvbnRyb2w6IEhUTUxCdXR0b25FbGVtZW50O1xuICAgIHByaXZhdGUgc2V0dGluZ3NDb250cm9sOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBwcml2YXRlIGxpbmtzOiBIVE1MVUxpc3RFbGVtZW50O1xuICAgIHByaXZhdGUgbGlua3NCb3R0b206IEhUTUxVTGlzdEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSB0b2NWaWV3OiBIVE1MRGl2RWxlbWVudDtcbiAgICBwcml2YXRlIHNldHRpbmdzVmlldzogSFRNTERpdkVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBsb2FkaW5nTWVzc2FnZTogSFRNTERpdkVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBlcnJvck1lc3NhZ2U6IEhUTUxEaXZFbGVtZW50O1xuICAgIHByaXZhdGUgdHJ5QWdhaW5CdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xuICAgIHByaXZhdGUgZ29CYWNrQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBwcml2YXRlIGluZm9Ub3A6IEhUTUxEaXZFbGVtZW50O1xuICAgIHByaXZhdGUgaW5mb0JvdHRvbTogSFRNTERpdkVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBib29rVGl0bGU6IEhUTUxTcGFuRWxlbWVudDtcbiAgICBwcml2YXRlIGNoYXB0ZXJUaXRsZTogSFRNTFNwYW5FbGVtZW50O1xuICAgIHByaXZhdGUgY2hhcHRlclBvc2l0aW9uOiBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBuZXdQb3NpdGlvbjogUmVhZGluZ1Bvc2l0aW9uIHwgbnVsbDtcbiAgICBwcml2YXRlIG5ld0VsZW1lbnRJZDogc3RyaW5nIHwgbnVsbDtcbiAgICBwcml2YXRlIGlzQmVpbmdTdHlsZWQ6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBpc0xvYWRpbmc6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBjYW5GdWxsc2NyZWVuOiBib29sZWFuID0gKGRvY3VtZW50IGFzIGFueSkuZnVsbHNjcmVlbkVuYWJsZWQgfHwgKGRvY3VtZW50IGFzIGFueSkud2Via2l0RnVsbHNjcmVlbkVuYWJsZWQgfHwgKGRvY3VtZW50IGFzIGFueSkubW96RnVsbFNjcmVlbkVuYWJsZWQgfHwgKGRvY3VtZW50IGFzIGFueSkubXNGdWxsc2NyZWVuRW5hYmxlZDtcblxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgY3JlYXRlKGNvbmZpZzogSUZyYW1lTmF2aWdhdG9yQ29uZmlnKSB7XG4gICAgICAgIGNvbnN0IG5hdmlnYXRvciA9IG5ldyB0aGlzKFxuICAgICAgICAgICAgY29uZmlnLnN0b3JlLCBjb25maWcuY2FjaGVyIHx8IG51bGwsIGNvbmZpZy5zZXR0aW5ncywgY29uZmlnLmFubm90YXRvciB8fCBudWxsLFxuICAgICAgICAgICAgY29uZmlnLnB1Ymxpc2hlciB8fCBudWxsLCBjb25maWcuc2VyaWYgfHwgbnVsbCwgY29uZmlnLnNhbnMgfHwgbnVsbCxcbiAgICAgICAgICAgIGNvbmZpZy5kYXkgfHwgbnVsbCwgY29uZmlnLnNlcGlhIHx8IG51bGwsIGNvbmZpZy5uaWdodCB8fCBudWxsLFxuICAgICAgICAgICAgY29uZmlnLnBhZ2luYXRvciB8fCBudWxsLCBjb25maWcuc2Nyb2xsZXIgfHwgbnVsbCxcbiAgICAgICAgICAgIGNvbmZpZy5ldmVudEhhbmRsZXIgfHwgbnVsbCxcbiAgICAgICAgICAgIGNvbmZpZy51cExpbmsgfHwgbnVsbCxcbiAgICAgICAgICAgIGNvbmZpZy5hbGxvd0Z1bGxzY3JlZW4gfHwgbnVsbFxuICAgICAgICApO1xuXG4gICAgICAgIGF3YWl0IG5hdmlnYXRvci5zdGFydChjb25maWcuZWxlbWVudCwgY29uZmlnLm1hbmlmZXN0VXJsKTtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoXG4gICAgICAgIHN0b3JlOiBTdG9yZSxcbiAgICAgICAgY2FjaGVyOiBDYWNoZXIgfCBudWxsID0gbnVsbCxcbiAgICAgICAgc2V0dGluZ3M6IEJvb2tTZXR0aW5ncyxcbiAgICAgICAgYW5ub3RhdG9yOiBBbm5vdGF0b3IgfCBudWxsID0gbnVsbCxcbiAgICAgICAgcHVibGlzaGVyOiBQdWJsaXNoZXJGb250IHwgbnVsbCA9IG51bGwsXG4gICAgICAgIHNlcmlmOiBTZXJpZkZvbnQgfCBudWxsID0gbnVsbCxcbiAgICAgICAgc2FuczogU2Fuc0ZvbnQgfCBudWxsID0gbnVsbCxcbiAgICAgICAgZGF5OiBEYXlUaGVtZSB8IG51bGwgPSBudWxsLFxuICAgICAgICBzZXBpYTogU2VwaWFUaGVtZSB8IG51bGwgPSBudWxsLFxuICAgICAgICBuaWdodDogTmlnaHRUaGVtZSB8IG51bGwgPSBudWxsLFxuICAgICAgICBwYWdpbmF0b3I6IFBhZ2luYXRlZEJvb2tWaWV3IHwgbnVsbCA9IG51bGwsXG4gICAgICAgIHNjcm9sbGVyOiBTY3JvbGxpbmdCb29rVmlldyB8IG51bGwgPSBudWxsLFxuICAgICAgICBldmVudEhhbmRsZXI6IEV2ZW50SGFuZGxlciB8IG51bGwgPSBudWxsLFxuICAgICAgICB1cExpbmtDb25maWc6IFVwTGlua0NvbmZpZyB8IG51bGwgPSBudWxsLFxuICAgICAgICBhbGxvd0Z1bGxzY3JlZW46IGJvb2xlYW4gfCBudWxsID0gbnVsbFxuICAgICAgICApIHtcblxuICAgICAgICB0aGlzLnN0b3JlID0gc3RvcmU7XG4gICAgICAgIHRoaXMuY2FjaGVyID0gY2FjaGVyO1xuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgIHRoaXMuYW5ub3RhdG9yID0gYW5ub3RhdG9yO1xuICAgICAgICB0aGlzLnB1Ymxpc2hlciA9IHB1Ymxpc2hlcjtcbiAgICAgICAgdGhpcy5zZXJpZiA9IHNlcmlmO1xuICAgICAgICB0aGlzLnNhbnMgPSBzYW5zO1xuICAgICAgICB0aGlzLmRheSA9IGRheTtcbiAgICAgICAgdGhpcy5zZXBpYSA9IHNlcGlhO1xuICAgICAgICB0aGlzLm5pZ2h0ID0gbmlnaHQ7XG4gICAgICAgIHRoaXMucGFnaW5hdG9yID0gcGFnaW5hdG9yO1xuICAgICAgICB0aGlzLnNjcm9sbGVyID0gc2Nyb2xsZXI7XG4gICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyID0gZXZlbnRIYW5kbGVyIHx8IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICAgICAgdGhpcy51cExpbmtDb25maWcgPSB1cExpbmtDb25maWc7XG4gICAgICAgIHRoaXMuYWxsb3dGdWxsc2NyZWVuID0gYWxsb3dGdWxsc2NyZWVuXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFzeW5jIHN0YXJ0KGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBtYW5pZmVzdFVybDogVVJMKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gdGVtcGxhdGU7XG4gICAgICAgIHRoaXMubWFuaWZlc3RVcmwgPSBtYW5pZmVzdFVybDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuaWZyYW1lID0gSFRNTFV0aWxpdGllcy5maW5kUmVxdWlyZWRFbGVtZW50KGVsZW1lbnQsIFwiaWZyYW1lXCIpIGFzIEhUTUxJRnJhbWVFbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxpbmdTdWdnZXN0aW9uID0gSFRNTFV0aWxpdGllcy5maW5kUmVxdWlyZWRFbGVtZW50KGVsZW1lbnQsIFwiLnNjcm9sbGluZy1zdWdnZXN0aW9uXCIpIGFzIEhUTUxBbmNob3JFbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5uZXh0Q2hhcHRlckxpbmsgPSBIVE1MVXRpbGl0aWVzLmZpbmRSZXF1aXJlZEVsZW1lbnQoZWxlbWVudCwgXCJhW3JlbD1uZXh0XVwiKSBhcyBIVE1MQW5jaG9yRWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNDaGFwdGVyTGluayA9IEhUTUxVdGlsaXRpZXMuZmluZFJlcXVpcmVkRWxlbWVudChlbGVtZW50LCBcImFbcmVsPXByZXZdXCIpIGFzIEhUTUxBbmNob3JFbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5jb250ZW50c0NvbnRyb2wgPSBIVE1MVXRpbGl0aWVzLmZpbmRSZXF1aXJlZEVsZW1lbnQoZWxlbWVudCwgXCJidXR0b24uY29udGVudHNcIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzQ29udHJvbCA9IEhUTUxVdGlsaXRpZXMuZmluZFJlcXVpcmVkRWxlbWVudChlbGVtZW50LCBcImJ1dHRvbi5zZXR0aW5nc1wiKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMubGlua3MgPSBIVE1MVXRpbGl0aWVzLmZpbmRSZXF1aXJlZEVsZW1lbnQoZWxlbWVudCwgXCJ1bC5saW5rcy50b3BcIikgYXMgSFRNTFVMaXN0RWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMubGlua3NCb3R0b20gPSBIVE1MVXRpbGl0aWVzLmZpbmRSZXF1aXJlZEVsZW1lbnQoZWxlbWVudCwgXCJ1bC5saW5rcy5ib3R0b21cIikgYXMgSFRNTFVMaXN0RWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMudG9jVmlldyA9IEhUTUxVdGlsaXRpZXMuZmluZFJlcXVpcmVkRWxlbWVudChlbGVtZW50LCBcIi5jb250ZW50cy12aWV3XCIpIGFzIEhUTUxEaXZFbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5zZXR0aW5nc1ZpZXcgPSBIVE1MVXRpbGl0aWVzLmZpbmRSZXF1aXJlZEVsZW1lbnQoZWxlbWVudCwgXCIuc2V0dGluZ3Mtdmlld1wiKSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ01lc3NhZ2UgPSBIVE1MVXRpbGl0aWVzLmZpbmRSZXF1aXJlZEVsZW1lbnQoZWxlbWVudCwgXCJkaXZbY2xhc3M9bG9hZGluZ11cIikgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IEhUTUxVdGlsaXRpZXMuZmluZFJlcXVpcmVkRWxlbWVudChlbGVtZW50LCBcImRpdltjbGFzcz1lcnJvcl1cIikgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLnRyeUFnYWluQnV0dG9uID0gSFRNTFV0aWxpdGllcy5maW5kUmVxdWlyZWRFbGVtZW50KGVsZW1lbnQsIFwiYnV0dG9uW2NsYXNzPXRyeS1hZ2Fpbl1cIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLmdvQmFja0J1dHRvbiA9IEhUTUxVdGlsaXRpZXMuZmluZFJlcXVpcmVkRWxlbWVudChlbGVtZW50LCBcImJ1dHRvbltjbGFzcz1nby1iYWNrXVwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMuaW5mb1RvcCA9IEhUTUxVdGlsaXRpZXMuZmluZFJlcXVpcmVkRWxlbWVudChlbGVtZW50LCBcImRpdltjbGFzcz0naW5mbyB0b3AnXVwiKSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMuaW5mb0JvdHRvbSA9IEhUTUxVdGlsaXRpZXMuZmluZFJlcXVpcmVkRWxlbWVudChlbGVtZW50LCBcImRpdltjbGFzcz0naW5mbyBib3R0b20nXVwiKSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMuYm9va1RpdGxlID0gSFRNTFV0aWxpdGllcy5maW5kUmVxdWlyZWRFbGVtZW50KHRoaXMuaW5mb1RvcCwgXCJzcGFuW2NsYXNzPWJvb2stdGl0bGVdXCIpIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMuY2hhcHRlclRpdGxlID0gSFRNTFV0aWxpdGllcy5maW5kUmVxdWlyZWRFbGVtZW50KHRoaXMuaW5mb0JvdHRvbSwgXCJzcGFuW2NsYXNzPWNoYXB0ZXItdGl0bGVdXCIpIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMuY2hhcHRlclBvc2l0aW9uID0gSFRNTFV0aWxpdGllcy5maW5kUmVxdWlyZWRFbGVtZW50KHRoaXMuaW5mb0JvdHRvbSwgXCJzcGFuW2NsYXNzPWNoYXB0ZXItcG9zaXRpb25dXCIpIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMubWVudUNvbnRyb2wgPSBIVE1MVXRpbGl0aWVzLmZpbmRSZXF1aXJlZEVsZW1lbnQoZWxlbWVudCwgXCJidXR0b24udHJpZ2dlclwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMubmV3UG9zaXRpb24gPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5uZXdFbGVtZW50SWQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5pc0JlaW5nU3R5bGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2V0dXBFdmVudHMoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucHVibGlzaGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wdWJsaXNoZXIuYm9va0VsZW1lbnQgPSB0aGlzLmlmcmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnNlcmlmKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJpZi5ib29rRWxlbWVudCA9IHRoaXMuaWZyYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc2Fucykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2Fucy5ib29rRWxlbWVudCA9IHRoaXMuaWZyYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZGF5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXkuYm9va0VsZW1lbnQgPSB0aGlzLmlmcmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnNlcGlhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXBpYS5ib29rRWxlbWVudCA9IHRoaXMuaWZyYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMubmlnaHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5pZ2h0LmJvb2tFbGVtZW50ID0gdGhpcy5pZnJhbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5wYWdpbmF0b3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2luYXRvci5ib29rRWxlbWVudCA9IHRoaXMuaWZyYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbGVyLmJvb2tFbGVtZW50ID0gdGhpcy5pZnJhbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLnJlbmRlckNvbnRyb2xzKHRoaXMuc2V0dGluZ3NWaWV3KTtcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3Mub25Gb250Q2hhbmdlKHRoaXMudXBkYXRlRm9udC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3Mub25Gb250U2l6ZUNoYW5nZSh0aGlzLnVwZGF0ZUZvbnRTaXplLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5vblZpZXdDaGFuZ2UodGhpcy51cGRhdGVCb29rVmlldy5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgICAgLy8gVHJhcCBrZXlib2FyZCBmb2N1cyBpbnNpZGUgdGhlIHNldHRpbmdzIHZpZXcgd2hlbiBpdCdzIGRpc3BsYXllZC5cbiAgICAgICAgICAgIGNvbnN0IHNldHRpbmdzQnV0dG9ucyA9IHRoaXMuc2V0dGluZ3NWaWV3LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIik7XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3NCdXR0b25zICYmIHNldHRpbmdzQnV0dG9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdFNldHRpbmdzQnV0dG9uID0gc2V0dGluZ3NCdXR0b25zW3NldHRpbmdzQnV0dG9ucy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldHVwTW9kYWxGb2N1c1RyYXAodGhpcy5zZXR0aW5nc1ZpZXcsIHRoaXMuc2V0dGluZ3NDb250cm9sLCBsYXN0U2V0dGluZ3NCdXR0b24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5jYWNoZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlci5vblN0YXR1c1VwZGF0ZSh0aGlzLnVwZGF0ZU9mZmxpbmVDYWNoZVN0YXR1cy5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZU9mZmxpbmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsZXIgJiYgKHRoaXMuc2V0dGluZ3MuZ2V0U2VsZWN0ZWRWaWV3KCkgIT09IHRoaXMuc2Nyb2xsZXIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxpbmdTdWdnZXN0aW9uLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmxvYWRNYW5pZmVzdCgpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIC8vIFRoZXJlJ3MgYSBtaXNtYXRjaCBiZXR3ZWVuIHRoZSB0ZW1wbGF0ZSBhbmQgdGhlIHNlbGVjdG9ycyBhYm92ZSxcbiAgICAgICAgICAgIC8vIG9yIHdlIHdlcmVuJ3QgYWJsZSB0byBpbnNlcnQgdGhlIHRlbXBsYXRlIGluIHRoZSBlbGVtZW50LlxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChfLCByZWplY3QpID0+IHJlamVjdChlcnIpKS5jYXRjaCgoKSA9PiB7fSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldHVwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlmcmFtZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCB0aGlzLmhhbmRsZUlGcmFtZUxvYWQuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgY29uc3QgZGVsYXk6IG51bWJlciA9IDIwMDtcbiAgICAgICAgbGV0IHRpbWVvdXQ6IGFueTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dCh0aGlzLmhhbmRsZVJlc2l6ZS5iaW5kKHRoaXMpLCBkZWxheSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucHJldmlvdXNDaGFwdGVyTGluay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5oYW5kbGVQcmV2aW91c0NoYXB0ZXJDbGljay5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLm5leHRDaGFwdGVyTGluay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5oYW5kbGVOZXh0Q2hhcHRlckNsaWNrLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuY29udGVudHNDb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmhhbmRsZUNvbnRlbnRzQ2xpY2suYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5zZXR0aW5nc0NvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuaGFuZGxlU2V0dGluZ3NDbGljay5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLnNldHRpbmdzVmlldy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5oYW5kbGVUb2dnbGVMaW5rc0NsaWNrLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMudHJ5QWdhaW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMudHJ5QWdhaW4uYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5nb0JhY2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuZ29CYWNrLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMubWVudUNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuaGFuZGxlVG9nZ2xlTGlua3NDbGljay5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLmNvbnRlbnRzQ29udHJvbC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLmhpZGVUT0NPbkVzY2FwZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLnRvY1ZpZXcuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5oaWRlVE9DT25Fc2NhcGUuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5zZXR0aW5nc0NvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5oaWRlU2V0dGluZ3NPbkVzY2FwZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLnNldHRpbmdzVmlldy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLmhpZGVTZXR0aW5nc09uRXNjYXBlLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLmhhbmRsZUtleWJvYXJkTmF2aWdhdGlvbi5iaW5kKHRoaXMpKTtcblxuICAgICAgICBpZiAodGhpcy5hbGxvd0Z1bGxzY3JlZW4gJiYgdGhpcy5jYW5GdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZnVsbHNjcmVlbmNoYW5nZVwiLCB0aGlzLnRvZ2dsZUZ1bGxzY3JlZW5JY29uLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2VcIiwgdGhpcy50b2dnbGVGdWxsc2NyZWVuSWNvbi5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3pmdWxsc2NyZWVuY2hhbmdlXCIsIHRoaXMudG9nZ2xlRnVsbHNjcmVlbkljb24uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiTVNGdWxsc2NyZWVuQ2hhbmdlXCIsIHRoaXMudG9nZ2xlRnVsbHNjcmVlbkljb24uYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldHVwTW9kYWxGb2N1c1RyYXAobW9kYWw6IEhUTUxEaXZFbGVtZW50LCBjbG9zZUJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQsIGxhc3RGb2N1c2FibGVFbGVtZW50OiBIVE1MQnV0dG9uRWxlbWVudCB8IEhUTUxBbmNob3JFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIC8vIFRyYXAga2V5Ym9hcmQgZm9jdXMgaW4gYSBtb2RhbCBkaWFsb2cgd2hlbiBpdCdzIGRpc3BsYXllZC5cbiAgICAgICAgY29uc3QgVEFCX0tFWSA9IDk7XG5cbiAgICAgICAgLy8gR29pbmcgYmFja3dhcmRzIGZyb20gdGhlIGNsb3NlIGJ1dHRvbiBzZW5kcyB5b3UgdG8gdGhlIGxhc3QgZm9jdXNhYmxlIGVsZW1lbnQuXG4gICAgICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNEaXNwbGF5ZWQobW9kYWwpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFiID0gKGV2ZW50LmtleUNvZGUgPT09IFRBQl9LRVkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNoaWZ0ID0gISFldmVudC5zaGlmdEtleTtcbiAgICAgICAgICAgICAgICBpZiAodGFiICYmIHNoaWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RGb2N1c2FibGVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gR29pbmcgZm9yd2FyZCBmcm9tIHRoZSBsYXN0IGZvY3VzYWJsZSBlbGVtZW50IHNlbmRzIHlvdSB0byB0aGUgY2xvc2UgYnV0dG9uLlxuICAgICAgICBsYXN0Rm9jdXNhYmxlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRGlzcGxheWVkKG1vZGFsKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhYiA9IChldmVudC5rZXlDb2RlID09PSBUQUJfS0VZKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzaGlmdCA9ICEhZXZlbnQuc2hpZnRLZXk7XG4gICAgICAgICAgICAgICAgaWYgKHRhYiAmJiAhc2hpZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VCdXR0b24uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUtleWJvYXJkTmF2aWdhdGlvbihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBMRUZUX0FSUk9XID0gMzc7XG4gICAgICAgIGNvbnN0IFJJR0hUX0FSUk9XID0gMzk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZ2V0U2VsZWN0ZWRWaWV3KCkgPT09IHRoaXMucGFnaW5hdG9yKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gTEVGVF9BUlJPVykge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlUHJldmlvdXNQYWdlQ2xpY2soZXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSBSSUdIVF9BUlJPVykge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTmV4dFBhZ2VDbGljayhldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHJpdmF0ZSB1cGRhdGVGb250KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmhhbmRsZVJlc2l6ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlRm9udFNpemUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaGFuZGxlUmVzaXplKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVCb29rVmlldygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZG9Ob3RoaW5nID0gKCkgPT4ge307XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmdldFNlbGVjdGVkVmlldygpID09PSB0aGlzLnBhZ2luYXRvcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxpbmdTdWdnZXN0aW9uLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5Lm9uc2Nyb2xsID0gKCkgPT4ge307XG4gICAgICAgICAgICB0aGlzLmNoYXB0ZXJUaXRsZS5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcbiAgICAgICAgICAgIHRoaXMuY2hhcHRlclBvc2l0aW9uLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xuICAgICAgICAgICAgaWYgKHRoaXMuZXZlbnRIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIub25CYWNrd2FyZFN3aXBlID0gdGhpcy5oYW5kbGVQcmV2aW91c1BhZ2VDbGljay5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uRm9yd2FyZFN3aXBlID0gdGhpcy5oYW5kbGVOZXh0UGFnZUNsaWNrLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIub25MZWZ0VGFwID0gdGhpcy5oYW5kbGVQcmV2aW91c1BhZ2VDbGljay5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uTWlkZGxlVGFwID0gdGhpcy5oYW5kbGVUb2dnbGVMaW5rc0NsaWNrLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIub25SaWdodFRhcCA9IHRoaXMuaGFuZGxlTmV4dFBhZ2VDbGljay5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uTGVmdEhvdmVyID0gdGhpcy5oYW5kbGVMZWZ0SG92ZXIuYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50SGFuZGxlci5vblJpZ2h0SG92ZXIgPSB0aGlzLmhhbmRsZVJpZ2h0SG92ZXIuYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50SGFuZGxlci5vblJlbW92ZUhvdmVyID0gdGhpcy5oYW5kbGVSZW1vdmVIb3Zlci5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uSW50ZXJuYWxMaW5rID0gdGhpcy5oYW5kbGVJbnRlcm5hbExpbmsuYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50SGFuZGxlci5vbkxlZnRBcnJvdyA9IHRoaXMuaGFuZGxlS2V5Ym9hcmROYXZpZ2F0aW9uLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIub25SaWdodEFycm93ID0gdGhpcy5oYW5kbGVLZXlib2FyZE5hdmlnYXRpb24uYmluZCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmlzRGlzcGxheWVkKHRoaXMubGlua3NCb3R0b20pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVEaXNwbGF5KHRoaXMubGlua3NCb3R0b20pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2V0dGluZ3MuZ2V0U2VsZWN0ZWRWaWV3KCkgPT09IHRoaXMuc2Nyb2xsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsaW5nU3VnZ2VzdGlvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5Lm9uc2Nyb2xsID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZUN1cnJlbnRSZWFkaW5nUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxlciAmJiB0aGlzLnNjcm9sbGVyLmF0Qm90dG9tKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQnJpbmcgdXAgdGhlIGJvdHRvbSBuYXYgd2hlbiB5b3UgZ2V0IHRvIHRoZSBib3R0b20sXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGl0IHdhc24ndCBhbHJlYWR5IGRpc3BsYXllZC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzRGlzcGxheWVkKHRoaXMubGlua3NCb3R0b20pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZURpc3BsYXkodGhpcy5saW5rc0JvdHRvbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGJvdHRvbSBuYXYgd2hlbiB5b3Ugc2Nyb2xsIGJhY2sgdXAsXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGl0IHdhcyBkaXNwbGF5ZWQgYmVjYXVzZSB5b3Ugd2VyZSBhdCB0aGUgYm90dG9tLlxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0Rpc3BsYXllZCh0aGlzLmxpbmtzQm90dG9tKSAmJiAhdGhpcy5pc0Rpc3BsYXllZCh0aGlzLmxpbmtzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2dnbGVEaXNwbGF5KHRoaXMubGlua3NCb3R0b20pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jaGFwdGVyVGl0bGUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgdGhpcy5jaGFwdGVyUG9zaXRpb24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgaWYgKHRoaXMuZXZlbnRIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIub25CYWNrd2FyZFN3aXBlID0gZG9Ob3RoaW5nO1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uRm9yd2FyZFN3aXBlID0gZG9Ob3RoaW5nO1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uTGVmdFRhcCA9IHRoaXMuaGFuZGxlVG9nZ2xlTGlua3NDbGljay5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uTWlkZGxlVGFwID0gdGhpcy5oYW5kbGVUb2dnbGVMaW5rc0NsaWNrLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIub25SaWdodFRhcCA9IHRoaXMuaGFuZGxlVG9nZ2xlTGlua3NDbGljay5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uTGVmdEhvdmVyID0gZG9Ob3RoaW5nO1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uUmlnaHRIb3ZlciA9IGRvTm90aGluZztcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50SGFuZGxlci5vblJlbW92ZUhvdmVyID0gZG9Ob3RoaW5nO1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uSW50ZXJuYWxMaW5rID0gZG9Ob3RoaW5nO1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uTGVmdEFycm93ID0gZG9Ob3RoaW5nO1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyLm9uUmlnaHRBcnJvdyA9IGRvTm90aGluZztcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVJlbW92ZUhvdmVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5pc0Rpc3BsYXllZCh0aGlzLmxpbmtzKSAmJiAhdGhpcy5pc0Rpc3BsYXllZCh0aGlzLmxpbmtzQm90dG9tKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlRGlzcGxheSh0aGlzLmxpbmtzQm90dG9tKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uSW5mbygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZW5hYmxlT2ZmbGluZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY2FjaGVyICYmIHRoaXMuY2FjaGVyLmdldFN0YXR1cygpICE9PSBDYWNoZVN0YXR1cy5Eb3dubG9hZGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNhY2hlci5lbmFibGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlT2ZmbGluZUNhY2hlU3RhdHVzKHN0YXR1czogQ2FjaGVTdGF0dXMpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc3RhdHVzRWxlbWVudCA9IHRoaXMuc2V0dGluZ3MuZ2V0T2ZmbGluZVN0YXR1c0VsZW1lbnQoKTtcblxuICAgICAgICBsZXQgc3RhdHVzTWVzc2FnZSA9IFwiXCI7XG4gICAgICAgIGlmIChzdGF0dXMgPT09IENhY2hlU3RhdHVzLlVuY2FjaGVkKSB7XG4gICAgICAgICAgICBzdGF0dXNNZXNzYWdlID0gXCJcIjtcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09IENhY2hlU3RhdHVzLlVwZGF0ZUF2YWlsYWJsZSkge1xuICAgICAgICAgICAgc3RhdHVzTWVzc2FnZSA9IFwiQSBuZXcgdmVyc2lvbiBpcyBhdmFpbGFibGUuIFJlZnJlc2ggdG8gdXBkYXRlLlwiO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gQ2FjaGVTdGF0dXMuQ2hlY2tpbmdGb3JVcGRhdGUpIHtcbiAgICAgICAgICAgIHN0YXR1c01lc3NhZ2UgPSBcIkNoZWNraW5nIGZvciB1cGRhdGUuXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSBDYWNoZVN0YXR1cy5Eb3dubG9hZGluZykge1xuICAgICAgICAgICAgc3RhdHVzTWVzc2FnZSA9IFwiRG93bmxvYWRpbmcuLi5cIjtcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09IENhY2hlU3RhdHVzLkRvd25sb2FkZWQpIHtcbiAgICAgICAgICAgIHN0YXR1c01lc3NhZ2UgPSBcIkRvd25sb2FkZWQgZm9yIG9mZmxpbmUgdXNlXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSBDYWNoZVN0YXR1cy5FcnJvcikge1xuICAgICAgICAgICAgc3RhdHVzTWVzc2FnZSA9IFwiRXJyb3IgZG93bmxvYWRpbmcgZm9yIG9mZmxpbmUgdXNlXCI7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0dXNFbGVtZW50LmlubmVySFRNTCA9IHN0YXR1c01lc3NhZ2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBsb2FkTWFuaWZlc3QoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBtYW5pZmVzdDogTWFuaWZlc3QgPSBhd2FpdCBNYW5pZmVzdC5nZXRNYW5pZmVzdCh0aGlzLm1hbmlmZXN0VXJsLCB0aGlzLnN0b3JlKTtcblxuICAgICAgICAgICAgY29uc3QgdG9jID0gbWFuaWZlc3QudG9jO1xuICAgICAgICAgICAgaWYgKHRvYy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRzQ29udHJvbC5jbGFzc05hbWUgPSBcImNvbnRlbnRzXCI7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBjcmVhdGVUT0MgPSAocGFyZW50RWxlbWVudDogRWxlbWVudCwgbGlua3M6IEFycmF5PExpbms+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpc3RFbGVtZW50OiBIVE1MT0xpc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9sXCIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbGFzdExpbms6IEhUTUxBbmNob3JFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbGluayBvZiBsaW5rcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGlzdEl0ZW1FbGVtZW50IDogSFRNTExJRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmtFbGVtZW50OiBIVE1MQW5jaG9yRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3BhbkVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlua0VsZW1lbnQudGFiSW5kZXggPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBocmVmID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaW5rLmhyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmID0gbmV3IFVSTChsaW5rLmhyZWYsIHRoaXMubWFuaWZlc3RVcmwuaHJlZikuaHJlZjtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlua0VsZW1lbnQuaHJlZiA9IGhyZWY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlua0VsZW1lbnQuaW5uZXJIVE1MID0gbGluay50aXRsZSB8fCBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RJdGVtRWxlbWVudC5hcHBlbmRDaGlsZChsaW5rRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYW5FbGVtZW50LmlubmVySFRNTCA9IGxpbmsudGl0bGUgfHwgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0SXRlbUVsZW1lbnQuYXBwZW5kQ2hpbGQoc3BhbkVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmsuY2hpbGRyZW4gJiYgbGluay5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlVE9DKGxpc3RJdGVtRWxlbWVudCwgbGluay5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RFbGVtZW50LmFwcGVuZENoaWxkKGxpc3RJdGVtRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0TGluayA9IGxpbmtFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVHJhcCBrZXlib2FyZCBmb2N1cyBpbnNpZGUgdGhlIFRPQyB3aGlsZSBpdCdzIG9wZW4uXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0TGluaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR1cE1vZGFsRm9jdXNUcmFwKHRoaXMudG9jVmlldywgdGhpcy5jb250ZW50c0NvbnRyb2wsIGxhc3RMaW5rKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGxpc3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQ6RXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGV2ZW50LnRhcmdldCAmJiAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiYVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxpbmtFbGVtZW50ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxBbmNob3JFbGVtZW50O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmtFbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKFwiYWN0aXZlXCIpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIFRPQyBpdGVtIGlzIGFscmVhZHkgbG9hZGVkLiBIaWRlIHRoZSBUT0NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYnV0IGRvbid0IG5hdmlnYXRlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVUT0MoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTZXQgZm9jdXMgYmFjayB0byB0aGUgY29udGVudHMgdG9nZ2xlIGJ1dHRvbiBzbyBzY3JlZW4gcmVhZGVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkb24ndCBnZXQgc3R1Y2sgb24gYSBoaWRkZW4gbGluay5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50c0NvbnRyb2wuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZTogbGlua0VsZW1lbnQuaHJlZixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChsaXN0RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNyZWF0ZVRPQyh0aGlzLnRvY1ZpZXcsIHRvYyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICh0aGlzLmNvbnRlbnRzQ29udHJvbC5wYXJlbnRFbGVtZW50IGFzIGFueSkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy51cExpbmtDb25maWcgJiYgdGhpcy51cExpbmtDb25maWcudXJsKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdXBVcmwgPSB0aGlzLnVwTGlua0NvbmZpZy51cmw7XG4gICAgICAgICAgICAgICAgY29uc3QgdXBMYWJlbCA9IHRoaXMudXBMaW5rQ29uZmlnLmxhYmVsIHx8IFwiXCI7XG4gICAgICAgICAgICAgICAgY29uc3QgdXBBcmlhTGFiZWwgPSB0aGlzLnVwTGlua0NvbmZpZy5hcmlhTGFiZWwgfHwgdXBMYWJlbDtcbiAgICAgICAgICAgICAgICBjb25zdCB1cEhUTUwgPSB1cExpbmtUZW1wbGF0ZSh1cFVybC5ocmVmLCB1cExhYmVsLCB1cEFyaWFMYWJlbCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdXBQYXJlbnQgOiBIVE1MTElFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICAgICAgICAgIHVwUGFyZW50LmNsYXNzTGlzdC5hZGQoXCJ1cGxpbmstd3JhcHBlclwiKTtcbiAgICAgICAgICAgICAgICB1cFBhcmVudC5pbm5lckhUTUwgPSB1cEhUTUw7XG4gICAgICAgICAgICAgICAgdGhpcy5saW5rcy5pbnNlcnRCZWZvcmUodXBQYXJlbnQsIHRoaXMubGlua3MuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICAgICAgdGhpcy51cExpbmsgPSBIVE1MVXRpbGl0aWVzLmZpbmRSZXF1aXJlZEVsZW1lbnQodGhpcy5saW5rcywgXCJhW3JlbD11cF1cIikgYXMgSFRNTEFuY2hvckVsZW1lbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmFsbG93RnVsbHNjcmVlbiAmJiB0aGlzLmNhbkZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmdWxsc2NyZWVuSFRNTCA9IGA8YnV0dG9uIGlkPVwiZnVsbHNjcmVlbi1jb250cm9sXCIgY2xhc3M9XCJmdWxsc2NyZWVuXCIgYXJpYS1oaWRkZW49XCJmYWxzZVwiPiR7SWNvbkxpYi5pY29ucy5leHBhbmR9ICR7SWNvbkxpYi5pY29ucy5taW5pbWl6ZX08L2J1dHRvbj5gO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZ1bGxzY3JlZW5QYXJlbnQgOiBIVE1MTElFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICAgICAgICAgIGZ1bGxzY3JlZW5QYXJlbnQuaW5uZXJIVE1MID0gZnVsbHNjcmVlbkhUTUw7XG4gICAgICAgICAgICAgICAgdGhpcy5saW5rcy5hcHBlbmRDaGlsZChmdWxsc2NyZWVuUGFyZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLmZ1bGxzY3JlZW4gPSBIVE1MVXRpbGl0aWVzLmZpbmRSZXF1aXJlZEVsZW1lbnQodGhpcy5saW5rcywgXCIjZnVsbHNjcmVlbi1jb250cm9sXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuZnVsbHNjcmVlbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy50b2dnbGVGdWxsc2NyZWVuLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgbGFzdFJlYWRpbmdQb3NpdGlvbjogUmVhZGluZ1Bvc2l0aW9uIHwgbnVsbCA9IG51bGw7XG4gICAgICAgICAgICBpZiAodGhpcy5hbm5vdGF0b3IpIHtcbiAgICAgICAgICAgICAgICBsYXN0UmVhZGluZ1Bvc2l0aW9uID0gYXdhaXQgdGhpcy5hbm5vdGF0b3IuZ2V0TGFzdFJlYWRpbmdQb3NpdGlvbigpIGFzIFJlYWRpbmdQb3NpdGlvbiB8IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0TGluayA9IG1hbmlmZXN0LmdldFN0YXJ0TGluaygpO1xuICAgICAgICAgICAgbGV0IHN0YXJ0VXJsOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChzdGFydExpbmsgJiYgc3RhcnRMaW5rLmhyZWYpIHtcbiAgICAgICAgICAgICAgICBzdGFydFVybCA9IG5ldyBVUkwoc3RhcnRMaW5rLmhyZWYsIHRoaXMubWFuaWZlc3RVcmwuaHJlZikuaHJlZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGxhc3RSZWFkaW5nUG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlKGxhc3RSZWFkaW5nUG9zaXRpb24pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGFydFVybCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZTogc3RhcnRVcmwsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAwXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlKHBvc2l0aW9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KHJlc29sdmUgPT4gcmVzb2x2ZSgpKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aGlzLmFib3J0T25FcnJvcigpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChfLCByZWplY3QpID0+IHJlamVjdChlcnIpKS5jYXRjaCgoKSA9PiB7fSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGhhbmRsZUlGcmFtZUxvYWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgdGhpcy5zaG93TG9hZGluZ01lc3NhZ2VBZnRlckRlbGF5KCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVUT0MoKTtcblxuICAgICAgICAgICAgbGV0IGJvb2tWaWV3UG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgaWYgKHRoaXMubmV3UG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICBib29rVmlld1Bvc2l0aW9uID0gdGhpcy5uZXdQb3NpdGlvbi5wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICB0aGlzLm5ld1Bvc2l0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudXBkYXRlRm9udCgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVGb250U2l6ZSgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVCb29rVmlldygpO1xuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5nZXRTZWxlY3RlZEZvbnQoKS5zdGFydCgpO1xuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5nZXRTZWxlY3RlZFRoZW1lKCkuc3RhcnQoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuZ2V0U2VsZWN0ZWRWaWV3KCkuc3RhcnQoYm9va1ZpZXdQb3NpdGlvbik7XG5cblxuICAgICAgICAgICAgaWYgKHRoaXMubmV3RWxlbWVudElkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5nZXRTZWxlY3RlZFZpZXcoKS5nb1RvRWxlbWVudCh0aGlzLm5ld0VsZW1lbnRJZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdFbGVtZW50SWQgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgY3VycmVudExvY2F0aW9uID0gdGhpcy5pZnJhbWUuc3JjO1xuICAgICAgICAgICAgaWYgKHRoaXMuaWZyYW1lLmNvbnRlbnREb2N1bWVudCAmJiB0aGlzLmlmcmFtZS5jb250ZW50RG9jdW1lbnQubG9jYXRpb24gJiYgdGhpcy5pZnJhbWUuY29udGVudERvY3VtZW50LmxvY2F0aW9uLmhyZWYpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50TG9jYXRpb24gPSB0aGlzLmlmcmFtZS5jb250ZW50RG9jdW1lbnQubG9jYXRpb24uaHJlZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGN1cnJlbnRMb2NhdGlvbi5pbmRleE9mKFwiI1wiKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAvLyBMZXR0aW5nIHRoZSBpZnJhbWUgbG9hZCB0aGUgYW5jaG9yIGl0c2VsZiBkb2Vzbid0IGFsd2F5cyB3b3JrLlxuICAgICAgICAgICAgICAgIC8vIEZvciBleGFtcGxlLCB3aXRoIENTUyBjb2x1bW4tYmFzZWQgcGFnaW5hdGlvbiwgeW91IGNhbiBlbmQgdXBcbiAgICAgICAgICAgICAgICAvLyBiZXR3ZWVuIHR3byBjb2x1bW5zLCBhbmQgd2UgY2FuJ3QgcmVzZXQgdGhlIHBvc2l0aW9uIGluIHNvbWVcbiAgICAgICAgICAgICAgICAvLyBicm93c2Vycy4gSW5zdGVhZCwgd2UgZ3JhYiB0aGUgZWxlbWVudCBpZCBhbmQgcmVsb2FkIHRoZSBpZnJhbWVcbiAgICAgICAgICAgICAgICAvLyB3aXRob3V0IGl0LCB0aGVuIGxldCB0aGUgdmlldyBmaWd1cmUgb3V0IGhvdyB0byBnbyB0byB0aGF0IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAvLyBvbiB0aGUgbmV4dCBsb2FkIGV2ZW50LlxuXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudElkID0gY3VycmVudExvY2F0aW9uLnNsaWNlKGN1cnJlbnRMb2NhdGlvbi5pbmRleE9mKFwiI1wiKSArIDEpO1xuICAgICAgICAgICAgICAgIC8vIFNldCB0aGUgZWxlbWVudCB0byBnbyB0byB0aGUgbmV4dCB0aW1lIHRoZSBpZnJhbWUgbG9hZHMuXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdFbGVtZW50SWQgPSBlbGVtZW50SWQ7XG4gICAgICAgICAgICAgICAgLy8gUmVsb2FkIHRoZSBpZnJhbWUgd2l0aG91dCB0aGUgYW5jaG9yLlxuICAgICAgICAgICAgICAgIHRoaXMuaWZyYW1lLnNyYyA9IGN1cnJlbnRMb2NhdGlvbi5zbGljZSgwLCBjdXJyZW50TG9jYXRpb24uaW5kZXhPZihcIiNcIikpO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHJlc29sdmUoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb25JbmZvKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IG1hbmlmZXN0ID0gYXdhaXQgTWFuaWZlc3QuZ2V0TWFuaWZlc3QodGhpcy5tYW5pZmVzdFVybCwgdGhpcy5zdG9yZSk7XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91cyA9IG1hbmlmZXN0LmdldFByZXZpb3VzU3BpbmVJdGVtKGN1cnJlbnRMb2NhdGlvbik7XG4gICAgICAgICAgICBpZiAocHJldmlvdXMgJiYgcHJldmlvdXMuaHJlZikge1xuICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNDaGFwdGVyTGluay5ocmVmID0gbmV3IFVSTChwcmV2aW91cy5ocmVmLCB0aGlzLm1hbmlmZXN0VXJsLmhyZWYpLmhyZWY7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c0NoYXB0ZXJMaW5rLmNsYXNzTmFtZSA9IFwiXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNDaGFwdGVyTGluay5yZW1vdmVBdHRyaWJ1dGUoXCJocmVmXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNDaGFwdGVyTGluay5jbGFzc05hbWUgPSBcImRpc2FibGVkXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVSZW1vdmVIb3ZlcigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBuZXh0ID0gbWFuaWZlc3QuZ2V0TmV4dFNwaW5lSXRlbShjdXJyZW50TG9jYXRpb24pO1xuICAgICAgICAgICAgaWYgKG5leHQgJiYgbmV4dC5ocmVmKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0Q2hhcHRlckxpbmsuaHJlZiA9IG5ldyBVUkwobmV4dC5ocmVmLCB0aGlzLm1hbmlmZXN0VXJsLmhyZWYpLmhyZWY7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0Q2hhcHRlckxpbmsuY2xhc3NOYW1lID0gXCJcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0Q2hhcHRlckxpbmsucmVtb3ZlQXR0cmlidXRlKFwiaHJlZlwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRDaGFwdGVyTGluay5jbGFzc05hbWUgPSBcImRpc2FibGVkXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVSZW1vdmVIb3ZlcigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZVRPQ0l0ZW0oY3VycmVudExvY2F0aW9uKTtcblxuICAgICAgICAgICAgaWYgKG1hbmlmZXN0Lm1ldGFkYXRhLnRpdGxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib29rVGl0bGUuaW5uZXJIVE1MID0gbWFuaWZlc3QubWV0YWRhdGEudGl0bGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBjaGFwdGVyVGl0bGU7XG4gICAgICAgICAgICBjb25zdCBzcGluZUl0ZW0gPSBtYW5pZmVzdC5nZXRTcGluZUl0ZW0oY3VycmVudExvY2F0aW9uKTtcbiAgICAgICAgICAgIGlmIChzcGluZUl0ZW0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjaGFwdGVyVGl0bGUgPSBzcGluZUl0ZW0udGl0bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWNoYXB0ZXJUaXRsZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvY0l0ZW0gPSBtYW5pZmVzdC5nZXRUT0NJdGVtKGN1cnJlbnRMb2NhdGlvbik7XG4gICAgICAgICAgICAgICAgaWYgKHRvY0l0ZW0gIT09IG51bGwgJiYgdG9jSXRlbS50aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICBjaGFwdGVyVGl0bGUgPSB0b2NJdGVtLnRpdGxlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNoYXB0ZXJUaXRsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhcHRlclRpdGxlLmlubmVySFRNTCA9IFwiKFwiICsgY2hhcHRlclRpdGxlICsgXCIpXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhcHRlclRpdGxlLmlubmVySFRNTCA9IFwiKEN1cnJlbnQgQ2hhcHRlcilcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZXZlbnRIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIuc2V0dXBFdmVudHModGhpcy5pZnJhbWUuY29udGVudERvY3VtZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuYW5ub3RhdG9yKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5zYXZlQ3VycmVudFJlYWRpbmdQb3NpdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5oaWRlTG9hZGluZ01lc3NhZ2UoKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd0lmcmFtZUNvbnRlbnRzKCk7XG5cbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSgoKHRoaXMuaWZyYW1lLmNvbnRlbnRXaW5kb3cgYXMgYW55KS5uYXZpZ2F0b3IgYXMgRXB1YlJlYWRpbmdTeXN0ZW0pLCBcImVwdWJSZWFkaW5nU3lzdGVtXCIsIHt2YWx1ZTogZXB1YlJlYWRpbmdTeXN0ZW0sIHdyaXRhYmxlOiBmYWxzZX0pO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4ocmVzb2x2ZSA9PiByZXNvbHZlKCkpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRoaXMuYWJvcnRPbkVycm9yKCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKF8sIHJlamVjdCkgPT4gcmVqZWN0KGVycikpLmNhdGNoKCgpID0+IHt9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYWJvcnRPbkVycm9yKCkge1xuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBpZiAodGhpcy5pc0xvYWRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZUxvYWRpbmdNZXNzYWdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHRyeUFnYWluKCkge1xuICAgICAgICB0aGlzLmlmcmFtZS5zcmMgPSB0aGlzLmlmcmFtZS5zcmM7XG4gICAgICAgIHRoaXMuZW5hYmxlT2ZmbGluZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ29CYWNrKCkge1xuICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0Rpc3BsYXllZChlbGVtZW50OiBIVE1MRGl2RWxlbWVudCB8IEhUTUxVTGlzdEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoXCIgYWN0aXZlXCIpICE9PSAtMTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dFbGVtZW50KGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50IHwgSFRNTFVMaXN0RWxlbWVudCwgY29udHJvbD86IEhUTUxBbmNob3JFbGVtZW50IHwgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKFwiIGluYWN0aXZlXCIsIFwiXCIpO1xuICAgICAgICBpZiAoZWxlbWVudC5jbGFzc05hbWUuaW5kZXhPZihcIiBhY3RpdmVcIikgPT09IC0xKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSArPSBcIiBhY3RpdmVcIjtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XG4gICAgICAgIGlmIChjb250cm9sKSB7XG4gICAgICAgICAgICBjb250cm9sLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJ0cnVlXCIpO1xuXG4gICAgICAgICAgICBjb25zdCBvcGVuSWNvbiA9IGNvbnRyb2wucXVlcnlTZWxlY3RvcihcIi5pY29uLm9wZW5cIik7XG4gICAgICAgICAgICBpZiAob3Blbkljb24gJiYgKG9wZW5JY29uLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpIHx8IFwiXCIpLmluZGV4T2YoXCIgaW5hY3RpdmUtaWNvblwiKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdJY29uQ2xhc3MgPSAob3Blbkljb24uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHwgXCJcIikgKyBcIiBpbmFjdGl2ZS1pY29uXCI7XG4gICAgICAgICAgICAgICAgb3Blbkljb24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgbmV3SWNvbkNsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNsb3NlSWNvbiA9IGNvbnRyb2wucXVlcnlTZWxlY3RvcihcIi5pY29uLmNsb3NlXCIpO1xuICAgICAgICAgICAgaWYgKGNsb3NlSWNvbikge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0ljb25DbGFzcyA9IChjbG9zZUljb24uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHxcIlwiKS5yZXBsYWNlKFwiIGluYWN0aXZlLWljb25cIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgY2xvc2VJY29uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIG5ld0ljb25DbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWRkIGJ1dHRvbnMgYW5kIGxpbmtzIGluIHRoZSBlbGVtZW50IHRvIHRoZSB0YWIgb3JkZXIuXG4gICAgICAgIGNvbnN0IGJ1dHRvbnMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIikpO1xuICAgICAgICBjb25zdCBsaW5rcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcImFcIikpO1xuICAgICAgICBmb3IgKGNvbnN0IGJ1dHRvbiBvZiBidXR0b25zKSB7XG4gICAgICAgICAgICBidXR0b24udGFiSW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgbGluayBvZiBsaW5rcykge1xuICAgICAgICAgICAgbGluay50YWJJbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhpZGVFbGVtZW50KGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50IHwgSFRNTFVMaXN0RWxlbWVudCwgY29udHJvbD86IEhUTUxBbmNob3JFbGVtZW50IHwgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKFwiIGFjdGl2ZVwiLCBcIlwiKTtcbiAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoXCIgaW5hY3RpdmVcIikgPT09IC0xKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSArPSBcIiBpbmFjdGl2ZVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuICAgICAgICBpZiAoY29udHJvbCkge1xuICAgICAgICAgICAgY29udHJvbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIFwiZmFsc2VcIik7XG5cbiAgICAgICAgICAgIGNvbnN0IG9wZW5JY29uID0gY29udHJvbC5xdWVyeVNlbGVjdG9yKFwiLmljb24ub3BlblwiKTtcbiAgICAgICAgICAgIGlmIChvcGVuSWNvbikge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0ljb25DbGFzcyA9IChvcGVuSWNvbi5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSB8fFwiXCIpLnJlcGxhY2UoXCIgaW5hY3RpdmUtaWNvblwiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICBvcGVuSWNvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBuZXdJY29uQ2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY2xvc2VJY29uID0gY29udHJvbC5xdWVyeVNlbGVjdG9yKFwiLmljb24uY2xvc2VcIik7XG4gICAgICAgICAgICBpZiAoY2xvc2VJY29uICYmIChjbG9zZUljb24uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHwgXCJcIikuaW5kZXhPZihcIiBpbmFjdGl2ZS1pY29uXCIpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0ljb25DbGFzcyA9IChjbG9zZUljb24uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHwgXCJcIikgKyBcIiBpbmFjdGl2ZS1pY29uXCI7XG4gICAgICAgICAgICAgICAgY2xvc2VJY29uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIG5ld0ljb25DbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmVtb3ZlIGJ1dHRvbnMgYW5kIGxpbmtzIGluIHRoZSBlbGVtZW50IGZyb20gdGhlIHRhYiBvcmRlci5cbiAgICAgICAgY29uc3QgYnV0dG9ucyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvblwiKSk7XG4gICAgICAgIGNvbnN0IGxpbmtzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiYVwiKSk7XG4gICAgICAgIGZvciAoY29uc3QgYnV0dG9uIG9mIGJ1dHRvbnMpIHtcbiAgICAgICAgICAgIGJ1dHRvbi50YWJJbmRleCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgbGluayBvZiBsaW5rcykge1xuICAgICAgICAgICAgbGluay50YWJJbmRleCA9IC0xO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93TW9kYWwobW9kYWw6IEhUTUxEaXZFbGVtZW50LCBjb250cm9sPzogSFRNTEFuY2hvckVsZW1lbnQgfCBIVE1MQnV0dG9uRWxlbWVudCkge1xuICAgICAgICAvLyBIaWRlIHRoZSByZXN0IG9mIHRoZSBwYWdlIGZvciBzY3JlZW4gcmVhZGVycy5cbiAgICAgICAgdGhpcy5pZnJhbWUuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuICAgICAgICB0aGlzLnNjcm9sbGluZ1N1Z2dlc3Rpb24uc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuICAgICAgICBpZiAodGhpcy51cExpbmspIHtcbiAgICAgICAgICAgIHRoaXMudXBMaW5rLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5mdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLmZ1bGxzY3JlZW4uc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udGVudHNDb250cm9sLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcbiAgICAgICAgdGhpcy5zZXR0aW5nc0NvbnRyb2wuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuICAgICAgICB0aGlzLmxpbmtzQm90dG9tLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nTWVzc2FnZS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcbiAgICAgICAgdGhpcy5pbmZvVG9wLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcbiAgICAgICAgdGhpcy5pbmZvQm90dG9tLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcblxuICAgICAgICBpZiAoY29udHJvbCkgeyAgICAgICAgXG4gICAgICAgICAgICBjb250cm9sLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaG93RWxlbWVudChtb2RhbCwgY29udHJvbCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoaWRlTW9kYWwobW9kYWw6IEhUTUxEaXZFbGVtZW50LCBjb250cm9sPzogSFRNTEFuY2hvckVsZW1lbnQgfCBIVE1MQnV0dG9uRWxlbWVudCkge1xuICAgICAgICAvLyBSZXN0b3JlIHRoZSBwYWdlIGZvciBzY3JlZW4gcmVhZGVycy5cbiAgICAgICAgdGhpcy5pZnJhbWUuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcbiAgICAgICAgdGhpcy5zY3JvbGxpbmdTdWdnZXN0aW9uLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XG4gICAgICAgIGlmICh0aGlzLnVwTGluaykge1xuICAgICAgICAgICAgdGhpcy51cExpbmsuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5mdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLmZ1bGxzY3JlZW4uc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbnRlbnRzQ29udHJvbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcImZhbHNlXCIpO1xuICAgICAgICB0aGlzLnNldHRpbmdzQ29udHJvbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcImZhbHNlXCIpO1xuICAgICAgICB0aGlzLmxpbmtzQm90dG9tLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XG4gICAgICAgIHRoaXMubG9hZGluZ01lc3NhZ2Uuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2Uuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcbiAgICAgICAgdGhpcy5pbmZvVG9wLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XG4gICAgICAgIHRoaXMuaW5mb0JvdHRvbS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcImZhbHNlXCIpO1xuXG4gICAgICAgIHRoaXMuaGlkZUVsZW1lbnQobW9kYWwsIGNvbnRyb2wpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdG9nZ2xlRnVsbHNjcmVlbkljb24oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUljb24gPSB0aGlzLmZ1bGxzY3JlZW4ucXVlcnlTZWxlY3RvcihcIi5pY29uLmFjdGl2ZS1pY29uXCIpO1xuICAgICAgICAgICAgY29uc3QgaW5hY3RpdmVJY29uID0gdGhpcy5mdWxsc2NyZWVuLnF1ZXJ5U2VsZWN0b3IoXCIuaWNvbi5pbmFjdGl2ZS1pY29uXCIpO1xuXG4gICAgICAgICAgICBpZiAoYWN0aXZlSWNvbiAmJiAoYWN0aXZlSWNvbi5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSB8fCBcIlwiKS5pbmRleE9mKFwiIGluYWN0aXZlLWljb25cIikgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SWNvbkNsYXNzID0gXCJpY29uIGluYWN0aXZlLWljb25cIjtcbiAgICAgICAgICAgICAgICBhY3RpdmVJY29uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIG5ld0ljb25DbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKGluYWN0aXZlSWNvbikge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0ljb25DbGFzcyA9IFwiaWNvbiBhY3RpdmUtaWNvblwiO1xuICAgICAgICAgICAgICAgIGluYWN0aXZlSWNvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBuZXdJY29uQ2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0b2dnbGVGdWxsc2NyZWVuKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5mdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBjb25zdCBkb2MgPSBkb2N1bWVudCBhcyBhbnk7XG4gICAgICAgICAgICBjb25zdCBkb2NFbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCBhcyBhbnk7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlcXVlc3RGdWxsU2NyZWVuID0gZG9jRWwucmVxdWVzdEZ1bGxzY3JlZW4gfHwgZG9jRWwubW96UmVxdWVzdEZ1bGxTY3JlZW4gfHwgZG9jRWwud2Via2l0UmVxdWVzdEZ1bGxTY3JlZW4gfHwgZG9jRWwubXNSZXF1ZXN0RnVsbHNjcmVlbjtcbiAgICAgICAgICAgIGNvbnN0IGNhbmNlbEZ1bGxTY3JlZW4gPSBkb2MuZXhpdEZ1bGxzY3JlZW4gfHwgZG9jLm1vekNhbmNlbEZ1bGxTY3JlZW4gfHwgZG9jLndlYmtpdEV4aXRGdWxsc2NyZWVuIHx8IGRvYy5tc0V4aXRGdWxsc2NyZWVuO1xuXG4gICAgICAgICAgICBpZiAoIWRvYy5mdWxsc2NyZWVuRWxlbWVudCAmJiAhZG9jLm1vekZ1bGxTY3JlZW5FbGVtZW50ICYmICFkb2Mud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQgJiYgIWRvYy5tc0Z1bGxzY3JlZW5FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdEZ1bGxTY3JlZW4uY2FsbChkb2NFbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbmNlbEZ1bGxTY3JlZW4uY2FsbChkb2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0b2dnbGVEaXNwbGF5KGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50IHwgSFRNTFVMaXN0RWxlbWVudCwgY29udHJvbD86IEhUTUxBbmNob3JFbGVtZW50IHwgSFRNTEJ1dHRvbkVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRGlzcGxheWVkKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dFbGVtZW50KGVsZW1lbnQsIGNvbnRyb2wpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oaWRlRWxlbWVudChlbGVtZW50LCBjb250cm9sKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdG9nZ2xlTW9kYWwobW9kYWw6IEhUTUxEaXZFbGVtZW50LCBjb250cm9sPzogSFRNTEFuY2hvckVsZW1lbnQgfCBIVE1MQnV0dG9uRWxlbWVudCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNEaXNwbGF5ZWQobW9kYWwpKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dNb2RhbChtb2RhbCwgY29udHJvbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVNb2RhbChtb2RhbCwgY29udHJvbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZVRvZ2dsZUxpbmtzQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuaGlkZVRPQygpO1xuICAgICAgICB0aGlzLmhpZGVTZXR0aW5ncygpO1xuICAgICAgICB0aGlzLnRvZ2dsZURpc3BsYXkodGhpcy5saW5rcywgdGhpcy5tZW51Q29udHJvbCk7XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmdldFNlbGVjdGVkVmlldygpID09PSB0aGlzLnNjcm9sbGVyKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc2Nyb2xsZXIuYXRCb3R0b20oKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlRGlzcGxheSh0aGlzLmxpbmtzQm90dG9tKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZVByZXZpb3VzUGFnZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCB8IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucGFnaW5hdG9yKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYWdpbmF0b3Iub25GaXJzdFBhZ2UoKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByZXZpb3VzQ2hhcHRlckxpbmsuaGFzQXR0cmlidXRlKFwiaHJlZlwiKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlOiB0aGlzLnByZXZpb3VzQ2hhcHRlckxpbmsuaHJlZixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAxXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGUocG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWdpbmF0b3IuZ29Ub1ByZXZpb3VzUGFnZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb25JbmZvKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlQ3VycmVudFJlYWRpbmdQb3NpdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVOZXh0UGFnZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCB8IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucGFnaW5hdG9yKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYWdpbmF0b3Iub25MYXN0UGFnZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubmV4dENoYXB0ZXJMaW5rLmhhc0F0dHJpYnV0ZShcImhyZWZcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZTogdGhpcy5uZXh0Q2hhcHRlckxpbmsuaHJlZixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAwXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGUocG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWdpbmF0b3IuZ29Ub05leHRQYWdlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbkluZm8oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVDdXJyZW50UmVhZGluZ1Bvc2l0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUxlZnRIb3ZlcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucGFnaW5hdG9yKSB7IFxuICAgICAgICAgICAgaWYgKHRoaXMucGFnaW5hdG9yLm9uRmlyc3RQYWdlKCkgJiYgIXRoaXMucHJldmlvdXNDaGFwdGVyTGluay5oYXNBdHRyaWJ1dGUoXCJocmVmXCIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pZnJhbWUuY2xhc3NOYW1lID0gXCJcIjsgXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaWZyYW1lLmNsYXNzTmFtZSA9IFwibGVmdC1ob3ZlclwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVSaWdodEhvdmVyKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wYWdpbmF0b3IpIHsgXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdpbmF0b3Iub25MYXN0UGFnZSgpICYmICF0aGlzLm5leHRDaGFwdGVyTGluay5oYXNBdHRyaWJ1dGUoXCJocmVmXCIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pZnJhbWUuY2xhc3NOYW1lID0gXCJcIjsgXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaWZyYW1lLmNsYXNzTmFtZSA9IFwicmlnaHQtaG92ZXJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlUmVtb3ZlSG92ZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaWZyYW1lLmNsYXNzTmFtZSA9IFwiXCI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVJbnRlcm5hbExpbmsoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG5cbiAgICAgICAgbGV0IGN1cnJlbnRMb2NhdGlvbiA9IHRoaXMuaWZyYW1lLnNyYy5zcGxpdChcIiNcIilbMF07XG4gICAgICAgIGlmICh0aGlzLmlmcmFtZS5jb250ZW50RG9jdW1lbnQgJiYgdGhpcy5pZnJhbWUuY29udGVudERvY3VtZW50LmxvY2F0aW9uICYmIHRoaXMuaWZyYW1lLmNvbnRlbnREb2N1bWVudC5sb2NhdGlvbi5ocmVmKSB7XG4gICAgICAgICAgICBjdXJyZW50TG9jYXRpb24gPSB0aGlzLmlmcmFtZS5jb250ZW50RG9jdW1lbnQubG9jYXRpb24uaHJlZi5zcGxpdChcIiNcIilbMF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZWxlbWVudCAmJiAoZWxlbWVudCBhcyBIVE1MRWxlbWVudCkudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImFcIikge1xuICAgICAgICAgICAgaWYgKChlbGVtZW50IGFzIEhUTUxBbmNob3JFbGVtZW50KS5ocmVmLnNwbGl0KFwiI1wiKVswXSA9PT0gY3VycmVudExvY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudElkID0gKGVsZW1lbnQgYXMgSFRNTEFuY2hvckVsZW1lbnQpLmhyZWYuc3BsaXQoXCIjXCIpWzFdO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuZ2V0U2VsZWN0ZWRWaWV3KCkuZ29Ub0VsZW1lbnQoZWxlbWVudElkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uSW5mbygpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZUN1cnJlbnRSZWFkaW5nUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVSZXNpemUoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVmlldyA9IHRoaXMuc2V0dGluZ3MuZ2V0U2VsZWN0ZWRWaWV3KCk7XG4gICAgICAgIGNvbnN0IG9sZFBvc2l0aW9uID0gc2VsZWN0ZWRWaWV3LmdldEN1cnJlbnRQb3NpdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IGZvbnRTaXplID0gdGhpcy5zZXR0aW5ncy5nZXRTZWxlY3RlZEZvbnRTaXplKCk7XG4gICAgICAgIGNvbnN0IGJvZHkgPSBIVE1MVXRpbGl0aWVzLmZpbmRSZXF1aXJlZElmcmFtZUVsZW1lbnQodGhpcy5pZnJhbWUuY29udGVudERvY3VtZW50LCBcImJvZHlcIikgYXMgSFRNTEJvZHlFbGVtZW50O1xuICAgICAgICBib2R5LnN0eWxlLmZvbnRTaXplID0gZm9udFNpemU7XG4gICAgICAgIGJvZHkuc3R5bGUubGluZUhlaWdodCA9IFwiMS41XCI7XG5cbiAgICAgICAgLy8gRGlzYWJsZSB0ZXh0IHNlbGVjdGlvbiBhcyB3ZSBjYW7igJl0IGhhbmRsZSB0aGlzIGNvcnJlY3RseSBhbnl3YXlcbiAgICAgICAgYm9keS5zdHlsZS53ZWJraXRVc2VyU2VsZWN0ID0gXCJub25lXCI7XG4gICAgICAgIChib2R5IGFzIGFueSkuc3R5bGUuTW96VXNlclNlbGVjdCA9IFwibm9uZVwiO1xuICAgICAgICBib2R5LnN0eWxlLm1zVXNlclNlbGVjdCA9IFwibm9uZVwiO1xuICAgICAgICBib2R5LnN0eWxlLnVzZXJTZWxlY3QgPSBcIm5vbmVcIjtcblxuICAgICAgICBjb25zdCBmb250U2l6ZU51bWJlciA9IHBhcnNlSW50KGZvbnRTaXplLnNsaWNlKDAsIC0yKSk7XG4gICAgICAgIGxldCBzaWRlTWFyZ2luID0gZm9udFNpemVOdW1iZXIgKiAyO1xuXG4gICAgICAgIGlmIChCcm93c2VyVXRpbGl0aWVzLmdldFdpZHRoKCkgPiBmb250U2l6ZU51bWJlciAqIDQ1KSB7XG4gICAgICAgICAgICBjb25zdCBleHRyYU1hcmdpbiA9IE1hdGguZmxvb3IoKEJyb3dzZXJVdGlsaXRpZXMuZ2V0V2lkdGgoKSAtIGZvbnRTaXplTnVtYmVyICogNDApIC8gMik7XG4gICAgICAgICAgICBzaWRlTWFyZ2luID0gc2lkZU1hcmdpbiArIGV4dHJhTWFyZ2luO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBhZ2luYXRvcikge1xuICAgICAgICAgICAgdGhpcy5wYWdpbmF0b3Iuc2lkZU1hcmdpbiA9IHNpZGVNYXJnaW47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsZXIuc2lkZU1hcmdpbiA9IHNpZGVNYXJnaW47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGUgbGlua3MgYXJlIGhpZGRlbiwgc2hvdyB0aGVtIHRlbXBvcmFyaWx5XG4gICAgICAgIC8vIHRvIGRldGVybWluZSB0aGUgdG9wIGFuZCBib3R0b20gaGVpZ2h0cy5cblxuICAgICAgICBjb25zdCBsaW5rc0hpZGRlbiA9ICF0aGlzLmlzRGlzcGxheWVkKHRoaXMubGlua3MpO1xuXG4gICAgICAgIGlmIChsaW5rc0hpZGRlbikge1xuICAgICAgICAgICAgdGhpcy50b2dnbGVEaXNwbGF5KHRoaXMubGlua3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdG9wSGVpZ2h0ID0gdGhpcy5saW5rcy5jbGllbnRIZWlnaHQ7XG4gICAgICAgIHRoaXMuaW5mb1RvcC5zdHlsZS5oZWlnaHQgPSB0b3BIZWlnaHQgKyBcInB4XCI7XG5cbiAgICAgICAgaWYgKGxpbmtzSGlkZGVuKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZURpc3BsYXkodGhpcy5saW5rcyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsaW5rc0JvdHRvbUhpZGRlbiA9ICF0aGlzLmlzRGlzcGxheWVkKHRoaXMubGlua3NCb3R0b20pO1xuICAgICAgICBpZiAobGlua3NCb3R0b21IaWRkZW4pIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlRGlzcGxheSh0aGlzLmxpbmtzQm90dG9tKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJvdHRvbUhlaWdodCA9IHRoaXMubGlua3NCb3R0b20uY2xpZW50SGVpZ2h0O1xuICAgICAgICB0aGlzLmluZm9Cb3R0b20uc3R5bGUuaGVpZ2h0ID0gYm90dG9tSGVpZ2h0ICsgXCJweFwiO1xuXG4gICAgICAgIGlmIChsaW5rc0JvdHRvbUhpZGRlbikge1xuICAgICAgICAgICAgdGhpcy50b2dnbGVEaXNwbGF5KHRoaXMubGlua3NCb3R0b20pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucGFnaW5hdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2luYXRvci5oZWlnaHQgPSAoQnJvd3NlclV0aWxpdGllcy5nZXRIZWlnaHQoKSAtIHRvcEhlaWdodCAtIGJvdHRvbUhlaWdodCAtIDEwKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zY3JvbGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxlci5oZWlnaHQgPSAoQnJvd3NlclV0aWxpdGllcy5nZXRIZWlnaHQoKSAtIHRvcEhlaWdodCAtIGJvdHRvbUhlaWdodCAtIDEwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGVjdGVkVmlldy5nb1RvUG9zaXRpb24ob2xkUG9zaXRpb24pO1xuICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uSW5mbygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlUG9zaXRpb25JbmZvKCkge1xuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5nZXRTZWxlY3RlZFZpZXcoKSA9PT0gdGhpcy5wYWdpbmF0b3IpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gTWF0aC5yb3VuZCh0aGlzLnBhZ2luYXRvci5nZXRDdXJyZW50UGFnZSgpKTtcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VDb3VudCA9IE1hdGgucm91bmQodGhpcy5wYWdpbmF0b3IuZ2V0UGFnZUNvdW50KCkpO1xuICAgICAgICAgICAgdGhpcy5jaGFwdGVyUG9zaXRpb24uaW5uZXJIVE1MID0gXCJQYWdlIFwiICsgY3VycmVudFBhZ2UgKyBcIiBvZiBcIiArIHBhZ2VDb3VudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hhcHRlclBvc2l0aW9uLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZVByZXZpb3VzQ2hhcHRlckNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnByZXZpb3VzQ2hhcHRlckxpbmsuaGFzQXR0cmlidXRlKFwiaHJlZlwiKSkge1xuICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgcmVzb3VyY2U6IHRoaXMucHJldmlvdXNDaGFwdGVyTGluay5ocmVmLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRlKHBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZU5leHRDaGFwdGVyQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubmV4dENoYXB0ZXJMaW5rLmhhc0F0dHJpYnV0ZShcImhyZWZcIikpIHtcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgIHJlc291cmNlOiB0aGlzLm5leHRDaGFwdGVyTGluay5ocmVmLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAwXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZShwb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVDb250ZW50c0NsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuaGlkZVNldHRpbmdzKCk7XG4gICAgICAgIHRoaXMudG9nZ2xlTW9kYWwodGhpcy50b2NWaWV3LCB0aGlzLmNvbnRlbnRzQ29udHJvbCk7XG4gICAgICAgIC8vIFdoaWxlIHRoZSBUT0MgaXMgZGlzcGxheWVkLCBwcmV2ZW50IHNjcm9sbGluZyBpbiB0aGUgYm9vay5cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZ2V0U2VsZWN0ZWRWaWV3KCkgPT09IHRoaXMuc2Nyb2xsZXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRGlzcGxheWVkKHRoaXMudG9jVmlldykpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwiYXV0b1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGlkZVRPQygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5oaWRlTW9kYWwodGhpcy50b2NWaWV3LCB0aGlzLmNvbnRlbnRzQ29udHJvbCk7XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmdldFNlbGVjdGVkVmlldygpID09PSB0aGlzLnNjcm9sbGVyKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJhdXRvXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhpZGVUT0NPbkVzY2FwZShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBjb25zdCBFU0NBUEVfS0VZID0gMjc7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcGxheWVkKHRoaXMudG9jVmlldykgJiYgZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFX0tFWSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlVE9DKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEFjdGl2ZVRPQ0l0ZW0ocmVzb3VyY2U6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zdCBhbGxJdGVtcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMudG9jVmlldy5xdWVyeVNlbGVjdG9yQWxsKFwibGkgPiBhXCIpKTtcbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGFsbEl0ZW1zKSB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTmFtZSA9IFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWN0aXZlSXRlbSA9IHRoaXMudG9jVmlldy5xdWVyeVNlbGVjdG9yKCdsaSA+IGFbaHJlZl49XCInICsgcmVzb3VyY2UgICsgJ1wiXScpO1xuICAgICAgICBpZiAoYWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgYWN0aXZlSXRlbS5jbGFzc05hbWUgPSBcImFjdGl2ZVwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVTZXR0aW5nc0NsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuaGlkZVRPQygpO1xuICAgICAgICB0aGlzLnRvZ2dsZU1vZGFsKHRoaXMuc2V0dGluZ3NWaWV3LCB0aGlzLnNldHRpbmdzQ29udHJvbCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGlkZVNldHRpbmdzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmhpZGVNb2RhbCh0aGlzLnNldHRpbmdzVmlldywgdGhpcy5zZXR0aW5nc0NvbnRyb2wpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGlkZVNldHRpbmdzT25Fc2NhcGUoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3QgRVNDQVBFX0tFWSA9IDI3O1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3BsYXllZCh0aGlzLnNldHRpbmdzVmlldykgJiYgZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFX0tFWSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlU2V0dGluZ3MoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbmF2aWdhdGUocmVhZGluZ1Bvc2l0aW9uOiBSZWFkaW5nUG9zaXRpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5oaWRlSWZyYW1lQ29udGVudHMoKTtcbiAgICAgICAgdGhpcy5zaG93TG9hZGluZ01lc3NhZ2VBZnRlckRlbGF5KCk7XG4gICAgICAgIHRoaXMubmV3UG9zaXRpb24gPSByZWFkaW5nUG9zaXRpb247XG4gICAgICAgIGlmIChyZWFkaW5nUG9zaXRpb24ucmVzb3VyY2UuaW5kZXhPZihcIiNcIikgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmlmcmFtZS5zcmMgPSByZWFkaW5nUG9zaXRpb24ucmVzb3VyY2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBXZSdyZSBuYXZpZ2F0aW5nIHRvIGFuIGFuY2hvciB3aXRoaW4gdGhlIHJlc291cmNlLFxuICAgICAgICAgICAgLy8gcmF0aGVyIHRoYW4gdGhlIHJlc291cmNlIGl0c2VsZi4gR28gdG8gdGhlIHJlc291cmNlXG4gICAgICAgICAgICAvLyBmaXJzdCwgdGhlbiBnbyB0byB0aGUgYW5jaG9yLlxuICAgICAgICAgICAgdGhpcy5uZXdFbGVtZW50SWQgPSByZWFkaW5nUG9zaXRpb24ucmVzb3VyY2Uuc2xpY2UocmVhZGluZ1Bvc2l0aW9uLnJlc291cmNlLmluZGV4T2YoXCIjXCIpICsgMSlcblxuICAgICAgICAgICAgY29uc3QgbmV3UmVzb3VyY2UgPSByZWFkaW5nUG9zaXRpb24ucmVzb3VyY2Uuc2xpY2UoMCwgcmVhZGluZ1Bvc2l0aW9uLnJlc291cmNlLmluZGV4T2YoXCIjXCIpKVxuICAgICAgICAgICAgaWYgKG5ld1Jlc291cmNlID09PSB0aGlzLmlmcmFtZS5zcmMpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGUgcmVzb3VyY2UgaXNuJ3QgY2hhbmdpbmcsIGJ1dCBoYW5kbGUgaXQgbGlrZSBhIG5ld1xuICAgICAgICAgICAgICAgIC8vIGlmcmFtZSBsb2FkIHRvIGhpZGUgdGhlIG1lbnVzIGFuZCBwb3B1cHMgYW5kIGdvIHRvIHRoZSBcbiAgICAgICAgICAgICAgICAvLyBuZXcgZWxlbWVudC5cbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUlGcmFtZUxvYWQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pZnJhbWUuc3JjID0gbmV3UmVzb3VyY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dJZnJhbWVDb250ZW50cygpIHtcbiAgICAgICAgdGhpcy5pc0JlaW5nU3R5bGVkID0gZmFsc2U7XG4gICAgICAgIC8vIFdlIHNldCBhIHRpbWVPdXQgc28gdGhhdCBzZXR0aW5ncyBjYW4gYmUgYXBwbGllZCB3aGVuIG9wYWNpdHkgaXMgc3RpbGwgMFxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0JlaW5nU3R5bGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pZnJhbWUuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxNTApO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd0xvYWRpbmdNZXNzYWdlQWZ0ZXJEZWxheSgpIHtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTG9hZGluZykge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZ01lc3NhZ2Uuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdNZXNzYWdlLmNsYXNzTGlzdC5hZGQoXCJpcy1sb2FkaW5nXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAyMDApO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGlkZUlmcmFtZUNvbnRlbnRzKCkge1xuICAgICAgICB0aGlzLmlzQmVpbmdTdHlsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmlmcmFtZS5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoaWRlTG9hZGluZ01lc3NhZ2UoKSB7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubG9hZGluZ01lc3NhZ2Uuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB0aGlzLmxvYWRpbmdNZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1sb2FkaW5nXCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgc2F2ZUN1cnJlbnRSZWFkaW5nUG9zaXRpb24oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGlmICh0aGlzLmFubm90YXRvcikge1xuICAgICAgICAgICAgY29uc3QgcmVzb3VyY2UgPSB0aGlzLmlmcmFtZS5zcmM7XG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuc2V0dGluZ3MuZ2V0U2VsZWN0ZWRWaWV3KCkuZ2V0Q3VycmVudFBvc2l0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hbm5vdGF0b3Iuc2F2ZUxhc3RSZWFkaW5nUG9zaXRpb24oe1xuICAgICAgICAgICAgICAgIHJlc291cmNlOiByZXNvdXJjZSxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb25cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KHJlc29sdmUgPT4gcmVzb2x2ZSgpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIEJyb3dzZXJVdGlsaXRpZXMgZnJvbSBcIi4vQnJvd3NlclV0aWxpdGllc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudEhhbmRsZXIge1xuICAgIHByaXZhdGUgcGVuZGluZ01vdXNlRXZlbnRTdGFydDogTW91c2VFdmVudCB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgcGVuZGluZ01vdXNlRXZlbnRFbmQ6IE1vdXNlRXZlbnQgfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIHBlbmRpbmdUb3VjaEV2ZW50U3RhcnQ6IFRvdWNoRXZlbnQgfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIHBlbmRpbmdUb3VjaEV2ZW50RW5kOiBUb3VjaEV2ZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgICBwdWJsaWMgb25MZWZ0VGFwOiAoZXZlbnQ6IFVJRXZlbnQpID0+IHZvaWQgPSAoKSA9PiB7fTtcbiAgICBwdWJsaWMgb25NaWRkbGVUYXA6IChldmVudDogVUlFdmVudCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuICAgIHB1YmxpYyBvblJpZ2h0VGFwOiAoZXZlbnQ6IFVJRXZlbnQpID0+IHZvaWQgPSAoKSA9PiB7fTtcbiAgICBwdWJsaWMgb25CYWNrd2FyZFN3aXBlOiAoZXZlbnQ6IFVJRXZlbnQpID0+IHZvaWQgPSAoKSA9PiB7fTtcbiAgICBwdWJsaWMgb25Gb3J3YXJkU3dpcGU6IChldmVudDogVUlFdmVudCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gICAgcHVibGljIG9uTGVmdEFycm93OiAoZXZlbnQ6IFVJRXZlbnQpID0+IHZvaWQgPSAoKSA9PiB7fTtcbiAgICBwdWJsaWMgb25SaWdodEFycm93OiAoZXZlbnQ6IFVJRXZlbnQpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAgIHB1YmxpYyBvbkxlZnRIb3ZlcjogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuICAgIHB1YmxpYyBvblJpZ2h0SG92ZXI6ICgpID0+IHZvaWQgPSAoKSA9PiB7fTtcbiAgICBwdWJsaWMgb25SZW1vdmVIb3ZlcjogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gICAgcHVibGljIG9uSW50ZXJuYWxMaW5rOiAoZXZlbnQ6IFVJRXZlbnQpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IENMSUNLX1BJWEVMX1RPTEVSQU5DRSA9IDEwO1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFRBUF9QSVhFTF9UT0xFUkFOQ0UgPSAxMDtcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBET1VCTEVfQ0xJQ0tfTVMgPSAyMDA7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgTE9OR19QUkVTU19NUyA9IDUwMDtcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBET1VCTEVfVEFQX01TID0gMjAwO1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFNMT1dfU1dJUEVfTVMgPSA1MDA7XG5cbiAgICBwdWJsaWMgc2V0dXBFdmVudHMoZWxlbWVudDogSFRNTEVsZW1lbnQgfCBEb2N1bWVudCB8IG51bGwpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy5oYW5kbGVUb3VjaEV2ZW50U3RhcnQuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCB0aGlzLmhhbmRsZVRvdWNoRXZlbnRFbmQuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5oYW5kbGVNb3VzZUV2ZW50U3RhcnQuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuaGFuZGxlTW91c2VFdmVudEVuZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgdGhpcy5oYW5kbGVNb3VzZU1vdmUuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5oYW5kbGVNb3VzZU1vdmUuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIHRoaXMuaGFuZGxlTW91c2VMZWF2ZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgICAgLy8gTW9zdCBjbGljayBoYW5kbGluZyBpcyBkb25lIGluIHRoZSB0b3VjaGVuZCBhbmQgbW91c2V1cCBldmVudCBoYW5kbGVycyxcbiAgICAgICAgICAgIC8vIGJ1dCBpZiB0aGVyZSdzIGEgY2xpY2sgb24gYW4gZXh0ZXJuYWwgbGluayB3ZSBuZWVkIHRvIGNhbmNlbCB0aGUgY2xpY2tcbiAgICAgICAgICAgIC8vIGV2ZW50IHRvIHByZXZlbnQgaXQgZnJvbSBvcGVuaW5nIGluIHRoZSBpZnJhbWUuXG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmhhbmRsZUxpbmtzLmJpbmQodGhpcykpO1xuXG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuaGFuZGxlS2V5Ym9hcmQuYmluZCh0aGlzKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBcImNhbm5vdCBzZXR1cCBldmVudHMgZm9yIG51bGxcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlTW91c2VFdmVudFN0YXJ0ID0gKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMucGVuZGluZ01vdXNlRXZlbnRTdGFydCA9IGV2ZW50O1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlVG91Y2hFdmVudFN0YXJ0ID0gKGV2ZW50OiBUb3VjaEV2ZW50KTogdm9pZCA9PiB7XG4gICAgICAgIGlmIChCcm93c2VyVXRpbGl0aWVzLmlzWm9vbWVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBtdWx0aS10b3VjaCBldmVudC4gSWdub3JlLlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wZW5kaW5nVG91Y2hFdmVudFN0YXJ0ID0gZXZlbnQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVNb3VzZUV2ZW50RW5kID0gKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XG4gICAgICAgIGlmICghdGhpcy5wZW5kaW5nTW91c2VFdmVudFN0YXJ0KSB7XG4gICAgICAgICAgICAvLyBTb21laG93IHdlIGdvdCBhbiBlbmQgZXZlbnQgd2l0aG91dCBhIHN0YXJ0IGV2ZW50LiBJZ25vcmUgaXQuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkZXZpY2VQaXhlbFJhdGlvID0gd2luZG93LmRldmljZVBpeGVsUmF0aW87XG5cbiAgICAgICAgY29uc3QgeERldmljZVBpeGVscyA9ICh0aGlzLnBlbmRpbmdNb3VzZUV2ZW50U3RhcnQuY2xpZW50WCAtIGV2ZW50LmNsaWVudFgpIC8gZGV2aWNlUGl4ZWxSYXRpbztcbiAgICAgICAgY29uc3QgeURldmljZVBpeGVscyA9ICh0aGlzLnBlbmRpbmdNb3VzZUV2ZW50U3RhcnQuY2xpZW50WSAtIGV2ZW50LmNsaWVudFkpIC8gZGV2aWNlUGl4ZWxSYXRpbztcblxuICAgICAgICAvLyBJcyB0aGUgZW5kIGV2ZW50IGluIHRoZSBzYW1lIHBsYWNlIGFzIHRoZSBzdGFydCBldmVudD9cbiAgICAgICAgaWYgKE1hdGguYWJzKHhEZXZpY2VQaXhlbHMpIDwgRXZlbnRIYW5kbGVyLkNMSUNLX1BJWEVMX1RPTEVSQU5DRSAmJiBNYXRoLmFicyh5RGV2aWNlUGl4ZWxzKSA8IEV2ZW50SGFuZGxlci5DTElDS19QSVhFTF9UT0xFUkFOQ0UpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBlbmRpbmdNb3VzZUV2ZW50RW5kKSB7XG4gICAgICAgICAgICAgICAgLy8gVGhpcyB3YXMgYSBkb3VibGUgY2xpY2suIExldCB0aGUgYnJvd3NlciBoYW5kbGUgaXQuXG4gICAgICAgICAgICAgICAgdGhpcy5wZW5kaW5nTW91c2VFdmVudFN0YXJ0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLnBlbmRpbmdNb3VzZUV2ZW50RW5kID0gbnVsbDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRoaXMgd2FzIGEgc2luZ2xlIGNsaWNrLlxuICAgICAgICAgICAgdGhpcy5wZW5kaW5nTW91c2VFdmVudFN0YXJ0ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMucGVuZGluZ01vdXNlRXZlbnRFbmQgPSBldmVudDtcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5oYW5kbGVDbGljaywgRXZlbnRIYW5kbGVyLkRPVUJMRV9DTElDS19NUyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBlbmRpbmdNb3VzZUV2ZW50RW5kID0gbnVsbDtcblxuICAgICAgICAvLyBUaGlzIGlzIGEgc3dpcGUgb3IgaGlnaGxpZ2h0LiBMZXQgdGhlIGJyb3dzZXIgaGFuZGxlIGl0LlxuICAgICAgICAvLyAoU3dpcGVzIGFyZW4ndCBoYW5kbGVkIG9uIGRlc2t0b3AuKVxuICAgICAgICB0aGlzLnBlbmRpbmdNb3VzZUV2ZW50U3RhcnQgPSBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlVG91Y2hFdmVudEVuZCA9IChldmVudDogVG91Y2hFdmVudCk6IHZvaWQgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoQnJvd3NlclV0aWxpdGllcy5pc1pvb21lZCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoICE9PSAxKSB7XG4gICAgICAgICAgICAvLyBUaGlzIGlzIGEgbXVsdGktdG91Y2ggZXZlbnQuIElnbm9yZS5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5wZW5kaW5nVG91Y2hFdmVudFN0YXJ0KSB7XG4gICAgICAgICAgICAvLyBTb21laG93IHdlIGdvdCBhbiBlbmQgZXZlbnQgd2l0aG91dCBhIHN0YXJ0IGV2ZW50LiBJZ25vcmUgaXQuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzdGFydFRvdWNoID0gdGhpcy5wZW5kaW5nVG91Y2hFdmVudFN0YXJ0LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICBjb25zdCBlbmRUb3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuXG4gICAgICAgIGlmICghc3RhcnRUb3VjaCkge1xuICAgICAgICAgICAgLy8gU29tZWhvdyB3ZSBzYXZlZCBhIHRvdWNoIGV2ZW50IHdpdGggbm8gdG91Y2hlcy5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRldmljZVBpeGVsUmF0aW8gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcblxuICAgICAgICBjb25zdCB4RGV2aWNlUGl4ZWxzID0gKHN0YXJ0VG91Y2guY2xpZW50WCAtIGVuZFRvdWNoLmNsaWVudFgpIC8gZGV2aWNlUGl4ZWxSYXRpbztcbiAgICAgICAgY29uc3QgeURldmljZVBpeGVscyA9IChzdGFydFRvdWNoLmNsaWVudFkgLSBlbmRUb3VjaC5jbGllbnRZKSAvIGRldmljZVBpeGVsUmF0aW87XG5cbiAgICAgICAgLy8gSXMgdGhlIGVuZCBldmVudCBpbiB0aGUgc2FtZSBwbGFjZSBhcyB0aGUgc3RhcnQgZXZlbnQ/XG4gICAgICAgIGlmIChNYXRoLmFicyh4RGV2aWNlUGl4ZWxzKSA8IEV2ZW50SGFuZGxlci5UQVBfUElYRUxfVE9MRVJBTkNFICYmIE1hdGguYWJzKHlEZXZpY2VQaXhlbHMpIDwgRXZlbnRIYW5kbGVyLlRBUF9QSVhFTF9UT0xFUkFOQ0UpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBlbmRpbmdUb3VjaEV2ZW50RW5kKSB7XG4gICAgICAgICAgICAgICAgLy8gVGhpcyB3YXMgYSBkb3VibGUgdGFwLiBMZXQgdGhlIGJyb3dzZXIgaGFuZGxlIGl0LlxuICAgICAgICAgICAgICAgIHRoaXMucGVuZGluZ1RvdWNoRXZlbnRTdGFydCA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5wZW5kaW5nVG91Y2hFdmVudEVuZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUaGlzIHdhcyBhIHNpbmdsZSB0YXAgb3IgbG9uZyBwcmVzcy5cbiAgICAgICAgICAgIGlmIChldmVudC50aW1lU3RhbXAgLSB0aGlzLnBlbmRpbmdUb3VjaEV2ZW50U3RhcnQudGltZVN0YW1wID4gRXZlbnRIYW5kbGVyLkxPTkdfUFJFU1NfTVMpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIHdhcyBhIGxvbmcgcHJlc3MuIExldCB0aGUgYnJvd3NlciBoYW5kbGUgaXQuXG4gICAgICAgICAgICAgICAgdGhpcy5wZW5kaW5nVG91Y2hFdmVudFN0YXJ0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLnBlbmRpbmdUb3VjaEV2ZW50RW5kID0gbnVsbDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRoaXMgd2FzIGEgc2luZ2xlIHRhcC5cbiAgICAgICAgICAgIHRoaXMucGVuZGluZ1RvdWNoRXZlbnRTdGFydCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnBlbmRpbmdUb3VjaEV2ZW50RW5kID0gZXZlbnQ7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMuaGFuZGxlVGFwLCBFdmVudEhhbmRsZXIuRE9VQkxFX1RBUF9NUyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBlbmRpbmdUb3VjaEV2ZW50RW5kID0gbnVsbDtcblxuICAgICAgICBpZiAoZXZlbnQudGltZVN0YW1wIC0gdGhpcy5wZW5kaW5nVG91Y2hFdmVudFN0YXJ0LnRpbWVTdGFtcCA+IEV2ZW50SGFuZGxlci5TTE9XX1NXSVBFX01TKSB7XG4gICAgICAgICAgICAvLyBUaGlzIGlzIGEgc2xvdyBzd2lwZSAvIGhpZ2hsaWdodC4gTGV0IHRoZSBicm93c2VyIGhhbmRsZSBpdC5cbiAgICAgICAgICAgIHRoaXMucGVuZGluZ1RvdWNoRXZlbnRTdGFydCA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGlzIGlzIGEgc3dpcGUuIFxuICAgICAgICBjb25zdCBzbG9wZSA9IChzdGFydFRvdWNoLmNsaWVudFkgLSBlbmRUb3VjaC5jbGllbnRZKSAvIChzdGFydFRvdWNoLmNsaWVudFggLSBlbmRUb3VjaC5jbGllbnRYKTtcbiAgICAgICAgaWYgKE1hdGguYWJzKHNsb3BlKSA+IDAuNSkge1xuICAgICAgICAgICAgLy8gVGhpcyBpcyBhIG1vc3RseSB2ZXJ0aWNhbCBzd2lwZS4gSWdub3JlLlxuICAgICAgICAgICAgdGhpcy5wZW5kaW5nVG91Y2hFdmVudFN0YXJ0ID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoaXMgd2FzIGEgaG9yaXpvbnRhbCBzd2lwZS5cbiAgICAgICAgaWYgKHhEZXZpY2VQaXhlbHMgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLm9uQmFja3dhcmRTd2lwZShldmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uRm9yd2FyZFN3aXBlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBlbmRpbmdUb3VjaEV2ZW50U3RhcnQgPSBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlQ2xpY2sgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIGlmICghdGhpcy5wZW5kaW5nTW91c2VFdmVudEVuZCkge1xuICAgICAgICAgICAgLy8gQW5vdGhlciBjbGljayBoYXBwZW5lZCBhbHJlYWR5LlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2hlY2tGb3JMaW5rKHRoaXMucGVuZGluZ01vdXNlRXZlbnRFbmQpKSB7XG4gICAgICAgICAgICAvLyBUaGlzIHdhcyBhIHNpbmdsZSBjbGljayBvbiBhIGxpbmsuIERvIG5vdGhpbmcuXG4gICAgICAgICAgICB0aGlzLnBlbmRpbmdNb3VzZUV2ZW50RW5kID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoaXMgd2FzIGEgc2luZ2xlIGNsaWNrLlxuICAgICAgICBjb25zdCB4ID0gdGhpcy5wZW5kaW5nTW91c2VFdmVudEVuZC5jbGllbnRYO1xuICAgICAgICBjb25zdCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBpZiAoeCAvIHdpZHRoIDwgMC4zKSB7XG4gICAgICAgICAgICB0aGlzLm9uTGVmdFRhcCh0aGlzLnBlbmRpbmdNb3VzZUV2ZW50RW5kKTtcbiAgICAgICAgfSBlbHNlIGlmICh4IC8gd2lkdGggPiAwLjcpIHtcbiAgICAgICAgICAgIHRoaXMub25SaWdodFRhcCh0aGlzLnBlbmRpbmdNb3VzZUV2ZW50RW5kKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub25NaWRkbGVUYXAodGhpcy5wZW5kaW5nTW91c2VFdmVudEVuZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wZW5kaW5nTW91c2VFdmVudEVuZCA9IG51bGw7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZVRhcCA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLnBlbmRpbmdUb3VjaEV2ZW50RW5kKSB7XG4gICAgICAgICAgICAvLyBBbm90aGVyIHRhcCBoYXBwZW5lZCBhbHJlYWR5LlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2hlY2tGb3JMaW5rKHRoaXMucGVuZGluZ1RvdWNoRXZlbnRFbmQpKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUxpbmtzKHRoaXMucGVuZGluZ1RvdWNoRXZlbnRFbmQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBUaGlzIHdhcyBhIHNpbmdsZSB0YXAgb24gYSBsaW5rLiBEbyBub3RoaW5nLlxuICAgICAgICAgICAgdGhpcy5wZW5kaW5nVG91Y2hFdmVudEVuZCA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGlzIHdhcyBhIHNpbmdsZSB0YXAuXG4gICAgICAgIGNvbnN0IHRvdWNoID0gdGhpcy5wZW5kaW5nVG91Y2hFdmVudEVuZC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgICAgaWYgKCF0b3VjaCkge1xuICAgICAgICAgICAgLy8gU29tZWhvdyB3ZSBnb3QgYSB0b3VjaCBldmVudCB3aXRoIG5vIHRvdWNoZXMuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB4ID0gdG91Y2guY2xpZW50WDtcbiAgICAgICAgY29uc3Qgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgaWYgKHggLyB3aWR0aCA8IDAuMykge1xuICAgICAgICAgICAgdGhpcy5vbkxlZnRUYXAodGhpcy5wZW5kaW5nVG91Y2hFdmVudEVuZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoeCAvIHdpZHRoID4gMC43KSB7XG4gICAgICAgICAgICB0aGlzLm9uUmlnaHRUYXAodGhpcy5wZW5kaW5nVG91Y2hFdmVudEVuZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uTWlkZGxlVGFwKHRoaXMucGVuZGluZ1RvdWNoRXZlbnRFbmQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGVuZGluZ1RvdWNoRXZlbnRFbmQgPSBudWxsO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGVja0ZvckxpbmsgPSAoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KTogSFRNTEFuY2hvckVsZW1lbnQgfCBudWxsID0+IHtcbiAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gZXZlbnQudGFyZ2V0IGFzIEVsZW1lbnQ7XG4gICAgICAgIHdoaWxlIChuZXh0RWxlbWVudCAmJiBuZXh0RWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09IFwiYm9keVwiKSB7XG4gICAgICAgICAgICBpZiAobmV4dEVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImFcIiAmJiAobmV4dEVsZW1lbnQgYXMgSFRNTEFuY2hvckVsZW1lbnQpLmhyZWYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKG5leHRFbGVtZW50IGFzIEhUTUxBbmNob3JFbGVtZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgKG5leHRFbGVtZW50IGFzIGFueSkgPSBuZXh0RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlTW91c2VNb3ZlID0gKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XG4gICAgICAgIGNvbnN0IHggPSBldmVudC5jbGllbnRYO1xuICAgICAgICBjb25zdCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBpZiAoeCAvIHdpZHRoIDwgMC4zKSB7XG4gICAgICAgICAgICB0aGlzLm9uTGVmdEhvdmVyKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoeCAvIHdpZHRoID4gMC43KSB7XG4gICAgICAgICAgICB0aGlzLm9uUmlnaHRIb3ZlcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vblJlbW92ZUhvdmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZU1vdXNlTGVhdmUgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMub25SZW1vdmVIb3ZlcigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlTGlua3MgPSAoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KTogdm9pZCA9PiB7XG4gICAgICAgIGNvbnN0IGxpbmsgPSB0aGlzLmNoZWNrRm9yTGluayhldmVudCk7XG4gICAgICAgIGlmIChsaW5rKSB7XG4gICAgICAgICAgICAvLyBPcGVuIGV4dGVybmFsIGxpbmtzIGluIG5ldyB0YWJzLlxuICAgICAgICAgICAgY29uc3QgaXNTYW1lT3JpZ2luID0gKFxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCA9PT0gbGluay5wcm90b2NvbCAmJlxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wb3J0ID09PSBsaW5rLnBvcnQgJiZcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgPT09IGxpbmsuaG9zdG5hbWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBpc0ludGVybmFsID0gKGxpbmsuaHJlZi5pbmRleE9mKFwiI1wiKSk7XG4gICAgICAgICAgICBpZiAoIWlzU2FtZU9yaWdpbikge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKGxpbmsuaHJlZiwgXCJfYmxhbmtcIik7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNTYW1lT3JpZ2luICYmIGlzSW50ZXJuYWwgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkludGVybmFsTGluayhldmVudCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzU2FtZU9yaWdpbiAmJiBpc0ludGVybmFsID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGxpbmsuY2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlS2V5Ym9hcmQgPSAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkID0+IHtcbiAgICAgICAgY29uc3QgTEVGVF9BUlJPVyA9IDM3O1xuICAgICAgICBjb25zdCBSSUdIVF9BUlJPVyA9IDM5O1xuICAgICAgICBjb25zdCBUQUJfS0VZID0gOTtcblxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gTEVGVF9BUlJPVykge1xuICAgICAgICAgICAgdGhpcy5vbkxlZnRBcnJvdyhldmVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gUklHSFRfQVJST1cpIHtcbiAgICAgICAgICAgIHRoaXMub25SaWdodEFycm93KGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSBUQUJfS0VZKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0=