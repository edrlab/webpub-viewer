import Annotator from "./Annotator";

export default class LocalStorageAnnotator implements Annotator {
    private manifestUrl: string;

    public constructor() {}

    public start(manifestUrl: string): Promise<void> {
        this.manifestUrl = manifestUrl;
        return new Promise<void>(resolve => resolve());
    }

    public async getLastReadingPosition(): Promise<any> {
        if (window.localStorage) {
            const positionString = window.localStorage.getItem(this.manifestUrl + "-last-reading-position");
            if (positionString) {
                const position = JSON.parse(positionString);
                return new Promise(resolve => resolve(position));
            }
        }
        return new Promise(resolve => resolve());
    }

    public async saveLastReadingPosition(position: any): Promise<void> {
        const positionString = JSON.stringify(position);

        if (window.localStorage) {
            window.localStorage.setItem(this.manifestUrl + "-last-reading-position", positionString);
        }
        return new Promise<void>(resolve => resolve());
    }    
}