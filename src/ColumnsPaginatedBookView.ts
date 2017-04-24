import PaginatedBookView from "./PaginatedBookView";

export default class ColumnsPaginatedBookView implements PaginatedBookView {
    public readonly name = "columns-paginated-view";
    public readonly label = "Paginated";

    public bookElement: HTMLIFrameElement;
    public sideMargin: number = 0;
    public height: number = 0;

    public start(position: number): void {
        document.body.style.overflow = "hidden";
        // This prevents overscroll/bouncing on iOS.
        document.body.style.position = "fixed";
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.top = "0";
        document.body.style.bottom = "0";

        // any is necessary because CSSStyleDeclaration type does not include
        // all the vendor-prefixed attributes.
        const body = this.bookElement.contentDocument.body as any;
        body.style.columnCount = 1;
        body.style.WebkitColumnCount = 1;
        body.style.MozColumnCount = 1;
        body.style.columnFill = "auto";
        body.style.WebkitColumnFill = "auto";
        body.style.MozColumnFill = "auto";
        body.style.overflow = "hidden";
        body.style.position = "relative";
        this.setSize();
        const viewportElement = document.createElement("meta");
        viewportElement.name = "viewport";
        viewportElement.content = "width=device-width, initial-scale=1, maximum-scale=1";
        const head = this.bookElement.contentDocument.querySelector("head");
        if (head) {
            head.appendChild(viewportElement);
        }
        this.goToPosition(position);
    }

    private setSize(): void {
        // any is necessary because CSSStyleDeclaration type does not include
        // all the vendor-prefixed attributes.
        const body = this.bookElement.contentDocument.body as any;

        const width = (document.body.offsetWidth - this.sideMargin * 2) + "px"
        body.style.columnWidth = width;
        body.style.WebkitColumnWidth = width;
        body.style.MozColumnWidth = width;
        body.style.columnGap = this.sideMargin * 2 + "px";
        body.style.WebkitColumnGap = this.sideMargin * 2 + "px";
        body.style.MozColumnGap = this.sideMargin * 2 + "px";
        body.style.height = this.height + "px";
        body.style.width = width;
        body.style.marginLeft = this.sideMargin + "px";
        body.style.marginRight = this.sideMargin + "px";
        this.bookElement.style.height = this.height + "px";
        this.bookElement.style.width = document.body.offsetWidth + "px";

        const images = body.querySelectorAll("img");
        for (const image of images) {
            image.style.maxWidth = width;
            image.style.maxHeight = this.height + "px";
        }
    }

    public stop(): void {
        document.body.style.overflow = "scroll";
        document.body.style.position = "static";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.top = "";
        document.body.style.bottom = "";

        const body = this.bookElement.contentDocument.body as any;
        body.style.columnCount = "";
        body.style.WebkitColumnCount = "";
        body.style.MozColumnCount = "";
        body.style.columnGap = "";
        body.style.WebkitColumnGap = "";
        body.style.MozColumnGap = "";
        body.style.columnFill = "";
        body.style.WebkitColumnFill = "";
        body.style.MozColumnFill = "";
        body.style.overflow = "";
        body.style.position = "";
        body.style.columnWidth = "";
        body.style.WebkitColumnWidth = "";
        body.style.MozColumnWidth = "";
        body.style.height = "";
        body.style.width = "";
        body.style.marginLeft = "";
        body.style.marginRight = "";
        this.bookElement.style.height = "";
        this.bookElement.style.width = "";
    }

    /** Returns the total width of the columns that are currently
        positioned to the left of the iframe viewport. */
    private getLeftColumnsWidth(): number {
        return -(this.bookElement.contentDocument.body.style.left || "0px").slice(0, -2);
    }

    /** Returns the total width of the columns that are currently
        positioned to the right of the iframe viewport. */
    private getRightColumnsWidth(): number {
        // scrollWidth includes the column in the iframe viewport as well as
        // columns to the right.
        const scrollWidth = this.bookElement.contentDocument.body.scrollWidth;
        const width = this.getColumnWidth();
        const rightWidth = scrollWidth + this.sideMargin - width;
        if (rightWidth === this.sideMargin) {
            return 0;
        } else {
            return rightWidth;
        }
    }

    /** Returns the width of one column. */
    private getColumnWidth(): number {
        return this.bookElement.contentDocument.body.offsetWidth + this.sideMargin * 2;
    }

    /** Shifts the columns so that the specified width is positioned
        to the left of the iframe viewport. */
    private setLeftColumnsWidth(width: number) {
        this.bookElement.contentDocument.body.style.left = -width + "px";
    }

    /** Returns number in range [0..1) representing the
        proportion of columns that are currently positioned
        to the left of the iframe viewport. */
    public getCurrentPosition(): number {
        const width = this.getColumnWidth();
        const leftWidth = this.getLeftColumnsWidth();
        const rightWidth = this.getRightColumnsWidth();
        const totalWidth = leftWidth + width + rightWidth;

        return leftWidth / totalWidth;
    }

    /** Returns the current 1-indexed page number. */
    public getCurrentPage(): number {
        return this.getCurrentPosition() * this.getPageCount() + 1;
    }

    /** Returns the total number of pages. */
    public getPageCount(): number {
        const width = this.getColumnWidth();
        const leftWidth = this.getLeftColumnsWidth();
        const rightWidth = this.getRightColumnsWidth();
        const totalWidth = leftWidth + width + rightWidth;
        return totalWidth / width;
    }

    public onFirstPage(): boolean {
        const leftWidth = this.getLeftColumnsWidth();

        return (leftWidth <= 0);
    }

    public onLastPage(): boolean {
        const rightWidth = this.getRightColumnsWidth();

        return (rightWidth <= 0);
    }

    public goToPreviousPage(): void {
        const leftWidth = this.getLeftColumnsWidth();
        const width = this.getColumnWidth();

        this.setLeftColumnsWidth(leftWidth - width);
    }

    public goToNextPage(): void {
        const leftWidth = this.getLeftColumnsWidth();
        const width = this.getColumnWidth();

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

        const width = this.getColumnWidth();
        const rightWidth = this.getRightColumnsWidth();
        const totalWidth = width + rightWidth;

        const newLeftWidth = position * totalWidth;

        // Round the new left width so it's a multiple of the column width.

        let roundedLeftWidth = Math.floor(newLeftWidth / width) * width;
        if (roundedLeftWidth === totalWidth) {
            // We've gone too far and all the columns are off to the left.
            // Move one column back into the viewport.
            roundedLeftWidth = roundedLeftWidth - width;
        }
        this.setLeftColumnsWidth(roundedLeftWidth);
    }

    public goToElement(elementId: string) {
        const element = this.bookElement.contentDocument.getElementById(elementId);
        if (element) {
            // Get the element's position in the iframe, and
            // round that to figure out the column it's in.

            const left = element.getBoundingClientRect().left;
            const width = this.getColumnWidth();
            const roundedLeftWidth = Math.floor(left / width) * width;
            this.setLeftColumnsWidth(roundedLeftWidth);
        }
    }
}
