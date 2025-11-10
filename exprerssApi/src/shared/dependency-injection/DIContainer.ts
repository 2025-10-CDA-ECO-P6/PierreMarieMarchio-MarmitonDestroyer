import { Factory, Provider } from './types';

export class DIContainer {
  private readonly providers = new Map<string, Provider<any>>();

  register<T>(key: string, factory: Factory<T>): void {
    this.providers.set(key, { factory, singleton: false });
  }

  singleton<T>(key: string, factory: Factory<T>): void {
    this.providers.set(key, { factory, singleton: true });
  }

  inject<T>(key: string): T {
    const provider = this.providers.get(key);
    if (!provider) throw new Error(`Service '${key}' not registered.`);

    if (provider.singleton) {
      if (!provider.instance) provider.instance = provider.factory(this);
      return provider.instance;
    }

    return provider.factory(this);
  }
}
