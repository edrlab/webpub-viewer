import { expect } from "chai";

import HTMLView from "../src/HTMLView";

describe("HTMLView", () => {
    class TestHTMLView extends HTMLView {
        public testFindElement(parentElement: Element, selector: string): Element | null {
            return this.findElement(parentElement, selector);
        }

        public testFindRequiredElement(parentElement: Element, selector: string): Element {
            return this.findRequiredElement(parentElement, selector);
        }
    }

    let parentElement: HTMLDivElement;
    let childElement: HTMLDivElement;
    let testView: TestHTMLView;

    beforeEach(() => {
        parentElement = window.document.createElement("div");
        childElement = window.document.createElement("div");
        parentElement.appendChild(childElement);

        testView = new TestHTMLView();
    });

    describe("#findElement", () => {
        it("should returning existing element", () => {
            const result = testView.testFindElement(parentElement, "div");
            expect(result).to.equal(childElement);
        });

        it("should return null if element does not exist", () => {
            const result = testView.testFindElement(parentElement, "p");
            expect(result).to.be.null;
        });
    });

    describe("#findRequiredElement", () => {
        it("should returning existing element", () => {
            const result = testView.testFindRequiredElement(parentElement, "div");
            expect(result).to.equal(childElement);
        });

        it("should raise exception if element does not exist", () => {
            const test = () => {
                testView.testFindRequiredElement(parentElement, "p");
            }
            expect(test).to.throw("required element p not found");
        });
    });
});