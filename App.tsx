import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import StackNavigator from './navigation/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: 'black' }} />
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
