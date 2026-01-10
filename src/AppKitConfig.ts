import "@walletconnect/react-native-compat";
import { createAppKit } from '@reown/appkit-react-native';
import { EthersAdapter } from '@reown/appkit-ethers-react-native';
import { storage } from './StorageUtil';
import { mainnet, polygon } from 'viem/chains';

import { DAPP_METADATA, FEATURED_WALLET_IDS, REOWN_PROJECT_ID } from './config/walletConfig';

const ethersAdapter = new EthersAdapter();

export const appKit = createAppKit({
  projectId: REOWN_PROJECT_ID,
  networks: [mainnet, polygon],
  defaultNetwork: mainnet,
  adapters: [ethersAdapter],
  storage,
  metadata: DAPP_METADATA,

  // Ensure MetaMask is visible on the first screen of the modal.
  featuredWalletIds: [...FEATURED_WALLET_IDS],
});