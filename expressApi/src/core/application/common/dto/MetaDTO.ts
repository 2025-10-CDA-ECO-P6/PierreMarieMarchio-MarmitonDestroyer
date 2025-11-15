export interface PaginationMetaDTO {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface MetaDTO extends PaginationMetaDTO {}
