import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import BlackBackground from '../../components/main/black'
import WhiteBackground from '../../components/main/white'
import { useBack, scaleHeight, scaleWidth } from '../../constants/size'
import { RootStackParamList } from '../../../../../src/types/navigation'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { images } from '../../constants/images'
import PullBar from '../../components/pullbar'

const Apperance = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    useBack(navigation);

    const [selectedTheme, setSelectedTheme] = useState('Classic');
    const [selectedIcon, setSelectedIcon] = useState('Default');

    const themeOptions = [
        { name: 'Classic', colors: ['#D9FD00', '#2C2C2E'] },
        { name: 'Day', colors: ['#E5E5EA', '#2C2C2E'] },
        { name: 'Night', colors: ['#48484A', '#8E8E93'] }
    ];

    const iconOptions = [
        { name: 'Default', color: '#D9FD00' },
        { name: 'Default X', color: '#2C2C2E' },
        { name: 'Classic', color: '#D9FD00' },
        { name: 'Classic X', color: '#2C2C2E' }
    ];

    const menuItems = [
        { title1: 'Chat Background', title2: '', link: '' },
        { title1: 'Auto-Night Mode', title2: 'Disabled', link: '' }
    ];

    const ThemeOption = ({ name, colors, isSelected }: { name: string; colors: string[]; isSelected: boolean }) => {
        return (
            <TouchableOpacity 
                style={[styles.themeOption, isSelected && styles.selectedTheme]} 
                onPress={() => setSelectedTheme(name)}
            >
                <View style={styles.themePreview}>
                    <View style={[styles.messageBubble, { backgroundColor: colors[0] }]} />
                    <View style={[styles.messageBubble, { backgroundColor: colors[1], alignSelf: 'flex-end' }]} />
                </View>
                <Text style={[styles.themeLabel, isSelected && { color: '#007AFF' }]}>{name}</Text>
            </TouchableOpacity>
        );
    };

    const IconOption = ({ name, color, isSelected }: { name: string; color: string; isSelected: boolean }) => {
        return (
            <TouchableOpacity 
                style={styles.iconOption} 
                onPress={() => setSelectedIcon(name)}
            >
                <View style={[styles.iconContainer, { backgroundColor: color }, isSelected && styles.selectedIcon]}>
                    <Text style={[styles.iconText, { color: color === '#D9FD00' ? '#000' : '#FFF' }]}>ti</Text>
                </View>
                <Text style={[styles.iconLabel, isSelected && { color: '#007AFF' }]}>{name}</Text>
            </TouchableOpacity>
        );
    };

    const MenuItem = ({ title1, title2, link, isLast }: { title1: string; title2: string; link?: string; isLast?: boolean }) => {
        return (
            <View>
                <TouchableOpacity style={[styles.row1]} onPress={() => link && navigation.navigate(link as never)}>
                    <Text>{title1}</Text>
                    <View style={[styles.row2]}>
                        <Text style={{ color: '#AEAEB2' }}>{title2}</Text>
                        <Image source={images.next} style={{ tintColor: '#AEAEB2', width: scaleWidth(8), height: scaleHeight(13) }} />
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
                <Pressable style={[styles.backButton, { zIndex: 1 }]} onPress={() => navigation.goBack()}>
                    <Image source={images.backk} style={styles.backIcon} />
                    <Text style={[styles.headerText, { fontSize: 16 }]}>Back</Text>
                </Pressable>
                <Text style={[styles.headerText, { position: 'absolute', left: 0, right: 0, textAlign: 'center', zIndex: 0 }]}>Appearance</Text>
            </View>

            <WhiteBackground height={scaleHeight(811)}>
                <View style={{ height: scaleHeight(11) }} />
                <PullBar width={scaleWidth(62.5)} height={scaleHeight(6)} />
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                    
                    <Text style={styles.sectionHeader}>COLOR THEME</Text>
                    
                    {/* Chat Preview */}
                    <View style={styles.chatPreview}>
                        <View style={styles.messageContainer}>
                            <Text style={styles.senderName}>Martha Craig</Text>
                            <Text style={styles.messageText}>Good morning!</Text>
                            <Text style={styles.messageText}>Do you know what time is it?</Text>
                            <Text style={styles.messageTime}>11:40</Text>
                        </View>
                        <View style={[styles.messageContainer, styles.receivedMessage]}>
                            <Text style={[styles.messageText, { color: '#FFF' }]}>It's morning in Australia..... 😎</Text>
                            <Text style={[styles.messageTime, { color: '#FFF' }]}>11:43 ✓✓</Text>
                        </View>
                    </View>

                    {/* Theme Options */}
                    <View style={styles.themeContainer}>
                        {themeOptions.map((theme, index) => (
                            <ThemeOption 
                                key={index} 
                                name={theme.name} 
                                colors={theme.colors} 
                                isSelected={selectedTheme === theme.name} 
                            />
                        ))}
                    </View>

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
                    <View style={styles.textSizeContainer}>
                        <Text style={styles.smallA}>A</Text>
                        <View style={styles.sliderContainer}>
                            <View style={styles.slider}>
                                <View style={styles.sliderTrack} />
                                <View style={[styles.sliderThumb, { left: '30%' }]} />
                            </View>
                        </View>
                        <Text style={styles.largeA}>A</Text>
                    </View>

                    <Text style={[styles.sectionHeader, { marginTop: scaleHeight(40) }]}>APP ICON</Text>
                    
                    {/* App Icons */}
                    <View style={styles.iconContainer2}>
                        {iconOptions.map((icon, index) => (
                            <IconOption 
                                key={index} 
                                name={icon.name} 
                                color={icon.color} 
                                isSelected={selectedIcon === icon.name} 
                            />
                        ))}
                    </View>

                </ScrollView>
            </WhiteBackground>
        </BlackBackground>
    )
}

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
        gap: scaleWidth(15)
    },
    borderbottom: {
        borderBottomColor: '#E3E3E6',
        borderBottomWidth: 1,
        marginHorizontal: scaleWidth(25)
    },
    border: {
        borderBottomWidth: 1,
        borderBlockColor: '#E3E3E6',
        borderTopWidth: 1,
        borderTopColor: '#E3E3E6',
        width: '100%'
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
    },
    sectionHeader: {
        fontSize: 16,
        color: '#636366',
        marginLeft: scaleWidth(18),
        marginTop: scaleHeight(29),
        marginBottom: scaleHeight(15),
        textTransform: 'uppercase'
    },
    chatPreview: {
        marginHorizontal: scaleWidth(18),
        marginBottom: scaleHeight(20)
    },
    messageContainer: {
        backgroundColor: '#D9FD00',
        padding: 12,
        borderRadius: 18,
        marginBottom: 8,
        maxWidth: '80%'
    },
    receivedMessage: {
        backgroundColor: '#2C2C2E',
        alignSelf: 'flex-end'
    },
    senderName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4
    },
    messageText: {
        fontSize: 16,
        marginBottom: 2
    },
    messageTime: {
        fontSize: 12,
        color: '#666',
        alignSelf: 'flex-end'
    },
    themeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: scaleWidth(18),
        marginBottom: scaleHeight(20)
    },
    themeOption: {
        alignItems: 'center',
        padding: 10
    },
    selectedTheme: {
        borderWidth: 2,
        borderColor: '#007AFF',
        borderRadius: 12
    },
    themePreview: {
        width: 80,
        height: 60,
        backgroundColor: '#F0F0F0',
        borderRadius: 12,
        padding: 8,
        marginBottom: 8
    },
    messageBubble: {
        height: 12,
        borderRadius: 6,
        marginBottom: 4,
        width: '70%'
    },
    themeLabel: {
        fontSize: 14,
        textAlign: 'center'
    },
    textSizeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: scaleWidth(18),
        marginBottom: scaleHeight(20)
    },
    smallA: {
        fontSize: 16,
        marginRight: 15
    },
    largeA: {
        fontSize: 24,
        marginLeft: 15
    },
    sliderContainer: {
        flex: 1
    },
    slider: {
        height: 4,
        backgroundColor: '#E0E0E0',
        borderRadius: 2,
        position: 'relative'
    },
    sliderTrack: {
        height: 4,
        backgroundColor: '#007AFF',
        borderRadius: 2,
        width: '30%'
    },
    sliderThumb: {
        width: 20,
        height: 20,
        backgroundColor: '#007AFF',
        borderRadius: 10,
        position: 'absolute',
        top: -8
    },
    iconContainer2: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: scaleWidth(18)
    },
    iconOption: {
        alignItems: 'center'
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8
    },
    selectedIcon: {
        borderWidth: 2,
        borderColor: '#007AFF'
    },
    iconText: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    iconLabel: {
        fontSize: 12,
        textAlign: 'center'
    }
})

export default Apperance