import "@walletconnect/react-native-compat";
import { createAppKit } from '@reown/appkit-react-native';
import { EthersAdapter } from '@reown/appkit-ethers-react-native';
import { storage } from './StorageUtil';
import { mainnet, polygon } from 'viem/chains';

const projectId = 'a88a9497fe513efc0aeb527bf7a1faa8';

const ethersAdapter = new EthersAdapter();

export const appKit = createAppKit({
  projectId,
  networks: [mainnet, polygon],
  defaultNetwork: mainnet,
  adapters: [ethersAdapter],
  storage,
  metadata: {
    name: 'Talki',
    description: 'Talki Mobile App',
    url: 'https://talki.app',
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
    redirect: {
      native: "talki://",
    },
  }
});