import { expect } from "chai";

import ColumnsPaginatedBookView from "../src/ColumnsPaginatedBookView";

describe("ColumnsPaginatedBookView", () => {
    let iframe: HTMLIFrameElement;
    let height: number = 200;
    let sideMargin: number = 11;
    let paginator: ColumnsPaginatedBookView;

    beforeEach(() => {
        iframe = window.document.createElement("iframe");
        // The element must be in a document for the iframe to have a contentDocument.
        window.document.body.appendChild(iframe);

        paginator = new ColumnsPaginatedBookView();
        paginator.bookElement = iframe;
        paginator.sideMargin = sideMargin;
        paginator.height = height;
    });

    describe("#start", () => {
        it("should set up columns on the iframe body", () => {
            paginator.start(0);
            const body = iframe.contentDocument.body as any;
            expect(body.style.columnCount).to.equal(1);
            expect(body.style.WebkitColumnCount).to.equal(1);
            expect(body.style.MozColumnCount).to.equal(1);
            expect(body.style.overflow).to.equal("hidden");
            expect(body.style.position).to.equal("relative");
        });

        it("should set iframe and iframe body width and height and column width based on window width and set height", () => {
            (document.body as any).offsetWidth = 100;
            paginator.start(0);
            const body = iframe.contentDocument.body;
            expect(iframe.style.height).to.equal("200px");
            expect(iframe.style.width).to.equal("100px");
            expect(body.style.height).to.equal("200px");
            expect(body.style.width).to.equal("78px");
            expect(body.style.columnWidth).to.equal("78px");
            expect(body.style.columnGap).to.equal("22px");
        });

        it("should set max width and height on image in iframe", () => {
            (document.body as any).offsetWidth = 100;
            const body = iframe.contentDocument.body;
            const image  = window.document.createElement("img");
            body.appendChild(image);

            paginator.start(0);
            expect(image.style.maxWidth).to.equal("78px");
            expect(image.style.maxHeight).to.equal("200px");
        });

        it("should set initial position to first or last page", () => {
            // Set read-only properties.
            (iframe.contentDocument.body as any).offsetWidth = 100;
            (iframe.contentDocument.body as any).scrollWidth = 200;

            // Set to first page.
            paginator.start(0);
            expect(iframe.contentDocument.body.style.left).to.equal("0px");

            // Set to last page.
            paginator.start(1);
            expect(iframe.contentDocument.body.style.left).to.equal("-122px");
        });
    });

    describe("#stop", () => {
        it("should remove styling from iframe and iframe body", () => {
            paginator.start(0);

            expect(iframe.style.height).not.to.equal("");
            expect(iframe.contentDocument.body.style.columnWidth).not.to.equal("");

            paginator.stop();

            expect(iframe.style.height).to.equal("");
            expect(iframe.contentDocument.body.style.columnWidth).to.equal("");
        });
    });

    describe("#getCurrentPosition", () => {
        it("should get first page", () => {
            paginator.start(0);

            iframe.contentDocument.body.style.left = "0px";
            (iframe.contentDocument.body as any).offsetWidth = 100;
            (iframe.contentDocument.body as any).scrollWidth = 477;

            expect(paginator.getCurrentPosition()).to.equal(0);
        });

        it("should get middle page", () => {
            paginator.start(0);

            iframe.contentDocument.body.style.left = "-122px";
            (iframe.contentDocument.body as any).offsetWidth = 100;
            (iframe.contentDocument.body as any).scrollWidth = 355;

            expect(paginator.getCurrentPosition()).to.equal(0.25);

            iframe.contentDocument.body.style.left = "-244px";
            (iframe.contentDocument.body as any).scrollWidth = 233;
            expect(paginator.getCurrentPosition()).to.equal(0.5);
        });

        it("should get last page", () => {
            paginator.start(0);

            iframe.contentDocument.body.style.left = "-366px";
            (iframe.contentDocument.body as any).offsetWidth = 100;
            (iframe.contentDocument.body as any).scrollWidth = 111;

            expect(paginator.getCurrentPosition()).to.equal(0.75);
        });
    });

    describe("#getCurrentPage", () => {
        it("should get first page", () => {
            paginator.start(0);

            iframe.contentDocument.body.style.left = "0px";
            (iframe.contentDocument.body as any).offsetWidth = 100;
            (iframe.contentDocument.body as any).scrollWidth = 477;

            expect(paginator.getCurrentPage()).to.equal(1);
        });

        it("should get middle page", () => {
            paginator.start(0);

            iframe.contentDocument.body.style.left = "-122px";
            (iframe.contentDocument.body as any).offsetWidth = 100;
            (iframe.contentDocument.body as any).scrollWidth = 355;

            expect(paginator.getCurrentPage()).to.equal(2);

            iframe.contentDocument.body.style.left = "-244px";
            (iframe.contentDocument.body as any).scrollWidth = 233;
            expect(paginator.getCurrentPage()).to.equal(3);
        });

        it("should get last page", () => {
            paginator.start(0);

            iframe.contentDocument.body.style.left = "-366px";
            (iframe.contentDocument.body as any).offsetWidth = 100;
            (iframe.contentDocument.body as any).scrollWidth = 111;

            expect(paginator.getCurrentPage()).to.equal(4);
        });
    });

    describe("#getPageCount", () => {
        it("should work on first page", () => {
            paginator.start(0);

            iframe.contentDocument.body.style.left = "0px";
            (iframe.contentDocument.body as any).offsetWidth = 100;
            (iframe.contentDocument.body as any).scrollWidth = 477;

            expect(paginator.getPageCount()).to.equal(4);
        });

        it("should work on middle page", () => {
            paginator.start(0);

            iframe.contentDocument.body.style.left = "-122px";
            (iframe.contentDocument.body as any).offsetWidth = 100;
            (iframe.contentDocument.body as any).scrollWidth = 355;

            expect(paginator.getPageCount()).to.equal(4);
        });

        it("should work on last page", () => {
            paginator.start(0);

            iframe.contentDocument.body.style.left = "-366px";
            (iframe.contentDocument.body as any).offsetWidth = 100;
            (iframe.contentDocument.body as any).scrollWidth = 111;

            expect(paginator.getPageCount()).to.equal(4);
        });
    });

    describe("#onFirstPage", () => {
        it("should work", () => {
            paginator.start(0);

            iframe.contentDocument.body.style.left = "0px";
            (iframe.contentDocument.body as any).offsetWidth = 100;
            expect(paginator.onFirstPage()).to.equal(true);

            iframe.contentDocument.body.style.left = "-122px";
            (iframe.contentDocument.body as any).offsetWidth = 100;
            expect(paginator.onFirstPage()).to.equal(false);

            iframe.contentDocument.body.style.left = "-244px";
            (iframe.contentDocument.body as any).offsetWidth = 100;
            expect(paginator.onFirstPage()).to.equal(false);
        });
    });

    describe("#onLastPage", () => {
        it("should work", () => {
            paginator.start(0);

            (iframe.contentDocument.body as any).offsetWidth = 200;
            (iframe.contentDocument.body as any).scrollWidth = 111;
            expect(paginator.onLastPage()).to.equal(true);

            (iframe.contentDocument.body as any).offsetWidth = 200;
            (iframe.contentDocument.body as any).scrollWidth = 211;
            expect(paginator.onLastPage()).to.equal(true);

            (iframe.contentDocument.body as any).offsetWidth = 200;
            (iframe.contentDocument.body as any).scrollWidth = 355;
            expect(paginator.onLastPage()).to.equal(false);
        });
    });

    describe("#goToPreviousPage", () => {
        it("should work", () => {
            paginator.start(0);

            iframe.contentDocument.body.style.left = "-122px";
            (iframe.contentDocument.body as any).offsetWidth = 100;
            expect(paginator.onFirstPage()).to.equal(false);
            paginator.goToPreviousPage();
            expect(paginator.onFirstPage()).to.equal(true);
            expect(iframe.contentDocument.body.style.left).to.equal("0px");
        });
    });

    describe("#goToNextPage", () => {
        it("should work", () => {
            paginator.start(0);

            iframe.contentDocument.body.style.left = "0px";
            (iframe.contentDocument.body as any).offsetWidth = 100;
            expect(paginator.onFirstPage()).to.equal(true);
            paginator.goToNextPage();
            expect(paginator.onFirstPage()).to.equal(false);
            expect(iframe.contentDocument.body.style.left).to.equal("-122px");
        });
    });

    describe("#goToPosition", () => {
        it("should go to first page", () => {
            paginator.start(0);

            iframe.contentDocument.body.style.left = "-122px";
            (iframe.contentDocument.body as any).offsetWidth = 100;
            (iframe.contentDocument.body as any).scrollWidth = 355;

            paginator.goToPosition(0);
            expect(iframe.contentDocument.body.style.left).to.equal("0px");
        });

        it("should go to middle page", () => {
            paginator.start(0);

            iframe.contentDocument.body.style.left = "0px";
            (iframe.contentDocument.body as any).offsetWidth = 100;
            (iframe.contentDocument.body as any).scrollWidth = 477;

            paginator.goToPosition(0.25);
            expect(iframe.contentDocument.body.style.left).to.equal("-122px");

            paginator.goToPosition(0.5);
            expect(iframe.contentDocument.body.style.left).to.equal("-244px");
        });

        it("should go to last page", () => {
            paginator.start(0);

            iframe.contentDocument.body.style.left = "0px";
            (iframe.contentDocument.body as any).offsetWidth = 100;
            (iframe.contentDocument.body as any).scrollWidth = 477;

            paginator.goToPosition(1);
            expect(iframe.contentDocument.body.style.left).to.equal("-366px");

            // When there's only one page, the last page is the first page.
            iframe.contentDocument.body.style.left = "0px";
            (iframe.contentDocument.body as any).offsetWidth = 100;
            (iframe.contentDocument.body as any).scrollWidth = 111;

            paginator.goToPosition(1);
            expect(iframe.contentDocument.body.style.left).to.equal("0px");
        });

        it("should round down if going to a position between pages", () => {
            paginator.start(0);

            iframe.contentDocument.body.style.left = "0px";
            (iframe.contentDocument.body as any).offsetWidth = 100;
            (iframe.contentDocument.body as any).scrollWidth = 477;

            paginator.goToPosition(0.2);
            expect(iframe.contentDocument.body.style.left).to.equal("0px");

            paginator.goToPosition(0.3);
            expect(iframe.contentDocument.body.style.left).to.equal("-122px");
        });
    });
});