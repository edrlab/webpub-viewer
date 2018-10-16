# webpub-viewer

A viewer application for web publications, based on Hadrien Gardeur's proof of concept https://github.com/HadrienGardeur/webpub-viewer.

## About the Jellybooks-shared branch

This branch is meant to host changes and improvements that [Jellybooks](https://www.jellybooks.com) can share with the larger community.

## Quickstart

Clone this repo, `cd` the directory, checkout the `jellybooks-branch` then

```
npm install
```

This should run the `npm prepublish` script as well, transpiling the TS and SASS files into the `dist` and `viewer` folders.

You can run automated tests with

```
npm test
```

and transpile at any time with

```
npm run prepublish
```

## Manual testing

Unfortunately, we could not share our examples and docs – actually quite a large part of our commits.

Examples are those the NYPL committed and were not updated.

You can however use the [Readium’s r2-streamer-js](https://github.com/readium/r2-streamer-js) and replace the [`misc/readers/Reader-NYPL` files](https://github.com/readium/r2-streamer-js/tree/develop/misc/readers/reader-NYPL) with the ones in [the `viewer` folder](viewer).

Then add your own files in r2-streamer-js’ `misc/epubs` folder and start a local server by running 

```
npm start 
```

The r2-streamer-js should then expose a list of EPUB files that you can open with this webpub viewer @ `http://localhost:3000`.

## Icons

Icons used in the shared version are part of the official [Material Design Icons](https://material.io/tools/icons/?style=outline) collection (outline version).

## Notes

This version sticks to the existing NYPL architecture, with features added in the spirit of its design.

It fixes some bugs and make their dedicated tests more robust. It was primarily meant as a Proof of Concept readers @ Jellybooks could interact with.

Refactorings ([architecture](https://github.com/readium/architecture), [ReadiumCSS](https://github.com/readium/readium-css), [r2-glue-js](https://github.com/readium/r2-glue-js), etc.) are longer term but have been planned.