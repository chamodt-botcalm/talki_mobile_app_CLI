import CallList from '../../components/call/CallList'
import CallTabs from '../../components/call/CallTabs'
import BlackBackground from '../../components/main/black'
import WhiteBackground from '../../components/main/white'
import PullBar from '../../components/pullbar'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { BackHandler, Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { images } from '../../constants/images'

const CallScreen = () => {

  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("All");

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


  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

   const styles = StyleSheet.create({
     row1:{
      flexDirection:'row',
      alignItems:'center',
      marginHorizontal:14,
      justifyContent:'space-between',
      marginTop:scaleHeight(73)
     },
     row2:{
      flexDirection:'row',
      gap:scaleWidth(12)
     },
     image:{
      width:scaleWidth(19),
      height:scaleHeight(19),
      tintColor:'#D9FD00'
     },
     text:{
      fontSize:16,
      color:'#D9FD00'
     }
   })

  return (
    <View style={{ flex: 1 }}>
      <BlackBackground>
      <View style={styles.row1} >
          <Text style={styles.text}>Edit</Text>
          <CallTabs/>
          <View style={styles.row2}>
            <Image source={images.telephone} style={[styles.image,{resizeMode:'contain'}]}/>
            <Image source={images.plu} style={[styles.image,{resizeMode:'contain'}]}/>
          </View>
          </View>
        <WhiteBackground height={scaleHeight(811)}>
         <View style={{alignSelf:'center', marginTop:scaleHeight(11)}}>
        <PullBar width={scaleWidth(62.5)} height={scaleHeight(6)}/></View>
          <CallList/>
        </WhiteBackground>
      </BlackBackground>
    </View>
  )
}

export default CallScreen