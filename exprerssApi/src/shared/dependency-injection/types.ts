import { DIContainer } from './DIContainer';

export type Factory<T> = (container: DIContainer) => T;

export interface Provider<T> {
  instance?: T;
  factory: Factory<T>;
  singleton: boolean;
}
