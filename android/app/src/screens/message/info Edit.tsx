import { View, Text, ScrollView, Image, Pressable, Animated, Dimensions, BackHandler } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { TabParamList } from '../../../../../src/types/navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { images } from '../../constants/images';

type NavigationProp = NativeStackNavigationProp<TabParamList>;


const InfoEdit = () => {
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
            flex: 1,
            height: '100%',
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: scaleWidth(14),
                marginTop: scaleHeight(73)
            }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: scaleWidth(9)
                    }}>

                        <Image source={images.backk}
                            style={{
                                width: scaleWidth(14),
                                height: scaleHeight(14),
                                tintColor: '#D9FD00',
                                resizeMode: 'contain'
                            }} />

                        <Text style={{
                            color: '#D9FD00',
                            fontSize: 18
                        }}>Back</Text>

                    </View>
                </Pressable>
                <Text style={{
                    color: '#D9FD00',
                    fontSize: 18
                }}>Info</Text>
                <Pressable onPress={() => isTablet ? navigation.navigate('ChatScreen') : navigation.goBack()}>
                    <Text style={{
                        color: '#D9FD00',
                        fontSize: 18
                    }}>Done</Text>
                </Pressable>
            </View>

            <Animated.View style={{
                backgroundColor: '#FFFFFF',
                height: isTablet ? '90%' : scaleHeight(811),
                width: '100%',
                position: 'absolute',
                bottom: 0,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                overflow: 'hidden',
                transform: [{ translateY: slideAnim }],
            }}>
                <ScrollView
                    contentContainerStyle={{
                        minHeight: isTablet ? scaleHeight(1092) : scaleHeight(1000),

                    }}
                >
                    <View style={{
                        backgroundColor: '#AEAEB2',
                        width: scaleWidth(63),
                        height: scaleHeight(6),
                        borderRadius: 6,
                        position: 'absolute',
                        left: (dimensions.width - scaleWidth(63)) / 2,
                        top: scaleWidth(11)
                    }} />

                    {/* Title */}
                    <View style={{
                        alignSelf: 'center',
                        marginTop: scaleHeight(50),
                        
                    }}>
                        <Image source={images.martha}
                            style={{
                                width:isTablet?scaleWidth(85): scaleWidth(66),
                                height:isTablet?scaleHeight(85): scaleHeight(66),
                                resizeMode: 'contain'
                            }}
                        />
                    </View>
                    <View style={{
                        marginTop: scaleHeight(20),
                        alignItems: 'center',
                        flexDirection: 'column',
                        backgroundColor: '#F6F6F6',
                    }}>

                        <View style={{
                            width: '100%',
                            alignItems: 'center',
                            paddingTop: scaleHeight(12),
                        }}>
                            <Text style={{
                                fontSize: isTablet?21:17
                            }}>Sara Singh</Text>
                            <View style={{
                                marginTop: scaleHeight(8),
                                borderBottomColor: '#C6C6C8',
                                borderBottomWidth: 1,
                                width: isTablet ? scaleWidth(735) : scaleWidth(275),
                            }} />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignSelf: 'center',
                            justifyContent: 'center',
                            gap: isTablet?scaleWidth(50):scaleWidth(40),
                            marginTop: scaleHeight(10),
                            marginBottom: scaleHeight(10),
                        }}>

                            <View style={{
                                flexDirection: 'column',
                                alignItems: 'center'

                            }}>
                                <Image source={images.telephone}
                                    style={{
                                        width:isTablet?scaleWidth(23): scaleWidth(18),
                                        height: scaleHeight(28),
                                        resizeMode: 'contain'
                                    }}
                                />
                                <Text>Call</Text>
                            </View>

                            <View style={{
                                flexDirection: 'column',
                                alignItems: 'center'

                            }}>
                                <Image source={images.message}
                                    style={{
                                       width:isTablet?scaleWidth(23): scaleWidth(18),
                                        height: scaleHeight(28),
                                        resizeMode: 'contain'
                                    }}
                                />
                                <Text>Message</Text>
                            </View>

                            <View style={{
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <Image source={images.video}
                                    style={{
                                       width:isTablet?scaleWidth(38): scaleWidth(18),
                                        height: scaleHeight(28),
                                        resizeMode: 'contain'
                                    }}
                                />
                                <Text>Video</Text>
                            </View>

                        </View>

                    </View>


                    <View style={{
                        backgroundColor: '#F6F6F6',
                        marginTop: isTablet ? scaleHeight(20) : scaleHeight(10)
                    }}>
                        <View style={{
                            marginLeft: isTablet ? scaleWidth(34) : scaleWidth(18),
                            marginTop: scaleHeight(10)
                        }}>
                            <View style={{
                                flexDirection: 'column',
                                paddingVertical: isTablet ? scaleHeight(20) : scaleHeight(12),
                            }}>
                                <Text>Wallet</Text>
                                <Text style={{
                                    color: '#00B12C'
                                }}>0xb96cc255470............599</Text>
                            </View>
                        </View>
                        <View style={{
                            borderBottomColor: '#C6C6C8',
                            borderBottomWidth: 1,
                            width: isTablet ? scaleWidth(735) : scaleWidth(380),
                            alignSelf: 'center'
                        }} />
                    </View>

                    <View style={{
                       backgroundColor: '#F6F6F6',
                    }}>
                        <View style={{
                            marginLeft: isTablet ? scaleWidth(34) : scaleWidth(18)
                        }}>
                            <View style={{
                                flexDirection: 'column',
                                paddingVertical: isTablet ? scaleHeight(20) : scaleHeight(12),
                            }}>
                                <Text>Wallet #</Text>
                                <Text style={{
                                    color: '#037EE5'
                                }}>0xb96cc255470............599</Text>
                            </View>
                        </View>
                        <View style={{
                            borderBottomColor: '#C6C6C8',
                            borderBottomWidth: 1,
                            width: isTablet ? scaleWidth(735) : scaleWidth(380),
                            alignSelf: 'center'
                        }} />
                    </View>

                    <View style={{
                        backgroundColor: '#F6F6F6',
                    }}>
                        <View style={{
                            marginLeft: isTablet ? scaleWidth(34) : scaleWidth(18),
                        }}>
                            <View style={{
                                flexDirection: 'column',
                                paddingVertical: isTablet ? scaleHeight(20) : scaleHeight(12),
                            }}>
                                <Text>Bio</Text>
                                <Text>Lorem ipsum dolor sit amet consectetur.</Text>
                            </View>
                        </View>
                        <View style={{
                            borderBottomColor: '#C6C6C8',
                            borderBottomWidth: 1,
                            width: isTablet ? scaleWidth(735) : scaleWidth(380),
                            alignSelf: 'center'
                        }} />
                    </View>



                    <View style={{
                        backgroundColor: '#F6F6F6',
                         marginTop:scaleHeight(22),
                    }}>
                        <View style={{
                            marginLeft: isTablet ? scaleWidth(34) : scaleWidth(18),
                           
                            
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: isTablet ? scaleHeight(20) : scaleHeight(12),
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingRight: isTablet ? '5%' : scaleWidth(0)
                            }}>
                                <Text style={{
                                    color: '#00000'
                                }}>Notifications</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: scaleWidth(15)
                                }}>
                                    <Text style={{
                                        color: '#C6C6C8'
                                    }}>Enabled</Text>
                                    <Image source={images.next}
                                        style={{
                                            marginRight: scaleWidth(20),
                                            width: scaleWidth(12),
                                            height: scaleHeight(12),
                                            tintColor: '#C6C6C8'
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{
                            borderBottomColor: '#C6C6C8',
                            borderBottomWidth: 1,
                            width: isTablet ? scaleWidth(735) : scaleWidth(380),
                            alignSelf: 'center'
                        }} />
                    </View>



                    <View>
                        <View style={{
                            flexDirection: 'column',
                            paddingVertical: isTablet ? scaleHeight(20) : scaleHeight(12),
                            backgroundColor: '#F6F6F6',
                            marginTop: scaleHeight(22)
                        }}>
                            <Text style={{
                                color: '#FE3B30',
                                marginLeft: isTablet ? scaleWidth(34) : scaleWidth(18),

                            }}>Delete Contact</Text>
                        </View>
                    </View>
                </ScrollView>
            </Animated.View>


        </View>



    )
}

export default InfoEdit