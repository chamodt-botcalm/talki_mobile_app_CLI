import React, { useState, useEffect } from 'react'
import { Image, View, Dimensions, Animated, BackHandler, Text, ScrollView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { scaleWidth, scaleHeight, isTablet } from '../../constants/size'
import BlackBackground from '../../components/main/black'
import WhiteBackground from '../../components/main/white'
import Tabs from '../../components/tabs'
import Tokens from '../../components/tokens'
import ProfilePic from '../../components/profilepic'
import PullBar from '../../components/pullbar'
import { images } from '../../constants/images'
const WalletScreen = () => {
  const navigation = useNavigation();
  const [totalSum, setTotalSum] = useState<number>(0);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [navigation]);



  return (
    <BlackBackground>
      <View style={[styles.header, { marginTop: isTablet ? scaleHeight(110) : scaleHeight(73) }]}>
        <Text style={styles.headerTitle}>Wallet</Text>
        <Image source={images.qrcode} style={styles.qrIcon} />
      </View>

      <WhiteBackground height={isTablet ? scaleHeight(1033) : scaleHeight(811)}>
        <View style={{ height: scaleHeight(11) }} />
        <PullBar width={scaleWidth(62.5)} height={scaleHeight(6)} />

        <View style={styles.walletCard}>
          <View style={styles.userSection}>
            <View style={styles.userInfo}>
              <ProfilePic width={46} height={46} borderWidth={2} />
              <Text style={styles.userName}>Jon Smith</Text>
            </View>
            <View style={styles.dropdownContainer}>
              <Image source={images.down} style={styles.dropdownIcon} />
            </View>
          </View>
          
          <View style={styles.divider} />

          <View style={styles.addressSection}>
            <View style={styles.addressInfo}>
              <Text style={styles.addressLabel}>Address :</Text>
              <Text style={styles.addressValue}>0xb96cc255470............599</Text>
            </View>
            <View style={styles.topupContainer}>
              <Image source={images.topup} style={styles.topupIcon} />
              <Text style={styles.topupText}>Top Up</Text>
            </View>
          </View>
        </View>

        <View style={styles.tabsContainer}>
          <Tabs />
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalAmount}>${totalSum.toLocaleString()}</Text>
        </View>

        <View style={styles.tokensContainer}>
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Tokens onTotalSumChange={setTotalSum} />
          </ScrollView>
        </View>
      </WhiteBackground>
    </BlackBackground>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(14),
  },
  headerTitle: {
    color: '#D9FD00',
    fontSize: 16,
  },
  qrIcon: {
    width: scaleWidth(32),
    height: scaleHeight(32),
    tintColor: '#D9FD00',
    resizeMode: 'contain',
  },
  walletCard: {
    flexDirection: 'column',
    borderColor: 'rgba(60,60,67,0.29)',
    borderWidth: 1,
    width: scaleWidth(366),
    alignSelf: 'center',
    paddingHorizontal: scaleWidth(25),
    borderRadius: 15,
    marginTop: scaleHeight(49),
  },
  userSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scaleHeight(8),
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(10),
  },
  userName: {
    fontSize: 16,
    color: '#000',
  },
  dropdownContainer: {
    width: scaleWidth(25),
    alignItems: 'center',
  },
  dropdownIcon: {
    width: scaleWidth(12),
    height: scaleHeight(12),
    resizeMode: 'contain',
  },
  divider: {
    borderBottomColor: 'rgba(60,60,67,0.29)',
    borderBottomWidth: 1,
    width: scaleWidth(316),
  },
  addressSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scaleHeight(13),
  },
  addressInfo: {
    flexDirection: 'row',
    gap: scaleWidth(10),
    alignItems: 'center',
  },
  addressLabel: {
    fontSize: 14,
    color: '#000',
  },
  addressValue: {
    fontSize: 11,
    color: 'rgba(60,60,67,0.29)',
  },
  topupContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  topupIcon: {
    width: scaleWidth(18),
    height: scaleHeight(18),
    resizeMode: 'contain',
  },
  topupText: {
    fontSize: scaleHeight(8),
    color: '#000',
  },
  tabsContainer: {
    marginTop: scaleHeight(28),
  },
  totalContainer: {
    marginTop: scaleHeight(17),
    marginLeft: scaleWidth(32),
  },
  totalAmount: {
    fontSize: isTablet ? 27 : 20,
    fontWeight: 'bold',
    color: '#000',
  },
  tokensContainer: {
    marginTop: scaleHeight(30),
    marginLeft: scaleWidth(18),
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 110,
  },
});

export default WalletScreen
