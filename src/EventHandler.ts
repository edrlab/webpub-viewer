export default class EventHandler {
    private pendingMouseEventStart: MouseEvent | null;
    private pendingMouseEventEnd: MouseEvent | null;
    private pendingTouchEventStart: TouchEvent | null;
    private pendingTouchEventEnd: TouchEvent | null;

    public onLeftTap: (event: UIEvent) => void = () => {};
    public onMiddleTap: (event: UIEvent) => void = () => {};
    public onRightTap: (event: UIEvent) => void = () => {};
    public onBackwardSwipe: (event: UIEvent) => void = () => {};
    public onForwardSwipe: (event: UIEvent) => void = () => {};

    public onLeftHover: () => void = () => {};
    public onRightHover: () => void = () => {};
    public onRemoveHover: () => void = () => {};

    public constructor() {
        this.pendingMouseEventStart = null;
        this.pendingMouseEventEnd = null;
        this.pendingTouchEventStart = null;
        this.pendingTouchEventEnd = null;
    }

    public setupEvents(element: HTMLElement | Document) {
        if (this.isTouchDevice()) {
            element.addEventListener("touchstart", this.handleTouchEventStart.bind(this));
            element.addEventListener("touchend", this.handleTouchEventEnd.bind(this));
        } else {
            element.addEventListener("mousedown", this.handleMouseEventStart.bind(this));
            element.addEventListener("mouseup", this.handleMouseEventEnd.bind(this));
            element.addEventListener("mouseenter", this.handleMouseMove.bind(this));
            element.addEventListener("mousemove", this.handleMouseMove.bind(this));
            element.addEventListener("mouseleave", this.handleMouseLeave.bind(this));
        }
    }

    private isTouchDevice() {
        return !!('ontouchstart' in window || navigator.maxTouchPoints);
    }

    private handleMouseEventStart = (event: MouseEvent): void => {
        this.pendingMouseEventStart = event;
    }

    private handleTouchEventStart = (event: TouchEvent): void => {
        if (event.changedTouches.length !== 1) {
            // This is a multi-touch event. Ignore.
            return;
        }

        this.pendingTouchEventStart = event;
    }

    private handleMouseEventEnd = (event: MouseEvent): void => {
        if (!this.pendingMouseEventStart) {
            // Somehow we got an end event without a start event. Ignore it.
            return;
        }

        const width = window.innerWidth;
        const height = window.innerHeight;

        const relativeXDistance = (this.pendingMouseEventStart.clientX - event.clientX) / width;
        const relativeYDistance = (this.pendingMouseEventStart.clientY - event.clientY) / height;

        // Is the end event in the same place as the start event?
        if (Math.abs(relativeXDistance) < 0.1 && Math.abs(relativeYDistance) < 0.1) {
            if (this.pendingMouseEventEnd) {
                // This was a double click. Let the browser handle it.
                this.pendingMouseEventStart = null;
                this.pendingMouseEventEnd = null;
                return;
            }

            // This was a single click.
            this.pendingMouseEventStart = null;
            this.pendingMouseEventEnd = event;
            setTimeout(this.handleClick, 200);
            return;
        }

        this.pendingMouseEventEnd = null;

        // This is a swipe or highlight. Let the browser handle it.
        // (Swipes aren't handled on desktop.)
        this.pendingMouseEventStart = null;
    }

    private handleTouchEventEnd = (event: TouchEvent): void => {
        if (event.changedTouches.length !== 1) {
            // This is a multi-touch event. Ignore.
            return;
        }

        if (!this.pendingTouchEventStart) {
            // Somehow we got an end event without a start event. Ignore it.
            return;
        }

        const width = window.innerWidth;
        const height = window.innerHeight;

        const startTouch = this.pendingTouchEventStart.changedTouches[0];
        const endTouch = event.changedTouches[0];

        if (!startTouch) {
            // Somehow we saved a touch event with no touches.
            return;
        }

        const relativeXDistance = (startTouch.clientX - endTouch.clientX) / width;
        const relativeYDistance = (startTouch.clientY - endTouch.clientY) / height;

        // Is the end event in the same place as the start event?
        if (Math.abs(relativeXDistance) < 0.1 && Math.abs(relativeYDistance) < 0.1) {
            if (this.pendingTouchEventEnd) {
                // This was a double tap. Let the browser handle it.
                this.pendingTouchEventStart = null;
                this.pendingTouchEventEnd = null;
                return;
            }

            // This was a single tap or long press.
            if (event.timeStamp - this.pendingTouchEventStart.timeStamp > 500) {
                // This was a long press. Let the browser handle it.
                this.pendingTouchEventStart = null;
                this.pendingTouchEventEnd = null;
                return;
            }

            // This was a single tap.
            this.pendingTouchEventStart = null;
            this.pendingTouchEventEnd = event;
            setTimeout(this.handleTap, 200);
            return;
        }

        this.pendingTouchEventEnd = null;

        if (event.timeStamp - this.pendingTouchEventStart.timeStamp > 500) {
            // This is a slow swipe / highlight. Let the browser handle it.
            this.pendingTouchEventStart = null;
            return;
        }

        // This is a swipe. 
        const slope = (startTouch.clientY - endTouch.clientY) / (startTouch.clientX - endTouch.clientX);
        if (Math.abs(slope) > 0.5) {
            // This is a mostly vertical swipe. Ignore.
            this.pendingTouchEventStart = null;
            return;
        }

        // This was a horizontal swipe.
        if (relativeXDistance < 0) {
            this.onBackwardSwipe(event);
        } else {
            this.onForwardSwipe(event);
        }
        this.pendingTouchEventStart = null;
    }

    private handleClick = (): void => {
        if (!this.pendingMouseEventEnd) {
            // Another click happened already.
            return;
        }

        if (this.checkForLink(this.pendingMouseEventEnd)) {
            // This was a single click on a link. Do nothing.
            this.pendingMouseEventEnd = null;
            return;
        }

        // This was a single click.
        const x = this.pendingMouseEventEnd.clientX;
        const width = window.innerWidth;
        if (x / width < 0.3) {
            this.onLeftTap(this.pendingMouseEventEnd);
        } else if (x / width > 0.7) {
            this.onRightTap(this.pendingMouseEventEnd);
        } else {
            this.onMiddleTap(this.pendingMouseEventEnd);
        }
        this.pendingMouseEventEnd = null;
        return;
    }

    private handleTap = (): void => {
        if (!this.pendingTouchEventEnd) {
            // Another tap happened already.
            return;
        }

        if (this.checkForLink(this.pendingTouchEventEnd)) {
            // This was a single tap on a link. Do nothing.
            this.pendingTouchEventEnd = null;
            return;
        }

        // This was a single tap.
        const touch = this.pendingTouchEventEnd.changedTouches[0];
        if (!touch) {
            // Somehow we got a touch event with no touches.
            return;
        }

        const x = touch.clientX;
        const width = window.innerWidth;
        if (x / width < 0.3) {
            this.onLeftTap(this.pendingTouchEventEnd);
        } else if (x / width > 0.7) {
            this.onRightTap(this.pendingTouchEventEnd);
        } else {
            this.onMiddleTap(this.pendingTouchEventEnd);
        }
        this.pendingTouchEventEnd = null;
        return;
    }

    private checkForLink = (event: MouseEvent | TouchEvent): boolean => {
        let nextElement = event.target as Element;
        while (nextElement && nextElement.tagName.toLowerCase() !== "body") {
            if (nextElement.tagName.toLowerCase() === "a") {
                return true;
            } else {
                nextElement = nextElement.parentElement;
            }
        }
        return false;
    }

    private handleMouseMove = (event: MouseEvent): void => {
        const x = event.clientX;
        const width = window.innerWidth;
        if (x / width < 0.3) {
            this.onLeftHover();
        } else if (x / width > 0.7) {
            this.onRightHover();
        } else {
            this.onRemoveHover();
        }
    }

    private handleMouseLeave = (): void => {
        this.onRemoveHover();
    }
}