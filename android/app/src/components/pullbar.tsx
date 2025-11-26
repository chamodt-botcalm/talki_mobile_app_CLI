import { View, Text, StyleSheet} from 'react-native'
import React from 'react'

type Props = {
  width: number;
  height: number;
 
};

const PullBar = ({width, height}: Props) => {
    const style=StyleSheet.create({
        pullbar:{
            backgroundColor:'#AEAEB2',
            borderRadius:6
        }
    })
  return (
    <View style={[
        style.pullbar,
        {
            width:width,
            height:height
        }
    ]}
    />
     
  )
}

export default PullBar