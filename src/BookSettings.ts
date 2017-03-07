import BookView from "./BookView";
import * as HTMLUtilities from "./HTMLUtilities";
import Store from "./Store";

const template = (sections: string) => `
    <ul>
        ${sections}
    </ul>
`;

const sectionTemplate = (sectionName: string, options: string) => `
    <li>${sectionName}<ul>
        ${options}
    </ul></li>
`;

const optionTemplate = (className: string, label: string) => `
    <li><a href='#' class='${className}'>${label}</a></li>
`;

const offlineTemplate = `
    <li>
        <div class='offline-status'></div>
        <a class='enable-offline' href='#'>Download book for offline use</a>
    </li>
`;

export enum OfflineStatus {
    Enabled,
    Disabled,
    NoSelection    
};

export default class BookSettings {
    private readonly store: Store;
    private readonly bookViews: BookView[];
    private viewLinks: { [key: string]: HTMLAnchorElement };
    private readonly fontSizes: string[];
    private fontSizeLinks: { [key: string]: HTMLAnchorElement };
    private offlineLink: HTMLAnchorElement;
    private offlineStatusElement: HTMLElement;

    private viewChangeCallback: () => void = () => {};
    private fontSizeChangeCallback: () => void = () => {};
    private offlineEnabledCallback: () => void = () => {};

    private selectedView: BookView;
    private selectedFontSize: string;
    private offlineStatus: OfflineStatus = OfflineStatus.NoSelection;

    private static readonly SELECTED_VIEW_KEY = "settings-selected-view";
    private static readonly SELECTED_FONT_SIZE_KEY = "settings-selected-font-size";
    private static readonly OFFLINE_ENABLED_KEY = "settings-offline-enabled";

    /** @param store Store to save the user's selections in. */
    /** @param bookViews Array of BookView options. */
    /** @param fontSizesInPixels Array of font sizes in pixels sorted from smallest to largest. */
    /** @param defaultFontSizeInPixels Initial font size to use until the user makes a selection. */
    public static async create(store: Store, bookViews: BookView[], fontSizesInPixels: number[], defaultFontSizeInPixels?: number) {
        const fontSizes = fontSizesInPixels.map(fontSize => fontSize + "px");
        const settings = new this(store, bookViews, fontSizes);
        await settings.initializeSelections(defaultFontSizeInPixels ? defaultFontSizeInPixels + "px" : undefined);
        return settings;
    }

    protected constructor(store: Store, bookViews: BookView[], fontSizes: string[]) {
        this.store = store;
        this.bookViews = bookViews;
        this.fontSizes = fontSizes;
    }

    private async initializeSelections(defaultFontSize?: string): Promise<void> {
        if (this.bookViews.length >= 1) {
            let selectedView = this.bookViews[0];
            const selectedViewName = await this.store.get(BookSettings.SELECTED_VIEW_KEY);
            if (selectedViewName) {
                for (const bookView of this.bookViews) {
                    if (bookView.name === selectedViewName) {
                        selectedView = bookView;
                        break;
                    }
                }
            }
            this.selectedView = selectedView;
        }

        if (this.fontSizes.length >= 1) {
            // First, check if the user has previously set a font size.
            let selectedFontSize = await this.store.get(BookSettings.SELECTED_FONT_SIZE_KEY);
            let selectedFontSizeIsAvailable = (selectedFontSize && this.fontSizes.indexOf(selectedFontSize) !== -1);
            // If not, or the user selected a size that's no longer an option, is there a default font size?
            if ((!selectedFontSize || !selectedFontSizeIsAvailable) && defaultFontSize) {
                selectedFontSize = defaultFontSize;
                selectedFontSizeIsAvailable = (selectedFontSize && this.fontSizes.indexOf(selectedFontSize) !== -1);
            }
            // If there's no selection and no default, pick a font size in the middle of the options.
            if (!selectedFontSize || !selectedFontSizeIsAvailable) {
                const averageFontSizeIndex = Math.floor(this.fontSizes.length / 2);
                selectedFontSize = this.fontSizes[averageFontSizeIndex];
            }
            this.selectedFontSize = selectedFontSize;
        }

        const offlineEnabled = await this.store.get(BookSettings.OFFLINE_ENABLED_KEY);
        if (offlineEnabled === "true") {
            this.offlineStatus = OfflineStatus.Enabled;
        } else if (offlineEnabled === "false") {
            this.offlineStatus = OfflineStatus.Disabled;
        }
    }

    public renderControls(element: HTMLElement): void {
        const sections = [];

        if (this.bookViews.length > 1) {
            const viewOptions = this.bookViews.map(bookView =>
                optionTemplate(bookView.name, bookView.label)
            );
            sections.push(sectionTemplate("View", viewOptions.join("")));
        }

        if (this.fontSizes.length > 1) {
            const fontSizeOptions = optionTemplate("decrease", "Decrease") + optionTemplate("increase", "Increase");
            sections.push(sectionTemplate("Font Size", fontSizeOptions));
        }

        sections.push(offlineTemplate);

        element.innerHTML = template(sections.join(""));
        this.viewLinks = {};
        if (this.bookViews.length > 1) {
            for (const bookView of this.bookViews) {
                this.viewLinks[bookView.name] = HTMLUtilities.findRequiredElement(element, "a[class=" + bookView.name + "]") as HTMLAnchorElement;
            }
            this.updateViewLinks();
        }
        this.fontSizeLinks = {};
        if (this.fontSizes.length > 1) {
            for (const fontSizeName of ["decrease", "increase"]) {
                this.fontSizeLinks[fontSizeName] = HTMLUtilities.findRequiredElement(element, "a[class=" + fontSizeName + "]") as HTMLAnchorElement;
            }
            this.updateFontSizeLinks();
        }

        this.offlineLink = HTMLUtilities.findRequiredElement(element, 'a[class="enable-offline"]') as HTMLAnchorElement;
        this.offlineStatusElement = HTMLUtilities.findRequiredElement(element, 'div[class="offline-status"]') as HTMLElement;
        this.updateOfflineLink();

        this.setupEvents();

        // Clicking the settings view outside the ul hides it, but clicking inside the ul keeps it up.
        HTMLUtilities.findRequiredElement(element, "ul").addEventListener("click", (event: Event) => {
            event.stopPropagation();
        });
    }

    public onViewChange(callback: () => void) {
        this.viewChangeCallback = callback;
    }

    public onFontSizeChange(callback: () => void) {
        this.fontSizeChangeCallback = callback;
    }

    public onOfflineEnabled(callback: () => void) {
        this.offlineEnabledCallback = callback;
    }

    private setupEvents(): void {
        for (const view of this.bookViews) {
            const link = this.viewLinks[view.name];
            if (link) {
                link.addEventListener("click", (event: MouseEvent) => {
                    const position = this.selectedView.getCurrentPosition();
                    this.selectedView.stop();
                    view.start(position);
                    this.selectedView = view;
                    this.updateViewLinks();
                    this.storeSelectedView(view);
                    this.viewChangeCallback();
                    event.preventDefault();
                });
            }
        }

        if (this.fontSizes.length > 1) {
            this.fontSizeLinks["decrease"].addEventListener("click", (event: MouseEvent) => {
                const currentFontSizeIndex = this.fontSizes.indexOf(this.selectedFontSize);
                if (currentFontSizeIndex > 0) {
                    const newFontSize = this.fontSizes[currentFontSizeIndex - 1];
                    this.selectedFontSize = newFontSize;
                    this.fontSizeChangeCallback();
                    this.updateFontSizeLinks();
                    this.storeSelectedFontSize(newFontSize);
                }
                event.preventDefault();
            });

            this.fontSizeLinks["increase"].addEventListener("click", (event: MouseEvent) => {
                const currentFontSizeIndex = this.fontSizes.indexOf(this.selectedFontSize);
                if (currentFontSizeIndex < this.fontSizes.length - 1) {
                    const newFontSize = this.fontSizes[currentFontSizeIndex + 1];
                    this.selectedFontSize = newFontSize;
                    this.fontSizeChangeCallback();
                    this.updateFontSizeLinks();
                    this.storeSelectedFontSize(newFontSize);
                }
                event.preventDefault();
            });
        }

        this.offlineLink.addEventListener("click", (event: MouseEvent) => {
            this.offlineStatus = OfflineStatus.Enabled;
            this.offlineEnabledCallback();
            this.updateOfflineLink();
            this.storeOfflineEnabled(true);
            event.preventDefault();
        });
    }

    private updateViewLinks(): void {
        for (const view of this.bookViews) {
            if (view === this.selectedView) {
                this.viewLinks[view.name].className = view.name + " active";
            } else {
                this.viewLinks[view.name].className = view.name;
            }
        }
    }

    private updateFontSizeLinks(): void {
        const currentFontSizeIndex = this.fontSizes.indexOf(this.selectedFontSize);

        if (currentFontSizeIndex === 0) {
            this.fontSizeLinks["decrease"].className = "decrease disabled";
        } else {
            this.fontSizeLinks["decrease"].className = "decrease";
        }

        if (currentFontSizeIndex === this.fontSizes.length - 1) {
            this.fontSizeLinks["increase"].className = "increase disabled";
        } else {
            this.fontSizeLinks["increase"].className = "increase";
        }
    }

    private updateOfflineLink(): void {
        if (this.getOfflineStatus() === OfflineStatus.Enabled) {
            this.offlineLink.style.display = "none";
        } else {
            this.offlineLink.style.display = "block";
        }
    }

    public getSelectedView(): BookView {
        return this.selectedView;
    }

    public getSelectedFontSize(): string {
        return this.selectedFontSize;
    }

    public getOfflineStatus(): OfflineStatus {
        return this.offlineStatus;
    }

    public async askUserToEnableOfflineUse(): Promise<void> {
        const enable = window.confirm("Would you like to download this book to read offline?");
        if (enable) {
            this.offlineStatus = OfflineStatus.Enabled;
            this.offlineEnabledCallback();
        } else {
            this.offlineStatus = OfflineStatus.Disabled;
        }
        this.updateOfflineLink();
        await this.storeOfflineEnabled(enable);
    }

    public getOfflineStatusElement(): HTMLElement {
        return this.offlineStatusElement;
    }

    private async storeSelectedView(view: BookView): Promise<void> {
        return this.store.set(BookSettings.SELECTED_VIEW_KEY, view.name);
    }

    private async storeSelectedFontSize(fontSize: string): Promise<void> {
        return this.store.set(BookSettings.SELECTED_FONT_SIZE_KEY, fontSize);
    }

    private async storeOfflineEnabled(offlineEnabled: boolean): Promise<void> {
        return this.store.set(BookSettings.OFFLINE_ENABLED_KEY, offlineEnabled ? "true" : "false");
    }
};
