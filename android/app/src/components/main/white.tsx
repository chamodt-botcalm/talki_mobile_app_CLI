import { View, StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'

type Props = {
    height: number;
    children?: ReactNode;
};

const WhiteBackground = ({ height, children }: Props) => {
    const styles = StyleSheet.create({
        background: {
            position: 'absolute',
            bottom: 0,
            backgroundColor: '#FFFFFF',
            width: '100%',
            height: height,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            overflow: 'hidden',
        }
    })
    return (
        <View style={styles.background}>
            {children}
        </View>
    )
}

export default WhiteBackground