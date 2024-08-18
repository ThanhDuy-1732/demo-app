
type Pagination = {
  skip: number,
  total: number,
  limit: number,
}

type PaginationResponseType<T> = T & {
  skip: number,
  total: number,
  limit: number,
}