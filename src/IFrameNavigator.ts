import Navigator from "./Navigator";
import Cacher from "./Cacher";
import Manifest from "./Manifest";

const TEMPLATE = `
  <nav class="publication">
    <div class="controls" style="display: flex; position: fixed; top: 0px; right: 0px; width: 100%; background-color: rgb(221, 221, 221); height: 2em;">
      <p class="links" style="flex: 1 1 0%; text-align: center; margin: 0px; padding: 2px">
        <a rel="start">Start</a>
      </p>
      <p style="flex: 1 1 0%; text-align: center; margin: 0px; padding: 2px">
        <a rel="prev">&lt; Previous</a>&nbsp;&nbsp;<a rel="next">Next &gt;</a>
      </p>
    </div>
  </nav>
  <main>
    <iframe style="border:0; width:100%; overflow: hidden;"></iframe>
  </main>
`;

/** Class that shows webpub resources in an iframe, with navigation controls outside the iframe. */
export default class IFrameNavigator implements Navigator {
    private cacher: Cacher;
    private iframe: HTMLIFrameElement;
    private links: Element;
    private nextLink: HTMLAnchorElement;
    private previousLink: HTMLAnchorElement;
    private startLink: HTMLAnchorElement;
    private navigation: Element;

    public constructor(cacher: Cacher) {
        this.cacher = cacher;
    }

    public async start(element: HTMLElement, manifestUrl: string): Promise<void> {
        element.innerHTML = TEMPLATE;
        let iframe = element.querySelector("iframe");
        let links = element.querySelector("p[class=links]");
        let nextLink = element.querySelector("a[rel=next]");
        let previousLink = element.querySelector("a[rel=prev]");
        let startLink = element.querySelector("a[rel=start]");
        let navigation = element.querySelector("div[class=controls]");

        if (!iframe || !links || !nextLink || !previousLink || !startLink || !navigation ||
            !(nextLink instanceof HTMLAnchorElement) ||
            !(previousLink instanceof HTMLAnchorElement) ||
            !(startLink instanceof HTMLAnchorElement)) {
            // There's a mismatch between the template and the selectors above,
            // or we weren't able to insert the template in the element.
            return new Promise<void>((_, reject) => reject());
        } else {
            this.iframe = iframe;
            this.links = links;
            this.nextLink = nextLink;
            this.previousLink = previousLink;
            this.startLink = startLink;
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
            } else {
                this.previousLink.removeAttribute("href");
            }

            let next = manifest.getNextSpineItem(currentLocation);
            if (next && next.href) {
                this.nextLink.href = new URL(next.href, manifestUrl).href;
            } else {
                this.nextLink.removeAttribute("href");
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
            let toc = document.createElement("a")
            toc.href = new URL(tocLink.href, manifestUrl).href;
            toc.rel = "contents";
            toc.textContent = "Contents";
            this.links.appendChild(document.createTextNode("\u00A0"));
            this.links.appendChild(toc);
            toc.addEventListener("click", (event: Event) => {
                this.navigate(toc.href);
                event.preventDefault();
            });
        }

        let startLink = manifest.getStartLink();
        if (startLink && startLink.href) {
            let startUrl = new URL(startLink.href, manifestUrl).href;
            this.startLink.href = startUrl;
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