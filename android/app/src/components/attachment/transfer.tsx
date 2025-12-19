import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { scaleHeight, scaleWidth } from '../../constants/size'

const SHEET_HEIGHT = scaleHeight(292);

interface TransferProps {
    visible: boolean;
    onClose: () => void;
}

const Transfer = ({ visible, onClose }: TransferProps) => {
    const [amount, setAmount] = useState('0.001');
    const [selectedCurrency, setSelectedCurrency] = useState('talki');

    return (
        <Modal transparent animationType="slide" visible={visible}  >
            <View style={styles.backdrop} >
                <View style={styles.background}>

                    <View style={styles.main}>
                        <View style={styles.balanceSection}>
                            <Text style={styles.balanceLabel}>Balance (0.000012)</Text>
                            <Text style={styles.balanceAmount}>$12.26514</Text>
                        </View>

                        <View style={styles.border}>
                            <View style={styles.inputSection}>
                                <TextInput
                                    style={styles.amountInput}
                                    value={amount}
                                    onChangeText={setAmount}
                                    keyboardType="numeric"
                                />
                                <TouchableOpacity style={styles.currencySelector}>
                                    <View style={styles.currencyIcon} />
                                    <Text style={styles.currencyText}>{selectedCurrency}</Text>
                                    <Text style={styles.dropdownIcon}>▼</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.transferButton}>
                            <Text style={styles.transferButtonText}>Transfer</Text>
                        </TouchableOpacity>
                    </View>
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
        alignItems: 'center',
        paddingHorizontal: scaleWidth(11),
    },
    main: {
        width: '100%',
        marginTop: scaleHeight(55)
    },
    balanceSection: {
        alignItems: 'center',
        marginTop: scaleHeight(5)
    },
    balanceLabel: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000',
        marginBottom: 8,
    },
    balanceAmount: {
        fontSize: 16,
        color: '#666',
    },
    inputSection: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    amountInput: {
        flex: 1,
        fontSize: 18,
        color: '#000',
        paddingVertical: 10,
    },
    border: {
        borderColor: '#D1D1D6',
        borderWidth: 1,
        borderRadius:30,
        width:'100%',
        marginTop:scaleHeight(20)
    },
    currencySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    currencyIcon: {
        width: 20,
        height: 20,
        backgroundColor: '#000',
        borderRadius: 10,
        marginRight: 8,
    },
    currencyText: {
        fontSize: 16,
        color: '#000',
        marginRight: 8,
    },
    dropdownIcon: {
        fontSize: 12,
        color: '#666',
    },
    transferButton: {
        backgroundColor: '#C8FF00',
        width:"100%",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop:scaleHeight(20)
    },
    transferButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
})
export default Transfer