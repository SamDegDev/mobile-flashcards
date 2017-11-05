import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { white, black, gray } from '../utils/colors';

export default function DeckItem({ id, title, questions, showDeck }) {
  const total = questions.length;

  // when this item gets pressed
  onPress = function() {
    // shows the cards for this deck
    showDeck(id);
  }

  return (
    <TouchableWithoutFeedback onPress={this.onPress}>
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{total} card{total == 1 ? 's' : ''}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 2,
  },
  title: {
    fontSize: 25,
    color: black,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 15,
    color: gray,
  }
});