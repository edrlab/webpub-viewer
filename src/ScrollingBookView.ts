import BookView from "./BookView";

export default class ScrollingBookView implements BookView {
    public readonly name = "scrolling-book-view";
    public readonly label = "Scrolling";

    public bookElement: HTMLIFrameElement;
    public sideMargin: number = 0;
    public height: number = 0;

    private setIFrameSize(): void {
        // Remove previous iframe height so body scroll height will be accurate.
        this.bookElement.style.height = "";
        this.bookElement.style.width = document.body.offsetWidth + "px";

        const body = this.bookElement.contentDocument.body;

        body.style.width = (document.body.offsetWidth - this.sideMargin * 2) + "px";
        body.style.marginLeft = this.sideMargin + "px";
        body.style.marginRight = this.sideMargin + "px";

        const minHeight = this.height;
        const bodyHeight = body.scrollHeight;
        this.bookElement.style.height = Math.max(minHeight, bodyHeight) + "px";
    }

    public start(position: number): void {
        this.goToPosition(position);
    }

    public stop(): void {
        this.bookElement.style.height = "";
        this.bookElement.style.width = "";

        const body = this.bookElement.contentDocument.body;
        body.style.width = "";
        body.style.marginLeft = "";
        body.style.marginRight = "";
    }

    public getCurrentPosition(): number {
        return document.body.scrollTop / document.body.scrollHeight;
    }

    public goToPosition(position: number) {
        this.setIFrameSize();
        document.body.scrollTop = document.body.scrollHeight * position;
    }

    public goToElement(elementId: string) {
        const element = this.bookElement.contentDocument.getElementById(elementId);
        if (element) {
            // Put the element as close to the top as possible.
            element.scrollIntoView();

            // Unless we're already at the bottom, scroll up so the element is
            // in the middle, and not covered by the top nav.
            if ((document.body.scrollHeight - element.offsetTop) >= this.height) {
                document.body.scrollTop = Math.max(0, document.body.scrollTop - this.height / 3);
            }
        }
    }
}
