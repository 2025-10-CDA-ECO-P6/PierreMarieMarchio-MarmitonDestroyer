import { User } from '../../../../domain/common/entities';
import { UserRepository } from '../../../../domain/common/interfaces';
import { UserDTO, UserFullDTO } from '../../dto';
import { UseCase } from '../../interfaces';

export interface UpdateUserResponse {
  data: UserFullDTO | null;
}

export class UpdateUserUseCase
  implements
    UseCase<{ id: string; input: Partial<UserDTO> }, UpdateUserResponse>
{
  constructor(private readonly userRepo: UserRepository) {}

  async execute({
    id,
    input,
  }: {
    id: string;
    input: Partial<UserDTO>;
  }): Promise<UpdateUserResponse> {
    const existing = await this.userRepo.findById(id);
    if (!existing) return { data: null };

    const updated = new User(
      id,
      input.name ?? existing.name,
      input.email ?? existing.email,
      existing.password,
      existing.createdAt,
      new Date(),
    );

    await this.userRepo.update(updated);

    return {
      data: { id: updated.id, name: updated.name, email: updated.email },
    };
  }
}
