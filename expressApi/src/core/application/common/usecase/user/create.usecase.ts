import { randomUUID } from 'node:crypto';
import { User } from '../../../../domain/common/entities';
import bcrypt from 'bcryptjs';
import { UserFullDTO } from '../../dto';
import { UseCase } from '../../interfaces';
import { UserRepository } from '../../../../domain/common/interfaces';
import { ValidationError } from '../../exeptions';

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

  async execute(user: CreateUserRequest): Promise<CreateUserResponse> {
    if (!user.name || !user.email || !user.password) {
      throw new ValidationError('Name, email and password are required');
    }

    const now = new Date();
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = new User(
      randomUUID(),
      user.name,
      user.email,
      hashedPassword,
      now,
      now,
    );

    await this.userRepo.add(newUser);

    return {
      data: { id: newUser.id, name: newUser.username, email: newUser.email },
    };
  }
}
