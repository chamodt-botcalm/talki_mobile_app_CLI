const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = {
  resolver: {
    extraNodeModules: {
      crypto: require.resolve('react-native-get-random-values'),
    },
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs', 'json'],
    unstable_enablePackageExports: true,
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
