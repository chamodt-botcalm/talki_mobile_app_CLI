import React from 'react';
import { Image, TextInput, TouchableOpacity, useWindowDimensions, View, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import MessageCountBadge from './messagecountbadge';
import { images } from '../constants/images';

const MessageBottomTab = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { width, height } = useWindowDimensions();
  const dimensions = { width, height };

  const totalMessages = 0;

  // Base dimensions
  const BASE_WIDTH = 430;
  const BASE_HEIGHT = 932;
  const TABLET_WIDTH = 834;
  const TABLET_HEIGHT = 1194;

  const isTablet = dimensions.width >= 600 || dimensions.height >= 1000;
  const currentBaseWidth = isTablet ? TABLET_WIDTH : BASE_WIDTH;
  const currentBaseHeight = isTablet ? TABLET_HEIGHT : BASE_HEIGHT;

  const scaleWidth = (size: number) => (dimensions.width / currentBaseWidth) * size;
  const scaleHeight = (size: number) => (dimensions.height / currentBaseHeight) * size;

  const tabItems = [
     { route: 'Wallet', icon: images.wallet, name: 'Wallet'},
    { route: 'ChatScreen',icon: images.communications, iconn: images.num17, name: 'Chats'},
    { route: 'Contact', icon: images.user ,name: 'Contacts'},
    { route: 'Settings', icon: images.setting ,name: 'Settings'},
  ];

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#F6F5FA',
        borderTopColor: '#7A7A7A',
        borderTopWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scaleWidth(12),
        height: scaleHeight(90),

      }}
    >

      {/*  First Column — Navigation Icons */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: scaleWidth(69),
          width: '50%'
        }}
      >
        {tabItems.map((item, index) => {
          const isFocused = state.index === index;
          return (
            <View key={index} style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}>
            <TouchableOpacity
              onPress={() => navigation.navigate(item.route)}
              style={{
                backgroundColor: isFocused ? 'black' : 'transparent',
                borderRadius: 30,
                padding: scaleWidth(6),
              }}
            >
              <View style={{ position: 'relative' }}>
                <Image
                  source={item.icon}
                  style={{
                    width: 27,
                    height: 27,
                    tintColor: isFocused ? 'white' : undefined,
                  }}
                />
                {item.iconn && totalMessages > 0 && (
                  <View style={{ position: 'absolute', top: -10, right: -10 }}>
                    <MessageCountBadge />
                  </View>
                )}
              </View>
            </TouchableOpacity>
             <Text>{item.name}</Text>
            </View>
          );
        })}
      </View>

      {/*  Second Column — Message Input */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          marginLeft: scaleWidth(20),
        }}
      >
        <Image
          source={images.attach}
          style={{
            width: scaleWidth(28),
            height: scaleHeight(28),
            tintColor: '#858E99',
            marginRight: scaleWidth(8),
            resizeMode: 'contain',
          }}
        />

        <TextInput
          placeholder="Message"
          placeholderTextColor="#858E99"
          style={{
            flex: 1,
            paddingVertical: scaleHeight(6),
            borderColor: '#D1D1D6',
            borderWidth: 1,
            borderRadius: 20,
            paddingHorizontal: scaleWidth(12),
            fontSize: scaleWidth(14),
          }}
        />

        <Image
          source={images.microphone}
          style={{
            width: scaleWidth(30),
            height: scaleHeight(30),
            tintColor: '#858E99',
            marginLeft: scaleWidth(8),
            resizeMode: 'contain',

          }}
        />
      </View>
    </View>
  );
};

export default MessageBottomTab;
