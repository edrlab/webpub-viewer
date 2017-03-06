import Navigator from "./Navigator";
import Store from "./Store";
import Cacher from "./Cacher";
import { CacheStatus } from "./Cacher";
import PaginatedBookView from "./PaginatedBookView";
import ScrollingBookView from "./ScrollingBookView";
import Annotator from "./Annotator";
import Manifest from "./Manifest";
import BookSettings from "./BookSettings";
import { OfflineStatus } from "./BookSettings";
import * as HTMLUtilities from "./HTMLUtilities";

const template = `
  <nav class="publication">
    <div class="controls">
      <ul class="links top" style="z-index: 2000;">
        <li>
          <a rel="start" class="disabled" role="button" aria-label="Book Home">
          <svg viewBox="0 0 100 125" class="icon" role="img" aria-lablledby="home-button">
            <title id="home-button">Home Button</title>
            <g transform="translate(0,-952.36218)">
              <path style="text-indent:0;text-transform:none;direction:ltr;block-progression:tb;baseline-shift:baseline;color:#000000;enable-background:accumulate;" d="M 48.18752,956.9572 8.1875204,986.95679 c -0.7389,0.5602 -1.1923,1.4789 -1.1875,2.4062 l 0,55.99921 c 2e-4,1.5708 1.4292,2.9998 2.9999996,3 l 27,0 c 1.5708,-2e-4 2.9998,-1.4292 3,-3 l 0,-34.9995 20,0 0,34.9995 c 2e-4,1.5708 1.4292,2.9998 3,3 l 26.999997,0 c 1.5708,-2e-4 2.9998,-1.4292 3,-3 l 0,-55.99921 c 0,-0.9273 -0.4486,-1.846 -1.1875,-2.4062 L 51.81252,956.9572 c -1.3099,-0.8318 -2.4519,-0.75401 -3.625,0 z m 1.8125,6.15616 36.999997,27.74963 0,51.49931 -20.999997,0 0,-34.9996 c -2e-4,-1.5707 -1.4292,-2.9998 -3,-2.9999 l -26,0 c -1.5708,10e-5 -2.9998,1.4292 -3,2.9999 l 0,34.9996 -21,0 0,-51.49931 z"/>
            </g>
          </svg>
            <span class="setting-text home">Start</span>
          </a>
        </li>
        <li>
          <a rel="contents" class="disabled" role="button" aria-label="Book Content" aria-haspopup="true" aria-expanded="false">
            <svg viewBox="0 0 24 24" class="icon" role="img" aria-label="contents">
              <title id="content-icon">Contents</title>
              <path d="M20.5,0h-17C2.673,0,2,0.673,2,1.5v16c0,0.065,0.013,0.13,0.039,0.191c0.025,0.06,0.061,0.113,0.105,0.158  c0.001,0.001,0.001,0.003,0.002,0.004l6,6c0.001,0.002,0.004,0.002,0.006,0.004c0.045,0.044,0.098,0.08,0.157,0.104  C8.37,23.987,8.435,24,8.5,24h12c0.827,0,1.5-0.673,1.5-1.5v-21C22,0.673,21.327,0,20.5,0z M8,22.293L3.707,18H7.5  C7.776,18,8,18.224,8,18.5V22.293z M21,22.5c0,0.276-0.224,0.5-0.5,0.5H9v-4.5C9,17.673,8.327,17,7.5,17H3V1.5  C3,1.224,3.224,1,3.5,1h17C20.776,1,21,1.224,21,1.5V22.5z"></path>
              <path d="M17,5H7C6.724,5,6.5,4.776,6.5,4.5S6.724,4,7,4h10c0.276,0,0.5,0.224,0.5,0.5S17.276,5,17,5z"></path>
              <path d="M17,8H7C6.724,8,6.5,7.776,6.5,7.5S6.724,7,7,7h10c0.276,0,0.5,0.224,0.5,0.5S17.276,8,17,8z"></path>
              <path d="M12,11H7c-0.276,0-0.5-0.224-0.5-0.5S6.724,10,7,10h5c0.276,0,0.5,0.224,0.5,0.5S12.276,11,12,11z"></path>
            </svg>
            <span class="setting-text contents">Contents</span>
          </a>
        </li>
        <li>
          <a class="settings" role="button" aria-label="Settings Menu" aria-expanded="false" aria-haspopup="true">
            <svg class="icon" viewBox="0 0 86 86" aria-label="settings" role="img">
              <title id="settings-icon">setting-icon</title>
              <path d="M51.86,86H34.19L32.24,75.31a34,34,0,0,1-4.42-1.82l-9,6.2L6.35,67.19l6.26-9a33.46,33.46,0,0,1-1.85-4.39L0,51.88V34.21l10.73-1.95a33.87,33.87,0,0,1,1.82-4.39l-6.23-9L18.84,6.4l9,6.2a34,34,0,0,1,4.39-1.82L34.19,0H51.86l1.95,10.73A33.84,33.84,0,0,1,58.2,12.6l9-6.2L79.66,18.89l-6.2,9a33.74,33.74,0,0,1,1.79,4.36L86,34.2V51.87l-10.76,2a33.89,33.89,0,0,1-1.82,4.36l6.23,9L67.17,79.68l-9-6.2a33.7,33.7,0,0,1-4.39,1.82Zm-16-2H50.19l1.87-10.27.58-.18a31.81,31.81,0,0,0,5.18-2.15l.53-.28,8.59,5.93L77.07,67l-6-8.59.28-.54a31.8,31.8,0,0,0,2.15-5.15l.18-.57L84,50.21V35.88L73.72,34l-.18-.58a31.84,31.84,0,0,0-2.12-5.15l-.28-.53,5.93-8.62L66.94,9l-8.59,5.93-.54-.28a31.85,31.85,0,0,0-5.18-2.15l-.58-.18L50.19,2H35.86L34,12.31l-.58.18a32,32,0,0,0-5.18,2.15l-.53.28L19.08,9,8.95,19.13l6,8.59-.28.54a31.87,31.87,0,0,0-2.15,5.18L12.3,34,2,35.88V50.21L12.3,52.07l.18.58a31.49,31.49,0,0,0,2.18,5.18l.28.54L8.95,67,19.08,77.09l8.59-5.93.53.28a32,32,0,0,0,5.21,2.15l.58.18Z" transform="translate(-0.02 -0.04)"/>
              <path d="M43,63A20,20,0,1,1,63,43,20,20,0,0,1,43,63Zm0-38A18,18,0,1,0,61,43,18,18,0,0,0,43,25Z" transform="translate(-0.02 -0.04)"/>
            </svg>
            <span class="setting-text settings">Settings</span>
            </a>
        </li>
      </ul>
      <ul class="links bottom" style="z-index: 2000;">
        <li>
          <a rel="prev" class="disabled">
          <svg viewBox="0 0 13.5 22.7" class="icon" role="img" aria-label="previous">
            <title>wedge.left.icon.svg</title>
            <polygon points="11.3,22.7 0,11.3 11.3,0 13.5,2.1 4.2,11.3 13.5,20.6 "/>
          </svg>
          <span class="chapter-control">Previous Chapter</span>
          </a>
        </li>
        <li aria-label="chapters">Chapters</li>
        <li>
          <a rel="next" class="disabled">
            <span class="chapter-control">Next Chapter</span>
            <svg viewBox="0 0 13.5 22.7" class="icon" role="img" aria-label="next">
              <title>wedge.right.icon.svg</title>
              <polygon points="2.1,0 13.5,11.3 2.1,22.7 0,20.6 9.2,11.3 0,2.1 "/>
            </svg>
          </a>
        </li>
      </ul>
      <div class="pagination-controls" style="-webkit-tap-highlight-color: transparent; display: none;">
        <div class="previous-page" style="position: fixed; top: 0; left: 0; width: 30%; height: 100%; z-index: 1000;"></div>
        <div class="links-toggle" style="position: fixed; top: 0; left: 30%; width: 40%; height: 100%; z-index: 1000;"></div>
        <div class="next-page" style="position: fixed; top: 0; left: 70%; width: 30%; height: 100%; z-index: 1000;"></div>
      </div>
    </div>
    <!-- /controls -->
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
    private store: Store;
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

    public static async create(element: HTMLElement, manifestUrl: URL, store: Store, cacher: Cacher, settings: BookSettings, annotator: Annotator | null = null, paginator: PaginatedBookView | null = null, scroller: ScrollingBookView | null = null) {
        const navigator = new this(store, cacher, settings, annotator, paginator, scroller);
        await navigator.start(element, manifestUrl);
        return navigator;
    }

    protected constructor(store: Store, cacher: Cacher, settings: BookSettings, annotator: Annotator | null = null, paginator: PaginatedBookView | null = null, scroller: ScrollingBookView | null = null) {
        this.store = store;
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
            this.settings.onOfflineEnabled(this.enableOffline.bind(this));
            this.cacher.onStatusUpdate(this.updateOfflineCacheStatus.bind(this));
            if (this.settings.getOfflineStatus() === OfflineStatus.Enabled) {
                this.enableOffline();
            }

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

    private enableOffline(): void {
        this.cacher.enable();
    }

    private updateOfflineCacheStatus(status: CacheStatus): void {
        const statusElement = this.settings.getOfflineStatusElement();

        let statusMessage = "";
        if (status === CacheStatus.Uncached) {
            statusMessage = "Not available offline";
        } else if (status === CacheStatus.UpdateAvailable) {
            statusMessage = "A new version is available. Refresh to update.";
        } else if (status === CacheStatus.CheckingForUpdate) {
            statusMessage = "Checking for update.";
        } else if (status === CacheStatus.Downloading) {
            statusMessage = "Downloading for offline use";
        } else if (status === CacheStatus.Downloaded) {
            statusMessage = "Downloaded for offline use";
        } else if (status === CacheStatus.Error) {
            statusMessage = "Error downloading for offline use";
        }

        statusElement.innerHTML = statusMessage;
    }

    private async loadManifest(): Promise<void> {
        const manifest: Manifest = await Manifest.getManifest(this.manifestUrl, this.store);

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

        const manifest = await Manifest.getManifest(this.manifestUrl, this.store);
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

        if (this.settings.getOfflineStatus() === OfflineStatus.NoSelection) {
            setTimeout(this.settings.askUserToEnableOfflineUse.bind(this.settings), 0);
        }

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
