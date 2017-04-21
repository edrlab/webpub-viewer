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
import EventHandler from "./EventHandler";
import * as HTMLUtilities from "./HTMLUtilities";

const template = `
  <nav class="publication">
    <div class="controls">
      <ul class="links top" style="z-index: 2000;">
        <li>
          <a rel="start" class="disabled" role="button" aria-label="Book Home">
            <svg viewBox="0 0 100 125" class="icon" role="img" preserveAspectRatio="xMidYMid meet">
              <title id="home-button">Home Button</title>
              <g transform="translate(0,-952.36218)">
                <path style="text-indent:0;text-transform:none;direction:ltr;block-progression:tb;baseline-shift:baseline;color:#000000;enable-background:accumulate;" d="M 48.18752,956.9572 8.1875204,986.95679 c -0.7389,0.5602 -1.1923,1.4789 -1.1875,2.4062 l 0,55.99921 c 2e-4,1.5708 1.4292,2.9998 2.9999996,3 l 27,0 c 1.5708,-2e-4 2.9998,-1.4292 3,-3 l 0,-34.9995 20,0 0,34.9995 c 2e-4,1.5708 1.4292,2.9998 3,3 l 26.999997,0 c 1.5708,-2e-4 2.9998,-1.4292 3,-3 l 0,-55.99921 c 0,-0.9273 -0.4486,-1.846 -1.1875,-2.4062 L 51.81252,956.9572 c -1.3099,-0.8318 -2.4519,-0.75401 -3.625,0 z m 1.8125,6.15616 36.999997,27.74963 0,51.49931 -20.999997,0 0,-34.9996 c -2e-4,-1.5707 -1.4292,-2.9998 -3,-2.9999 l -26,0 c -1.5708,10e-5 -2.9998,1.4292 -3,2.9999 l 0,34.9996 -21,0 0,-51.49931 z"/>
              </g>
            </svg>
            <span class="setting-text home">Start</span>
          </a>
        </li>
        <li>
          <button class="contents disabled" aria-labelledby="contents" aria-haspopup="true" aria-expanded="false">
            <svg class="icon" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 27">
              <title id="contents">Table of Contents</title>
              <path d="M17,27H3a3.00328,3.00328,0,0,1-3-3V3A3.00328,3.00328,0,0,1,3,0H15.48047L20,5.64941V24A3.00328,3.00328,0,0,1,17,27ZM3,2A1.0013,1.0013,0,0,0,2,3V24a1.001,1.001,0,0,0,1,1H17a1.00068,1.00068,0,0,0,1-1V6.35059L14.51953,2Z"/>
              <rect x="4" y="8" width="12" height="2"/>
              <rect x="4" y="12" width="12" height="2"/>
              <rect x="4" y="16" width="12" height="2"/>
              <rect x="4" y="20" width="6" height="2"/>
            </svg>
            <span class="setting-text contents">Contents</span>
          </button>
        </li>
        <li>
          <button class="settings" aria-labelledby="settings-menu" aria-expanded="false" aria-haspopup="true">
            <svg class="icon" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 29.515 29.51584">
              <title id="settings-menu">Settings Menu</title>
              <path d="M14.75238,21.19041a6.4375,6.4375,0,1,1,6.4375-6.4375A6.44459,6.44459,0,0,1,14.75238,21.19041Zm0-10.875a4.4375,4.4375,0,1,0,4.4375,4.4375A4.44261,4.44261,0,0,0,14.75238,10.31541Z"/>
              <path d="M15.72966,2.00105l1.43724,4.0416,2.035.84489,3.8748-1.84187,1.38294,1.38274-1.84192,3.8749.84381,2.0347,4.0483,1.43963L27.5028,15.7307l-4.04148,1.43721-.843,2.03574,1.84015,3.87117-1.38573,1.38342L19.303,22.66631l-2.13549.79519-1.43718,4.0414-1.95321.00751-1.43963-4.0483-2.03467-.84382L6.428,24.46016,5.04507,23.07742,6.887,19.20251l-.84381-2.03469L2.00467,15.73166,2.002,13.77512l4.04241-1.43753.84208-2.03542L5.04408,6.42631,6.42649,5.04495,10.30062,6.8865l2.03643-.8416,1.43754-4.0424,1.95507-.00145M17.14076,0,15.72818.001,13.77311.0025l-1.41036.001L11.8902,1.33238l-1.1394,3.204-.39348.16261L7.28511,3.23864,6.01085,2.63292l-.998.99728L3.6304,5.01156l-.99884.99808.60621,1.27529,1.461,3.07353-.16248.39273L1.33185,11.89072,0,12.36434l.002,1.41355.00271,1.95654.002,1.40939,1.32793.47223,3.20151,1.13851.16281.39257L3.23876,22.2188l-.606,1.27487.99821.99807L5.0139,25.87448l.99805.99791,1.27468-.60592,3.07154-1.46.39257.16281,1.142,3.2113.47485,1.33531,1.41723-.00544,1.95321-.00751,1.40571-.00541.471-1.32446,1.1247-3.1627.46886-.17459,3.00584,1.42881,1.27365.60543.998-.99635,1.38573-1.38342.99978-.99811-.6065-1.27591-1.45859-3.06848.16286-.39327,3.20389-1.13935,1.32477-.4711.0051-1.406.00708-1.95306L29.515,12.368l-1.335-.47474-3.2113-1.142-.16281-.39258L26.266,7.287l.606-1.27487-.99821-.99807L24.49086,3.63135l-.998-.99791-1.27468.60592L19.147,4.69921,18.75381,4.536l-1.13975-3.205L17.14076,0Z"/>
            </svg>
            <span class="setting-text settings">Settings</span>
          </button>
        </li>
      </ul>
      <ul class="links bottom" style="z-index: 2000;">
        <li>
          <a rel="prev" class="disabled" role="button" aria-labelleby="left-arrow-icon">
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
    <div class="contents-view controls-view" style="display: none; z-index: 3000;"></div>
    <div class="settings-view controls-view" style="display: none; z-index: 3000;"></div>
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
    private iframe: HTMLIFrameElement;
    private nextChapterLink: HTMLAnchorElement;
    private previousChapterLink: HTMLAnchorElement;
    private startLink: HTMLAnchorElement;
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
    public static async create(element: HTMLElement, manifestUrl: URL, store: Store, cacher: Cacher, settings: BookSettings, annotator: Annotator | null = null, paginator: PaginatedBookView | null = null, scroller: ScrollingBookView | null = null, eventHandler: EventHandler | null = null) {
        const navigator = new this(store, cacher, settings, annotator, paginator, scroller, eventHandler);
        await navigator.start(element, manifestUrl);
        return navigator;
    }

    protected constructor(store: Store, cacher: Cacher, settings: BookSettings, annotator: Annotator | null = null, paginator: PaginatedBookView | null = null, scroller: ScrollingBookView | null = null, eventHandler: EventHandler | null) {
        this.store = store;
        this.cacher = cacher;
        this.paginator = paginator;
        this.scroller = scroller;
        this.annotator = annotator;
        this.settings = settings;
        this.eventHandler = eventHandler || new EventHandler();
    }

    protected async start(element: HTMLElement, manifestUrl: URL): Promise<void> {
        element.innerHTML = template;
        this.manifestUrl = manifestUrl;
        try {
            this.iframe = HTMLUtilities.findRequiredElement(element, "iframe") as HTMLIFrameElement;
            this.nextChapterLink = HTMLUtilities.findRequiredElement(element, "a[rel=next]") as HTMLAnchorElement;
            this.previousChapterLink = HTMLUtilities.findRequiredElement(element, "a[rel=prev]") as HTMLAnchorElement;
            this.startLink = HTMLUtilities.findRequiredElement(element, "a[rel=start]") as HTMLAnchorElement;
            this.contentsControl = HTMLUtilities.findRequiredElement(element, "button.contents") as HTMLButtonElement;
            this.settingsControl = HTMLUtilities.findRequiredElement(element, "button.settings") as HTMLButtonElement;
            this.navigation = HTMLUtilities.findRequiredElement(element, "div[class=controls]");
            this.links = HTMLUtilities.findRequiredElement(element, "ul[class='links top']") as HTMLUListElement;
            this.linksBottom = HTMLUtilities.findRequiredElement(element, "ul[class='links bottom']") as HTMLUListElement;
            this.tocView = HTMLUtilities.findRequiredElement(element, "div[class='contents-view controls-view']") as HTMLDivElement;
            this.settingsView = HTMLUtilities.findRequiredElement(element, "div[class='settings-view controls-view']") as HTMLDivElement;
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

        this.startLink.addEventListener("click", this.handleStartClick.bind(this));

        this.contentsControl.addEventListener("click", this.handleContentsClick.bind(this));

        this.settingsControl.addEventListener("click", this.handleSettingsClick.bind(this));

        this.settingsView.addEventListener("click", this.hideSettings.bind(this));
    }

    private updateBookView(): void {
        const doNothing = () => {};
        if (this.settings.getSelectedView() === this.paginator) {
            document.body.onscroll = () => {};
            document.body.style.overflow = "hidden";
            // This prevents overscroll/bouncing on iOS.
            document.body.style.position = "fixed";
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.top = "0";
            document.body.style.bottom = "0";
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
        } else if (this.settings.getSelectedView() === this.scroller) {
            document.body.onscroll = this.saveCurrentReadingPosition.bind(this);
            document.body.style.overflow = "scroll";
            document.body.style.position = "static";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.top = "";
            document.body.style.bottom = "";
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
                    event.stopPropagation();
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
            if (control) {
                control.setAttribute("aria-expanded", "true");
            }
        } else {
            element.style.display = "none";
            if (control) {
                control.setAttribute("aria-expanded", "false");
            }
        }
    }

    private handleToggleLinksClick(event: MouseEvent | TouchEvent): void {
        this.hideTOC();
        this.toggleDisplay(this.links);
        this.toggleDisplay(this.linksBottom);
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

    private handleStartClick(event: MouseEvent): void {
        if (this.startLink.hasAttribute("href")) {
            const position = {
                resource: this.startLink.href,
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
