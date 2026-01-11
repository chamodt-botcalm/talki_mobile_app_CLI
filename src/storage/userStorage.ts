import AsyncStorage from '@react-native-async-storage/async-storage';
import type { BackendUser } from '../api/user';

const KEY = 'talki:user';

function stripSensitive(user: BackendUser): BackendUser {
  // Backend may return an encrypted privateKey for talki-created wallets.
  // You can choose to keep it, but storing keys in AsyncStorage is risky.
  // We strip it by default.
  const { privateKey, ...rest } = user as any;
  return rest as BackendUser;
}

export async function saveUser(user: BackendUser) {
  await AsyncStorage.setItem(KEY, JSON.stringify(stripSensitive(user)));
}

export async function getUser(): Promise<BackendUser | null> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as BackendUser) : null;
}

export async function clearUser() {
  await AsyncStorage.removeItem(KEY);
}
