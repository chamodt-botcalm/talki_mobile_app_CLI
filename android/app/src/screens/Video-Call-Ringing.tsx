import { View, Text, BackHandler, ImageBackground, StyleSheet, Image, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { CompositeNavigationProp } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TabParamList, MessageStackParamList, RootStackParamList } from '../../../../src/types/navigation'
import { images } from '../constants/images'
import { scaleHeight, scaleWidth } from '../constants/size'
import CallController from '../components/Call_Controller'

type CombinedNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList>,
  CompositeNavigationProp<
    NativeStackNavigationProp<TabParamList>,
    NativeStackNavigationProp<MessageStackParamList>
  >
>;

const Video_Call_Ringing = () => {
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


    <View style={styles.container}>
      <ImageBackground source={images.juliet} resizeMode="cover" style={styles.bg} />
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={images.backk} style={styles.backIcon} />
          <Text style={styles.headerText}>Back</Text>
        </Pressable>
      </View>
      <View style={styles.callerInfo}>
        <Text style={styles.callerName}>Juliet Smith</Text>
        <Text style={styles.callerStatus}>Requesting...</Text>
      </View>
      <View style={styles.controllerContainer}>
        <CallController />
      </View>
    </View>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(20),
    paddingTop: scaleHeight(40),
  },
  headerText: {
    color: '#D9FD00',
    fontSize: 18
  },
  callerInfo: {
    position: 'absolute',
    top: scaleHeight(40),
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  callerName: {
    fontSize: scaleWidth(25),
    color: 'white',
    marginBottom: scaleHeight(5),
  },
  callerStatus: {
    fontSize: scaleWidth(16),
    color: 'white',
  },
  bg: {
    position: 'absolute',
    bottom: scaleHeight(0),
    left: scaleWidth(-70),
    width: '160%',
    height: '160%',
  },
  controllerContainer: {
    position: 'absolute',
    bottom: scaleHeight(50),
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  backIcon: {
    width: scaleWidth(14),
    height: scaleHeight(14),
    tintColor: '#D9FD00',
    resizeMode: 'contain'
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(9)
  },
});

export default Video_Call_Ringing