import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import MessageCountBadge from './messagecountbadge';
import { images } from '../constants/images';

const MessageBottomTab = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { width, height } = useWindowDimensions();
  const dimensions = { width, height };

  const [showAttachmentModal, setShowAttachmentModal] = useState(false);

  // Base dimensions
  const BASE_WIDTH = 430;
  const BASE_HEIGHT = 932;
  const TABLET_WIDTH = 834;
  const TABLET_HEIGHT = 1194;

  const isTablet = dimensions.width >= 600 || dimensions.height >= 1000;
  const currentBaseWidth = isTablet ? TABLET_WIDTH : BASE_WIDTH;
  const currentBaseHeight = isTablet ? TABLET_HEIGHT : BASE_HEIGHT;

  const scaleWidth = (size: number) => (dimensions.width / currentBaseWidth) * size;
  const scaleHeight = (size: number) => (dimensions.height / currentBaseHeight) * size;

  const tabItems = [
    { route: 'Wallet', icon: images.wallet, name: 'Wallet' },
    { route: 'ChatScreen', icon: images.communications, iconn: images.num17, name: 'Chats' },
    { route: 'Contact', icon: images.user, name: 'Contacts' },
    { route: 'Settings', icon: images.setting, name: 'Settings' },
  ];

  // ---------------------------
  // Attachment Sheet Animation
  // ---------------------------
  const sheetProgress = useRef(new Animated.Value(0)).current;

  const TAB_BAR_HEIGHT = scaleHeight(90);
  const PANEL_BOTTOM_OFFSET = TAB_BAR_HEIGHT + scaleHeight(10); // tab bar එකට උඩින්

  const PANEL_WIDTH = useMemo(() => {
    // photo එක වගේ center panel width
    const w = isTablet ? Math.min(scaleWidth(420), dimensions.width * 0.75) : dimensions.width - scaleWidth(24);
    return Math.max(scaleWidth(320), w);
  }, [dimensions.width, isTablet]);

  const PANEL_HEIGHT = useMemo(() => {
    // photo එක වගේ compact
    return isTablet ? scaleHeight(520) : scaleHeight(470);
  }, [isTablet, dimensions.height]);

  const overlayOpacity = sheetProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.45],
  });

  const translateY = sheetProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [PANEL_HEIGHT + 60, 0],
  });

  const openSheet = () => {
    setShowAttachmentModal(true);
  };

  const closeSheet = () => {
    Animated.timing(sheetProgress, {
      toValue: 0,
      duration: 180,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) setShowAttachmentModal(false);
    });
  };

  useEffect(() => {
    if (showAttachmentModal) {
      sheetProgress.setValue(0);
      Animated.timing(sheetProgress, {
        toValue: 1,
        duration: 220,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    }
  }, [showAttachmentModal]);

  // ---------------------------
  // Mock “Recent Photos”
  // (ඇත්ත gallery images later replace කරන්න)
  // ---------------------------
  const mockPhotos = useMemo(
    () => Array.from({ length: 8 }).map((_, i) => ({ id: `p-${i}` })),
    []
  );

  // Grid sizing
  const GRID_GAP = scaleWidth(8);
  const GRID_PADDING = scaleWidth(12);
  const gridAreaWidth = PANEL_WIDTH - GRID_PADDING * 2;

  // 3 columns like screenshot
  const tileSize = Math.floor((gridAreaWidth - GRID_GAP * 2) / 3);

  // camera tile is 1x2
  const cameraTileStyle = {
    width: tileSize,
    height: tileSize * 2 + GRID_GAP,
    borderRadius: scaleWidth(10),
    backgroundColor: '#D9D9D9',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  const photoTileStyle = {
    width: tileSize,
    height: tileSize,
    borderRadius: scaleWidth(10),
    backgroundColor: '#C7C7C7',
    overflow: 'hidden' as const,
  };

  const ActionBtn = ({ label, emoji }: { label: string; emoji: string }) => (
    <TouchableOpacity style={{ alignItems: 'center', width: scaleWidth(54) }}>
      <View
        style={{
          width: scaleWidth(44),
          height: scaleWidth(44),
          borderRadius: 999,
          backgroundColor: '#111111',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: scaleWidth(18), color: '#fff' }}>{emoji}</Text>
      </View>
      <Text style={{ marginTop: scaleHeight(6), fontSize: scaleWidth(11), color: '#8E8E93' }}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const totalMessages = 0;

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#F6F5FA',
        borderTopColor: '#7A7A7A',
        borderTopWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scaleWidth(12),
        height: scaleHeight(90),
      }}
    >
      {/* First Column — Navigation Icons */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: scaleWidth(69),
          width: '50%',
        }}
      >
        {tabItems.map((item, index) => {
          const isFocused = state.index === index;
          return (
            <View
              key={index}
              style={{
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate(item.route as never)}
                style={{
                  backgroundColor: isFocused ? 'black' : 'transparent',
                  borderRadius: 30,
                  padding: scaleWidth(6),
                }}
              >
                <View style={{ position: 'relative' }}>
                  <Image
                    source={item.icon}
                    style={{
                      width: 27,
                      height: 27,
                      tintColor: isFocused ? 'white' : undefined,
                    }}
                  />
                  {item.iconn && totalMessages > 0 && (
                    <View style={{ position: 'absolute', top: -10, right: -10 }}>
                      <MessageCountBadge />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
              <Text>{item.name}</Text>
            </View>
          );
        })}
      </View>

      {/* Second Column — Message Input */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          marginLeft: scaleWidth(20),
        }}
      >
        <TouchableOpacity onPress={openSheet}>
          <Image
            source={images.attach}
            style={{
              width: scaleWidth(28),
              height: scaleHeight(28),
              tintColor: '#858E99',
              marginRight: scaleWidth(8),
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>

        <TextInput
          placeholder="Message"
          placeholderTextColor="#858E99"
          style={{
            flex: 1,
            paddingVertical: scaleHeight(6),
            borderColor: '#D1D1D6',
            borderWidth: 1,
            borderRadius: 20,
            paddingHorizontal: scaleWidth(12),
            fontSize: scaleWidth(14),
          }}
        />

        <Image
          source={images.microphone}
          style={{
            width: scaleWidth(30),
            height: scaleHeight(30),
            tintColor: '#858E99',
            marginLeft: scaleWidth(8),
            resizeMode: 'contain',
          }}
        />
      </View>

      {/* ---------------------------
          Attachment Modal (PHOTO-LIKE)
         --------------------------- */}
      <Modal
        visible={showAttachmentModal}
        transparent
        animationType="none"
        onRequestClose={closeSheet}
        presentationStyle="overFullScreen"
      >
        {/* Overlay */}
        <Pressable style={{ flex: 1 }} onPress={closeSheet}>
          <Animated.View style={{ flex: 1, backgroundColor: '#000', opacity: overlayOpacity }} />
        </Pressable>

        {/* Floating Panel */}
        <View
          pointerEvents="box-none"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: PANEL_BOTTOM_OFFSET,
            alignItems: 'center',
          }}
        >
          <Animated.View
            style={{
              width: PANEL_WIDTH,
              height: PANEL_HEIGHT,
              transform: [{ translateY }],
              backgroundColor: '#EDEDED',
              borderRadius: scaleWidth(16),
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <View
              style={{
                height: scaleHeight(44),
                backgroundColor: '#DCDCDC',
                paddingHorizontal: scaleWidth(14),
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity onPress={closeSheet}>
                <Text style={{ fontSize: scaleWidth(14), color: '#111' }}>Cancel</Text>
              </TouchableOpacity>

              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ fontSize: scaleWidth(14), color: '#111' }}>Recents ⌄</Text>
              </View>

              {/* right spacer to keep center title truly centered */}
              <View style={{ width: scaleWidth(60) }} />
            </View>

            {/* Grid */}
            <View style={{ flex: 1, padding: GRID_PADDING }}>
              <View style={{ flexDirection: 'row', gap: GRID_GAP }}>
                {/* Camera tile (1x2) */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={cameraTileStyle}
                  onPress={() => {
                    // TODO: open camera
                  }}
                >
                  <Text style={{ fontSize: scaleWidth(34) }}>📷</Text>
                </TouchableOpacity>

                {/* Right side photos (2 columns x 3 rows visually) */}
                <View style={{ flex: 1 }}>
                  {/* We’ll layout remaining tiles in 2 columns inside right area */}
                  <View style={{ flexDirection: 'row', gap: GRID_GAP }}>
                    <View style={{ gap: GRID_GAP }}>
                      {mockPhotos.slice(0, 3).map((p) => (
                        <TouchableOpacity key={p.id} style={photoTileStyle} />
                      ))}
                    </View>

                    <View style={{ gap: GRID_GAP }}>
                      {mockPhotos.slice(3, 6).map((p) => (
                        <TouchableOpacity key={p.id} style={photoTileStyle} />
                      ))}
                    </View>
                  </View>

                  {/* Bottom row (3 tiles like screenshot) */}
                  <View style={{ flexDirection: 'row', gap: GRID_GAP, marginTop: GRID_GAP }}>
                    {mockPhotos.slice(6, 8).map((p) => (
                      <TouchableOpacity key={p.id} style={photoTileStyle} />
                    ))}
                    <TouchableOpacity style={photoTileStyle} />
                  </View>
                </View>
              </View>
            </View>

            {/* Bottom Actions */}
            <View
              style={{
                paddingTop: scaleHeight(10),
                paddingBottom: scaleHeight(12),
                paddingHorizontal: scaleWidth(10),
                backgroundColor: '#2C2C2E',
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <ActionBtn label="Gallery" emoji="🖼️" />
                <ActionBtn label="Document" emoji="📄" />
                <ActionBtn label="Audio" emoji="🎧" />
                <ActionBtn label="Location" emoji="📍" />
                <ActionBtn label="Contact" emoji="👤" />
                <ActionBtn label="Poll" emoji="📊" />
                <ActionBtn label="Transfer" emoji="💸" />
              </View>
            </View>
          </Animated.View>

          {/* Small bottom pointer (optional) */}
          <View
            style={{
              width: 0,
              height: 0,
              borderLeftWidth: scaleWidth(10),
              borderRightWidth: scaleWidth(10),
              borderTopWidth: scaleWidth(12),
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderTopColor: '#EDEDED',
              marginTop: -1,
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default MessageBottomTab;
