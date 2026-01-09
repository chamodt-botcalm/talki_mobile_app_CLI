import { createAppKit } from '@reown/appkit-react-native';

const projectId = 'a88a9497fe513efc0aeb527bf7a1faa8';

const metadata = {
  name: 'Talki',
  description: 'Talki Mobile App',
  url: 'https://talki.app',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: 'talki://',
  },
};

export const appKit = createAppKit({
  projectId,
  metadata,
});
