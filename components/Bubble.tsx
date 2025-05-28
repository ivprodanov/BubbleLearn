import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type BubbleProps = {
  word: string;
  key: number;
};

export default function Bubble({ word }: BubbleProps) {
  return (
    <View style={styles.bubble}>
      <Text style={styles.text}>{word}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: '#A3D3FF',
    padding: 20,
    borderRadius: 50,
    margin: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
