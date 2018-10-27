var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
define("Annotator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("BookFont", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("BookView", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("BookTheme", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("HTMLUtilities", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /** Returns a single element matching the selector within the parentElement,
        or null if no element matches. */
    function findElement(parentElement, selector) {
        return parentElement.querySelector(selector);
    }
    exports.findElement = findElement;
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
    exports.findRequiredElement = findRequiredElement;
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
    exports.findIframeElement = findIframeElement;
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
    exports.findRequiredIframeElement = findRequiredIframeElement;
    /** Sets an attribute and its value for an HTML element */
    function setAttr(element, attr, value) {
        element.setAttribute(attr, value);
    }
    exports.setAttr = setAttr;
    /** Removes an attribute for an HTML element */
    function removeAttr(element, attr) {
        element.removeAttribute(attr);
    }
    exports.removeAttr = removeAttr;
    /** Creates an internal stylesheet in an HTML element */
    function createStylesheet(element, id, cssStyles) {
        var head = element.querySelector("head");
        var stylesheet = document.createElement("style");
        stylesheet.id = id;
        stylesheet.textContent = cssStyles;
        head.appendChild(stylesheet);
    }
    exports.createStylesheet = createStylesheet;
    /** Removes an existing internal stylesheet in an HTML element */
    function removeStylesheet(element, id) {
        var head = element.querySelector("head");
        var stylesheet = head.querySelector("#" + id);
        head.removeChild(stylesheet);
    }
    exports.removeStylesheet = removeStylesheet;
});
define("Store", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("IconLib", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WIDTH_ATTR = 24;
    exports.HEIGHT_ATTR = 24;
    exports.VIEWBOX_ATTR = "0 0 24 24";
    var iconTemplate = function (id, title, path, classAttr) {
        if (classAttr === void 0) { classAttr = "icon"; }
        return "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"" + exports.WIDTH_ATTR + "\" height=\"" + exports.HEIGHT_ATTR + "\" viewBox=\"" + exports.VIEWBOX_ATTR + "\" preserveAspectRatio=\"xMidYMid meet\" role=\"img\" class=\"" + classAttr + "\" aria-labelledBy=\"" + id + "\">\n  <title id=\"" + id + "\">" + title + "</title>\n  " + path + "\n</svg>";
    };
    var iconSymbol = function (id, title, path, classAttr) {
        if (classAttr === void 0) { classAttr = "svgIcon use"; }
        return "<svg xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"xMidYMid meet\" role=\"img\" class=\"" + classAttr + "\">\n  <defs>\n    <symbol id=\"" + id + "\" viewBox=\"" + exports.VIEWBOX_ATTR + "\">\n      <title>" + title + "</title>\n      " + path + "\n    </symbol>\n  </defs>\n</svg>";
    };
    var iconUse = function (id, classAttr) { return "<svg xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"xMidYMid meet\" class=\"" + classAttr + "\" role=\"img\" aria-labelledby=\"" + id + "\">\n  <use xlink:href=\"#" + id + "\"></use>\n</svg>"; };
    exports.icons = {
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
});
define("BookSettings", ["require", "exports", "HTMLUtilities", "IconLib"], function (require, exports, HTMLUtilities, IconLib) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                    return optionTemplate("reading-style", bookFont.name, bookFont.label, "menuitem", IconLib.icons.checkDupe, bookFont.label);
                });
                sections.push(sectionTemplate(fontOptions.join("")));
            }
            if (this.fontSizes.length > 1) {
                var fontSizeOptions = optionTemplate("font-setting", "decrease", "A-", "menuitem", "", "decrease-font") + optionTemplate("font-setting", "increase", "A+", "menuitem", "", "increase-font");
                sections.push(sectionTemplate(fontSizeOptions));
            }
            if (this.bookThemes.length > 1) {
                var themeOptions = this.bookThemes.map(function (bookTheme) {
                    return optionTemplate("reading-theme", bookTheme.name, bookTheme.label, "menuitem", IconLib.icons.checkDupe, bookTheme.label);
                });
                sections.push(sectionTemplate(themeOptions.join("")));
            }
            if (this.bookViews.length > 1) {
                var viewOptions = this.bookViews.map(function (bookView) {
                    return optionTemplate("reading-style", bookView.name, bookView.label, "menuitem", IconLib.icons.checkDupe, bookView.label);
                });
                sections.push(sectionTemplate(viewOptions.join("")));
            }
            sections.push(offlineTemplate);
            element.innerHTML = template(sections.join(""));
            this.fontButtons = {};
            if (this.bookFonts.length > 1) {
                for (var _i = 0, _a = this.bookFonts; _i < _a.length; _i++) {
                    var bookFont = _a[_i];
                    this.fontButtons[bookFont.name] = HTMLUtilities.findRequiredElement(element, "button[class=" + bookFont.name + "]");
                }
                this.updateFontButtons();
            }
            this.fontSizeButtons = {};
            if (this.fontSizes.length > 1) {
                for (var _b = 0, _c = ["decrease", "increase"]; _b < _c.length; _b++) {
                    var fontSizeName = _c[_b];
                    this.fontSizeButtons[fontSizeName] = HTMLUtilities.findRequiredElement(element, "button[class=" + fontSizeName + "]");
                }
                this.updateFontSizeButtons();
            }
            this.themeButtons = {};
            if (this.bookThemes.length > 1) {
                for (var _d = 0, _e = this.bookThemes; _d < _e.length; _d++) {
                    var bookTheme = _e[_d];
                    this.themeButtons[bookTheme.name] = HTMLUtilities.findRequiredElement(element, "button[class=" + bookTheme.name + "]");
                }
                this.updateThemeButtons();
            }
            this.viewButtons = {};
            if (this.bookViews.length > 1) {
                for (var _f = 0, _g = this.bookViews; _f < _g.length; _f++) {
                    var bookView = _g[_f];
                    this.viewButtons[bookView.name] = HTMLUtilities.findRequiredElement(element, "button[class=" + bookView.name + "]");
                }
                this.updateViewButtons();
            }
            this.offlineStatusElement = HTMLUtilities.findRequiredElement(element, 'div[class="offline-status"]');
            this.setupEvents();
            // Clicking the settings view outside the ul hides it, but clicking inside the ul keeps it up.
            HTMLUtilities.findRequiredElement(element, "ul").addEventListener("click", function (event) {
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
    exports.default = BookSettings;
    ;
});
define("BrowserUtilities", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /** Returns the current width of the document. */
    function getWidth() {
        return document.documentElement.clientWidth;
    }
    exports.getWidth = getWidth;
    /** Returns the current height of the document. */
    function getHeight() {
        return document.documentElement.clientHeight;
    }
    exports.getHeight = getHeight;
    /** Returns true if the browser is zoomed in with pinch-to-zoom on mobile. */
    function isZoomed() {
        return (getWidth() !== window.innerWidth);
    }
    exports.isZoomed = isZoomed;
});
define("Cacher", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    })(CacheStatus = exports.CacheStatus || (exports.CacheStatus = {}));
});
define("PaginatedBookView", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("ColumnsPaginatedBookView", ["require", "exports", "HTMLUtilities", "BrowserUtilities"], function (require, exports, HTMLUtilities, BrowserUtilities) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            var body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body");
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
            var head = HTMLUtilities.findIframeElement(this.bookElement.contentDocument, "head");
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
            var body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body");
            var originalLeft = (body.style.left || "0px").slice(0, -2);
            var originalScrollWidth = body.scrollWidth;
            body.style.left = (originalLeft - 1) + "px";
            this.hasFixedScrollWidth = (body.scrollWidth === originalScrollWidth);
            body.style.left = originalLeft + "px";
        };
        ColumnsPaginatedBookView.prototype.setSize = function () {
            // any is necessary because CSSStyleDeclaration type does not include
            // all the vendor-prefixed attributes.
            var body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body");
            var width = (BrowserUtilities.getWidth() - this.sideMargin * 2) + "px";
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
            this.bookElement.style.width = BrowserUtilities.getWidth() + "px";
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
            var body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body");
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
            var body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body");
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
            var body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body");
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
            var body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body");
            return body.offsetWidth + this.sideMargin * 2;
        };
        /** Shifts the columns so that the specified width is positioned
            to the left of the iframe viewport. */
        ColumnsPaginatedBookView.prototype.setLeftColumnsWidth = function (width) {
            var body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body");
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
    exports.default = ColumnsPaginatedBookView;
});
define("DayTheme", ["require", "exports", "HTMLUtilities"], function (require, exports, HTMLUtilities) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DayTheme = /** @class */ (function () {
        function DayTheme() {
            this.name = "day-theme";
            this.label = "Day";
        }
        DayTheme.prototype.start = function () {
            var rootElement = document.documentElement;
            HTMLUtilities.setAttr(rootElement, "data-viewer-theme", "day");
        };
        DayTheme.prototype.stop = function () {
            var rootElement = document.documentElement;
            HTMLUtilities.removeAttr(rootElement, "data-viewer-theme");
        };
        return DayTheme;
    }());
    exports.default = DayTheme;
});
define("EventHandler", ["require", "exports", "BrowserUtilities"], function (require, exports, BrowserUtilities) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                if (BrowserUtilities.isZoomed()) {
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
                if (BrowserUtilities.isZoomed()) {
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
    exports.default = EventHandler;
});
define("Navigator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("PublisherFont", ["require", "exports", "HTMLUtilities"], function (require, exports, HTMLUtilities) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PublisherFont = /** @class */ (function () {
        function PublisherFont() {
            this.name = "publisher-font";
            this.label = "Publisher";
        }
        PublisherFont.prototype.start = function () {
            var rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html");
            HTMLUtilities.setAttr(rootFrame, "data-viewer-font", "publisher");
        };
        PublisherFont.prototype.stop = function () {
            var rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html");
            HTMLUtilities.removeAttr(rootFrame, "data-viewer-font");
        };
        return PublisherFont;
    }());
    exports.default = PublisherFont;
});
define("SerifFont", ["require", "exports", "HTMLUtilities"], function (require, exports, HTMLUtilities) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SerifFont = /** @class */ (function () {
        function SerifFont() {
            this.name = "serif-font";
            this.label = "Serif";
        }
        SerifFont.prototype.start = function () {
            var rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html");
            HTMLUtilities.setAttr(rootFrame, "data-viewer-font", "serif");
            HTMLUtilities.createStylesheet(rootFrame, "serif-font-internal", "* {font-family: 'Iowan Old Style', 'Sitka Text', Palatino, 'Book Antiqua', serif !important;}");
        };
        SerifFont.prototype.stop = function () {
            var rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html");
            HTMLUtilities.removeAttr(rootFrame, "data-viewer-font");
            HTMLUtilities.removeStylesheet(rootFrame, "serif-font-internal");
        };
        return SerifFont;
    }());
    exports.default = SerifFont;
});
define("SansFont", ["require", "exports", "HTMLUtilities"], function (require, exports, HTMLUtilities) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SansFont = /** @class */ (function () {
        function SansFont() {
            this.name = "sans-font";
            this.label = "Sans-serif";
        }
        SansFont.prototype.start = function () {
            var rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html");
            HTMLUtilities.setAttr(rootFrame, "data-viewer-font", "sans");
            HTMLUtilities.createStylesheet(rootFrame, "sans-font-internal", "* {font-family: Seravek, Calibri, Roboto, Arial, sans-serif !important;}");
        };
        SansFont.prototype.stop = function () {
            var rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html");
            HTMLUtilities.removeAttr(rootFrame, "data-viewer-font");
            HTMLUtilities.removeStylesheet(rootFrame, "sans-font-internal");
        };
        return SansFont;
    }());
    exports.default = SansFont;
});
define("SepiaTheme", ["require", "exports", "HTMLUtilities"], function (require, exports, HTMLUtilities) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SepiaTheme = /** @class */ (function () {
        function SepiaTheme() {
            this.name = "sepia-theme";
            this.label = "Sepia";
        }
        SepiaTheme.prototype.start = function () {
            var rootElement = document.documentElement;
            var rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html");
            HTMLUtilities.setAttr(rootElement, "data-viewer-theme", "sepia");
            HTMLUtilities.createStylesheet(rootFrame, "sepia-mode-internal", ":root {background-color: #f6ecd9 !important}  img, svg {background-color: transparent !important; mix-blend-mode: multiply;}");
        };
        SepiaTheme.prototype.stop = function () {
            var rootElement = document.documentElement;
            var rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html");
            HTMLUtilities.removeAttr(rootElement, "data-viewer-theme");
            HTMLUtilities.removeStylesheet(rootFrame, "sepia-mode-internal");
        };
        return SepiaTheme;
    }());
    exports.default = SepiaTheme;
});
define("NightTheme", ["require", "exports", "HTMLUtilities"], function (require, exports, HTMLUtilities) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NightTheme = /** @class */ (function () {
        function NightTheme() {
            this.name = "night-theme";
            this.label = "Night";
        }
        NightTheme.prototype.start = function () {
            var rootElement = document.documentElement;
            var rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html");
            HTMLUtilities.setAttr(rootElement, "data-viewer-theme", "night");
            HTMLUtilities.createStylesheet(rootFrame, "night-mode-internal", ":root {background-color: #111 !important; color: #FFFFFF !important} :not(a) {background-color: transparent !important; color: #FFFFFF !important; border-color: currentColor !important;} a {color: #53CEEA !important;}");
        };
        NightTheme.prototype.stop = function () {
            var rootElement = document.documentElement;
            var rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html");
            HTMLUtilities.removeAttr(rootElement, "data-viewer-theme");
            HTMLUtilities.removeStylesheet(rootFrame, "night-mode-internal");
        };
        return NightTheme;
    }());
    exports.default = NightTheme;
});
define("ScrollingBookView", ["require", "exports", "BrowserUtilities", "HTMLUtilities"], function (require, exports, BrowserUtilities, HTMLUtilities) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            this.bookElement.style.width = BrowserUtilities.getWidth() + "px";
            var body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body");
            var width = (BrowserUtilities.getWidth() - this.sideMargin * 2) + "px";
            body.style.width = width;
            body.style.marginLeft = this.sideMargin + "px";
            body.style.marginRight = this.sideMargin + "px";
            var minHeight = this.height;
            var bodyHeight = body.scrollHeight;
            this.bookElement.style.height = Math.max(minHeight, bodyHeight) + "px";
            var images = Array.prototype.slice.call(body.querySelectorAll("img"));
            for (var _i = 0, images_3 = images; _i < images_3.length; _i++) {
                var image = images_3[_i];
                image.style.maxWidth = width;
            }
        };
        ScrollingBookView.prototype.start = function (position) {
            this.goToPosition(position);
        };
        ScrollingBookView.prototype.stop = function () {
            this.bookElement.style.height = "";
            this.bookElement.style.width = "";
            var body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body");
            body.style.width = "";
            body.style.marginLeft = "";
            body.style.marginRight = "";
            var images = Array.prototype.slice.call(body.querySelectorAll("img"));
            for (var _i = 0, images_4 = images; _i < images_4.length; _i++) {
                var image = images_4[_i];
                image.style.maxWidth = "";
            }
        };
        ScrollingBookView.prototype.getCurrentPosition = function () {
            return document.body.scrollTop / document.body.scrollHeight;
        };
        ScrollingBookView.prototype.atBottom = function () {
            return (document.body.scrollHeight - document.body.scrollTop) === BrowserUtilities.getHeight();
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
    exports.default = ScrollingBookView;
});
define("Manifest", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.default = Manifest;
});
define("IFrameNavigator", ["require", "exports", "Cacher", "Manifest", "EventHandler", "BrowserUtilities", "HTMLUtilities", "IconLib"], function (require, exports, Cacher_1, Manifest_1, EventHandler_1, BrowserUtilities, HTMLUtilities, IconLib) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var epubReadingSystemObject = {
        name: "Webpub viewer",
        version: "0.1.0"
    };
    var epubReadingSystem = Object.freeze(epubReadingSystemObject);
    var upLinkTemplate = function (href, label, ariaLabel) { return "\n  <a rel=\"up\" href='" + href + "' aria-label=\"" + ariaLabel + "\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"" + IconLib.WIDTH_ATTR + "\" height=\"" + IconLib.HEIGHT_ATTR + "\" viewBox=\"" + IconLib.VIEWBOX_ATTR + "\" aria-labelledby=\"up-label\" preserveAspectRatio=\"xMidYMid meet\" role=\"img\" class=\"icon\">\n      <title id=\"up-label\">" + label + "</title>\n      " + IconLib.icons.home + "\n    </svg>\n    <span class=\"setting-text up\">" + label + "</span>\n  </a>\n"; };
    var template = "\n  <nav class=\"publication\">\n    <div class=\"controls-trigger\">\n      <button class=\"trigger\" aria-haspopup=\"true\" aria-expanded=\"true\">\n        " + IconLib.icons.menu + "\n      </button>\n    </div>\n    <div class=\"controls\">\n        " + IconLib.icons.closeOriginal + "\n        " + IconLib.icons.checkOriginal + "\n      <a href=\"#settings-control\" class=\"scrolling-suggestion\" style=\"display: none\">\n          We recommend scrolling mode for use with screen readers and keyboard navigation.\n          Go to settings to switch to scrolling mode.\n      </a>\n      <ul class=\"links top active\">\n        <li>\n          <button class=\"contents disabled\" aria-labelledby=\"contents-label\" aria-haspopup=\"true\" aria-expanded=\"false\">\n            " + IconLib.icons.toc + "\n            " + IconLib.icons.closeDupe + "\n            <span class=\"setting-text contents\" id=\"contents-label\">Contents</span>\n          </button>\n          <div class=\"contents-view controls-view inactive\" aria-hidden=\"true\"></div>\n        </li>\n        <li>\n          <button id=\"settings-control\" class=\"settings\" aria-labelledby=\"settings-label\" aria-expanded=\"false\" aria-haspopup=\"true\">\n            " + IconLib.icons.settings + "\n            " + IconLib.icons.closeDupe + "\n            <span class=\"setting-text settings\" id=\"settings-label\">Settings</span>\n          </button>\n          <div class=\"settings-view controls-view inactive\" aria-hidden=\"true\"></div>\n        </li>\n      </ul>\n    </div>\n    <!-- /controls -->\n  </nav>\n  <main style=\"overflow: hidden\" tabindex=-1>\n    <div class=\"loading\" style=\"display:none;\">\n      " + IconLib.icons.loading + "\n    </div>\n    <div class=\"error\" style=\"display:none;\">\n      <span>\n        " + IconLib.icons.error + "\n      </span>\n      <span>There was an error loading this page.</span>\n      <button class=\"go-back\">Go back</button>\n      <button class=\"try-again\">Try again</button>\n    </div>\n    <div class=\"info top\">\n      <span class=\"book-title\"></span>\n    </div>\n    <iframe allowtransparency=\"true\" title=\"book text\" style=\"border:0; overflow: hidden;\"></iframe>\n    <div class=\"info bottom\">\n      <span class=\"chapter-position\"></span>\n      <span class=\"chapter-title\"></span>\n    </div>\n  </main>\n  <nav class=\"publication\">\n    <div class=\"controls\">\n      <ul class=\"links bottom active\">\n        <li>\n          <a rel=\"prev\" class=\"disabled\" role=\"button\" aria-labelledby=\"previous-label\">\n          " + IconLib.icons.previous + "\n          <span class=\"chapter-control\" id=\"previous-label\">Previous Chapter</span>\n          </a>\n        </li>\n        <li aria-label=\"chapters\">Chapters</li>\n        <li>\n          <a rel=\"next\" class=\"disabled\" role=\"button\" aria-labelledby=\"next-label\">\n            <span class=\"chapter-control\" id =\"next-label\">Next Chapter</span>\n            " + IconLib.icons.next + "\n          </a>\n        </li>\n      </ul>\n    </div>\n    <!-- /controls -->\n  </nav>\n";
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
            this.eventHandler = eventHandler || new EventHandler_1.default();
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
                var settingsButtons, lastSettingsButton, err_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            element.innerHTML = template;
                            this.manifestUrl = manifestUrl;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            this.iframe = HTMLUtilities.findRequiredElement(element, "iframe");
                            this.scrollingSuggestion = HTMLUtilities.findRequiredElement(element, ".scrolling-suggestion");
                            this.nextChapterLink = HTMLUtilities.findRequiredElement(element, "a[rel=next]");
                            this.previousChapterLink = HTMLUtilities.findRequiredElement(element, "a[rel=prev]");
                            this.contentsControl = HTMLUtilities.findRequiredElement(element, "button.contents");
                            this.settingsControl = HTMLUtilities.findRequiredElement(element, "button.settings");
                            this.links = HTMLUtilities.findRequiredElement(element, "ul.links.top");
                            this.linksBottom = HTMLUtilities.findRequiredElement(element, "ul.links.bottom");
                            this.tocView = HTMLUtilities.findRequiredElement(element, ".contents-view");
                            this.settingsView = HTMLUtilities.findRequiredElement(element, ".settings-view");
                            this.loadingMessage = HTMLUtilities.findRequiredElement(element, "div[class=loading]");
                            this.errorMessage = HTMLUtilities.findRequiredElement(element, "div[class=error]");
                            this.tryAgainButton = HTMLUtilities.findRequiredElement(element, "button[class=try-again]");
                            this.goBackButton = HTMLUtilities.findRequiredElement(element, "button[class=go-back]");
                            this.infoTop = HTMLUtilities.findRequiredElement(element, "div[class='info top']");
                            this.infoBottom = HTMLUtilities.findRequiredElement(element, "div[class='info bottom']");
                            this.bookTitle = HTMLUtilities.findRequiredElement(this.infoTop, "span[class=book-title]");
                            this.chapterTitle = HTMLUtilities.findRequiredElement(this.infoBottom, "span[class=chapter-title]");
                            this.chapterPosition = HTMLUtilities.findRequiredElement(this.infoBottom, "span[class=chapter-position]");
                            this.menuControl = HTMLUtilities.findRequiredElement(element, "button.trigger");
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
                            err_2 = _a.sent();
                            // There's a mismatch between the template and the selectors above,
                            // or we weren't able to insert the template in the element.
                            return [2 /*return*/, new Promise(function (_, reject) { return reject(err_2); }).catch(function () { })];
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
            if (this.cacher && this.cacher.getStatus() !== Cacher_1.CacheStatus.Downloaded) {
                this.cacher.enable();
            }
        };
        IFrameNavigator.prototype.updateOfflineCacheStatus = function (status) {
            var statusElement = this.settings.getOfflineStatusElement();
            var statusMessage = "";
            if (status === Cacher_1.CacheStatus.Uncached) {
                statusMessage = "";
            }
            else if (status === Cacher_1.CacheStatus.UpdateAvailable) {
                statusMessage = "A new version is available. Refresh to update.";
            }
            else if (status === Cacher_1.CacheStatus.CheckingForUpdate) {
                statusMessage = "Checking for update.";
            }
            else if (status === Cacher_1.CacheStatus.Downloading) {
                statusMessage = "Downloading...";
            }
            else if (status === Cacher_1.CacheStatus.Downloaded) {
                statusMessage = "Downloaded for offline use";
            }
            else if (status === Cacher_1.CacheStatus.Error) {
                statusMessage = "Error downloading for offline use";
            }
            statusElement.innerHTML = statusMessage;
        };
        IFrameNavigator.prototype.loadManifest = function () {
            return __awaiter(this, void 0, void 0, function () {
                var manifest, toc, createTOC_1, upUrl, upLabel, upAriaLabel, upHTML, upParent, fullscreenHTML, fullscreenParent, lastReadingPosition, startLink, startUrl, position, err_3;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, Manifest_1.default.getManifest(this.manifestUrl, this.store)];
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
                                this.upLink = HTMLUtilities.findRequiredElement(this.links, "a[rel=up]");
                            }
                            if (this.allowFullscreen && this.canFullscreen) {
                                fullscreenHTML = "<button id=\"fullscreen-control\" class=\"fullscreen\" aria-hidden=\"false\">" + IconLib.icons.expand + " " + IconLib.icons.minimize + "</button>";
                                fullscreenParent = document.createElement("li");
                                fullscreenParent.innerHTML = fullscreenHTML;
                                this.links.appendChild(fullscreenParent);
                                this.fullscreen = HTMLUtilities.findRequiredElement(this.links, "#fullscreen-control");
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
                            err_3 = _a.sent();
                            this.abortOnError();
                            return [2 /*return*/, new Promise(function (_, reject) { return reject(err_3); }).catch(function () { })];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        IFrameNavigator.prototype.handleIFrameLoad = function () {
            return __awaiter(this, void 0, void 0, function () {
                var bookViewPosition, currentLocation, elementId, manifest, previous, next, chapterTitle, spineItem, tocItem, err_4;
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
                            return [4 /*yield*/, Manifest_1.default.getManifest(this.manifestUrl, this.store)];
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
                            err_4 = _a.sent();
                            this.abortOnError();
                            return [2 /*return*/, new Promise(function (_, reject) { return reject(err_4); }).catch(function () { })];
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
            var body = HTMLUtilities.findRequiredIframeElement(this.iframe.contentDocument, "body");
            body.style.fontSize = fontSize;
            body.style.lineHeight = "1.5";
            // Disable text selection as we can’t handle this correctly anyway
            body.style.webkitUserSelect = "none";
            body.style.MozUserSelect = "none";
            body.style.msUserSelect = "none";
            body.style.userSelect = "none";
            var fontSizeNumber = parseInt(fontSize.slice(0, -2));
            var sideMargin = fontSizeNumber * 2;
            if (BrowserUtilities.getWidth() > fontSizeNumber * 45) {
                var extraMargin = Math.floor((BrowserUtilities.getWidth() - fontSizeNumber * 40) / 2);
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
                this.paginator.height = (BrowserUtilities.getHeight() - topHeight - bottomHeight - 10);
            }
            if (this.scroller) {
                this.scroller.height = (BrowserUtilities.getHeight() - topHeight - bottomHeight - 10);
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
    exports.default = IFrameNavigator;
});
define("LocalAnnotator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.default = LocalAnnotator;
});
define("MemoryStore", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.default = MemoryStore;
});
define("LocalStorageStore", ["require", "exports", "MemoryStore"], function (require, exports, MemoryStore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                this.fallbackStore = new MemoryStore_1.default();
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
    exports.default = LocalStorageStore;
});
define("ServiceWorkerCacher", ["require", "exports", "Cacher", "Manifest"], function (require, exports, Cacher_2, Manifest_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /** Class that caches responses using ServiceWorker's Cache API, and optionally
        falls back to the application cache if service workers aren't available. */
    var ServiceWorkerCacher = /** @class */ (function () {
        /** Create a ServiceWorkerCacher. */
        function ServiceWorkerCacher(config) {
            this.cacheStatus = Cacher_2.CacheStatus.Uncached;
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
                var err_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.areServiceWorkersSupported && (this.cacheStatus !== Cacher_2.CacheStatus.Downloaded))) return [3 /*break*/, 4];
                            this.cacheStatus = Cacher_2.CacheStatus.Downloading;
                            this.updateStatus();
                            navigator.serviceWorker.register(this.serviceWorkerUrl.href);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.verifyAndCacheManifest(this.manifestUrl)];
                        case 2:
                            _a.sent();
                            this.cacheStatus = Cacher_2.CacheStatus.Downloaded;
                            this.updateStatus();
                            return [3 /*break*/, 4];
                        case 3:
                            err_5 = _a.sent();
                            this.cacheStatus = Cacher_2.CacheStatus.Error;
                            this.updateStatus();
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/, new Promise(function (resolve) { return resolve(); })];
                    }
                });
            });
        };
        ServiceWorkerCacher.prototype.verifyAndCacheManifest = function (manifestUrl) {
            return __awaiter(this, void 0, void 0, function () {
                var urlsToCache, _i, _a, url, promises, _b, promises_1, promise, err_6;
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
                            err_6 = _c.sent();
                            return [2 /*return*/, new Promise(function (_, reject) { return reject(err_6); })];
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
                        case 0: return [4 /*yield*/, Manifest_2.default.getManifest(manifestUrl, this.store)];
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
    exports.default = ServiceWorkerCacher;
});
define("app", ["require", "exports", "LocalStorageStore", "ServiceWorkerCacher", "IFrameNavigator", "PublisherFont", "SerifFont", "SansFont", "DayTheme", "SepiaTheme", "NightTheme", "ColumnsPaginatedBookView", "ScrollingBookView", "BookSettings", "LocalAnnotator"], function (require, exports, LocalStorageStore_1, ServiceWorkerCacher_1, IFrameNavigator_1, PublisherFont_1, SerifFont_1, SansFont_1, DayTheme_1, SepiaTheme_1, NightTheme_1, ColumnsPaginatedBookView_1, ScrollingBookView_1, BookSettings_1, LocalAnnotator_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    var app = function (element, manifestUrl) { return __awaiter(_this, void 0, void 0, function () {
        var bookStore, cacher, annotator, publisher, serif, sans, fontSizes, day, sepia, night, paginator, scroller, settingsStore, settings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bookStore = new LocalStorageStore_1.default({ prefix: manifestUrl.href });
                    cacher = new ServiceWorkerCacher_1.default({ store: bookStore, manifestUrl: manifestUrl });
                    annotator = new LocalAnnotator_1.default({ store: bookStore });
                    publisher = new PublisherFont_1.default();
                    serif = new SerifFont_1.default();
                    sans = new SansFont_1.default();
                    fontSizes = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32];
                    day = new DayTheme_1.default();
                    sepia = new SepiaTheme_1.default();
                    night = new NightTheme_1.default();
                    paginator = new ColumnsPaginatedBookView_1.default();
                    scroller = new ScrollingBookView_1.default();
                    settingsStore = new LocalStorageStore_1.default({ prefix: "cassis-reader" });
                    return [4 /*yield*/, BookSettings_1.default.create({
                            store: settingsStore,
                            bookFonts: [publisher, serif, sans],
                            fontSizesInPixels: fontSizes,
                            defaultFontSizeInPixels: 20,
                            bookThemes: [day, sepia, night],
                            bookViews: [paginator, scroller]
                        })];
                case 1:
                    settings = _a.sent();
                    return [4 /*yield*/, IFrameNavigator_1.default.create({
                            element: element,
                            manifestUrl: manifestUrl,
                            store: bookStore,
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
                            scroller: scroller
                        })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    exports.default = app;
});
define("index", ["require", "exports", "Cacher", "BookSettings", "MemoryStore", "LocalStorageStore", "ServiceWorkerCacher", "LocalAnnotator", "PublisherFont", "SerifFont", "SansFont", "DayTheme", "SepiaTheme", "NightTheme", "ColumnsPaginatedBookView", "ScrollingBookView", "EventHandler", "IconLib", "IFrameNavigator"], function (require, exports, Cacher_3, BookSettings_2, MemoryStore_2, LocalStorageStore_2, ServiceWorkerCacher_2, LocalAnnotator_2, PublisherFont_2, SerifFont_2, SansFont_2, DayTheme_2, SepiaTheme_2, NightTheme_2, ColumnsPaginatedBookView_2, ScrollingBookView_2, EventHandler_2, IconLib_1, IFrameNavigator_2) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(Cacher_3);
    __export(BookSettings_2);
    __export(MemoryStore_2);
    __export(LocalStorageStore_2);
    __export(ServiceWorkerCacher_2);
    __export(LocalAnnotator_2);
    __export(PublisherFont_2);
    __export(SerifFont_2);
    __export(SansFont_2);
    __export(DayTheme_2);
    __export(SepiaTheme_2);
    __export(NightTheme_2);
    __export(ColumnsPaginatedBookView_2);
    __export(ScrollingBookView_2);
    __export(EventHandler_2);
    __export(IconLib_1);
    __export(IFrameNavigator_2);
});
//# sourceMappingURL=webpub-viewer.js.map