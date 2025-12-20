import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
  Animated,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { scaleHeight, scaleWidth } from '../../constants/size'
import { images } from '../../constants/images'

const SHEET_HEIGHT = scaleHeight(295)

interface TransferProps {
  visible: boolean
  onClose: () => void
}

const Transfer = ({ visible, onClose }: TransferProps) => {
  const [amount, setAmount] = useState('0.001')
  const [selectedCurrency, setSelectedCurrency] = useState('talki')
  const [isLoading, setIsLoading] = useState(false)

  // ✅ IMPORTANT: useRef so it won't reset on re-render
  const spinValue = useRef(new Animated.Value(0)).current
  const spinLoopRef = useRef<Animated.CompositeAnimation | null>(null)

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg'],
  })

  const startSpinning = () => {
    spinValue.setValue(0)

    // stop previous loop if any
    spinLoopRef.current?.stop()

    spinLoopRef.current = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1800, // ✅ speed (increase for slower)
        useNativeDriver: true,
      })
    )

    spinLoopRef.current.start()
  }

  const stopSpinning = () => {
    spinLoopRef.current?.stop()
    spinLoopRef.current = null
    spinValue.setValue(0)
  }

  const handleTransfer = async () => {
    if (isLoading) return

    try {
      setIsLoading(true)
      startSpinning()

      // ✅ Replace with your real API call
      await new Promise((resolve) => setTimeout(resolve, 1800))

      stopSpinning()
      setIsLoading(false)
      onClose()
    } catch (e) {
      stopSpinning()
      setIsLoading(false)
    }
  }

  // ✅ Cleanup when modal closes (prevents stuck spinning)
  useEffect(() => {
    if (!visible) {
      setIsLoading(false)
      stopSpinning()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  return (
    <Modal transparent animationType="slide" visible={visible}>
      {/* Backdrop (tap outside to close) */}
      <Pressable
        style={styles.backdrop}
        onPress={isLoading ? undefined : onClose}
      >
        {/* Stop closing when tapping inside sheet */}
        <Pressable style={styles.background} onPress={() => {}}>
          <View style={[styles.main, isLoading && { opacity: 0.35 }]}>
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
                  editable={!isLoading}
                />

                <TouchableOpacity
                  style={styles.currencySelector}
                  activeOpacity={0.7}
                  disabled={isLoading}
                  onPress={() => {
                    // open currency dropdown
                  }}
                >
                  <View style={styles.currencyIcon} />
                  <Text style={styles.currencyText}>{selectedCurrency}</Text>
                  <Text style={styles.dropdownIcon}>▼</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.transferButton, isLoading && styles.transferButtonDisabled]}
              activeOpacity={0.8}
              disabled={isLoading}
              onPress={handleTransfer}
            >
              <Text style={styles.transferButtonText}>
                {isLoading ? 'Transfer...' : 'Transfer'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* ✅ Loading overlay + rotating image */}
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <Animated.Image
                source={images.loader_circle}
                style={[styles.loader, { transform: [{ rotate: spin }] }]}
                resizeMode="contain"
              />
            </View>
          )}
        </Pressable>
      </Pressable>
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
    position: 'relative',
  },

  main: {
    width: '100%',
    marginTop: scaleHeight(55),
  },
  balanceSection: {
    alignItems: 'center',
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

  border: {
    borderColor: '#D1D1D6',
    borderWidth: 1,
    borderRadius: 30,
    width: '100%',
    marginTop: scaleHeight(20),
    paddingHorizontal: scaleWidth(12),
    paddingVertical: scaleHeight(6),
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
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: scaleHeight(20),
  },
  transferButtonDisabled: {
    opacity: 0.5,
  },
  transferButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },

  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
  },
  loader: {
    width: 90,
    height: 90,
  },
})

export default Transfer
