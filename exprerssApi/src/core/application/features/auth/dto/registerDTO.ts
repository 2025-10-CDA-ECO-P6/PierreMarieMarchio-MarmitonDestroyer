export interface RegisterRequestDTO {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponseDTO {
  token: string;
}
