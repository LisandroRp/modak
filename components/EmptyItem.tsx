import { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, View } from "react-native";

interface ItemProps {
  fullSize: any,
  itemSize: number
}

const { width } = Dimensions.get('window');

export const EmptyItem = ({ fullSize, itemSize, }: ItemProps) => {

  const EMPTY_ITEM_SIZE = (width - itemSize) / 2;
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: fullSize ? 1 : 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [fullSize])

  const dynamicEmptyWith = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [EMPTY_ITEM_SIZE, 0],
  });

  return (
    <Animated.View style={{ width: dynamicEmptyWith }}>
    </Animated.View>
  );
}