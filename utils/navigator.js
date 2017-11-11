import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import DecksList from '../components/DecksList';
import DeckView from '../components/DeckView';
import AddCard from '../components/AddCard';
import AddDeck from '../components/AddDeck';
import QuizView from '../components/QuizView';
import { white, black } from './colors';

const Tabs = TabNavigator({
  DecksList: {
    screen: DecksList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <MaterialIcons name='library-add' size={30} color={tintColor} />
    }
  }
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
    QuizView: {
      screen: QuizView,
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