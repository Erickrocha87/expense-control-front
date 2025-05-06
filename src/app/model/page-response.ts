export interface PageResponse<T>{
    content: T[];
    totalPages: number;
    totalElements: number;
    pageNumber: number;
    pageSize: number;
    totalPrice: number;
}