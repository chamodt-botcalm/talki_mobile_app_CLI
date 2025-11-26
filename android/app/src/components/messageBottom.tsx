import React, { useEffect, useState } from 'react';
import { Dimensions, Image, TextInput, View } from 'react-native';
import { images } from '../constants/images';



const MessageBottom = () => {

  const [dimensions, setDimensions] = useState({
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({
        width: window.width,
        height: window.height,
      });
    });

    return () => subscription?.remove();
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
    <View style={{
      position:'absolute',
      bottom:0, 
      height:scaleHeight(90),
      width:'100%',
      backgroundColor:'#F6F5FA',
      borderTopColor:'#7A7A7A',
      borderTopWidth:1,
     
      }}>
      <View style={{
        flexDirection:'row',
        paddingHorizontal: scaleWidth(15),
        alignItems: 'center',
        gap:scaleWidth(10),
        paddingVertical:scaleHeight(17)
      }}>
          <Image source={images.attach}
                          style={{
                            width: scaleWidth(30),
                            height: scaleHeight(30),
                            tintColor: '#858E99'
                          }} />
          <TextInput placeholder='Message' style={{
            flex: 1,
            paddingVertical:scaleHeight(6),
            borderColor:'#D1D1D6',
            borderWidth:1,
            borderRadius:20,
            paddingHorizontal: scaleWidth(10),
            paddingLeft: scaleWidth(15)
          }}/>
          <Image source={images.microphone}
                          style={{
                            width: scaleWidth(30),
                            height: scaleHeight(30),
                            tintColor: '#858E99'
                          }} />
      </View>
    </View>
  )
}

export default MessageBottom