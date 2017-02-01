import { expect } from "chai";
import { stub } from "sinon";
import * as jsdom from "jsdom";

import WebpubViewer from "../src/WebpubViewer"
import Cacher from "../src/Cacher";
import Navigator from "../src/Navigator";

describe('WebpubViewer', () => {
    let cacherStart: Sinon.SinonStub;
    class MockCacher implements Cacher {
        public start(manifestUrl: string): Promise<void> {
            return cacherStart(manifestUrl);
        };
        public getManifest(manifestUrl: string): Promise<any> {
            return new Promise((resolve) => resolve(manifestUrl));
        };
    }

    let navigatorStart: Sinon.SinonStub;
    class MockNavigator implements Navigator {
        public start(element: HTMLElement, manifestUrl: string): Promise<void> {
            return navigatorStart(element, manifestUrl);
        }
    }

    const cacher = new MockCacher();
    const navigator = new MockNavigator();
    let viewer: WebpubViewer;
    let element: HTMLElement;

    beforeEach(function () {
        cacherStart = stub().returns(new Promise(resolve => resolve()));
        navigatorStart = stub().returns(new Promise(resolve => resolve()));
        viewer = new WebpubViewer(cacher, navigator);

        // The viewer needs to be at a real URL (not about:blank)
        // to determine a URL for the manifest.
        jsdom.changeURL(window, "http://example.com");

        element = document.createElement("div");
    });

    describe('#start', () => {
        it('should start the cacher', async () => {
            expect(cacherStart.callCount).to.equal(0);
            await viewer.start(element);
            expect(cacherStart.callCount).to.equal(1);
            expect(cacherStart.args[0][0]).to.equal("http://example.com/manifest.json");
        });

        it("should start the navigator", async () => {
            expect(navigatorStart.callCount).to.equal(0);
            await viewer.start(element);
            expect(navigatorStart.callCount).to.equal(1);
            expect(navigatorStart.args[0][0]).to.equal(element);
            expect(navigatorStart.args[0][1]).to.equal("http://example.com/manifest.json");
        });
    });
});