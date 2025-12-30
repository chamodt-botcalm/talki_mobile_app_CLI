
import React, { useEffect, useState } from 'react';
import { Animated, BackHandler, Dimensions, Image, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { images } from '../constants/images';

export default function ConnectWallet() {
  const navigation = useNavigation();

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
  const isTablet = dimensions.width >= 600 || dimensions.height >= 1000; // Rough threshold for tablet

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

    <View style={{
      backgroundColor: '#232323',
      height: '100%',
      width: '100%',
    }}>
      <Animated.View style={{
        position: 'absolute',
        bottom: 0,
        height:isTablet?scaleHeight(954): scaleHeight(814),
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        transform: [{ translateY: slideAnim }],
      }}>
        <View style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: isTablet ? scaleHeight(106) : scaleHeight(53),
        }}>

          <Text style={{
            fontSize:isTablet?62: 40,
            fontWeight: 'bold',
            marginBottom: 3,
            fontFamily: 'Inter'
          }}>
            Welcome
          </Text>
          <Text style={{
            fontSize: 14,
            fontWeight: 500,
            fontFamily: 'Inter',
            marginBottom:isTablet?100: 90
          }}>
            Connect Your Wallet
          </Text>
        </View>
        <View style={{
          flexDirection: 'column',
          gap:isTablet? 32: 25,
          left: isTablet ? (dimensions.width - scaleWidth(490)) / 2 : (dimensions.width - scaleWidth(371)) / 2,
        }}>
          {/* MetaMask */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'relative'
          }}>
            <Image source={images.metamask} style={{
              position: 'absolute',
              left: scaleWidth(10),
              zIndex: 1,
              width: isTablet ? scaleWidth(30) : scaleWidth(24),
              height: isTablet ? scaleHeight(30) : scaleHeight(24),
              resizeMode: 'contain'
            }} />
            <TextInput placeholder='Metamask' placeholderTextColor='#A4A4A4'
              style={{
                backgroundColor: '#F6F6F6',
                borderColor: '#EEE7E7',
                borderWidth: 1,
                paddingLeft: scaleWidth(50),
                paddingVertical: isTablet ? scaleHeight(25) : scaleHeight(8),
                width: isTablet ? scaleWidth(490) : scaleWidth(371),
                borderRadius: 10,
                height: scaleHeight(40)
              }} />
          </View>

          {/* Trust wallet */}
          <View style={{
            flexDirection: 'row',

            alignItems: 'center',
            position: 'relative'

          }}>
            <Image source={images.trustWallet} style={{
              position: 'absolute',
              left: scaleWidth(10),
              zIndex: 1,
              width: isTablet ? scaleWidth(30) : scaleWidth(24),
              height: isTablet ? scaleHeight(30) : scaleHeight(24),
              resizeMode: 'contain'
            }} />
            <TextInput placeholder='Trust wallet' placeholderTextColor='#A4A4A4'
              style={{
                backgroundColor: '#F6F6F6',
                borderColor: '#EEE7E7',
                borderWidth: 1,
                paddingLeft: scaleWidth(50),
                paddingVertical: isTablet ? scaleHeight(25) : scaleHeight(8),
                width: isTablet ? scaleWidth(490) : scaleWidth(371),
                borderRadius: 10,
                height: scaleHeight(40)
              }} />
          </View>
          {/* Coinbase */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'relative'
          }}>
            <Image source={images.coinBase} style={{
              position: 'absolute',
              left: scaleWidth(10),
              zIndex: 1,
              width: isTablet ? scaleWidth(30) : scaleWidth(24),
              height: isTablet ? scaleHeight(30) : scaleHeight(24),
              resizeMode: 'contain'
            }} />
            <TextInput placeholder='Coinbase' placeholderTextColor='#A4A4A4'
              style={{
                backgroundColor: '#F6F6F6',
                borderColor: '#EEE7E7',
                borderWidth: 1,
                paddingLeft: scaleWidth(50),
                paddingVertical: isTablet ? scaleHeight(25) : scaleHeight(8),
                width: isTablet ? scaleWidth(490) : scaleWidth(371),
                borderRadius: 10,
                height: scaleHeight(40)
              }} />
          </View>
          {/* Binance */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'relative'
          }}>
            <Image source={images.binance} style={{
              position: 'absolute',
              left: scaleWidth(10),
              zIndex: 1,
              width: isTablet ? scaleWidth(30) : scaleWidth(24),
              height: isTablet ? scaleHeight(30) : scaleHeight(24),
              resizeMode: 'contain'
            }} />
            <TextInput placeholder='Binance' placeholderTextColor='#A4A4A4'
              style={{
                backgroundColor: '#F6F6F6',
                borderColor: '#EEE7E7',
                borderWidth: 1,
                paddingLeft: scaleWidth(50),
                paddingVertical: isTablet ? scaleHeight(25) : scaleHeight(8),
                width: isTablet ? scaleWidth(490) : scaleWidth(371),
                borderRadius: 10,
                height: scaleHeight(40)
              }} />
          </View>
        </View>
      </Animated.View>

    </View>
  )
}
