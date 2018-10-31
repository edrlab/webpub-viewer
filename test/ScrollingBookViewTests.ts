import { expect } from "chai";
import { stub } from "sinon";

import ScrollingBookView from "../src/ScrollingBookView";

describe("ScrollingBookView", () => {
    let iframe: HTMLIFrameElement;
    let scroller: ScrollingBookView;

    beforeEach(() => {
        iframe = window.document.createElement("iframe");
        // The element must be in a document for the iframe to have a contentDocument.
        window.document.body.appendChild(iframe);

        scroller = new ScrollingBookView();
        scroller.bookElement = iframe;
    });

    describe("#start", () => {
        it("should set initial position to beginning or end", () => {
            // Set read-only property.
            (document.body as any).scrollHeight = 200;

            // Set to first page.
            scroller.start(0);
            expect(document.body.scrollTop).to.equal(0);

            // Set to last page.
            scroller.start(1);
            expect(document.body.scrollTop).to.equal(200);
        });

        it("should set iframe size", () => {
            scroller.sideMargin = 11;
            scroller.height = 70;
            ((iframe.contentDocument as any).body as any).scrollHeight = 200;
            (document.documentElement as any).clientWidth = 50;

            scroller.start(0);
            expect(iframe.style.height).to.equal("200px");
            expect(iframe.style.width).to.equal("50px");
            expect((iframe.contentDocument as any).body.style.width).to.equal("28px");
            expect((iframe.contentDocument as any).body.style.marginLeft).to.equal("11px");
            expect((iframe.contentDocument as any).body.style.marginRight).to.equal("11px");

            // If the content doesn't fill the page, the iframe height is
            // based on the window.
            ((iframe.contentDocument as any).body as any).scrollHeight = 20;

            scroller.start(0);
            expect(iframe.style.height).to.equal("70px");
            expect(iframe.style.width).to.equal("50px");
            expect((iframe.contentDocument as any).body.style.width).to.equal("28px");
            expect((iframe.contentDocument as any).body.style.marginLeft).to.equal("11px");
            expect((iframe.contentDocument as any).body.style.marginRight).to.equal("11px");
        });

        it("should set max width and but not height on image in iframe", () => {
            scroller.sideMargin = 11;
            scroller.height = 70;
            (document.documentElement as any).clientWidth = 50;
            const body = (iframe.contentDocument as any).body;
            const image  = window.document.createElement("img");
            body.appendChild(image);

            scroller.start(0);
            expect(image.style.maxWidth).to.equal("28px");
            expect(image.style.maxHeight).not.to.be.ok;
        });
    });

    describe("#stop", () => {
        it("should remove styling from iframe", () => {
            scroller.height = 100;
            ((iframe.contentDocument as any).body as any).scrollHeight = 200;
            scroller.start(0);

            expect(iframe.style.height).not.to.equal("");
            expect(iframe.style.width).not.to.equal("");
            expect((iframe.contentDocument as any).body.style.width).not.to.equal("");

            scroller.stop();

            expect(iframe.style.height).to.equal("");
            expect(iframe.style.width).to.equal("");
            expect((iframe.contentDocument as any).body.style.width).to.equal("");
        });
    });

    describe("#getCurrentPosition", () => {
        it("should get beginning", () => {
            scroller.start(0);

            document.body.scrollTop = 0;
            (document.body as any).scrollHeight = 200;

            expect(scroller.getCurrentPosition()).to.equal(0);            
        });

        it("should get middle", () => {
            scroller.start(0);

            document.body.scrollTop = 100;
            (document.body as any).scrollHeight = 200;

            expect(scroller.getCurrentPosition()).to.equal(0.5);
            
            document.body.scrollTop = 150;
            
            expect(scroller.getCurrentPosition()).to.equal(0.75);
        });

        it("should get end", () => {
            scroller.start(0);

            document.body.scrollTop = 200;
            (document.body as any).scrollHeight = 200;

            expect(scroller.getCurrentPosition()).to.equal(1);            
        });
    });

    describe("#atBottom", () => {
        it("should work", () => {
            scroller.start(0);

            document.body.scrollTop = 10;
            (document.body as any).scrollHeight = 200;
            (document.documentElement as any).clientHeight = 100;

            expect(scroller.atBottom()).to.equal(false);

            document.body.scrollTop = 100;
            expect(scroller.atBottom()).to.equal(true);
        });
    });

    describe("#goToPosition", () => {
        it("should go to beginning", () => {
            scroller.start(0);

            document.body.scrollTop = 100;
            (document.body as any).scrollHeight = 200;

            scroller.goToPosition(0);
            expect(document.body.scrollTop).to.equal(0);
        });

        it("should go to middle", () => {
            scroller.start(0);

            document.body.scrollTop = 0;
            (document.body as any).scrollHeight = 200;

            scroller.goToPosition(0.25);
            expect(document.body.scrollTop).to.equal(50);

            scroller.goToPosition(0.5);
            expect(document.body.scrollTop).to.equal(100);
        });

        it("should go to end", () => {
            scroller.start(0);

            document.body.scrollTop = 0;
            (document.body as any).scrollHeight = 200;

            scroller.goToPosition(1);
            expect(document.body.scrollTop).to.equal(200);
        });
    });

    describe("#goToElement", () => {
        it("should do nothing if element doesn't exist", () => {
            scroller.start(0);
            document.body.scrollTop = 100;
            scroller.goToElement("not-an-element");
            expect(document.body.scrollTop).to.equal(100);
        });

        it("should go to element at the top", () => {
            scroller.height = 50;
            scroller.start(0);
            const element = document.createElement("a");
            element.scrollIntoView = stub();
            element.id = "element";
            (iframe.contentDocument as any).body.appendChild(element);
            
            document.body.scrollTop = 0;
            (document.body as any).scrollHeight = 200;
            (element as any).offsetTop = 100;

            scroller.goToElement("element");
            expect(document.body.scrollTop).to.equal(0);
        });

        it("should go to element in the middle", () => {
            scroller.height = 75;
            scroller.start(0);
            const element = document.createElement("a");
            element.scrollIntoView = stub();
            element.id = "element";
            (iframe.contentDocument as any).body.appendChild(element);
            
            document.body.scrollTop = 50;
            (document.body as any).scrollHeight = 200;
            (element as any).offsetTop = 100;

            scroller.goToElement("element");
            expect(document.body.scrollTop).to.equal(25);
        });

        it("should go to element at the bottom", () => {
            scroller.height = 50;
            scroller.start(0);
            const element = document.createElement("a");
            element.scrollIntoView = stub();
            element.id = "element";
            (iframe.contentDocument as any).body.appendChild(element);
            
            document.body.scrollTop = 150;
            (document.body as any).scrollHeight = 200;
            (element as any).offsetTop = 175;

            scroller.goToElement("element");
            expect(document.body.scrollTop).to.equal(150);
        });
    });
});