# How to Use the Webpub Viewer

## Abstract

The Webpub Viewer can work with the r2-streamer-js or, more simply, static files (exploded EPUBs with a manifest).

The Webpub Viewer expects a URL parameter starting with `?url=` and pointing to the manifest of the publication you want to open. Nothing more, nothing less.

Viewer, files, and streamer must currently live on the same origin (same protocol, host and port). See [Same-origin explainer](same-origin-explainer.md) for further details.

## Creating the Viewer

To sum things up, the viewer is a folder containing all the files available in the [`viewer`](../viewer) directory. To create it, `npm run prepublish`.

Files the Cloud Reader needs in the same directory, at the same level: 

- index.html
- webpub-viewer.js
- sw.js
- fetch.js
- require.js
- main.css

## Opening a Book in the Reader

The reader doesn’t handle the library itself, a parameter to the publication’s `manifest.json` must be passed in the URL to the reader.

For instance:

```
https://www.company.com/cloud-reader/?url=https%3A%2F%2Fwww.company.com%2Febooks%2F%2FTheCallOfTheWild%2Fmanifest.json
```

## Reading a Book in the Reader

The URL of the viewer never changes, navigation and features are handled internally (client-side).

The `localStorage` API is used extensively to keep track of location (in the publication and the current resource), user settings, etc.

## Configuring the Viewer

[The viewer is pre-configured in `index.html`](../viewer/index.html) but can be configured dynamically if needed. Actually, the whole inline script could be created on the fly and appended to the `index.html`.

### Manifest

By default, the manifest URL will be retrieved from the `window.location` (i.e. the url you send the reader to).

It’s the `getURLQueryParams()` function which is responsible for splitting the proper URL to the manifest, then passing it to the `urlParams` variable, which will finally be used in the `webpubManifestUrl` variable.

In other words, it’s possible to define the `webpubManifestUrl` variable so that it doesn’t query `window.location`.

### User Settings

The `BookSettings.default.create()` function will create user settings, it expects all settings to be configured but won’t render them if their `length` is `<= 1` – in practice, they consequently don’t exist in the UI.

This relies on the `BookSettingsConfig` interface in [BookSettings.ts](../src/BookSettings.ts).

#### Creating Settings

In the following examples, each value is a variable previously declared.

```
BookSettings.default.create({
  store: settingsStore,
  bookFonts: [publisher, serif, sans],
  fontSizesInPixels: fontSizes,
  defaultFontSizeInPixels: defaultFontSize,  // optional
  bookThemes: [day, sepia, night],
  bookViews: [paginator, scroller]
})
```

As you can see, `bookFonts`, `fontSizesInPixels`, `bookThemes`, and `bookViews` expect an array. If it’s empty or contains only 1 object then the setting won’t be rendered.

Variables previously defined could be: 

```
var publisher = new PublisherFont.default();
var serif = new SerifFont.default();
var sans = new SansFont.default();
var fontSizes = [ 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32 ];
var defaultFontSize = 20;
var day = new DayTheme.default();
var sepia = new SepiaTheme.default();
var night = new NightTheme.default();
var paginator = new ColumnsPaginatedBookView.default();
var scroller = new ScrollingBookView.default();
var settingsStore = new LocalStorageStore.default({ prefix: "webpub-viewer" });
```

#### Scoping Settings

It is possible to scope settings to a publication, a group of publications or all publications, by defining the `prefix` in the `settingsStore` variable.

By default, setting apply to all publications with a `webpub-viewer` prefix but one could imagine setting a prefix dynamically for a book or a collection.

### Creating an iframe to handle EPUB Contents

After creating those settings, the creation of an iframe is possible – `IFrameNavigator.default.create()` function. This will start the viewer and provide listeners and functions for navigating, interacting, etc.

This relies on the `IFrameNavigatorConfig` interface (in [IFrameNavigator.ts](../src/IFrameNavigator.ts)) and some items are optional e.g. the settings that won’t be rendered, `uplink` which is meant as a “home” to get back to the library for instance, etc. Optional items are marked with a `?`.

### Creating a Link back to Home/Library

There is an optional `upLink` property available for the `IFrameNavigatorConfig` that can be used to create a “Back button” to a homepage/library/etc. 

For the r2-streamer-js example, if you declare the following in `index.html`:

```
var upLink = {url: new URL("http://localhost:4444"), label: "Library", ariaLabel: "Go back to library"};

// Note label and ariaLabel are optional
```

and add it at the end of:

```
IFrameNavigator.default.create({
  …
  upLink: upLink
});
```

Then a “home” button will appear in the UI (top left) and send the reader back to the “pseudo library” of this example.

### Caching assets (through Service Workers)

One can pick the assets to cache through Service Workers by configuring the `staticFileUrls` variable.

By default, it caches the assets of the web reader itself but not EPUB contents and will fetch them from the browser’s cache instead of requesting them from the server.

The `cacher` is optional so you can disable Service Workers entirely.

### Allowing fullscreen

There is an optional `allowFullscreen` property available for the `IFrameNavigagorConfig` that can be used to create a “fullscreen mode.”

If you add it at the end of: 

```
IFrameNavigator.default.create({
  …
  allowFullscreen: true
});
```

Then an “expand” button will appear in the UI (top right) and allow the reader to switch to fullscreen mode if it is supported by the browser – if not, like on iOS < 12 for example, the button won’t be available.