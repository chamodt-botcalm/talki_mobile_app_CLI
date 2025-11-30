import React, { useEffect, useState } from 'react';
import {
    Alert,
    BackHandler,
    Dimensions,
    Image,
    Pressable,
    Text,
    TextInput,
    View,
    StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../src/types/navigation';
import { images } from '../constants/images';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function WelcomePage() {
    const navigation = useNavigation<NavigationProp>();
   
    const [showCreateWallet, setShowCreateWallet] = useState(false);
    const [showImportAccount, setShowImportAccount] = useState(false);

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

    useEffect(() => {
        const backAction = () => {
            if (showCreateWallet) {
                setShowCreateWallet(false);
                return true;
            }
            if (showImportAccount) {
                setShowImportAccount(false);
                return true;
            }
            return false;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => backHandler.remove();
    }, [showCreateWallet, showImportAccount]);

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

    return (
        
        <View style={styles.container} >

            {/* Top Background Image */}
            <Image
                source={
                    isLandscape
                        ? images.groupp2
                        : images.groupp
                }
                style={[
                    styles.topImage,
                    {
                        bottom: isTablet ? scaleHeight(600) : scaleHeight(422),
                        right: isTablet ? scaleWidth(430) : scaleWidth(123),
                    },
                ]}
            />

            {/* Bottom Sheet */}
            <View style={styles.bottomSheet}>

                {/* Floating rock image */}
                <Image
                    source={
                        isTablet
                            ? images.rockk2
                            : images.rockk
                    }
                    style={[
                        styles.rockImage,
                        { bottom: isTablet ? scaleHeight(380) : scaleHeight(308) },
                    ]}
                />

                {/* Logo */}
                <View
                    style={[
                        styles.logoWrapper,
                        {
                            bottom: isTablet ? scaleHeight(650) : scaleHeight(536),
                            left: isTablet ? scaleWidth(118) : 0,
                            alignItems: isTablet ? 'flex-start' : 'center',
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.logoText,
                            { fontSize: isTablet ? 170 * scale : 141 * scale },
                        ]}
                    >
                        talk
                        <Text style={{ fontSize: isTablet ? 277 * scale : 229 * scale }}>
                            i
                        </Text>
                    </Text>
                </View>

                {/* Welcome Text */}
                <Text
                    style={[
                        styles.title,
                        {
                            top: isTablet ? scaleHeight(134) : scaleHeight(70),
                            fontSize: scale * 40,
                        },
                    ]}
                >
                    Welcome
                </Text>

                {/* ================== IMPORT ACCOUNT ================== */}
                {showImportAccount && (
                    <View
                        style={[
                            styles.formWrapper,
                            {
                                top: isTablet ? scaleHeight(230) : scaleHeight(169),
                                paddingHorizontal: isTablet
                                    ? scaleWidth(172)
                                    : scaleWidth(29.5),
                            },
                        ]}
                    >
                        <Text style={[styles.label, { fontSize: scale * 14 }]}>
                            Private key
                        </Text>

                        <TextInput
                            placeholder="Private key"
                            placeholderTextColor="#A4A4A4"
                            style={[
                                styles.input,
                                {
                                    paddingVertical: scaleHeight(12),
                                    paddingLeft: scaleWidth(12),
                                    width: isTablet
                                        ? scaleWidth(490)
                                        : scaleWidth(371),
                                    marginBottom: isTablet
                                        ? scaleHeight(153)
                                        : scaleHeight(80),
                                },
                            ]}
                        />

                        <Pressable
                            style={[
                                styles.button,
                                {
                                    width: isTablet
                                        ? scaleWidth(490)
                                        : scaleWidth(371),
                                    height: isTablet
                                        ? scaleHeight(73)
                                        : scaleHeight(60),
                                },
                            ]}
                            onPress={() => navigation.navigate('ConnectWallet')}
                        >
                            <Text style={[styles.buttonText, { fontSize: scale * 16 }]}>
                                Import
                            </Text>
                        </Pressable>
                    </View>
                )}

                {/* ================== CREATE WALLET ================== */}
                {showCreateWallet && (
                    <>
                        <View
                            style={[
                                styles.cameraWrapper,
                                {
                                    top: isTablet ? scaleHeight(255) : scaleHeight(143),
                                },
                            ]}
                        >
                            <Image source={images.camera} />
                        </View>

                        <View
                            style={[
                                styles.formWrapper,
                                {
                                    top: isTablet ? scaleHeight(398) : scaleHeight(229),
                                    paddingHorizontal: isTablet
                                        ? scaleWidth(172)
                                        : scaleWidth(29.5),
                                },
                            ]}
                        >
                            <Text style={[styles.label, { fontSize: scale * 14 }]}>
                                Wallet Address
                            </Text>

                            <TextInput
                                placeholder="0xb96cc255470............599"
                                placeholderTextColor="#A4A4A4"
                                style={[
                                    styles.input,
                                    {
                                        paddingVertical: scaleHeight(12),
                                        paddingLeft: scaleWidth(12),
                                        width: isTablet
                                            ? scaleWidth(490)
                                            : scaleWidth(371),
                                        marginBottom: scaleHeight(20),
                                    },
                                ]}
                            />

                            <Pressable
                                style={[
                                    styles.button,
                                    {
                                        width: isTablet
                                            ? scaleWidth(490)
                                            : scaleWidth(371),
                                        height: scaleHeight(60),
                                    },
                                ]}
                                onPress={() => navigation.navigate('UserAccount')}
                            >
                                <Text style={[styles.buttonText, { fontSize: scale * 16 }]}>
                                    Create Wallet
                                </Text>
                            </Pressable>
                        </View>
                    </>
                )}

                {/* ================== DEFAULT BUTTONS ================== */}
                {!showCreateWallet && !showImportAccount && (
                    <>
                        <Pressable
                            style={[
                                styles.button,
                                {
                                    position: 'absolute',
                                    top: isTablet ? scaleHeight(403) : scaleHeight(181),
                                    left:
                                        (dimensions.width -
                                            (isTablet
                                                ? scaleWidth(490)
                                                : scaleWidth(371))) /
                                        2,
                                    width: isTablet
                                        ? scaleWidth(490)
                                        : scaleWidth(371),
                                    height: scaleHeight(60),
                                },
                            ]}
                            onPress={() => navigation.navigate('ConnectWallet')}
                        >
                            <Text style={[styles.buttonText, { fontSize: scale * 16 }]}>
                                Connect Wallet
                            </Text>
                        </Pressable>

                        <View
                            style={[
                                styles.row,
                                {
                                    top: isTablet ? scaleHeight(480) : scaleHeight(253),
                                },
                            ]}
                        >
                            {/* Create Wallet */}
                            <Pressable
                                style={[
                                    styles.outlineButton,
                                    {
                                        width: isTablet
                                            ? scaleWidth(238)
                                            : scaleWidth(180),
                                        height: scaleHeight(60),
                                    },
                                ]}
                                onPress={() => setShowCreateWallet(true)}
                            >
                                <Text style={[styles.outlineText, { fontSize: scale * 16 }]}>
                                    Create Wallet
                                </Text>
                            </Pressable>

                            {/* Import */}
                            <Pressable
                                style={[
                                    styles.outlineButton,
                                    {
                                        width: isTablet
                                            ? scaleWidth(238)
                                            : scaleWidth(180),
                                        height: scaleHeight(60),
                                    },
                                ]}
                                onPress={() => setShowImportAccount(true)}
                            >
                                <Text style={[styles.outlineText, { fontSize: scale * 16 }]}>
                                    Import Account
                                </Text>
                            </Pressable>
                        </View>
                    </>
                )}
            </View>
        </View>
        
    );
}

/* ========================================================= */
/* ======================= STYLES ========================== */
/* ========================================================= */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#232323',
        overflow:'hidden'
    },

    topImage: {
        position: 'absolute',
    },

    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
        backgroundColor: '#FFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },

    rockImage: {
        position: 'absolute',
    },

    logoWrapper: {
        position: 'absolute',
        width: '100%',
    },

    logoText: {
        color: '#DBFF00',
        fontWeight: '600',
    },

    title: {
        position: 'absolute',
        textAlign: 'center',
        fontWeight: 'bold',
        left: 0,
        right: 0,
    },

    formWrapper: {
        position: 'absolute',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },

    label: {
        color: '#8C8C8C',
        marginBottom: 6,
        fontFamily: 'Inter',
    },

    input: {
        backgroundColor: '#F6F6F6',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#EEE7E7',
        fontFamily: 'Inter',
    },

    button: {
        backgroundColor: '#DBFF00',
        justifyContent: 'center',
        borderRadius: 8,
    },

    buttonText: {
        textAlign: 'center',
        color: 'black',
        fontWeight: '600',
        fontFamily: 'Inter',
    },

    cameraWrapper: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
    },

    row: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        gap: 12,
    },

    outlineButton: {
        borderColor: '#DBFF00',
        borderWidth: 2,
        justifyContent: 'center',
        borderRadius: 8,
    },

    outlineText: {
        textAlign: 'center',
        color: '#000',
        fontFamily: 'Inter',
        fontWeight: '600',
    },
});
