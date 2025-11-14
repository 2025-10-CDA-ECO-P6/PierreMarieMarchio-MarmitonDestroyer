export interface Query {
  pagination?: {
    page?: string;
    pageSize?: string;
  };
  filters?: {
    Title?: {
      $contains?: string;
    };
  };
  sort?: string;
  populate?: string;
}
