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
import { RootStackParamList } from '../../types/navigation';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { images } from '../../constants/images';
import PullBar from '../../components/pullbar';

const Language = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    useBack(navigation);

    const [selectedLanguage, setSelectedLanguage] = useState('English');

    const languages = [
        { name: 'English', nativeName: 'English' },
        { name: 'Arabic', nativeName: 'تیبرعلا' },
        { name: 'Catalan', nativeName: 'Català' },
        { name: 'Dutch', nativeName: 'Nederlands' },
        { name: 'French', nativeName: 'Français' },
        { name: 'German', nativeName: 'Deutsch' },
        { name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
        { name: 'Italian', nativeName: 'Italiano' },
        { name: 'Korean', nativeName: '한국어' },
        { name: 'Malay', nativeName: 'Bahasa Melayu' },
        { name: 'Persian', nativeName: 'یسراف' },
        { name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)' },
    ];

    const LanguageItem = ({ name, nativeName, isSelected }: { name: string; nativeName: string; isSelected: boolean }) => {
        return (
            <TouchableOpacity
                style={styles.languageItem}
                onPress={() => setSelectedLanguage(name)}
            >
                <View>
                    <Text style={styles.languageName}>{name}</Text>
                    <Text style={styles.nativeName}>{nativeName}</Text>
                </View>
                {isSelected && (
                   <Image style={{width:scaleWidth(12),height:scaleHeight(12),tintColor:'#D9FD00',resizeMode:'contain'}} source={images.check}/>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <BlackBackground>
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
                    Language
                </Text>
            </View>

            <WhiteBackground height={scaleHeight(811)}>
                <View style={{ height: scaleHeight(11) }} />
                <PullBar width={scaleWidth(62.5)} height={scaleHeight(6)} />
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                    {languages.map((language, index) => (
                        <View key={index}>
                            <LanguageItem
                                name={language.name}
                                nativeName={language.nativeName}
                                isSelected={selectedLanguage === language.name}
                            />
                            {index < languages.length - 1 && <View style={styles.separator} />}
                        </View>
                    ))}
                </ScrollView>
            </WhiteBackground>
        </BlackBackground>
    );
};

const styles = StyleSheet.create({
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
    languageItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: scaleWidth(32),
        paddingVertical: scaleHeight(16),
    },
    languageName: {
        fontSize: 18,
        color: '#000',
        fontWeight: '400',
    },
    nativeName: {
        fontSize: 16,
        color: '#666',
        marginTop: 2,
    },
    checkmark: {
        fontSize: 20,
        color: '#D9FD00',
        fontWeight: 'bold',
    },
    separator: {
        height: 1,
        backgroundColor: '#E5E5EA',
        marginHorizontal: scaleWidth(32),
    },
});

export default Language;