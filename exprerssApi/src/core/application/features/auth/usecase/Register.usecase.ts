import { AuthService } from '../../../../domain/features/auth/interfaces';
import { UseCase } from '../../../common/interfaces';
import { RegisterRequestDTO, RegisterResponseDTO } from '../dto';

export class RegisterUseCase
  implements UseCase<RegisterRequestDTO, RegisterResponseDTO>
{
  constructor(private readonly authService: AuthService) {}

  async execute(request: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    const { token } = await this.authService.register({
      name: request.name,
      email: request.email,
      password: request.password,
    });

    return { token };
  }
}
