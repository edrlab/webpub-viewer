import Paginator from "./Paginator";

export default class ColumnsPaginator implements Paginator {
    private iframe: HTMLIFrameElement;

    public start(iframe: HTMLIFrameElement, position: number): Promise<void> {
        this.iframe = iframe;
        let body = iframe.contentDocument.body as any;
        body.style.columnCount = 1;
        body.style.WebkitColumnCount = 1;
        body.style.MozColumnCount = 1;
        body.style.columnGap = 0;
        body.style.WebkitColumnGap = 0;
        body.style.MozColumnGap = 0;
        body.style.columnWidth = iframe.style.width;
        body.style.WebkitColumnWidth = iframe.style.width;
        body.style.MozColumnWidth = iframe.style.width;
        body.style.columnFill = "auto";
        body.style.WebkitColumnFill = "auto";
        body.style.MozColumnFill = "auto";
        body.style.height = iframe.style.height;
        body.style.width = iframe.style.width;
        body.style.overflow = "hidden";
        body.style.margin = "0";
        body.style.position = "relative";
        let viewportElement = document.createElement("meta");
        viewportElement.name = "viewport";
        viewportElement.content = "width=device-width, initial-scale=1, maximum-scale=1";
        (iframe.contentDocument.querySelector("head") as any).appendChild(viewportElement);
        this.goToPosition(position);
        return new Promise<void>(resolve => resolve());
    }

    public getCurrentPosition(): number {
        let position = -(this.iframe.contentDocument.body.style.left as any).slice(0, -2);
        let scrollWidth = this.iframe.contentDocument.body.scrollWidth;
        let width = this.iframe.contentDocument.body.offsetWidth;
        let maxPosition = position + scrollWidth - width;
        return position / maxPosition;
    }

    public onFirstPage(): boolean {
        let position = -(this.iframe.contentDocument.body.style.left as any).slice(0, -2);
        let width = this.iframe.contentDocument.body.offsetWidth;
        return (width > position);
    }

    public onLastPage(): boolean {
        let width = this.iframe.contentDocument.body.offsetWidth;
        let scrollWidth = this.iframe.contentDocument.body.scrollWidth;
        return (width >= scrollWidth);
    }

    public goToPreviousPage(): void {
        let position = -(this.iframe.contentDocument.body.style.left as any).slice(0, -2);
        let width = this.iframe.contentDocument.body.offsetWidth;
        let newPosition = position - width;
        this.iframe.contentDocument.body.style.left = -newPosition + "px";
    }

    public goToNextPage(): void {
        let position = -(this.iframe.contentDocument.body.style.left as any).slice(0, -2);
        let width = this.iframe.contentDocument.body.offsetWidth;
        let newPosition = position + width;
        this.iframe.contentDocument.body.style.left = -newPosition + "px";
    }

    public goToPosition(position: number) {
        let oldPosition = -(this.iframe.contentDocument.body.style.left as any).slice(0, -2);
        let scrollWidth = this.iframe.contentDocument.body.scrollWidth;
        let width = this.iframe.contentDocument.body.offsetWidth;
        let maxPosition = oldPosition + scrollWidth - width;
        let newPosition = position * maxPosition;
        let roundedPosition = Math.floor(newPosition / width) * width;
        this.iframe.contentDocument.body.style.left = -roundedPosition + "px";
    }
}