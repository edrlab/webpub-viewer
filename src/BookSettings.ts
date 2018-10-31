import BookView from "./BookView";
import BookTheme from "./BookTheme";
import BookFont from "./BookFont";
import * as HTMLUtilities from "./HTMLUtilities";
import Store from "./Store";
import * as IconLib from "./IconLib";

const template = (sections: string) => `
    <ul class="settings-menu" role="menu">
        ${sections}
    </ul>
`;

const sectionTemplate = (options: string) => `
    <li><ul class="settings-options">
        ${options}
    </ul></li>
`;

const optionTemplate = (liClassName: string, buttonClassName: string, label: string, role: string, svgIcon: string, buttonId: string) => `
    <li class='${liClassName}'><button id='${buttonId}' class='${buttonClassName}' role='${role}' tabindex=-1>${label}${svgIcon}</button></li>
`;

const offlineTemplate = `
    <li>
        <div class='offline-status'></div>
    </li>
`;

export interface BookSettingsConfig {
    /** Store to save the user's selections in. */
    store: Store,

    /** Array of BookFonts */
    bookFonts: BookFont[],

    /** Array of font sizes in pixels sorted from smallest to largest. */
    fontSizesInPixels: number[],

    /** Initial font size to use until the user makes a selection. */
    defaultFontSizeInPixels?: number,

    /** Array of BookThemes */
    bookThemes: BookTheme[],

    /** Array of BookViews. */
    bookViews: BookView[];
}

export default class BookSettings {
    private readonly store: Store;
    private readonly bookFonts: BookFont[];
    private fontButtons: { [key: string]: HTMLButtonElement };
    private readonly fontSizes: string[];
    private fontSizeButtons: { [key: string]: HTMLButtonElement };
    private readonly bookThemes: BookTheme[];
    private themeButtons: { [key: string]: HTMLButtonElement };
    private readonly bookViews: BookView[];
    private viewButtons: { [key: string]: HTMLButtonElement };

    private offlineStatusElement: HTMLElement;

    private fontChangeCallback: () => void = () => {};
    private fontSizeChangeCallback: () => void = () => {};
    private themeChangeCallback: () => void = () => {};
    private viewChangeCallback: () => void = () => {};

    private selectedFont: BookFont;
    private selectedFontSize: string;
    private selectedTheme: BookTheme;
    private selectedView: BookView;

    private static readonly SELECTED_FONT_KEY = "settings-selected-font";
    private static readonly SELECTED_FONT_SIZE_KEY = "settings-selected-font-size";
    private static readonly SELECTED_THEME_KEY = "settings-selected-theme";
    private static readonly SELECTED_VIEW_KEY = "settings-selected-view";

    public static async create(config: BookSettingsConfig) {
        const fontSizes = config.fontSizesInPixels.map(fontSize => fontSize + "px");
        const settings = new this(config.store, config.bookFonts, fontSizes, config.bookThemes, config.bookViews);
        await settings.initializeSelections(config.defaultFontSizeInPixels ? config.defaultFontSizeInPixels + "px" : undefined);
        return settings;
    }

    protected constructor(store: Store, bookFonts: BookFont[], fontSizes: string[], bookThemes: BookTheme[], bookViews: BookView[]) {
        this.store = store;
        this.bookFonts = bookFonts;
        this.fontSizes = fontSizes;
        this.bookThemes = bookThemes;
        this.bookViews = bookViews;
    }

    private async initializeSelections(defaultFontSize?: string): Promise<void> {
        if (this.bookFonts.length >= 1) {
            let selectedFont = this.bookFonts[0];
            const selectedFontName = await this.store.get(BookSettings.SELECTED_FONT_KEY);
            if (selectedFontName) {
                for (const bookFont of this.bookFonts) {
                    if (bookFont.name === selectedFontName) {
                        selectedFont = bookFont;
                        break;
                    }
                }
            }
            this.selectedFont = selectedFont;
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

        if (this.bookThemes.length >= 1) {
            let selectedTheme = this.bookThemes[0];
            const selectedThemeName = await this.store.get(BookSettings.SELECTED_THEME_KEY);
            if (selectedThemeName) {
                for (const bookTheme of this.bookThemes) {
                    if (bookTheme.name === selectedThemeName) {
                        selectedTheme = bookTheme;
                        break;
                    }
                }
            }
            this.selectedTheme = selectedTheme;
        }

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
    }

    public renderControls(element: HTMLElement): void {
        const sections = [];

        if (this.bookFonts.length > 1) {
            const fontOptions = this.bookFonts.map(bookFont =>
                optionTemplate("reading-style", bookFont.name, bookFont.label, "menuitem", IconLib.icons.checkDupe, bookFont.label)
            );
            sections.push(sectionTemplate(fontOptions.join("")));
        }

        if (this.fontSizes.length > 1) {
            const fontSizeOptions = optionTemplate("font-setting", "decrease", "A-", "menuitem", "", "decrease-font") + optionTemplate("font-setting", "increase", "A+", "menuitem", "", "increase-font");
            sections.push(sectionTemplate(fontSizeOptions));
        }

        if (this.bookThemes.length > 1) {
            const themeOptions = this.bookThemes.map(bookTheme =>
                optionTemplate("reading-theme", bookTheme.name, bookTheme.label, "menuitem", IconLib.icons.checkDupe, bookTheme.label)
            );
            sections.push(sectionTemplate(themeOptions.join("")));
        }

        if (this.bookViews.length > 1) {
            const viewOptions = this.bookViews.map(bookView =>
                optionTemplate("reading-style", bookView.name, bookView.label, "menuitem", IconLib.icons.checkDupe, bookView.label)
            );
            sections.push(sectionTemplate(viewOptions.join("")));
        }
        sections.push(offlineTemplate);

        element.innerHTML = template(sections.join(""));

        this.fontButtons = {};
        if (this.bookFonts.length > 1) {
            for (const bookFont of this.bookFonts) {
                this.fontButtons[bookFont.name] = HTMLUtilities.findRequiredElement(element, "button[class=" + bookFont.name + "]") as HTMLButtonElement;
            }
            this.updateFontButtons();
        }
        this.fontSizeButtons = {};
        if (this.fontSizes.length > 1) {
            for (const fontSizeName of ["decrease", "increase"]) {
                this.fontSizeButtons[fontSizeName] = HTMLUtilities.findRequiredElement(element, "button[class=" + fontSizeName + "]") as HTMLButtonElement;
            }
            this.updateFontSizeButtons();
        }
        this.themeButtons = {};
        if (this.bookThemes.length > 1) {
            for (const bookTheme of this.bookThemes) {
                this.themeButtons[bookTheme.name] = HTMLUtilities.findRequiredElement(element, "button[class=" + bookTheme.name + "]") as HTMLButtonElement;
            }
            this.updateThemeButtons();
        }
        this.viewButtons = {};
        if (this.bookViews.length > 1) {
            for (const bookView of this.bookViews) {
                this.viewButtons[bookView.name] = HTMLUtilities.findRequiredElement(element, "button[class=" + bookView.name + "]") as HTMLButtonElement;
            }
            this.updateViewButtons();
        }

        this.offlineStatusElement = HTMLUtilities.findRequiredElement(element, 'div[class="offline-status"]') as HTMLElement;

        this.setupEvents();

        // Clicking the settings view outside the ul hides it, but clicking inside the ul keeps it up.
        HTMLUtilities.findRequiredElement(element, "ul").addEventListener("click", (event: Event) => {
            event.stopPropagation();
        });
    }

    public onFontChange(callback: () => void) {
        this.fontChangeCallback = callback;
    }

    public onFontSizeChange(callback: () => void) {
        this.fontSizeChangeCallback = callback;
    }

    public onThemeChange(callback: () => void) {
        this.themeChangeCallback = callback;
    }

    public onViewChange(callback: () => void) {
        this.viewChangeCallback = callback;
    }

    private setupEvents(): void {
        for (const font of this.bookFonts) {
            const button = this.fontButtons[font.name];
            if (button) {
                button.addEventListener("click", (event: MouseEvent) => {
                    this.selectedFont.stop();
                    font.start();
                    this.selectedFont = font;
                    this.updateFontButtons();
                    this.storeSelectedFont(font);
                    this.fontChangeCallback();
                    event.preventDefault();
                });
            }
        }

        if (this.fontSizes.length > 1) {
            this.fontSizeButtons["decrease"].addEventListener("click", (event: MouseEvent) => {
                const currentFontSizeIndex = this.fontSizes.indexOf(this.selectedFontSize);
                if (currentFontSizeIndex > 0) {
                    const newFontSize = this.fontSizes[currentFontSizeIndex - 1];
                    this.selectedFontSize = newFontSize;
                    this.fontSizeChangeCallback();
                    this.updateFontSizeButtons();
                    this.storeSelectedFontSize(newFontSize);
                }
                event.preventDefault();
            });

            this.fontSizeButtons["increase"].addEventListener("click", (event: MouseEvent) => {
                const currentFontSizeIndex = this.fontSizes.indexOf(this.selectedFontSize);
                if (currentFontSizeIndex < this.fontSizes.length - 1) {
                    const newFontSize = this.fontSizes[currentFontSizeIndex + 1];
                    this.selectedFontSize = newFontSize;
                    this.fontSizeChangeCallback();
                    this.updateFontSizeButtons();
                    this.storeSelectedFontSize(newFontSize);
                }
                event.preventDefault();
            });
        }

        for (const theme of this.bookThemes) {
            const button = this.themeButtons[theme.name];
            if (button) {
                button.addEventListener("click", (event: MouseEvent) => {
                    this.selectedTheme.stop();
                    theme.start();
                    this.selectedTheme = theme;
                    this.updateThemeButtons();
                    this.storeSelectedTheme(theme);
                    this.themeChangeCallback();
                    event.preventDefault();
                });
            }
        }

        for (const view of this.bookViews) {
            const button = this.viewButtons[view.name];
            if (button) {
                button.addEventListener("click", (event: MouseEvent) => {
                    const position = this.selectedView.getCurrentPosition();
                    this.selectedView.stop();
                    view.start(position);
                    this.selectedView = view;
                    this.updateViewButtons();
                    this.storeSelectedView(view);
                    this.viewChangeCallback();
                    event.preventDefault();
                });
            }
        }
    }

    private updateFontButtons(): void {
        for (const font of this.bookFonts) {
            if (font === this.selectedFont) {
                this.fontButtons[font.name].className = font.name + " active";
                this.fontButtons[font.name].setAttribute("aria-label", font.label + " font enabled");
            } else {
                this.fontButtons[font.name].className = font.name;
                this.fontButtons[font.name].setAttribute("aria-label", font.label + " font disabled");
            }
        }
    }

    private updateFontSizeButtons(): void {
        const currentFontSizeIndex = this.fontSizes.indexOf(this.selectedFontSize);

        if (currentFontSizeIndex === 0) {
            this.fontSizeButtons["decrease"].className = "decrease disabled";
        } else {
            this.fontSizeButtons["decrease"].className = "decrease";
        }

        if (currentFontSizeIndex === this.fontSizes.length - 1) {
            this.fontSizeButtons["increase"].className = "increase disabled";
        } else {
            this.fontSizeButtons["increase"].className = "increase";
        }
    }

    private updateThemeButtons(): void {
        for (const theme of this.bookThemes) {
            if (theme === this.selectedTheme) {
                this.themeButtons[theme.name].className = theme.name + " active";
                this.themeButtons[theme.name].setAttribute("aria-label", theme.label + " mode enabled");
            } else {
                this.themeButtons[theme.name].className = theme.name;
                this.themeButtons[theme.name].setAttribute("aria-label", theme.label + " mode disabled");
            }
        }
    }

    private updateViewButtons(): void {
        for (const view of this.bookViews) {
            if (view === this.selectedView) {
                this.viewButtons[view.name].className = view.name + " active";
                this.viewButtons[view.name].setAttribute("aria-label", view.label + " mode enabled");
            } else {
                this.viewButtons[view.name].className = view.name;
                this.viewButtons[view.name].setAttribute("aria-label", view.label + " mode disabled");
            }
        }
    }

    public getSelectedFont(): BookFont {
        return this.selectedFont;
    }

    public getSelectedFontSize(): string {
        return this.selectedFontSize;
    }

    public getSelectedTheme(): BookTheme {
        return this.selectedTheme;
    }

    public getSelectedView(): BookView {
        return this.selectedView;
    }

    public getOfflineStatusElement(): HTMLElement {
        return this.offlineStatusElement;
    }

    private async storeSelectedFont(font: BookFont): Promise<void> {
        return this.store.set(BookSettings.SELECTED_FONT_KEY, font.name);
    }

    private async storeSelectedFontSize(fontSize: string): Promise<void> {
        return this.store.set(BookSettings.SELECTED_FONT_SIZE_KEY, fontSize);
    }

    private async storeSelectedTheme(theme: BookTheme): Promise<void> {
        return this.store.set(BookSettings.SELECTED_THEME_KEY, theme.name);
    }

    private async storeSelectedView(view: BookView): Promise<void> {
        return this.store.set(BookSettings.SELECTED_VIEW_KEY, view.name);
    }
};
