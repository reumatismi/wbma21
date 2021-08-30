import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Platform,
  ImageBackground,
  StatusBar,
} from 'react-native';
import List from './components/List';
import {Settings} from 'react-native-feather';

const image = {uri: 'http://placekitten.com/2041/1923'};

const App = () => {
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <StatusBar style="default" />
      <View style={styles.container}>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style="styles.headerImage"
        >
          <View style={styles.header}></View>
          <View style={styles.title}>
            <Text style={styles.text}>Tosi makee laatikko!</Text>
          </View>
          <Settings style={styles.settings} />
        </ImageBackground>
        <List />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  headerImage: {
    paddingBottom: 10,
  },
  header: {
    height: 300,
  },
  title: {
    backgroundColor: 'blue',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    width: 200,
    bottom: 20,
    opacity: 0.6,
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Optima-Italic',
  },
  droidSafeArea: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  settings: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 2,
    color: 'white',
  },
  statusBar: {
    backgroundColor: 'white',
  },
});

export default App;
