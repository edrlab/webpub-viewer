interface Paginator {
    start(element: Element, position: number): Promise<void>;
    getCurrentPosition(): number;
    onFirstPage(): boolean;
    onLastPage(): boolean;
    goToPreviousPage(): void;
    goToNextPage(): void;
    goToPosition(position: number): void;
}
export default Paginator;