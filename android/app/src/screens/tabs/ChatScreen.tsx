import MessageList from '../../components/MessageList';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Animated, BackHandler, Dimensions, ScrollView, View, Image, Pressable, TouchableOpacity } from 'react-native';
import StoryView from '../../components/StoryView';
import MessageScreen from '../message/Message_Screen';
import PullBar from '../../components/pullbar'
import { TabParamList } from '../../../../../src/types/navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { images } from '../../constants/images';

type NavigationProp = NativeStackNavigationProp<TabParamList>;

export default function ChatScreen() {

    const navigation = useNavigation<NavigationProp>();

   
    const [selectedChat, setSelectedChat] = useState<string | null>(null);
    const [totalMessages, setTotalMessages] = useState(0);

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

    if (isTablet) {
        return (
            <View style={{
                backgroundColor: '#232323',
                width: '100%',
                height: '100%',
                flexDirection: 'row',

            }}>

                <View style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    right: scaleWidth(41),
                    top: scaleHeight(45),
                    gap: scaleWidth(10),
                }}>
                    <TouchableOpacity onPress={()=>navigation.navigate('CallScreen')}>
                    <Image source={images.telephone}
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: '#D9FD00'
                        }} />
                    </TouchableOpacity>

                    <Image source={images.edit}
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: '#D9FD00'
                        }} />
                </View>

                <View style={{
                    position: 'absolute',
                    bottom: dimensions.height - scaleHeight(260),
                    width: '100%',
                    height: scaleHeight(160),
                    zIndex: 1
                }}>
                    <StoryView />
                </View>

                {/* Left Side - Chat List */}
                <View style={{
                    width: '50%',
                    height: '100%',
                    backgroundColor: '#232323',
                }}>


                    <View style={{
                        position: 'absolute',
                        top: scaleHeight(220),
                        bottom: 0,
                        backgroundColor: '#FFFFFF',
                        width: '100%',
                        borderTopLeftRadius: 30,

                        overflow: 'hidden',
                    }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <MessageList onChatSelect={setSelectedChat} onTotalMessagesChange={setTotalMessages} />
                        </ScrollView>
                    </View>
                </View>

                {/* Right Side - Message Screen */}
                <View style={{
                    width: '50%',
                    height: '100%',
                    paddingTop: scaleHeight(220),
                }}>
                    {selectedChat ? (
                        <MessageScreen />
                    ) : (
                        <View style={{
                            flex: 1,
                            backgroundColor: '#F5F5F5',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderTopRightRadius: 30,
                        }}>
                            {/* Placeholder when no chat selected */}
                        </View>
                    )}
                </View>
            </View>
        );
    }

    // Mobile Layout
    return (
        <View style={{
            backgroundColor: '#232323',
            width: '100%',
            height: '100%',
        }}>

            <View style={{
                flexDirection: 'row',
                position: 'absolute',
                right: '3%',
                top:dimensions.height * 0.05,
                gap: scaleWidth(10),
            }}>
                <TouchableOpacity onPress={()=>navigation.navigate('CallScreen')}>
                <Image source={images.telephone}
                    style={{
                        width: 17,
                        height: 17,
                        tintColor: '#D9FD00'
                    }} />
                </TouchableOpacity>

                <Image source={images.edit}
                    style={{
                        width: 17,
                        height: 17,
                        tintColor: '#D9FD00'
                    }} />
            </View>

            <View style={{
                position: 'absolute',
                bottom: scaleHeight(714),
                width: '100%'
            }}>
                <StoryView />
            </View>

            <View style={{
                position: 'absolute',
                bottom: 0,
                backgroundColor: '#FFFFFF',
                width: '100%',
                height: scaleHeight(714),
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                overflow: 'hidden',
            }}>
                <View style={{alignSelf:'center', marginTop:scaleHeight(11)}}>
        <PullBar width={scaleWidth(62.5)} height={scaleHeight(6)}/></View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <MessageList onTotalMessagesChange={setTotalMessages} />
                </ScrollView>
            </View>
        </View>
    )
}
