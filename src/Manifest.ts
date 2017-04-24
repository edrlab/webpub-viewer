import Store from "./Store";

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
    children?: Array<Link>;
}

export default class Manifest {
    public readonly metadata: Metadata;
    public readonly links: Array<Link>;
    public readonly spine: Array<Link>;
    public readonly resources: Array<Link>;
    public readonly toc: Array<Link>;
    private readonly manifestUrl: URL;

    public static async getManifest(manifestUrl: URL, store?: Store): Promise<Manifest> {
        try {
            const response = await window.fetch(manifestUrl.href)
            const manifestJSON = await response.json();
            if (store) {
                await store.set("manifest", JSON.stringify(manifestJSON));
            }
            return new Manifest(manifestJSON, manifestUrl);
        } catch (err) {
            // We couldn't fetch the response, but there might be a cached version.
            if (store) {
                const manifestString = await store.get("manifest");
                if (manifestString) {
                    const manifestJSON = JSON.parse(manifestString);
                    return new Manifest(manifestJSON, manifestUrl);
                }
            }

            // There's nothing we can do, reraise the error.
            throw err;
        }
    }

    public constructor(manifestJSON: any, manifestUrl: URL) {
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

    public getSpineItem(href: string): Link | null {
        const index = this.getSpineIndex(href);
        if (index !== null) {
            return this.spine[index];
        }
        return null;
    }

    private getSpineIndex(href: string): number | null {
        for (let index = 0; index < this.spine.length; index++) {
            const item = this.spine[index];
            if (item.href) {
                const itemUrl = new URL(item.href, this.manifestUrl.href).href;
                if (itemUrl === href) {
                    return index;
                }
            }
        }
        return null;
    }
}
