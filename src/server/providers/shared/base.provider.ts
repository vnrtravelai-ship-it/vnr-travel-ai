export abstract class BaseProvider<T> {

    abstract load(): Promise<T[]>;

}