import AsyncStorage from '@react-native-async-storage/async-storage';
import type { BackendUser } from '../api/user';

const KEY = 'talki:user';

export async function saveUser(user: BackendUser) {
  await AsyncStorage.setItem(KEY, JSON.stringify(user));
}

export async function getUser(): Promise<BackendUser | null> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as BackendUser) : null;
}

export async function clearUser() {
  await AsyncStorage.removeItem(KEY);
}
