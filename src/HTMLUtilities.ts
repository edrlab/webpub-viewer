/** Returns a single element matching the selector within the parentElement,
    or null if no element matches. */
export function findElement(parentElement: Element | Document, selector: string): Element | null {
    return parentElement.querySelector(selector);
}

/** Returns a single element matching the selector within the parent element,
    or throws an exception if no element matches. */
export function findRequiredElement(parentElement: Element | Document, selector: string): Element {
    const element = findElement(parentElement, selector);
    if (!element) {
        throw "required element " + selector + " not found";
    } else {
        return element;
    }
}