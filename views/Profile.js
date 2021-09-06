import React, {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import {StyleSheet, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Image, Text} from 'react-native-elements';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';

const Profile = (props) => {
  const {isLoggedIn, user, setIsLoggedIn} = useContext(MainContext);
  const [avatar, setAvatar] = useState('https://placekitten.com/400/400');
  console.log('profile', isLoggedIn);
  console.log('Nimi?', user.username);

  const {getFilesByTag} = useTag();

  useEffect(() => {
    (async () => {
      const file = await getFilesByTag('avatar_' + user.user_id);
      console.log('file ', file);
      setAvatar(uploadsUrl + file.pop().filename);
    })();
  }, [user]);

  const logout = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
    // props.navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      <Image source={{uri: avatar}} style={{width: 300, height: 300}} />
      <Text style={styles.text}>{user.username}</Text>
      <Text style={styles.text}>{user.full_name}</Text>
      <Text style={styles.text}>{user.email}</Text>
      <Button title={'Logout'} onPress={logout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  text: {
    color: 'red',
    fontSize: 12,
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
