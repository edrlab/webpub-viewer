import BookView from "./BookView";
import HTMLView from "./HTMLView";

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

export default class BookSettings extends HTMLView {
    private bookViews: BookView[];
    private viewLinks: { [key: string]: HTMLAnchorElement };
    private selectedView: BookView;
    private viewChangeCallback: () => void;

    public constructor(bookViews: BookView[]) {
        super();
        this.bookViews = bookViews;
        if (this.bookViews.length >= 1) {
            this.selectedView = bookViews[0];
        }
    }

    public renderControls(element: HTMLElement): void {
        let sections = [];

        if (this.bookViews.length > 1) {
            let options = [];
            for (const bookView of this.bookViews) {
                options.push(optionTemplate(bookView.name, bookView.label));
            }
            sections.push(sectionTemplate(options.join("")));
        }

        element.innerHTML = template(sections.join(""));
        this.viewLinks = {};
        if (this.bookViews.length > 1) {
            for (const bookView of this.bookViews) {
                this.viewLinks[bookView.name] = this.findRequiredElement(element, "a[class=" + bookView.name + "]") as HTMLAnchorElement;
            }
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
                    if (this.viewChangeCallback()) {
                        this.viewChangeCallback();
                    }
                    event.preventDefault();
                });
            }
        }
    }

    public getSelectedView(): BookView {
        return this.selectedView;
    }
};