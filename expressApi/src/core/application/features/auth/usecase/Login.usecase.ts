import { LoginRequestDTO, LoginResponseDTO } from '../dto';
import { UseCase } from '../../../common/interfaces';
import { AuthService } from '../../../../domain/features/auth/interfaces';
import { ValidationError } from '../../../common/exeptions';
import { UserFullDTO } from '../../../common/dto';

export class LoginUseCase
  implements UseCase<LoginRequestDTO, LoginResponseDTO>
{
  constructor(private readonly authService: AuthService) {}

  async execute(request: LoginRequestDTO): Promise<LoginResponseDTO> {
    if (!request.identifier || !request.password) {
      throw new ValidationError('Email and password are required');
    }

    try {
      const { token, user } = await this.authService.login({
        email: request.identifier,
        password: request.password,
      });

      const publicUser: UserFullDTO = {
        id: user.id,
        email: user.email,
        name: user.name,
      };

      return { token, user: publicUser };
    } catch {
      throw new ValidationError('Invalid email or password');
    }
  }
}
