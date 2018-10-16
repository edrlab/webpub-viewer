import { expect } from "chai";
import { stub } from "sinon";
import * as jsdom from "jsdom";

import EventHandler from "../src/EventHandler";

describe("EventHandler", () => {
    let eventHandler: EventHandler;

    let onLeftTap: sinon.SinonStub;
    let onMiddleTap: sinon.SinonStub;
    let onRightTap: sinon.SinonStub;
    let onBackwardSwipe: sinon.SinonStub;
    let onForwardSwipe: sinon.SinonStub;
    let onLeftArrow: sinon.SinonStub;
    let onRightArrow: sinon.SinonStub;
    let onLeftHover: sinon.SinonStub;
    let onRightHover: sinon.SinonStub;
    let onRemoveHover: sinon.SinonStub;
    let onInternalLink: sinon.SinonStub;

    let faultyIframe: null;
    let element: HTMLElement;
    let div: HTMLDivElement;
    let span: HTMLSpanElement;
    let link: HTMLAnchorElement;
    let parentLink: HTMLAnchorElement;
    let linkWithNoHref: HTMLAnchorElement;
    let internalLink: HTMLAnchorElement;

    let linkClicked: sinon.SinonStub;
    let parentLinkClicked: sinon.SinonStub;
    let internalLinkClicked: sinon.SinonStub;

    const event = (type: string, x: number = 0, y: number = 0, target: HTMLElement = div) => {
        const event = document.createEvent("UIEvent") as any;
        event.initEvent(type, true, true);
        if (type.indexOf("touch") !== -1) {
            event.changedTouches = [{
                clientX: x,
                clientY: y
            }];
        } else {
            event.clientX = x;
            event.clientY = y;
        }
        target.dispatchEvent(event);
    };

    const pause = (ms = 0): Promise<void> => {
        return new Promise<void>(resolve => setTimeout(resolve, ms));
    };

    beforeEach(() => {
        eventHandler = new EventHandler();

        onLeftTap = stub();
        onMiddleTap = stub();
        onRightTap = stub();
        onBackwardSwipe = stub();
        onForwardSwipe = stub();
        onLeftArrow = stub();
        onRightArrow = stub();
        onLeftHover = stub();
        onRightHover = stub();
        onRemoveHover = stub();
        onInternalLink = stub();

        eventHandler.onLeftTap = onLeftTap;
        eventHandler.onMiddleTap = onMiddleTap;
        eventHandler.onRightTap = onRightTap;
        eventHandler.onBackwardSwipe = onBackwardSwipe;
        eventHandler.onForwardSwipe = onForwardSwipe;
        eventHandler.onLeftArrow = onLeftArrow;
        eventHandler.onRightArrow = onRightArrow;
        eventHandler.onLeftHover = onLeftHover;
        eventHandler.onRightHover = onRightHover;
        eventHandler.onRemoveHover = onRemoveHover;
        eventHandler.onInternalLink = onInternalLink;

        element = window.document.createElement("div");

        div = window.document.createElement("div");
        element.appendChild(div);

        span = window.document.createElement("span");
        link = window.document.createElement("a");
        link.href = "http://example.com";
        link.protocol = "http";
        link.port = "";
        link.hostname = "example.com";
        linkClicked = stub();
        link.addEventListener("click", linkClicked);
        element.appendChild(link);

        parentLink = window.document.createElement("a");
        parentLink.href = "http://example.com";
        parentLink.protocol = "http";
        parentLink.port = "";
        parentLink.hostname = "example.com";
        parentLinkClicked = stub();
        parentLink.addEventListener("click", parentLinkClicked);
        const child = window.document.createElement("span");
        parentLink.appendChild(child);
        element.appendChild(parentLink);

        linkWithNoHref = window.document.createElement("a");
        element.appendChild(linkWithNoHref);

        internalLink = window.document.createElement("a");
        internalLink.href = "http://example.com#id";
        link.protocol = "http";
        link.port = "";
        link.hostname = "example.com";
        internalLinkClicked = stub();
        internalLink.addEventListener("click", internalLinkClicked);
        element.appendChild(internalLink);

        (window as any).devicePixelRatio = 2;
        (window as any).innerWidth = 1024;
        (document.documentElement as any).clientWidth = 1024;
    });

    describe("#setupEvents", () => {
        it("should raise exception if iframe is null", () => {
            faultyIframe = null;
            const test = () => {
                eventHandler.setupEvents(faultyIframe);
            }
            expect(test).to.throw("cannot setup events for null");
        });

        describe("mouse events", () => {
            beforeEach(() => {
                eventHandler.setupEvents(element);
            });

            it("should do nothing if there's an end event without a start event", async () => {
                event("mouseup", 10);
                await pause(250);
                expect(onLeftTap.callCount).to.equal(0);
            });

            it("should do nothing on double click", async () => {
                event("mousedown", 10);
                event("mouseup", 10);

                await pause(150);

                event("mousedown", 10);
                event("mouseup", 10);

                await pause(250);

                expect(onLeftTap.callCount).to.equal(0);
            });

            it("should do nothing on a single click on a link", async () => {
                event("mousedown", 10, 0, link);
                event("mouseup", 10, 0, link);

                await pause(250);

                expect(onLeftTap.callCount).to.equal(0);
            });

            it("should do nothing on a single click on a child of a link", async () => {
                event("mousedown", 10, 0, span);
                event("mouseup", 10, 0, span);

                await pause(250);

                expect(onLeftTap.callCount).to.equal(0);
            });

            it("should handle single click on a link with no href", async () => {
                event("mousedown", 10, 0, linkWithNoHref);
                event("mouseup", 10, 0, linkWithNoHref);

                await pause(250);

                expect(onLeftTap.callCount).to.equal(1);
            });

            it("should handle single click on left", async () => {
                event("mousedown", 10);
                event("mouseup", 10);

                await pause(250);

                expect(onLeftTap.callCount).to.equal(1);
            });

            it("should handle single click in middle", async () => {
                event("mousedown", 500);
                event("mouseup", 500);

                await pause(250);

                expect(onMiddleTap.callCount).to.equal(1);
            });

            it("should handle single click on right", async () => {
                event("mousedown", 1000);
                event("mouseup", 1000);

                await pause(250);

                expect(onRightTap.callCount).to.equal(1);
            });

            it("should do nothing on swipe/highlight", async () => {
                event("mousedown", 10);
                event("mouseup", 500);

                await pause(250);

                expect(onLeftTap.callCount).to.equal(0);
                expect(onMiddleTap.callCount).to.equal(0);
                expect(onBackwardSwipe.callCount).to.equal(0);
                expect(onForwardSwipe.callCount).to.equal(0);
            });

            it("should handle mouseenter on left", () => {
                event("mouseenter");
                expect(onLeftHover.callCount).to.equal(1);
            });

            it("should handle mouseenter on right", () => {
                event("mouseenter", 800);
                expect(onRightHover.callCount).to.equal(1);
            });

            it("should handle mouseenter in middle", () => {
                event("mouseenter", 500);
                expect(onLeftHover.callCount).to.equal(0);
                expect(onRightHover.callCount).to.equal(0);
                expect(onRemoveHover.callCount).to.equal(1);
            });

            it("should handle mousemove to left", () => {
                event("mousemove");
                expect(onLeftHover.callCount).to.equal(1);
            });

            it("should handle mousemove to right", () => {
                event("mousemove", 800);
                expect(onRightHover.callCount).to.equal(1);
            });

            it("should handle mousemove to middle", () => {
                event("mousemove", 500);
                expect(onLeftHover.callCount).to.equal(0);
                expect(onRightHover.callCount).to.equal(0);
                expect(onRemoveHover.callCount).to.equal(1);
            });

            it("should handle mouseleave", () => {
                event("mouseleave");
                expect(onRemoveHover.callCount).to.equal(1);
            });
        });

        describe("touch events", () => {
            beforeEach(() => {
                // Mock device that supports touch.
                window.ontouchstart = () => {};

                eventHandler.setupEvents(element);
            });

            it("should do nothing if the window is zoomed in", async () => {
                (window as any).innerWidth = 2048;
                event("touchstart");
                event("touchend");

                await pause(250);

                expect(onLeftTap.callCount).to.equal(0);
            });

            it("should do nothing if there's an end event without a start event", async () => {
                event("touchend", 10);
                await pause(250);
                expect(onLeftTap.callCount).to.equal(0);
            });

            it("should do nothing on multitouch", async () => {
                let e = document.createEvent("UIEvent") as any;
                e.initEvent("touchstart", true, true);
                e.changedTouches = [{}, {}];
                div.dispatchEvent(e);
                
                event("touchend");

                await pause(250);

                expect(onLeftTap.callCount).to.equal(0);

                event("touchstart");
                e = document.createEvent("UIEvent") as any;
                e.initEvent("touchend", true, true);
                e.changedTouches = [{}, {}];
                div.dispatchEvent(e);
                
                await pause(250);

                expect(onLeftTap.callCount).to.equal(0);
            });

            it("should do nothing on event with no changed touches", async () => {
                let e = document.createEvent("UIEvent") as any;
                e.initEvent("touchstart", true, true);
                e.changedTouches = [];
                div.dispatchEvent(e);
                
                event("touchend");

                await pause(250);

                expect(onLeftTap.callCount).to.equal(0);

                event("touchstart");
                e = document.createEvent("UIEvent") as any;
                e.initEvent("touchend", true, true);
                e.changedTouches = [];
                div.dispatchEvent(e);
                
                await pause(250);

                expect(onLeftTap.callCount).to.equal(0);
            });

            it("should do nothing on double tap", async () => {
                event("touchstart");
                event("touchend");

                await pause(150);

                event("touchstart");
                event("touchend");

                await pause(250);

                expect(onLeftTap.callCount).to.equal(0);
            });

            it("should do nothing on a long press", async () => {
                event("touchstart");
                await pause(501);
                event("touchend");

                await pause(250);

                expect(onLeftTap.callCount).to.equal(0);
            });

            it("should do nothing on a single tap on a link", async () => {
                event("touchstart", 10, 0, link);
                event("touchend", 10, 0, link);

                await pause(250);

                expect(onLeftTap.callCount).to.equal(0);
            });

            it("should do nothing on a single tap on a child of a link", async () => {
                event("touchstart", 10, 0, span);
                event("touchend", 10, 0, span);

                await pause(250);

                expect(onLeftTap.callCount).to.equal(0);
            });

            it("should handle single tap on a link with no href", async () => {
                event("touchstart", 10, 0, linkWithNoHref);
                event("touchend", 10, 0, linkWithNoHref);

                await pause(250);

                expect(onLeftTap.callCount).to.equal(1);
            });


            it("should handle single tap on left", async () => {
                event("touchstart", 10);
                event("touchend", 10);

                await pause(250);

                expect(onLeftTap.callCount).to.equal(1);
            });

            it("should handle single click in middle", async () => {
                event("touchstart", 500);
                event("touchend", 500);

                await pause(250);

                expect(onMiddleTap.callCount).to.equal(1);
            });

            it("should handle single click on right", async () => {
                event("touchstart", 1000);
                event("touchend", 1000);

                await pause(250);

                expect(onRightTap.callCount).to.equal(1);
            });

            it("should do nothing on vertical swipe", async () => {
                event("touchstart", 10, 10);
                event("touchend", 10, 500);

                await pause(250);

                expect(onLeftTap.callCount).to.equal(0);
                expect(onMiddleTap.callCount).to.equal(0);
                expect(onBackwardSwipe.callCount).to.equal(0);
                expect(onForwardSwipe.callCount).to.equal(0);
            });

            it("should do nothing on slow swipe", async () => {
                event("touchstart", 10, 10);
                await pause(501);
                event("touchend", 500, 10);

                await pause(250);

                expect(onLeftTap.callCount).to.equal(0);
                expect(onMiddleTap.callCount).to.equal(0);
                expect(onBackwardSwipe.callCount).to.equal(0);
                expect(onForwardSwipe.callCount).to.equal(0);
            });

            it("should handle backward swipe", async () => {
                event("touchstart", 300, 10);
                await pause(100);
                event("touchend", 800, 10);

                await pause(250);

                expect(onBackwardSwipe.callCount).to.equal(1);
                expect(onLeftTap.callCount).to.equal(0);
            });

            it("should handle forward swipe", async () => {
                event("touchstart", 800, 10);
                await pause(100);
                event("touchend", 300, 10);

                await pause(250);

                expect(onForwardSwipe.callCount).to.equal(1);
                expect(onRightTap.callCount).to.equal(0);
            });
        });

        describe("click events", () => {
            let openStub: sinon.SinonStub;

            beforeEach(() => {
                openStub = stub(window, "open");

                eventHandler.setupEvents(element);
            });

            afterEach(() => {
                openStub.restore();
            });

            it("should open external link in a new tab", async () => {
                event("click", 10, 0, link);

                await pause(250);

                expect(openStub.callCount).to.equal(1);
                expect(openStub.args[0][0]).to.equal(link.href);
            });

            it("should do nothing on a single click on an internal link without a #fragment", async () => {
                jsdom.changeURL(window, "http://example.com");
                event("click", 10, 0, link);

                await pause(250);

                expect(openStub.callCount).to.equal(0);
            });

            it("should handle a single click on an internal link with a #fragment", async () => {
                event("click", 10, 0, internalLink);

                await pause(250);

                expect(openStub.callCount).to.equal(0);
                expect(onInternalLink.callCount).to.equal(1);
            });

            it("should do nothing on a single click on a link with no href", async () => {
                event("click", 10, 0, linkWithNoHref);

                await pause(250);

                expect(openStub.callCount).to.equal(0);
            });
        });

        describe("keyboard events", () => {
            const keyEvent = (type: string, code: number, target: HTMLElement = div) => {
                const keyEvent = document.createEvent("UIEvent") as any;
                keyEvent.initEvent(type, true, true);
                keyEvent.keyCode = code;
                
                target.dispatchEvent(keyEvent);
            };

            beforeEach(() => {
                eventHandler.setupEvents(element);
            });

            it("should do nothing if a non-handled key is pressed", () => {
                keyEvent("keydown", 8);
                expect(onLeftArrow.callCount).to.equal(0);
                expect(onRightArrow.callCount).to.equal(0);
            });

            it("should handle the left arrow key", () => {
                keyEvent("keydown", 37);
                expect(onLeftArrow.callCount).to.equal(1);
                expect(onRightArrow.callCount).to.equal(0);
            });

            it("should handle the right arrow key", () => {
                keyEvent("keydown", 39);
                expect(onLeftArrow.callCount).to.equal(0);
                expect(onRightArrow.callCount).to.equal(1);
            });
        });
    });
});