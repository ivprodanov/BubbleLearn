import React, { useRef, useEffect } from 'react';
import {
  Animated,
  PanResponder,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';

type Props = {
  imageSource: ImageSourcePropType;
  word: string;
  onDrop: (
    coords: { x: number; y: number },
    draggedWord: string,
    resetPosition: () => void
  ) => void;
  initialPosition: { x: number; y: number };
};

export default function DraggableItem({
  imageSource,
  word,
  onDrop,
  initialPosition,
}: Props) {
  const pan = useRef(
    new Animated.ValueXY({ x: initialPosition.x, y: initialPosition.y })
  ).current;

  // When initialPosition changes (unlikely), reset the pan value
  useEffect(() => {
    pan.setValue({ x: initialPosition.x, y: initialPosition.y });
  }, [initialPosition, pan]);

  const resetPosition = () => {
    Animated.spring(pan, {
      toValue: { x: initialPosition.x, y: initialPosition.y },
      useNativeDriver: false,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({ x: pan.x._value, y: pan.y._value });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gesture) => {
        pan.flattenOffset();
        const ne = e.nativeEvent as any;
        // pageX/pageY on native, clientX/clientY in many web environments
        const dropX = ne.pageX != null ? ne.pageX : ne.clientX;
        const dropY = ne.pageY != null ? ne.pageY : ne.clientY;
        onDrop({ x: dropX, y: dropY }, word, resetPosition);
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[styles.draggable, { transform: pan.getTranslateTransform() }]}
    >
      <Image source={imageSource} style={styles.image} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  draggable: {
    position: 'absolute',
    width: 80,
    height: 80,
    zIndex: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
