
import React, { useEffect } from 'react'
import { TabParamList } from '../types/navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<TabParamList>;

export default function routs() {
      const navigation = useNavigation<NavigationProp>();
  useEffect(() => {
    navigation.navigate('Wallet');
  }, [])

  return null
}