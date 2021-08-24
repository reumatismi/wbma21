import React from 'react';
import { StyleSheet, View, SafeAreaView, Platform } from "react-native";
import List from "./components/List";

const App = () => {
  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <View style={styles.container}>
        <List />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  droidSafeArea: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});

export default App;
