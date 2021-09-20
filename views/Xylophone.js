import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity, Text, StyleSheet, Button} from 'react-native';
import {Audio} from 'expo-av';
import {
  NoteOne,
  NoteTwo,
  NoteThree,
  NoteFour,
  NoteFive,
  NoteSix,
  NoteSeven,
} from '../constants/Colors';

const Xylophone = ({route}) => {
  Audio.setIsEnabledAsync(true);

  const {params} = route;

  const xyloSounds = {
    one: require('../assets/sounds/Alarm01.wav'),
    two: require('../assets/sounds/Alarm02.wav'),
    three: require('../assets/sounds/Alarm03.wav'),
    four: require('../assets/sounds/Alarm04.wav'),
    five: require('../assets/sounds/Alarm05.wav'),
    six: require('../assets/sounds/Alarm06.wav'),
    seven: require('../assets/sounds/Alarm07.wav'),
  };

  const randomSounds = () => {
    const random = Math.floor(Math.random() * 10);
    let result = 'one';
    console.log('randomSounds', random);
    switch (random) {
      case 1:
        result = 'one';
        break;
      case 2:
        result = 'two';
        break;
      case 3:
        result = 'three';
        break;
      case 4:
        result = 'four';
        break;
      case 5:
        result = 'five';
        break;
      case 6:
        result = 'six';
        break;
      default:
        result = 'seven';
        break;
    }

    console.log(result);
    return result;
  };

  const handlePlaySound = async (note) => {
    const soundObject = new Audio.Sound();

    try {
      const source = xyloSounds[note];
      await soundObject.loadAsync(source);
      await soundObject
        .playAsync()
        .then(async (playbackStatus) => {
          setTimeout(() => {
            soundObject.unloadAsync();
          }, playbackStatus.playableDurationMillis);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: NoteOne}]}
          onPress={() => handlePlaySound('one')}
        >
          <Text style={styles.buttonText}>Note 1</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: NoteTwo}]}
          onPress={() => handlePlaySound('two')}
        >
          <Text style={styles.buttonText}>Note 2</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: NoteThree}]}
          onPress={() => handlePlaySound('three')}
        >
          <Text style={[styles.buttonText, {color: 'black'}]}>Note 3</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: NoteFour}]}
          onPress={() => handlePlaySound('four')}
        >
          <Text style={styles.buttonText}>Note 4</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: NoteFive}]}
          onPress={() => handlePlaySound('five')}
        >
          <Text style={styles.buttonText}>Note 5</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: NoteSix}]}
          onPress={() => handlePlaySound('six')}
        >
          <Text style={styles.buttonText}>Note 6</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: NoteSeven}]}
          onPress={() => handlePlaySound(randomSounds())}
        >
          <Text style={styles.buttonText}>Note 7</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  },
  buttonContainer: {
    height: 40,
    margin: 5,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Xylophone;
