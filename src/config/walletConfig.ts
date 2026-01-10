/**
 * Wallet / AppKit configuration values.
 *
 * IMPORTANT:
 * Do NOT call `createAppKit()` in this file.
 * AppKit must be initialized exactly once (see `src/AppKitConfig.ts`).
 */
import type { Metadata } from '@reown/appkit-common-react-native';

export const REOWN_PROJECT_ID = 'a88a9497fe513efc0aeb527bf7a1faa8';

export const DAPP_METADATA: Metadata = {
  name: 'Talki',
  description: 'Talki Mobile App',
  url: 'https://talki.app',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: 'talki://',
    universal: 'https://talki.app',
  },
};

export const METAMASK_WALLET_ID =
  'c57ca95b47569778a828d19178114f2db125b25b778adf5cba72bd778e231769';

export const FEATURED_WALLET_IDS = [METAMASK_WALLET_ID] as const;
