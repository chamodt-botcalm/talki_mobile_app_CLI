import api from '../config/api';

export const authService = {
  newUser: async (walletId: string, walletName: string, token: string) => {
    const response = await api.post('/newUser', {
      walletId,
      walletName,
      token,
    });
    return response.data;
  },

  getUserList: async (id: string) => {
    const response = await api.get(`/getUserList?id=${id}`);
    return response.data;
  },

  getChatHistory: async (sender: string, receiver: string) => {
    const response = await api.get(`/getChatHistory?sender=${sender}&reciever=${receiver}`);
    return response.data;
  },
};

export const chatService = {
  sendMessage: async (messageData: any) => {
    const response = await api.post('/sendMessage', messageData);
    return response.data;
  },

  forwardMessage: async (senderid: string, recieverid: string, ids: string[]) => {
    const response = await api.post('/forwardMessage', {
      senderid,
      recieverid,
      ids,
    });
    return response.data;
  },
};