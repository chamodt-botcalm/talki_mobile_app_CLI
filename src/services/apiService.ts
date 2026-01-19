import axios from 'axios';
import { API_BASE_URL } from '../config/env';

export const updateFCMToken = async (userId: string, fcmToken: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/${userId}/fcm-token`, {
      fcmtoken: fcmToken
    });
    console.log('FCM token updated successfully');
    return response.data;
  } catch (error) {
    console.error('Failed to update FCM token:', error);
    throw error;
  }
};
