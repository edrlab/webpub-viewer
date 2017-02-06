interface BookView {
    name: string;
    label: string;
    start(element: Element, position: number): Promise<void>;
    stop(): Promise<void>;
    getCurrentPosition(): number;
    goToPosition(position: number): void;
}
export default BookView;