import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import { black, gray, white, green } from '../utils/colors';
import AddCard from './AddCard';

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
  }

  render() {
    const { deck } = this.props;
    const total = deck.questions.length;

    return(
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.subtitle}>{total} card{total == 1 ? '' : 's'}</Text>
        <TextButton onPress={this.addCard}>
          {'Add Card'.toUpperCase()}
        </TextButton>
        <TextButton backgroundColor={green} onPress={this.startQuiz}>
          {'Start Quiz'.toUpperCase()}
        </TextButton>
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

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    deckId,
    deck: state[deckId]
  }
}

export default connect(mapStateToProps)(DeckView);