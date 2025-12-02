import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import BlackBackground from '../../components/main/black';
import WhiteBackground from '../../components/main/white';
import { useBack, scaleHeight, scaleWidth } from '../../constants/size';
import { RootStackParamList } from '../../../../../src/types/navigation';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { images } from '../../constants/images';
import PullBar from '../../components/pullbar';
import Slider from '@react-native-community/slider';


const Apperance = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    useBack(navigation);

    const [selectedTheme, setSelectedTheme] = useState('Classic');
    const [selectedIcon, setSelectedIcon] = useState('Default');

    // Text size slider state
    const [textSizeStep, setTextSizeStep] = useState(2); // 0..steps-1
    const textSizeSteps = 5;
    const stepPercent = 100 / (textSizeSteps - 1);

    const themeOptions = [
        { name: 'Classic', colors: ['#D9FD00', '#2C2C2E'], bg: '#FFFFFF', bdc: '#C6C6C8' },
        { name: 'Day', colors: ['#E5E5EA', '#2C2C2E'], bg: '#FFFFFF', bdc: '#C6C6C8' },
        { name: 'Night', colors: ['#48484A', '#8E8E93'], bg: '#000000', bdc: '#3A3A3C' },
        { name: 'Tinted Blue', colors: ['#213140', '#3E6A97'], bg: '#18222D', bdc: '#3A3A3C' },
    ];

    const iconOptions = [
        { name: 'Default', img:images.greenti },
        { name: 'Default X', img:images.blackti },
        { name: 'Classic', img:images.greenti },
        { name: 'Classic X',img:images.blackti },
    ];

    const menuItems = [
        { title1: 'Chat Background', title2: '', link: '' },
        { title1: 'Auto-Night Mode', title2: 'Disabled', link: '' },
    ];

    const ThemeOption = ({
        name,
        colors,
        isSelected,
        bg,
        bdc,
    }: {
        name: string;
        colors: string[];
        isSelected: boolean;
        bg: string;
        bdc: string;
    }) => {
        return (
            <View style={{ flexDirection: 'column', marginRight: scaleWidth(23) }}>
                <TouchableOpacity style={[styles.themeOption]} onPress={() => setSelectedTheme(name)}>
                    <View
                        style={[
                            styles.themePreview,
                            isSelected && styles.selectedTheme,
                            {
                                backgroundColor: bg,
                                borderWidth: 2,
                                borderColor: isSelected ? '#007AFF' : bdc,
                            },
                        ]}
                    >
                        <View style={[styles.messageBubble, { backgroundColor: colors[0] }]} />
                        <View
                            style={[
                                styles.messageBubble,
                                { backgroundColor: colors[1], alignSelf: 'flex-end' },
                            ]}
                        />
                    </View>
                </TouchableOpacity>
                <Text style={[styles.themeLabel, isSelected && { color: '#007AFF' }]}>{name}</Text>
            </View>
        );
    };

    const IconOption = ({
        name,
        img,
        isSelected,
    }: {
        name: string;
        img: any;
        isSelected: boolean;
    }) => {
        return (
            <TouchableOpacity style={styles.iconOption} onPress={() => setSelectedIcon(name)}>
                <View
                    style={[
                        styles.iconContainer,
                        isSelected && styles.selectedIcon,
                    ]}
                >
                    <View style={{backgroundColor:'white',padding:4, borderRadius:15}}>
                    <Image source={img} />
                    </View>
                </View>
                <Text style={[styles.iconLabel, isSelected && { color: '#007AFF' }]}>{name}</Text>
            </TouchableOpacity>
        );
    };

    const MenuItem = ({
        title1,
        title2,
        link,
        isLast,
    }: {
        title1: string;
        title2: string;
        link?: string;
        isLast?: boolean;
    }) => {
        return (
            <View>
                <TouchableOpacity
                    style={[styles.row1]}
                    onPress={() => link && navigation.navigate(link as never)}
                >
                    <Text>{title1}</Text>
                    <View style={[styles.row2]}>
                        <Text style={{ color: '#AEAEB2' }}>{title2}</Text>
                        <Image
                            source={images.next}
                            style={{ tintColor: '#AEAEB2', width: scaleWidth(8), height: scaleHeight(13) }}
                        />
                    </View>
                </TouchableOpacity>
                {!isLast && <View style={styles.borderbottom} />}
            </View>
        );
    };

    return (
        <BlackBackground>
            {/* Header */}
            <View style={styles.header}>
                <Pressable
                    style={[styles.backButton, { zIndex: 1 }]}
                    onPress={() => navigation.goBack()}
                >
                    <Image source={images.backk} style={styles.backIcon} />
                    <Text style={[styles.headerText, { fontSize: 16 }]}>Back</Text>
                </Pressable>
                <Text
                    style={[
                        styles.headerText,
                        { position: 'absolute', left: 0, right: 0, textAlign: 'center', zIndex: 0 },
                    ]}
                >
                    Appearance
                </Text>
            </View>

            <WhiteBackground height={scaleHeight(811)}>
                <View style={{ height: scaleHeight(11) }} />
                <PullBar width={scaleWidth(62.5)} height={scaleHeight(6)} />
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                    <Text style={styles.sectionHeader}>COLOR THEME</Text>

                    {/* Chat Preview */}
                    <View style={styles.chatPreview}>
                        <View style={styles.messageContainer}>
                            <View style={{ marginLeft: scaleWidth(13) }}>
                                <View
                                    style={{
                                        borderLeftWidth: 2,
                                        borderLeftColor: '#007AFF',
                                        marginBottom: scaleWidth(8),
                                    }}
                                >
                                    <View style={{ marginLeft: scaleWidth(8) }}>
                                        <Text style={styles.senderName}>Martha Craig</Text>
                                        <Text style={styles.messageText}>Good morning!</Text>
                                    </View>
                                </View>
                                <Text style={styles.messageText}>Do you know what time is it?</Text>
                                <View
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 10,
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text style={styles.messageTime}>11:40</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.messageContainer, styles.receivedMessage]}>
                            <Text style={[styles.messageText, { color: '#FFF' }]}>
                                It's morning in Australia..... 😎
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    position: 'absolute',
                                    bottom: 8,
                                    right: 10,
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={[styles.messageTime, { color: '#D9FD00', fontSize: 11 }]}>
                                    11:43
                                </Text>
                                <Image
                                    source={images.checkMark}
                                    style={{
                                        width: 14,
                                        height: 7,
                                        tintColor: '#D9FD00',
                                    }}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Theme Options */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.themeContainer}>
                            {themeOptions.map((theme, index) => (
                                <ThemeOption
                                    key={index}
                                    name={theme.name}
                                    colors={theme.colors}
                                    bg={theme.bg}
                                    bdc={theme.bdc}
                                    isSelected={selectedTheme === theme.name}
                                />
                            ))}
                        </View>
                    </ScrollView>
                    <View
                        style={{
                            backgroundColor: '#C6C6C8',
                            width: '100%',
                            height: scaleHeight(1),
                        }}
                    />

                    {/* Menu Items */}
                    <View style={[styles.border, { backgroundColor: '#F6F6F6', marginTop: scaleHeight(40) }]}>
                        {menuItems.map((item, index) => (
                            <MenuItem
                                key={index}
                                title1={item.title1}
                                title2={item.title2}
                                link={item.link}
                                isLast={index === menuItems.length - 1}
                            />
                        ))}
                    </View>

                    <Text style={[styles.sectionHeader, { marginTop: scaleHeight(40) }]}>TEXT SIZE</Text>

                    {/* Text Size Slider */}
                    <View style={styles.borders}>
                        <View style={styles.textSizeContainer}>
                            <Text style={styles.smallA}>A</Text>

                            <View style={styles.sliderContainer}>
                                <Slider
                                    style={{width:scaleWidth(332)}}
                                    minimumValue={0}
                                    maximumValue={1}
                                    minimumTrackTintColor="#037EE5"
                                    maximumTrackTintColor="#BAB9BE"
                                    thumbImage={require('../../../../../assets/images/Oval11.png') }
                                />
                                <View style={styles.dotsContainer}>
                                    {[...Array(7)].map((_, index) => (
                                        <View key={index} style={styles.dot} />
                                    ))}
                                </View>
                            </View>

                            <Text style={styles.largeA}>A</Text>
                        </View>

                    </View>

                    <Text style={[styles.sectionHeader, { marginTop: scaleHeight(40) }]}>APP ICON</Text>

                    {/* App Icons */}
                    <View style={styles.borders}>
                        <View style={styles.iconContainer2}>
                            {iconOptions.map((icon, index) => (
                                <IconOption
                                    key={index}
                                    name={icon.name}
                                    img={icon.img}
                                    isSelected={selectedIcon === icon.name}
                                />
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </WhiteBackground>
        </BlackBackground>
    );
};

const styles = StyleSheet.create({
    row1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 13,
        paddingHorizontal: 15,
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scaleWidth(15),
    },
    borderbottom: {
        borderBottomColor: '#E3E3E6',
        borderBottomWidth: 1,
        marginHorizontal: scaleWidth(25),
    },
    border: {
        borderBottomWidth: 1,
        borderBottomColor: '#E3E3E6',
        borderTopWidth: 1,
        borderTopColor: '#E3E3E6',
        width: '100%',
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
        gap: scaleWidth(9),
    },
    backIcon: {
        width: scaleWidth(14),
        height: scaleHeight(14),
        tintColor: '#D9FD00',
        resizeMode: 'contain',
    },
    sectionHeader: {
        fontSize: 16,
        color: '#636366',
        marginLeft: scaleWidth(18),
        marginTop: scaleHeight(29),
        marginBottom: scaleHeight(15),
        textTransform: 'uppercase',
    },
    chatPreview: {
        marginHorizontal: scaleWidth(18),
        marginBottom: scaleHeight(34),
    },
    messageContainer: {
        backgroundColor: '#D9FD00',
        padding: 10,
        borderRadius: 30,
        marginBottom: 8,
        maxWidth: '80%',
    },
    receivedMessage: {
        backgroundColor: '#2C2C2E',
        alignSelf: 'flex-end',
        minWidth: '80%',
    },
    senderName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    messageText: {
        fontSize: 14,
        marginBottom: 2,
    },
    messageTime: {
        fontSize: 12,
        color: '#666',
        alignSelf: 'flex-end',
    },
    themeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: scaleWidth(18),
        marginBottom: scaleHeight(20),
    },
    themeOption: {
        alignItems: 'center',
    },
    selectedTheme: {
        borderWidth: 2,
        borderColor: '#007AFF',
        borderRadius: 12,
    },
    themePreview: {
        width: 80,
        height: 60,
        borderRadius: 12,
        padding: 8,
        marginBottom: 8,
    },
    messageBubble: {
        height: 12,
        borderRadius: 6,
        marginBottom: 4,
        width: '70%',
    },
    themeLabel: {
        fontSize: 14,
        textAlign: 'center',
    },
    textSizeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: scaleHeight(20),
        marginHorizontal: scaleWidth(18),
    },
    sliderContainer: {
        position: 'relative',
        width: scaleWidth(332),
    },
    dotsContainer: {
        position: 'absolute',
        top: scaleHeight(7),
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    dot: {
        width: scaleWidth(6),
        height: scaleHeight(6),
        borderRadius: 6,
        backgroundColor: '#BAB9BE',
    },
    smallA: {
        fontSize: 16,
        marginRight: 15,
    },
    largeA: {
        fontSize: 24,
        marginLeft: 15,
    },
    slider: {
        height: scaleHeight(30),
        justifyContent: 'center',
    },
    sliderTrackInactive: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: scaleHeight(4),
        borderRadius: 2,
        backgroundColor: '#E0E0E0',
    },
    sliderTrackActive: {
        position: 'absolute',
        left: 0,
        height: scaleHeight(4),
        borderRadius: 2,
        backgroundColor: '#007AFF',
    },
    stepDot: {
        position: 'absolute',
        top: scaleHeight(13),
        width: 10,
        height: 10,
        borderRadius: 5,
        marginLeft: -5,
        backgroundColor: '#F6F6F6',
        borderWidth: 2,
    },
    stepDotActive: {
        borderColor: '#007AFF',
    },
    stepDotInactive: {
        borderColor: '#C6C6C8',
    },
    sliderThumb: {
        position: 'absolute',
        top: scaleHeight(5),
        width: 22,
        height: 22,
        borderRadius: 11,
        marginLeft: -11,
        backgroundColor: '#FFFFFF',
        borderWidth: 3,
        borderColor: '#007AFF',
        elevation: 3,
    },
    iconContainer2: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: scaleWidth(18),
        marginVertical: scaleHeight(18),
    },
    iconOption: {
        alignItems: 'center',
       
    },
    iconContainer: {
        
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
       
    },
    selectedIcon: {
        borderWidth: 2,
        borderColor: '#007AFF',
    },
    iconText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    iconLabel: {
        fontSize: 12,
        textAlign: 'center',
    },
    borders: {
        backgroundColor: '#F6F6F6',
        borderTopColor: '#C6C6C8',
        borderBottomColor: '#C6C6C8',
        borderBottomWidth: 1,
        borderTopWidth: 1,
    },
});

export default Apperance;
