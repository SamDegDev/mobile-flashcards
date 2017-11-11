import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { AppLoading } from 'expo';
import DeckItem from './DeckItem';
import { connect } from 'react-redux';
import { fetchDecks } from '../utils/FlashcardsAPI';
import { receiveDecks } from '../actions';
import TextButton from './TextButton';
import { white, black } from '../utils/colors';

class DecksList extends Component {
  state = {
    ready: false,
  }

  componentDidMount() {
    const { dispatch } = this.props;

    // gets all the available decks
    fetchDecks()
    .then(decks => dispatch(receiveDecks(decks)))
    .then(() => this.setState({ ready: true }))
  }

  renderItem = ({ item }) => {
    return <DeckItem {...item} showDeck={this.showDeck} />
  }

  showDeck = (deckId) => {
    // shows the cards for a specific deck
    this.props.navigation.navigate(
      'DeckView',
      { deckId }
    );
  }

  handleAddDeckClick = () => {
    this.props.navigation.navigate(
      'AddDeck'
    );
  }

  render() {
    const { decks } = this.props;
    const { ready } = this.state;

    if (ready === false) {
      return <AppLoading />
    }

    // the object is empty
    if (Object.keys(decks).length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>There are no Decks!</Text>
          <TextButton onPress={this.handleAddDeckClick}>
          {'Add a Deck'.toUpperCase()}
        </TextButton>
        </View>
      );
    }

    return(
      <View style={{ flex: 1 }}>
        <FlatList
          data={Object.values(decks)}
          renderItem={this.renderItem}
          keyExtractor={item => item.title}
        />
      </View>
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
    textAlign: 'center',
  },
});

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DecksList);