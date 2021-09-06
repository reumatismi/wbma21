import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, SafeAreaView, Platform, StatusBar} from 'react-native';
import List from '../components/List';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <List navigation={navigation} />
      <StatusBar style="auto" />
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
  androidSafeArea: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
