interface BookFont {
  name: string;
  label: string;

  bookElement: Element;

  /** Load this font in its book element. */
  start(): void;

  /** Remove this font from its book element. */
  stop(): void;
}
export default BookFont;