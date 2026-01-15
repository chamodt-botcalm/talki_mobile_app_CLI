
import React, { useEffect, useState } from 'react';
import { Animated, BackHandler, Dimensions, Image, Pressable, Text, TextInput, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import BottomNavigator from '../components/BottomNavigator';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { images } from '../constants/images';
import { screenMap } from '../constants/screenMap';
import Button from '../components/reusable/Button';
import { newUser, updateUser } from '../api/user';
import { saveUser } from '../storage/userStorage';

type RootStackParamList = {
  [key: string]: undefined;
};

export default function UserAccount() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute();

    const [dimensions, setDimensions] = useState({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    });

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [submitting, setSubmitting] = useState(false);

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

    /** =========================
     *  Handle user profile submission
     *  ========================= */
    const handleDone = async () => {
        if (submitting) return;
        
        if (!firstName.trim() || !lastName.trim() || !email.trim() || !username.trim()) {
            Alert.alert('Missing Info', 'Please fill in all fields');
            return;
        }

        try {
            setSubmitting(true);

            // Get temporary wallet data from AsyncStorage
            const tempUserJson = await AsyncStorage.getItem('talki:tempUser');
            if (!tempUserJson) {
                Alert.alert('Error', 'Wallet data not found. Please try again.');
                return;
            }

            const tempUser = JSON.parse(tempUserJson);
            
            if (!tempUser.walletAddress) {
                Alert.alert('Error', 'Wallet address not found. Please try again.');
                return;
            }

            // Call backend /newUser with wallet details
            const user = await newUser({
                walletId: tempUser.walletAddress,
                walletName: tempUser.walletName || 'talki',
                token: tempUser.fcmtoken || null,
            });

            // Update user with profile details using /editUser/:id
            const updatedUser = await updateUser(user._id, {
                firstname: firstName,
                lastname: lastName,
                username: username,
            });

            // Save to local storage
            await saveUser(updatedUser);

            // Clear temporary user data
            await AsyncStorage.removeItem('talki:tempUser');

            // Navigate to main tabs
            navigation.navigate(screenMap.mainTabs);
        } catch (e: any) {
            Alert.alert('Error', e?.message || 'Failed to save profile');
        } finally {
            setSubmitting(false);
        }
    };

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
                            <TextInput 
                                value={firstName}
                                onChangeText={setFirstName}
                                placeholder='Sara' 
                                placeholderTextColor={'#A4A4A4'} 
                                style={{
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
                            <TextInput 
                                value={lastName}
                                onChangeText={setLastName}
                                placeholder='Singh' 
                                placeholderTextColor={'#A4A4A4'} 
                                style={{
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
                            <TextInput 
                                value={email}
                                onChangeText={setEmail}
                                placeholder='Email' 
                                placeholderTextColor={'#A4A4A4'} 
                                style={{
                                    width: isTablet ? scaleWidth(491) : scaleWidth(371),
                                    backgroundColor: '#F6F6F6',
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: '#EEE7E7',
                                    paddingLeft: isTablet ? scaleWidth(17) : scaleWidth(13),
                                    paddingVertical: isTablet ? scaleHeight(14) : scaleHeight(12)

                                }} />
                        </View>
                        {/*Username*/}
                        <View style={{
                            alignItems: 'flex-start',
                            marginBottom: 16

                        }}>
                            <Text style={{
                                marginBottom: isTablet ? scaleHeight(4) : scaleHeight(10),
                                color: '#8C8C8C'
                            }}>Username</Text>
                            <TextInput 
                                value={username}
                                onChangeText={setUsername}
                                placeholder='Username' 
                                placeholderTextColor={'#A4A4A4'} 
                                style={{
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
                            <TextInput 
                                editable={false}
                                placeholder='0xb96cc255470............599' 
                                placeholderTextColor={'#A4A4A4'} 
                                style={{
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
                    <Button
                        style={{
                            position: 'absolute',
                            bottom: isTablet ? scaleHeight(116) : scaleHeight(80),
                            left: isTablet ? (dimensions.width - scaleWidth(490)) / 2 : (dimensions.width - scaleWidth(371)) / 2
                        }}
                        width={isTablet ? scaleWidth(490) : scaleWidth(371)}
                        height={isTablet ? scaleHeight(73) : scaleHeight(60)}
                        fontSize={scale * 20}
                        disabled={submitting}
                        onPress={handleDone}
                    >
                        Done
                    </Button>
                </View>
            </Animated.View>        </View>
    )
}