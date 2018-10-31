import BookTheme from "./BookTheme";
import * as HTMLUtilities from "./HTMLUtilities";

export default class DayTheme implements BookTheme {
  public readonly name = "day-theme";
  public readonly label = "Day";

  public rootElement: HTMLHtmlElement;
  public bookElement: HTMLIFrameElement;

  public start(): void {
    const rootElement = document.documentElement;

    HTMLUtilities.setAttr(rootElement, "data-viewer-theme", "day");
  }

  public stop(): void {
    const rootElement = document.documentElement;

    HTMLUtilities.removeAttr(rootElement, "data-viewer-theme");
  }
}