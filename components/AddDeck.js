import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import TextButton from './TextButton';
import { white, blue, black, lightGray, red } from '../utils/colors';
//
import { updateDeck } from '../utils/FlashcardsAPI';
import { addDeck } from '../actions';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

class AddDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Deck'
    }
  }

  state = {
    deckNameInput: '',
    deckNameInputError: '',
  }

  handleDeckNameChange = deckNameInput => {
    this.setState(() => ({
      deckNameInput
    }))
  }

  handleSubmitDeck = () => {
    // validates the fields
    if (this.validateDeckNameInput())
    {
      const newDeck = {
        title: this.state.deckNameInput,
        questions: [],
      }
      // saves the new Deck
      updateDeck(newDeck, newDeck.title);

      // sends the new deck to the reducer
      this.props.dispatch(addDeck({
        [newDeck.title]: newDeck
      }));

      // show the new Deck resetting the previous deck to Home
      this.props.navigation.dispatch(
        NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'Home'}),
            NavigationActions.navigate({ routeName: 'DeckView', params: { deckId: newDeck.title }})
          ]
        })
      );

      // reset the fields
      this.setState(() => ({
        deckNameInput: '',
        deckNameInputError: '',
      }));
    }

  }

  validateDeckNameInput = () => {
    const { deckNameInput } = this.state;

    // check if empty
    if (deckNameInput.trim() === '') {
      this.setState(() => ({
        deckNameInputError: 'Please insert the Name of the Deck!'
      }));
      return false;
    }

    // check if already existing
    const { decks } = this.props;
    if (Object.keys(decks).indexOf(deckNameInput) !== -1 ) {
      this.setState(() => ({
        deckNameInputError: 'A Deck with this name already exists!'
      }));
      return false;
    }

    this.setState(() => ({
      deckNameInputError: ''
    }));
    return true;
  }

  render() {
    const { deckNameInput, deckNameInputError } = this.state;

    return(
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.title}>Add a new Deck</Text>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputLabel}>Name of the Deck</Text>
          <TextInput
            value={deckNameInput}
            style={styles.textInput}
            onChangeText={this.handleDeckNameChange}
            onBlur={this.validateDeckNameInput}
            placeholder='Insert the name of the Deck'
          />
          {deckNameInputError !== '' &&
            <Text style={styles.textInputError}>{deckNameInputError}</Text>
          }
        </View>
        <TextButton onPress={this.handleSubmitDeck}>
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
  return {
    decks: state
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);