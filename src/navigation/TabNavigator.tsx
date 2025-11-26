import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useWindowDimensions } from 'react-native';
import { TabParamList } from '../types/navigation';
import WalletScreen from '../../android/app/src/screens/tabs/WalletScreen';
import ChatScreen from '../../android/app/src/screens/tabs/ChatScreen';
import ContactScreen from '../../android/app/src/screens/tabs/ContactScreen';
import SettingsScreen from '../../android/app/src/screens/tabs/SettingsScreen';
import CallScreen from '../../android/app/src/screens/call/CallScreen';
import BottomNavigator from '../../android/app/src/components/BottomNavigator';
import MessageBottomTab from '../../android/app/src/components/messageBottomTab';

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 600 || height >= 1000;
  
  return (
    <Tab.Navigator
      tabBar={(props) => {
        const isChatScreen = props.state.routeNames[props.state.index] === 'ChatScreen';
        const shouldShowMessageBottomTab = isTablet && isChatScreen;
        return shouldShowMessageBottomTab ? <MessageBottomTab {...props} /> : <BottomNavigator {...props} />;
      }}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="ChatScreen" component={ChatScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="CallScreen" component={CallScreen} />
    </Tab.Navigator>
  );
}