import { View, StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'
import { Background } from '@react-navigation/elements'

type Props = {
    children?: ReactNode;
};

const BlackBackground = ({ children }: Props) => {
    const styles = StyleSheet.create({
        background:{
            backgroundColor:'#232323',
            width:'100%',
            height:'100%',
            flex: 1
        }
    })
  return (
    <View style={styles.background}>
        {children}
    </View>
  )
}

export default BlackBackground