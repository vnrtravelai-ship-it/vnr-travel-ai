export interface CacheItem<T> {

    key: string;

    value: T;

    createdAt: Date;

    expiresAt: Date;

}

export class PlanningCache {

    private static instance: PlanningCache;

    private cache = new Map<string, CacheItem<any>>();

    private constructor() {}

    static getInstance(): PlanningCache {

        if (!PlanningCache.instance) {

            PlanningCache.instance =
                new PlanningCache();

        }

        return PlanningCache.instance;

    }

    get<T>(key: string): T | undefined {

        const item = this.cache.get(key);

        if (!item) return undefined;

        if (item.expiresAt < new Date()) {

            this.cache.delete(key);

            return undefined;

        }

        return item.value;

    }

    set<T>(
        key: string,
        value: T,
        ttlMinutes = 60
    ) {

        this.cache.set(key, {

            key,

            value,

            createdAt: new Date(),

            expiresAt: new Date(

                Date.now() +

                ttlMinutes * 60000

            ),

        });

    }

    clear() {

        this.cache.clear();

    }

    size() {

        return this.cache.size;

    }

}