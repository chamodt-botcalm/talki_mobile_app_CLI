import { api } from './client';

export type NewUserBody = {
  walletId: string | null;
  walletName: string;
  token: string | null;
};

export type BackendUser = {
  _id: string;
  walletName: string;
  walletAddress: string;
  firstname?: string;
  lastname?: string;
  username?: string;
  image?: string;
  bio?: string;
  fcmtoken?: string;
  // add other fields you return
};

export type NewUserResponse = {
  status: number;
  msg?: string;
  message?: string;
  user?: BackendUser;
};

export async function newUser(body: NewUserBody): Promise<BackendUser> {
  // change '/newUser' to '/api/newUser' if your server uses app.use('/api', router)
  const { data } = await api.post<NewUserResponse>('/newUser', body);

  if (data?.status !== 200 || !data?.user) {
    throw new Error(data?.message || data?.msg || 'Failed to create user');
  }

  return data.user;
}
