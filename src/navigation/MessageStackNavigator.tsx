import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MessageStackParamList } from '../types/navigation';
import Message_Screen from '../../android/app/src/screens/message/Message_Screen';
import InfoScreen from '../../android/app/src/screens/message/info Screen';
import InfoEdit from '../../android/app/src/screens/message/info Edit';

const Stack = createNativeStackNavigator<MessageStackParamList>();

export default function MessageStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MessageScreen" component={Message_Screen} />
      <Stack.Screen name="InfoScreen" component={InfoScreen} />
      <Stack.Screen name="InfoEdit" component={InfoEdit} />
    </Stack.Navigator>
  );
}