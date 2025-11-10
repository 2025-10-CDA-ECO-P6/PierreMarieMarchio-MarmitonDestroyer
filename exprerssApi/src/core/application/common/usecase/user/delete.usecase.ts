import { UserRepository } from '../../../../domain/common/interfaces';
import { UseCase } from '../../interfaces';

export interface DeleteUserResponse {
  success: boolean;
}

export class DeleteUserUseCase implements UseCase<string, DeleteUserResponse> {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(id: string): Promise<DeleteUserResponse> {
    const user = await this.userRepo.findById(id);
    if (!user) return { success: false };

    await this.userRepo.delete(id);
    return { success: true };
  }
}
