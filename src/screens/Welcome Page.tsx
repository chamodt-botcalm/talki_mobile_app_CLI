// Welcome Page.tsx
// ✅ FIX: Import checks BOTH username + private key (must match DB)
// ✅ FIX: If encrypted key (U2FsdGVkX1...) we force-fetch talki user via /newUser
// ✅ FIX: Prevents picking wrong "imported" duplicate user
// ✅ On success -> navigation.navigate(screenMap.mainTabs)

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  BackHandler,
  Dimensions,
  Image,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useAppKit, useAccount, useWalletInfo } from '@reown/appkit-react-native';

import { images } from '../constants/images';
import { screenMap } from '../constants/screenMap';
import Typography from '../components/reusable/Text';
import Button from '../components/reusable/Button';

import { saveUser } from '../storage/userStorage';
import { useAppDispatch } from '../store/hooks';
import { setUser } from '../store/userSlice';

import { privateKeyToAccount } from 'viem/accounts';

import CryptoJS from 'crypto-js';
// If TS error:
// import * as CryptoJS from 'crypto-js';

type RootStackParamList = {
  [key: string]: undefined;
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

async function getFcmTokenSafe(): Promise<string | null> {
  try {
    const messaging = require('@react-native-firebase/messaging').default;
    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) return null;

    const token = await messaging().getToken();
    return token || null;
  } catch {
    return null;
  }
}

/** =========================
 *  PK Helpers
 *  ========================= */
function looksEncryptedPk(input: string) {
  const s = (input || '').trim().replace(/\s+/g, '');
  return s.startsWith('U2FsdGVkX1');
}

function tryDecryptPkIfNeeded(input: string): { value: string; error?: string } {
  const cleaned = (input || '').trim().replace(/\s+/g, '');

  if (!looksEncryptedPk(cleaned)) return { value: cleaned };

  try {
    const bytes = CryptoJS.AES.decrypt(cleaned, 'talkiekey');
    const plain = bytes.toString(CryptoJS.enc.Utf8);

    if (!plain) {
      return {
        value: '',
        error: 'Import failed.\nEncrypted key could not be decrypted (wrong key or corrupted text).',
      };
    }

    return { value: plain.trim() };
  } catch (e: any) {
    return {
      value: '',
      error: e?.message || 'Import failed.\nCould not decrypt encrypted private key.',
    };
  }
}

function normalizePrivateKey(input: string): { pk: `0x${string}` | null; error?: string } {
  const dec = tryDecryptPkIfNeeded(input);
  if (!dec.value) return { pk: null, error: dec.error || 'Invalid private key.' };

  const raw = dec.value.trim().replace(/\s+/g, '');
  const with0x = raw.startsWith('0x') ? raw : `0x${raw}`;

  if (!/^0x[0-9a-fA-F]{64}$/.test(with0x)) {
    return {
      pk: null,
      error: 'Invalid private key format.\nIt must be exactly 64 hex characters (with or without 0x).',
    };
  }

  return { pk: with0x as `0x${string}` };
}

function deriveAddressFromPrivateKey(privateKey: string): { address: string | null; error?: string } {
  const normalized = normalizePrivateKey(privateKey);
  if (!normalized.pk) return { address: null, error: normalized.error };

  try {
    const account = privateKeyToAccount(normalized.pk);
    return { address: account.address };
  } catch (e: any) {
    return { address: null, error: e?.message || 'Could not derive address from this private key.' };
  }
}

/** =========================
 *  API response unwrap
 *  ========================= */
function unwrapUser(resp: any) {
  if (!resp) return null;
  if (resp?.data?.user) return resp.data.user;
  if (resp?.user) return resp.user;
  return resp;
}

/** username match */
function isUsernameMatch(typed: string, user: any) {
  const t = typed.trim().toLowerCase();
  const db = String(user?.username || '').trim().toLowerCase();
  return !!t && !!db && db === t;
}

/** MUST verify DB privateKey too */
function verifyDbPrivateKeyMatch(typedPk: string, user: any): { ok: boolean; error?: string } {
  if (!user) return { ok: false, error: 'Account not found.' };

  if (!user.privateKey) {
    return { ok: false, error: 'This account has no privateKey stored in DB. Import not allowed.' };
  }

  const typedNorm = normalizePrivateKey(typedPk);
  if (!typedNorm.pk) return { ok: false, error: typedNorm.error };

  const dbNorm = normalizePrivateKey(String(user.privateKey));
  if (!dbNorm.pk) return { ok: false, error: 'DB private key decrypt failed / invalid.' };

  if (typedNorm.pk.toLowerCase() !== dbNorm.pk.toLowerCase()) {
    return { ok: false, error: 'Private key does not match this account.' };
  }

  return { ok: true };
}

/** Fetch correct talki user via /newUser when encrypted key used */
async function fetchTalkiUserByNewUser(address: string) {
  try {
    const token = await getFcmTokenSafe();
    const { newUser } = require('../api/user');
    const resp = await newUser({
      walletId: address,
      walletName: 'talki',
      token: token,
    });
    return unwrapUser(resp);
  } catch {
    return null;
  }
}

export default function WelcomePage() {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();

  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const { walletInfo } = useWalletInfo();

  const [showCreateWallet, setShowCreateWallet] = useState(false);
  const [showImportAccount, setShowImportAccount] = useState(false);

  const [username, setUsername] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  const [submitting, setSubmitting] = useState(false);

  const [dimensions, setDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  const lastRegisteredKeyRef = useRef<string>('');

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ width: window.width, height: window.height });
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

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [showCreateWallet, showImportAccount]);

  /** =========================
   * Responsive Scaling
   * ========================= */
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

  const scale = Math.min(dimensions.width / currentBaseWidth, dimensions.height / currentBaseHeight);

  const connectedWalletName = useMemo(() => {
    const name = (walletInfo?.name || walletInfo?.id || 'walletconnect').toString();
    return name.toLowerCase();
  }, [walletInfo]);

  const handleWalletCreation = async (payload: { walletId: string | null; walletName: string }) => {
    if (submitting) return;

    const key = `${payload.walletName}:${payload.walletId ?? 'null'}`;
    if (lastRegisteredKeyRef.current === key) return;

    try {
      setSubmitting(true);
      lastRegisteredKeyRef.current = key;

      const fcmToken = await getFcmTokenSafe();

      const tempUserData = {
        walletAddress: payload.walletId,
        walletName: payload.walletName,
        fcmtoken: fcmToken,
      };
      await AsyncStorage.setItem('talki:tempUser', JSON.stringify(tempUserData));

      navigation.navigate(screenMap.setProfile);
    } catch (e: any) {
      lastRegisteredKeyRef.current = '';
      Alert.alert('Error', e?.message || 'Failed to prepare wallet');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isConnected) return;
    if (!address) return;
    if (showCreateWallet || showImportAccount) return;

    handleWalletCreation({ walletId: address, walletName: connectedWalletName });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address, connectedWalletName, showCreateWallet, showImportAccount]);

  const handleConnectWallet = () => {
    try {
      open({ view: 'Connect' });
    } catch {
      navigation.navigate(screenMap.connectWallet);
    }
  };

  const handleCreateTalkiWallet = async () => {
    await handleWalletCreation({ walletId: null, walletName: 'talki' });
  };

  /** ✅ IMPORT FIXED */
  const handleImportFromPrivateKey = async () => {
    const u = username.trim();
    const pk = privateKey.trim();

    if (!u) return Alert.alert('Missing', 'Please enter your username');
    if (u.length < 3) return Alert.alert('Invalid username', 'Username must be at least 3 characters');

    if (!pk) return Alert.alert('Missing', 'Please enter your private key');

    const { address: derived, error } = deriveAddressFromPrivateKey(pk);
    if (!derived) return Alert.alert('Import failed', error || 'Could not derive address.');

    try {
      setSubmitting(true);

      const { checkUserExists } = require('../api/user');

      // 1) default lookup (may return wrong "imported" duplicate)
      let dbUser = unwrapUser(await checkUserExists(derived));

      // 2) if encrypted PK -> force-get talki user using /newUser
      if (looksEncryptedPk(pk)) {
        const talkiUser = await fetchTalkiUserByNewUser(derived);
        if (talkiUser) dbUser = talkiUser;
      }

      if (!dbUser) {
        Alert.alert('Account Not Found', 'This wallet address does not exist in our database.');
        return;
      }

      // username must match
      if (!isUsernameMatch(u, dbUser)) {
        Alert.alert('Import failed', 'Username does not match this wallet account.');
        return;
      }

      // private key must match DB privateKey
      const pkCheck = verifyDbPrivateKeyMatch(pk, dbUser);
      if (!pkCheck.ok) {
        Alert.alert('Import failed', pkCheck.error || 'Private key mismatch.');
        return;
      }

      await saveUser(dbUser);
      dispatch(setUser(dbUser));

      // ✅ go straight to mainTabs
      navigation.navigate(screenMap.mainTabs);
    } catch (e: any) {
      Alert.alert('Error', e?.message || 'Failed to import account');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={isLandscape ? images.groupp2 : images.groupp}
        style={[
          styles.topImage,
          {
            bottom: isTablet ? scaleHeight(600) : scaleHeight(422),
            right: isTablet ? scaleWidth(430) : scaleWidth(123),
          },
        ]}
      />

      <View style={styles.bottomSheet}>
        <Image
          source={isTablet ? images.rockk2 : images.rockk}
          style={[styles.rockImage, { bottom: isTablet ? scaleHeight(380) : scaleHeight(308) }]}
        />

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
          <Typography green bold style={{ fontSize: isTablet ? 170 * scale : 141 * scale }}>
            talk
            <Typography green bold style={{ fontSize: isTablet ? 277 * scale : 229 * scale }}>
              i
            </Typography>
          </Typography>
        </View>

        <Typography
          center
          bold
          s40
          style={{
            position: 'absolute',
            top: isTablet ? scaleHeight(134) : scaleHeight(70),
            left: 0,
            right: 0,
            fontSize: scale * 40,
          }}
        >
          Welcome
        </Typography>

        {showImportAccount && (
          <View
            style={[
              styles.formWrapper,
              {
                top: isTablet ? scaleHeight(230) : scaleHeight(169),
                paddingHorizontal: isTablet ? scaleWidth(172) : scaleWidth(29.5),
              },
            ]}
          >
            <Typography grey s14 style={{ fontSize: scale * 14, marginBottom: 6 }}>
              User Name
            </Typography>

            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your user name"
              placeholderTextColor="#A4A4A4"
              autoCapitalize="none"
              autoCorrect={false}
              style={[
                styles.input,
                {
                  paddingVertical: scaleHeight(12),
                  paddingLeft: scaleWidth(12),
                  width: isTablet ? scaleWidth(490) : scaleWidth(371),
                  marginBottom: isTablet ? scaleHeight(20) : scaleHeight(20),
                },
              ]}
            />

            <Typography grey s14 style={{ fontSize: scale * 14, marginBottom: 6 }}>
              Private key
            </Typography>

            <TextInput
              value={privateKey}
              onChangeText={setPrivateKey}
              placeholder="0x... or encrypted U2FsdGVkX1..."
              placeholderTextColor="#A4A4A4"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              style={[
                styles.input,
                {
                  paddingVertical: scaleHeight(12),
                  paddingLeft: scaleWidth(12),
                  width: isTablet ? scaleWidth(490) : scaleWidth(371),
                  marginBottom: isTablet ? scaleHeight(30) : scaleHeight(30),
                },
              ]}
            />

            <Button
              width={isTablet ? scaleWidth(490) : scaleWidth(371)}
              height={isTablet ? scaleHeight(73) : scaleHeight(60)}
              fontSize={scale * 16}
              onPress={handleImportFromPrivateKey}
              disabled={submitting}
            >
              {submitting ? 'Please wait...' : 'Import'}
            </Button>
          </View>
        )}

        {showCreateWallet && (
          <>
            <View style={[styles.cameraWrapper, { top: isTablet ? scaleHeight(255) : scaleHeight(143) }]}>
              <Image source={images.camera} />
            </View>

            <View
              style={[
                styles.formWrapper,
                {
                  top: isTablet ? scaleHeight(398) : scaleHeight(229),
                  paddingHorizontal: isTablet ? scaleWidth(172) : scaleWidth(29.5),
                },
              ]}
            >
              <Typography grey s14 style={{ fontSize: scale * 14, marginBottom: 6 }}>
                Wallet Address
              </Typography>

              <TextInput
                value={'0x123'}
                placeholderTextColor="#A4A4A4"
                editable={false}
                style={[
                  styles.input,
                  {
                    paddingVertical: scaleHeight(12),
                    paddingLeft: scaleWidth(12),
                    width: isTablet ? scaleWidth(490) : scaleWidth(371),
                    marginBottom: scaleHeight(20),
                  },
                ]}
              />

              <Button
                width={isTablet ? scaleWidth(490) : scaleWidth(371)}
                height={scaleHeight(60)}
                fontSize={scale * 16}
                onPress={handleCreateTalkiWallet}
                disabled={submitting}
              >
                {submitting ? 'Creating...' : 'Create Wallet'}
              </Button>
            </View>
          </>
        )}

        {!showCreateWallet && !showImportAccount && (
          <>
            <Button
              style={{
                position: 'absolute',
                top: isTablet ? scaleHeight(403) : scaleHeight(181),
                left: (dimensions.width - (isTablet ? scaleWidth(490) : scaleWidth(371))) / 2,
              }}
              width={isTablet ? scaleWidth(490) : scaleWidth(371)}
              height={scaleHeight(60)}
              fontSize={scale * 16}
              onPress={handleConnectWallet}
              disabled={submitting}
            >
              {submitting ? 'Please wait...' : 'Connect Wallet'}
            </Button>

            <View style={[styles.row, { top: isTablet ? scaleHeight(480) : scaleHeight(253) }]}>
              <Button
                outline
                width={isTablet ? scaleWidth(238) : scaleWidth(180)}
                height={scaleHeight(60)}
                fontSize={scale * 16}
                onPress={() => setShowCreateWallet(true)}
                disabled={submitting}
              >
                Create Wallet
              </Button>

              <Button
                outline
                width={isTablet ? scaleWidth(238) : scaleWidth(180)}
                height={scaleHeight(60)}
                fontSize={scale * 16}
                onPress={() => setShowImportAccount(true)}
                disabled={submitting}
              >
                Import Account
              </Button>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#232323', overflow: 'hidden' },
  topImage: { position: 'absolute' },
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
  rockImage: { position: 'absolute' },
  logoWrapper: { position: 'absolute', width: '100%' },
  formWrapper: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  input: {
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EEE7E7',
    fontFamily: 'Inter',
    color: '#111',
  },
  cameraWrapper: { position: 'absolute', width: '100%', alignItems: 'center' },
  row: { position: 'absolute', flexDirection: 'row', justifyContent: 'center', width: '100%', gap: 12 },
});
