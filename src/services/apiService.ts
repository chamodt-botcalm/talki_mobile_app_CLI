import api from '../config/api';

/**
 * Keep your API calls grouped here.
 * Add more endpoints as you integrate screens.
 */

export const authService = {
  newUser: async (walletId: string | null, walletName: string, token: string | null) => {
    const response = await api.post('/newUser', { walletId, walletName, token });
    return response.data;
  },

  getUserList: async (id: string) => {
    const response = await api.get(`/getUserList?id=${encodeURIComponent(id)}`);
    return response.data;
  },

  getUser: async (id: string) => {
    const response = await api.get(`/getUser?id=${encodeURIComponent(id)}`);
    return response.data;
  },

  getUserLedger: async (userid: string) => {
    const response = await api.get(`/getUserLedger?userid=${encodeURIComponent(userid)}`);
    return response.data;
  },
};

export const chatService = {
  sendMessage: async (messageData: any) => {
    const response = await api.post('/sendMessage', messageData);
    return response.data;
  },

  forwardMessage: async (senderid: string, recieverid: string, ids: string[]) => {
    const response = await api.post('/forwardMessage', { senderid, recieverid, ids });
    return response.data;
  },

  getChatHistory: async (senderid: string, recieverid: string) => {
    const response = await api.get(
      `/getChatHistory?senderid=${encodeURIComponent(senderid)}&recieverid=${encodeURIComponent(
        recieverid
      )}`
    );
    return response.data;
  },
};
