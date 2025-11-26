import { View, Text, Dimensions, BackHandler, StyleSheet, TouchableOpacity, ScrollView, Pressable, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import BlackBackground from '../../components/main/black'
import WhiteBackground from '../../components/main/white'
import CustomSwitch from '../../components/Switch'
import Icon from 'react-native-vector-icons/Ionicons'
import PullBar from '../../components/pullbar'
import { images } from '../../constants/images'


const Notifications = () => {
    const navigation = useNavigation();
    
    useEffect(() => {
        const backAction = () => {
            navigation.goBack();
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, [navigation]);
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




    const styles = StyleSheet.create({
        row1:
        {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 13,
            paddingHorizontal: 15,
        },
        row2:
        {
            flexDirection: 'row',
            alignItems: 'center',
        },
        borderbottom: {
            borderBottomColor: '#E3E3E6',
            borderBottomWidth: 1,

        },
        border: {
            borderBottomWidth: 1,
            borderBlockColor: '#E3E3E6',
            borderTopWidth: 1,
            borderTopColor: '#E3E3E6',
            width: '100%'
        },
        text: {
            textTransform: 'uppercase',
            fontSize: 16
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: scaleWidth(14),
            marginTop: scaleHeight(73),
        },
        headerText: {
            color: '#D9FD00',
            fontSize: 18,

        },
        backButton: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: scaleWidth(9)
        },
        backIcon: {
            width: scaleWidth(14),
            height: scaleHeight(14),
            tintColor: '#D9FD00',
            resizeMode: 'contain'
        }

    })

    const section1 = [
        {
            title1: 'All Accounts', isSwitch: 'true', title2: ''
        }
    ]
    const section2 = [
        {
            title1: 'Show Notifications', isSwitch: 'true', title2: ''
        },
        {
            title1: 'Message Preview', isSwitch: 'true', title2: ''
        },
        {
            title1: 'Sound', title2: 'None', isSwitch: 'false'
        },
        {
            title1: 'Exceptions', title2: '66 Chats', isSwitch: 'false'
        }
    ]

    const section3 = [
        {
            title1: 'Show Notifications', isSwitch: 'true', title2: ''
        },
        {
            title1: 'Message Preview', isSwitch: 'true', title2: ''
        },
        {
            title1: 'Sound', title2: 'None', isSwitch: 'false'
        },
        {
            title1: 'Exceptions', title2: 'Add', isSwitch: 'false'
        }
    ]

    const MenuItem = ({ title1, title2, isSwitch, isLast }: { title1: string; title2: string; isSwitch: string; isLast?: boolean }) => {
        return (
            <View>
                <TouchableOpacity style={[styles.row1]} >
                    <Text>{title1}</Text>
                    <View style={[styles.row2]}>
                        <Text>{title2}</Text>
                        {isSwitch === 'false' && <Icon name="chevron-forward-outline" size={20} style={{ color: '#AEAEB2' }} />}
                        {isSwitch === 'true' && <CustomSwitch />}
                    </View>
                </TouchableOpacity>
                {!isLast && <View style={[styles.borderbottom, { marginHorizontal: 25 }]} />}

            </View>

        );
    };

    return (
        <BlackBackground>
            {/* Header */}

            <View style={styles.header}>

                <Pressable style={[styles.backButton,{zIndex:1}]} onPress={() => navigation.goBack()}>
                    <Image source={images.backk}
                        style={styles.backIcon} />
                    <Text style={styles.headerText}>Back</Text>
                </Pressable>

                <Text style={[styles.headerText, { position: 'absolute', left: 0, right: 0, textAlign: 'center', zIndex:0}]}>Notifications</Text>
            </View>

            <WhiteBackground height={scaleHeight(811)}>
                <View style={{ alignSelf: 'center', marginTop: scaleHeight(11) }}>
                    <PullBar width={scaleWidth(62.5)} height={scaleHeight(6)} />
                </View>

                <ScrollView contentContainerStyle={{
                    paddingBottom: 10
                }}>
                    {/* Section 1 */}
                    <Text style={[styles.text, { marginTop: scaleHeight(59) }]}> Show notifications from</Text>
                    <View style={[styles.border, { backgroundColor: '#F6F6F6', marginVertical: scaleHeight(8) }]}>
                        {section1.map((item, index) => (
                            <MenuItem key={index} title1={item.title1} title2={item.title2} isSwitch={item.isSwitch} isLast={index === 0} />
                        ))}
                    </View>

                    <Text style={{ marginHorizontal: 18 }}>Turn this off if you want to receive notifications only from your active account.</Text>

                    {/* Section 2 */}
                    <Text style={[styles.text, { marginTop: scaleHeight(32) }]}> Show notifications from</Text>
                    <View style={[styles.border, { backgroundColor: '#F6F6F6', marginVertical: scaleHeight(8) }]}>
                        {section2.map((item, index) => (
                            <MenuItem key={index} title1={item.title1} title2={item.title2} isSwitch={item.isSwitch} isLast={index === section2.length - 1} />
                        ))}
                    </View>

                    <Text style={{ marginHorizontal: 18 }}>Set custom notifications for specific users.</Text>


                    {/* Section 3 */}
                    <Text style={[styles.text, { marginTop: scaleHeight(32) }]}> Group notifications</Text>
                    <View style={[styles.border, { backgroundColor: '#F6F6F6', marginVertical: scaleHeight(8) }]}>
                        {section3.map((item, index) => (
                            <MenuItem key={index} title1={item.title1} title2={item.title2} isSwitch={item.isSwitch} isLast={index === section3.length - 1} />
                        ))}
                    </View>

                    <Text style={{ marginHorizontal: 18 }}>Set custom notificaions for specific groups.</Text>

                </ScrollView>

            </WhiteBackground>
        </BlackBackground>
    )
}

export default Notifications