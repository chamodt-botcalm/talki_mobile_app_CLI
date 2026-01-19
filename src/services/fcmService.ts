import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    const authStatus = await messaging().requestPermission();
    return authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
           authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  } catch (error) {
    console.error('Permission request error:', error);
    return false;
  }
};

export const getFCMToken = async (): Promise<string | null> => {
  try {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) return null;

    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    return token;
  } catch (error) {
    console.error('Get FCM token error:', error);
    return null;
  }
};

export const setupFCMListeners = () => {
  // Foreground messages
  messaging().onMessage(async remoteMessage => {
    console.log('Foreground notification:', remoteMessage);
  });

  // Background/Quit state messages
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background notification:', remoteMessage);
  });

  // Token refresh
  messaging().onTokenRefresh(token => {
    console.log('Token refreshed:', token);
    // Update token on your backend
  });
};
