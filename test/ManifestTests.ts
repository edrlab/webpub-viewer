import { expect } from "chai";

import Manifest, { Link } from "../src/Manifest";

describe("Manifest", () => {
    let manifest: Manifest;
    let emptyManifest: Manifest;

    beforeEach(() => {
        manifest = new Manifest({
            metadata: {
                title: "Alice's Adventures in Wonderland"
            },
            links: [
                { href: "a-link.html" }
            ],
            spine: [
                { href: "spine-item-1.html" },
                { href: "spine-item-2.html" },
                { href: "spine-item-3.html" }
            ],
            resources: [
                { href: "contents.html", rel: "contents" },
                { href: "cover.jpg" }
            ]
        }, "http://example.com/manifest.json");

        emptyManifest = new Manifest({}, "http://example.com/manifest.json");
    });

    describe("#constructor", () => {
        it("should handle empty input", () => {
            expect(emptyManifest.metadata).to.deep.equal({});
            expect(emptyManifest.links).to.deep.equal([]);
            expect(emptyManifest.spine).to.deep.equal([]);
            expect(emptyManifest.resources).to.deep.equal([]);
        });

        it("should store metadata", () => {
            expect(manifest.metadata.title).to.equal("Alice's Adventures in Wonderland");
        });

        it("should store links", () => {
            expect(manifest.links.length).to.equal(1);
            expect(manifest.links[0].href).to.equal("a-link.html");
        });

        it("should store spine", () => {
            expect(manifest.spine.length).to.equal(3);
            expect(manifest.spine[0].href).to.equal("spine-item-1.html");
        });

        it("should store resources", () => {
            expect(manifest.resources.length).to.equal(2);
            expect(manifest.resources[0].href).to.equal("contents.html");
        });
    });

    describe("#getStartLink", () => {
        it("should return the first spine item", () =>  {
            let start = manifest.getStartLink() as Link;
            expect(start).not.to.be.null;
            expect(start.href).to.equal("spine-item-1.html");
        });

        it("should return null if spine is empty", () => {
            let start = emptyManifest.getStartLink();
            expect(start).to.be.null;
        });
    });

    describe("#getTOCLink", () => {
        it("should return toc from resources", () => {
            let toc = manifest.getTOCLink() as Link;
            expect(toc).not.to.be.null;
            expect(toc.href).to.equal("contents.html");
        });

        it("should return toc from spine", () => {
            manifest = new Manifest({
                spine: [
                    { href: "toc.html", rel: "contents" },
                    { href: "other-spine-item.html" }
                ]
            }, "http://example.com/manifest.json");
            let toc = manifest.getTOCLink() as Link;
            expect(toc).not.to.be.null;
            expect(toc.href).to.equal("toc.html");
        });

        it("should return null if there's no toc", () => {
            let toc = emptyManifest.getTOCLink();
            expect(toc).to.be.null;
        });
    });

    describe("#getPreviousSpineItem", () => {
        it("should return previous spine item", () => {
            let previous = manifest.getPreviousSpineItem("http://example.com/spine-item-2.html") as Link;
            expect(previous).not.to.be.null;
            expect(previous.href).to.equal("spine-item-1.html");            

            previous = manifest.getPreviousSpineItem("http://example.com/spine-item-3.html") as Link;
            expect(previous).not.to.be.null;
            expect(previous.href).to.equal("spine-item-2.html");
        });

        it("should return null for first spine item", () => {
            let previous = manifest.getPreviousSpineItem("http://example.com/spine-item-1.html");
            expect(previous).to.be.null;
        });

        it("should return null for item not in the spine", () => {
            let previous = manifest.getPreviousSpineItem("http://example.com/toc.html");
            expect(previous).to.be.null;
        });
    });

    describe("#getNextSpineItem", () => {
        it("should return next spine item", () => {
            let next = manifest.getNextSpineItem("http://example.com/spine-item-1.html") as Link;
            expect(next).not.to.be.null;
            expect(next.href).to.equal("spine-item-2.html");

            next = manifest.getNextSpineItem("http://example.com/spine-item-2.html") as Link;
            expect(next).not.to.be.null;
            expect(next.href).to.equal("spine-item-3.html");
        });

        it("should return null for last spine item", () => {
            let next = manifest.getNextSpineItem("http://example.com/spine-item-3.html");
            expect(next).to.be.null;
        });

        it("should return null for item not in the spine", () => {
            let next = manifest.getNextSpineItem("http://example.com/toc.html");
            expect(next).to.be.null;
        });
    });
});

