export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  data: {
    token: string;
  };
}
