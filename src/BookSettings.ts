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
    private bookElement: Element;
    private viewLinks: { [key: string]: HTMLAnchorElement };
    private selectedView: BookView;
    private onViewChange: () => void;

    private render(): string {
        let sections = [];

        if (this.bookViews.length > 1) {
            let options = [];
            for (const bookView of this.bookViews) {
                options.push(optionTemplate(bookView.name, bookView.label));
            }
            sections.push(sectionTemplate(options.join("")));
        }

        return template(sections.join(""));
    }

    public start(controlsElement: HTMLElement, bookElement: Element, bookViews: BookView[], selectedView: BookView, onViewChange: () => void): void {
        this.bookElement = bookElement;
        this.bookViews = bookViews;
        controlsElement.innerHTML = this.render();
        this.viewLinks = {};;
        for (const bookView of this.bookViews) {
            this.viewLinks[bookView.name] = this.findRequiredElement(controlsElement, "a[class=" + bookView.name + "]") as HTMLAnchorElement;
        }

        this.setupEvents();
        this.selectedView = selectedView;
        this.onViewChange = onViewChange;
        this.onViewChange();
    }

    private setupEvents(): void {
        for (const view of this.bookViews) {
            const link = this.viewLinks[view.name];
            if (link) {
                link.addEventListener("click", (event: MouseEvent) => {
                    const position = this.selectedView.getCurrentPosition();
                    this.selectedView.stop();
                    view.start(this.bookElement, position);
                    this.selectedView = view;
                    this.onViewChange();
                    event.preventDefault();
                });
            }
        }
    }

    public getSelectedView(): BookView {
        return this.selectedView;
    }
};