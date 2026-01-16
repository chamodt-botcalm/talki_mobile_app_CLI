import React, { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  PressableProps,
  ViewStyle,
  StyleProp,
} from 'react-native';
import Typography from './Text';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  children: ReactNode;
  outline?: boolean;
  width?: number;
  height?: number;
  fontSize?: number;
  style?: StyleProp<ViewStyle>; // force it to NOT be a function
}

export default function Button({
  children,
  outline = false,
  width,
  height = 60,
  fontSize = 16,
  style,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        outline ? styles.outlineButton : styles.button,
        width ? { width } : null,
        height ? { height } : null,
        pressed ? { opacity: 0.9 } : null,
        style,
      ]}
    >
      <Typography center black semiBold style={{ fontSize: fontSize || 16 }}>
        {children}
      </Typography>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#DBFF00',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#DBFF00',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
