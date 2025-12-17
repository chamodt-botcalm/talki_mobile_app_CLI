import { View, Text, Modal, StyleSheet, Animated,Keyboard } from 'react-native'
import React, { useRef, useState } from 'react'
import { scaleHeight } from '../../constants/size'

const SHEET_HEIGHT = scaleHeight(295);

interface TransferProps {
    visible: boolean;
    onClose: () => void;
}

const Transfer = ({ visible, onClose }: TransferProps) => {
    return (
        <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
            <View style={styles.backdrop} onTouchEnd={onClose}>
                <View style={styles.background}>
                    <Text>Transfer Modal</Text>
                </View>
                
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.25)',
        justifyContent: 'flex-end',
    },
    background: {
        backgroundColor: '#F6F5FA',
        height: SHEET_HEIGHT,
        width: '100%',
        borderTopRightRadius: 38,
        borderTopLeftRadius: 38,
        padding: 20,
    }
})
export default Transfer