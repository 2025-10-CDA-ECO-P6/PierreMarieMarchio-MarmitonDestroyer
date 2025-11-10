import { LoginRequestDTO, LoginResponseDTO } from '../dto';
import { UseCase } from '../../../common/interfaces';
import { AuthService } from '../../../../domain/features/auth/interfaces';

export class LoginUseCase
  implements UseCase<LoginRequestDTO, LoginResponseDTO>
{
  constructor(private readonly authService: AuthService) {}

  async execute(request: LoginRequestDTO): Promise<LoginResponseDTO> {
    const { token } = await this.authService.login({
      email: request.email,
      password: request.password,
    });

    return { token };
  }
}
