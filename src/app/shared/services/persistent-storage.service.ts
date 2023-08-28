import { Injectable, InjectionToken, Inject } from '@angular/core';
import { map, replace } from 'ramda';

export const NATIVE_STORAGE_TOKEN = new InjectionToken<IStorage>('StorageToken');
export interface IStorage {
  clear(): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
  setItem(key: string, value: string): void;
}

@Injectable({
  providedIn: 'root',
})
export class PersistentStorageService {
  private STORAGE_PREFIX = '@@app_';

  get prefix() {
    return this.STORAGE_PREFIX;
  }

  constructor(@Inject(NATIVE_STORAGE_TOKEN) private storage: IStorage) {}

  setItem(key: string, value: any) {
    this.storage.setItem(`${this.STORAGE_PREFIX}${key}`, JSON.stringify(value));
  }

  getItem(key: string) {
    const value = this.storage.getItem(`${this.STORAGE_PREFIX}${key}`);
    return JSON.parse(value);
  }

  removeItem(key: string) {
    this.storage.removeItem(`${this.STORAGE_PREFIX}${key}`);
  }

  removeItems(...keys: string[]) {
    keys.forEach((key) => this.storage.removeItem(`${this.STORAGE_PREFIX}${key}`));
  }

  getKeys() {
    const keys = Object.keys(this.storage);

    return map(replace(this.STORAGE_PREFIX, ''), keys);
  }

  getRawKeys() {
    return Object.keys(this.storage);
  }

  clear() {
    this.storage.clear();
  }
}
