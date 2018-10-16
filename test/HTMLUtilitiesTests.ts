import { expect } from "chai";

import * as HTMLUtilities from "../src/HTMLUtilities";

describe("HTMLUtilities", () => {
    let parentElement: HTMLDivElement;
    let childElement: HTMLDivElement;

    beforeEach(() => {
        parentElement = window.document.createElement("div");
        childElement = window.document.createElement("div");
        parentElement.appendChild(childElement);
    });

    describe("#findElement", () => {
        it("should return existing element", () => {
            const result = HTMLUtilities.findElement(parentElement, "div");
            expect(result).to.equal(childElement);
        });

        it("should return null if element does not exist", () => {
            const result = HTMLUtilities.findElement(parentElement, "p");
            expect(result).to.be.null;
        });
    });

    describe("#findRequiredElement", () => {
        it("should return existing element", () => {
            const result = HTMLUtilities.findRequiredElement(parentElement, "div");
            expect(result).to.equal(childElement);
        });

        it("should raise exception if element does not exist", () => {
            const test = () => {
                HTMLUtilities.findRequiredElement(parentElement, "p");
            }
            expect(test).to.throw("required element p not found");
        });
    });

    describe("#Attributes", () => {
        it("should set and remove an attribute", () => {
            HTMLUtilities.setAttr(parentElement, "data-test", "test");
            expect(parentElement.getAttribute("data-test")).to.equal("test");
        
            HTMLUtilities.removeAttr(parentElement, "data-test");
            expect(parentElement.getAttribute("data-test")).to.be.null;
        });
    });

    describe("#Stylesheets", () => {
        it("should create an internal stylesheet then remove it", () => {
            const doc = document.documentElement;
            HTMLUtilities.createStylesheet(doc, "sheet", "*{}");
            
            const result1 = doc.querySelector("#sheet") as HTMLElement;
            expect(result1.tagName.toLowerCase()).to.equal("style");
       
            HTMLUtilities.removeStylesheet(doc, "sheet");

            const result2 = doc.querySelector("#sheet") as HTMLElement;
            expect(result2).to.be.null;
        });
    });
});

describe("IFrameUtilities", () => {
    let iframe: HTMLIFrameElement;
    let faultyIframe: null;
    let iframeElement: HTMLDivElement;

    beforeEach(() => {
        iframe = window.document.createElement("iframe");
        iframe.src = "about:blank";
        window.document.body.appendChild(iframe);
        (iframe.contentDocument as any).open();
        (iframe.contentDocument as any).write("<html><body><div></div></body></html>");
        (iframe.contentDocument as any).close();
        
        iframeElement = (iframe.contentDocument as any).querySelector("div");

        faultyIframe = null;
    });

    describe("#findIframeElement", () => {
        it("should return existing element", () => {
            const result = HTMLUtilities.findIframeElement((iframe.contentDocument as any), "div");
            expect(result).to.equal(iframeElement);
        });

        it("should return null if element does not exist", () => {
            const result = HTMLUtilities.findIframeElement(iframe.contentDocument, "p");
            expect(result).to.be.null;
        });

        it("should raise exception if iframe does not exist", () => {
            const test = () => {
                HTMLUtilities.findIframeElement(faultyIframe, "div");
            }
            expect(test).to.throw("parent element is null");
        });
    });

    describe("#findRequiredIframeElement", () => {
        it("should return existing element", () => {
            const result = HTMLUtilities.findRequiredIframeElement(iframe.contentDocument, "div");
            expect(result).to.equal(iframeElement);
        });

        it("should raise exception if element does not exist", () => {
            const test = () => {
                HTMLUtilities.findRequiredIframeElement((iframe.contentDocument as any), "p");
            }
            expect(test).to.throw("required element p not found in iframe");
        });

        it("should raise exception if iframe does not exist", () => {
            const test = () => {
                HTMLUtilities.findRequiredIframeElement(faultyIframe, "div");
            }
            expect(test).to.throw("parent element is null");
        });
    });
});