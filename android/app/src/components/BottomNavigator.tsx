import React from 'react'
import { Image, TouchableOpacity, View, Text} from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import MessageCountBadge from './messagecountbadge'
import {images} from '../../src/constants/images';

export default function BottomNavigator({ state, descriptors, navigation }: BottomTabBarProps) {

  const totalMessages = 0; // You can get this from props or context

  const tabItems = [
    { route: 'Wallet', icon: images.wallet, name: 'Wallet'},
    { route: 'ChatScreen', icon: images.communications, iconn: images.num17, name: 'Chats'},
    { route: 'Contact', icon: images.user ,name: 'Contacts'},
    { route: 'Settings', icon: images.setting ,name: 'Settings'},
  ]

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#F6F5FA',
        width: '100%',
        height: 104,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 50,
      }}
    >
      {tabItems.map((item, index) => {
        const isFocused = state.index === index
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
              padding: 10,
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
                <View style={{ position: 'absolute', top: -15, right: -15 }}>
                <MessageCountBadge />
                </View>
              )}
            </View>
            
          </TouchableOpacity>
           <Text>{item.name}</Text>
           </View>
        )
      })}
    </View>
  )
}
