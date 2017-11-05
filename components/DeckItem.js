import React from 'react';
import { View, Text } from 'react-native';

export default function DeckItem({ title, questions }) {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{questions.length} cards</Text>
    </View>
  );
}