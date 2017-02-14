interface BookView {
    name: string;
    label: string;
    setBookElement(element: Element): void;
    setTopMargin(number: number): void;
    start(position: number): void;
    stop(): void;
    getCurrentPosition(): number;
    goToPosition(position: number): void;
}
export default BookView;