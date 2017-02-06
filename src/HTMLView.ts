export default class HTMLView {
    protected findElement(parentElement: Element, selector: string): Element | null {
        return parentElement.querySelector(selector);
    }

    protected findRequiredElement(parentElement: Element, selector: string): Element {
        const element = this.findElement(parentElement, selector);
        if (!element) {
            throw "required element " + selector + " not found";
        } else {
            return element;
        }
    }
}