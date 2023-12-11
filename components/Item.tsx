import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import { tArtworks } from '../app/types/artwork.types';
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { addToFavorites } from '../app/helpers/addFavorite';
import { removeFavorite } from '../app/helpers/removeFavorite';

interface ItemProps {
  index: number;
  spacing: number;
  data: tArtworks;
  itemSize: number;
  scrollX: Animated.Value;
  fullSize: number | null;
  setFullSize: any;
  middleIndex: any;
}
const star = require("../app/images/star.png")
const starFill = require("../app/images/star-fill.png")

const { width, height } = Dimensions.get('window');

export const Item = React.memo(
  ({
    scrollX,
    spacing,
    fullSize,
    data,
    itemSize,
    index,
    setFullSize,
    middleIndex,
  }: ItemProps) => {
    const [isFavorite, setIsFavorite] = useState<boolean | undefined>(data.isFavorite);
    const attributes = [
      { id: 1, title: 'Artist', info: data.artist_display, lines: 2 },
      {
        id: 2,
        title: 'Information',
        info: data.provenance_text,
        lines: undefined,
      },
      { id: 3, title: 'Started', info: data.date_start, lines: 2 },
      { id: 4, title: 'Ended', info: data.date_end, lines: 2 },
      { id: 5, title: 'Origin', info: data.place_of_origin, lines: 2 },
      { id: 6, title: 'Dimensions', info: data.dimensions, lines: 2 },
      { id: 7, title: 'Material', info: data.material_titles, lines: 2 },
      { id: 8, title: 'Gallery', info: data.gallery_title, lines: 2 },
    ];;
    const NUMBER_OF_LINES = fullSize == data.id ? 2 : 1;;
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      setIsFavorite(data.isFavorite)
    }, [data])

    useEffect(() => {
      Animated.timing(animatedValue, {
        toValue: fullSize == data.id ? 1 : 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }, [fullSize]);;

    const inputRange = [
      (index - 2) * itemSize,
      (index - 1) * itemSize,
      index * itemSize,
    ];

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [
        (index % 2 ? 1 : -1) * -150,
        0,
        (index % 2 ? -1 : 1) * -150,
      ],
      extrapolate: 'clamp',
    });

    const dynamicWidth = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [itemSize, width],
    });

    const dynamicHeigh = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [itemSize + 120, height - 130],
    });

    const handleFavorite = () => {
      if (isFavorite)
        removeFavorite(data.id).then(() => setIsFavorite(false))
      else
        addToFavorites(data, setIsFavorite).then(() => setIsFavorite(true))
    }

    return (
      <Animated.View style={[{ width: dynamicWidth }]}>
        <Animated.View
          style={[
            styles.container,
            styles.shadow,
            {
              height: dynamicHeigh,
              marginHorizontal: spacing,
              padding: spacing * 2,
              transform: [{ translateY }],
            },
          ]}>
          <Text style={styles.title} numberOfLines={NUMBER_OF_LINES}>
            {data.title}
          </Text>
          <TouchableOpacity
            style={[styles.posterImage, { height: itemSize }]}
            activeOpacity={middleIndex + 1 != index ? 1 : 0.5}
            onPress={() => {
              middleIndex + 1 == index &&
                setFullSize(fullSize ? null : data.id);
            }}>
            <Image
              alt={data.alt_title}
              source={{
                uri: `https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg`,
              }}
              style={[styles.posterImage, { height: itemSize }]}
            />
            <TouchableOpacity onPress={handleFavorite} style={styles.favorites}>
              <Image style={{ width: 40, height: 40 }} source={isFavorite ? starFill : star} />
            </TouchableOpacity>
          </TouchableOpacity>
          {!fullSize && (
            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
              <Text style={styles.information} numberOfLines={NUMBER_OF_LINES}>
                <Text style={styles.desTitle}>Artist:</Text>{' '}
                {data.artist_display}
              </Text>
            </View>
          )}
          <View style={styles.description}>
            <FlatList
              data={attributes}
              scrollEnabled
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => {
                if (item.info && item.info?.length != 0) {
                  return (
                    <View style={{ flexDirection: "row", marginBottom: 10 }}>
                      <Text style={styles.information} numberOfLines={item.lines}>
                        <Text style={styles.desTitle}>
                          {item.title}
                        </Text>: {item.info}
                      </Text>
                    </View>
                  )
                }
                else return <View />;
              }}
            />
          </View>
        </Animated.View>
      </Animated.View>
    );
  },
);;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 34,
    overflow: 'hidden',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    flex: 1,
    width: '100%',
    marginTop: 20,
    justifyContent: 'flex-start',
  },
  desTitle: {
    textDecorationLine: 'underline',
    fontWeight: '700',
    fontSize: 20,
  },
  information: {
    fontSize: 18,
  },
  posterImage: {
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
  favorites: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.00,
    elevation: 24
  }
});
