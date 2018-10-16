import BookFont from "./BookFont";
import * as HTMLUtilities from "./HTMLUtilities";

export default class SansFont implements BookFont {
  public readonly name = "sans-font";
  public readonly label = "Sans-serif";

  public bookElement: HTMLIFrameElement;

  public start(): void {
    const rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html") as HTMLHtmlElement;

    HTMLUtilities.setAttr(rootFrame, "data-viewer-font", "sans");
    HTMLUtilities.createStylesheet(rootFrame, "sans-font-internal", "* {font-family: Seravek, Calibri, Roboto, Arial, sans-serif !important;}");
  }

  public stop(): void {
    const rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html") as HTMLHtmlElement;

    HTMLUtilities.removeAttr(rootFrame, "data-viewer-font");
    HTMLUtilities.removeStylesheet(rootFrame, "sans-font-internal");
  }
}