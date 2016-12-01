interface Navigator {
    start(element: HTMLElement, manifestUrl: string): Promise<void>;
}

export default Navigator;