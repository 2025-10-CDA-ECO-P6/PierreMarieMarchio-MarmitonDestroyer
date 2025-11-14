import { AuthService } from "../../../domain/auth/interfaces";
import { UserFullDTO } from "../../common/dto";
import { ValidationError, ConflictError } from "../../common/exeptions";
import { UseCase } from "../../common/interfaces";
import { RegisterRequestDTO, RegisterResponseDTO } from "../dto";


export class RegisterUseCase
  implements UseCase<RegisterRequestDTO, RegisterResponseDTO>
{
  constructor(private readonly authService: AuthService) {}

  async execute(request: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    if (!request.username || !request.email || !request.password) {
      throw new ValidationError('Name, email, and password are required');
    }

    try {
      const { token, user } = await this.authService.register({
        name: request.username,
        email: request.email,
        password: request.password,
      });

      const publicUser: UserFullDTO = {
        id: user.id,
        email: user.email,
        name: user.name,
      };

      return { token, user: publicUser };
    } catch (e: any) {
      if (e.message.includes('already exists')) {
        throw new ConflictError('Error');
      }
      throw e;
    }
  }
}
