
import React, { useEffect } from 'react'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { screenMap } from '../constants/screenMap';

type RootStackParamList = {
  [key: string]: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function routs() {
  const navigation = useNavigation<NavigationProp>();
  useEffect(() => {
    navigation.navigate(screenMap.wallet);
  }, [])

  return null
}