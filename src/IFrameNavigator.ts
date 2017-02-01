import Navigator from "./Navigator";
import Cacher from "./Cacher";
import Paginator from "./Paginator";
import Annotator from "./Annotator";
import Manifest from "./Manifest";

const template = (paginationControls: string) => `
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
    <div class="toc" style="display: none; z-index: 3000;"></div>
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
    private manifestUrl: string;
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
    private toc: HTMLDivElement;
    private loadingMessage: HTMLDivElement;
    private linksToggle: Element | null;
    private previousPageLink: Element | null;
    private nextPageLink: Element | null;
    private newPosition: ReadingPosition | null;
    private isLoading: boolean;

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
        this.manifestUrl = manifestUrl;
        try {
            this.iframe = this.findRequiredElement(element, "iframe") as HTMLIFrameElement;
            this.nextChapterLink = this.findRequiredElement(element, "a[rel=next]") as HTMLAnchorElement;
            this.previousChapterLink = this.findRequiredElement(element, "a[rel=prev]") as HTMLAnchorElement;
            this.startLink = this.findRequiredElement(element, "a[rel=start]") as HTMLAnchorElement;
            this.contentsLink = this.findRequiredElement(element, "a[rel=contents]") as HTMLAnchorElement;
            this.navigation = this.findRequiredElement(element, "div[class=controls]");
            this.links = this.findRequiredElement(element, "ul[class=links]") as HTMLUListElement;
            this.toc = this.findRequiredElement(element, "div[class=toc]") as HTMLDivElement;
            this.loadingMessage = this.findRequiredElement(element, "div[class=loading]") as HTMLDivElement;
            let find = this.findElement.bind(this);
            if (this.paginator) {
                find = this.findRequiredElement.bind(this);
            }
            this.linksToggle = find(element, "div[class=links-toggle]");
            this.previousPageLink = find(element, "div[class=previous-page]");
            this.nextPageLink = find(element, "div[class=next-page]");
            this.newPosition = null;
            this.isLoading = true;
            this.setupEvents();
            return await this.loadManifest();
        } catch (err) {
            // There's a mismatch between the template and the selectors above,
            // or we weren't able to insert the template in the element.
            return new Promise<void>((_, reject) => reject(err));
        }
    }

    private findElement(parentElement: Element, selector: string): Element | null {
        return parentElement.querySelector(selector);
    }

    private findRequiredElement(parentElement: Element, selector: string): Element {
        const element = this.findElement(parentElement, selector);
        if (!element) {
            throw "required element " + selector + " not found";
        } else {
            return element;
        }
    }

    private setupEvents(): void {
        this.iframe.addEventListener("load", this.handleIFrameLoad.bind(this));

        window.onresize = this.handleResize.bind(this);

        if (this.paginator && this.linksToggle && this.previousPageLink && this.nextPageLink) {
            this.linksToggle.addEventListener("click", this.handleToggleLinksClick.bind(this));

            this.previousPageLink.addEventListener("click", this.handlePreviousPageClick.bind(this));

            this.nextPageLink.addEventListener("click", this.handleNextPageClick.bind(this));
        }

        this.previousChapterLink.addEventListener("click", this.handlePreviousChapterClick.bind(this));

        this.nextChapterLink.addEventListener("click", this.handleNextChapterClick.bind(this));

        this.startLink.addEventListener("click", this.handleStartClick.bind(this));

        this.contentsLink.addEventListener("click", this.handleContentsClick.bind(this));
    }

    private async loadManifest(): Promise<void> {
        const manifest: Manifest = await this.cacher.getManifest(this.manifestUrl);

        const toc = manifest.toc;
        if (toc.length) {
            this.contentsLink.href = "#";
            this.contentsLink.className = "";
            const listElement: HTMLUListElement = document.createElement("ul");
            for (const link of toc) {
                const listItemElement : HTMLLIElement = document.createElement("li");
                const linkElement: HTMLAnchorElement = document.createElement("a");
                let href = "";
                if (link.href) {
                    href = new URL(link.href, this.manifestUrl).href;
                }
                linkElement.href = href;
                linkElement.text = link.title || "";
                linkElement.addEventListener("click", (event: Event) => {
                    event.preventDefault();
                    this.hideTOC();
                    this.navigate({
                        resource: linkElement.href,
                        position: 0
                    });
                });
                listItemElement.appendChild(linkElement);
                listElement.appendChild(listItemElement);
            }
            this.toc.appendChild(listElement);
        }

        let startUrl: string | null = null;
        const startLink = manifest.getStartLink();
        if (startLink && startLink.href) {
            startUrl = new URL(startLink.href, this.manifestUrl).href;
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
            const position = {
                resource: startUrl,
                position: 0
            };
            this.navigate(position);
        }

        return new Promise<void>(resolve => resolve());
    }

    private async handleIFrameLoad(): Promise<void> {
        this.showLoadingMessageAfterDelay();
        if (this.paginator) {
            let paginatorPosition = 0;
            if (this.newPosition) {
                paginatorPosition = this.newPosition.position;
            }
            await this.paginator.start(this.iframe, paginatorPosition);
            this.newPosition = null;
        }

        const manifest = await this.cacher.getManifest(this.manifestUrl);
        let currentLocation = this.iframe.src;
        if (this.iframe.contentDocument && this.iframe.contentDocument.location && this.iframe.contentDocument.location.href) {
            currentLocation = this.iframe.contentDocument.location.href;
        }

        const previous = manifest.getPreviousSpineItem(currentLocation);
        if (previous && previous.href) {
            this.previousChapterLink.href = new URL(previous.href, this.manifestUrl).href;
            this.previousChapterLink.className = "";
        } else {
            this.previousChapterLink.removeAttribute("href");
            this.previousChapterLink.className = "disabled";
        }

        const next = manifest.getNextSpineItem(currentLocation);
        if (next && next.href) {
            this.nextChapterLink.href = new URL(next.href, this.manifestUrl).href;
            this.nextChapterLink.className = "";
        } else {
            this.nextChapterLink.removeAttribute("href");
            this.nextChapterLink.className = "disabled";
        }

        this.setActiveTOCItem(currentLocation);

        if (this.annotator) {
            await this.saveCurrentReadingPosition();
        }
        this.hideLoadingMessage();
        return new Promise<void>(resolve => resolve());
    }

    private checkForIFrameLink = (event: MouseEvent): boolean => {
        const x = event.clientX;
        let marginTop = 0;
        if (this.iframe.style.marginTop) {
            marginTop = parseInt(this.iframe.style.marginTop.slice(0, -2), 10);
        }
        const y = event.clientY - marginTop;
        const iframeElement = this.iframe.contentDocument.elementFromPoint(x, y);
        let foundLink: Element | null = null;
        let nextElement: Element | null = iframeElement;
        while (nextElement && nextElement.tagName.toLowerCase() !== "body") {
            if (nextElement.tagName.toLowerCase() === "a") {
                foundLink = nextElement;
                break;
            } else {
                nextElement = nextElement.parentElement;
            }
        }
        if (foundLink) {
            const link = (foundLink as HTMLAnchorElement);
            const isSameOrigin = (
                window.location.protocol === link.protocol &&
                window.location.port === link.port &&
                window.location.hostname === link.hostname
            );
            if (isSameOrigin) { 
                const newEvent = new MouseEvent(event.type, event);
                link.dispatchEvent(newEvent);
            } else {
                window.open(link.href, "_blank");
            }
            return true;
        }
        return false;
    }

    private handleToggleLinksClick(event: MouseEvent): void {
        event.preventDefault();
        this.hideTOC();
        if (!this.checkForIFrameLink(event)) {
            const display: string | null = this.links.style.display;
            if (display && display === "none") {
                this.links.style.display = "block";
            } else {
                this.links.style.display = "none";
            }
        }
    }

    private handlePreviousPageClick(event: MouseEvent): void {
        event.preventDefault();
        this.hideTOC();
        if (this.paginator && !this.checkForIFrameLink(event)) {
            if (this.paginator.onFirstPage()) {
                if (this.previousChapterLink.hasAttribute("href")) {
                    const position = {
                        resource: this.previousChapterLink.href,
                        position: 1
                    };
                    this.navigate(position);
                }
            } else {
                this.paginator.goToPreviousPage();
                this.saveCurrentReadingPosition();
            }
        }
    }

    private handleNextPageClick(event: MouseEvent) {
        event.preventDefault();
        this.hideTOC();
        if (this.paginator && !this.checkForIFrameLink(event)) {
            if (this.paginator.onLastPage()) {
                if (this.nextChapterLink.hasAttribute("href")) {
                    const position = {
                        resource: this.nextChapterLink.href,
                        position: 0
                    };
                    this.navigate(position);
                }
            } else {
                this.paginator.goToNextPage();
                this.saveCurrentReadingPosition();
            }
        }
    }

    private handleResize(): void {
        if (this.paginator) {
            const oldPosition = this.paginator.getCurrentPosition();
            this.setIFrameSize();
            this.paginator.goToPosition(oldPosition);
        } else {
            this.setIFrameSize();
        }
    }

    private handlePreviousChapterClick(event: MouseEvent): void {
        this.hideTOC();
        if (this.previousChapterLink.hasAttribute("href")) {
            const position = {
                resource: this.previousChapterLink.href,
                position: 0
            }
            this.navigate(position);
        }
        event.preventDefault();
    }

    private handleNextChapterClick(event: MouseEvent): void {
        this.hideTOC();
        if (this.nextChapterLink.hasAttribute("href")) {
            const position = {
                resource: this.nextChapterLink.href,
                position: 0
            };
            this.navigate(position);
        }
        event.preventDefault();
    }

    private handleStartClick(event: MouseEvent): void {
        this.hideTOC();
        if (this.startLink.hasAttribute("href")) {
            const position = {
                resource: this.startLink.href,
                position: 0
            };
            this.navigate(position);
        }
        event.preventDefault();
    }

    private handleContentsClick(event: MouseEvent): void {
        const display: string | null = this.toc.style.display;
        if (display && display === "none") {
            this.toc.style.display = "block";
        } else {
            this.toc.style.display = "none";
        }
        event.preventDefault();
    }

    private hideTOC(): void {
        this.toc.style.display = "none";
    }

    private setActiveTOCItem(resource: string): void {
       const allItems = Array.prototype.slice.call(this.toc.querySelectorAll("li > a"));
       for (const item of allItems) {
           item.className = "";
       }
       const activeItem = this.toc.querySelector('li > a[href="' + resource  + '"]');
       if (activeItem) {
           activeItem.className = "active";
       }
    }

    private navigate(readingPosition: ReadingPosition): void {
        this.showLoadingMessageAfterDelay();
        this.newPosition = readingPosition;
        this.iframe.src = readingPosition.resource;
        this.setIFrameSize();
    }

    private showLoadingMessageAfterDelay() {
        this.isLoading = true;
        setTimeout(() => {
            if (this.isLoading) {
                this.loadingMessage.style.display = "block";
            }
        }, 200);
    }

    private hideLoadingMessage() {
        this.isLoading = false;
        this.loadingMessage.style.display = "none";
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

    private async saveCurrentReadingPosition(): Promise<void> {
        if (this.annotator) {
            const resource = this.iframe.src;
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