// components/Bubble.tsx
import React, { forwardRef } from 'react';
import { View, Text, StyleSheet, LayoutChangeEvent } from 'react-native';

type BubbleProps = {
  word: string;
  status?: 'default'|'correct'|'wrong';
  onLayout?: (e: LayoutChangeEvent) => void;
};

const Bubble = forwardRef<View, BubbleProps>(({ word, status='default', onLayout }, ref) => {
  const color = status==='correct' ? '#4CAF50' 
                : status==='wrong'   ? '#F44336' 
                : '#A3D3FF';

  return (
    <View
      ref={ref}
      onLayout={onLayout}
      style={[styles.bubble, { backgroundColor: color }]}
    >
      <Text style={styles.text}>{word.toUpperCase()}</Text>
    </View>
  );
});
Bubble.displayName = 'Bubble';
export default Bubble;

const styles = StyleSheet.create({
  bubble: { padding:20, borderRadius:50, margin:10 },
  text:   { fontSize:24, fontWeight:'bold' },
});
