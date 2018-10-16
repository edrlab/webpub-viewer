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

/** Returns a single element matching the selector within the parentElement in the iframe context,
    or null if no element matches. */
export function findIframeElement(parentElement: Document | null, selector: string): Element | null {
    if (parentElement === null) {
        throw "parent element is null"
    } else {
        return parentElement.querySelector(selector);
    }
}
    
/** Returns a single element matching the selector within the parent element in an iframe context,
        or throws an exception if no element matches. */
export function findRequiredIframeElement(parentElement: Document | null, selector: string): Element {
    const element = findIframeElement(parentElement, selector);
    if (!element) {
        throw "required element " + selector + " not found in iframe";
    } else {
        return element;
    }
}

/** Sets a property and its value for an HTML element */
export function setProp(element: HTMLElement, property: string, value: string, important?: boolean): void {
    if (important) {
        element.style.setProperty(property, value, "important");
    } else {
        element.style.setProperty(property, value);
    }
}

/** Removes a property for an HTML element */
export function removeProp(element: HTMLElement, property: string): void {
    element.style.removeProperty(property);
}

/** Sets an attribute and its value for an HTML element */
export function setAttr(element: HTMLElement, attr: string, value: string): void {
    element.setAttribute(attr, value);
}

/** Removes an attribute for an HTML element */
export function removeAttr(element: HTMLElement, attr: string): void {
    element.removeAttribute(attr);
}

/** Sets a class and its value for an HTML element */
export function setClass(element: HTMLElement, cssClass: string): void {
    element.classList.add(cssClass);
}

/** Removes a class for an HTML element */
export function removeClass(element: HTMLElement, cssClass: string): void {
    element.classList.remove(cssClass);
}

/** Creates an internal stylesheet in an HTML element */

export function createStylesheet(element: Document | HTMLElement, id: string, cssStyles: string): void {
    const head = element.querySelector("head") as HTMLHeadElement;
    const stylesheet = document.createElement("style")
    stylesheet.id = id;
    stylesheet.textContent = cssStyles;
    head.appendChild(stylesheet);
}

export function removeStylesheet(element: Document | HTMLElement, id: string): void {
    const head = element.querySelector("head") as HTMLHeadElement;
    const stylesheet = head.querySelector("#" + id) as HTMLStyleElement;
    head.removeChild(stylesheet);
}