// screens/GameScreen.tsx
import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import Bubble from "../components/Bubble";
import DraggableItem from "../components/DraggableItem";
import puzzles from "../data/puzzles";
import { PuzzleItem } from "../types/types";

import backgroundImage from "../assets/paper-background.jpg";
export default function GameScreen() {

  const shuffleFunc = (arr) => {
    // let random = Math.floor(Math.random() * 3)
    console.log(arr);
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i].word;
        arr[i].word = arr[j].word;
        arr[j].word = temp;
    }
    console.log('here', arr);
    return [...arr]
  }

  shuffleFunc(puzzles);

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.bubbleRow}>
          {puzzles.map((item: PuzzleItem, index: number) => (
            <Bubble key={index} word={item.word} />
          ))}
        </View>
        <View style={styles.draggableRow}>
          {puzzles.map((item: PuzzleItem, index: number) => (
            <DraggableItem key={index} imageSource={item.image} />
          ))}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    width: '100%'
  },
  container: { flex: 1, justifyContent: "space-between", padding: 20 },
  bubbleRow: { flexDirection: "row", justifyContent: "space-around" },
  draggableRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 40,
  },
});
