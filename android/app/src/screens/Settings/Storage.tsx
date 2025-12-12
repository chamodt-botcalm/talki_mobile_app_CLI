import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity, ScrollView, Switch } from 'react-native'
import React, { useState } from 'react'
import BlackBackground from '../../components/main/black'
import WhiteBackground from '../../components/main/white'
import { useBack, scaleHeight, scaleWidth } from '../../constants/size'
import { RootStackParamList } from '../../types/navigation'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { images } from '../../constants/images'
import PullBar from '../../components/pullbar'
import CustomSwitch from '../../components/Switch'

const Storage = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  useBack(navigation);

  const [gifsEnabled, setGifsEnabled] = useState(false);
  const [videosEnabled, setVideosEnabled] = useState(false);
  const [saveEditedPhotos, setSaveEditedPhotos] = useState(false);

  const section1 = [
    { title1: 'Storage Usage', title2: '', link: '' },
    { title1: 'Network Usage', title2: '', link: '' },
  ]

  const section2 = [
    { title1: 'Using Cellular', title2: 'Disabled', link: '' },
    { title1: 'Using Wi-Fi', title2: 'Disabled', link: '' },
    { title1: 'Reset Auto-Download Settings', title2: '', link: '' }
  ]

  const section3 = [
    { title1: 'Save Incoming Photos', title2: '', link: '' },
  ]

  const Section1 = ({ title1, title2, link, isLast }: { title1: string; title2: string; link?: string; isLast?: boolean }) => {
    return (
      <View>
        <TouchableOpacity style={[styles.row1]} onPress={() => link && navigation.navigate(link as never)}>
          <Text>{title1}</Text>
          <View style={[styles.row2]}>
            <Text style={{ color: '#AEAEB2' }}>{title2}</Text>
            <Image source={images.next} style={{ tintColor: '#AEAEB2', width: scaleWidth(8), height: scaleHeight(13) }} />
          </View>
        </TouchableOpacity>
        {!isLast && <View style={styles.borderbottom} />}
      </View>
    );
  };

  const Section2 = ({ title1, title2, link, isLast }: { title1: string; title2: string; link?: string; isLast?: boolean }) => {
    return (
      <View>
        <TouchableOpacity style={[styles.row1]} onPress={() => link && navigation.navigate(link as never)}>
          
            <View style={styles.column}>
              <Text style={{color:isLast?'#037EE5':'#000000'}}>{title1}</Text>
              {!isLast&&<Text style={{ color: '#AEAEB2' }}>{title2}</Text>}
            </View>
            {!isLast &&<Image source={images.next} style={{ tintColor: '#AEAEB2', width: scaleWidth(8), height: scaleHeight(13) }} />}
          
        </TouchableOpacity>
        {!isLast && <View style={styles.borderbottom} />}
      </View>
    );
  };

  const SwitchSection = ({ title, value, onValueChange, isLast }: { title: string; value: boolean; onValueChange: (value: boolean) => void; isLast?: boolean }) => {
    return (
      <View>
        <View style={[styles.row1]}>
          <Text>{title}</Text>
          <CustomSwitch />
        </View>
        {!isLast && <View style={styles.borderbottom} />}
      </View>
    );
  };

  const Section3 = ({ title1, title2, link, isLast }: { title1: string; title2: string; link?: string; isLast?: boolean }) => {
    return (
      <View>
        <TouchableOpacity style={[styles.row1]} onPress={() => link && navigation.navigate(link as never)}>
          <Text>{title1}</Text>
          <View style={[styles.row2]}>
            <Text style={{ color: '#AEAEB2' }}>{title2}</Text>
            <Image source={images.next} style={{ tintColor: '#AEAEB2', width: scaleWidth(8), height: scaleHeight(13) }} />
          </View>
        </TouchableOpacity>
        {!isLast && <View style={styles.borderbottom} />}
      </View>
    );
  };

  return (
    <BlackBackground>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={[styles.backButton, { zIndex: 1 }]} onPress={() => navigation.goBack()}>
          <Image source={images.backk} style={styles.backIcon} />
          <Text style={[styles.headerText, { fontSize: 16 }]}>Back</Text>
        </Pressable>
        <Text style={[styles.headerText, { position: 'absolute', left: 0, right: 0, textAlign: 'center', zIndex: 0 }]}>Data and Storage</Text>
      </View>

      <WhiteBackground height={scaleHeight(811)}>
        <View style={{ height: scaleHeight(11) }} />
        <PullBar width={scaleWidth(62.5)} height={scaleHeight(6)} />
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

          {/* Section 1 - Storage and Network Usage */}
          <View style={[styles.border, { backgroundColor: '#F6F6F6' }, { marginTop: scaleWidth(57) }]}>
            {section1.map((item, index) => (
              <Section1 key={index} title1={item.title1} title2={item.title2} link={item.link} isLast={index === section1.length - 1} />
            ))}
          </View>

          <Text style={{ fontSize: 16, color: '#636366', marginLeft: scaleWidth(18), marginTop: scaleHeight(35), marginBottom: scaleHeight(8), textTransform: 'uppercase' }}>Automatic Media Download</Text>

          {/* Section 2 - Cellular and Wi-Fi */}
          <View style={[styles.border, { backgroundColor: '#F6F6F6' }]}>
            {section2.map((item, index) => (
              <Section2 key={index} title1={item.title1} title2={item.title2} link={item.link} isLast={index === section2.length - 1} />
            ))}
          </View>

          

          <Text style={{ fontSize: 16, color: '#636366', marginLeft: scaleWidth(18), marginTop: scaleHeight(35), marginBottom: scaleHeight(8), textTransform: 'uppercase' }}>Auto-Play Media</Text>

          {/* Section 3 - Auto-play switches */}
          <View style={[styles.border, { backgroundColor: '#F6F6F6' }]}>
            <SwitchSection title="GIFs" value={gifsEnabled} onValueChange={setGifsEnabled} />
            <SwitchSection title="Videos" value={videosEnabled} onValueChange={setVideosEnabled} isLast={true} />
          </View>

          <Text style={{ fontSize: 16, color: '#636366', marginLeft: scaleWidth(18), marginTop: scaleHeight(35), marginBottom: scaleHeight(8), textTransform: 'uppercase' }}>Other</Text>

          {/* Section 4 - Other settings */}
          <View style={[styles.border, { backgroundColor: '#F6F6F6' }]}>
            {section3.map((item, index) => (
              <Section3 key={index} title1={item.title1} title2={item.title2} link={item.link} isLast={false} />
            ))}
            <SwitchSection title="Save Edited Photos" value={saveEditedPhotos} onValueChange={setSaveEditedPhotos} isLast={true} />
          </View>

        </ScrollView>
      </WhiteBackground>
    </BlackBackground>
  )
}

const styles = StyleSheet.create({
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    paddingHorizontal: 15,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    
  },
  borderbottom: {
    borderBottomColor: '#E3E3E6',
    borderBottomWidth: 1,
    marginHorizontal: scaleWidth(25)
  },
  border: {
    borderBottomWidth: 1,
    borderBlockColor: '#E3E3E6',
    borderTopWidth: 1,
    borderTopColor: '#E3E3E6',
    width: '100%'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(14),
    marginTop: scaleHeight(73),
  },
  headerText: {
    color: '#D9FD00',
    fontSize: 18,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(9)
  },
  backIcon: {
    width: scaleWidth(14),
    height: scaleHeight(14),
    tintColor: '#D9FD00',
    resizeMode: 'contain'
  },
  column:{
    flexDirection:'column'
  }
})

export default Storage