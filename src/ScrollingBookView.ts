import BookView from "./BookView";

export default class ScrollingBookView implements BookView {
    private iframe: HTMLIFrameElement;
    private topMargin: number = 0;

    public name = "scrolling-book-view";
    public label = "Scrolling View";

    public setBookElement(iframe: HTMLIFrameElement): void {
        this.iframe = iframe;
    }

    public setTopMargin(topMargin: number): void {
        this.topMargin = topMargin;
    }

    private setIFrameSize(): void {
        // Remove previous iframe height so body scroll height will be accurate.
        this.iframe.style.height = "";

        const minHeight = (window.innerHeight - this.topMargin);
        const bodyHeight = this.iframe.contentDocument.body.scrollHeight;
        this.iframe.style.height = Math.max(minHeight, bodyHeight) + "px";
        this.iframe.style.marginTop = this.topMargin + "px";
        this.iframe.style.width = document.body.offsetWidth + "px";
    }

    public start(position: number): void {
        this.goToPosition(position);
    }

    public stop(): void {
        this.iframe.style.height = "";
        this.iframe.style.marginTop = "0px";
        this.iframe.style.width = "";
    }

    public getCurrentPosition(): number {
        return document.body.scrollTop / document.body.scrollHeight;
    }

    public goToPosition(position: number) {
        this.setIFrameSize();
        document.body.scrollTop = document.body.scrollHeight * position;
    }
}