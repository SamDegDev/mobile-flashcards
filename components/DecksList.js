import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { AppLoading } from 'expo';
import DeckItem from './DeckItem';

export default class DecksList extends Component {

  data = [
    {
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
    return <DeckItem {...item} />
  }

  render() {
    return(
      <View>
        <FlatList
          data={this.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.title}
        />
      </View>
    );
  }

}