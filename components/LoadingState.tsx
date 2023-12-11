import { StyleSheet, Text, View, ActivityIndicator } from "react-native";


export const LoadingState = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size={"large"} color={"white"} />
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
    justifyContent: 'center',
  },
});
