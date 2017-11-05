import React from 'react';
import { View } from 'react-native';
import { white, black } from './utils/colors';
import { FlashStatusBar } from './utils/statusbar';
import { MainNavigator } from './utils/navigator';

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlashStatusBar backgroundColor={white} barStyle='light-content' />
        <MainNavigator />
      </View>
    );
  }
}