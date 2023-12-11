import { StyleSheet, Text, View } from "react-native";


export const EmptyState = () => (
  <View style={styles.loadingContainer}>
    <View style={styles.container}>
      <Text style={styles.paragraph}>Add Artwork {'\n'} to {'\n'} your Favorites</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: "white",
    borderRadius: 20
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});
