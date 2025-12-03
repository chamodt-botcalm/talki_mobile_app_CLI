import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomePage from '../../android/app/src/screens/Welcome Page';
import ConnectWallet from '../../android/app/src/screens/Connect Wallet';
import UserAccount from '../../android/app/src/screens/User Account';
import SettingsInfo from '../../android/app/src/screens/tabs/settingsinfo/Settings_Info';
import Stickers from '../../android/app/src/screens/Settings/Stickers';
import Notifications from '../../android/app/src/screens/Settings/Notifications';
import TabNavigator from './TabNavigator';
import MessageStackNavigator from './MessageStackNavigator';
import { RootStackParamList } from '../types/navigation';
import Privacy from '../../android/app/src/screens/Settings/Privacy';
import Storage from '../../android/app/src/screens/Settings/Storage';
import Apperance from '../../android/app/src/screens/Settings/Apperance';
import Language from '../../android/app/src/screens/Settings/Language';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomePage} />
        <Stack.Screen name="ConnectWallet" component={ConnectWallet} />
        <Stack.Screen name="UserAccount" component={UserAccount} />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="MessageStack" component={MessageStackNavigator} />
        <Stack.Screen name="SettingsInfo" component={SettingsInfo} />
        <Stack.Screen name="Sticker" component={Stickers} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Privacy" component={Privacy} />
        <Stack.Screen name="Storage" component={Storage} />
        <Stack.Screen name="Apperance" component={Apperance} />
        <Stack.Screen name="Language" component={Language} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}