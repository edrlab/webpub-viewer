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
    <div class="loading" style="display:none;">Loading</div>
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

interface ReadingPosition {
    resource: string;
    position: number;
}

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
    private links: HTMLUListElement;
    private linksToggle: Element | null;
    private previousPageLink: Element | null;
    private nextPageLink: Element | null;
    private loading: HTMLDivElement;
    private newPosition: ReadingPosition | null;

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
        let loading = element.querySelector("div[class=loading]");

        if (!iframe || !nextChapterLink || !previousChapterLink ||
            !startLink || !contentsLink || !navigation || !links ||
            !loading ||
            (this.paginator && !linksToggle) ||
            (this.paginator && !previousPageLink) ||
            (this.paginator && !nextPageLink) ||
            !(nextChapterLink instanceof HTMLAnchorElement) ||
            !(previousChapterLink instanceof HTMLAnchorElement) ||
            !(startLink instanceof HTMLAnchorElement) ||
            !(contentsLink instanceof HTMLAnchorElement) ||
            !(links instanceof HTMLUListElement) ||
            !(loading instanceof HTMLDivElement)) {
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
            this.loading = loading;
            this.newPosition = null;
            return await this.setupEventsAndLoad(manifestUrl);
        }
    }

    private async setupEventsAndLoad(manifestUrl: string): Promise<void> {
        this.iframe.addEventListener("load", async () => {
            this.loading.style.display = "block";
            if (this.paginator) {
                let paginatorPosition = 0;
                if (this.newPosition) {
                    paginatorPosition = this.newPosition.position;
                }
                await this.paginator.start(this.iframe, paginatorPosition);
                this.newPosition = null;
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
                await this.saveReadingPosition();
            }
            this.loading.style.display = "none";
        });

        if (this.paginator && this.linksToggle && this.previousPageLink && this.nextPageLink) {
            let paginator: Paginator = this.paginator;

            let checkForLink = (event: MouseEvent): boolean => {
                let x = event.clientX;
                let marginTop = 0;
                if (this.iframe.style.marginTop) {
                    marginTop = parseInt(this.iframe.style.marginTop.slice(0, -2), 10);
                }
                let y = event.clientY - marginTop;
                let iframeElement = this.iframe.contentDocument.elementFromPoint(x, y);
                let tag = iframeElement.tagName;
                if (tag.toLowerCase() === "a" && iframeElement instanceof HTMLAnchorElement) {
                    let isSameOrigin = (
                        window.location.protocol === iframeElement.protocol &&
                        window.location.port === iframeElement.port &&
                        window.location.hostname == iframeElement.hostname
                    );
                    if (isSameOrigin) { 
                        let newEvent = new MouseEvent(event.type, event);
                        iframeElement.dispatchEvent(newEvent);
                    } else {
                        window.open(iframeElement.href, "_blank");
                    }
                    return true;
                }
                return false;
            };

            this.linksToggle.addEventListener("click", (event: MouseEvent) => {
                event.preventDefault();
                if (!checkForLink(event)) {
                    let display: string | null = this.links.style.display;
                    if (display && display === "none") {
                        this.links.style.display = "block";
                    } else {
                        this.links.style.display = "none";
                    }
                }
            });

            this.previousPageLink.addEventListener("click", (event: MouseEvent) => {
                event.preventDefault();
                if (!checkForLink(event)) {
                    if (paginator.onFirstPage()) {
                        if (this.previousChapterLink.hasAttribute("href")) {
                            let position = {
                                resource: this.previousChapterLink.href,
                                position: 1
                            };
                            this.navigate(position);
                        }
                    } else {
                        paginator.goToPreviousPage();
                        this.saveReadingPosition();
                    }
                }
            });

            this.nextPageLink.addEventListener("click", (event: MouseEvent) => {
                event.preventDefault();
                if (!checkForLink(event)) {
                    if (paginator.onLastPage()) {
                        if (this.nextChapterLink.hasAttribute("href")) {
                            let position = {
                                resource: this.nextChapterLink.href,
                                position: 0
                            };
                            this.navigate(position);
                        }
                    } else {
                        paginator.goToNextPage();
                        this.saveReadingPosition();
                    }
                }
            });

            window.onresize = () => {
                let oldPosition = paginator.getCurrentPosition();
                this.setIFrameSize();
                paginator.goToPosition(oldPosition);                
            };

        }

        this.previousChapterLink.addEventListener("click", (event: MouseEvent) => {
            if (this.previousChapterLink.hasAttribute("href")) {
                let position = {
                    resource: this.previousChapterLink.href,
                    position: 0
                }
                this.navigate(position);
            }
            event.preventDefault();
        });

        this.nextChapterLink.addEventListener("click", (event: MouseEvent) => {
            if (this.nextChapterLink.hasAttribute("href")) {
                let position = {
                    resource: this.nextChapterLink.href,
                    position: 0
                };
                this.navigate(position);
            }
            event.preventDefault();
        });

        this.startLink.addEventListener("click", (event: MouseEvent) => {
            if (this.startLink.hasAttribute("href")) {
                let position = {
                    resource: this.startLink.href,
                    position: 0
                };
                this.navigate(position);
            }
            event.preventDefault();
        });

        let manifest: Manifest = await this.cacher.getManifest(manifestUrl);

        let tocLink = manifest.getTOCLink();
        if (tocLink && tocLink.href) {
            var href = new URL(tocLink.href, manifestUrl).href;
            this.contentsLink.href = href;
            this.contentsLink.className = "";
            this.contentsLink.addEventListener("click", (event: MouseEvent) => {
                let position = {
                    resource: this.contentsLink.href,
                    position: 0
                };
                this.navigate(position);
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

        let lastReadingPosition: ReadingPosition | null = null;
        if (this.annotator) {
            lastReadingPosition = await this.annotator.getLastReadingPosition() as ReadingPosition | null;
        }

        if (lastReadingPosition) {
            this.navigate(lastReadingPosition);
        } else if (startUrl) {
            let position = {
                resource: startUrl,
                position: 0
            };
            this.navigate(position);
        }

        return new Promise<void>(resolve => resolve());
    }

    private navigate(readingPosition: ReadingPosition): void {
        this.loading.style.display = "block";
        this.newPosition = readingPosition;
        this.iframe.src = readingPosition.resource;
        this.setIFrameSize();
    }

    private setIFrameSize(): void {
        let topMargin = 0;
        if (!this.paginator) {
            topMargin = this.links.clientHeight;
        }
        this.iframe.style.height = (window.innerHeight - topMargin) + "px";
        this.iframe.style.marginTop = topMargin + "px";
        this.iframe.style.width = document.body.offsetWidth + "px";
    }

    private async saveReadingPosition(): Promise<void> {
        if (this.annotator) {
            let resource = this.iframe.src;
            let position = 0;
            if (this.paginator) {
                position = this.paginator.getCurrentPosition();
            }
            await this.annotator.saveLastReadingPosition({
                resource: resource,
                position: position
            });
        } else {
            return new Promise<void>(resolve => resolve());
        }
    }
}