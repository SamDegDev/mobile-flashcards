import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { white, blue } from '../utils/colors';

export default function TextButton({ children, onPress, backgroundColor = blue, color = white, style = {} }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
    >
      <Text style={[{ color }, styles.text, style]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    margin: 10,
    padding: 10,

  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});