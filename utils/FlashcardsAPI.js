import { AsyncStorage } from 'react-native';
const STORAGE_KEY = '1973ad72b2f2d4cd3ff16d62ad2981f0';

export function fetchDecks() {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(formatDataResults);
}

export function addDeck({ deck, key }) {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(
    {
      [key]: deck,
    }
  ))
}

function setDummyData() {
  const dummyData = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  };
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData));
  return dummyData;
}

function formatDataResults(results) {
  return results === null
    ? setDummyData()
    : JSON.parse(results);
}