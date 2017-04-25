import Navigator from "./Navigator";
import Store from "./Store";
import Cacher from "./Cacher";
import { CacheStatus } from "./Cacher";
import PaginatedBookView from "./PaginatedBookView";
import ScrollingBookView from "./ScrollingBookView";
import Annotator from "./Annotator";
import Manifest from "./Manifest";
import { Link } from "./Manifest";
import BookSettings from "./BookSettings";
import { OfflineStatus } from "./BookSettings";
import EventHandler from "./EventHandler";
import * as HTMLUtilities from "./HTMLUtilities";

const upLinkTemplate = (href: string, label: string) => `
  <a rel="up" href='${href}' aria-label="${label}">
    <svg width="16" height="25" viewBox="0 0 16 25" aria-labelledby="back-to-book" preserveAspectRatio="xMidYMid" role="img" class="icon">
      <title id="up-label">${label}</title>
      <polygon points="16 1.741 13.9 0 0 12.5 13.9 25 16 23.258 4.036 12.499 16 1.741" />
    </svg>
    <span class="setting-text up">${label}</span>
  </a>
`;

const template = `
  <nav class="publication">
    <div class="controls">
      <ul class="links top active" style="z-index: 2000;">
        <li>
          <button class="contents disabled" aria-labelledby="contents" aria-haspopup="true" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 275 180" aria-labelledby="table-of-contents" preserveAspectRatio="xMidYMid" role="img" class="icon">
            <title id="table-of-contents">table of contents</title>
              <rect x="66" y="152" width="209" height="28"/>
              <rect x="66" y="76" width="209" height="28"/>
              <rect x="66" width="209" height="28"/>
              <rect width="33" height="28"/>
              <rect y="76" width="33" height="28"/>
              <rect y="152" width="33" height="28"/>
            </svg>
            <span class="setting-text contents">Contents</span>
          </button>
        </li>
        <li>
          <button class="settings" aria-labelledby="settings-menu" aria-expanded="false" aria-haspopup="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 186.47158 186.4716" aria-labelledby="settings" preserveAspectRatio="xMidYMid" role="img" class="icon">
              <title id="settings">Settings</title>
              <path d="M183.29465,117.36676l3.17693-24.131-23.52051-9.17834-4.75089-17.73081,15.78033-19.70844L159.1637,27.30789,136.04194,37.44974,120.145,28.2714,117.36676,3.17693,93.2358,0,84.05746,23.52051,66.32665,28.2714,46.61759,12.49107,27.30789,27.30789,37.44974,50.42966l-9.17834,15.897L3.17693,69.10484,0,93.2358l23.52051,9.17834L28.2714,120.145,12.49107,139.854l14.81682,19.3097,23.12177-10.14185,15.897,9.17834,2.77819,25.09447,24.131,3.17693,9.17834-23.52051L120.145,158.2002l19.70844,15.78033,19.31031-14.81682-10.14185-23.12177,9.17834-15.897ZM93.2358,129.84856A36.61276,36.61276,0,1,1,129.84856,93.2358,36.61267,36.61267,0,0,1,93.2358,129.84856Z"/>
              </svg>
            <span class="setting-text settings">Settings</span>
          </button>
        </li>
      </ul>
      <ul class="links bottom active" style="z-index: 2000;">
        <li>
          <a rel="prev" class="disabled" role="button" aria-labelledby="left-arrow-icon">
          <svg class="icon" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 13.43359 24.06299">
            <title id="left-arrow-icon">Previous Chapter</title>
              <polygon points="11.995 24.063 0 12.019 12.02 0 13.434 1.414 2.825 12.022 13.413 22.651 11.995 24.063"/>
            </svg>
          <span class="chapter-control">Previous Chapter</span>
          </a>
        </li>
        <li aria-label="chapters">Chapters</li>
        <li>
          <a rel="next" class="disabled" role="button" aria-labelledby="right-arrow-icon">
            <span class="chapter-control">Next Chapter</span>
            <svg class="icon" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 13.43359 24.06299">
            <title id="right-arrow-icon">Next Chapter</title>
              <polygon points="1.438 0 13.434 12.044 1.414 24.063 0 22.649 10.608 12.041 0.021 1.412 1.438 0"/>
            </svg>
          </a>
        </li>
      </ul>
    </div>
    <!-- /controls -->
    <div class="contents-view controls-view inactive" style="display: none; z-index: 3000;"></div>
    <div class="settings-view controls-view inactive" style="display: none; z-index: 3000;"></div>
  </nav>
  <main style="overflow: hidden">
    <div class="loading" style="display:none;">Loading</div>
    <div class="info top">
      <span class="book-title"></span>
    </div>
    <iframe style="border:0; overflow: hidden;"></iframe>
    <div class="info bottom">
      <span class="chapter-position"></span>
      <span class="chapter-title"></span>
    </div>
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
    private eventHandler: EventHandler;
    private upUrl: URL | null;
    private upLabel: string | null;
    private iframe: HTMLIFrameElement;
    private nextChapterLink: HTMLAnchorElement;
    private previousChapterLink: HTMLAnchorElement;
    private contentsControl: HTMLButtonElement;
    private settingsControl: HTMLButtonElement;
    public navigation: Element;
    private links: HTMLUListElement;
    private linksBottom: HTMLUListElement;
    private tocView: HTMLDivElement;
    private settingsView: HTMLDivElement;
    private loadingMessage: HTMLDivElement;
    private infoTop: HTMLDivElement;
    private infoBottom: HTMLDivElement;
    private bookTitle: HTMLSpanElement;
    private chapterTitle: HTMLSpanElement;
    private chapterPosition: HTMLSpanElement;
    private newPosition: ReadingPosition | null;
    private newElementId: string | null;
    private isLoading: boolean;
    private firstLoad: boolean;

    public static async create(
        element: HTMLElement,
        manifestUrl: URL,
        store: Store,
        cacher: Cacher,
        settings: BookSettings,
        annotator: Annotator | null = null,
        paginator: PaginatedBookView | null = null,
        scroller: ScrollingBookView | null = null,
        eventHandler: EventHandler | null = null,
        upUrl: URL | null = null,
        upLabel: string | null = "Back"
        ) {

        const navigator = new this(
            store, cacher, settings, annotator,
            paginator, scroller, eventHandler,
            upUrl, upLabel
        );

        await navigator.start(element, manifestUrl);
        return navigator;
    }

    protected constructor(
        store: Store,
        cacher: Cacher,
        settings: BookSettings,
        annotator: Annotator | null = null,
        paginator: PaginatedBookView | null = null,
        scroller: ScrollingBookView | null = null,
        eventHandler: EventHandler | null = null,
        upUrl: URL | null = null,
        upLabel: string | null = null
        ) {

        this.store = store;
        this.cacher = cacher;
        this.paginator = paginator;
        this.scroller = scroller;
        this.annotator = annotator;
        this.settings = settings;
        this.eventHandler = eventHandler || new EventHandler();
        this.upUrl = upUrl;
        this.upLabel = upLabel;
    }

    protected async start(element: HTMLElement, manifestUrl: URL): Promise<void> {
        element.innerHTML = template;
        this.manifestUrl = manifestUrl;
        try {
            this.iframe = HTMLUtilities.findRequiredElement(element, "iframe") as HTMLIFrameElement;
            this.nextChapterLink = HTMLUtilities.findRequiredElement(element, "a[rel=next]") as HTMLAnchorElement;
            this.previousChapterLink = HTMLUtilities.findRequiredElement(element, "a[rel=prev]") as HTMLAnchorElement;
            this.contentsControl = HTMLUtilities.findRequiredElement(element, "button.contents") as HTMLButtonElement;
            this.settingsControl = HTMLUtilities.findRequiredElement(element, "button.settings") as HTMLButtonElement;
            this.navigation = HTMLUtilities.findRequiredElement(element, "div[class=controls]");
            this.links = HTMLUtilities.findRequiredElement(element, "ul.links.top") as HTMLUListElement;
            this.linksBottom = HTMLUtilities.findRequiredElement(element, "ul.links.bottom") as HTMLUListElement;
            this.tocView = HTMLUtilities.findRequiredElement(element, ".contents-view") as HTMLDivElement;
            this.settingsView = HTMLUtilities.findRequiredElement(element, ".settings-view") as HTMLDivElement;
            this.loadingMessage = HTMLUtilities.findRequiredElement(element, "div[class=loading]") as HTMLDivElement;
            this.infoTop = HTMLUtilities.findRequiredElement(element, "div[class='info top']") as HTMLDivElement;
            this.infoBottom = HTMLUtilities.findRequiredElement(element, "div[class='info bottom']") as HTMLDivElement;
            this.bookTitle = HTMLUtilities.findRequiredElement(this.infoTop, "span[class=book-title]") as HTMLSpanElement;
            this.chapterTitle = HTMLUtilities.findRequiredElement(this.infoBottom, "span[class=chapter-title]") as HTMLSpanElement;
            this.chapterPosition = HTMLUtilities.findRequiredElement(this.infoBottom, "span[class=chapter-position]") as HTMLSpanElement;
            this.newPosition = null;
            this.newElementId = null;
            this.isLoading = true;
            this.firstLoad = false;
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

        this.previousChapterLink.addEventListener("click", this.handlePreviousChapterClick.bind(this));

        this.nextChapterLink.addEventListener("click", this.handleNextChapterClick.bind(this));

        this.contentsControl.addEventListener("click", this.handleContentsClick.bind(this));

        this.settingsControl.addEventListener("click", this.handleSettingsClick.bind(this));

        this.settingsView.addEventListener("click", this.hideSettings.bind(this));
    }

    private updateBookView(): void {
        const doNothing = () => {};
        if (this.settings.getSelectedView() === this.paginator) {
            document.body.onscroll = () => {};
            this.chapterTitle.style.display = "inline";
            this.chapterPosition.style.display = "inline";
            if (this.eventHandler) {
                this.eventHandler.onBackwardSwipe = this.handlePreviousPageClick.bind(this);
                this.eventHandler.onForwardSwipe = this.handleNextPageClick.bind(this);
                this.eventHandler.onLeftTap = this.handlePreviousPageClick.bind(this);
                this.eventHandler.onMiddleTap = this.handleToggleLinksClick.bind(this);
                this.eventHandler.onRightTap = this.handleNextPageClick.bind(this);
                this.eventHandler.onLeftHover = this.handleLeftHover.bind(this);
                this.eventHandler.onRightHover = this.handleRightHover.bind(this);
                this.eventHandler.onRemoveHover = this.handleRemoveHover.bind(this);
            }
            if (this.linksBottom.style.display !== "none") {
                this.toggleDisplay(this.linksBottom);
            }
        } else if (this.settings.getSelectedView() === this.scroller) {
            document.body.onscroll = this.saveCurrentReadingPosition.bind(this);
            this.chapterTitle.style.display = "none";
            this.chapterPosition.style.display = "none";
            if (this.eventHandler) {
                this.eventHandler.onBackwardSwipe = doNothing;
                this.eventHandler.onForwardSwipe = doNothing;
                this.eventHandler.onLeftTap = this.handleToggleLinksClick.bind(this);
                this.eventHandler.onMiddleTap = this.handleToggleLinksClick.bind(this);
                this.eventHandler.onRightTap = this.handleToggleLinksClick.bind(this);
                this.eventHandler.onLeftHover = doNothing;
                this.eventHandler.onRightHover = doNothing;
                this.eventHandler.onRemoveHover = doNothing;
                this.handleRemoveHover();
            }
            if (this.links.style.display !== "none" && this.linksBottom.style.display === "none") {
                this.toggleDisplay(this.linksBottom);
            }
        }
        this.updatePositionInfo();
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
            statusMessage = "";
        } else if (status === CacheStatus.UpdateAvailable) {
            statusMessage = "A new version is available. Refresh to update.";
        } else if (status === CacheStatus.CheckingForUpdate) {
            statusMessage = "Checking for update.";
        } else if (status === CacheStatus.Downloading) {
            statusMessage = "Downloading...";
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
            this.contentsControl.className = "contents";

            const createTOC = (parentElement: Element, links: Array<Link>) => {
                const listElement: HTMLUListElement = document.createElement("ul");
                for (const link of links) {
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
                        event.stopPropagation();
                        this.navigate({
                            resource: linkElement.href,
                            position: 0
                        });
                    });
                    listItemElement.appendChild(linkElement);

                    if (link.children && link.children.length > 0) {
                        createTOC(listItemElement, link.children);
                    }

                    listElement.appendChild(listItemElement);
                }
                parentElement.appendChild(listElement);
            }
            createTOC(this.tocView, toc);
        }

        if (this.upUrl) {
            const upHTML = upLinkTemplate(this.upUrl.href, this.upLabel || "");
            const upParent : HTMLLIElement = document.createElement("li");
            upParent.innerHTML = upHTML;
            this.links.insertBefore(upParent, this.links.firstChild);
        }

        let lastReadingPosition: ReadingPosition | null = null;
        if (this.annotator) {
            lastReadingPosition = await this.annotator.getLastReadingPosition() as ReadingPosition | null;
        }

        const startLink = manifest.getStartLink();
        let startUrl: string | null = null;
        if (startLink && startLink.href) {
            startUrl = new URL(startLink.href, this.manifestUrl.href).href;
        }

        if (lastReadingPosition) {
            this.navigate(lastReadingPosition);
        } else if (startUrl) {
            const position = {
                resource: startUrl,
                position: 0
            };
            this.navigate(position);
            // Show TOC when book is first opened.
            this.firstLoad = true;
            this.toggleDisplay(this.tocView, this.contentsControl);
        }

        return new Promise<void>(resolve => resolve());
    }

    private async handleIFrameLoad(): Promise<void> {
        this.showLoadingMessageAfterDelay();
        if (!this.firstLoad) {
            this.hideTOC();
        }
        this.firstLoad = false;

        let bookViewPosition = 0;
        if (this.newPosition) {
            bookViewPosition = this.newPosition.position;
            this.newPosition = null;
        }
        this.updateBookView();
        this.updateFontSize();
        this.settings.getSelectedView().start(bookViewPosition);

        if (this.newElementId) {
            this.settings.getSelectedView().goToElement(this.newElementId);
            this.newElementId = null;
        }

        let currentLocation = this.iframe.src;
        if (this.iframe.contentDocument && this.iframe.contentDocument.location && this.iframe.contentDocument.location.href) {
            currentLocation = this.iframe.contentDocument.location.href;
        }

        if (currentLocation.indexOf("#") !== -1) {
            // Letting the iframe load the anchor itself doesn't always work.
            // For example, with CSS column-based pagination, you can end up
            // between two columns, and we can't reset the position in some
            // browsers. Instead, we grab the element id and reload the iframe
            // without it, then let the view figure out how to go to that element
            // on the next load event.

            const elementId = currentLocation.slice(currentLocation.indexOf("#") + 1);
            // Set the element to go to the next time the iframe loads.
            this.newElementId = elementId;
            // Reload the iframe without the anchor.
            this.iframe.src = currentLocation.slice(0, currentLocation.indexOf("#"));
            return new Promise<void>(resolve => resolve());
        }

        this.updatePositionInfo();

        const manifest = await Manifest.getManifest(this.manifestUrl, this.store);
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

        if (manifest.metadata.title) {
            this.bookTitle.innerHTML = manifest.metadata.title;
        }

        const spineItem = manifest.getSpineItem(currentLocation);
        if (spineItem !== null) {
            if (spineItem.title) {
                this.chapterTitle.innerHTML = "(" + spineItem.title + ")";
            } else {
                this.chapterTitle.innerHTML = "(Chapter)";
            }
        }

        if (this.eventHandler) {
            this.eventHandler.setupEvents(this.iframe.contentDocument);
        }

        if (this.annotator) {
            await this.saveCurrentReadingPosition();
        }
        this.hideLoadingMessage();

        if (this.settings.getOfflineStatus() === OfflineStatus.NoSelection) {
            setTimeout(this.settings.askUserToEnableOfflineUse.bind(this.settings), 0);
        }

        return new Promise<void>(resolve => resolve());
    }

    private toggleDisplay(element: HTMLDivElement | HTMLUListElement, control?: HTMLAnchorElement | HTMLButtonElement): void {
        const display: string | null = element.style.display;
        if (display === "none") {
            element.style.display = "block";
            element.className = element.className.replace(" inactive", "");
            element.className += " active";
            if (control) {
                control.setAttribute("aria-expanded", "true");
            }
        } else {
            element.style.display = "none";
            element.className = element.className.replace(" active", "");
            element.className += " inactive";
            if (control) {
                control.setAttribute("aria-expanded", "false");
            }
        }
    }

    private handleToggleLinksClick(event: MouseEvent | TouchEvent): void {
        this.hideTOC();
        this.toggleDisplay(this.links);
        if (this.settings.getSelectedView() !== this.paginator) {
            this.toggleDisplay(this.linksBottom);
        }
        event.preventDefault();
        event.stopPropagation();
    }

    private handlePreviousPageClick(event: MouseEvent | TouchEvent): void {
        if (this.paginator) {
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
                this.updatePositionInfo();
                this.saveCurrentReadingPosition();
            }
            event.preventDefault();
            event.stopPropagation();
        }
    }

    private handleNextPageClick(event: MouseEvent | TouchEvent) {
        if (this.paginator) {
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
                this.updatePositionInfo();
                this.saveCurrentReadingPosition();
            }
            event.preventDefault();
            event.stopPropagation();
        }
    }

    private handleLeftHover(): void {
        this.iframe.className = "left-hover";
    }

    private handleRightHover(): void {
        this.iframe.className = "right-hover";
    }

    private handleRemoveHover(): void {
        this.iframe.className = "";
    }

    private handleResize(): void {
        const selectedView = this.settings.getSelectedView();
        const oldPosition = selectedView.getCurrentPosition();

        const fontSize = this.settings.getSelectedFontSize();
        this.iframe.contentDocument.body.style.fontSize = fontSize;
        this.iframe.contentDocument.body.style.lineHeight = "1.5";

        const fontSizeNumber = parseInt(fontSize.slice(0, -2));
        let sideMargin = fontSizeNumber * 2;

        if (window.innerWidth > fontSizeNumber * 45) {
            const extraMargin = Math.floor((window.innerWidth - fontSizeNumber * 40) / 2);
            sideMargin = sideMargin + extraMargin;
        }
        if (this.paginator) {
            this.paginator.sideMargin = sideMargin;
        }
        if (this.scroller) {
            this.scroller.sideMargin = sideMargin;
        }

        // If the links are hidden, show them temporarily
        // to determine the top and bottom heights.

        const linksHidden = (this.links.style.display === "none");
        if (linksHidden) {
            this.toggleDisplay(this.links);
        }

        const topHeight = this.links.clientHeight;
        this.infoTop.style.height = topHeight + "px";

        if (linksHidden) {
            this.toggleDisplay(this.links);
        }

        const linksBottomHidden = (this.linksBottom.style.display === "none");
        if (linksBottomHidden) {
            this.toggleDisplay(this.linksBottom);
        }

        const bottomHeight = this.linksBottom.clientHeight;
        this.infoBottom.style.height = bottomHeight + "px";

        if (linksBottomHidden) {
            this.toggleDisplay(this.linksBottom);
        }

        if (this.paginator) {
            this.paginator.height = (window.innerHeight - topHeight - bottomHeight - 10);
        }
        if (this.scroller) {
            this.scroller.height = (window.innerHeight - topHeight - bottomHeight - 10);
        }

        selectedView.goToPosition(oldPosition);
        this.updatePositionInfo();
    }

    private updatePositionInfo() {
        if (this.settings.getSelectedView() === this.paginator) {
            const currentPage = Math.round(this.paginator.getCurrentPage());
            const pageCount = Math.round(this.paginator.getPageCount());
            this.chapterPosition.innerHTML = "Page " + currentPage + " of " + pageCount;
        } else {
            this.chapterPosition.innerHTML = "";
        }
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
        event.stopPropagation();
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
        event.stopPropagation();
    }

    private handleContentsClick(event: MouseEvent): void {
        this.hideSettings();
        this.toggleDisplay(this.tocView, this.contentsControl);
        event.preventDefault();
        event.stopPropagation();
    }

    private hideTOC(): void {
        this.tocView.style.display = "none";
        this.contentsControl.setAttribute("aria-expanded", "false");
        this.tocView.className = this.tocView.className.replace(" active", "");
        if (this.tocView.className.indexOf(" inactive") === -1) {
            this.tocView.className += " inactive";
        }
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
        this.toggleDisplay(this.settingsView, this.settingsControl);
        event.preventDefault();
        event.stopPropagation();
    }

    private hideSettings(): void {
        this.settingsView.style.display = "none";
        this.settingsControl.setAttribute("aria-expanded", "false");
        this.settingsView.className = this.settingsView.className.replace(" active", "");
        if (this.settingsView.className.indexOf(" inactive") === -1) {
            this.settingsView.className += " inactive";
        }
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
