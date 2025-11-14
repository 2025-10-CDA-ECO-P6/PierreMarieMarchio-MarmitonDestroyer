export interface JWTService {
  sign(payload: object, expiresIn?: string | number): string;
  verify<T = any>(token: string): T;
}
