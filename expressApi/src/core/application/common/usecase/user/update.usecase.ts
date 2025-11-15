import { User } from '../../../../domain/common/entities';
import { UserRepository } from '../../../../domain/common/interfaces';
import { UserDTO, UserFullDTO } from '../../dto';
import { NotFoundError } from '../../exceptions';
import { UseCase } from '../../interfaces';

export interface UpdateUserResponse {
  data: { name?: string; email?: string; password?: string };
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
}

export class UpdateUserUseCase
  implements
    UseCase<
      { id: string; input: Partial<UpdateUserRequest> },
      UpdateUserResponse
    >
{
  constructor(private readonly userRepo: UserRepository) {}

  async execute({
    id,
    input,
  }: {
    id: string;
    input: Partial<UpdateUserRequest>;
  }): Promise<UpdateUserResponse> {
    const existing = await this.userRepo.findById(id);
    if (!existing) throw new NotFoundError('User not found');

    const updated = new User(
      existing.id,
      input.name ?? existing.name,
      input.email ?? existing.email,
      input.password ?? existing.password,
      existing.createdAt,
      new Date(),
    );

    await this.userRepo.update(updated);

    return { data: this.toDTO(updated) };
  }

  private toDTO(user: User): UserFullDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
