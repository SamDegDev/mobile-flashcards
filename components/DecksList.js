import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { AppLoading } from 'expo';
import DeckItem from './DeckItem';

export default class DecksList extends Component {

  data = [
    {
      id: '1',
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    {
      id: '2',
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  ];

  renderItem = ({ item }) => {
    return <DeckItem {...item} showDeck={this.showDeck} />
  }

  showDeck = (deckId) => {
    // shows the cards for a specific deck
  }

  render() {
    return(
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.title}
        />
      </View>
    );
  }

}