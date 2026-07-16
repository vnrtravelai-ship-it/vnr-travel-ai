export abstract class BaseService<TRequest, TResult> {

    abstract plan(
        request: TRequest
    ): Promise<TResult>;

}