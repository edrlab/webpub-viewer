import Navigator from "./Navigator";
import Cacher from "./Cacher";
import PaginatedBookView from "./PaginatedBookView";
import ScrollingBookView from "./ScrollingBookView";
import Annotator from "./Annotator";
import Manifest from "./Manifest";
import BookSettings from "./BookSettings";
import HTMLView from "./HTMLView";

const template = `
  <nav class="publication">
    <div class="controls">
      <ul class="links" style="z-index: 2000;">
        <li><a rel="start" class="disabled">Start</a></li>
        <li><a rel="contents" class="disabled">Contents</a></li>
        <li><a rel="prev" class="disabled">Previous Chapter</a></li>
        <li><a rel="next" class="disabled">Next Chapter</a></li>
        <li><a class="settings">Settings</a></li>
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
    <iframe style="border:0;"></iframe>
  </main>
`;

interface ReadingPosition {
    resource: string;
    position: number;
}

/** Class that shows webpub resources in an iframe, with navigation controls outside the iframe. */
export default class IFrameNavigator extends HTMLView implements Navigator {
    private manifestUrl: string;
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
    private tocView: HTMLDivElement;
    private settingsView: HTMLDivElement;
    private loadingMessage: HTMLDivElement;
    private paginationControls: HTMLDivElement;
    private linksToggle: Element;
    private previousPageLink: Element;
    private nextPageLink: Element;
    private newPosition: ReadingPosition | null;
    private isLoading: boolean;

    public static async create(element: HTMLElement, manifestUrl: string, cacher: Cacher, settings: BookSettings, annotator: Annotator | null = null, paginator: PaginatedBookView | null = null, scroller: ScrollingBookView | null = null) {
        const navigator = new this(cacher, settings, annotator, paginator, scroller);
        await navigator.start(element, manifestUrl);
        return navigator;
    }

    protected constructor(cacher: Cacher, settings: BookSettings, annotator: Annotator | null = null, paginator: PaginatedBookView | null = null, scroller: ScrollingBookView | null = null) {
        super();
        this.cacher = cacher;
        this.paginator = paginator;
        this.scroller = scroller;
        this.annotator = annotator;
        this.settings = settings;
    }

    protected async start(element: HTMLElement, manifestUrl: string): Promise<void> {
        element.innerHTML = template;
        this.manifestUrl = manifestUrl;
        try {
            this.iframe = this.findRequiredElement(element, "iframe") as HTMLIFrameElement;
            this.nextChapterLink = this.findRequiredElement(element, "a[rel=next]") as HTMLAnchorElement;
            this.previousChapterLink = this.findRequiredElement(element, "a[rel=prev]") as HTMLAnchorElement;
            this.startLink = this.findRequiredElement(element, "a[rel=start]") as HTMLAnchorElement;
            this.contentsLink = this.findRequiredElement(element, "a[rel=contents]") as HTMLAnchorElement;
            this.settingsLink = this.findRequiredElement(element, "a[class=settings]") as HTMLAnchorElement;
            this.navigation = this.findRequiredElement(element, "div[class=controls]");
            this.links = this.findRequiredElement(element, "ul[class=links]") as HTMLUListElement;
            this.tocView = this.findRequiredElement(element, "div[class='contents-view controls-view']") as HTMLDivElement;
            this.settingsView = this.findRequiredElement(element, "div[class='settings-view controls-view']") as HTMLDivElement;
            this.loadingMessage = this.findRequiredElement(element, "div[class=loading]") as HTMLDivElement;
            this.paginationControls = this.findRequiredElement(element, "div[class=pagination-controls]") as HTMLDivElement;
            this.linksToggle = this.findRequiredElement(element, "div[class=links-toggle]");
            this.previousPageLink = this.findRequiredElement(element, "div[class=previous-page]");
            this.nextPageLink = this.findRequiredElement(element, "div[class=next-page]");
            this.newPosition = null;
            this.isLoading = true;
            this.setupEvents();

            if (this.paginator) {
                this.paginator.setBookElement(this.iframe);
            }
            if (this.scroller) {
                this.scroller.setBookElement(this.iframe);
            }
            this.settings.renderControls(this.settingsView);
            this.settings.onViewChange(this.updateBookView.bind(this));

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
            document.body.onscroll = this.handleScroll.bind(this);
            document.body.style.overflow = "auto";
        }
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
        this.hideTOC();
        this.showLoadingMessageAfterDelay();

        let bookViewPosition = 0;
        if (this.newPosition) {
            bookViewPosition = this.newPosition.position;
        }
        this.updateBookView();
        this.settings.getSelectedView().setTopMargin(this.navigation.clientHeight + 5);
        this.settings.getSelectedView().start(bookViewPosition);
        this.newPosition = null;

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
        selectedView.goToPosition(oldPosition);
    }

    private async handleScroll(): Promise<void> {
        return this.saveCurrentReadingPosition();
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