import React from 'react';
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo';

export function FlashStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}