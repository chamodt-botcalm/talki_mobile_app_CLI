import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Pressable,
  Modal,
  Animated,
  FlatList,
  StyleSheet,
  Keyboard,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { images } from "../constants/images";
import { scaleHeight, scaleWidth } from "../constants/size";
import Transfer from "./attachment/transfer";

const { height: SCREEN_H } = Dimensions.get("window");
const SHEET_HEIGHT = scaleHeight(338);
const INPUT_HEIGHT = scaleHeight(90);

export default function MessageBottom() {
  const [open, setOpen] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);

  // Sheet:  SHEET_HEIGHT -> 0
  const sheetY = useRef(new Animated.Value(SHEET_HEIGHT)).current;

  // Input inside modal: 0 -> -SHEET_HEIGHT
  const inputY = useRef(new Animated.Value(0)).current;

  const items = useMemo(
    () => [
      { id: "gallery", label: "Gallery", icon: images.gallery },
      { id: "document", label: "Document", icon: images.document },
      { id: "audio", label: "Audio", icon: images.audio },
      { id: "location", label: "Location", icon: images.location },
      { id: "contact", label: "Contact", icon: images.contact },
      { id: "poll", label: "Poll", icon: images.poll },
      { id: "transfer", label: "Transfer", icon: images.transfer },
    ],
    []
  );

  const showSheet = () => {
    Keyboard.dismiss();
    setOpen(true);

    sheetY.setValue(SHEET_HEIGHT);
    inputY.setValue(0);

    Animated.parallel([
      Animated.timing(sheetY, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(inputY, {
        toValue: -SHEET_HEIGHT,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hideSheet = () => {
    Animated.parallel([
      Animated.timing(sheetY, {
        toValue: SHEET_HEIGHT,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(inputY, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => setOpen(false));
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.tile} onPress={() => {
      if (item.id === "transfer") {
        hideSheet();
        setShowTransfer(true);
      }
    }}>
      <View style={styles.iconCircle}>
       <Image source={item.icon} style={{ width: 30, height: 30, resizeMode: "contain" }} />
      </View>
      <Text style={styles.tileText}>{item.label}</Text>
    </TouchableOpacity>
  );

  const InputBar = ({ onAttachPress }: { onAttachPress: () => void }) => (
    <View style={styles.inputContainer}>
      <TouchableOpacity onPress={onAttachPress}>
        <Image source={images.attach} style={styles.icon} />
      </TouchableOpacity>

      <TextInput
        placeholder="Message"
        placeholderTextColor="#999"
        style={styles.input}
      />

      <Image source={images.microphone} style={styles.icon} />
    </View>
  );

  return (
    <>
      <Transfer visible={showTransfer} onClose={() => setShowTransfer(false)} />
      
      {/* ✅ Normal input (only when modal closed) */}
      {!open && <InputBar onAttachPress={showSheet} />}

      {/* ✅ Modal contains backdrop + input + sheet */}
      <Modal visible={open}
        animationType="slide"
        transparent={true} onRequestClose={hideSheet}>
        {/* Backdrop */}
        <Pressable style={styles.backdrop} onPress={hideSheet} />

        {/* ✅ Input INSIDE modal, moving up with sheet */}
        <Animated.View
          style={[
            styles.modalInputWrapper,
            { transform: [{ translateY: inputY }] },
          ]}
        >
          <InputBar onAttachPress={() => {}} />
        </Animated.View>

        {/* Sheet */}
        <Animated.View
          style={[
            styles.sheet,
            { transform: [{ translateY: sheetY }] },
          ]}
        >
          <View style={{alignItems: "center" }}>
          <FlatList
            data={items}
            keyExtractor={(i) => i.id}
            renderItem={renderItem}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: 'flex-start', gap:scaleWidth(47) }}
          /></View>
        </Animated.View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: INPUT_HEIGHT,
    backgroundColor: "#F6F5FA",
    borderTopWidth: 1,
    borderTopColor: "#7A7A7A",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 10,
  },
  modalInputWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    // IMPORTANT: keep it above the sheet when moved up
    zIndex: 10,
    elevation: 10,
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: "#858E99",
    resizeMode: "contain",
  },
  input: {
    flex: 1,
    height: scaleHeight(42),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D1D1D6",
    paddingHorizontal: 14,
    backgroundColor: "#fff",
  },

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: 'flex-end',
  },

  sheet: {
    height: SHEET_HEIGHT, 
    backgroundColor: "#F6F5FA",
    padding: 16,
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  tile: {
    alignItems: "center",
    marginBottom: 18,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 999,
    backgroundColor: "#232323",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  tileText: { fontSize: 12, color: "#222" },
});
