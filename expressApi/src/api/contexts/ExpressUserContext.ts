import { UserContext } from '../../core/domain/common/interfaces';

export class ExpressUserContext implements UserContext {
  constructor(
    private readonly userId: string,
    private readonly email: string,
    private readonly name: string,
  ) {}

  getUserId(): string {
    return this.userId;
  }

  getEmail(): string {
    return this.email;
  }

  getName(): string {
    return this.name;
  }
}
