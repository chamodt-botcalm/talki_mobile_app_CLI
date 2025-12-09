import React, { useState, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Animated, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfilePic from '../../components/profilepic';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingsScreenIcon from '../../components/settingsScreen/settingsScreenIcon';
import PullBar from '../../components/pullbar';
import Modal from 'react-native-modal';
import { RootStackParamList } from '../../../../../src/types/navigation';
import { TabParamList } from '../../../../../src/types/navigation';
import { MessageStackParamList } from '../../../../../src/types/navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import { images } from '../../constants/images';

type CombinedNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList>,
  CompositeNavigationProp<
    NativeStackNavigationProp<TabParamList>,
    NativeStackNavigationProp<MessageStackParamList>
  >
>;

const SettingsScreen = () => {
  const navigation = useNavigation<CombinedNavigationProp>();

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

  const styles = StyleSheet.create({
    back1: {
      backgroundColor: '#232323',
      width: '100%',
      height: '100%',

    },
    back2: {
      position: 'absolute',
      bottom: 0,
      backgroundColor: '#FFFFFF',
      height: scaleHeight(811),
      width: '100%',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      overflow: 'hidden',
    },
    row1: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      backgroundColor: '#F6F6F6',
      paddingVertical: 15
    },
    row2: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 19
    },
    column1: {
      flexDirection: 'column',

    },
    image1: {
      width: 12,
      height: 12,
      resizeMode: 'contain',
      tintColor: '#AEAEB2'
    },
    image2: {
      width: 18,
      height: 18,
      resizeMode: 'contain',
      tintColor: '#D9FD00'
    },
    text: {
      color: '#D9FD00',
      fontSize: 18
    },
    section: {
      width: '100%',
      backgroundColor: '#F6F6F6'
    },
    borderbottom: {
      borderBottomColor: '#C6C6C8',
      borderBottomWidth: 1,
    },
    bordertop: {
      borderTopColor: '#C6C6C8',
      borderTopWidth: 1,
    },
    scroll: {
      flex: 1,
    }

  });

  const accountOptions = [
    { icon: images.savedMessages, title: 'Saved Messages', stylee: styles.borderbottom, mh: { marginHorizontal: 25 }, link: '' },
    { icon: images.recentCalls, title: 'Recent Calls', stylee: styles.borderbottom, mh: { marginHorizontal: 25 }, link: '' },
    { icon: images.stickers, title: 'Stickers', link: 'Sticker' },
  ];

  const settingsOptions = [
    { icon: images.notification, title: 'Notifications and Sounds', stylee: styles.borderbottom, mh: { marginHorizontal: 25 }, link: 'Notifications' },
    { icon: images.privacy, title: 'Privacy and Security', stylee: styles.borderbottom, mh: { marginHorizontal: 25 }, link: 'Privacy' },
    { icon: images.storage, title: 'Data and Storage', stylee: styles.borderbottom, mh: { marginHorizontal: 25 }, link: 'Storage' },
    { icon: images.appearance, title: 'Appearance', stylee: styles.borderbottom, mh: { marginHorizontal: 25 }, link: 'Apperance' },
    { icon: images.language, title: 'Language', link: 'Language' },
  ];

  const MenuItem = ({ icon, title, stylee, mh, link }: { icon: any; title: string; stylee?: any; mh?: any; link?: string }) => {
    return (
      <View>
        <TouchableOpacity style={[styles.row1]} onPress={() => link && navigation.navigate(link as any)}>
          <View style={[styles.row2]}>
            <SettingsScreenIcon link={icon} />
            <Text>{title}</Text>
          </View>
            <Image source={images.next} style={{ tintColor: '#AEAEB2', width: scaleWidth(8), height: scaleHeight(13) }} />
        </TouchableOpacity>
        <View style={[stylee, mh]} />
      </View>

    );
  };
  return (
    <View style={styles.back1}>

      <View style={[styles.row2, { justifyContent: 'space-between', marginTop: scaleHeight(73), marginHorizontal: 14 }]}>
        <Text style={styles.text}>Settings</Text>
        <View style={[styles.row2, { gap: 10 }]}>
          <Image source={images.telephone}
            style={[styles.image2]} />
            <TouchableOpacity onPress={()=>navigation.navigate('Deposite')}>
          <Image source={images.plu}
            style={[styles.image2]} /></TouchableOpacity>
        </View>
      </View>

      <Animated.View style={styles.back2}>
        <View style={{ alignSelf: 'center', marginTop: scaleHeight(11) }}>
          <PullBar width={scaleWidth(62.5)} height={scaleHeight(6)} /></View>
        <ScrollView contentContainerStyle={{
          paddingBottom: 110
        }}>
          {/* Profile Header */}
          <TouchableOpacity onPress={() => navigation.navigate('SettingsInfo' as any)}>
            <View style={[styles.row1, { marginTop: scaleHeight(29) }]}>
              <View style={styles.row2}>
                <ProfilePic width={66} height={66} borderWidth={2} />
                <View style={styles.column1}>
                  <Text style={{
                    marginBottom: 10,
                    fontSize: 14,
                    fontWeight: 'bold'
                  }}>Jon Smith</Text>
                  <Text>0xb96cc255470............599</Text>
                  <Text>@smith.j</Text>
                </View>
              </View>
              <Image source={images.next} style={styles.image1} />
            </View>
          </TouchableOpacity>

          {/* Accounts */}

          <View style={[styles.column1, { backgroundColor: '#F6F6F6', marginTop: 40 }]} >
            <View>
              <View style={[styles.bordertop]}></View>
              <View style={[styles.section, styles.row2, { gap: 15, paddingVertical: 11, paddingLeft: 17 }]}>
                <ProfilePic width={33} height={33} borderWidth={2} />
                <Text>Jon Smith</Text>
              </View>
              <View style={[styles.borderbottom, { marginHorizontal: 25 }]} />
            </View>

            <View>
              <TouchableOpacity>
                <View style={[styles.section, styles.row2, { gap: 15, paddingVertical: 11, paddingLeft: 24 }]}>
                  <Image source={images.plu} />
                  <Text>Add Account</Text>
                </View>
              </TouchableOpacity>
              <View style={[styles.borderbottom, { width: '100%' }]} />
            </View>

          </View>


          {/* Menu Items */}
          <View style={[styles.column1, { backgroundColor: '#F6F6F6' }, styles.bordertop, styles.borderbottom, { marginTop: 40 }]}>
            {accountOptions.map((item, index) => (
              <MenuItem key={index} title={item.title} icon={item.icon} stylee={item.stylee} mh={item.mh} link={item.link} />

            ))}
          </View>

          {/* Settings Items */}

          <View style={[styles.column1, { backgroundColor: '#F6F6F6' }, styles.bordertop, styles.borderbottom, { marginTop: 40 }]}>
            {settingsOptions.map((item, index) => (
              <MenuItem key={index} title={item.title} icon={item.icon} stylee={item.stylee} mh={item.mh} link={item.link} />

            ))}
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  )
}


export default SettingsScreen
