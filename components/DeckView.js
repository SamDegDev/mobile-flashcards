import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';
import TextButton from './TextButton';

class DeckView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;

    return {
      title: deckId
    }
  }

  addCard = () => {
    // add a card to this deck
  }

  startQuiz = () => {
    // start the quiz on this deck
  }

  render() {
    const { deck } = this.props;
    const total = deck.questions.length;

    return(
      <View style={{ flex: 1 }}>
        <Text>{deck.title}</Text>
        <Text>{total} card{total == 1 ? '' : 's'}</Text>
        <TextButton style={{ padding: 10 }} onPress={this.addCard}>
          Add Card
        </TextButton>
        <TextButton style={{ padding: 10 }} onPress={this.startQuiz}>
          Start Quiz
        </TextButton>
      </View>
    );
  }

}

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    deckId,
    deck: state[deckId]
  }
}

export default connect(mapStateToProps)(DeckView);