import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomePage from '../screens/Welcome Page';
import ConnectWallet from '../screens/Connect Wallet';
import UserAccount from '../screens/User Account';
import SettingsInfo from '../screens/tabs/settingsinfo/Settings_Info';
import Stickers from '../screens/Settings/Stickers';
import Notifications from '../screens/Settings/Notifications';
import TabNavigator from './TabNavigator';
import MessageStackNavigator from './MessageStackNavigator';
import { RootStackParamList } from '../types/navigation';
import Privacy from '../screens/Settings/Privacy';
import Storage from '../screens/Settings/Storage';
import Apperance from '../screens/Settings/Apperance';
import Language from '../screens/Settings/Language';
import Deposite from '../screens/deposit';
import Video_Call_Ringing from '../screens/Video-Call-Ringing';
import Audio_Call_Ringing from '../screens/Audio-Call-Ringing';
import IncomingVideoCall from '../screens/Incoming-Video-Call';
import IncomingAudioCalling from '../screens/Incoming-Audio-Calling';
import AudioCallAnswer from '../screens/Audio-Call-Answer';

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
        <Stack.Screen name="Deposite" component={Deposite} />
        <Stack.Screen name="VideoRinging" component={Video_Call_Ringing} />
        <Stack.Screen name="AudioRinging" component={Audio_Call_Ringing} />
        <Stack.Screen name="IncomingVideoCall" component={IncomingVideoCall} />
        <Stack.Screen name="IncomingAudiooCall" component={IncomingAudioCalling} />
        <Stack.Screen name="AudioCallAnswer" component={AudioCallAnswer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}