import { expect } from "chai";

import * as BrowserUtilities from "../src/BrowserUtilities";

describe("BrowserUtilities", () => {
    beforeEach(() => {
        (window as any).innerWidth = 50;
        (window as any).innerHeight = 10;
        (document.documentElement as any).clientWidth = 500;
        (document.documentElement as any).clientHeight = 800;
    });

    describe("#getWidth", () => {
        it("should return current width", () => {
            expect(BrowserUtilities.getWidth()).to.equal(500);
            (document.documentElement as any).clientWidth = 100;
            expect(BrowserUtilities.getWidth()).to.equal(100);
        });
    });

    describe("#getHeight", () => {
        it("should return current height", () => {
            expect(BrowserUtilities.getHeight()).to.equal(800);
            (document.documentElement as any).clientHeight = 100;
            expect(BrowserUtilities.getHeight()).to.equal(100);
        });
    });

    describe("#isZoomed", () => {
        it("should return true if document width differs from window width", () => {
            expect(BrowserUtilities.isZoomed()).to.equal(true);
            (document.documentElement as any).clientWidth = 50;
            expect(BrowserUtilities.isZoomed()).to.equal(false);
        });
    });
});