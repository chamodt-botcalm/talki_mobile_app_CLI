// Welcome Page.tsx
// ✅ Correct API-integrated version for your CURRENT backend (talki_backend-main)
// Backend route: POST http://<IP>:3001/newUser
//
// Flows:
// 1) Connect Wallet (AppKit) -> auto calls /newUser when connected
// 2) Create Wallet (talki)   -> calls /newUser with walletId=null (backend creates Sepolia account)
// 3) Import Account          -> privateKey -> derive address locally -> calls /newUser with walletId=<derived>

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

import { useAppKit, useAccount, useWalletInfo } from '@reown/appkit-react-native';

import { images } from '../constants/images';
import { screenMap } from '../constants/screenMap';
import Typography from '../components/reusable/Text';
import Button from '../components/reusable/Button';

import { newUser } from '../api/user';
import { saveUser } from '../storage/userStorage';

import { privateKeyToAccount } from 'viem/accounts';

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

function normalizePrivateKey(input: string): { pk: `0x${string}` | null; error?: string } {
  const raw = input.trim();
  const cleaned = raw.replace(/\s+/g, ''); // remove spaces/newlines

  const with0x = cleaned.startsWith('0x') ? cleaned : `0x${cleaned}`;

  if (!/^0x[0-9a-fA-F]{64}$/.test(with0x)) {
    return {
      pk: null,
      error:
        'Invalid private key format.\nIt must be exactly 64 hex characters (with or without 0x).',
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
    return {
      address: null,
      error: e?.message || 'Could not derive address from this private key.',
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
  const [submitting, setSubmitting] = useState(false);

  const [dimensions, setDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  // Avoid duplicate register calls
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
    return name.toLowerCase(); // keep consistent in backend lookups
  }, [walletInfo]);

  /** =========================
   *  Backend register function
   *  ========================= */
  const registerUser = async (payload: { walletId: string | null; walletName: string }) => {
    if (submitting) return;

    const key = `${payload.walletName}:${payload.walletId ?? 'null'}`;

    // block duplicates (especially after AppKit connect)
    if (lastRegisteredKeyRef.current === key) return;

    try {
      setSubmitting(true);

      const fcmToken = await getFcmTokenSafe();

      const user = await newUser({
        walletId: payload.walletId,
        walletName: payload.walletName,
        token: fcmToken,
      });

      lastRegisteredKeyRef.current = key;

      await saveUser(user);

      // Continue to profile setup screen (same as your original UI behavior)
      navigation.navigate(screenMap.setProfile);
    } catch (e: any) {
      lastRegisteredKeyRef.current = '';
      Alert.alert('Error', e?.message || 'Failed to connect to backend');
    } finally {
      setSubmitting(false);
    }
  };

  /** ✅ Auto-register after AppKit connect (Connect Wallet flow) */
  useEffect(() => {
    if (!isConnected) return;
    if (!address) return;

    // If user is currently in Create/Import UI, don't auto-navigate away
    if (showCreateWallet || showImportAccount) return;

    registerUser({ walletId: address, walletName: connectedWalletName });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address, connectedWalletName, showCreateWallet, showImportAccount]);

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

  // Create Wallet = backend creates Sepolia wallet when walletId is null AND walletName === "talki"
  const handleCreateTalkiWallet = async () => {
    await registerUser({ walletId: null, walletName: 'talki' });
  };

  const handleImportFromPrivateKey = async () => {
    const pk = privateKey.trim();
    if (!pk) {
      Alert.alert('Missing', 'Please enter your private key');
      return;
    }

    const { address: derived, error } = deriveAddressFromPrivateKey(pk);
    if (!derived) {
      Alert.alert('Import failed', error || 'Could not derive address.');
      return;
    }

    await registerUser({ walletId: derived, walletName: 'talki' });
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
