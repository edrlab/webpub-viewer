import Navigator from "./Navigator";
import Cacher from "./Cacher";
import PaginatedBookView from "./PaginatedBookView";
import ScrollingBookView from "./ScrollingBookView";
import Annotator from "./Annotator";
import Manifest from "./Manifest";
import BookSettings from "./BookSettings";
import * as HTMLUtilities from "./HTMLUtilities";

const template = `
  <nav class="publication">
    <div class="controls">
      <ul class="links top" style="z-index: 2000;">
        <li><a rel="start" class="disabled">Start</a></li>
        <li><a rel="contents" class="disabled">Contents</a></li>
        <li>
          <a class="settings" role="button" aria-label="Settings Menu" aria-expanded="false">
              <svg viewBox="0 0 100 125" class="icon" role="img">
                <g transform="translate(0,-952.36218)" aria-label="settings" >
                  <title id="settings-icon">Settings</title>
                  <path d="m 42,960.36216 -1.9062,10.5 c -1.8532,0.58249 -3.6477,1.33411 -5.3438,2.21875 l -8.8125,-6.0625 -11.3125,11.3125 6.0938,8.78125 c -0.8885,1.70097 -1.6345,3.48465 -2.2188,5.34375 l -10.4999998,1.90625 0,16.00004 L 18.5,1012.2684 c 0.5858,1.8637 1.3586,3.639 2.25,5.3438 l -6.125,8.7812 11.3125,11.3126 8.7813,-6.0626 c 1.7035,0.8904 3.5129,1.6335 5.375,2.2188 l 1.9062,10.5 16,0 1.9062,-10.5 c 1.859,-0.5844 3.6428,-1.3303 5.3438,-2.2188 l 8.7812,6.0626 11.3126,-11.3126 -6.0938,-8.7812 c 0.8847,-1.6934 1.6353,-3.4624 2.2188,-5.3125 L 92,1010.3622 92,994.36216 81.4688,992.45591 c -0.5806,-1.84671 -1.307,-3.62167 -2.1876,-5.3125 l 6.0626,-8.8125 -11.3126,-11.3125 -8.7812,6.0625 c -1.701,-0.88839 -3.4847,-1.63437 -5.3438,-2.21875 l -1.9062,-10.5 -16,0 z m 8,23 c 10.4816,0 19,8.51835 19,19.00004 0,10.4815 -8.5184,19 -19,19 -10.4815,0 -19,-8.5185 -19,-19 0,-10.4817 8.5185,-19.00004 19,-19.00004 z m 0,2 c -9.4007,0 -17,7.5992 -17,17.00004 0,9.4006 7.5993,17 17,17 9.4007,0 17,-7.5994 17,-17 0,-9.40084 -7.5993,-17.00004 -17,-17.00004 z" stroke="none"/>
                </g>
              </svg>
            <span class="setting-text">Settings</span>
            </a>
        </li>
      </ul>
      <ul class="links bottom" style="z-index: 2000;">
        <li><a rel="prev" class="disabled">Previous Chapter</a></li>
        <li><a rel="next" class="disabled">Next Chapter</a></li>
      </ul>
      <div class="pagination-controls" style="-webkit-tap-highlight-color: transparent; display: none;">
        <div class="previous-page" style="position: fixed; top: 0; left: 0; width: 30%; height: 100%; z-index: 1000;"></div>
        <div class="links-toggle" style="position: fixed; top: 0; left: 30%; width: 40%; height: 100%; z-index: 1000;"></div>
        <div class="next-page" style="position: fixed; top: 0; left: 70%; width: 30%; height: 100%; z-index: 1000;"></div>
      </div>
    </div>
    <div class="contents-view controls-view" style="display: none; z-index: 3000;"></div>
    <div class="settings-view controls-view" style="display: none; z-index: 3000;"></div>
  </nav>
  <main style="overflow: hidden">
    <div class="loading" style="display:none;">Loading</div>
    <iframe style="border:0; overflow: hidden;"></iframe>
  </main>
`;

interface ReadingPosition {
    resource: string;
    position: number;
}

/** Class that shows webpub resources in an iframe, with navigation controls outside the iframe. */
export default class IFrameNavigator implements Navigator {
    private manifestUrl: URL;
    private cacher: Cacher;
    private paginator: PaginatedBookView | null;
    private scroller: ScrollingBookView | null;
    private annotator: Annotator | null;
    private settings: BookSettings;
    private iframe: HTMLIFrameElement;
    private nextChapterLink: HTMLAnchorElement;
    private previousChapterLink: HTMLAnchorElement;
    private startLink: HTMLAnchorElement;
    private contentsLink: HTMLAnchorElement;
    private settingsLink: HTMLAnchorElement;
    public navigation: Element;
    private links: HTMLUListElement;
    private linksBottom: HTMLUListElement;
    private tocView: HTMLDivElement;
    private settingsView: HTMLDivElement;
    private loadingMessage: HTMLDivElement;
    private paginationControls: HTMLDivElement;
    private linksToggle: Element;
    private previousPageLink: Element;
    private nextPageLink: Element;
    private newPosition: ReadingPosition | null;
    private isLoading: boolean;

    public static async create(element: HTMLElement, manifestUrl: URL, cacher: Cacher, settings: BookSettings, annotator: Annotator | null = null, paginator: PaginatedBookView | null = null, scroller: ScrollingBookView | null = null) {
        const navigator = new this(cacher, settings, annotator, paginator, scroller);
        await navigator.start(element, manifestUrl);
        return navigator;
    }

    protected constructor(cacher: Cacher, settings: BookSettings, annotator: Annotator | null = null, paginator: PaginatedBookView | null = null, scroller: ScrollingBookView | null = null) {
        this.cacher = cacher;
        this.paginator = paginator;
        this.scroller = scroller;
        this.annotator = annotator;
        this.settings = settings;
    }

    protected async start(element: HTMLElement, manifestUrl: URL): Promise<void> {
        element.innerHTML = template;
        this.manifestUrl = manifestUrl;
        try {
            this.iframe = HTMLUtilities.findRequiredElement(element, "iframe") as HTMLIFrameElement;
            this.nextChapterLink = HTMLUtilities.findRequiredElement(element, "a[rel=next]") as HTMLAnchorElement;
            this.previousChapterLink = HTMLUtilities.findRequiredElement(element, "a[rel=prev]") as HTMLAnchorElement;
            this.startLink = HTMLUtilities.findRequiredElement(element, "a[rel=start]") as HTMLAnchorElement;
            this.contentsLink = HTMLUtilities.findRequiredElement(element, "a[rel=contents]") as HTMLAnchorElement;
            this.settingsLink = HTMLUtilities.findRequiredElement(element, "a[class=settings]") as HTMLAnchorElement;
            this.navigation = HTMLUtilities.findRequiredElement(element, "div[class=controls]");
            this.links = HTMLUtilities.findRequiredElement(element, "ul[class='links top']") as HTMLUListElement;
            this.linksBottom = HTMLUtilities.findRequiredElement(element, "ul[class='links bottom']") as HTMLUListElement;
            this.tocView = HTMLUtilities.findRequiredElement(element, "div[class='contents-view controls-view']") as HTMLDivElement;
            this.settingsView = HTMLUtilities.findRequiredElement(element, "div[class='settings-view controls-view']") as HTMLDivElement;
            this.loadingMessage = HTMLUtilities.findRequiredElement(element, "div[class=loading]") as HTMLDivElement;
            this.paginationControls = HTMLUtilities.findRequiredElement(element, "div[class=pagination-controls]") as HTMLDivElement;
            this.linksToggle = HTMLUtilities.findRequiredElement(element, "div[class=links-toggle]");
            this.previousPageLink = HTMLUtilities.findRequiredElement(element, "div[class=previous-page]");
            this.nextPageLink = HTMLUtilities.findRequiredElement(element, "div[class=next-page]");
            this.newPosition = null;
            this.isLoading = true;
            this.setupEvents();

            if (this.paginator) {
                this.paginator.bookElement = this.iframe;
            }
            if (this.scroller) {
                this.scroller.bookElement = this.iframe;
            }
            this.settings.renderControls(this.settingsView);
            this.settings.onViewChange(this.updateBookView.bind(this));
            this.settings.onFontSizeChange(this.updateFontSize.bind(this));

            return await this.loadManifest();
        } catch (err) {
            // There's a mismatch between the template and the selectors above,
            // or we weren't able to insert the template in the element.
            return new Promise<void>((_, reject) => reject(err));
        }
    }

    private setupEvents(): void {
        this.iframe.addEventListener("load", this.handleIFrameLoad.bind(this));

        window.onresize = this.handleResize.bind(this);

        if (this.paginator) {
            this.linksToggle.addEventListener("click", this.handleToggleLinksClick.bind(this));

            this.previousPageLink.addEventListener("click", this.handlePreviousPageClick.bind(this));

            this.nextPageLink.addEventListener("click", this.handleNextPageClick.bind(this));
        }

        this.previousChapterLink.addEventListener("click", this.handlePreviousChapterClick.bind(this));

        this.nextChapterLink.addEventListener("click", this.handleNextChapterClick.bind(this));

        this.startLink.addEventListener("click", this.handleStartClick.bind(this));

        this.contentsLink.addEventListener("click", this.handleContentsClick.bind(this));

        this.settingsLink.addEventListener("click", this.handleSettingsClick.bind(this));
    }

    private updateBookView(): void {
        if (this.settings.getSelectedView() === this.paginator) {
            this.paginationControls.style.display = "block";
            document.body.onscroll = () => {};
            document.body.style.overflow = "hidden";
        } else if (this.settings.getSelectedView() === this.scroller) {
            this.paginationControls.style.display = "none";
            document.body.onscroll = this.saveCurrentReadingPosition.bind(this);
            document.body.style.overflow = "auto";
        }
    }

    private updateFontSize(): void {
        this.handleResize();
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
                    href = new URL(link.href, this.manifestUrl.href).href;
                }
                linkElement.href = href;
                linkElement.text = link.title || "";
                linkElement.addEventListener("click", (event: Event) => {
                    event.preventDefault();
                    this.navigate({
                        resource: linkElement.href,
                        position: 0
                    });
                });
                listItemElement.appendChild(linkElement);
                listElement.appendChild(listItemElement);
            }
            this.tocView.appendChild(listElement);
        }

        let startUrl: string | null = null;
        const startLink = manifest.getStartLink();
        if (startLink && startLink.href) {
            startUrl = new URL(startLink.href, this.manifestUrl.href).href;
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
        this.hideTOC();
        this.showLoadingMessageAfterDelay();

        let bookViewPosition = 0;
        if (this.newPosition) {
            bookViewPosition = this.newPosition.position;
        }
        this.updateBookView();
        this.updateFontSize();
        this.settings.getSelectedView().start(bookViewPosition);
        this.newPosition = null;

        const manifest = await this.cacher.getManifest(this.manifestUrl);
        let currentLocation = this.iframe.src;
        if (this.iframe.contentDocument && this.iframe.contentDocument.location && this.iframe.contentDocument.location.href) {
            currentLocation = this.iframe.contentDocument.location.href;
        }

        const previous = manifest.getPreviousSpineItem(currentLocation);
        if (previous && previous.href) {
            this.previousChapterLink.href = new URL(previous.href, this.manifestUrl.href).href;
            this.previousChapterLink.className = "";
        } else {
            this.previousChapterLink.removeAttribute("href");
            this.previousChapterLink.className = "disabled";
        }

        const next = manifest.getNextSpineItem(currentLocation);
        if (next && next.href) {
            this.nextChapterLink.href = new URL(next.href, this.manifestUrl.href).href;
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

    private toggleDisplay(element: HTMLDivElement | HTMLUListElement): void {
        const display: string | null = element.style.display;
        if (display === "none") {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    }

    private handleToggleLinksClick(event: MouseEvent): void {
        event.preventDefault();
        this.hideTOC();
        if (!this.checkForIFrameLink(event)) {
            this.toggleDisplay(this.links);
            this.toggleDisplay(this.linksBottom);
        }
    }

    private handlePreviousPageClick(event: MouseEvent): void {
        event.preventDefault();
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
        const selectedView = this.settings.getSelectedView();
        const oldPosition = selectedView.getCurrentPosition();

        const fontSize = this.settings.getSelectedFontSize();
        this.iframe.contentDocument.body.style.fontSize = fontSize;
        this.iframe.contentDocument.body.style.lineHeight = "1.5";

        const sideMargin = parseInt(fontSize.slice(0, -2)) * 2;
        if (this.paginator) {
            this.paginator.sideMargin = sideMargin;
        }
        if (this.scroller) {
            this.scroller.sideMargin = sideMargin;
        }
        const topMargin = this.navigation.clientHeight + 5;
        this.iframe.style.marginTop = topMargin + "px";

        selectedView.goToPosition(oldPosition);
    }

    private handlePreviousChapterClick(event: MouseEvent): void {
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
        this.hideSettings();
        this.toggleDisplay(this.tocView);
        event.preventDefault();
    }

    private hideTOC(): void {
        this.tocView.style.display = "none";
    }

    private setActiveTOCItem(resource: string): void {
       const allItems = Array.prototype.slice.call(this.tocView.querySelectorAll("li > a"));
       for (const item of allItems) {
           item.className = "";
       }
       const activeItem = this.tocView.querySelector('li > a[href="' + resource  + '"]');
       if (activeItem) {
           activeItem.className = "active";
       }
    }

    private handleSettingsClick(event: MouseEvent): void {
        this.hideTOC();
        this.toggleDisplay(this.settingsView);
        event.preventDefault();
    }

    private hideSettings(): void {
        this.settingsView.style.display = "none";
    }

    private navigate(readingPosition: ReadingPosition): void {
        this.showLoadingMessageAfterDelay();
        this.newPosition = readingPosition;
        this.iframe.src = readingPosition.resource;
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

    private async saveCurrentReadingPosition(): Promise<void> {
        if (this.annotator) {
            const resource = this.iframe.src;
            const position = this.settings.getSelectedView().getCurrentPosition();
            return this.annotator.saveLastReadingPosition({
                resource: resource,
                position: position
            });
        } else {
            return new Promise<void>(resolve => resolve());
        }
    }
}
