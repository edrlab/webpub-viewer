import BookView from "./BookView";

export default class ScrollingBookView implements BookView {
    public readonly name = "scrolling-book-view";
    public readonly label = "Scrolling View";

    public bookElement: HTMLIFrameElement;
    public sideMargin: number = 0;

    private setIFrameSize(): void {
        // Remove previous iframe height so body scroll height will be accurate.
        this.bookElement.style.height = "";

        const marginTop = parseInt((this.bookElement.style.marginTop || "0px").slice(0, -2));
        const marginBottom = parseInt((this.bookElement.style.marginBottom || "0px").slice(0, -2));

        this.bookElement.style.width = (document.body.offsetWidth - this.sideMargin * 2) + "px";
        this.bookElement.style.marginLeft = this.sideMargin + "px";
        this.bookElement.style.marginRight = this.sideMargin + "px";

        const minHeight = (window.innerHeight - marginTop - marginBottom);
        const bodyHeight = this.bookElement.contentDocument.body.scrollHeight;
        this.bookElement.style.height = Math.max(minHeight, bodyHeight) + "px";
    }

    public start(position: number): void {
        this.goToPosition(position);
    }

    public stop(): void {
        this.bookElement.style.height = "";
        this.bookElement.style.width = "";
        this.bookElement.style.marginLeft = "";
        this.bookElement.style.marginRight = "";
    }

    public getCurrentPosition(): number {
        return document.body.scrollTop / document.body.scrollHeight;
    }

    public goToPosition(position: number) {
        this.setIFrameSize();
        document.body.scrollTop = document.body.scrollHeight * position;
    }
}