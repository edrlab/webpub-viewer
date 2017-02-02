import Annotator from "./Annotator";
import Store from "./Store";

/** Annotator that stores annotations locally, in the browser. */
export default class LocalAnnotator implements Annotator {
    private manifestUrl: string;
    private store: Store;

    public constructor(store: Store) {
        this.store = store;
    }

    public start(manifestUrl: string): Promise<void> {
        this.manifestUrl = manifestUrl;
        return new Promise<void>(resolve => resolve());
    }

    public async getLastReadingPosition(): Promise<any> {
        const positionString = await this.store.get(this.manifestUrl + "-last-reading-position");
        if (positionString) {
            const position = JSON.parse(positionString);
            return new Promise(resolve => resolve(position));
        }
        return new Promise(resolve => resolve());
    }

    public async saveLastReadingPosition(position: any): Promise<void> {
        const positionString = JSON.stringify(position);
        await this.store.set(this.manifestUrl + "-last-reading-position", positionString);
        return new Promise<void>(resolve => resolve());
    }    
}