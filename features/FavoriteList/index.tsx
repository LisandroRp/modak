import React, { useRef, useState } from 'react';
import {
  StatusBar,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Item } from '../../components/Item';
import { Backdrop } from '../../components/Backdrop';
import { EmptyItem } from '../../components/EmptyItem';
import { tArtworks } from '../../app/types/artwork.types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');

const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;

interface FavoriteListProps {
  art: tArtworks[]
}

export function FavoriteList({ art }: FavoriteListProps) {

  const scrollX = useRef(new Animated.Value(0)).current;
  const [fullSize, setFullSize] = useState<number | null>(null);
  const [middleIndex, setMiddleIndex] = useState<number | null>(null);

  const calculateMiddleIndex = (offset: number) => {
    const index = Math.round(offset / ITEM_SIZE);
    return index;
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
    },
  );
  const onScrollEnds = (event: any) => {
    setMiddleIndex(calculateMiddleIndex(event.nativeEvent.contentOffset.x));
  };

  return (
    <View style={styles.container}>
      <Backdrop art={art} scrollX={scrollX} itemSize={ITEM_SIZE} />
      <StatusBar hidden />
      <Animated.FlatList
        scrollEnabled={fullSize ? false : true}
        showsHorizontalScrollIndicator={false}
        data={art}
        keyExtractor={item => item.id.toString()}
        horizontal
        bounces={false}
        onMomentumScrollEnd={onScrollEnds}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ alignItems: 'center' }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          return item.id == 'empty-left' || item.id == 'empty-right' ? (
            <EmptyItem itemSize={ITEM_SIZE} fullSize={fullSize} />
          ) : (
            <Item
              {...{ scrollX, setFullSize, fullSize, index, middleIndex }}
              spacing={SPACING}
              data={item}
              itemSize={ITEM_SIZE}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey"
  },
  favorites: {
    position: "absolute",
    top: height * 0.01,
    right: width * 0.02,
  },
});
