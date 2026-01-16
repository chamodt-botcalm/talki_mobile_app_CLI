import api from '../config/api';

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

  // Backend may include these; keep optional
  privateKey?: string;
  privatekeyToAccount?: boolean;
  profileSetup?: number;
};

export type NewUserResponse = {
  status: number;
  msg?: string;
  message?: string;
  user?: BackendUser;
};

export async function newUser(body: NewUserBody): Promise<BackendUser> {
  // Backend route is app.post("/newUser")
  const { data } = await api.post<NewUserResponse>('/newUser', body);

  if (data?.status !== 200 || !data?.user) {
    throw new Error(data?.message || data?.msg || 'Failed to create user');
  }

  return data.user;
}
export type UpdateUserBody = {
  firstname?: string;
  lastname?: string;
  username?: string;
  bio?: string;
  image?: string;
};

export async function updateUser(userId: string, body: UpdateUserBody): Promise<BackendUser> {
  // Backend route is app.post("/editUser/:id")
  const { data } = await api.post<NewUserResponse>(`/editUser/${userId}`, body);

  if (data?.status !== 200 || !data?.user) {
    throw new Error(data?.message || data?.msg || 'Failed to update user');
  }

  return data.user;
}

export async function checkUserExists(walletAddress: string): Promise<BackendUser | null> {
  try {
    const { data } = await api.post<NewUserResponse>('/newUser', {
      walletId: walletAddress,
      walletName: 'imported',
      token: null,
    });

    if (data?.status === 200 && data?.user) {
      return data.user;
    }
    return null;
  } catch (error) {
    return null;
  }
}