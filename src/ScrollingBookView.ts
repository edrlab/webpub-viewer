import BookView from "./BookView";

export default class ScrollingBookView implements BookView {
    private iframe: HTMLIFrameElement;
    private sideMargin: number = 0;

    public readonly name = "scrolling-book-view";
    public readonly label = "Scrolling View";

    public setBookElement(iframe: HTMLIFrameElement): void {
        this.iframe = iframe;
    }

    public setSideMargin(margin: number) {
        this.sideMargin = margin;
    }

    private setIFrameSize(): void {
        // Remove previous iframe height so body scroll height will be accurate.
        this.iframe.style.height = "";

        const marginTop = parseInt((this.iframe.style.marginTop || "0px").slice(0, -2));

        this.iframe.style.width = (document.body.offsetWidth - this.sideMargin * 2) + "px";
        this.iframe.style.marginLeft = this.sideMargin + "px";
        this.iframe.style.marginRight = this.sideMargin + "px";

        const minHeight = (window.innerHeight - marginTop);
        const bodyHeight = this.iframe.contentDocument.body.scrollHeight;
        this.iframe.style.height = Math.max(minHeight, bodyHeight) + "px";
    }

    public start(position: number): void {
        this.goToPosition(position);
    }

    public stop(): void {
        this.iframe.style.height = "";
        this.iframe.style.width = "";
        this.iframe.style.marginLeft = "";
        this.iframe.style.marginRight = "";
    }

    public getCurrentPosition(): number {
        return document.body.scrollTop / document.body.scrollHeight;
    }

    public goToPosition(position: number) {
        this.setIFrameSize();
        document.body.scrollTop = document.body.scrollHeight * position;
    }
}