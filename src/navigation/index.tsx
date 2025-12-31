import React from 'react';
import AppNavigator from './AppNavigator';

/**
 * RootNavigator
 * 
 * Main entry point for navigation.
 * Currently shows the full authenticated app.
 * 
 * TODO: Add authentication context when ready
 * Once you have auth context, wrap this with a check:
 * 
 * const { user } = useAuthContext();
 * if (user == null) {
 *   return <AuthStack />;
 * }
 * return <AppNavigator />;
 */
const RootNavigator = () => {
  // For now, show the full app
  // Authentication will be added later
  return <AppNavigator />;
};

export default RootNavigator;
