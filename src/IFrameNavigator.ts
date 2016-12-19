import Navigator from "./Navigator";
import Cacher from "./Cacher";
import Annotator from "./Annotator";
import Manifest from "./Manifest";

const TEMPLATE = `
  <nav class="publication">
    <div class="controls">
      <ul class="links">
        <li><a rel="start" class="disabled">Start</a></li>
        <li><a rel="contents" class="disabled">Contents</a></li>
        <li><a rel="prev" class="disabled">Previous Chapter</a></li>
        <li><a rel="next" class="disabled">Next Chapter</a></li>
      </ul>
    </div>
  </nav>
  <main>
    <iframe style="border:0; width:100%; overflow: hidden;"></iframe>
  </main>
`;

/** Class that shows webpub resources in an iframe, with navigation controls outside the iframe. */
export default class IFrameNavigator implements Navigator {
    private cacher: Cacher;
    private annotator: Annotator | null;
    private iframe: HTMLIFrameElement;
    private nextLink: HTMLAnchorElement;
    private previousLink: HTMLAnchorElement;
    private startLink: HTMLAnchorElement;
    private contentsLink: HTMLAnchorElement;
    private navigation: Element;

    public constructor(cacher: Cacher, annotator: Annotator | null = null) {
        this.cacher = cacher;
        this.annotator = annotator;
    }

    public async start(element: HTMLElement, manifestUrl: string): Promise<void> {
        element.innerHTML = TEMPLATE;
        let iframe = element.querySelector("iframe");
        let nextLink = element.querySelector("a[rel=next]");
        let previousLink = element.querySelector("a[rel=prev]");
        let startLink = element.querySelector("a[rel=start]");
        let contentsLink = element.querySelector("a[rel=contents]");
        let navigation = element.querySelector("div[class=controls]");

        if (!iframe || !nextLink || !previousLink || !startLink || !contentsLink || !navigation ||
            !(nextLink instanceof HTMLAnchorElement) ||
            !(previousLink instanceof HTMLAnchorElement) ||
            !(startLink instanceof HTMLAnchorElement) ||
            !(contentsLink instanceof HTMLAnchorElement)) {
            // There's a mismatch between the template and the selectors above,
            // or we weren't able to insert the template in the element.
            return new Promise<void>((_, reject) => reject());
        } else {
            this.iframe = iframe;
            this.nextLink = nextLink;
            this.previousLink = previousLink;
            this.startLink = startLink;
            this.contentsLink = contentsLink;
            this.navigation = navigation;
            return await this.setupEventsAndLoad(manifestUrl);
        }
    }

    private async setupEventsAndLoad(manifestUrl: string): Promise<void> {
        this.iframe.addEventListener("load", async () => {
            let manifest = await this.cacher.getManifest(manifestUrl);
            let currentLocation = this.iframe.src;
            if (this.iframe.contentDocument && this.iframe.contentDocument.location && this.iframe.contentDocument.location.href) {
                currentLocation = this.iframe.contentDocument.location.href;
            }

            let previous = manifest.getPreviousSpineItem(currentLocation);
            if (previous && previous.href) {
                this.previousLink.href = new URL(previous.href, manifestUrl).href;
                this.previousLink.className = "";
            } else {
                this.previousLink.removeAttribute("href");
                this.previousLink.className = "disabled";
            }

            let next = manifest.getNextSpineItem(currentLocation);
            if (next && next.href) {
                this.nextLink.href = new URL(next.href, manifestUrl).href;
                this.nextLink.className = "";
            } else {
                this.nextLink.removeAttribute("href");
                this.nextLink.className = "disabled";
            }

            if (this.annotator) {
                await this.annotator.saveLastReadingPosition(currentLocation);
            }
        });

        this.previousLink.addEventListener("click", (event: Event) => {
            if (this.previousLink.hasAttribute("href")) {
                this.navigate(this.previousLink.href);
            }
            event.preventDefault();
        });

        this.nextLink.addEventListener("click", (event: Event) => {
            if (this.nextLink.hasAttribute("href")) {
                this.navigate(this.nextLink.href);
            }
            event.preventDefault();
        });

        this.startLink.addEventListener("click", (event: Event) => {
            if (this.startLink.hasAttribute("href")) {
                this.navigate(this.startLink.href);
            }
            event.preventDefault();
        });

        let manifest: Manifest = await this.cacher.getManifest(manifestUrl);

        let tocLink = manifest.getTOCLink();
        if (tocLink && tocLink.href) {
            var href = new URL(tocLink.href, manifestUrl).href;
            this.contentsLink.href = href;
            this.contentsLink.className = "";
            this.contentsLink.addEventListener("click", (event: Event) => {
                this.navigate(this.contentsLink.href);
                event.preventDefault();
            });
        }

        let startUrl: string | null = null;
        let startLink = manifest.getStartLink();
        if (startLink && startLink.href) {
            startUrl = new URL(startLink.href, manifestUrl).href;
            this.startLink.href = startUrl;
            this.startLink.className = "";
        }

        let lastReadingPosition: string | null = null;
        if (this.annotator) {
            lastReadingPosition = await this.annotator.getLastReadingPosition() as string | null;
        }

        if (lastReadingPosition) {
            this.navigate(lastReadingPosition);
        } else if (startUrl) {
            this.navigate(startUrl);
        }

        return new Promise<void>(resolve => resolve());
    }

    private navigate(url: string): void {
        this.iframe.src = url;
        this.iframe.style.height = window.innerHeight - this.navigation.scrollHeight - 5 + "px";
        this.iframe.style.marginTop = this.navigation.scrollHeight + "px";
    }
}