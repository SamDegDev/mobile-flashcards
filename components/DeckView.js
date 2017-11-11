import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import { black, gray, white, lightPurp } from '../utils/colors';
import AddCard from './AddCard';
import QuizView from './QuizView';

class DeckView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;

    return {
      title: deckId
    }
  }

  addCard = () => {
    // add a card to this deck
    const { deckId } = this.props.navigation.state.params;
    this.props.navigation.navigate(
      'AddCard',
      { deckId }
    )
  }

  startQuiz = () => {
    // start the quiz on this deck
    const { decks, deckId } = this.props;
    const deck = decks[deckId];
    const total = deck.questions.length;

    // if there are questions
    if (total > 0) {
      const { deckId } = this.props.navigation.state.params;
      this.props.navigation.navigate(
        'QuizView',
        { deckId }
      )
    }
  }

  render() {
    const { decks, deckId } = this.props;
    const deck = decks[deckId];
    const total = deck.questions.length;
    const hasCards = total > 0;

    return(
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.subtitle}>{total} card{total == 1 ? '' : 's'}</Text>
        <TextButton onPress={this.addCard}>
          {'Add Card'.toUpperCase()}
        </TextButton>
        <TextButton backgroundColor={!hasCards ? gray : lightPurp} onPress={this.startQuiz}
        disabled={!hasCards} >
          {'Start Quiz'.toUpperCase()}
        </TextButton>
        {!hasCards && <Text style={styles.subtitle}>To start the Quiz, add a new Card!</Text>}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    paddingTop: 20,
    paddingRight: 10,
    paddingBottom: 20,
    paddingLeft: 10,
  },
  title: {
    fontSize: 35,
    color: black,
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: gray,
    textAlign: 'center',
    marginBottom: 30,
  }
});

function mapStateToProps(decks, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    deckId,
    decks
  }
}

export default connect(mapStateToProps)(DeckView);