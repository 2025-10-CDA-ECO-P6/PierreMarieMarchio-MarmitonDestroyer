export const queryParser = (raw: Record<string, any>) => {
  const page = Number(raw['pagination[page]'] ?? 1);
  const pageSize = Number(raw['pagination[pageSize]'] ?? 25);

  const pagination = {
    limit: pageSize,
    offset: (page - 1) * pageSize,
  };

  const filters: Record<string, any> = {};
  Object.keys(raw).forEach((key) => {
    const match = key.match(/^filters\[(.+?)\]\[(.+?)\]$/);
    if (match) {
      const field = match[1];
      const op = match[2];
      filters[`${field}__${op}`] = raw[key];
    }
  });

  const sort = raw.sort
    ? (() => {
        const [field, order] = raw.sort.split(':');
        return { field, order };
      })()
    : undefined;

  const populate = raw.populate === '*' ? true : false;

  return { pagination, filters, sort, populate };
};
