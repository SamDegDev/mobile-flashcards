import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import { black, gray, white, green, red, lightPurp } from '../utils/colors';
import { setLocalNotification, clearLocalNotifications } from '../utils/notifications';
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
    bounceValue: new Animated.Value(1),
    currentCard: 1,
    corrects: 0,
    incorrects: 0,
  }

  handleToggleAnswer = () => {
    this.setState(() => ({
      showAnswer: !this.state.showAnswer,
    }));

    const { bounceValue } = this.state;
    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 1.04 }),
      Animated.spring(bounceValue, { toValue: 1, friction: 4 }),
    ]).start();
  }

  handleCorrect = () => {
    const { decks, deckId } = this.props;
    const deck = decks[deckId];
    const total = deck.questions.length;

    this.setState(() => ({
      corrects: this.state.corrects+1,
      currentCard: this.state.currentCard+1,
    }))
  }

  handleIncorrect = () => {
    const { decks, deckId } = this.props;
    const deck = decks[deckId];
    const total = deck.questions.length;

    this.setState(() => ({
      incorrects: this.state.incorrects+1,
      currentCard: this.state.currentCard+1,
    }))
  }

  resetQuiz = () => {
    this.setState(() => ({
      currentCard: 1,
      corrects: 0,
      incorrects: 0,
    }));
  }

  render() {
    const { decks, deckId } = this.props;
    const { showAnswer, bounceValue,
      currentCard, corrects, incorrects } = this.state;
    const deck = decks[deckId];
    const total = deck.questions.length;
    const { goBack } = this.props;

    if (currentCard > total) {
      // reset the notifications for tomorrow
      clearLocalNotifications()
        .then(setLocalNotification);

      return (
        <View style={styles.container}>
          <Text style={styles.title}>Quiz Results</Text>
          <Text style={styles.resultsText}>Total Cards: {total}</Text>
          <Text style={styles.resultsText}>Correct: {corrects*100/total}%</Text>
          <TextButton backgroundColor={lightPurp} onPress={this.resetQuiz}>
            {'Start Quiz again'.toUpperCase()}
          </TextButton>
          <TextButton onPress={goBack}>
            {'Back to the Deck'.toUpperCase()}
          </TextButton>
        </View>
      );
    }

    return(
      <View style={styles.container}>
        <Text>{currentCard}/{total}</Text>
        <Animated.View style={{ transform: [{ scale: bounceValue }], flex: 1 }}>
          {!showAnswer && <View>
            <Text style={styles.title}>{deck.questions[currentCard-1].question}</Text>
            <TextButton backgroundColor={white} color={red} style={{ marginBottom: 30 }}
              onPress={this.handleToggleAnswer}>
              {'Answer'.toUpperCase()}
            </TextButton>
          </View>}
          {showAnswer && <View>
            <Text style={styles.title}>{deck.questions[currentCard-1].answer}</Text>
            <TextButton backgroundColor={white} color={red} style={{ marginBottom: 30 }}
              onPress={this.handleToggleAnswer}>
              {'Question'.toUpperCase()}
            </TextButton>
          </View>}
        </Animated.View>
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
    fontSize: 28,
    color: black,
    marginBottom: 5,
    textAlign: 'center',
  },
  resultsText: {
    fontSize: 20,
    color: black,
    marginBottom: 5,
    textAlign: 'center',
  },
});

function mapStateToProps(decks, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    deckId,
    decks
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    goBack: () => navigation.goBack(),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizView);