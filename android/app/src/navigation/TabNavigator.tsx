import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useWindowDimensions } from 'react-native';
import { TabParamList } from '../types/navigation';
import WalletScreen from '../screens/tabs/WalletScreen';
import ChatScreen from '../screens/tabs/ChatScreen';
import ContactScreen from '../screens/tabs/ContactScreen';
import SettingsScreen from '../screens/tabs/SettingsScreen';
import CallScreen from '../screens/call/CallScreen';
import BottomNavigator from '../components/BottomNavigator';
import MessageBottomTab from '../components/messageBottomTab';

const Tab = createBottomTabNavigator();

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