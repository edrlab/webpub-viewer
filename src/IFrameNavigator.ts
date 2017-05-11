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
import EventHandler from "./EventHandler";
import * as BrowserUtilities from "./BrowserUtilities";
import * as HTMLUtilities from "./HTMLUtilities";

const upLinkTemplate = (href: string, label: string, ariaLabel: string) => `
  <a rel="up" href='${href}' aria-label="${ariaLabel}">
    <svg width="16" height="25" viewBox="0 0 16 25" aria-labelledby="up-label" preserveAspectRatio="xMidYMid meet" role="img" class="icon">
      <title id="up-label">${label}</title>
      <polygon points="16 1.741 13.9 0 0 12.5 13.9 25 16 23.258 4.036 12.499 16 1.741" />
    </svg>
    <span class="setting-text up">${label}</span>
  </a>
`;

const template = `
  <nav class="publication">
    <div class="controls">
      <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" class="svgIcon use">
          <defs>
            <symbol id="close-icon" viewBox="0 0 29.69 29.812">
              <title>Close Icon</title>
              <path d="M2081.71,127.488l26.79-26.879a1.459,1.459,0,0,1,2.06,2.068l-26.79,26.879a1.453,1.453,0,0,1-2.06,0A1.483,1.483,0,0,1,2081.71,127.488Z" transform="translate(-2081.31 -100.188)"/>
              <path d="M2083.77,100.609l26.79,26.879a1.459,1.459,0,0,1-2.06,2.068l-26.79-26.879a1.483,1.483,0,0,1,0-2.068A1.453,1.453,0,0,1,2083.77,100.609Z" transform="translate(-2081.31 -100.188)"/>
            </symbol>
        </defs>
      </svg>
      <a href="#settings-control" class="scrolling-suggestion" style="display: none">
          We recommend scrolling mode for use with screen readers and keyboard navigation.
          Go to settings to switch to scrolling mode.
      </a>
      <ul class="links top active">
        <li>
          <button class="contents disabled" aria-labelledby="table-of-contents" aria-haspopup="true" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 275 180" aria-labelledby="table-of-contents" preserveAspectRatio="xMidYMid meet" role="img" class="icon open">
            <title id="table-of-contents">table of contents</title>
              <rect x="66" y="152" width="209" height="28"/>
              <rect x="66" y="76" width="209" height="28"/>
              <rect x="66" width="209" height="28"/>
              <rect width="33" height="28"/>
              <rect y="76" width="33" height="28"/>
              <rect y="152" width="33" height="28"/>
            </svg>
            <svg class="icon close inactive-icon" role="img" aria-labelledby="close-icon">
              <use xlink:href="#close-icon"></use>
            </svg>
            <span class="setting-text contents" id="contents">Contents</span>
          </button>
          <div class="contents-view controls-view inactive" aria-hidden="true"></div>
        </li>
        <li>
          <button class="settings" aria-labelledby="settings" aria-expanded="false" aria-haspopup="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 186.47158 186.4716" aria-labelledby="settings" preserveAspectRatio="xMidYMid meet" role="img" class="icon open">
              <title id="settings">Settings</title>
              <path d="M183.29465,117.36676l3.17693-24.131-23.52051-9.17834-4.75089-17.73081,15.78033-19.70844L159.1637,27.30789,136.04194,37.44974,120.145,28.2714,117.36676,3.17693,93.2358,0,84.05746,23.52051,66.32665,28.2714,46.61759,12.49107,27.30789,27.30789,37.44974,50.42966l-9.17834,15.897L3.17693,69.10484,0,93.2358l23.52051,9.17834L28.2714,120.145,12.49107,139.854l14.81682,19.3097,23.12177-10.14185,15.897,9.17834,2.77819,25.09447,24.131,3.17693,9.17834-23.52051L120.145,158.2002l19.70844,15.78033,19.31031-14.81682-10.14185-23.12177,9.17834-15.897ZM93.2358,129.84856A36.61276,36.61276,0,1,1,129.84856,93.2358,36.61267,36.61267,0,0,1,93.2358,129.84856Z"/>
              </svg>
              <svg class="icon close inactive-icon" role="img" aria-labelledby="close-icon">
                <use xlink:href="#close-icon"></use>
              </svg>
            <span class="setting-text settings" aria-labelledby="settings">Settings</span>
          </button>
          <div class="settings-view controls-view inactive" aria-hidden="true"></div>
        </li>
      </ul>
    </div>
    <!-- /controls -->
  </nav>
  <main style="overflow: hidden" tabindex=-1>
    <div class="loading" style="display:none;">Loading</div>
    <div class="error" style="display:none;">
      <span>There was an error loading this page.</span>
      <button class="try-again">Try again</button>
    </div>
    <div class="info top">
      <span class="book-title"></span>
    </div>
    <iframe title="book text" style="border:0; overflow: hidden;"></iframe>
    <div class="info bottom">
      <span class="chapter-position"></span>
      <span class="chapter-title"></span>
    </div>
  </main>
  <nav class="publication">
    <div class="controls">
      <ul class="links bottom active">
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
  </nav>
`;

interface ReadingPosition {
    resource: string;
    position: number;
}

export interface UpLinkConfig {
    url?: URL;
    label?: string;
    ariaLabel?: string;
}

export interface IFrameNavigatorConfig {
    element: HTMLElement;
    manifestUrl: URL;
    store: Store;
    cacher: Cacher;
    settings: BookSettings;
    annotator?: Annotator;
    paginator?: PaginatedBookView;
    scroller?: ScrollingBookView;
    eventHandler?: EventHandler;
    upLink?:  UpLinkConfig;
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
    private upLinkConfig: UpLinkConfig | null;
    private iframe: HTMLIFrameElement;
    private scrollingSuggestion: HTMLAnchorElement;
    private upLink: HTMLAnchorElement | null = null;
    private nextChapterLink: HTMLAnchorElement;
    private previousChapterLink: HTMLAnchorElement;
    private contentsControl: HTMLButtonElement;
    private settingsControl: HTMLButtonElement;
    private links: HTMLUListElement;
    private linksBottom: HTMLUListElement;
    private tocView: HTMLDivElement;
    private settingsView: HTMLDivElement;
    private loadingMessage: HTMLDivElement;
    private errorMessage: HTMLDivElement;
    private tryAgainButton: HTMLButtonElement;
    private infoTop: HTMLDivElement;
    private infoBottom: HTMLDivElement;
    private bookTitle: HTMLSpanElement;
    private chapterTitle: HTMLSpanElement;
    private chapterPosition: HTMLSpanElement;
    private newPosition: ReadingPosition | null;
    private newElementId: string | null;
    private isLoading: boolean;

    public static async create(config: IFrameNavigatorConfig) {
        const navigator = new this(
            config.store, config.cacher, config.settings, config.annotator || null,
            config.paginator || null, config.scroller || null, config.eventHandler || null,
            config.upLink || null
        );

        await navigator.start(config.element, config.manifestUrl);
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
        upLinkConfig: UpLinkConfig | null = null
        ) {

        this.store = store;
        this.cacher = cacher;
        this.paginator = paginator;
        this.scroller = scroller;
        this.annotator = annotator;
        this.settings = settings;
        this.eventHandler = eventHandler || new EventHandler();
        this.upLinkConfig = upLinkConfig;
    }

    protected async start(element: HTMLElement, manifestUrl: URL): Promise<void> {
        element.innerHTML = template;
        this.manifestUrl = manifestUrl;
        try {
            this.iframe = HTMLUtilities.findRequiredElement(element, "iframe") as HTMLIFrameElement;
            this.scrollingSuggestion = HTMLUtilities.findRequiredElement(element, ".scrolling-suggestion") as HTMLAnchorElement;
            this.nextChapterLink = HTMLUtilities.findRequiredElement(element, "a[rel=next]") as HTMLAnchorElement;
            this.previousChapterLink = HTMLUtilities.findRequiredElement(element, "a[rel=prev]") as HTMLAnchorElement;
            this.contentsControl = HTMLUtilities.findRequiredElement(element, "button.contents") as HTMLButtonElement;
            this.settingsControl = HTMLUtilities.findRequiredElement(element, "button.settings") as HTMLButtonElement;
            this.links = HTMLUtilities.findRequiredElement(element, "ul.links.top") as HTMLUListElement;
            this.linksBottom = HTMLUtilities.findRequiredElement(element, "ul.links.bottom") as HTMLUListElement;
            this.tocView = HTMLUtilities.findRequiredElement(element, ".contents-view") as HTMLDivElement;
            this.settingsView = HTMLUtilities.findRequiredElement(element, ".settings-view") as HTMLDivElement;
            this.loadingMessage = HTMLUtilities.findRequiredElement(element, "div[class=loading]") as HTMLDivElement;
            this.errorMessage = HTMLUtilities.findRequiredElement(element, "div[class=error]") as HTMLDivElement;
            this.tryAgainButton = HTMLUtilities.findRequiredElement(element, "button[class=try-again]") as HTMLButtonElement;
            this.infoTop = HTMLUtilities.findRequiredElement(element, "div[class='info top']") as HTMLDivElement;
            this.infoBottom = HTMLUtilities.findRequiredElement(element, "div[class='info bottom']") as HTMLDivElement;
            this.bookTitle = HTMLUtilities.findRequiredElement(this.infoTop, "span[class=book-title]") as HTMLSpanElement;
            this.chapterTitle = HTMLUtilities.findRequiredElement(this.infoBottom, "span[class=chapter-title]") as HTMLSpanElement;
            this.chapterPosition = HTMLUtilities.findRequiredElement(this.infoBottom, "span[class=chapter-position]") as HTMLSpanElement;
            this.newPosition = null;
            this.newElementId = null;
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

            // Trap keyboard focus inside the settings view when it's displayed.
            const settingsButtons = this.settingsView.querySelectorAll("button");
            if (settingsButtons && settingsButtons.length > 0) {
                const lastSettingsButton = settingsButtons[settingsButtons.length - 1];
                this.setupModalFocusTrap(this.settingsView, this.settingsControl, lastSettingsButton);
            }

            this.cacher.onStatusUpdate(this.updateOfflineCacheStatus.bind(this));
            this.enableOffline();

            if (this.scroller && (this.settings.getSelectedView() !== this.scroller)) {
                this.scrollingSuggestion.style.display = "block";
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

        this.settingsView.addEventListener("click", this.handleToggleLinksClick.bind(this));

        this.tryAgainButton.addEventListener("click", this.tryAgain.bind(this));

        this.contentsControl.addEventListener("keydown", this.hideTOCOnEscape.bind(this));

        this.tocView.addEventListener("keydown", this.hideTOCOnEscape.bind(this));

        this.settingsControl.addEventListener("keydown", this.hideSettingsOnEscape.bind(this));

        this.settingsView.addEventListener("keydown", this.hideSettingsOnEscape.bind(this));
    }

    private setupModalFocusTrap(modal: HTMLDivElement, closeButton: HTMLButtonElement, lastFocusableElement: HTMLButtonElement | HTMLAnchorElement): void {
        // Trap keyboard focus in a modal dialog when it's displayed.
        const TAB_KEY = 9;

        // Going backwards from the close button sends you to the last focusable element.
        closeButton.addEventListener("keydown", (event: KeyboardEvent) => {
            if (this.isDisplayed(modal)) {
                const tab = (event.keyCode === TAB_KEY);
                const shift = !!event.shiftKey;
                if (tab && shift) {
                    lastFocusableElement.focus();
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        });

        // Going forward from the last focusable element sends you to the close button.
        lastFocusableElement.addEventListener("keydown", (event: KeyboardEvent) => {
            if (this.isDisplayed(modal)) {
                const tab = (event.keyCode === TAB_KEY);
                const shift = !!event.shiftKey;
                if (tab && !shift) {
                    closeButton.focus();
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        });
    }

    private updateBookView(): void {
        const doNothing = () => {};
        if (this.settings.getSelectedView() === this.paginator) {
            this.scrollingSuggestion.style.display = "block";
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
            if (this.isDisplayed(this.linksBottom)) {
                this.toggleDisplay(this.linksBottom);
            }
        } else if (this.settings.getSelectedView() === this.scroller) {
            this.scrollingSuggestion.style.display = "none";
            document.body.onscroll = () => {
                this.saveCurrentReadingPosition();
                if (this.scroller && this.scroller.atBottom()) {
                    // Bring up the bottom nav when you get to the bottom,
                    // if it wasn't already displayed.
                    if (!this.isDisplayed(this.linksBottom)) {
                        this.toggleDisplay(this.linksBottom);
                    }
                } else {
                    // Remove the bottom nav when you scroll back up,
                    // if it was displayed because you were at the bottom.
                    if (this.isDisplayed(this.linksBottom) && !this.isDisplayed(this.links)) {
                        this.toggleDisplay(this.linksBottom);
                    }
                }
            }
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
            if (this.isDisplayed(this.links) && !this.isDisplayed(this.linksBottom)) {
                this.toggleDisplay(this.linksBottom);
            }
        }
        this.updatePositionInfo();
    }

    private updateFontSize(): void {
        this.handleResize();
    }

    private enableOffline(): void {
        if (this.cacher.getStatus() !== CacheStatus.Downloaded) {
            this.cacher.enable();
        }
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
                let lastLink: HTMLAnchorElement | null = null;
                for (const link of links) {
                    const listItemElement : HTMLLIElement = document.createElement("li");
                    const linkElement: HTMLAnchorElement = document.createElement("a");
                    linkElement.tabIndex = -1;
                    let href = "";
                    if (link.href) {
                        href = new URL(link.href, this.manifestUrl.href).href;
                    }
                    linkElement.href = href;
                    linkElement.innerHTML = link.title || "";
                    linkElement.addEventListener("click", (event: Event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        if ((event.currentTarget as HTMLAnchorElement).className.indexOf("active") !== -1) {
                            // This TOC item is already loaded. Hide the TOC
                            // but don't navigate.
                            this.hideTOC();
                        } else {
                            // Set focus back to the contents toggle button so screen readers
                            // don't get stuck on a hidden link.
                            this.contentsControl.focus();
                            this.navigate({
                                resource: linkElement.href,
                                position: 0
                            });
                        }
                    });
                    listItemElement.appendChild(linkElement);

                    if (link.children && link.children.length > 0) {
                        createTOC(listItemElement, link.children);
                    }

                    listElement.appendChild(listItemElement);
                    lastLink = linkElement;
                }

                // Trap keyboard focus inside the TOC while it's open.
                if (lastLink) {
                    this.setupModalFocusTrap(this.tocView, this.contentsControl, lastLink);
                }

                parentElement.appendChild(listElement);
            }
            createTOC(this.tocView, toc);
        } else {
            this.contentsControl.parentElement.style.display = "none";
        }

        if (this.upLinkConfig && this.upLinkConfig.url) {
            const upUrl = this.upLinkConfig.url;
            const upLabel = this.upLinkConfig.label || "";
            const upAriaLabel = this.upLinkConfig.ariaLabel || upLabel;
            const upHTML = upLinkTemplate(upUrl.href, upLabel, upAriaLabel);
            const upParent : HTMLLIElement = document.createElement("li");
            upParent.innerHTML = upHTML;
            this.links.insertBefore(upParent, this.links.firstChild);
            this.upLink = HTMLUtilities.findRequiredElement(this.links, "a[rel=up]") as HTMLAnchorElement;
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
        }

        return new Promise<void>(resolve => resolve());
    }

    private async handleIFrameLoad(): Promise<void> {
        this.errorMessage.style.display = "none";
        this.showLoadingMessageAfterDelay();
        try {
            this.hideTOC();

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

            let chapterTitle;
            const spineItem = manifest.getSpineItem(currentLocation);
            if (spineItem !== null) {
                chapterTitle = spineItem.title;
            }
            if (!chapterTitle) {
                const tocItem = manifest.getTOCItem(currentLocation);
                if (tocItem !== null && tocItem.title) {
                    chapterTitle = tocItem.title;
                }
            }

            if (chapterTitle) {
                this.chapterTitle.innerHTML = "(" + chapterTitle + ")";
            } else {
                this.chapterTitle.innerHTML = "(Current Chapter)";
            }


            if (this.eventHandler) {
                this.eventHandler.setupEvents(this.iframe.contentDocument);
            }

            if (this.annotator) {
                await this.saveCurrentReadingPosition();
            }
            this.hideLoadingMessage();
            return new Promise<void>(resolve => resolve());
        } catch (err) {
            this.errorMessage.style.display = "block";
            return new Promise<void>((_, reject) => reject());
        }
    }

    private tryAgain() {
        this.iframe.src = this.iframe.src;
        this.enableOffline();
    }

    private isDisplayed(element: HTMLDivElement | HTMLUListElement) {
        return element.className.indexOf(" active") !== -1;
    }

    private showElement(element: HTMLDivElement | HTMLUListElement, control?: HTMLAnchorElement | HTMLButtonElement) {
        element.className = element.className.replace(" inactive", "");
        if (element.className.indexOf(" active") === -1) {
            element.className += " active";
        }
        element.setAttribute("aria-hidden", "false");
        if (control) {
            control.setAttribute("aria-expanded", "true");

            const openIcon = control.querySelector(".icon.open");
            if (openIcon && (openIcon.getAttribute("class") || "").indexOf(" inactive-icon") === -1) {
                const newIconClass = (openIcon.getAttribute("class") || "") + " inactive-icon";
                openIcon.setAttribute("class", newIconClass);
            }
            const closeIcon = control.querySelector(".icon.close");
            if (closeIcon) {
                const newIconClass = (closeIcon.getAttribute("class") ||"").replace(" inactive-icon", "");
                closeIcon.setAttribute("class", newIconClass);
            }
        }
        // Add buttons and links in the element to the tab order.
        const buttons = Array.prototype.slice.call(element.querySelectorAll("button"));
        const links = Array.prototype.slice.call(element.querySelectorAll("a"));
        for (const button of buttons) {
            button.tabIndex = 0;
        }
        for (const link of links) {
            link.tabIndex = 0;
        }
    }

    private hideElement(element: HTMLDivElement | HTMLUListElement, control?: HTMLAnchorElement | HTMLButtonElement) {
        element.className = element.className.replace(" active", "");
        if (element.className.indexOf(" inactive") === -1) {
            element.className += " inactive";
        }
        element.setAttribute("aria-hidden", "true");
        if (control) {
            control.setAttribute("aria-expanded", "false");

            const openIcon = control.querySelector(".icon.open");
            if (openIcon) {
                const newIconClass = (openIcon.getAttribute("class") ||"").replace(" inactive-icon", "");
                openIcon.setAttribute("class", newIconClass);
            }
            const closeIcon = control.querySelector(".icon.close");
            if (closeIcon && (closeIcon.getAttribute("class") || "").indexOf(" inactive-icon") === -1) {
                const newIconClass = (closeIcon.getAttribute("class") || "") + " inactive-icon";
                closeIcon.setAttribute("class", newIconClass);
            }
        }
        // Remove buttons and links in the element from the tab order.
        const buttons = Array.prototype.slice.call(element.querySelectorAll("button"));
        const links = Array.prototype.slice.call(element.querySelectorAll("a"));
        for (const button of buttons) {
            button.tabIndex = -1;
        }
        for (const link of links) {
            link.tabIndex = -1;
        }
    }

    private showModal(modal: HTMLDivElement, control?: HTMLAnchorElement | HTMLButtonElement) {
        // Hide the rest of the page for screen readers.
        this.iframe.setAttribute("aria-hidden", "true");
        this.scrollingSuggestion.setAttribute("aria-hidden", "true");
        if (this.upLink) {
            this.upLink.setAttribute("aria-hidden", "true");
        }
        this.contentsControl.setAttribute("aria-hidden", "true");
        this.settingsControl.setAttribute("aria-hidden", "true");
        this.linksBottom.setAttribute("aria-hidden", "true");
        this.loadingMessage.setAttribute("aria-hidden", "true");
        this.errorMessage.setAttribute("aria-hidden", "true");
        this.infoTop.setAttribute("aria-hidden", "true");
        this.infoBottom.setAttribute("aria-hidden", "true");

        if (control) {        
            control.setAttribute("aria-hidden", "false");
        }
        this.showElement(modal, control);
    }

    private hideModal(modal: HTMLDivElement, control?: HTMLAnchorElement | HTMLButtonElement) {
        // Restore the page for screen readers.
        this.iframe.setAttribute("aria-hidden", "false");
        this.scrollingSuggestion.setAttribute("aria-hidden", "false");
        if (this.upLink) {
            this.upLink.setAttribute("aria-hidden", "false");
        }
        this.contentsControl.setAttribute("aria-hidden", "false");
        this.settingsControl.setAttribute("aria-hidden", "false");
        this.linksBottom.setAttribute("aria-hidden", "false");
        this.loadingMessage.setAttribute("aria-hidden", "false");
        this.errorMessage.setAttribute("aria-hidden", "false");
        this.infoTop.setAttribute("aria-hidden", "false");
        this.infoBottom.setAttribute("aria-hidden", "false");

        this.hideElement(modal, control);
    }

    private toggleDisplay(element: HTMLDivElement | HTMLUListElement, control?: HTMLAnchorElement | HTMLButtonElement): void {
        if (!this.isDisplayed(element)) {
            this.showElement(element, control);
        } else {
            this.hideElement(element, control);
        }
    }

    private toggleModal(modal: HTMLDivElement, control?: HTMLAnchorElement | HTMLButtonElement) {
        if (!this.isDisplayed(modal)) {
            this.showModal(modal, control);
        } else {
            this.hideModal(modal, control);
        }
    }

    private handleToggleLinksClick(event: MouseEvent | TouchEvent): void {
        this.hideTOC();
        this.hideSettings();
        this.toggleDisplay(this.links);
        if (this.settings.getSelectedView() === this.scroller) {
            if (!this.scroller.atBottom()) {
                this.toggleDisplay(this.linksBottom);
            }
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
        const body = HTMLUtilities.findRequiredElement(this.iframe.contentDocument, "body") as HTMLBodyElement;
        body.style.fontSize = fontSize;
        body.style.lineHeight = "1.5";

        const fontSizeNumber = parseInt(fontSize.slice(0, -2));
        let sideMargin = fontSizeNumber * 2;

        if (BrowserUtilities.getWidth() > fontSizeNumber * 45) {
            const extraMargin = Math.floor((BrowserUtilities.getWidth() - fontSizeNumber * 40) / 2);
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

        const linksHidden = !this.isDisplayed(this.links);

        if (linksHidden) {
            this.toggleDisplay(this.links);
        }

        const topHeight = this.links.clientHeight;
        this.infoTop.style.height = topHeight + "px";

        if (linksHidden) {
            this.toggleDisplay(this.links);
        }

        const linksBottomHidden = !this.isDisplayed(this.linksBottom);
        if (linksBottomHidden) {
            this.toggleDisplay(this.linksBottom);
        }

        const bottomHeight = this.linksBottom.clientHeight;
        this.infoBottom.style.height = bottomHeight + "px";

        if (linksBottomHidden) {
            this.toggleDisplay(this.linksBottom);
        }

        if (this.paginator) {
            this.paginator.height = (BrowserUtilities.getHeight() - topHeight - bottomHeight - 10);
        }
        if (this.scroller) {
            this.scroller.height = (BrowserUtilities.getHeight() - topHeight - bottomHeight - 10);
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
        this.toggleModal(this.tocView, this.contentsControl);
        // While the TOC is displayed, prevent scrolling in the book.
        if (this.settings.getSelectedView() === this.scroller) {
            if (this.isDisplayed(this.tocView)) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";
            }
        }
        event.preventDefault();
        event.stopPropagation();
    }

    private hideTOC(): void {
        this.hideModal(this.tocView, this.contentsControl);
        if (this.settings.getSelectedView() === this.scroller) {
            document.body.style.overflow = "auto";
        }
    }

    private hideTOCOnEscape(event: KeyboardEvent) {
        const ESCAPE_KEY = 27;
        if (this.isDisplayed(this.tocView) && event.keyCode === ESCAPE_KEY) {
            this.hideTOC();
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
        this.toggleModal(this.settingsView, this.settingsControl);
        event.preventDefault();
        event.stopPropagation();
    }

    private hideSettings(): void {
        this.hideModal(this.settingsView, this.settingsControl);
    }

    private hideSettingsOnEscape(event: KeyboardEvent) {
        const ESCAPE_KEY = 27;
        if (this.isDisplayed(this.settingsView) && event.keyCode === ESCAPE_KEY) {
            this.hideSettings();
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
