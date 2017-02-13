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
        scroller.setBookElement(iframe);
    });

    describe("#start", () => {
        it("should set initial position to beginning or end", () => {
            // Set read-only property.
            (iframe.contentDocument.body as any).scrollHeight = 200;

            // Set to first page.
            scroller.start(0);
            expect(iframe.contentDocument.body.scrollTop).to.equal(0);

            // Set to last page.
            scroller.start(1);
            expect(iframe.contentDocument.body.scrollTop).to.equal(200);
        });
    });

    describe("#getCurrentPosition", () => {
        it("should get beginning", () => {
            scroller.start(0);

            iframe.contentDocument.body.scrollTop = 0;
            (iframe.contentDocument.body as any).scrollHeight = 200;

            expect(scroller.getCurrentPosition()).to.equal(0);            
        });

        it("should get middle", () => {
            scroller.start(0);

            iframe.contentDocument.body.scrollTop = 100;
            (iframe.contentDocument.body as any).scrollHeight = 200;

            expect(scroller.getCurrentPosition()).to.equal(0.5);
            
            iframe.contentDocument.body.scrollTop = 150;
            
            expect(scroller.getCurrentPosition()).to.equal(0.75);
        });

        it("should get end", () => {
            scroller.start(0);

            iframe.contentDocument.body.scrollTop = 200;
            (iframe.contentDocument.body as any).scrollHeight = 200;

            expect(scroller.getCurrentPosition()).to.equal(1);            
        });
    });

    describe("#goToPosition", () => {
        it("should go to beginning", () => {
            scroller.start(0);

            iframe.contentDocument.body.scrollTop = 100;
            (iframe.contentDocument.body as any).scrollHeight = 200;

            scroller.goToPosition(0);
            expect(iframe.contentDocument.body.scrollTop).to.equal(0);
        });

        it("should go to middle", () => {
            scroller.start(0);

            iframe.contentDocument.body.scrollTop = 0;
            (iframe.contentDocument.body as any).scrollHeight = 200;

            scroller.goToPosition(0.25);
            expect(iframe.contentDocument.body.scrollTop).to.equal(50);

            scroller.goToPosition(0.5);
            expect(iframe.contentDocument.body.scrollTop).to.equal(100);
        });

        it("should go to end", () => {
            scroller.start(0);

            iframe.contentDocument.body.scrollTop = 0;
            (iframe.contentDocument.body as any).scrollHeight = 200;

            scroller.goToPosition(1);
            expect(iframe.contentDocument.body.scrollTop).to.equal(200);
        });
    });
});