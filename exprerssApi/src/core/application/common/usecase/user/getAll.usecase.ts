import { UserRepository } from '../../../../domain/common/interfaces';
import { UserFullDTO } from '../../dto';
import { UseCase } from '../../interfaces';

export interface GetUsersResponse {
  data: UserFullDTO[];
}

export class GetAllUsersUseCase implements UseCase<void, GetUsersResponse> {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(): Promise<GetUsersResponse> {
    const users = await this.userRepo.findAll();
    const data = users.map((u) => ({ id: u.id, name: u.name, email: u.email }));
    return { data };
  }
}
