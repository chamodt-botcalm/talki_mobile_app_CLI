import React, { useEffect } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import AppContainer from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppKit, AppKitProvider } from '@reown/appkit-react-native';
import { appKit } from './src/AppKitConfig';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { getFCMToken, setupFCMListeners } from './src/services/fcmService';

export default function App() {
  useEffect(() => {
    setupFCMListeners();
    getFCMToken().then(token => {
      if (token) {
        // TODO: Send token to your backend API
        console.log('FCM Token ready:', token);
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AppKitProvider instance={appKit}>
            <NavigationContainer>
              <AppContainer />
            </NavigationContainer>

            {/* Required: renders AppKit modal + UI portal */}
            <AppKit />
          </AppKitProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}