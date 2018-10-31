import { expect } from "chai";
import { stub } from "sinon";

import BookSettings from "../src/BookSettings";
import BookFont from "../src/BookFont";
import BookTheme from "../src/BookTheme";
import BookView from "../src/BookView";
import MemoryStore from "../src/MemoryStore";

describe("BookSettings", () => {
    let start: sinon.SinonStub;
    let stop: sinon.SinonStub;
    let getCurrentPosition: sinon.SinonStub;
    let goToPosition: sinon.SinonStub;

    class MockBookFont implements BookFont {
        public id: number;
        public name: string;
        public label: string;
        public bookElement: Element;
        public constructor(id: number, name: string, label: string) {
            this.id = id;
            this.name = name;
            this.label = label;
        }
        public start() {
            start(this.id);
        }
        public stop() {
            stop(this.id);
        }
    }

    class MockBookTheme implements BookTheme {
        public id: number;
        public name: string;
        public label: string;
        public rootElement: HTMLIFrameElement;
        public bookElement: Element;
        public constructor(id: number, name: string, label: string) {
            this.id = id;
            this.name = name;
            this.label = label;
        }
        public start() {
            start(this.id);
        }
        public stop() {
            stop(this.id);
        }
    }

    class MockBookView implements BookView {
        public id: number;
        public name: string;
        public label: string;
        public bookElement: Element;
        public sideMargin: number;
        public height: number;
        public constructor(id: number, name: string, label: string) {
            this.id = id;
            this.name = name;
            this.label = label;
        }
        public start(position: number) {
            start(this.id, position);
        }
        public stop() {
            stop(this.id);
        }
        public getCurrentPosition() {
            return getCurrentPosition(this.id);
        }
        public goToPosition(position: number) {
            goToPosition(this.id, position);
        }
        public goToElement() {}
    }

    let font1: MockBookFont;
    let font2: MockBookFont;
    let font3: MockBookFont;
    let theme1: MockBookTheme;
    let theme2: MockBookTheme;
    let theme3: MockBookTheme;
    let view1: MockBookView;
    let view2: MockBookView;
    
    let store: MemoryStore;
    let settings: BookSettings;

    const click = (element: any) => {
        const event = document.createEvent("HTMLEvents");
        event.initEvent("click", false, true);
        element.dispatchEvent(event);
    };

    const pause = (ms = 0): Promise<void> => {
        return new Promise<void>(resolve => setTimeout(resolve, ms));
    };

    beforeEach(async () => {
        start = stub();
        stop = stub();
        getCurrentPosition = stub().returns(0);
        goToPosition = stub();

        font1 = new MockBookFont(1, "font1", "Font 1");
        font2 = new MockBookFont(2, "font2", "Font 2");
        font3 = new MockBookFont(3, "font3", "Font 3");

        theme1 = new MockBookTheme(1, "theme1", "Theme 1");
        theme2 = new MockBookTheme(2, "theme2", "Theme 2");
        theme3 = new MockBookTheme(3, "theme3", "Theme 3");

        view1 = new MockBookView(1, "view1", "View 1");
        view2 = new MockBookView(2, "view2", "View 2");

        store = new MemoryStore();
        settings = await BookSettings.create({
            store,
            bookFonts: [font1, font2, font3],
            fontSizesInPixels: [12, 14, 16],
            bookThemes: [theme1, theme2, theme3],
            bookViews: [view1, view2]
        });
    });

    describe("#create", () => {
        it("obtains the selected font from the store", async () => {
            await store.set("settings-selected-font", font2.name);
            settings = await BookSettings.create({
                store,
                bookFonts: [font1, font2, font3],
                fontSizesInPixels: [],
                bookThemes: [theme1, theme2, theme3],
                bookViews: [view1, view2]
            });
            expect(settings.getSelectedFont()).to.equal(font2);
        });

        it("sets the selected font to the first font if there's no selected font in the store", () => {
            expect(settings.getSelectedFont()).to.equal(font1);
        });

        it("obtains the selected font size from the store", async () => {
            await store.set("settings-selected-font-size", "18px");
            settings = await BookSettings.create({
                store,
                bookFonts: [font1, font2, font3],
                fontSizesInPixels: [12, 14, 16, 18],
                bookThemes: [theme1, theme2, theme3],
                bookViews: [view1, view2]
            });
            expect(settings.getSelectedFontSize()).to.equal("18px");
        });

        it("sets the selected font size to the default if the selected font size in the store isn't one of the options", async () => {
            await store.set("settings-selected-font-size", "12345px");
            settings = await BookSettings.create({
                store,
                bookFonts: [font1, font2, font3],
                fontSizesInPixels: [12, 14, 16, 18],
                defaultFontSizeInPixels: 18,
                bookThemes: [theme1, theme2, theme3],
                bookViews: [view1, view2]
            });
            expect(settings.getSelectedFontSize()).to.equal("18px");
        });

        it("sets the selected font size to the default if there's no selected font size in the store", async () => {
            settings = await BookSettings.create({
                store,
                bookFonts: [font1, font2, font3],
                fontSizesInPixels: [14, 16],
                defaultFontSizeInPixels: 14,
                bookThemes: [theme1, theme2, theme3],
                bookViews: [view1, view2]
            });
            expect(settings.getSelectedFontSize()).to.equal("14px");
        });

        it("sets the selected font size to the middle font size if the default isn't one of the options", async () => {
            settings = await BookSettings.create({
                store,
                bookFonts: [font1, font2, font3],
                fontSizesInPixels: [14, 16],
                defaultFontSizeInPixels: 12345,
                bookThemes: [theme1, theme2, theme3],
                bookViews: [view1, view2]
            });
            expect(settings.getSelectedFontSize()).to.equal("16px");
        });

        it("sets the selected font size to the middle font size (rounded up) if there's no default and no selected font size in the store", async () => {
            expect(settings.getSelectedFontSize()).to.equal("14px");

            settings = await BookSettings.create({
                store,
                bookFonts: [font1, font2, font3],
                fontSizesInPixels: [12, 14],
                bookThemes: [theme1, theme2, theme3],
                bookViews: [view1, view2]
            });
            expect(settings.getSelectedFontSize()).to.equal("14px");

            settings = await BookSettings.create({
                store,
                bookFonts: [font1, font2, font3],
                fontSizesInPixels: [10, 12, 14, 16],
                bookThemes: [theme1, theme2, theme3],
                bookViews: [view1, view2]
            });
            expect(settings.getSelectedFontSize()).to.equal("14px");
        });

        it("obtains the selected theme from the store", async () => {
            await store.set("settings-selected-theme", theme3.name);
            settings = await BookSettings.create({
                store,
                bookFonts: [font1, font2, font3],
                fontSizesInPixels: [],
                bookThemes: [theme1, theme2, theme3],
                bookViews: [view1, view2]
            });
            expect(settings.getSelectedTheme()).to.equal(theme3);
        });

        it("sets the selected theme to the first theme if there's no selected theme in the store", () => {
            expect(settings.getSelectedTheme()).to.equal(theme1);
        });

        it("obtains the selected view from the store", async () => {
            await store.set("settings-selected-view", view2.name);
            settings = await BookSettings.create({
                store,
                bookFonts: [font1, font2, font3],
                fontSizesInPixels: [],
                bookThemes: [theme1, theme2, theme3],
                bookViews: [view1, view2]

            });
            expect(settings.getSelectedView()).to.equal(view2);
        });

        it("sets the selected view to the first view if there's no selected view in the store", () => {
            expect(settings.getSelectedView()).to.equal(view1);
        });
    });

    describe("#renderControls", () => {
        it("renders a button for each font", async () => {
            const element = document.createElement("div");
            settings.renderControls(element);

            let font1Button = element.querySelector("button[class='font1 active']") as HTMLButtonElement;
            expect(font1Button.getAttribute("aria-label")).to.equal("Font 1 font enabled");
            let font2Button = element.querySelector("button[class='font2']") as HTMLButtonElement;
            expect(font2Button.getAttribute("aria-label")).to.equal("Font 2 font disabled");
            let font3Button = element.querySelector("button[class='font3']") as HTMLButtonElement;
            expect(font3Button.getAttribute("aria-label")).to.equal("Font 3 font disabled");

            // If there's no font or only 1 font, fonts don't show up in the settings.

            settings = await BookSettings.create({
                store,
                bookFonts: [font1],
                fontSizesInPixels: [12],
                bookThemes: [theme1, theme2, theme3],
                bookViews: [view1, view2]
            });
            settings.renderControls(element);
            font1Button = element.querySelector("button[class='font1 active']") as HTMLButtonElement;
            expect(font1Button).to.be.null;
            font2Button = element.querySelector("button[class='font2']") as HTMLButtonElement;
            expect(font2Button).to.be.null;

            settings = await BookSettings.create({
                store,
                bookFonts: [],
                fontSizesInPixels: [12],
                bookThemes: [theme1, theme2, theme3],
                bookViews: [view1, view2]
            });
            settings.renderControls(element);
            font1Button = element.querySelector("button[class='font1 active']") as HTMLButtonElement;
            expect(font1Button).to.be.null;
        });

        it("renders a button for each theme", async () => {
            const element = document.createElement("div");
            settings.renderControls(element);

            let theme1Button = element.querySelector("button[class='theme1 active']") as HTMLButtonElement;
            expect(theme1Button.getAttribute("aria-label")).to.equal("Theme 1 mode enabled");
            let theme2Button = element.querySelector("button[class='theme2']") as HTMLButtonElement;
            expect(theme2Button.getAttribute("aria-label")).to.equal("Theme 2 mode disabled");
            let theme3Button = element.querySelector("button[class='theme3']") as HTMLButtonElement;
            expect(theme3Button.getAttribute("aria-label")).to.equal("Theme 3 mode disabled");

            // If there's no theme or only 1 theme, themes don't show up in the settings.

            settings = await BookSettings.create({
                store,
                bookFonts: [font1, font2, font3],
                fontSizesInPixels: [12],
                bookThemes: [theme1],
                bookViews: [view1, view2]
            });
            settings.renderControls(element);
            theme1Button = element.querySelector("button[class='theme1 active']") as HTMLButtonElement;
            expect(theme1Button).to.be.null;
            theme2Button = element.querySelector("button[class='theme2']") as HTMLButtonElement;
            expect(theme2Button).to.be.null;

            settings = await BookSettings.create({
                store,
                bookFonts: [font1, font2, font3],
                fontSizesInPixels: [12],
                bookThemes: [],
                bookViews: [view1, view2]
            });
            settings.renderControls(element);
            theme1Button = element.querySelector("button[class='theme1 active']") as HTMLButtonElement;
            expect(theme1Button).to.be.null;
        });

        it("renders a button for each view", async () => {
            const element = document.createElement("div");
            settings.renderControls(element);

            let view1Button = element.querySelector("button[class='view1 active']") as HTMLButtonElement;
            expect(view1Button.innerHTML).to.contain("View 1");
            expect(view1Button.getAttribute("aria-label")).to.equal("View 1 mode enabled");
            let view2Button = element.querySelector("button[class=view2]") as HTMLButtonElement;
            expect(view2Button.innerHTML).to.contain("View 2");
            expect(view2Button.getAttribute("aria-label")).to.equal("View 2 mode disabled");

            // If there's no views or only 1 view, views don't show up in the settings.

            settings = await BookSettings.create({
                store,
                bookFonts: [font1, font2, font3],
                fontSizesInPixels: [12],
                bookThemes: [theme1, theme2, theme3],
                bookViews: [view1]
            });
            settings.renderControls(element);
            view1Button = element.querySelector("button[class='view1 active']") as HTMLButtonElement;
            expect(view1Button).to.be.null;
            view2Button = element.querySelector("button[class=view2]") as HTMLButtonElement;
            expect(view2Button).to.be.null;

            settings = await BookSettings.create({
                store,
                bookFonts: [font1, font2, font3],
                fontSizesInPixels: [12],
                bookThemes: [theme1, theme2, theme3],
                bookViews: []
            });
            settings.renderControls(element);
            view1Button = element.querySelector("button[class='view1 active']") as HTMLButtonElement;
            expect(view1Button).to.be.null;
        });

        it("changes font when a font button is clicked", async () => {
            const element = document.createElement("div");
            settings.renderControls(element);

            const font1Button = element.querySelector("button[class='font1 active']") as HTMLButtonElement;
            const font2Button = element.querySelector("button[class='font2']") as HTMLButtonElement;

            click(font2Button);
            await pause();

            expect(stop.callCount).to.equal(1);
            expect(stop.args[0][0]).to.equal(1);

            expect(start.callCount).to.equal(1);
            expect(start.args[0][0]).to.equal(2);

            expect(settings.getSelectedFont()).to.equal(font2);
            let storedFont = await store.get("settings-selected-font");
            expect(storedFont).to.equal(font2.name);

            expect(font1Button.className).not.to.contain("active");
            expect(font2Button.className).to.contain("active");

            expect(font1Button.getAttribute("aria-label")).to.equal("Font 1 font disabled");
            expect(font2Button.getAttribute("aria-label")).to.equal("Font 2 font enabled");


            click(font1Button);
            await pause();

            expect(stop.callCount).to.equal(2);
            expect(stop.args[1][0]).to.equal(2);

            expect(start.callCount).to.equal(2);
            expect(start.args[1][0]).to.equal(1);

            expect(settings.getSelectedFont()).to.equal(font1);
            storedFont = await store.get("settings-selected-font");
            expect(storedFont).to.equal(font1.name);

            expect(font1Button.className).to.contain("active");
            expect(font2Button.className).not.to.contain("active");

            expect(font1Button.getAttribute("aria-label")).to.equal("Font 1 font enabled");
            expect(font2Button.getAttribute("aria-label")).to.equal("Font 2 font disabled");
        });

        it("renders font size increase and decrease buttons", async () => {
            const element = document.createElement("div");
            settings.renderControls(element);

            let decreaseButton = element.querySelector("button[class='decrease']") as HTMLButtonElement;
            expect(decreaseButton).to.be.ok;
            let increaseButton = element.querySelector("button[class=increase]") as HTMLButtonElement;
            expect(increaseButton).to.be.ok;

            // If there's no font size or only one font size, font size controls don't show up in settings.

            settings = await BookSettings.create({
                store,
                bookFonts: [font1, font2, font3],
                fontSizesInPixels: [12],
                bookThemes: [theme1, theme2, theme3],
                bookViews: [view1]
            });
            settings.renderControls(element);
            decreaseButton = element.querySelector("button[class='decrease']") as HTMLButtonElement;
            expect(decreaseButton).to.be.null;
            increaseButton = element.querySelector("button[class=increase]") as HTMLButtonElement;
            expect(increaseButton).to.be.null;

            settings = await BookSettings.create({
                store,
                bookFonts: [font1, font2, font3],
                fontSizesInPixels: [],
                bookThemes: [theme1, theme2, theme3],
                bookViews: [view1]
            });
            settings.renderControls(element);
            decreaseButton = element.querySelector("button[class='decrease']") as HTMLButtonElement;
            expect(decreaseButton).to.be.null;
            increaseButton = element.querySelector("button[class=increase]") as HTMLButtonElement;
            expect(increaseButton).to.be.null;
        });

        it("decreases and increases font size", async () => {
            const element = document.createElement("div");
            settings.renderControls(element);

            const decreaseButton = element.querySelector("button[class=decrease]") as HTMLButtonElement;
            const increaseButton = element.querySelector("button[class=increase]") as HTMLButtonElement;

            expect(settings.getSelectedFontSize()).to.equal("14px");

            click(decreaseButton);
            await pause();
            expect(settings.getSelectedFontSize()).to.equal("12px");
            let storedFontSize = await store.get("settings-selected-font-size");
            expect(storedFontSize).to.equal("12px");

            // The decrease button is now disabled because the size can't be decreased more.
            expect(decreaseButton.className).to.contain("disabled");
            expect(increaseButton.className).not.to.contain("disabled");

            // Clicking decrease again does nothing.
            click(decreaseButton);
            await pause();
            expect(settings.getSelectedFontSize()).to.equal("12px");
            storedFontSize = await store.get("settings-selected-font-size");
            expect(storedFontSize).to.equal("12px");

            click(increaseButton);
            await pause();
            expect(settings.getSelectedFontSize()).to.equal("14px");
            storedFontSize = await store.get("settings-selected-font-size");
            expect(storedFontSize).to.equal("14px");

            expect(decreaseButton.className).not.to.contain("disabled");
            expect(increaseButton.className).not.to.contain("disabled");

            click(increaseButton);
            await pause();
            expect(settings.getSelectedFontSize()).to.equal("16px");
            storedFontSize = await store.get("settings-selected-font-size");
            expect(storedFontSize).to.equal("16px");


            expect(decreaseButton.className).not.to.contain("disabled");
            expect(increaseButton.className).to.contain("disabled");

            // Clicking increase again does nothing.
            click(increaseButton);
            await pause();
            expect(settings.getSelectedFontSize()).to.equal("16px");
            storedFontSize = await store.get("settings-selected-font-size");
            expect(storedFontSize).to.equal("16px");
        });

        it("changes theme when a theme button is clicked", async () => {
            const element = document.createElement("div");
            settings.renderControls(element);

            const theme1Button = element.querySelector("button[class='theme1 active']") as HTMLButtonElement;
            const theme2Button = element.querySelector("button[class='theme2']") as HTMLButtonElement;

            click(theme2Button);
            await pause();

            expect(stop.callCount).to.equal(1);
            expect(stop.args[0][0]).to.equal(1);

            expect(start.callCount).to.equal(1);
            expect(start.args[0][0]).to.equal(2);

            expect(settings.getSelectedTheme()).to.equal(theme2);
            let storedTheme = await store.get("settings-selected-theme")
            expect(storedTheme).to.equal(theme2.name);

            expect(theme1Button.className).not.to.contain("active");
            expect(theme2Button.className).to.contain("active");

            expect(theme1Button.getAttribute("aria-label")).to.equal("Theme 1 mode disabled");
            expect(theme2Button.getAttribute("aria-label")).to.equal("Theme 2 mode enabled");


            click(theme1Button);
            await pause();

            expect(stop.callCount).to.equal(2);
            expect(stop.args[1][0]).to.equal(2);

            expect(start.callCount).to.equal(2);
            expect(start.args[1][0]).to.equal(1);

            expect(settings.getSelectedTheme()).to.equal(theme1);
            storedTheme = await store.get("settings-selected-theme")
            expect(storedTheme).to.equal(theme1.name);

            expect(theme1Button.className).to.contain("active");
            expect(theme2Button.className).not.to.contain("active");

            expect(theme1Button.getAttribute("aria-label")).to.equal("Theme 1 mode enabled");
            expect(theme2Button.getAttribute("aria-label")).to.equal("Theme 2 mode disabled");
        });

        it("changes view when a view button is clicked", async () => {
            const element = document.createElement("div");
            settings.renderControls(element);

            const view1Button = element.querySelector("button[class='view1 active']") as HTMLButtonElement;
            const view2Button = element.querySelector("button[class=view2]") as HTMLButtonElement;

            click(view2Button);
            await pause();

            expect(getCurrentPosition.callCount).to.equal(1);
            expect(getCurrentPosition.args[0][0]).to.equal(1);

            expect(stop.callCount).to.equal(1);
            expect(stop.args[0][0]).to.equal(1);

            expect(start.callCount).to.equal(1);
            expect(start.args[0][0]).to.equal(2);

            expect(settings.getSelectedView()).to.equal(view2);
            let storedView = await store.get("settings-selected-view")
            expect(storedView).to.equal(view2.name);

            expect(view1Button.className).not.to.contain("active");
            expect(view2Button.className).to.contain("active");

            expect(view1Button.getAttribute("aria-label")).to.equal("View 1 mode disabled");
            expect(view2Button.getAttribute("aria-label")).to.equal("View 2 mode enabled");


            click(view1Button);
            await pause();

            expect(getCurrentPosition.callCount).to.equal(2);
            expect(getCurrentPosition.args[1][0]).to.equal(2);

            expect(stop.callCount).to.equal(2);
            expect(stop.args[1][0]).to.equal(2);

            expect(start.callCount).to.equal(2);
            expect(start.args[1][0]).to.equal(1);

            expect(settings.getSelectedView()).to.equal(view1);
            storedView = await store.get("settings-selected-view")
            expect(storedView).to.equal(view1.name);

            expect(view1Button.className).to.contain("active");
            expect(view2Button.className).not.to.contain("active");

            expect(view1Button.getAttribute("aria-label")).to.equal("View 1 mode enabled");
            expect(view2Button.getAttribute("aria-label")).to.equal("View 2 mode disabled");
        });

        it("renders offline status", async () => {
            const element = document.createElement("div");
            settings.renderControls(element);

            const offlineStatus = element.querySelector("div[class='offline-status']") as HTMLDivElement;
            expect(offlineStatus).not.to.be.null;
        });

        it("blocks click events for container element when something in the ul is clicked", () => {
            let clickEventTriggered: boolean = false;
            const element = document.createElement("div");
            element.addEventListener("click", () => {
                clickEventTriggered = true;
            });

            settings.renderControls(element);
            const increaseButton = element.querySelector("button[class=increase]") as HTMLButtonElement;
            click(increaseButton);
            expect(clickEventTriggered).to.equal(false);

            const ul = element.querySelector("ul") as HTMLUListElement;
            click(ul);
            expect(clickEventTriggered).to.equal(false);

            click(element);
            expect(clickEventTriggered).to.equal(true);
        });
    });

    describe("#onFontChange", () => {
        it("sets up font change callback", async () => {
            const element = document.createElement("div");
            settings.renderControls(element);

            const fontChanged = stub();
            settings.onFontChange(fontChanged);

            const font1Button = element.querySelector("button[class='font1 active']") as HTMLButtonElement;
            const font2Button = element.querySelector("button[class='font2']") as HTMLButtonElement;

            click(font2Button);
            await pause();
            expect(fontChanged.callCount).to.equal(1);

            click(font1Button);
            await pause();
            expect(fontChanged.callCount).to.equal(2);
        });
    });

    describe("#onFontSizeChange", () => {
        it("sets up font-size change callback", async () => {
            const element = document.createElement("div");
            settings.renderControls(element);

            const fontSizeChanged = stub();
            settings.onFontSizeChange(fontSizeChanged);

            const decreaseButton = element.querySelector("button[class=decrease]") as HTMLButtonElement;
            const increaseButton = element.querySelector("button[class=increase]") as HTMLButtonElement;

            click(decreaseButton);
            await pause();
            expect(fontSizeChanged.callCount).to.equal(1);

            click(increaseButton);
            await pause();
            expect(fontSizeChanged.callCount).to.equal(2);
        });
    });

    describe("#onThemeChange", () => {
        it("sets up theme change callback", async () => {
            const element = document.createElement("div");
            settings.renderControls(element);

            const themeChanged = stub();
            settings.onThemeChange(themeChanged);

            const theme1Button = element.querySelector("button[class='theme1 active']") as HTMLButtonElement;
            const theme2Button = element.querySelector("button[class='theme2']") as HTMLButtonElement;

            click(theme2Button);
            await pause();
            expect(themeChanged.callCount).to.equal(1);

            click(theme1Button);
            await pause();
            expect(themeChanged.callCount).to.equal(2);
        });
    });

    describe("#onViewChange", () => {
        it("sets up view change callback", async () => {
            const element = document.createElement("div");
            settings.renderControls(element);

            const viewChanged = stub();
            settings.onViewChange(viewChanged);

            const view1Button = element.querySelector("button[class='view1 active']") as HTMLButtonElement;
            const view2Button = element.querySelector("button[class=view2]") as HTMLButtonElement;

            click(view2Button);
            await pause();
            expect(viewChanged.callCount).to.equal(1);

            click(view1Button);
            await pause();
            expect(viewChanged.callCount).to.equal(2);
        });
    });
});
