import PaginatedBookView from "./PaginatedBookView";
import * as HTMLUtilities from "./HTMLUtilities";
import * as BrowserUtilities from "./BrowserUtilities";

export default class ColumnsPaginatedBookView implements PaginatedBookView {
    public readonly name = "columns-paginated-view";
    public readonly label = "Paginated";

    public bookElement: HTMLIFrameElement;
    public sideMargin: number = 0;
    public height: number = 0;

    protected hasFixedScrollWidth: boolean = false;

    public start(position: number): void {
        // any is necessary because CSSStyleDeclaration type does not include
        // all the vendor-prefixed attributes.
        const body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body") as any;
        body.style.webkitColumnCount = "1";
        body.style.MozColumnCount = "1";
        body.style.columnCount = "1";
        body.style.webkitColumnFill = "auto";
        body.style.MozColumnFill = "auto";
        body.style.columnFill = "auto";
        body.style.overflow = "hidden";
        body.style.position = "relative";
        body.style.webkitFontSmoothing = "subpixel-antialiased";
        this.setSize();
        const viewportElement = document.createElement("meta");
        viewportElement.name = "viewport";
        viewportElement.content = "width=device-width, initial-scale=1, maximum-scale=1";
        const head = HTMLUtilities.findIframeElement(this.bookElement.contentDocument, "head");
        if (head) {
            head.appendChild(viewportElement);
        }

        this.checkForFixedScrollWidth();

        this.goToPosition(position);

        // This is delayed to prevent a bug in iOS 10.3 that causes
        // the top links to be displayed in the middle of the page.
        setTimeout(() => {
            document.body.style.overflow = "hidden";
            // This prevents overscroll/bouncing on iOS.
            document.body.style.position = "fixed";
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.top = "0";
            document.body.style.bottom = "0";
        }, 0);
    }

    protected checkForFixedScrollWidth(): void {
        // Determine if the scroll width changes when the left position
        // changes. This differs across browsers and sometimes across
        // books in the same browser.
        const body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body") as any;
        const originalLeft = (body.style.left || "0px").slice(0, -2);
        const originalScrollWidth = body.scrollWidth;
        body.style.left = (originalLeft - 1) + "px";
        this.hasFixedScrollWidth = (body.scrollWidth === originalScrollWidth);
        body.style.left = originalLeft + "px";
    }

    private setSize(): void {
        // any is necessary because CSSStyleDeclaration type does not include
        // all the vendor-prefixed attributes.
        const body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body") as any;

        const width = (BrowserUtilities.getWidth() - this.sideMargin * 2) + "px";
        body.style.columnWidth = width;
        body.style.webkitColumnWidth = width;
        body.style.MozColumnWidth = width;
        body.style.columnGap = this.sideMargin * 2 + "px";
        body.style.webkitColumnGap = this.sideMargin * 2 + "px";
        body.style.MozColumnGap = this.sideMargin * 2 + "px";
        body.style.height = this.height + "px";
        body.style.width = width;
        body.style.marginLeft = this.sideMargin + "px";
        body.style.marginRight = this.sideMargin + "px";
        body.style.marginTop = "0px";
        body.style.marginBottom = "0px";
        (this.bookElement.contentDocument as any).documentElement.style.height = this.height + "px";
        this.bookElement.style.height = this.height + "px";
        this.bookElement.style.width = BrowserUtilities.getWidth() + "px";

        const images = body.querySelectorAll("img");
        for (const image of images) {
            image.style.maxWidth = "100%";

            // Determine how much vertical space there is for the image.
            let nextElement = image;
            let totalMargins = 0;
            while (nextElement !== body) {
                const computedStyle = window.getComputedStyle(nextElement);
                if (computedStyle.marginTop) {
                    totalMargins += parseInt(computedStyle.marginTop.slice(0, -2), 10)
                }
                if (computedStyle.marginBottom) {
                    totalMargins += parseInt(computedStyle.marginBottom.slice(0, -2), 10)
                }
                nextElement = nextElement.parentElement;
            }
            image.style.maxHeight = (this.height - totalMargins) + "px";

            // Without this, an image at the end of a resource can end up
            // with an extra empty column after it.
            image.style.verticalAlign = "top";
        }
    }

    public stop(): void {
        document.body.style.overflow = "auto";
        document.body.style.position = "static";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.top = "";
        document.body.style.bottom = "";

        const body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body") as any;
        body.style.columnCount = "";
        body.style.webkitColumnCount = "";
        body.style.MozColumnCount = "";
        body.style.columnGap = "";
        body.style.webkitColumnGap = "";
        body.style.MozColumnGap = "";
        body.style.columnFill = "";
        body.style.webkitColumnFill = "";
        body.style.MozColumnFill = "";
        body.style.overflow = "";
        body.style.position = "";
        body.style.webkitFontSmoothing = "";
        body.style.columnWidth = "";
        body.style.webkitColumnWidth = "";
        body.style.MozColumnWidth = "";
        body.style.height = "";
        body.style.width = "";
        body.style.marginLeft = "";
        body.style.marginRight = "";
        body.style.marginTop = "";
        body.style.marginBottom = "";
        (this.bookElement.contentDocument as any).documentElement.style.height = "";
        this.bookElement.style.height = "";
        this.bookElement.style.width = "";

        const images = body.querySelectorAll("img");
        for (const image of images) {
            image.style.maxWidth = "";
            image.style.maxHeight = "";
            image.style.display = "";
            image.style.marginLeft = "";
            image.style.marginRight = "";
        }
    }

    /** Returns the total width of the columns that are currently
        positioned to the left of the iframe viewport. */
    private getLeftColumnsWidth(): number {
        const body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body") as HTMLBodyElement;

        const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
        const isXML = this.bookElement.src.indexOf(".xml") !== -1;
        if (isFirefox && isXML) {
            // Feedbooks epubs have resources with .xml file extensions for historical
            // reasons. Firefox handles these differently than XHTML files, and setting
            // a left position as well as overflow:hidden causes the pages to be blank.
            return body.scrollLeft;
        }

        return -(body.style.left || "0px").slice(0, -2);
    }

    /** Returns the total width of the columns that are currently
        positioned to the right of the iframe viewport. */
    private getRightColumnsWidth(): number {
        // scrollWidth includes the column in the iframe viewport as well as
        // columns to the right.
        const body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body") as HTMLBodyElement;
        const scrollWidth = body.scrollWidth;
        const width = this.getColumnWidth();
        let rightWidth = scrollWidth + this.sideMargin - width;
        if (this.hasFixedScrollWidth) {
            // In some browsers (IE and Firefox with certain books), 
            // scrollWidth doesn't change when some columns
            // are off to the left, so we need to subtract them.
            const leftWidth = this.getLeftColumnsWidth();
            rightWidth = Math.max(0, rightWidth - leftWidth);
        }
        
        if (rightWidth === this.sideMargin) {
            return 0;
        } else {
            return rightWidth;
        }
    }

    /** Returns the width of one column. */
    private getColumnWidth(): number {
        const body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body") as HTMLBodyElement;
        return body.offsetWidth + this.sideMargin * 2;
    }

    /** Shifts the columns so that the specified width is positioned
        to the left of the iframe viewport. */
    private setLeftColumnsWidth(width: number) {
        const body = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "body") as HTMLBodyElement;

        const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
        const isXML = this.bookElement.src.indexOf(".xml") !== -1;
        if (isFirefox && isXML) {
            // Feedbooks epubs have resources with .xml file extensions for historical
            // reasons. Firefox handles these differently than XHTML files, and setting
            // a left position as well as overflow:hidden causes the pages to be blank.
            body.scrollLeft = width;
        } else {
            body.style.left = -width + "px";
        }
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

        let roundedLeftWidth = Math.round(newLeftWidth / width) * width;
        if (roundedLeftWidth >= totalWidth) {
            // We've gone too far and all the columns are off to the left.
            // Move one column back into the viewport.
            roundedLeftWidth = roundedLeftWidth - width;
        }
        this.setLeftColumnsWidth(roundedLeftWidth);
    }

    public goToElement(elementId: string, relative?: boolean) {
        const element = (this.bookElement.contentDocument as any).getElementById(elementId);
        if (element) {
            // Get the element's position in the iframe, and
            // round that to figure out the column it's in.

            // There is a bug in Safari when using getBoundingClientRect
            // on an element that spans multiple columns. Temporarily
            // set the element's height to fit it on one column so we
            // can determine the first column position.
            const originalHeight = element.style.height;
            element.style.height = "0";

            const left = element.getBoundingClientRect().left;
            const width = this.getColumnWidth();
            let roundedLeftWidth = Math.floor(left / width) * width;
            if (relative) {
                const origin = this.getLeftColumnsWidth();
                roundedLeftWidth = (Math.floor(left / width) * width) + origin;
            }

            // Restore element's original height.
            element.style.height = originalHeight;

            this.setLeftColumnsWidth(roundedLeftWidth);
        }
    }
}
