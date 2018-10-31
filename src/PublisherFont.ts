import BookFont from "./BookFont";
import * as HTMLUtilities from "./HTMLUtilities";

export default class PublisherFont implements BookFont {
  public readonly name = "publisher-font";
  public readonly label = "Publisher";

  public bookElement: HTMLIFrameElement;

  public start(): void {
    const rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html") as HTMLHtmlElement;

    HTMLUtilities.setAttr(rootFrame, "data-viewer-font", "publisher");
  }

  public stop(): void {
    const rootFrame = HTMLUtilities.findRequiredIframeElement(this.bookElement.contentDocument, "html") as HTMLHtmlElement;

    HTMLUtilities.removeAttr(rootFrame, "data-viewer-font");
  }
}