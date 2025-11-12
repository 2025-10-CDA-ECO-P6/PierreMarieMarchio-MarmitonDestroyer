import { LoginRequestDTO, LoginResponseDTO } from '../dto';
import { UseCase } from '../../../common/interfaces';
import { AuthService } from '../../../../domain/features/auth/interfaces';
import { ValidationError } from '../../../common/exeptions';

export class LoginUseCase
  implements UseCase<LoginRequestDTO, LoginResponseDTO>
{
  constructor(private readonly authService: AuthService) {}

  async execute(request: LoginRequestDTO): Promise<LoginResponseDTO> {
    if (!request.email || !request.password) {
      throw new ValidationError('Email and password are required');
    }

    try {
      const { token } = await this.authService.login({
        email: request.email,
        password: request.password,
      });
      return { token };
    } catch {
      throw new ValidationError('Invalid email or password');
    }
  }
}
