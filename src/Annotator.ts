interface Annotator {
    getLastReadingPosition(): Promise<any>;
    saveLastReadingPosition(position: any): Promise<void>;
}

export default Annotator;