/**
 * @format
 */

import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import '@walletconnect/react-native-compat';
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';

// Background message handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Background message:', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
