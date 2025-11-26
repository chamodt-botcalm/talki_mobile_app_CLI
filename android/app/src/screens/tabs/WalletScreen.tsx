import React, { useState, useEffect } from 'react'
import { Image, View, Dimensions, Animated, BackHandler, Text, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import BottomNavigator from '../../components/BottomNavigator'
import Tabs from '../../components/tabs'
import Tokens from '../../components/tokens'
import ProfilePic from '../../components/profilepic'
import PullBar from '../../components/pullbar'
import { images } from '../../constants/images'
const WalletScreen = () => {

  const navigation = useNavigation();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [totalSum, setTotalSum] = useState<number>(0);

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
      width: '100%',
      height: '100%',
    }}>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: scaleWidth(14),
        marginTop: scaleHeight(73),
      }}>
        <Text style={{
          color:'#D9FD00',
          fontSize:16
        }}>Wallet</Text>
        <Image source={images.qrcode}
        style={{
          width: scaleWidth(32),
          height: scaleHeight(32),
          tintColor:'#D9FD00',
          resizeMode:'contain'
        }}
        />
      </View>

      <View style={{
        backgroundColor: '#FFFFFF',
        width: '100%',
        position: 'absolute',
        height: isTablet?scaleHeight(1033):scaleHeight(811),
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden',
      }}>
        <View style={{alignSelf:'center', marginTop:scaleHeight(11)}}>
        <PullBar width={scaleWidth(62.5)} height={scaleHeight(6)}/></View>

        <View style={{
          flexDirection: 'column',
          borderColor: 'rgba(60,60,67,0.29)',
          borderWidth: 1,
          width: scaleWidth(366),
          alignSelf: 'center',
          paddingHorizontal: scaleWidth(25),
          borderRadius:15,
          marginTop:scaleWidth(49)
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical:scaleHeight(8)
           
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: scaleWidth(10),
            }}>
              <ProfilePic 
              width={46}
              height={46}
              borderWidth={2}/>
              <Text>Jon Smith</Text>
            </View>
            <View style={{
              width:scaleWidth(25),
              alignItems:'center'
            }}>
            <Image source={images.down}
              style=
              {{
                width: scaleWidth(12),
                height: scaleHeight(12),
                resizeMode:'contain'
              }}
            />
            </View>
          </View>
           <View style={{
              borderBottomColor:'rgba(60,60,67,0.29)',
              borderBottomWidth:1,
              width:scaleWidth(316)
            }}/>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
             paddingVertical:scaleHeight(13)
          }}>
            <View style={{
              flexDirection: 'row',
              gap:scaleWidth(10),
              alignItems:'center'
            }}>
              <Text>Address :</Text>
              <Text style={{
                fontSize:11,
                color:'rgba(60,60,67,0.29)'
              }}>0xb96cc255470............599</Text>
            </View>
            <View style={{
              flexDirection:'column',
             alignItems:'center',
            }}>
              <Image source={images.topup}
              style={{
                width: scaleWidth(18),
                height: scaleHeight(18),
                resizeMode:'contain'
              }}
              />
              <Text style={{
                fontSize: scaleHeight(8),
              }}>Top Up</Text>
            </View>
          </View>

        </View>

              <View style={{
                marginTop:scaleHeight(28)
              }}>
                <Tabs/>
              </View>

              {/* Total Sum */}
              <View style={{
                marginTop:scaleHeight(17),
                marginLeft:scaleWidth(32),
              }}>
                <Text style={{
                  fontSize:isTablet? 27: 20,
                  fontWeight:'bold'

                }}>${totalSum.toLocaleString()}</Text>
              </View>

              
              <View style={{
                marginTop:scaleHeight(30),
                marginLeft:scaleWidth(18),
                flex: 1
              }}>
                <ScrollView 
                  contentContainerStyle={{
                    paddingBottom: 110
                  }}
                  showsVerticalScrollIndicator={false}
                >
                <Tokens onTotalSumChange={setTotalSum}/>
                </ScrollView>
              </View>

      </View>
    </View>
  )
}

export default WalletScreen
