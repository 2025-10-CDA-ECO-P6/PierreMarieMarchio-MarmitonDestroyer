import { randomUUID } from 'node:crypto';
import { User } from '../../../../domain/common/entities';
import bcrypt from 'bcryptjs';
import { UserDTO, UserFullDTO } from '../../dto';
import { UseCase } from '../../interfaces';
import { UserRepository } from '../../../../domain/common/interfaces';
import { ValidationError } from '../../exceptions';

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface CreateUserResponse {
  data: UserFullDTO;
}

export class CreateUserUseCase
  implements UseCase<CreateUserRequest, CreateUserResponse>
{
  constructor(private readonly userRepo: UserRepository) {}

  async execute(input: CreateUserRequest): Promise<CreateUserResponse> {
    if (!input.name || !input.email || !input.password) {
      throw new ValidationError('Name, email and password are required');
    }

    const user = new User(
      randomUUID(),
      input.name,
      input.email,
      input.password,
      new Date(),
      new Date(),
    );

    await this.userRepo.create(user);

    return { data: this.toDTO(user) };
  }

  private toDTO(user: User): UserFullDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
