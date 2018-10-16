interface BookTheme {
  name: string;
  label: string;

  rootElement: Element;
  bookElement: Element;

  /** Load this theme in its book element. */
  start(): void;

  /** Remove this theme from its book element. */
  stop(): void;
}
export default BookTheme;