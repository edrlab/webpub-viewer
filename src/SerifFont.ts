import BookFont from "./BookFont";
import * as HTMLUtilities from "./HTMLUtilities";

export default class SerifFont implements BookFont {
  public readonly name = "serif-font";
  public readonly label = "Serif";

  public bookElement: HTMLIFrameElement;

  public start(): void {
    const rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html") as HTMLHtmlElement;

    HTMLUtilities.setAttr(rootFrame, "data-viewer-font", "serif");
    HTMLUtilities.createStylesheet(rootFrame, "serif-font-internal", "* {font-family: 'Iowan Old Style', 'Sitka Text', Palatino, 'Book Antiqua', serif !important;}");
  }

  public stop(): void {
    const rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html") as HTMLHtmlElement;

    HTMLUtilities.removeAttr(rootFrame, "data-viewer-font");
    HTMLUtilities.removeStylesheet(rootFrame, "serif-font-internal");
  }
}