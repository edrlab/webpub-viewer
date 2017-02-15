import BookView from "./BookView";

interface PaginatedBookView extends BookView {
    onFirstPage(): boolean;
    onLastPage(): boolean;
    goToPreviousPage(): void;
    goToNextPage(): void;
}
export default PaginatedBookView;