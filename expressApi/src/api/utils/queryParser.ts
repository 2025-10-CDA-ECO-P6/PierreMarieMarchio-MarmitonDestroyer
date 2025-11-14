export const queryParser = (raw: Record<string, any>) => {
  const pagination = {
    page: raw['pagination[page]'] ? Number(raw['pagination[page]']) : 1,
    pageSize: raw['pagination[pageSize]']
      ? Number(raw['pagination[pageSize]'])
      : 25,
  };

  const filters = {
    titleContains: raw['filters[Title][$contains]'] || undefined,
  };

  const sort = raw.sort
    ? (() => {
        const [field, order] = raw.sort.split(':');
        return { field, order };
      })()
    : undefined;

  const populate = raw.populate === '*' ? true : false;

  console.log(populate);
  

  return { pagination, filters, sort, populate };
};
