import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenMap } from '../constants/screenMap';

// Auth Screens
import WelcomeScreen from '../screens/Welcome Page';
import ConnectWalletScreen from '../screens/Connect Wallet';

// Context
import useAuthContext from '../context/useAuthContext';

// Main App Navigator
import AppNavigator from './AppNavigator';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { user } = useAuthContext();

  // If no user is authenticated, show only welcome and wallet connect screens
  if (user == null) {
    return (
      <Stack.Navigator
        initialRouteName={screenMap.welcome}
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
        }}
      >
        <Stack.Screen
          name={screenMap.welcome}
          component={WelcomeScreen}
          options={{ animationEnabled: false }}
        />
        <Stack.Screen
          name={screenMap.connectWallet}
          component={ConnectWalletScreen}
          options={{ animationEnabled: true }}
        />
        <Stack.Screen
          name={screenMap.import}
          component={ConnectWalletScreen}
          options={{ animationEnabled: true }}
        />
      </Stack.Navigator>
    );
  }

  // User is authenticated, show full app with all screens
  return <AppNavigator />;
};

export default RootNavigator;