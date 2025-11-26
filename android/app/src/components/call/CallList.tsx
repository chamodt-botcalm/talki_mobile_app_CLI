import { View, StyleSheet, Text, Dimensions, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import {images} from '../../constants/images';


const CallList = () => {



  const [dimensions, setDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }: { window: { width: number; height: number } }) => {
      setDimensions({
        width: window.width,
        height: window.height,
      });
    });

    return () => {
      subscription?.remove?.();
    };
  }, []);

  const BASE_WIDTH = 430;
  const BASE_HEIGHT = 932;

  const TABLET_WIDTH = 834;
  const TABLET_HEIGHT = 1194;

  const isTablet = dimensions.width >= 600 || dimensions.height >= 1000;

  const currentBaseWidth = isTablet ? TABLET_WIDTH : BASE_WIDTH;
  const currentBaseHeight = isTablet ? TABLET_HEIGHT : BASE_HEIGHT;

  const isLandscape = dimensions.width > dimensions.height;

  const scaleWidth = (size: number) => (dimensions.width / currentBaseWidth) * size;
  const scaleHeight = (size: number) => (dimensions.height / currentBaseHeight) * size;

  const scale = Math.min(
    dimensions.width / currentBaseWidth,
    dimensions.height / currentBaseHeight
  );


  const styles = StyleSheet.create({
    row1: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: scaleWidth(20),
      paddingVertical: scaleHeight(6),
    },
    row2: {
      flexDirection: 'row',
      gap: scaleWidth(10),
      alignItems: 'center',
    },
    row3: {
      flexDirection: 'row',
      gap: scaleWidth(10),
      alignItems: 'center',
    },
    column: {
      flexDirection: 'column'
    },
    borderbottom: {
      borderBottomColor: 'rgba(60, 60, 67, 0.29)',
      borderBottomWidth: 1,
      marginHorizontal: scaleWidth(25),
    },
    image: {
      width: scaleWidth(40),
      height: scaleWidth(40),
      borderRadius: scaleWidth(20)
    },
    icon: {
      width: scaleWidth(20),
      height: scaleWidth(20),
      resizeMode: 'contain',
      tintColor: '#8E8E93'
    }
  })


  const list = [
    {
      name: 'Joshua Lawrence',
      type: 'Outgoing (2 min)',
      date: '10/13',
      image: images.im1,
      category: 'outgoing'
    },
      {
      name: 'Joshua Lawrence',
      type: 'Outgoing (2 min)',
      date: '10/13',
      image: images.im1,
      category: 'outgoing'
    },
     {
      name: 'Joshua Lawrence',
      type: 'Outgoing (2 min)',
      date: '10/13',
      image: images.im1,
      category: 'outgoing'
    },
     {
      name: 'Joshua Lawrence',
      type: 'Outgoing (2 min)',
      date: '10/13',
      image: images.im1,
      category: 'outgoing'
    },
     {
      name: 'Joshua Lawrence',
      type: 'Outgoing (2 min)',
      date: '10/13',
      image: images.im1,
      category: 'outgoing'
    },
     {
      name: 'Joshua Lawrence',
      type: 'Outgoing (2 min)',
      date: '10/13',
      image: images.im1,
      category: 'outgoing'
    },
     {
      name: 'Joshua Lawrence',
      type: 'Outgoing (2 min)',
      date: '10/13',
      image: images.im1,
      category: 'outgoing'
    },
     {
      name: 'Joshua Lawrence',
      type: 'Outgoing (2 min)',
      date: '10/13',
      image: images.im1,
      category: 'outgoing'
    },
  ]
  

  const Messages = ({ name, type, date, image, category, index }: { name: string; type: string; date: string; image: any; category: string; index: number }) => {
    return (

      <React.Fragment key={index}>
        <View style={styles.row1}>
          <View style={styles.row2}>
            <Image source={category === 'missed' ? images.missedcall : category === 'incoming' ? images.incoming : images.outgoing} style={[styles.icon, category === 'missed' && { width: scaleWidth(20), height: scaleWidth(15) }]} />
            <Image source={image} style={styles.image} />
            <View style={styles.column}>
              <Text style={{ fontSize: 14, color: category === 'missed' ? 'red' : '#8E8E93' }}>{name}</Text>
              <Text style={{ fontSize: 13, color: '#8E8E93' }}>{type}</Text>
            </View>
          </View>
          <View style={styles.row3}>
            <Text style={{ fontSize: 13, color: '#8E8E93' }}>{date}</Text>
            <Image source={images.info}
              style={{ resizeMode: 'contain' }} />
          </View>
        </View>
        <View style={styles.borderbottom} />
      </React.Fragment>

    );
  };

  return (
    <ScrollView contentContainerStyle={{
      paddingBottom: 110
    }}>
      <View style={{marginTop:scaleHeight(22)}}>
        {list.map((item, index) => (
          <Messages key={index} name={item.name} type={item.type} date={item.date} image={item.image} category={item.category} index={index} />
        ))}
      </View>
    </ScrollView>
  )
}

export default CallList