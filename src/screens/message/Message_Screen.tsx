
import React, { useEffect, useState } from 'react';
import { Animated, BackHandler, Dimensions, Image, Pressable, ScrollView, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MessageBottom from '../../components/messageBottom';
import MessageBottomTab from '../../components/messageBottomTab';
import Messages from '../../components/messages';
import { MessageStackParamList } from '../../types/navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { images } from '../../constants/images';

type TabNavProp = NativeStackNavigationProp<MessageStackParamList>;



export default function Message_Screen() {
  const navigation = useNavigation<TabNavProp>();

  const [dimensions, setDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  const slideAnim = useState(new Animated.Value(dimensions.height))[0];

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({
        width: window.width,
        height: window.height,
      });
    });

    return () => {
      subscription?.remove?.();
    };
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [navigation]);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Base dimensions (mobile: w-430 h-932, tablet: w-834 h-1194)
  const BASE_WIDTH = 430;
  const BASE_HEIGHT = 932;
  const TABLET_WIDTH = 834;
  const TABLET_HEIGHT = 1194;

  // Detect device type
  const isTablet = dimensions.width >= 600 || dimensions.height >= 1000;

  // Use tablet base if detected
  const currentBaseWidth = isTablet ? TABLET_WIDTH : BASE_WIDTH;
  const currentBaseHeight = isTablet ? TABLET_HEIGHT : BASE_HEIGHT;

  // Detect orientation
  const isLandscape = dimensions.width > dimensions.height;

  // Scale functions
  const scaleWidth = (size: number) => (dimensions.width / currentBaseWidth) * size;
  const scaleHeight = (size: number) => (dimensions.height / currentBaseHeight) * size;

  // Responsive scale factor (use the smaller scale to prevent overflow)
  const scale = Math.min(
    dimensions.width / currentBaseWidth,
    dimensions.height / currentBaseHeight
  );


  return (
    <KeyboardAvoidingView style={{
      flex: 1,
      backgroundColor: '#232323',
    }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Title Bar */}
      <View style={{
        paddingTop: isTablet ? scaleHeight(4) : scaleHeight(60),
        backgroundColor: isTablet ? '#F6F5FA' : '#232323',
        paddingBottom: isTablet ? scaleHeight(5) : scaleHeight(20),
        borderTopRightRadius: isTablet ? 30 : 0,
        overflow: 'hidden'
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: isTablet ? 'space-between' : 'space-between',
          alignItems: 'center',
          paddingHorizontal: scaleWidth(20),

        }}>
          {!isTablet && (
            <>
              <Pressable onPress={() => navigation.goBack()}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5
                }}>
                  <Image source={images.backk}
                    style={{
                      width: 14,
                      height: 14,
                      tintColor: '#D9FD00'
                    }} />
                  <Text style={{
                    color: '#D9FD00',
                    fontSize: 16
                  }}>Chats</Text>
                </View>
              </Pressable>
              <View style={{
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                 <Pressable onPress={()=> navigation.navigate('InfoScreen')}>
                <Text style={{
                  color: '#FFFFFF',
                  fontSize: 16
                }}>Martha Craig</Text>
                <Text style={{
                  color: '#787878',
                  fontSize: 12
                }}>
                  last seen just now</Text>
                  </Pressable>
              </View>
              <Image source={images.oval}
                style={{
                  width: 34,
                  height: 34,
                }} />
                
            </>
          )}
          {isTablet && (
            <>
              <View style={{
                flexDirection: 'row',
                alignItems: "center",
                gap: 16
              }}><Pressable onPress={()=> navigation.navigate('InfoScreen')}>
                <Image source={images.martha}
                  style={{
                    width: 52,
                    height: 52,
                  }} />
                  </Pressable>
                <View style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}>
                   <Pressable onPress={()=> navigation.navigate('InfoScreen')}>
                  <Text style={{
                    color: '#000000',
                    fontSize: 16
                  }}>Martha Craig</Text>
                  <Text style={{
                    color: '#037EE5',
                    fontSize: 12
                  }}>
                    Online</Text>
                    </Pressable>
                </View>
              </View>
              <Image source={images.telephone}
                style={{
                  width: 17,
                  height: 17,
                  tintColor: '#037EE5'
                }} />
            </>
          )}
        </View>
      </View>

      {/* Messages Area */}
      <View style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}>
        <ScrollView style={{ flex: 1 }}>
          <Text style={{
            marginTop: 25,
            alignSelf: 'center',
            color: '#787878',
            fontSize: 10
          }}>23 October, Sunday</Text>
          <Messages />
        </ScrollView>
       <MessageBottom/>
      </View>
    </KeyboardAvoidingView>
  )
}