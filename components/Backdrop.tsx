import { View, FlatList, Image, Animated, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const BACKDROP_HEIGHT = height;
interface BackdropProps {
  art: any,
  scrollX: any,
  itemSize: any
}

export const Backdrop = ({ art, scrollX, itemSize }: BackdropProps) => {
  return (
    <View style={{ height: BACKDROP_HEIGHT, width: width, position: 'absolute' }}>
      <FlatList
        data={art}
        keyExtractor={item => item.id + '-backdrop'}
        removeClippedSubviews={false}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => {
          if (!item.thumbnail?.lqip) {
            return null;
          }
          const translateX = !scrollX ? undefined : scrollX.interpolate({
            inputRange: [(index - 2) * itemSize, (index - 1) * itemSize - 10],
            outputRange: [0, width],
          });
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: 'absolute',
                width: translateX,
                height,
                overflow: 'hidden',
              }}>
              <Image
                source={{ uri: item.thumbnail?.lqip }}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  position: 'absolute',
                }}
              />
            </Animated.View>
          );
        }}
      />
    </View>
  );
};
