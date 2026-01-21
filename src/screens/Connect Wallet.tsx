import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  BackHandler,
  Dimensions,
  Image,
  Text,
  View,
  Pressable,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppKit, useAccount } from '@reown/appkit-react-native';

import { images } from '../constants/images';
import { screenMap } from '../constants/screenMap';
import { getFCMToken } from '../services/fcmService';
import { newUser } from '../api/user';
import { useAppDispatch } from '../store/hooks';
import { setUser } from '../store/userSlice';
import { saveUser } from '../storage/userStorage';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  [key: string]: undefined;
};

export default function ConnectWallet() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { open } = useAppKit();
  const { address, isConnected } = useAccount();

  const dispatch = useAppDispatch();

  // Prevent duplicate calls when state updates/re-renders
  const lastHandledAddressRef = useRef<string | null>(null);

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
  }, [slideAnim]);

  useEffect(() => {
    if (isConnected && address) {
      if (lastHandledAddressRef.current === address) return;
      lastHandledAddressRef.current = address;

      handleWalletConnected(address);
    } else {
      lastHandledAddressRef.current = null;
    }
  }, [isConnected, address]);

  const handleWalletConnected = async (walletAddress: string) => {
    try {
      const fcmToken = await getFCMToken();

      const user = await newUser({
        walletId: walletAddress,
        walletName: 'imported',
        token: fcmToken, // if this can be null in your app, handle it in getFCMToken() or backend
      });

      await saveUser(user);
      dispatch(setUser(user));

      if (user.profileSetup === 1) {
        navigation.navigate(screenMap.mainTabs);
      } else {
        navigation.navigate(screenMap.userAccount);
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      Alert.alert('Error', 'Failed to connect wallet. Please try again.');
    }
  };

  const handleConnectWallet = () => {
    // You can also do: open({ view: 'Connect' })
    open();
  };

  // Base dimensions (mobile: w-430 h-932, tablet: w-834 h-1194)
  const BASE_WIDTH = 430;
  const BASE_HEIGHT = 932;
  const TABLET_WIDTH = 834;
  const TABLET_HEIGHT = 1194;

  const isTablet = dimensions.width >= 600 || dimensions.height >= 1000;
  const currentBaseWidth = isTablet ? TABLET_WIDTH : BASE_WIDTH;
  const currentBaseHeight = isTablet ? TABLET_HEIGHT : BASE_HEIGHT;

  const scaleWidth = (size: number) => (dimensions.width / currentBaseWidth) * size;
  const scaleHeight = (size: number) => (dimensions.height / currentBaseHeight) * size;

  return (
    <View
      style={{
        backgroundColor: '#232323',
        height: '100%',
        width: '100%',
      }}
    >
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          height: isTablet ? scaleHeight(954) : scaleHeight(814),
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: isTablet ? scaleHeight(106) : scaleHeight(53),
          }}
        >
          <Text
            style={{
              fontSize: isTablet ? 62 : 40,
              fontWeight: 'bold',
              marginBottom: 3,
              fontFamily: 'Inter',
            }}
          >
            Welcome
          </Text>

          <Text
            style={{
              fontSize: 14,
              fontWeight: '500', // ✅ string for TS
              fontFamily: 'Inter',
              marginBottom: isTablet ? 100 : 90,
            }}
          >
            Connect Your Wallet
          </Text>
        </View>

        <Pressable
          onPress={handleConnectWallet}
          style={{
            alignSelf: 'center',
            backgroundColor: '#007AFF',
            paddingHorizontal: scaleWidth(40),
            paddingVertical: scaleHeight(15),
            borderRadius: 10,
            marginBottom: scaleHeight(30),
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '600',
              fontFamily: 'Inter',
            }}
          >
            Connect Wallet
          </Text>
        </Pressable>

        <View
          style={{
            flexDirection: 'column',
            gap: isTablet ? 20 : 15,
            left: isTablet
              ? (dimensions.width - scaleWidth(490)) / 2
              : (dimensions.width - scaleWidth(371)) / 2,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              color: '#666',
              fontFamily: 'Inter',
              marginBottom: 10,
            }}
          >
            Supported Wallets:
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#F6F6F6',
              borderColor: '#EEE7E7',
              borderWidth: 1,
              paddingLeft: scaleWidth(15),
              paddingVertical: scaleHeight(12),
              width: isTablet ? scaleWidth(490) : scaleWidth(371),
              borderRadius: 10,
            }}
          >
            <Image
              source={images.metamask}
              style={{
                width: isTablet ? scaleWidth(30) : scaleWidth(24),
                height: isTablet ? scaleHeight(30) : scaleHeight(24),
                resizeMode: 'contain',
                marginRight: scaleWidth(15),
              }}
            />
            <Text style={{ fontSize: 16, color: '#333', fontFamily: 'Inter' }}>
              MetaMask
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#F6F6F6',
              borderColor: '#EEE7E7',
              borderWidth: 1,
              paddingLeft: scaleWidth(15),
              paddingVertical: scaleHeight(12),
              width: isTablet ? scaleWidth(490) : scaleWidth(371),
              borderRadius: 10,
            }}
          >
            <Image
              source={images.coinBase}
              style={{
                width: isTablet ? scaleWidth(30) : scaleWidth(24),
                height: isTablet ? scaleHeight(30) : scaleHeight(24),
                resizeMode: 'contain',
                marginRight: scaleWidth(15),
              }}
            />
            <Text style={{ fontSize: 16, color: '#333', fontFamily: 'Inter' }}>
              Coinbase Wallet
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#F6F6F6',
              borderColor: '#EEE7E7',
              borderWidth: 1,
              paddingLeft: scaleWidth(15),
              paddingVertical: scaleHeight(12),
              width: isTablet ? scaleWidth(490) : scaleWidth(371),
              borderRadius: 10,
            }}
          >
            <View
              style={{
                width: isTablet ? scaleWidth(30) : scaleWidth(24),
                height: isTablet ? scaleHeight(30) : scaleHeight(24),
                backgroundColor: '#007AFF',
                borderRadius: 12,
                marginRight: scaleWidth(15),
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
                +
              </Text>
            </View>
            <Text style={{ fontSize: 16, color: '#333', fontFamily: 'Inter' }}>
              Other Wallets
            </Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}
