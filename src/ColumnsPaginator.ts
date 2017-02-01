import Paginator from "./Paginator";

export default class ColumnsPaginator implements Paginator {
    private iframe: HTMLIFrameElement;

    public start(iframe: HTMLIFrameElement, position: number): Promise<void> {
        this.iframe = iframe;
        // any is necessary because CSSStyleDeclaration type does not include
        // all the vendor-prefixed attributes.
        let body = iframe.contentDocument.body as any;
        body.style.columnCount = 1;
        body.style.WebkitColumnCount = 1;
        body.style.MozColumnCount = 1;
        body.style.columnGap = 0;
        body.style.WebkitColumnGap = 0;
        body.style.MozColumnGap = 0;
        body.style.columnFill = "auto";
        body.style.WebkitColumnFill = "auto";
        body.style.MozColumnFill = "auto";
        body.style.overflow = "hidden";
        body.style.margin = "0";
        body.style.position = "relative";
        this.setSize();
        let viewportElement = document.createElement("meta");
        viewportElement.name = "viewport";
        viewportElement.content = "width=device-width, initial-scale=1, maximum-scale=1";
        let head = iframe.contentDocument.querySelector("head");
        if (head) {
            head.appendChild(viewportElement);
        }
        this.goToPosition(position);
        return new Promise<void>(resolve => resolve());
    }

    private setSize(): void {
        // any is necessary because CSSStyleDeclaration type does not include
        // all the vendor-prefixed attributes.
        let body = this.iframe.contentDocument.body as any;
        body.style.columnWidth = this.iframe.style.width;
        body.style.WebkitColumnWidth = this.iframe.style.width;
        body.style.MozColumnWidth = this.iframe.style.width;
        body.style.height = this.iframe.style.height;
        body.style.width = this.iframe.style.width;
    }

    /** Returns the total width of the columns that are currently
        positioned to the left of the iframe viewport. */
    private getLeftColumnsWidth(): number {
        return -(this.iframe.contentDocument.body.style.left || "0px").slice(0, -2);
    }

    /** Returns the total width of the columns that are currently
        positioned to the right of the iframe viewport. */
    private getRightColumnsWidth(): number {
        // scrollWidth includes the column in the iframe viewport as well as
        // columns to the right.
        let scrollWidth = this.iframe.contentDocument.body.scrollWidth;
        let width = this.getColumnWidth();
        return scrollWidth - width;
    }

    /** Returns the width of one column. */
    private getColumnWidth(): number {
        return this.iframe.contentDocument.body.offsetWidth;
    }

    /** Shifts the columns so that the specified width is positioned
        to the left of the iframe viewport. */
    private setLeftColumnsWidth(width: number) {
        this.iframe.contentDocument.body.style.left = -width + "px";
    }

    /** Returns number in range [0..1) representing the
        proportion of columns that are currently positioned
        to the left of the iframe viewport. */
    public getCurrentPosition(): number {
        let width = this.getColumnWidth();
        let leftWidth = this.getLeftColumnsWidth();
        let rightWidth = this.getRightColumnsWidth();
        let totalWidth = leftWidth + width + rightWidth;

        return leftWidth / totalWidth;
    }

    public onFirstPage(): boolean {
        let leftWidth = this.getLeftColumnsWidth();

        return (leftWidth <= 0);
    }

    public onLastPage(): boolean {
        let rightWidth = this.getRightColumnsWidth();

        return (rightWidth <= 0);
    }

    public goToPreviousPage(): void {
        let leftWidth = this.getLeftColumnsWidth();
        let width = this.getColumnWidth();

        this.setLeftColumnsWidth(leftWidth - width);
    }

    public goToNextPage(): void {
        let leftWidth = this.getLeftColumnsWidth();
        let width = this.getColumnWidth();

        this.setLeftColumnsWidth(leftWidth + width);
    }

    /** Goes to a position specified by a number in the range [0..1].
        The position should be a number as returned by getCurrentPosition,
        or 1 to go to the last page. The position will be rounded down so
        it matches the position of one of the columns. */
    /** @param position Number in range [0..1] */
    public goToPosition(position: number) {
        this.setSize();
        // If the window has changed size since the columns were set up,
        // we need to reset position so we can determine the new total width.
        this.setLeftColumnsWidth(0);

        let width = this.getColumnWidth();
        let rightWidth = this.getRightColumnsWidth();
        let totalWidth = width + rightWidth;

        let newLeftWidth = position * totalWidth;

        // Round the new left width so it's a multiple of the column width.

        let roundedLeftWidth = Math.floor(newLeftWidth / width) * width;
        if (roundedLeftWidth === totalWidth) {
            // We've gone too far and all the columns are off to the left.
            // Move one column back into the viewport.
            roundedLeftWidth = roundedLeftWidth - width;
        }
        this.setLeftColumnsWidth(roundedLeftWidth);
    }
}