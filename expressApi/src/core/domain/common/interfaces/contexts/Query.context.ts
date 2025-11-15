export interface QueryContext {
  setLimit(limit: number): void;
  getLimit(): number | null;

  setOffset(offset: number): void;
  getOffset(): number | null;

  setFilters(filters: Record<string, any>): void;
  getFilters(): Record<string, any> | null;

  setSort(sort: { field: string; order: 'asc' | 'desc' }): void;
  getSort(): { field: string; order: 'asc' | 'desc' } | null;

  setPopulate(populate: boolean): void;
  getPopulate(): boolean | null;

  getOrNull(): {
    limit: number | null;
    offset: number | null;
    filters: Record<string, any> | null;
    sort: { field: string; order: 'asc' | 'desc' } | null;
    populate: boolean | null;
  };
}
