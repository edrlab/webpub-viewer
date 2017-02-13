import BookView from "./BookView";

export default class ScrollingBookView implements BookView {
    private iframe: HTMLIFrameElement;

    public name = "scrolling-book-view";
    public label = "Scrolling View";

    public setBookElement(iframe: HTMLIFrameElement): void {
        this.iframe = iframe;
    }

    public start(position: number): void {
        this.goToPosition(position);
    }

    public stop(): void {}

    public getCurrentPosition(): number {
        const body = this.iframe.contentDocument.body;
        return body.scrollTop / body.scrollHeight;
    }

    public goToPosition(position: number) {
        const body = this.iframe.contentDocument.body;
        body.scrollTop = body.scrollHeight * position;
    }
}