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
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.subtitle}>{total} card{total == 1 ? '' : 's'}</Text>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
    paddingTop: 20,
    paddingRight: 10,
    paddingBottom: 20,
    paddingLeft: 10,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
    marginLeft: 10,
    borderRadius: 2,
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