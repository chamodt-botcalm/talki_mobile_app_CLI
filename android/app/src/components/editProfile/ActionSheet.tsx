import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';
import {images} from '../../constants/images';

interface ActionSheetProps {
  isVisible: boolean;
  onClose: () => void;
}

const ActionSheet: React.FC<ActionSheetProps> = ({ isVisible, onClose }) => {
  const styles = StyleSheet.create({
    modal: {
      justifyContent: 'flex-end',
      alignSelf:'center',
      margin: 32,
      width:366
    },
    sheet: {
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 15
    },
    row: {
      flexDirection: 'row',
      marginBottom: 20,
      
    },
    img: {
      width: 70,
      height: 70,
      borderRadius: 15,
      marginRight: 10
    },
    option: {
      paddingVertical: 15,
      borderTopWidth: 0.5,
      borderColor: '#ccc'
    },
    optionText: {
      textAlign: 'center',
      color: '#007AFF',
      fontSize: 17
    },
    cancel: {
      backgroundColor: '#fff',
      marginTop: 10,
      borderRadius: 15,
      padding: 15
    },
    cancelText: {
      color: '#007AFF',
      textAlign: 'center',
      fontSize: 17,
      fontWeight: '500'
    }
  });

  const Option = ({ text, red }: { text: string; red?: boolean }) => (
    <TouchableOpacity style={styles.option}>
      <Text style={[styles.optionText, red && { color: 'red' }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );

  const imagess=[
    {
      img:images.img1
    },
    {
      img:images.img2
    },
    {
      img:images.img3
    },
    {
      img:images.img4
    },
    {
      img:images.img1
    },
    {
      img:images.img2
    },
    {
      img:images.img3
    },
    {
      img:images.img4
    }
  ]

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <View style={styles.sheet}>

         {/* Images Row */}
          <View style={styles.row}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {imagess.map((item,index) => (

              <Image
                key={index}
                source={item.img}
                style={styles.img}
              />

            ))
          }
            </ScrollView>
          </View>

        {/* Options */}
        <Option text="Choose Photo" />
        <Option text="Web Search" />
        <Option text="View Photo" />
        <Option text="Remove Photo" red />
      </View>

      <TouchableOpacity
        onPress={onClose}
        style={styles.cancel}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </Modal>
  );
};

export default ActionSheet