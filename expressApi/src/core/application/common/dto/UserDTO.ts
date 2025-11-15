export interface UserDTO {
  name: string;
  email: string;
}
export interface UserFullDTO extends UserDTO {
  id: string;
}
