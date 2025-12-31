export type ScreenMapType = {
  // Auth Stack
  welcome: string;
  connectWallet: string;
  walletConnect: string;
  import: string;

  // Profile
  userAccount: string;
  setProfile: string;
  editProfile: string;

  // Main Navigation
  mainTabs: string;

  // Tab Screens
  wallet: string;
  chat: string;
  chatScreen: string;
  contacts: string;
  settings: string;
  callScreen: string;

  // Message Stack
  messageStack: string;
  messageScreen: string;
  infoScreen: string;
  infoEdit: string;

  // Call Stack
  call: string;
  incall: string;
  callHistory: string;
  videoRinging: string;
  audioRinging: string;
  incomingVideoCall: string;
  incomingAudioCall: string;
  audioCallAnswer: string;
  videoCallAnswer: string;

  // Settings Sub-screens
  settingsInfo: string;
  sticker: string;
  notifications: string;
  privacy: string;
  storage: string;
  appearance: string;
  language: string;

  // Contact Management
  viewContact: string;
  blocked: string;

  // Wallet
  deposit: string;
  saved: string;
};

export const screenMap: ScreenMapType = {
  // Auth Stack
  welcome: 'Welcome',
  connectWallet: 'ConnectWallet',
  walletConnect: 'ConnectWallet', // Alias for connectWallet
  import: 'Import',

  // Profile
  userAccount: 'UserAccount',
  setProfile: 'SetProfile',
  editProfile: 'EditProfile',

  // Main Navigation
  mainTabs: 'MainTabs',

  // Tab Screens
  wallet: 'Wallet',
  chat: 'Chat',
  chatScreen: 'ChatScreen',
  contacts: 'Contacts',
  settings: 'Settings',
  callScreen: 'CallScreen',

  // Message Stack
  messageStack: 'MessageStack',
  messageScreen: 'MessageScreen',
  infoScreen: 'InfoScreen',
  infoEdit: 'InfoEdit',

  // Call Stack
  call: 'Call',
  incall: 'InCall',
  callHistory: 'CallHistory',
  videoRinging: 'VideoRinging',
  audioRinging: 'AudioRinging',
  incomingVideoCall: 'IncomingVideoCall',
  incomingAudioCall: 'IncomingAudioCall',
  audioCallAnswer: 'AudioCallAnswer',
  videoCallAnswer: 'VideoCallAnswer',

  // Settings Sub-screens
  settingsInfo: 'SettingsInfo',
  sticker: 'Sticker',
  notifications: 'Notifications',
  privacy: 'Privacy',
  storage: 'Storage',
  appearance: 'Appearance',
  language: 'Language',

  // Contact Management
  viewContact: 'ViewContact',
  blocked: 'BlockedUsers',

  // Wallet
  deposit: 'Deposit',
  saved: 'SavedMessages',
};