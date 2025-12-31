import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Message Screens
import Message_Screen from '../screens/message/Message_Screen';
import InfoScreen from '../screens/message/info Screen';
import InfoEdit from '../screens/message/info Edit';

// Constants
import { screenMap } from '../constants/screenMap';

const Stack = createNativeStackNavigator();

/**
 * MessageStackNavigator
 * Handles message-related screen navigation
 * Can be used as a nested navigator or directly in the app flow
 */
export default function MessageStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      {/* Main Message List */}
      <Stack.Screen
        name={screenMap.messageScreen}
        component={Message_Screen}
        options={{
          title: 'Messages',
        }}
      />

      {/* Message Info/Details */}
      <Stack.Screen
        name={screenMap.infoScreen}
        component={InfoScreen}
        options={{
          title: 'Chat Info',
        }}
      />

      {/* Edit Message Info */}
      <Stack.Screen
        name={screenMap.infoEdit}
        component={InfoEdit}
        options={{
          title: 'Edit Chat',
        }}
      />
    </Stack.Navigator>
  );
}