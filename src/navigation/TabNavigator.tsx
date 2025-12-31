import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useWindowDimensions } from 'react-native';

// Tab Screens
import WalletScreen from '../screens/tabs/WalletScreen';
import ChatScreen from '../screens/tabs/ChatScreen';
import ContactScreen from '../screens/tabs/ContactScreen';
import SettingsScreen from '../screens/tabs/SettingsScreen';
import CallScreen from '../screens/call/CallScreen';

// Custom Tab Components
import BottomNavigator from '../components/BottomNavigator';
import MessageBottomTab from '../components/messageBottomTab';

// Constants
import { screenMap } from '../constants/screenMap';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 600 || height >= 1000;

  return (
    <Tab.Navigator
      tabBar={(props) => {
        // Check if current route is chat screen
        const currentRouteName = props.state.routeNames[props.state.index];
        const isChatScreen = currentRouteName === screenMap.chatScreen;
        
        // Show different tab bar based on screen and device
        const shouldShowMessageBottomTab = isTablet && isChatScreen;
        return shouldShowMessageBottomTab ? (
          <MessageBottomTab {...props} />
        ) : (
          <BottomNavigator {...props} />
        );
      }}
      screenOptions={{
        headerShown: false,
        tabBarLabel: () => null, // Hide tab labels if using custom tab bar
      }}
    >
      {/* Wallet Tab */}
      <Tab.Screen
        name={screenMap.wallet}
        component={WalletScreen}
        options={{
          title: 'Wallet',
        }}
      />

      {/* Chat Tab */}
      <Tab.Screen
        name={screenMap.chatScreen}
        component={ChatScreen}
        options={{
          title: 'Chat',
        }}
      />

      {/* Contacts Tab */}
      <Tab.Screen
        name={screenMap.contacts}
        component={ContactScreen}
        options={{
          title: 'Contacts',
        }}
      />

      {/* Settings Tab */}
      <Tab.Screen
        name={screenMap.settings}
        component={SettingsScreen}
        options={{
          title: 'Settings',
        }}
      />

      {/* Calls/History Tab */}
      <Tab.Screen
        name={screenMap.callScreen}
        component={CallScreen}
        options={{
          title: 'Calls',
        }}
      />
    </Tab.Navigator>
  );
}