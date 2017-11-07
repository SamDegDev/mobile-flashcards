import React from 'react';
import { View } from 'react-native';
import { white, black } from './utils/colors';
import { FlashStatusBar } from './utils/statusbar';
import { MainNavigator } from './utils/navigator';
//
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';


export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <FlashStatusBar backgroundColor={white} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}