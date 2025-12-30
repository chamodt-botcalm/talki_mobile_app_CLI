import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import React from 'react'


const { width, height } = Dimensions.get('window');
const isTablet = width >= 600 || height >= 1000;

const SettingsScreenIcon = ({ link }: { link: any }) => {
    const styles = StyleSheet.create({
        image: {
            width: isTablet ? 17 : 15,
            height: isTablet ? 17 : 15,
            resizeMode: 'contain',
        },
        background:{
                backgroundColor:'#232323',
                borderRadius:40,
                padding:8,
        }
    })
    return (
        <View style={styles.background}>
            <Image source={link}
                style={styles.image} />
        </View>
    )
}

export default SettingsScreenIcon