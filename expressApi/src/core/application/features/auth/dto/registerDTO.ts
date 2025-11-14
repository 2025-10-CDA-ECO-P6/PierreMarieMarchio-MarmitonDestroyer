import { UserFullDTO } from '../../../common/dto';

export interface RegisterRequestDTO {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponseDTO {
  token: string;
  user: UserFullDTO;
}
