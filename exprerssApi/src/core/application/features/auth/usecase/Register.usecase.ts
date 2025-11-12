import { AuthService } from '../../../../domain/features/auth/interfaces';
import { ConflictError, ValidationError } from '../../../common/exeptions';
import { UseCase } from '../../../common/interfaces';
import { RegisterRequestDTO, RegisterResponseDTO } from '../dto';

export class RegisterUseCase
  implements UseCase<RegisterRequestDTO, RegisterResponseDTO>
{
  constructor(private readonly authService: AuthService) {}

  async execute(request: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    if (!request.name || !request.email || !request.password) {
      throw new ValidationError('Name, email, and password are required');
    }

    try {
      const { token } = await this.authService.register({
        name: request.name,
        email: request.email,
        password: request.password,
      });
      return { token };
    } catch (e: any) {
      if (e.message.includes('already exists')) {
        throw new ConflictError('Error');
      }
      throw e;
    }
  }
}
