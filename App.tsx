import React from 'react';
import RootNavigator from './src/navigation/index.tsx';
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return(
    <GestureHandlerRootView style={{flex: 1}}>
      <RootNavigator />
    </GestureHandlerRootView>
  )
}