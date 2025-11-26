import React, { useState } from 'react'
import { View } from 'react-native'
import { Switch } from 'react-native-switch'

export default function CustomSwitch() {
  const [isOn, setIsOn] = useState(true)

  return (
   
      <Switch
        value={isOn}
        onValueChange={setIsOn}
        activeText={''}
        inActiveText={''}
        backgroundActive={'#D9FD00'}
        circleBorderWidth={0}
        circleSize={20}
        barHeight={25}
        switchWidthMultiplier={2.5}
      />
    
  )
}
