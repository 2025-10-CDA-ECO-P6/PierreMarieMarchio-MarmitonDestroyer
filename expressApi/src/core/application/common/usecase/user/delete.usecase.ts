import { UserRepository } from '../../../../domain/common/interfaces';
import { NotFoundError } from '../../exeptions';
import { UseCase } from '../../interfaces';

export interface DeleteUserResponse {
  success: boolean;
}

export class DeleteUserUseCase implements UseCase<string, DeleteUserResponse> {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(id: string): Promise<DeleteUserResponse> {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundError('User not found');

    await this.userRepo.delete(id);
    return { success: true };
  }
}