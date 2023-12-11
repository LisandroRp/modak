import React, { useEffect, useRef, useState } from 'react';
import {
  StatusBar,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Item } from '../../components/Item';
import { Backdrop } from '../../components/Backdrop';
import { EmptyItem } from '../../components/EmptyItem';
import { tArtworks } from '../../app/types/artwork.types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ActivityIndicator } from 'react-native';

const { width, height } = Dimensions.get('window');

const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;

const starFill = require("../../app/images/star-fill.png")

interface ArtworkListProps {
  art: tArtworks[];
  nextPage: () => void;
  navigation: NativeStackNavigationProp<{}, string, undefined>;
}

export function ArtworkList({ art, navigation, nextPage }: ArtworkListProps) {

  const scrollX = useRef(new Animated.Value(0)).current;
  const [isPaginating, setIsPaginating] = useState(false)
  const [fullSize, setFullSize] = useState<number | null>(null);
  const [middleIndex, setMiddleIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsPaginating(false)
  }, [art])

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

  const handleEndReached = () => {
    setIsPaginating(true)
    nextPage()
  }

  return (
    <View style={styles.container}>
      <Backdrop art={art} scrollX={scrollX} itemSize={ITEM_SIZE} />
      <StatusBar hidden />
      <Animated.FlatList
        onEndReached={handleEndReached}
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
      {isPaginating && <ActivityIndicator style={styles.loading} size={"large"} color={"white"} />}
      <TouchableOpacity onPress={() => navigation.navigate("Favorites" as never)} style={[styles.favorites, styles.shadow]}>
        <Image style={{ width: 40, height: 40 }} source={starFill} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  favorites: {
    backgroundColor: "white",
    borderRadius: 1000,
    padding: 10,
    position: "absolute",
    top: height * 0.02,
    right: width * 0.03,
  },
  loading: {
    position: "absolute",
    right: 10,
    bottom: height / 2
  },
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.22,
    shadowRadius: 10.24,
    elevation: 13
  }
});
