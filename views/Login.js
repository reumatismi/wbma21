import React, {useEffect, useContext, useState} from 'react';
import {StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import {baseUrl} from '../utils/variables';
import {Text, Button} from 'react-native-elements';

const Login = ({navigation}) => {
  const {setUser, setIsLoggedIn} = useContext(MainContext);
  const {checkToken} = useUser();
  const [registerFormToggle, setRegisterFormToggle] = useState(true);
  const [buttonTitleToggle, setTitleFormToggle] = useState(true);

  const getToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await fetch(baseUrl + 'users/user', {
        method: 'GET',
        headers: {
          'x-access-token': userToken,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setUser(json);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (e) {
      console.log('error on token', e);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {registerFormToggle ? (
        <LoginForm navigation={navigation} />
      ) : (
        <RegisterForm navigation={navigation} />
      )}
      <Button
        title={
          registerFormToggle
            ? 'No acccount? Kick my ass!'
            : 'Herbivore muthafucka!'
        }
        onPress={() => {
          setRegisterFormToggle(!registerFormToggle);
        }}
      ></Button>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
