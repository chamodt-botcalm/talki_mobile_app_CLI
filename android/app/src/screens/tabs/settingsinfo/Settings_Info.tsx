import BlackBackground from '../../../components/main/black';
import WhiteBackground from '../../../components/main/white';
import PullBar from '../../../components/pullbar'
import ActionSheet from '../../../components/editProfile/ActionSheet';
import { useEffect, useState } from 'react';
import { BackHandler, Dimensions, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { images } from '../../../constants/images';

const SettingsInfo = () => {
    const navigation = useNavigation();
    const [showSheet, setShowSheet] = useState(false);

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


    useEffect(() => {
        const backAction = () => {
            navigation.goBack();
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, [navigation]);



    const styles = StyleSheet.create({
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: scaleWidth(14),
            marginTop: scaleHeight(73)
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
        headerText: {
            color: '#D9FD00',
            fontSize: 18
        },
        row1: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: scaleWidth(30),
            paddingLeft: scaleWidth(15)
        },
        column1: {
            flexDirection: 'column',
            gap: scaleWidth(8.5),
            width: '100%'
        },
        column2: {
            flexDirection: 'column',
            width: '100%',
        },
        image1: {
            width: scaleWidth(66),
            height: scaleHeight(66),
            resizeMode: 'contain'
        },
        boderbottom: {
            borderBottomColor: '#C6C6C8',
            borderBottomWidth: 1,
        },
        bordertop: {
            borderTopColor: '#C6C6C8',
            borderTopWidth: 1,
        },
        text1: {
            color: '#C7C7CC',
            fontSize: 14
        },
        row2: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        center: {
            alignSelf: 'center',
            width: '100%',
            alignItems: 'center',
            paddingVertical: scaleHeight(11),
            backgroundColor: '#F6F6F6'
        }
    })
    const profile = {
        firstname: 'First Name',
        lastname: 'Last Name',
        image: images.camera
    };
    const Options = [
        { title1: 'Wallet', title2: '0xb96cc255470............599', stylee: styles.boderbottom, mh: { marginHorizontal: scaleWidth(10) } },
        { title1: 'User Name', title2: '@smith.j', stylee: styles.boderbottom, mh: { marginHorizontal: scaleWidth(10) } },
        { title1: 'Bio', title2: '+Add' },
    ];

    const Choose = [
        { title: 'Add Account', top: { marginTop: scaleHeight(40) }, color: { color: '#037EE5' } },
        { title: 'Log Out', top: { marginTop: scaleHeight(38) }, color: { color: '#FE3B30' } }
    ];
    const MenuItem = ({ title1, title2, stylee, mh }: { title1: string; title2: string; stylee?: any; mh?: any }) => {
        return (
            <View>
                <TouchableOpacity style={[styles.row2, { justifyContent: 'space-between', paddingVertical: scaleHeight(14) }]}>
                    <Text>{title1}</Text>
                    <View style={[styles.row2, { gap: 13 }]}>
                        <Text style={styles.text1}>{title2}</Text>
                        <Icon name="chevron-forward-outline" size={20} style={{ color: '#AEAEB2' }} />
                    </View>
                </TouchableOpacity>
                <View style={[stylee, mh]} />
            </View>

        );
    };
    const ChooseItem = ({ title, top, color }: { title: string; top?: any; color?: any }) => {
        return (
            <View style={[styles.center, top]}>
                <TouchableOpacity >
                    <Text style={[color, { fontSize: 17 }]}>{title}</Text>
                </TouchableOpacity>
            </View>

        );
    };
    return (
        <BlackBackground>
            <View style={styles.header}>
                <Pressable>
                    <View style={styles.backButton}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Image source={images.backk}
                                style={styles.backIcon} />
                        </Pressable> 
                        <Pressable onPress={() => navigation.goBack()}>
                            <Text style={styles.headerText}>Back</Text>
                        </Pressable>
                    </View>
                </Pressable>
                <Text style={styles.headerText}>Edit Profile</Text>
                <Pressable onPress={() => navigation.goBack()}>
                    <Text style={styles.headerText}>Done</Text>
                </Pressable>
            </View>
            {/* White Backgroud */}
            <WhiteBackground height={scaleHeight(811)}>
                {/* Pull Bar */}
                <View style={{ alignSelf: 'center', marginTop: scaleHeight(11) }}>
                    <PullBar width={scaleWidth(62.5)} height={scaleHeight(6)} />
                </View>
                {/* Section 1 */}
                <View style={[styles.row1, { backgroundColor: '#F6F6F6', paddingVertical: scaleHeight(13), marginTop: scaleHeight(29) }]}>
                    <TouchableOpacity onPress={() => setShowSheet(true)}>
                        <Image source={profile.image}
                            style={styles.image1}
                        />
                    </TouchableOpacity>
                    <View style={styles.column1}>
                        <Text style={styles.text1}>{profile.firstname}</Text>
                        <View style={[styles.boderbottom, { marginLeft: scaleWidth(-11), marginRight: scaleWidth(150) }]} />
                        <Text style={styles.text1}>{profile.lastname}</Text>
                    </View>
                </View>
                {/* Section 2 */}
                <View style={[styles.column2, styles.boderbottom, styles.bordertop, { backgroundColor: '#F6F6F6' }, { paddingHorizontal: scaleWidth(14) }, { marginTop: 40 }]}>
                    {Options.map((item, index) => (
                        <MenuItem key={index} title1={item.title1} title2={item.title2} stylee={item.stylee} mh={item.mh} />

                    ))}
                </View>
                {/* Section 3 */}
                <View >
                    {Choose.map((item, index) => (
                        <ChooseItem key={index} title={item.title} top={item.top} color={item.color} />

                    ))}
                </View>
            </WhiteBackground>
            <ActionSheet 
                isVisible={showSheet} 
                onClose={() => setShowSheet(false)} 
            />
        </BlackBackground>
    )
}

export default SettingsInfo