import Annotator from "./Annotator";
import Store from "./Store";

/** Annotator that stores annotations locally, in the browser. */
export default class LocalAnnotator implements Annotator {
    private store: Store;
    private LAST_READING_POSITION = "last-reading-position";

    public constructor(store: Store) {
        this.store = store;
    }

    public async getLastReadingPosition(): Promise<any> {
        const positionString = await this.store.get(this.LAST_READING_POSITION);
        if (positionString) {
            const position = JSON.parse(positionString);
            return new Promise(resolve => resolve(position));
        }
        return new Promise(resolve => resolve());
    }

    public async saveLastReadingPosition(position: any): Promise<void> {
        const positionString = JSON.stringify(position);
        await this.store.set(this.LAST_READING_POSITION, positionString);
        return new Promise<void>(resolve => resolve());
    }    
}