import { View, Text, StyleSheet, Image,ImageBackground, Pressable, BackHandler } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { CompositeNavigationProp } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TabParamList, MessageStackParamList, RootStackParamList } from '../types/navigation'
import { images } from '../constants/images'
import { scaleHeight, scaleWidth } from '../constants/size'
import LinearGradient from 'react-native-linear-gradient'

type CombinedNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList>,
  CompositeNavigationProp<
    NativeStackNavigationProp<TabParamList>,
    NativeStackNavigationProp<MessageStackParamList>
  >
>;

const IncomingVideoCall = () => {
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
      
      <View style={styles.appHeader}>
        <Image source={images.greenti} style={{width:scaleWidth(27),height:scaleHeight(27)}}/>
        <Text style={styles.appText}>talki Video...</Text>
      </View>
      
      <View style={styles.callerContainer}>
        <Text style={styles.callerName}>Juliet Smith</Text>
      </View>
      
      <View style={styles.quickActions}>
        <Pressable style={styles.actionButton}>
          <Image source={images.message} style={styles.actionIcon} />
          <Text style={styles.actionText}>Message</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Image source={images.remind} style={styles.actionIcon} />
          <Text style={styles.actionText}>Remind Me</Text>
        </Pressable>
      </View>
      
      <View style={styles.callActions}>
        <Pressable style={styles.callButton}>
          <View style={styles.declineButton}>
           <Image source={images.close} style={{height:scaleHeight(20),width:scaleWidth(20),tintColor:'white'}}/>
          </View>
          <Text style={styles.callButtonText}>Decline</Text>
        </Pressable>
        <Pressable style={styles.callButton}>
          <View style={styles.acceptButton}>
            <Image source={images.check} style={{height:scaleHeight(20),width:scaleWidth(26),tintColor:'white'}}/>
          </View>
          <Text style={styles.callButtonText}>Accept</Text>
        </Pressable>
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
  appHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaleHeight(105),
    gap:scaleWidth(11)
  },
  appIcon: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    backgroundColor: '#D9FD00',
    borderRadius: scaleWidth(4),
    marginRight: scaleWidth(8),
  },
  appText: {
    color: 'white',
    fontSize: scaleWidth(22),
    opacity: 0.8,
  },
  callerContainer: {
    alignItems: 'center',
    marginBottom: scaleHeight(424),
  },
  callerName: {
    fontSize: scaleWidth(37),
    color: 'white',
    fontWeight: '300',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scaleWidth(55),
    marginBottom: scaleHeight(60),
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    tintColor: 'white',
    marginBottom: scaleHeight(8),
  },
  actionText: {
    color: 'white',
    fontSize: scaleWidth(14),
  },
  callActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scaleWidth(55),
    position: 'absolute',
    bottom: scaleHeight(120),
    left: 0,
    right: 0,
  },
  callButton: {
    alignItems: 'center',
  },
  declineButton: {
    backgroundColor: '#F83D39',
    width: scaleWidth(70),
    height: scaleWidth(70),
    borderRadius: scaleWidth(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#007AFF',
    width: scaleWidth(70),
    height: scaleWidth(70),
    borderRadius: scaleWidth(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
  callButtonIcon: {
    color: 'white',
    fontSize: scaleWidth(24),
    fontWeight: 'bold',
  },
  callButtonText: {
    color: 'white',
    fontSize: scaleWidth(14),
    marginTop: scaleHeight(8),
  },
});

export default IncomingVideoCall