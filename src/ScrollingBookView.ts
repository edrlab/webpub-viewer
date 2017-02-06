import BookView from "./BookView";

export default class ScrollingBookView implements BookView {
    private iframe: HTMLIFrameElement;

    public name = "scrolling-book-view";
    public label = "Scrolling View";

    public start(iframe: HTMLIFrameElement, position: number): Promise<void> {
        this.iframe = iframe;
        this.goToPosition(position);
        return new Promise<void>(resolve => resolve());
    }

    public stop(): Promise<void> {
        return new Promise<void>(resolve => resolve());
    }

    public getCurrentPosition(): number {
        const body = this.iframe.contentDocument.body;
        return body.scrollTop / body.scrollHeight;
    }

    public goToPosition(position: number) {
        const body = this.iframe.contentDocument.body;
        body.scrollTop = body.scrollHeight * position;
    }
}