import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import BlackBackground from '../../components/main/black'
import WhiteBackground from '../../components/main/white'
import { useBack, scaleHeight, scaleWidth } from '../../constants/size'
import { RootStackParamList } from '../../../../../src/types/navigation'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { images } from '../../constants/images'
import PullBar from '../../components/pullbar'



const Privacy = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    useBack(navigation);

    const section2 = [
        { title1: 'Phone Number', title2: 'My Contacts', link: '', },
        { title1: 'Last Seen & Online', title2: 'Nobody (+14)', link: '' },
        { title1: 'Profile Photo', title2: 'Everybody', link: '' },
        { title1: 'Voice Calls', title2: 'Nobody (+7)', link: '' },
        { title1: 'Forwarded Messages', title2: 'Everybody', link: '' },
        { title1: 'Groups & Channels', title2: 'Everybody', link: '' },

    ]

    const section1 = [
        { title1: 'Blocked Users', title2: '9', link: '', image: images.BlockedUsers },
        { title1: 'Active Sessions', title2: '2', image: images.ActiveSessions, link: '' },
        { title1: 'Passcode & Face ID', title2: 'off', image: images.FaceID, link: '' },
        { title1: 'Two-Step Verification', title2: 'on', image: images.TwoStepVerification, link: '' },
    ]
    const section3 = [
        { title1: 'If Away For', title2: '6 months', link: '' },
    ]


    const Section1 = ({ title1, title2, link, image, isLast }: { title1: string; title2: string; stylee?: any; mh?: any; link?: string, image: any, isLast?: boolean }) => {
        return (
            <View>
                <TouchableOpacity style={[styles.row1]} onPress={() => link && navigation.navigate(link as never)}>
                    <View style={[styles.row2]}>
                        <Image style={{ resizeMode: 'contain' }} source={image} />
                        <Text>{title1}</Text>
                    </View>
                    <View style={[styles.row2]}>
                        <Text style={{ color: '#AEAEB2' }}>{title2}</Text>
                        {<Image source={images.next} style={{ tintColor: '#AEAEB2', width: scaleWidth(8), height: scaleHeight(13) }} />}
                    </View>
                </TouchableOpacity>
                {!isLast && <View style={styles.borderbottom} />}
            </View>

        );
    };

    const Section2 = ({ title1, title2, link, isLast }: { title1: string; title2: string; stylee?: any; mh?: any; link?: string, isLast: boolean }) => {
        return (
            <View>
                <TouchableOpacity style={[styles.row1]} onPress={() => link && navigation.navigate(link as never)}>

                    <Text>{title1}</Text>

                    <View style={[styles.row2]}>
                        <Text style={{ color: '#AEAEB2' }}>{title2}</Text>
                        {<Image source={images.next} style={{ tintColor: '#AEAEB2', width: scaleWidth(8), height: scaleHeight(13) }} />}
                    </View>
                </TouchableOpacity>
                {!isLast && <View style={styles.borderbottom} />}
            </View>

        );
    };
    const Section3 = ({ title1, title2, link, isLast }: { title1: string; title2: string; stylee?: any; mh?: any; link?: string, isLast: boolean }) => {
        return (
            <View>
                <TouchableOpacity style={[styles.row1]} onPress={() => link && navigation.navigate(link as never)}>

                    <Text>{title1}</Text>

                    <View style={[styles.row2]}>
                        <Text style={{ color: '#AEAEB2' }}>{title2}</Text>
                        {<Image source={images.next} style={{ tintColor: '#AEAEB2', width: scaleWidth(8), height: scaleHeight(13) }} />}
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
                    <Image source={images.backk}
                        style={styles.backIcon} />
                    <Text style={[styles.headerText, { fontSize: 16 }]}>Back</Text>
                </Pressable>

                <Text style={[styles.headerText, { position: 'absolute', left: 0, right: 0, textAlign: 'center', zIndex: 0 }]}>Privacy and Security</Text>
            </View>
            <WhiteBackground height={scaleHeight(811)}>
                <View style={{ height: scaleHeight(11) }} />
                <PullBar width={scaleWidth(62.5)} height={scaleHeight(6)} />
                <ScrollView contentContainerStyle={{
                    paddingBottom: 100}}>
                    {/* Section 1 */}
                    <View style={[styles.border, { backgroundColor: '#F6F6F6' }, { marginTop: 29 }]}>
                        {section1.map((item, index) => (
                            <Section1 key={index} title1={item.title1} title2={item.title2} link={item.link} image={item.image} isLast={index === section1.length - 1} />

                        ))}
                    </View>
                    <Text style={{ fontSize:16,color: '#636366', marginLeft: scaleWidth(18), marginTop: scaleHeight(18), marginBottom: scaleHeight(8), textTransform: 'uppercase' }}>Privacy</Text>
                    {/* Section 2 */}
                    <View style={[styles.border, { backgroundColor: '#F6F6F6' }]}>
                        {section2.map((item, index) => (
                            <Section2 key={index} title1={item.title1} title2={item.title2} link={item.link} isLast={index === section2.length - 1} />

                        ))}
                    </View>
                    <Text style={{ fontSize:14,color: '#636366', marginLeft: scaleWidth(18), marginTop: scaleHeight(18) }}>Change who can add you to groups and channels.</Text>
                    <Text style={{ fontSize:16,color: '#636366', marginLeft: scaleWidth(18), textTransform: 'uppercase' }}>Automatically delete my account</Text>

                    {/* Section 3 */}
                    <View style={[styles.border, { backgroundColor: '#F6F6F6' }, { marginTop: scaleHeight(7) }]}>
                        {section3.map((item, index) => (
                            <Section3 key={index} title1={item.title1} title2={item.title2} link={item.link} isLast={index === section3.length - 1} />

                        ))}
                    </View>
                    <Text style={{ color: '#636366', marginHorizontal: scaleWidth(18), marginTop: scaleHeight(18),fontSize:13 }}>If you do not come online at least once within this period, your account will be deleted along with all messages and contacts.</Text>

                </ScrollView>
            </WhiteBackground>
        </BlackBackground>
    )
}
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
export default Privacy