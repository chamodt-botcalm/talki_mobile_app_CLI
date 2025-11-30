
import React, { useEffect, useState } from 'react';
import { Animated, BackHandler, Dimensions, Image, Pressable, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNavigator from '../components/BottomNavigator';
import { RootStackParamList } from '../../../../src/types/navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { images } from '../constants/images';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;


export default function UserAccount() {
    const navigation = useNavigation<NavigationProp>();

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

            <Animated.View style={{
                position: 'absolute',
                bottom: 0,
                height: isTablet ? scaleHeight(954) : scaleHeight(814),
                width: '100%',
                backgroundColor: '#FFFFFF',
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                transform: [{ translateY: slideAnim }],
            }}>

                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    backgroundColor: '#FFFFFF',
                    width: '100%',
                    height: isTablet ? scaleHeight(954) : scaleHeight(814),
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,

                }}>
                    <View style={{
                        backgroundColor: '#AEAEB2',
                        height: scaleHeight(5),
                        width: scaleWidth(83),
                        borderRadius: 6,
                        alignSelf: 'center',
                        marginTop: isTablet ? scaleHeight(20) : scaleHeight(11)

                    }}></View>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: isTablet ? scaleHeight(106) : scaleHeight(65)
                    }}>



                        <Image source={images.camera} style={{
                            marginBottom: isTablet ? scaleHeight(67) : scaleHeight(49),
                            width: isTablet ? scaleWidth(108) : scaleWidth(66),
                            height: isTablet ? scaleHeight(108) : scaleHeight(66),
                            resizeMode: 'contain'
                        }} />
                        {/*First Name*/}
                        <View style={{
                            alignItems: 'flex-start',
                            marginBottom: 16

                        }}>
                            <Text style={{
                                marginBottom: isTablet ? scaleHeight(4) : scaleHeight(10),
                                color: '#8C8C8C',
                            }}>First Name</Text>
                            <TextInput placeholder='Sara' placeholderTextColor={'#A4A4A4'} style={{
                                width: isTablet ? scaleWidth(491) : scaleWidth(371),
                                backgroundColor: '#F6F6F6',
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: '#EEE7E7',
                                paddingLeft: isTablet ? scaleWidth(17) : scaleWidth(13),
                                paddingVertical: isTablet ? scaleHeight(14) : scaleHeight(12)

                            }} />
                        </View>
                        {/*Last Name*/}
                        <View style={{
                            alignItems: 'flex-start',
                            marginBottom: 16

                        }}>
                            <Text style={{
                                marginBottom: isTablet ? scaleHeight(4) : scaleHeight(10),
                                color: '#8C8C8C'
                            }}>Last Name</Text>
                            <TextInput placeholder='Singh' placeholderTextColor={'#A4A4A4'} style={{
                                width: isTablet ? scaleWidth(491) : scaleWidth(371),
                                backgroundColor: '#F6F6F6',
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: '#EEE7E7',
                                paddingLeft: isTablet ? scaleWidth(17) : scaleWidth(13),
                                paddingVertical: isTablet ? scaleHeight(14) : scaleHeight(12)

                            }} />
                        </View>
                        {/*Email*/}
                        <View style={{
                            alignItems: 'flex-start',
                            marginBottom: 16

                        }}>
                            <Text style={{
                                marginBottom: isTablet ? scaleHeight(4) : scaleHeight(10),
                                color: '#8C8C8C'
                            }}>Email</Text>
                            <TextInput placeholder='Email' placeholderTextColor={'#A4A4A4'} style={{
                                width: isTablet ? scaleWidth(491) : scaleWidth(371),
                                backgroundColor: '#F6F6F6',
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: '#EEE7E7',
                                paddingLeft: isTablet ? scaleWidth(17) : scaleWidth(13),
                                paddingVertical: isTablet ? scaleHeight(14) : scaleHeight(12)

                            }} />
                        </View>
                        {/*Wallet Address*/}
                        <View style={{
                            alignItems: 'flex-start',
                            marginBottom: 16

                        }}>
                            <Text style={{
                                marginBottom: isTablet ? scaleHeight(4) : scaleHeight(10),
                                color: '#8C8C8C'
                            }}>Wallet Address</Text>
                            <TextInput placeholder='0xb96cc255470............599' placeholderTextColor={'#A4A4A4'} style={{
                                width: isTablet ? scaleWidth(491) : scaleWidth(371),
                                backgroundColor: '#F6F6F6',
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: '#EEE7E7',
                                paddingLeft: isTablet ? scaleWidth(17) : scaleWidth(13),
                                paddingVertical: isTablet ? scaleHeight(14) : scaleHeight(12)

                            }} />
                        </View>
                    </View>
                    <View style={{
                        position: 'absolute',
                        bottom: isTablet ? scaleHeight(116) : scaleHeight(80),
                        left: isTablet ? (dimensions.width - scaleWidth(490)) / 2 : (dimensions.width - scaleWidth(371)) / 2
                    }}>
                        <Pressable
                            style={{
                                backgroundColor: '#DBFF00',
                                width: isTablet ? scaleWidth(490) : scaleWidth(371),
                                height: isTablet ? scaleHeight(60) : scaleHeight(50),
                                borderRadius: scale * 5,
                                justifyContent: 'center'
                            }} onPress={() => navigation.navigate('MainTabs')}
                        >
                            <Text style={{ color: 'black', fontSize: scale * 20, textAlign: 'center', fontFamily: 'Inter', }}>
                                Done
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Animated.View>
        </View>
    )
} 
