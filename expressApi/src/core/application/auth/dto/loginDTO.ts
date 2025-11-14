import { UserFullDTO } from "../../common/dto";


export interface LoginRequestDTO {
  identifier: string;
  password: string;
}

export interface LoginResponseDTO {
  token: string;
  user: UserFullDTO;
}
