import BookTheme from "./BookTheme";
import * as HTMLUtilities from "./HTMLUtilities";

export default class SepiaTheme implements BookTheme {
  public readonly name = "sepia-theme";
  public readonly label = "Sepia";

  public rootElement: HTMLHtmlElement;
  public bookElement: HTMLIFrameElement;

  public start(): void {
    const rootElement = document.documentElement;
    const rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html") as HTMLHtmlElement;

    HTMLUtilities.setAttr(rootElement, "data-viewer-theme", "sepia");
    HTMLUtilities.createStylesheet(rootFrame, "sepia-mode-internal", ":root {background-color: #f6ecd9 !important}  img, svg {background-color: transparent !important; mix-blend-mode: multiply;}");
  }

  public stop(): void {
    const rootElement = document.documentElement;
    const rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html") as HTMLHtmlElement;

    HTMLUtilities.removeAttr(rootElement, "data-viewer-theme");
    HTMLUtilities.removeStylesheet(rootFrame, "sepia-mode-internal");
  }
}