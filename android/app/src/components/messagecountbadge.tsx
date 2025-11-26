import { View, Text } from 'react-native';
import React from 'react';

const MessageCountBadge = ({ totalMessages = 0 }) => {

  return (
    <View style={{
      backgroundColor: '#D9FD00',
      width: 20,
      height: 20,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Text style={{
        fontSize: 10,
        fontWeight: '600',
        color: 'black',
      }}>
        {totalMessages}
      </Text>
    </View>
  );
};

export default MessageCountBadge;
