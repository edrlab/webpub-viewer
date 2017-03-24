import { expect } from "chai";

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
            (window as any).innerHeight = 100;
            iframe.style.marginTop = "10px";
            iframe.style.marginBottom = "20px";
            (iframe.contentDocument.body as any).scrollHeight = 200;
            (document.body as any).offsetWidth = 50;

            scroller.start(0);
            expect(iframe.style.height).to.equal("200px");
            expect(iframe.style.width).to.equal("28px");
            expect(iframe.style.marginLeft).to.equal("11px");
            expect(iframe.style.marginRight).to.equal("11px");

            // If the content doesn't fill the page, the iframe height is
            // based on the window.
            (iframe.contentDocument.body as any).scrollHeight = 20;

            scroller.start(0);
            expect(iframe.style.height).to.equal("70px");
            expect(iframe.style.width).to.equal("28px");
            expect(iframe.style.marginLeft).to.equal("11px");
            expect(iframe.style.marginRight).to.equal("11px");
        });
    });

    describe("#stop", () => {
        it("should remove styling from iframe", () => {
            (window as any).innerHeight = 100;
            (iframe.contentDocument.body as any).scrollHeight = 200;
            scroller.start(0);

            expect(iframe.style.height).not.to.equal("");
            expect(iframe.style.width).not.to.equal("");

            scroller.stop();

            expect(iframe.style.height).to.equal("");
            expect(iframe.style.width).to.equal("");
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
});