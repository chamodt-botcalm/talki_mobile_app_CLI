import React from 'react'
import { Image, Text, View } from 'react-native';
import { images } from '../constants/images';

export default function PersonalStory() {
    return (
        <View style={{
            alignItems: 'center',
            marginHorizontal: 9,

        }}>
            <View style={{
                marginTop: 3,
                backgroundColor: '#D9FD00',
                width: 62,
                height: 62,
                borderRadius: 40,
            }}>
                <Image source={images.pluss}
                style={{
                    position:'absolute',
                    top:39,
                    left:39,
                    width:23,
                    height:23
                }} />

            </View>

            <Text style={{
                marginTop: 5,
                fontSize: 12,
                color: '#FFFFFF'
            }}>You</Text>
        </View>
    )
}
