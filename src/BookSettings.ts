import BookView from "./BookView";
import * as HTMLUtilities from "./HTMLUtilities";
import Store from "./Store";

const template = (sections: string) => `
    <ul>
        ${sections}
    </ul>
`;

const sectionTemplate = (options: string) => `
    <li><ul>
        ${options}
    </ul></li>
`;

const optionTemplate = (className: string, label: string) => `
    <li><a href='#' class='${className}'>${label}</a></li>
`;

export default class BookSettings {
    private readonly store: Store;
    private readonly bookViews: BookView[];
    private viewLinks: { [key: string]: HTMLAnchorElement };
    private selectedView: BookView;
    private viewChangeCallback: () => void;
    private static readonly SELECTED_VIEW_KEY = "settings-selected-view";

    public static async create(bookViews: BookView[], store: Store) {
        const settings = new this(bookViews, store);
        await settings.initializeSelections();
        return settings;
    }

    protected constructor(bookViews: BookView[], store: Store) {
        this.bookViews = bookViews;
        this.store = store;
    }

    private async initializeSelections(): Promise<void> {
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

        if (this.bookViews.length > 1) {
            const options = this.bookViews.map(bookView =>
                optionTemplate(bookView.name, bookView.label)
            );
            sections.push(sectionTemplate(options.join("")));
        }

        element.innerHTML = template(sections.join(""));
        this.viewLinks = {};
        if (this.bookViews.length > 1) {
            for (const bookView of this.bookViews) {
                this.viewLinks[bookView.name] = HTMLUtilities.findRequiredElement(element, "a[class=" + bookView.name + "]") as HTMLAnchorElement;
            }
            this.updateViewLinks();
        }
        this.setupEvents();
    }

    public onViewChange(callback: () => void) {
        this.viewChangeCallback = callback;
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
                    if (this.viewChangeCallback) {
                        this.viewChangeCallback();
                    }
                    event.preventDefault();
                });
            }
        }
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

    public getSelectedView(): BookView {
        return this.selectedView;
    }

    private async storeSelectedView(view: BookView): Promise<void> {
        return this.store.set(BookSettings.SELECTED_VIEW_KEY, view.name);
    }
};