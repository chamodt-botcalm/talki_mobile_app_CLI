import { View, Text, BackHandler, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { CompositeNavigationProp } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TabParamList, MessageStackParamList, RootStackParamList } from '../../../../src/types/navigation'

type CombinedNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList>,
  CompositeNavigationProp<
    NativeStackNavigationProp<TabParamList>,
    NativeStackNavigationProp<MessageStackParamList>
  >
>;


const Audio_Call_Ringing = () => {
  const navigation = useNavigation<CombinedNavigationProp>();
  useEffect(() => {
      const backAction = () => {
        navigation.goBack();
        return true;
      };
  
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => backHandler.remove();
    }, [navigation]);
  return (
   <View>
    
   </View>
  )
}

export default Audio_Call_Ringing