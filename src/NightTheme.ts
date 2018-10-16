import BookTheme from "./BookTheme";
import * as HTMLUtilities from "./HTMLUtilities";

export default class NightTheme implements BookTheme {
  public readonly name = "night-theme";
  public readonly label = "Night";

  public rootElement: HTMLHtmlElement;
  public bookElement: HTMLIFrameElement;

  public start(): void {
    const rootElement = document.documentElement;
    const rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html") as HTMLHtmlElement;

    HTMLUtilities.setAttr(rootElement, "data-viewer-theme", "night");
    HTMLUtilities.createStylesheet(rootFrame, "night-mode-internal", ":root {background-color: #111 !important; color: #FFFFFF !important} :not(a) {background-color: transparent !important; color: #FFFFFF !important; border-color: currentColor !important;} a {color: #53CEEA !important;}");
  }

  public stop(): void {
    const rootElement = document.documentElement;
    const rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html") as HTMLHtmlElement;

    HTMLUtilities.removeAttr(rootElement, "data-viewer-theme");
    HTMLUtilities.removeStylesheet(rootFrame, "night-mode-internal");
  }
}