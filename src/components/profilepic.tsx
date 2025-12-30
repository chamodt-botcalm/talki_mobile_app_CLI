import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { images } from '../constants/images';

type Props = {
  width: number;
  height: number;
  borderWidth: number;
};

const ProfilePic = ({width, height, borderWidth}: Props) => {
  const styles = StyleSheet.create({
    container: {
      borderColor: '#D9FD00',
      borderWidth: borderWidth,
      borderRadius: 50,
      width: width,
      height: height
    }
  });

  return (
    <Image source={images.jon}
           style={styles.container}
    />
  )
}



export default ProfilePic

