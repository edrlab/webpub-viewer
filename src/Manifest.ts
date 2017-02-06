export interface Metadata {
    title?: string;
    author?: string;
    identifier?: string;
    language?: string;
    modified?: string;
}

export interface Link {
    rel?: Array<string>;
    href?: string;
    type?: string;
    title?: string;
}

export default class Manifest {
    public metadata: Metadata;
    public links: Array<Link>;
    public spine: Array<Link>;
    public resources: Array<Link>;
    public toc: Array<Link>;
    private manifestUrl: string;

    public constructor(manifestJSON: any, manifestUrl: string) {
        this.metadata = manifestJSON.metadata || {};
        this.links = manifestJSON.links || [];
        this.spine = manifestJSON.spine || [];
        this.resources = manifestJSON.resources || [];
        this.toc = manifestJSON.toc || [];
        this.manifestUrl = manifestUrl;
    }

    public getStartLink(): Link | null {
        if (this.spine.length > 0) {
            return this.spine[0];
        }
        return null;
    }

    public getPreviousSpineItem(href: string): Link | null {
        const index = this.getSpineIndex(href);
        if (index !== null && index > 0) {
            return this.spine[index - 1];
        }
        return null;
    }

    public getNextSpineItem(href: string): Link | null {
        const index = this.getSpineIndex(href);
        if (index !== null && index < (this.spine.length -1)) {
            return this.spine[index + 1];
        }
        return null;
    }

    private getSpineIndex(href: string): number | null {
        for (let index = 0; index < this.spine.length; index++) {
            const item = this.spine[index];
            if (item.href) {
                const itemUrl = new URL(item.href, this.manifestUrl).href;
                if (itemUrl === href) {
                    return index;
                }
            }
        }
        return null;
    }
}
