import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DecksList from '../components/DecksList';
import DeckView from '../components/DeckView';
import AddCard from '../components/AddCard';
import { white, black } from './colors';

const Tabs = TabNavigator({
  DecksList: {
    screen: DecksList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
    }
  },
},
{
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: black,
    style: {
      height: 56,
      backgroundColor: white,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    }
  }
});

export const MainNavigator = StackNavigator(
  {
    Home: {
      screen: Tabs,
    },
    DeckView: {
      screen: DeckView,
    },
    AddCard: {
      screen: AddCard,
    },
  },
  {
    navigationOptions: {
      headerTintColor: black,
      headerStyle: {
        backgroundColor: white,
      }
    },
  }
);