export const buildSqlFilter = (field: string, op: string, value: any) => {
  switch (op) {
    case '$eq':
      return { sql: `${field} = ?`, value };

    case '$contains':
      return { sql: `${field} LIKE ?`, value: `%${value}%` };

    case '$startsWith':
      return { sql: `${field} LIKE ?`, value: `${value}%` };

    case '$endsWith':
      return { sql: `${field} LIKE ?`, value: `%${value}` };

    default:
      return { sql: `${field} = ?`, value };
  }
};
