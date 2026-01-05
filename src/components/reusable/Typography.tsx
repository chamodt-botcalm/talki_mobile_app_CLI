import React, { ReactNode } from 'react';
import { Text, StyleSheet, Platform, TextProps } from 'react-native';

interface TypographyProps extends TextProps {
  children: ReactNode;
  center?: boolean;
  left?: boolean;
  right?: boolean;
  white?: boolean;
  grey?: boolean;
  black?: boolean;
  green?: boolean;
  s12?: boolean;
  s14?: boolean;
  s16?: boolean;
  s18?: boolean;
  s20?: boolean;
  s24?: boolean;
  s28?: boolean;
  s32?: boolean;
  s40?: boolean;
  bold?: boolean;
  semiBold?: boolean;
  lines?: number;
}

export default function Typography({
  children,
  center,
  left,
  right,
  white,
  grey,
  black,
  green,
  s12,
  s14,
  s16,
  s18,
  s20,
  s24,
  s28,
  s32,
  s40,
  bold,
  semiBold,
  lines,
  style,
  ...props
}: TypographyProps) {
  const textStyles = [
    styles.text,
    center && styles.center,
    left && styles.left,
    right && styles.right,
    white && styles.white,
    grey && styles.grey,
    black && styles.black,
    green && styles.green,
    s12 && styles.s12,
    s14 && styles.s14,
    s16 && styles.s16,
    s18 && styles.s18,
    s20 && styles.s20,
    s24 && styles.s24,
    s28 && styles.s28,
    s32 && styles.s32,
    s40 && styles.s40,
    bold && styles.bold,
    semiBold && styles.semiBold,
    style
  ];

  return (
    <Text numberOfLines={lines} style={textStyles} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter',
    color: '#000',
    fontSize: 14,
  },
  center: {
    textAlign: 'center',
  },
  left: {
    textAlign: 'left',
  },
  right: {
    textAlign: 'right',
  },
  white: {
    color: '#FFF',
  },
  grey: {
    color: '#8C8C8C',
  },
  black: {
    color: '#000',
  },
  green: {
    color: '#DBFF00',
  },
  s12: {
    fontSize: 12,
  },
  s14: {
    fontSize: 14,
  },
  s16: {
    fontSize: 16,
  },
  s18: {
    fontSize: 18,
  },
  s20: {
    fontSize: 20,
  },
  s24: {
    fontSize: 24,
  },
  s28: {
    fontSize: 28,
  },
  s32: {
    fontSize: 32,
  },
  s40: {
    fontSize: 40,
  },
  bold: {
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
  },
  semiBold: {
    fontWeight: Platform.OS === 'ios' ? '600' : '600',
  },
});