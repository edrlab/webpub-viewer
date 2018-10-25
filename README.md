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

## Examples

Examples demonstrate how this webpub-viewer can be used:

1. with static assets i.e. exploded EPUB files on a server;
2. with assets served by r2-streamer-js (in-memory model);
3. embedded in exploded EPUB files themselves.

Example EPUB *The Call of the Wild* has been kindly offered by Jellybooks.

### Static

The `examples/static` folder contains the webpub-viewer (`viewer` folder), an example file (`TheCallOfTheWild` folder), and a `static-server.js` script running a local server using Node.js + Express.

This example runs on `https` so you’ll need to trust the provided `webpubViewer.pem` self-signed certificate that node and express use to create an https server.

#### Re-generating a self-signed certificate

From the repository’s root, the following command has been used on MacOS to create the certificate for `localhost`:

```
openssl req -newkey rsa:4096 -x509 -nodes -keyout webpubViewer.pem -new -out webpubViewer.pem -subj /CN=localhost -reqexts SAN -extensions SAN -config <(cat /System/Library/OpenSSL/openssl.cnf <(printf '[SAN]\nsubjectAltName=DNS:localhost')) -sha256 -days 3650
```

The one provided should run until October 24, 2028.

What’s important is that the cert must have `CN=localhost` and `subjectAltName=DNS:localhost` for Chrome. Versions > 58 indeed require a `subjectAltName` with the proper DNS and/or IP entry/entries.

#### Trusting self-signed certificates

In order to make the self-signed certificate trusted you need to accept it as a valid certificate on your machine. Doing this will replace red warning (“Unsecured”) notices with a green lock, fully replicating a `https/SSL` website on localhost for testing. This depends on your platform:

- [MacOS > Keychain.app](https://www.kevinleary.net/self-signed-trusted-certificates-node-js-express-js/)
- [Ubuntu-flavored Linux Distro > certutil](https://leehblue.com/add-self-signed-ssl-google-chrome-ubuntu-16-04/)
- [Windows 10 > Trusted Root Certification Authorities](https://medium.com/@alirak94/how-to-trust-any-self-signed-ssl-certificate-in-ie11-and-edge-fa7b416cac68)

You might need to make it an exception in your web browser so that it can be trusted though (Firefox, Safari, etc.).

#### Usage

- Update the webpub-viewer files if needed (`npm run examples`)
- Launch the webpub-viewer with `npm run static`
- Your terminal should display `Express server listening on port 3333` – note it’s also listening to errors so will log them in your terminal as well
- open https://localhost:3333 in the browser
- To stop the server, type `ctrl + c`

There is one static example available on the same origin (should work as expected) and another one on a different origin (should fail).

For the origin to be considered the same, protocol (`http/https`), host and port must be the same. See [web browsers’ same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy).

### Streamed

The `examples/streamed` folder contains the webpub-viewer (`readers/reader-JBKS` folder), the r2-streamer-js (ES6/ES2015 bundle in `server` folder) and example files (`epubs` folder).

In this example, assets are served by the r2-streamer-js (in-memory model). You can open them using 3 iterations of the webpub-viewer: Hadrien Gardeur’s (the original prototype), NYPL’s, and Jellybooks’.

This example runs on `http` to get around Service Workers issues across all available readers so you don’t need to do anything.

#### Usage

- Update the web reader files if needed (`npm run examples`)
- Start the server with `npm run streamed`
- Open http://localhost:4444 in the browser
- Pick a publication
- You can see its manifest (`json`) and open it in the webpub-viewer of your choice
- To stop the server, type `ctrl + c`

### Embedded

The `examples/embedded` folder contains an example file (`alice` folder), in which the webpub-viewer is embedded, and an `embedded-server.js` script running a local server using Node.js + Express. 

This example runs on `https` but is using the same certificate as the static example.

#### Usage

- Update the webpub-viewer files if needed (`npm run examples`)
- Launch the webpub-viewer with `npm run embedded`
- Your terminal should display `Express server listening on port 1865` – note it’s also listening to errors so will log them in your terminal as well
- open https://localhost:1865 in the browser
- To stop the server, type `ctrl + c`

## Icons

Icons used in the shared version are part of the official [Material Design Icons](https://material.io/tools/icons/?style=outline) collection (outline version).

## Notes

This version sticks to the existing NYPL architecture, with features added in the spirit of its design.

It fixes some bugs and make their dedicated tests more robust. It was primarily meant as a Proof of Concept readers @ Jellybooks could interact with.

Refactorings ([architecture](https://github.com/readium/architecture), [ReadiumCSS](https://github.com/readium/readium-css), [r2-glue-js](https://github.com/readium/r2-glue-js), etc.) are longer term but have been planned.