import { UserRepository } from '../../../../domain/common/interfaces';
import { UserFullDTO } from '../../dto';
import { NotFoundError } from '../../exceptions';
import { UseCase } from '../../interfaces';

export interface GetUserByIdResponse {
  data: UserFullDTO | null;
  meta: Record<string, any>;
}

export class GetUserByIdUseCase
  implements UseCase<string, { data: UserFullDTO | null; meta: any }>
{
  constructor(private readonly userRepo: UserRepository) {}

  async execute(id: string): Promise<{ data: UserFullDTO | null; meta: any }> {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundError('User not found');

    return {
      data: this.toDTO(user),
      meta: {},
    };
  }

  private toDTO(user: any): UserFullDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
