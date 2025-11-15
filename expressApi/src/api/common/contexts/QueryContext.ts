import { QueryContext } from '../../../core/domain/common/interfaces/contexts/Query.context';

export class QueryContextImpl implements QueryContext {
  private limit?: number;
  private offset?: number;
  private filters?: Record<string, any>;
  private sort?: { field: string; order: 'asc' | 'desc' };
  private populate?: boolean;

  setLimit(limit: number): void {
    this.limit = limit;
  }
  getLimit(): number | null {
    return this.limit ?? null;
  }

  setOffset(offset: number): void {
    this.offset = offset;
  }
  getOffset(): number | null {
    return this.offset ?? null;
  }

  setFilters(filters: Record<string, any>): void {
    this.filters = filters;
  }
  getFilters(): Record<string, any> | null {
    return this.filters ?? null;
  }

  setSort(sort: { field: string; order: 'asc' | 'desc' }): void {
    this.sort = sort;
  }
  getSort(): { field: string; order: 'asc' | 'desc' } | null {
    return this.sort ?? null;
  }

  setPopulate(populate: boolean): void {
    this.populate = populate;
  }
  getPopulate(): boolean | null {
    return this.populate ?? null;
  }

  getOrNull(): {
    limit: number | null;
    offset: number | null;
    filters: Record<string, any> | null;
    sort: { field: string; order: 'asc' | 'desc' } | null;
    populate: boolean | null;
  } {
    return {
      limit: this.limit ?? null,
      offset: this.offset ?? null,
      filters: this.filters ?? null,
      sort: this.sort ?? null,
      populate: this.populate ?? null,
    };
  }
}
