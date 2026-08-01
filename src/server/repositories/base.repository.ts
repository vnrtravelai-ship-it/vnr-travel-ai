export abstract class BaseRepository<T> {

    protected items: T[] = [];

    constructor(
        initialData: T[] = []
    ) {

        this.items = initialData;

    }

    /**
     * Return all records.
     */
    findAll(): T[] {

        return [...this.items];

    }

    /**
     * Return first record matching predicate.
     */
    findOne(
        predicate: (item: T) => boolean
    ): T | undefined {

        return this.items.find(predicate);

    }

    /**
     * Return all records matching predicate.
     */
    findMany(
        predicate: (item: T) => boolean
    ): T[] {

        return this.items.filter(predicate);

    }

    /**
     * Add one record.
     */
    add(
        item: T
    ): void {

        this.items.push(item);

    }

    /**
     * Replace all records.
     */
    replace(
        items: T[]
    ): void {

        this.items = [...items];

    }

    /**
     * Count records.
     */
    count(): number {

        return this.items.length;

    }

    /**
     * Remove all records.
     */
    clear(): void {

        this.items = [];

    }

}