import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Auth Screens
import WelcomePage from '../screens/Welcome Page';
import ConnectWallet from '../screens/Connect Wallet';

// Profile Screens
import UserAccount from '../screens/User Account';
import SettingsInfo from '../screens/tabs/settingsinfo/Settings_Info';

// Tab Navigator
import TabNavigator from './TabNavigator';

// Message Screens
import ChatScreen from '../screens/tabs/ChatScreen';
import Message_Screen from '../screens/message/Message_Screen';
import InfoScreen from '../screens/message/info Screen';
import InfoEdit from '../screens/message/info Edit';

// Call Screens
import CallScreen from '../screens/call/CallScreen';
import Video_Call_Ringing from '../screens/Video-Call-Ringing';
import Audio_Call_Ringing from '../screens/Audio-Call-Ringing';
import IncomingVideoCall from '../screens/Incoming-Video-Call';
import IncomingAudioCalling from '../screens/Incoming-Audio-Calling';
import AudioCallAnswer from '../screens/Audio-Call-Answer';
import VideoCallAnswer from '../screens/Video-Call-Answer';

// Settings Screens
import Stickers from '../screens/Settings/Stickers';
import Notifications from '../screens/Settings/Notifications';
import Privacy from '../screens/Settings/Privacy';
import Storage from '../screens/Settings/Storage';
import Apperance from '../screens/Settings/Apperance';
import Language from '../screens/Settings/Language';

// Other Screens
import ContactScreen from '../screens/tabs/ContactScreen';
import Deposite from '../screens/deposit';

import { screenMap } from '../constants/screenMap';

const Stack = createNativeStackNavigator();

const AppContainer = () => {
  return (
    <Stack.Navigator
      initialRouteName={screenMap.welcome}
      screenOptions={{
        headerShown: false,
        animation: 'default',
      }}
    >
        {/* ========== AUTH STACK ========== */}
        <Stack.Screen
          name={screenMap.welcome}
          component={WelcomePage}
          options={{ animation: 'none' }}
        />
        <Stack.Screen
          name={screenMap.connectWallet}
          component={ConnectWallet}
          options={{ animation: 'default' }}
        />
        <Stack.Screen
          name={screenMap.import}
          component={ConnectWallet}
          options={{ animation: 'default' }}
        />

        {/* ========== PROFILE SETUP ========== */}
        <Stack.Screen
          name={screenMap.setProfile}
          component={UserAccount}
          options={{ animation: 'default' }}
        />
        <Stack.Screen
          name={screenMap.editProfile}
          component={UserAccount}
          options={{ animation: 'default' }}
        />

        {/* ========== MAIN TABS (Tab Navigator with Chat, Wallet, Contacts, Settings, Calls) ========== */}
        <Stack.Screen
          name={screenMap.mainTabs}
          component={TabNavigator}
          options={{ animation: 'default' }}
        />

        {/* ========== CHAT & MESSAGE STACK ========== */}
        <Stack.Screen
          name={screenMap.chat}
          component={ChatScreen}
          options={{ animation: 'default' }}
        />
        <Stack.Screen
          name={screenMap.messageScreen}
          component={Message_Screen}
          options={{ animation: 'default' }}
        />
        <Stack.Screen
          name={screenMap.infoScreen}
          component={InfoScreen}
          options={{ animation: 'default' }}
        />
        <Stack.Screen
          name={screenMap.infoEdit}
          component={InfoEdit}
          options={{ animation: 'default' }}
        />
        <Stack.Screen
          name={screenMap.saved}
          component={Message_Screen}
          options={{ animation: 'default' }}
        />

        {/* ========== CALL STACK ========== */}
        <Stack.Screen
          name={screenMap.call}
          component={CallScreen}
          options={{ animation: 'default' }}
        />
        <Stack.Screen
          name={screenMap.videoRinging}
          component={Video_Call_Ringing}
          options={{ animation: 'none', gestureEnabled: false }}
        />
        <Stack.Screen
          name={screenMap.audioRinging}
          component={Audio_Call_Ringing}
          options={{ animation: 'none', gestureEnabled: false }}
        />
        <Stack.Screen
          name={screenMap.incomingVideoCall}
          component={IncomingVideoCall}
          options={{ animation: 'none', gestureEnabled: false }}
        />
        <Stack.Screen
          name={screenMap.incomingAudioCall}
          component={IncomingAudioCalling}
          options={{ animation: 'none', gestureEnabled: false }}
        />
        <Stack.Screen
          name={screenMap.audioCallAnswer}
          component={AudioCallAnswer}
          options={{ animation: 'none', gestureEnabled: false }}
        />
        <Stack.Screen
          name={screenMap.videoCallAnswer}
          component={VideoCallAnswer}
          options={{ animation: 'none', gestureEnabled: false }}
        />
        <Stack.Screen
          name={screenMap.incall}
          component={Audio_Call_Ringing}
          options={{ animation: 'none', gestureEnabled: false }}
        />

        {/* ========== CONTACTS ========== */}
        <Stack.Screen
          name={screenMap.viewContact}
          component={ContactScreen}
          options={{ animation: 'default' }}
        />
        <Stack.Screen
          name={screenMap.blocked}
          component={ContactScreen}
          options={{ animation: 'default' }}
        />

        {/* ========== SETTINGS STACK ========== */}
        <Stack.Screen
          name={screenMap.sticker}
          component={Stickers}
          options={{ animation: 'default' }}
        />
        <Stack.Screen
          name={screenMap.language}
          component={Language}
          options={{ animation: 'default' }}
        />
        <Stack.Screen
          name={screenMap.notifications}
          component={Notifications}
          options={{ animation: 'default' }}
        />
        <Stack.Screen
          name={screenMap.privacy}
          component={Privacy}
          options={{ animation: 'default' }}
        />
        <Stack.Screen
          name={screenMap.storage}
          component={Storage}
          options={{ animation: 'default' }}
        />
        <Stack.Screen
          name={screenMap.appearance}
          component={Apperance}
          options={{ animation: 'default' }}
        />
        <Stack.Screen
          name={screenMap.settingsInfo}
          component={SettingsInfo}
          options={{ animation: 'default' }}
        />

        {/* ========== WALLET & OTHER ========== */}
        <Stack.Screen
          name={screenMap.deposit}
          component={Deposite}
          options={{ animation: 'default' }}
        />
      </Stack.Navigator>
  );
};

export default AppContainer;