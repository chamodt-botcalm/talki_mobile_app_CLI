import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TextInput,
} from 'react-native'
import { scaleWidth, scaleHeight } from '../constants/size'

const Deposite = () => {
  const [amount, setAmount] = useState('0.20')
  const [selectedPercentage, setSelectedPercentage] = useState<number | null>(null)
  const textInputRef = useRef<TextInput>(null)

  const percentages = ['0 %', '25 %', '50 %', '75 %', '100 %']

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar backgroundColor="#2C2C2E" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.headerButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Amount</Text>
        <TouchableOpacity>
          <Text style={styles.headerButton}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Min Max Info */}
        <Text style={styles.minMaxText}>Min 0.0001 ETH - Max 10,000 ETH</Text>

        {/* Amount Display */}
        <TouchableOpacity
          style={styles.amountContainer}
          onPress={() => {
            setAmount('');
            textInputRef.current?.focus();
          }}
        >
          {/* Hidden TextInput */}
        <TextInput
          ref={textInputRef}
          style={styles.hiddenInput}
          value={amount}
          onChangeText={setAmount}
          keyboardType='numeric'
          placeholder="0.00"
        />

          <Text style={styles.amountText}>{amount}</Text>
          <Text style={styles.currencyText}>ETH ▼</Text>
        </TouchableOpacity>

        
        {/* USD Value */}
        <Text style={styles.usdValue}>$12.26514</Text>

        {/* Available Balance */}
        <Text style={styles.balanceText}>Available Balance: 3.5849 ETH</Text>

        {/* Percentage Buttons */}
        <View style={styles.percentageContainer}>
          {percentages.map((percentage, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.percentageButton,
                selectedPercentage === index && styles.selectedPercentageButton
              ]}
              onPress={() => setSelectedPercentage(index)}
            >
              <Text style={[
                styles.percentageText,
                selectedPercentage === index && styles.selectedPercentageText
              ]}>
                {percentage}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Deposit Button */}
        <TouchableOpacity style={styles.depositButton}>
          <Text style={styles.depositButtonText}>Deposit</Text>
        </TouchableOpacity>


      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    paddingHorizontal: scaleWidth(20),
    paddingTop: scaleHeight(50),
    paddingBottom: scaleHeight(15),
  },
  headerButton: {
    color: '#D9FD00',
    fontSize: 17,
  },
  headerTitle: {
    color: '#D9FD00',
    fontSize: 17,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: scaleWidth(20),
    justifyContent: 'center'
  },
  minMaxText: {
    textAlign: 'center',
    color: '#8E8E93',
    fontSize: 16,
    marginBottom: scaleHeight(60),
    marginTop: scaleHeight(40),
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleHeight(10),
  },
  amountText: {
    fontSize: 72,
    fontWeight: '300',
    color: '#000',
  },
  currencyText: {
    fontSize: 24,
    color: '#8E8E93',
    marginLeft: scaleWidth(10),
  },
  usdValue: {
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    marginBottom: scaleHeight(40),
  },
  balanceText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: scaleHeight(30),
  },
  percentageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(40),
  },
  percentageButton: {
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(8),
    backgroundColor: '#E5E5EA',
    borderRadius: 20,
  },
  selectedPercentageButton: {
    backgroundColor: '#007AFF',
  },
  percentageText: {
    fontSize: 14,
    color: '#000',
  },
  selectedPercentageText: {
    color: '#FFF',
  },
  depositButton: {
    backgroundColor: '#D9FD00',
    paddingVertical: scaleHeight(16),
    borderRadius: 12,
    marginBottom: scaleHeight(40),
  },
  depositButtonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },

  hiddenInput: {
    position: 'absolute',
    top:0,
    width: scaleWidth(100),
    height: scaleHeight(100),
    overflow: 'hidden',
    opacity: 0,
  },
})

export default Deposite