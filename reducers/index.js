import { RECEIVE_DECKS, ADD_CARD } from '../actions/index';

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS: {
      return {
        ...state,
        ...action.decks
      };
    }
    case ADD_CARD: {
      return {
        ...state,
        ...actions.deck
      }
    }
    default:
      return state;
  }
}

export default decks;