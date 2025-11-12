export interface RegisterRequestDTO {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponseDTO {
  data: {
    token: string;
  };
}
