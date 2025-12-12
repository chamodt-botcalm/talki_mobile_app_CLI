import { View, Text, BackHandler,ImageBackground, StyleSheet, Image, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { CompositeNavigationProp } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TabParamList, MessageStackParamList, RootStackParamList } from '../types/navigation'
import { images } from '../constants/images'
import { scaleHeight, scaleWidth } from '../constants/size'
import AudioCallController from '../components/Audio_Call_Controller'
import LinearGradient from 'react-native-linear-gradient'

type CombinedNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList>,
  CompositeNavigationProp<
    NativeStackNavigationProp<TabParamList>,
    NativeStackNavigationProp<MessageStackParamList>
  >
>;


const AudioCallAnswer = () => {
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
     <ImageBackground source={images.blur} resizeMode="cover" style={styles.bg} />
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={images.backk} style={styles.backIcon} />
          <Text style={styles.headerText}>Back</Text>
        </Pressable>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Image source={images.julietr} style={styles.profileImage} />
        </View>
        <Text style={styles.callerName}>Juliet Smith</Text>
        <Text style={styles.callerStatus}>1:20</Text>
      </View>
      <View style={styles.controllerContainer}>
        <AudioCallController />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    bg: {
    position: 'absolute',
    bottom: scaleHeight(0),
    left: scaleWidth(0),
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(20),
    paddingTop: scaleHeight(70),
    zIndex: 1,
  },
  headerText: {
    color: '#D9FD00',
    fontSize: 18
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
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleHeight(254),
  },
  profileImageContainer: {
    width: scaleWidth(218),
    height: scaleWidth(218),
    borderRadius: scaleWidth(109),
    overflow: 'hidden',
    marginBottom: scaleHeight(30),
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  callerName: {
    fontSize: scaleWidth(28),
    color: 'white',
    fontWeight: '400',
  },
  callerStatus: {
    fontSize: scaleWidth(16),
    color: 'white',
    opacity: 0.8,
  },
  controllerContainer: {
    position: 'absolute',
    bottom: scaleHeight(80),
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default AudioCallAnswer