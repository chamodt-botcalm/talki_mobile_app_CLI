import AsyncStorage from '@react-native-async-storage/async-storage';
import { safeJsonParse, safeJsonStringify } from '@walletconnect/safe-json';
import type { Storage } from '@reown/appkit-react-native';

/**
 * AppKit storage adapter (AsyncStorage)
 *
 * AppKit expects a `Storage` interface implementation.
 * We use WalletConnect safe JSON helpers to avoid crashes on malformed values.
 */
export const storage: Storage = {
  getKeys: async () => {
    return (await AsyncStorage.getAllKeys()) as string[];
  },

  getEntries: async <T = any>(): Promise<[string, T][]> => {
    const keys = await AsyncStorage.getAllKeys();
    const entries = await AsyncStorage.multiGet(keys);
    return entries.map(([key, value]) => [key, safeJsonParse(value ?? '') as T]);
  },

  getItem: async <T = any>(key: string): Promise<T | undefined> => {
    const value = await AsyncStorage.getItem(key);
    if (typeof value === 'undefined' || value === null) return undefined;
    return safeJsonParse(value) as T;
  },

  setItem: async <T = any>(key: string, value: T): Promise<void> => {
    await AsyncStorage.setItem(key, safeJsonStringify(value));
  },

  removeItem: async (key: string): Promise<void> => {
    await AsyncStorage.removeItem(key);
  },
};