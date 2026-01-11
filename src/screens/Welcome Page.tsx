// WelcomePage.tsx
// ✅ Full API-integrated version (fixed Import Account address-derivation)
// - Connect Wallet (Reown AppKit) -> calls POST /newUser
// - Create Wallet (talki) -> calls POST /newUser with walletId=null
// - Import Account (private key -> derive address) -> calls POST /newUser
//
// NOTE: Import flow sends ONLY the derived address to your backend (NOT the private key).

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
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
  useAppKit,
  useAccount,
  useWalletInfo,
} from '@reown/appkit-react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { images } from '../constants/images';
import { screenMap } from '../constants/screenMap';
import Typography from '../components/reusable/Text';
import Button from '../components/reusable/Button';

type RootStackParamList = {
  [key: string]: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

/** =========================
 *  API CONFIG
 *  ========================= */
const API_BASE_URL = 'http://10.226.59.223:3001'; // ✅ your backend IP
const NEW_USER_PATH = '/newUser'; // change to '/api/newUser' if needed

const STORAGE_USER_KEY = 'talki:user';

type NewUserBody = {
  walletId: string | null;
  walletName: string;
  token: string | null;
};

type BackendUser = {
  _id: string;
  walletName: string;
  walletAddress: string;
  firstname?: string;
  lastname?: string;
  username?: string;
  image?: string;
  bio?: string;
  fcmtoken?: string;
};

type NewUserResponse = {
  status: number;
  msg?: string;
  message?: string;
  user?: BackendUser;
};

async function postNewUser(body: NewUserBody): Promise<BackendUser> {
  const res = await fetch(`${API_BASE_URL}${NEW_USER_PATH}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  let data: NewUserResponse | null = null;
  try {
    data = (await res.json()) as NewUserResponse;
  } catch {
    // ignore
  }

  // backend uses json.status = 200
  if (!data || data.status !== 200 || !data.user) {
    throw new Error(data?.message || data?.msg || `Request failed (${res.status})`);
  }

  return data.user;
}

async function saveUserToStorage(user: BackendUser) {
  await AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
}

/**
 * Safe FCM token getter:
 * - Works if @react-native-firebase/messaging exists
 * - Returns null if not installed
 */
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
 *  IMPORT (PRIVATE KEY) FIX
 *  ========================= */
function normalizePrivateKey(input: string): { pk: string; error?: string } {
  const raw = input.trim();

  // remove spaces/newlines that sometimes come from copy-paste
  const cleaned = raw.replace(/\s+/g, '');

  // add 0x if missing
  const pk = cleaned.startsWith('0x') ? cleaned : `0x${cleaned}`;

  // must be 0x + 64 hex chars
  if (!/^0x[0-9a-fA-F]{64}$/.test(pk)) {
    return {
      pk,
      error:
        'Invalid private key format.\nIt must be 64 hex characters (with or without 0x).',
    };
  }

  return { pk };
}

async function deriveAddressFromPrivateKey(
  privateKey: string
): Promise<{ address: string | null; error: string | null }> {
  try {
    const normalized = normalizePrivateKey(privateKey);
    if (normalized.error) return { address: null, error: normalized.error };

    const ethersPkg = require('ethers');

    // ethers v5: require('ethers').Wallet
    // ethers v6: sometimes Wallet is under require('ethers').Wallet or require('ethers').ethers.Wallet
    const WalletCtor = ethersPkg?.Wallet ?? ethersPkg?.ethers?.Wallet;

    if (!WalletCtor) {
      return {
        address: null,
        error:
          'Ethers Wallet export not found.\nMake sure "ethers" is installed in the MOBILE project.',
      };
    }

    const wallet = new WalletCtor(normalized.pk);
    const addr = wallet?.address;

    if (!addr || typeof addr !== 'string') {
      return { address: null, error: 'Could not derive address from this key.' };
    }

    return { address: addr, error: null };
  } catch (e: any) {
    // show real error in Metro logs
    console.log('deriveAddressFromPrivateKey error:', e?.message || e);
    return {
      address: null,
      error:
        e?.message ||
        'Derivation failed (check Metro logs). Install ethers or fix polyfills.',
    };
  }
}

export default function WelcomePage() {
  const navigation = useNavigation<NavigationProp>();

  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const { walletInfo } = useWalletInfo();

  const [showCreateWallet, setShowCreateWallet] = useState(false);
  const [showImportAccount, setShowImportAccount] = useState(false);

  const [privateKey, setPrivateKey] = useState('');
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  const [dimensions, setDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  // Prevent duplicate /newUser calls when state changes
  const lastRegisteredKeyRef = useRef<string>('');

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
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [showCreateWallet, showImportAccount]);

  /** =========================
   *  Responsive Scaling
   *  ========================= */
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

  const connectedWalletName = useMemo(() => {
    const name = (walletInfo?.name || walletInfo?.id || 'walletconnect').toString();
    return name.toLowerCase();
  }, [walletInfo]);

  /** =========================
   *  Core: register user on backend
   *  ========================= */
  const registerUser = async (payload: { walletId: string | null; walletName: string }) => {
    if (submitting) return;

    const key = `${payload.walletName}:${payload.walletId ?? 'null'}`;
    if (lastRegisteredKeyRef.current === key) return;

    try {
      setSubmitting(true);

      const fcmToken = await getFcmTokenSafe();

      const user = await postNewUser({
        walletId: payload.walletId,
        walletName: payload.walletName,
        token: fcmToken,
      });

      lastRegisteredKeyRef.current = key;

      await saveUserToStorage(user);
      setWalletAddress(user.walletAddress);

      navigation.navigate(screenMap.setProfile);
    } catch (e: any) {
      Alert.alert('Error', e?.message || 'Something went wrong');
      lastRegisteredKeyRef.current = '';
    } finally {
      setSubmitting(false);
    }
  };

  /** ✅ Auto-register after successful AppKit connection */
  useEffect(() => {
    if (!isConnected) return;
    if (!address) return;

    registerUser({ walletId: address, walletName: connectedWalletName });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address, connectedWalletName]);

  /** =========================
   *  Handlers
   *  ========================= */
  const handleConnectWallet = () => {
    try {
      open({ view: 'Connect' });
    } catch {
      navigation.navigate(screenMap.connectWallet);
    }
  };

  const handleCreateTalkiWallet = async () => {
    await registerUser({ walletId: null, walletName: 'talki' });
  };

  const handleImportFromPrivateKey = async () => {
    const pk = privateKey.trim();
    if (!pk) {
      Alert.alert('Missing', 'Please enter your private key');
      return;
    }

    const result = await deriveAddressFromPrivateKey(pk);

    if (!result.address) {
      Alert.alert('Import failed', result.error || 'Could not derive address.');
      return;
    }

    await registerUser({ walletId: result.address, walletName: 'talki' });
  };

  /** =========================
   *  UI
   *  ========================= */
  return (
    <View style={styles.container}>
      {/* Top Background Image */}
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

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        {/* Floating rock image */}
        <Image
          source={isTablet ? images.rockk2 : images.rockk}
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
          <Typography green bold style={{ fontSize: isTablet ? 170 * scale : 141 * scale }}>
            talk
            <Typography green bold style={{ fontSize: isTablet ? 277 * scale : 229 * scale }}>
              i
            </Typography>
          </Typography>
        </View>

        {/* Welcome Text */}
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

        {/* ================== IMPORT ACCOUNT ================== */}
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
              Private key
            </Typography>

            <TextInput
              value={privateKey}
              onChangeText={setPrivateKey}
              placeholder="0x..."
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
                  marginBottom: isTablet ? scaleHeight(153) : scaleHeight(80),
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
                  paddingHorizontal: isTablet ? scaleWidth(172) : scaleWidth(29.5),
                },
              ]}
            >
              <Typography grey s14 style={{ fontSize: scale * 14, marginBottom: 6 }}>
                Wallet Address
              </Typography>

              <TextInput
                value={walletAddress}
                placeholder="Will be generated..."
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

        {/* ================== DEFAULT BUTTONS ================== */}
        {!showCreateWallet && !showImportAccount && (
          <>
            <Button
              style={{
                position: 'absolute',
                top: isTablet ? scaleHeight(403) : scaleHeight(181),
                left:
                  (dimensions.width - (isTablet ? scaleWidth(490) : scaleWidth(371))) / 2,
              }}
              width={isTablet ? scaleWidth(490) : scaleWidth(371)}
              height={scaleHeight(60)}
              fontSize={scale * 16}
              onPress={handleConnectWallet}
              disabled={submitting}
            >
              {submitting ? 'Please wait...' : 'Connect Wallet'}
            </Button>

            <View
              style={[
                styles.row,
                {
                  top: isTablet ? scaleHeight(480) : scaleHeight(253),
                },
              ]}
            >
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
  container: {
    flex: 1,
    backgroundColor: '#232323',
    overflow: 'hidden',
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
});
