interface BookView {
    name: string;
    label: string;
    setBookElement(element: Element): void;
    start(position: number): void;
    stop(): void;
    getCurrentPosition(): number;
    goToPosition(position: number): void;
}
export default BookView;