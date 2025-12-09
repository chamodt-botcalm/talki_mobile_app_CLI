import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Welcome: undefined;
  ConnectWallet: undefined;
  UserAccount: undefined;
  MainTabs: undefined;
  MessageStack: NavigatorScreenParams<MessageStackParamList>;
  SettingsInfo: undefined;
  Sticker: undefined;
  Notifications: undefined;
  Privacy: undefined;
  Storage: undefined;
  Apperance:undefined;
  Language: undefined;
  Deposite: undefined;
};

export type TabParamList = {
  Wallet: undefined;
  ChatScreen: undefined;
  Contact: undefined;
  Settings: undefined;
  CallScreen: undefined;
};

export type MessageStackParamList = {
  MessageScreen: undefined;
  InfoScreen: undefined;
  InfoEdit: undefined;
};