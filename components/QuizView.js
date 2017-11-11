import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import { black, gray, white, green, red } from '../utils/colors';
import AddCard from './AddCard';

class QuizView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;

    return {
      title: deckId
    }
  }

  state = {
    showAnswer: false,
  }

  handleToggleAnswer = () => {
    this.setState(() => ({
      showAnswer: !this.state.showAnswer,
    }));
  }

  handleCorrect = () => {

  }

  handleIncorrect = () => {

  }

  render() {
    const { decks, deckId } = this.props;
    const { showAnswer } = this.state;
    const deck = decks[deckId];
    const total = deck.questions.length;
    let current = 1;

    return(
      <View style={styles.container}>
        {!showAnswer && <View>
          <Text style={styles.title}>{deck.questions[current-1].question}</Text>
          <TextButton backgroundColor={white} color={red} style={{ marginBottom: 30 }}
            onPress={this.handleToggleAnswer}>
            {'Answer'.toUpperCase()}
          </TextButton>
        </View>}
        {showAnswer && <View>
          <Text style={styles.title}>{deck.questions[current-1].answer}</Text>
          <TextButton backgroundColor={white} color={red} style={{ marginBottom: 30 }}
            onPress={this.handleToggleAnswer}>
            {'Question'.toUpperCase()}
          </TextButton>
        </View>}
        <TextButton backgroundColor={green} onPress={this.handleCorrect}>
          {'Correct'.toUpperCase()}
        </TextButton>
        <TextButton backgroundColor={red} onPress={this.handleIncorrect}>
          {'Incorrect'.toUpperCase()}
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

function mapStateToProps(decks, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    deckId,
    decks
  }
}

export default connect(mapStateToProps)(QuizView);