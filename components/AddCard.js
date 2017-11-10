import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import TextButton from './TextButton';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { white, blue, black, lightGray } from '../utils/colors';

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    //const { deckId } = navigation.state.params;
    const deckId = 'React';

    return {
      title: 'New Card'
    }
  }

  state = {
    questionInput: '',
    answerInput: '',
  }

  handleQuestionChange = questionInput => {
    this.setState(() => ({
      questionInput
    }))
  }

  handleAnswerChange = answerInput => {
    this.setState(() => ({
      answerInput
    }))
  }

  handleSubmitCard = () => {
    // validates the fields
    // saves the card
  }

  render() {
    //const { deckId } = navigation.state.params;
    const deckId = 'React';
    const { questionInput, answerInput } = this.state;

    return(
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.title}>Add a new Card to {deckId}</Text>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputLabel}>Question</Text>
          <TextInput
            value={questionInput}
            style={styles.textInput}
            onChangeText={this.handleQuestionChange}
            multiline={true}
            numberOfLines={4}
            placeholder='Insert the Question'
          />
        </View>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputLabel}>Answer</Text>
          <TextInput
            value={answerInput}
            style={styles.textInput}
            onChangeText={this.handleAnswerChange}
            multiline={true}
            numberOfLines={4}
            placeholder='Insert the Answer'
          />
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
  //const { deckId } = navigation.state.params;
  const deckId = 'React';

  return {
    deckId,
    deck: state[deckId]
  }
}

export default connect(mapStateToProps)(AddCard);