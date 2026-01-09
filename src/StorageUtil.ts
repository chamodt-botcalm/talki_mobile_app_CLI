import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Storage {
  getKeys(): Promise<string[]>;
  getEntries<T = any>(): Promise<[string, T][]>;
  getItem<T = any>(key: string): Promise<T | undefined>;
  setItem<T = any>(key: string, value: T): Promise<void>;
  removeItem(key: string): Promise<void>;
}

export const storage: Storage = {
  async getKeys() {
    return await AsyncStorage.getAllKeys();
  },
  async getEntries() {
    const keys = await AsyncStorage.getAllKeys();
    const entries = await AsyncStorage.multiGet(keys);
    return entries.map(([key, value]) => [key, JSON.parse(value || 'null')]);
  },
  async getItem(key: string) {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : undefined;
  },
  async setItem(key: string, value: any) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  async removeItem(key: string) {
    await AsyncStorage.removeItem(key);
  },
};