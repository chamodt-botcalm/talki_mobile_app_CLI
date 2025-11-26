import React from 'react';
import { Text, View, Image, ScrollView, Dimensions } from 'react-native';
import PersonalStory from './PersonalStory';

const dimensions = Dimensions.get('window');

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

// Scale functions
const scaleWidth = (size: number) => (dimensions.width / currentBaseWidth) * size;
const scaleHeight = (size: number) => (dimensions.height / currentBaseHeight) * size;

const scale = Math.min(
  dimensions.width / currentBaseWidth,
  dimensions.height / currentBaseHeight
);

export default function StoryView() {
  const storyData = [
    { id: '1', userName: 'sarah_k', userImage: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: '2', userName: 'david', userImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: '3', userName: 'lisa_g', userImage: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: '4', userName: 'john_doe', userImage: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { id: '5', userName: 'jane_doe', userImage: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { id: '6', userName: 'sarah_k', userImage: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { id: '7', userName: 'david', userImage: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { id: '8', userName: 'lisa_g', userImage: 'https://randomuser.me/api/portraits/women/5.jpg' },
    { id: '9', userName: 'john_doe', userImage: 'https://randomuser.me/api/portraits/men/5.jpg' },
    { id: '10', userName: 'jane_doe', userImage: 'https://randomuser.me/api/portraits/women/6.jpg' },
  ];

  return (
    <View style={{ paddingVertical: 10 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* First story (PersonalStory component) */}
        <PersonalStory />

        {/* Other stories using map */}
        {storyData.map((item) => (
          <View
            key={item.id}
            style={{
              alignItems: 'center',
              marginHorizontal: 9,
            }}
          >
            <View
              style={{
                width: 68,
                height: 68,
                borderRadius: 40,
                borderWidth: 2,
                borderColor: '#D9FD00',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={{ uri: item.userImage }}
                style={{
                  width: 62,
                  height: 62,
                  borderRadius: 40,
                }}
              />
            </View>
            <Text
              style={{
                marginTop: 0,
                fontSize: 12,
                color: '#FFFFFF',
              }}
            >
              {item.userName}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
