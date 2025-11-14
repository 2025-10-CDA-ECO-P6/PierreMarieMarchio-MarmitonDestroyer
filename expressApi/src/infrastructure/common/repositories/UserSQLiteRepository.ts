import { User } from '../../../core/domain/common/entities';
import { UserRepository } from '../../../core/domain/common/interfaces';
import { DbContext } from '../../../shared/migration-system/DbContext';
import { BaseSQLiteRepository } from '../bases';

export class UserSQLiteRepository
  extends BaseSQLiteRepository<User>
  implements UserRepository
{
  protected tableName = 'users';

  constructor(context: DbContext) {
    super(context);
  }

  protected mapRowToEntity(row: any): User {
    return new User(
      row.id,
      row.name,
      row.email,
      row.password,
      new Date(row.createdAt),
      new Date(row.updatedAt),
    );
  }
}
