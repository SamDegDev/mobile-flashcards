import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import TextButton from './TextButton';
import { NavigationActions } from 'react-navigation';
import { white, blue, black, lightGray, red } from '../utils/colors';
//
import { updateDeck } from '../utils/FlashcardsAPI';
import { addCardToDeck } from '../actions';
import { connect } from 'react-redux';

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;

    return {
      title: 'Add Card'
    }
  }

  state = {
    questionInput: '',
    questionInputError: '',
    answerInput: '',
    answerInputError: '',
  }

  handleQuestionChange = questionInput => {
    this.setState(() => ({
      questionInput: questionInput
    }))
  }

  handleAnswerChange = answerInput => {
    this.setState(() => ({
      answerInput: answerInput
    }))
  }

  handleSubmitCard = () => {
    // validates the fields
    if (this.validateQuestionInput()
      && this.validateAnswerInput())
    {
      const { deckId } = this.props.navigation.state.params;
      let deck = this.props.deck;
      deck.questions.push({
        question: this.state.questionInput,
        answer: this.state.answerInput,
      })
      // saves the card
      updateDeck(deckId, deck);
      // returns to deck view
      this.props.goBack();
    }

  }

  validateQuestionInput = () => {
    if (this.state.questionInput.trim() === '') {
      this.setState(() => ({
        questionInputError: 'Please insert a Question!'
      }));
      return false;
    }
    this.setState(() => ({
      questionInputError: ''
    }));
    return true;
  }

  validateAnswerInput = () => {
    if (this.state.answerInput.trim() === '') {
      this.setState(() => ({
        answerInputError: 'Please insert an Answer!'
      }));
      return false;
    }
    this.setState(() => ({
      answerInputError: ''
    }));
    return true;
  }

  render() {
    const { deckId } = this.props.navigation.state.params;
    const { questionInput, questionInputError, answerInput, answerInputError } = this.state;

    return(
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.title}>Add a new Card to {deckId}</Text>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputLabel}>Question</Text>
          <TextInput
            value={questionInput}
            style={styles.textInput}
            onChangeText={this.handleQuestionChange}
            onBlur={this.validateQuestionInput}
            multiline={true}
            numberOfLines={4}
            placeholder='Insert the Question'
          />
          {questionInputError !== '' &&
            <Text style={styles.textInputError}>{questionInputError}</Text>
          }
        </View>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputLabel}>Answer</Text>
          <TextInput
            value={answerInput}
            style={styles.textInput}
            onChangeText={this.handleAnswerChange}
            onBlur={this.validateAnswerInput}
            multiline={true}
            numberOfLines={4}
            placeholder='Insert the Answer'
          />
          {answerInputError !== '' &&
            <Text style={styles.textInputError}>{answerInputError}</Text>
          }
        </View>
        <TextButton onPress={this.handleSubmitCard}>
          {'Submit'.toUpperCase()}
        </TextButton>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
  },
  title: {
    fontSize: 25,
    color: black,
    marginBottom: 20,
  },
  textInputContainer: {
    marginBottom: 20,
  },
  textInputLabel: {
    color: blue,
  },
  textInputError: {
    color: red,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: lightGray,
    fontSize: 16,
    color: black,
    paddingTop: 8,
    paddingBottom: 8,
  },
});

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    deckId,
    deck: state[deckId]
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    goBack: () => navigation.goBack(),
  }
}

export default connect(mapStateToProps)(AddCard);