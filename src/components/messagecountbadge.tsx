// MessageCountBadge.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useMessageStore } from './MessageList';

const MessageCountBadge = () => {
  const total = useMessageStore((state: any) => state.totalMessages);
  return (
    <View
      style={{
        backgroundColor: '#D9FD00',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 10,
          fontWeight: '600',
          color: 'black',
        }}
      >
        {total}
      </Text>
    </View>
  );
};

export default MessageCountBadge;
