export interface PaginatedResponseInterface<T> {
    data: T[],
    meta: {
        currentPage: number,
        from: number,
        nextPageUrl: string,
        perPage: number,
        prevPageUrl: string,
        to: number,
        total: number,
        query: any,
    };
}
