import BookView from "./BookView";
import * as BrowserUtilities from "./BrowserUtilities";
import * as HTMLUtilities from "./HTMLUtilities";

export default class ScrollingBookView implements BookView {
    public readonly name = "scrolling-book-view";
    public readonly label = "Scrolling";

    public bookElement: HTMLIFrameElement;
    public sideMargin: number = 0;
    public height: number = 0;

    private setIFrameSize(): void {
        // Remove previous iframe height so body scroll height will be accurate.
        this.bookElement.style.height = "";
        this.bookElement.style.width = BrowserUtilities.getWidth() + "px";

        const body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body") as HTMLBodyElement;

        const width = (BrowserUtilities.getWidth() - this.sideMargin * 2) + "px";
        body.style.width = width;
        body.style.marginLeft = this.sideMargin + "px";
        body.style.marginRight = this.sideMargin + "px";

        const minHeight = this.height;
        const bodyHeight = body.scrollHeight;
        this.bookElement.style.height = Math.max(minHeight, bodyHeight) + "px";

        const images = Array.prototype.slice.call(body.querySelectorAll("img"));
        for (const image of images) {
            image.style.maxWidth = width;
        }
    }

    public start(position: number): void {
        this.goToPosition(position);
    }

    public stop(): void {
        this.bookElement.style.height = "";
        this.bookElement.style.width = "";

        const body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body") as HTMLBodyElement;
        body.style.width = "";
        body.style.marginLeft = "";
        body.style.marginRight = "";

        const images = Array.prototype.slice.call(body.querySelectorAll("img"));
        for (const image of images) {
            image.style.maxWidth = "";
        }
    }

    public getCurrentPosition(): number {
        return document.body.scrollTop / document.body.scrollHeight;
    }

    public atBottom(): boolean {
        return (document.body.scrollHeight - document.body.scrollTop) === BrowserUtilities.getHeight();
    }

    public goToPosition(position: number) {
        this.setIFrameSize();
        document.body.scrollTop = document.body.scrollHeight * position;
    }

    public goToElement(elementId: string) {
        const element = (this.bookElement.contentDocument as any).getElementById(elementId);
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
