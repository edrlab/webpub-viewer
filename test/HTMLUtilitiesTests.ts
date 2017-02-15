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
        it("should returning existing element", () => {
            const result = HTMLUtilities.findElement(parentElement, "div");
            expect(result).to.equal(childElement);
        });

        it("should return null if element does not exist", () => {
            const result = HTMLUtilities.findElement(parentElement, "p");
            expect(result).to.be.null;
        });
    });

    describe("#findRequiredElement", () => {
        it("should returning existing element", () => {
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
});