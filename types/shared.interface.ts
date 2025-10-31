export interface IResponse<T = undefined> {
  data: T;
  status: number;
  message: string;
}

export interface PaginatedResult<T> {
  results: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}