import React from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import AppContainer from './src/navigation/AppNavigator';
import './src/config/walletConfig';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppKitProvider } from '@reown/appkit-react-native';
import { appKit } from './src/AppKitConfig';

export default function App() {
  return(
    <SafeAreaProvider>
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
         <AppKitProvider instance={appKit}>
        <AppContainer/>
        </AppKitProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}