import React, { useRef, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { images } from "../../constants/images";

type Props = {
  scaleWidth: (n: number) => number;
  scaleHeight: (n: number) => number;
  onCancel: () => void;
  balanceText?: string;
  usdText?: string;
};

export default function TransferSheet({
  scaleWidth,
  scaleHeight,
  onCancel,
  balanceText = "Balance (0.000012)",
  usdText = "$12.26514",
}: Props) {
  const [amount, setAmount] = useState('0.001');
  const [isLoading, setIsLoading] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;
  const spinLoopRef = useRef<Animated.CompositeAnimation | null>(null);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg'],
  });

  const startSpinning = () => {
    spinValue.setValue(0);
    spinLoopRef.current?.stop();
    spinLoopRef.current = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1800,
        useNativeDriver: true,
      })
    );
    spinLoopRef.current.start();
  };

  const stopSpinning = () => {
    spinLoopRef.current?.stop();
    spinLoopRef.current = null;
    spinValue.setValue(0);
  };

  const handleTransfer = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      startSpinning();
      await new Promise<void>((resolve) => setTimeout(resolve, 1800));
      stopSpinning();
      setIsLoading(false);
      onCancel();
    } catch (e) {
      stopSpinning();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      stopSpinning();
    };
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View
        style={{
          height: scaleHeight(44),
          backgroundColor: "#DCDCDC",
          paddingHorizontal: scaleWidth(14),
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={onCancel}>
          <Text style={{ fontSize: scaleWidth(14), color: "#111" }}>Cancel</Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }} />

        <View style={{ width: scaleWidth(60) }} />
      </View>

      {/* Transfer content */}
      <View
        style={[
          {
            flex: 1,
            backgroundColor: "#F6F5FA",
            paddingHorizontal: scaleWidth(18),
            alignItems: "center",
            justifyContent: "center",
          },
          isLoading && { opacity: 0.35 },
        ]}
      >
        <Text
          style={{
            fontSize: scaleWidth(28),
            fontWeight: "800",
            color: "#0B1B33",
            textAlign: "center",
            marginBottom: scaleHeight(6),
          }}
        >
          {balanceText}
        </Text>

        <Text
          style={{
            fontSize: scaleWidth(18),
            fontWeight: "700",
            color: "#0B1B33",
            textAlign: "center",
            marginBottom: scaleHeight(20),
          }}
        >
          {usdText}
        </Text>

        {/* Amount + token selector */}
        <View
          style={{
            width: "100%",
            backgroundColor: "#FFFFFF",
            borderRadius: 999,
            paddingHorizontal: scaleWidth(16),
            paddingVertical: scaleHeight(10),
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#E5E5EA",
            marginBottom: scaleHeight(16),
          }}
        >
          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            editable={!isLoading}
            style={{
              flex: 1,
              fontSize: scaleWidth(20),
              fontWeight: "700",
              color: "#0B1B33",
              paddingVertical: 0,
            }}
          />

          <View
            style={{
              width: 1,
              height: scaleHeight(24),
              backgroundColor: "#E5E5EA",
              marginHorizontal: scaleWidth(12),
            }}
          />

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: scaleWidth(6),
            }}
            disabled={isLoading}
            onPress={() => {
              // TODO: open token dropdown
            }}
          >
            <View
              style={{
                width: scaleWidth(22),
                height: scaleWidth(22),
                borderRadius: 999,
                backgroundColor: "#111",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: scaleWidth(12), fontWeight: "800" }}>
                t
              </Text>
            </View>

            <Text style={{ fontSize: scaleWidth(16), fontWeight: "800", color: "#0B1B33" }}>
              talki
            </Text>

            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Transfer button */}
        <TouchableOpacity
          style={[
            {
              width: "100%",
              height: scaleHeight(56),
              borderRadius: scaleWidth(12),
              backgroundColor: "#D9FD00",
              alignItems: "center",
              justifyContent: "center",
            },
            isLoading && { opacity: 0.5 },
          ]}
          disabled={isLoading}
          onPress={handleTransfer}
        >
          <Text style={{ fontSize: scaleWidth(22), fontWeight: "900", color: "#000" }}>
            {isLoading ? 'Transfer...' : 'Transfer'}
          </Text>
        </TouchableOpacity>

        {/* Loading overlay */}
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <Animated.Image
              source={images.loader_circle}
              style={[styles.loader, { transform: [{ rotate: spin }] }]}
              resizeMode="contain"
            />
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  dropdownIcon: {
    fontSize: 12,
    color: '#666',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    width: 90,
    height: 90,
  },
})