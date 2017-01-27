import Navigator from "./Navigator";
import Cacher from "./Cacher";
import Paginator from "./Paginator";
import Annotator from "./Annotator";
import Manifest from "./Manifest";

let template = (paginationControls: string) => `
  <nav class="publication">
    <div class="controls">
      <ul class="links" style="z-index: 2000;">
        <li><a rel="start" class="disabled">Start</a></li>
        <li><a rel="contents" class="disabled">Contents</a></li>
        <li><a rel="prev" class="disabled">Previous Chapter</a></li>
        <li><a rel="next" class="disabled">Next Chapter</a></li>
      </ul>
      ${paginationControls}
    </div>
  </nav>
  <main style="overflow: hidden">
    <iframe style="border:0; width:100%; overflow: hidden;"></iframe>
  </main>
`;

const PAGINATION_CONTROLS = `
    <div class="page-controls" style="-webkit-tap-highlight-color: transparent;">
        <div class="previous-page" style="position: fixed; top: 0; left: 0; width: 30%; height: 100%; z-index: 1000;"></div>
        <div class="links-toggle" style="position: fixed; top: 0; left: 30%; width: 40%; height: 100%; z-index: 1000;"></div>
        <div class="next-page" style="position: fixed; top: 0; left: 70%; width: 30%; height: 100%; z-index: 1000;"></div>
    </div>
`;

const HTML_WITH_PAGINATOR = template(PAGINATION_CONTROLS);
const HTML_WITHOUT_PAGINATOR = template("");


/** Class that shows webpub resources in an iframe, with navigation controls outside the iframe. */
export default class IFrameNavigator implements Navigator {
    private cacher: Cacher;
    private paginator: Paginator | null;
    private annotator: Annotator | null;
    private iframe: HTMLIFrameElement;
    private nextChapterLink: HTMLAnchorElement;
    private previousChapterLink: HTMLAnchorElement;
    private startLink: HTMLAnchorElement;
    private contentsLink: HTMLAnchorElement;
    private navigation: Element;
    private links: Element;
    private linksToggle: Element | null;
    private previousPageLink: Element | null;
    private nextPageLink: Element | null;
    private goingToLastPage: boolean;

    public constructor(cacher: Cacher, paginator: Paginator | null = null, annotator: Annotator | null = null) {
        this.cacher = cacher;
        this.paginator = paginator;
        this.annotator = annotator;
    }

    public async start(element: HTMLElement, manifestUrl: string): Promise<void> {
        let html;
        if (this.paginator) {
            html = HTML_WITH_PAGINATOR;
        } else {
            html = HTML_WITHOUT_PAGINATOR;
        }
        element.innerHTML = html;
        let iframe = element.querySelector("iframe");
        let nextChapterLink = element.querySelector("a[rel=next]");
        let previousChapterLink = element.querySelector("a[rel=prev]");
        let startLink = element.querySelector("a[rel=start]");
        let contentsLink = element.querySelector("a[rel=contents]");
        let navigation = element.querySelector("div[class=controls]");
        let links = element.querySelector("ul[class=links]");
        let linksToggle = element.querySelector("div[class=links-toggle]");
        let previousPageLink = element.querySelector("div[class=previous-page]");
        let nextPageLink = element.querySelector("div[class=next-page]");

        if (!iframe || !nextChapterLink || !previousChapterLink ||
            !startLink || !contentsLink || !navigation || !links ||
            (this.paginator && !linksToggle) ||
            (this.paginator && !previousPageLink) ||
            (this.paginator && !nextPageLink) ||
            !(nextChapterLink instanceof HTMLAnchorElement) ||
            !(previousChapterLink instanceof HTMLAnchorElement) ||
            !(startLink instanceof HTMLAnchorElement) ||
            !(contentsLink instanceof HTMLAnchorElement)) {
            // There's a mismatch between the template and the selectors above,
            // or we weren't able to insert the template in the element.
            return new Promise<void>((_, reject) => reject());
        } else {
            this.iframe = iframe;
            this.nextChapterLink = nextChapterLink;
            this.previousChapterLink = previousChapterLink;
            this.startLink = startLink;
            this.contentsLink = contentsLink;
            this.navigation = navigation;
            this.links = links;
            this.linksToggle = linksToggle;
            this.previousPageLink = previousPageLink;
            this.nextPageLink = nextPageLink;
            this.goingToLastPage = false;
            return await this.setupEventsAndLoad(manifestUrl);
        }
    }

    private async setupEventsAndLoad(manifestUrl: string): Promise<void> {
        this.iframe.addEventListener("load", async () => {
            if (this.paginator) {
                await this.paginator.start(this.iframe, this.goingToLastPage);
                this.goingToLastPage = false;
            }

            let manifest = await this.cacher.getManifest(manifestUrl);
            let currentLocation = this.iframe.src;
            if (this.iframe.contentDocument && this.iframe.contentDocument.location && this.iframe.contentDocument.location.href) {
                currentLocation = this.iframe.contentDocument.location.href;
            }

            let previous = manifest.getPreviousSpineItem(currentLocation);
            if (previous && previous.href) {
                this.previousChapterLink.href = new URL(previous.href, manifestUrl).href;
                this.previousChapterLink.className = "";
            } else {
                this.previousChapterLink.removeAttribute("href");
                this.previousChapterLink.className = "disabled";
            }

            let next = manifest.getNextSpineItem(currentLocation);
            if (next && next.href) {
                this.nextChapterLink.href = new URL(next.href, manifestUrl).href;
                this.nextChapterLink.className = "";
            } else {
                this.nextChapterLink.removeAttribute("href");
                this.nextChapterLink.className = "disabled";
            }

            if (this.annotator) {
                await this.annotator.saveLastReadingPosition(currentLocation);
            }
        });

        if (this.paginator && this.linksToggle && this.previousPageLink && this.nextPageLink) {
            let paginator: Paginator = this.paginator;

            this.linksToggle.addEventListener("click", (event: any) => {
                event.preventDefault();
                let iframeElement = this.iframe.contentDocument.elementFromPoint(event.clientX, event.clientY);
                let tag = iframeElement.tagName;
                if (tag.toLowerCase() === "a") {
                    let newEvent = new (event.constructor as any)(event.type, event);
                    iframeElement.dispatchEvent(newEvent)
                } else {
                    let display: string = (this.links as any).style.display;
                    if (display === "none") {
                        (this.links as any).style.display = "block";
                    } else {
                        (this.links as any).style.display = "none";
                    }
                }
            });

            this.previousPageLink.addEventListener("click", (event: any) => {
                event.preventDefault();
                let iframeElement = this.iframe.contentDocument.elementFromPoint(event.clientX, event.clientY);
                let tag = iframeElement.tagName;
                if (tag.toLowerCase() === "a") {
                    let newEvent = new (event.constructor as any)(event.type, event);
                    iframeElement.dispatchEvent(newEvent)
                } else {
                    if (paginator.onFirstPage()) {
                        if (this.previousChapterLink.hasAttribute("href")) {
                            this.navigate(this.previousChapterLink.href, true);
                        }
                    } else {
                        paginator.goToPreviousPage();
                    }
                }
            });

            this.nextPageLink.addEventListener("click", (event: any) => {
                event.preventDefault();
                let iframeElement = this.iframe.contentDocument.elementFromPoint(event.clientX, event.clientY);
                let tag = iframeElement.tagName;
                if (tag.toLowerCase() === "a") {
                    let newEvent = new (event.constructor as any)(event.type, event);
                    iframeElement.dispatchEvent(newEvent)
                } else {
                    if (paginator.onLastPage()) {
                        if (this.nextChapterLink.hasAttribute("href")) {
                            this.navigate(this.nextChapterLink.href);
                        }
                    } else {
                        paginator.goToNextPage();
                    }
                }
            });

        }

        this.previousChapterLink.addEventListener("click", (event: Event) => {
            if (this.previousChapterLink.hasAttribute("href")) {
                this.navigate(this.previousChapterLink.href);
            }
            event.preventDefault();
        });

        this.nextChapterLink.addEventListener("click", (event: Event) => {
            if (this.nextChapterLink.hasAttribute("href")) {
                this.navigate(this.nextChapterLink.href);
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

    private navigate(url: string, toLastPage: boolean = false): void {
        this.goingToLastPage = toLastPage;
        this.iframe.src = url;
        this.iframe.style.height = window.innerHeight + "px";
        this.iframe.style.width = document.body.offsetWidth + "px";
    }
}