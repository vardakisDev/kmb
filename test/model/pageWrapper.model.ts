export interface PageWrapper<T> {
  data: T[];
  page: number;
  totalPages: number;
  limit: number;
}
