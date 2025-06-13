import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  UIManager,
  findNodeHandle,
  ImageBackground,
  LayoutRectangle,
} from "react-native";
import Bubble from "../components/Bubble";
import DraggableItem from "../components/DraggableItem";
import puzzles from "../data/puzzles";
import { PuzzleItem } from "../types/types";
import backgroundImage from "../assets/paper-background.jpg";

export default function GameScreen() {
  const [bubbleStates, setBubbleStates] = useState<
    Record<string, "default" | "correct" | "wrong">
  >({});
  // refs will be either a native View or a DOM element (on web)
  const bubbleRefs = useRef<Record<string, any>>({});

  // Native fallback measurement
  const measureBubble = (word: string) =>
    new Promise<LayoutRectangle>((resolve) => {
      const ref = bubbleRefs.current[word];
      if (!ref) return resolve({ x: 0, y: 0, width: 0, height: 0 });
      const handle = findNodeHandle(ref);
      if (!handle) return resolve({ x: 0, y: 0, width: 0, height: 0 });
      UIManager.measure(
        handle,
        (_fx, _fy, width, height, pageX, pageY) => {
          resolve({ x: pageX, y: pageY, width, height });
        }
      );
    });

  const handleDrop = async (
    coords: { x: number; y: number },
    draggedWord: string,
    reset: () => void
  ) => {
    for (const item of puzzles as PuzzleItem[]) {
      let rect: LayoutRectangle;

      const ref = bubbleRefs.current[item.word];
      // Web: DOM element with getBoundingClientRect()
      if (ref && typeof ref.getBoundingClientRect === "function") {
        const domR = ref.getBoundingClientRect();
        rect = {
          x: domR.left,
          y: domR.top,
          width: domR.width,
          height: domR.height,
        };
      } else {
        // Native fallback
        rect = await measureBubble(item.word);
      }

      // Did we hit it?
      if (
        coords.x >= rect.x &&
        coords.x <= rect.x + rect.width &&
        coords.y >= rect.y &&
        coords.y <= rect.y + rect.height
      ) {
        if (item.word === draggedWord) {
          setBubbleStates((prev) => ({ ...prev, [item.word]: "correct" }));
        } else {
          setBubbleStates((prev) => ({ ...prev, [item.word]: "wrong" }));
          reset();
        }
        return;
      }
    }
    // dropped nowhere
    reset();
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.bubbleRow}>
          {puzzles.map((item) => (
            <Bubble
              key={item.word}
              word={item.word}
              status={bubbleStates[item.word] || "default"}
              // forwardRef gives us either the native View or the DOM node
              ref={(r) => (bubbleRefs.current[item.word] = r)}
            />
          ))}
        </View>

        <View style={styles.draggableArea}>
          {puzzles.map((item, idx) => (
            <DraggableItem
              key={item.word}
              imageSource={item.image}
              word={item.word}
              onDrop={handleDrop}
              initialPosition={{
                x: 40 + idx * 100,
                y: 300,
              }}
            />
          ))}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", resizeMode: "cover" },
  container: { flex: 1 },
  bubbleRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 60,
  },
  draggableArea: {
    flex: 1,
    position: "relative",
  },
});
