import { QueryContext } from '../../../core/domain/common/interfaces/contexts/Query.context';

export class QueryContextImpl implements QueryContext {
  private limit: number | null = null;
  private offset: number | null = null;
  private filters: Record<string, any> | null = null;
  private sort: { field: string; order: 'asc' | 'desc' } | null = null;
  private populate: boolean | null = null;

  setLimit(limit: number) {
    this.limit = limit;
  }
  getLimit() {
    return this.limit;
  }

  setOffset(offset: number) {
    this.offset = offset;
  }
  getOffset() {
    return this.offset;
  }

  setFilters(filters: Record<string, any>) {
    this.filters = filters;
  }
  getFilters() {
    return this.filters;
  }

  setSort(sort: { field: string; order: 'asc' | 'desc' }) {
    this.sort = sort;
  }
  getSort() {
    return this.sort;
  }

  setPopulate(populate: boolean) {
    this.populate = populate;
  }
  getPopulate() {
    return this.populate;
  }

  apply(parsed: {
    pagination: { limit?: number; offset?: number };
    filters?: Record<string, any>;
    sort?: { field: string; order: 'asc' | 'desc' };
    populate?: boolean;
  }) {
    const { pagination, filters, sort, populate } = parsed;

    if (pagination.limit !== undefined) this.setLimit(pagination.limit);
    if (pagination.offset !== undefined) this.setOffset(pagination.offset);

    if (filters && Object.keys(filters).length > 0) this.setFilters(filters);

    if (sort) this.setSort(sort);

    if (populate !== undefined) this.setPopulate(populate);
  }

  getOrNull() {
    return {
      limit: this.limit,
      offset: this.offset,
      filters: this.filters,
      sort: this.sort,
      populate: this.populate,
    };
  }
}