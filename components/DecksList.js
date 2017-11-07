import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { AppLoading } from 'expo';
import DeckItem from './DeckItem';
import { connect } from 'react-redux';
import { fetchDecks, addDeck } from '../utils/FlashcardsAPI';
import { receiveDecks } from '../actions';

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

  render() {
    const { decks } = this.props;
    const { ready } = this.state;

    if (ready === false) {
      return <AppLoading />
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

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DecksList);