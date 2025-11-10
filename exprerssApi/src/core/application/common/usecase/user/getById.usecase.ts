import { UserRepository } from '../../../../domain/common/interfaces';
import { UserFullDTO } from '../../dto';
import { UseCase } from '../../interfaces';

export interface GetUserByIdResponse {
  data: UserFullDTO | null;
}

export class GetUserByIdUseCase
  implements UseCase<string, GetUserByIdResponse>
{
  constructor(private readonly userRepo: UserRepository) {}

  async execute(id: string): Promise<GetUserByIdResponse> {
    const user = await this.userRepo.findById(id);
    if (!user) return { data: null };

    return { data: { id: user.id, name: user.name, email: user.email } };
  }
}
