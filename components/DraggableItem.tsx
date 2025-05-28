// components/DraggableItem.tsx
import React from 'react';
import { Image, StyleSheet, ImageSourcePropType, View } from 'react-native';
import Draggable from 'react-native-draggable';

type DraggableItemProps = {
  imageSource: ImageSourcePropType;
  key: number;
};

export default function DraggableItem({ imageSource }: DraggableItemProps) {
  return (
    <View style={styles.draggable}>
    <Draggable>
      <Image source={imageSource} style={styles.image} />
    </Draggable>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
  },
  draggable: {
    width: 150,
    height: 150,
  }
});
