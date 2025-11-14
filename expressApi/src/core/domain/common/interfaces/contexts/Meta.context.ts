export interface MetaContext {
  filters?: { titleContains?: string };
  limit: number;
  offset: number;
  sort?: { field: string; order: 'asc' | 'desc' };
  populate?: boolean;
}
