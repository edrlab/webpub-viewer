interface Annotator {
    start(manifestUrl: string): Promise<void>;
    getLastReadingPosition(): Promise<any>;
    saveLastReadingPosition(position: any): Promise<void>;
}

export default Annotator;