import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {View, Button, Alert} from 'react-native';
import FormTextInput from './FormTextInput';
import useSignUpForm from '../hooks/RegisterHooks';
import {MainContext} from '../contexts/MainContext';
import {useLogin, register} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterForm = ({navigation}) => {

  const {setUser, user, setIsLoggedIn} = useContext(MainContext);

  const {login} = useLogin();

  const doRegister = async () => {
    const serverResponse = await register(inputs);
    if (serverResponse) {
      Alert.alert(serverResponse.message);

      const loginServerResponse = await login(JSON.stringify(inputs));

      if (loginServerResponse) {
        Alert.alert(loginServerResponse.message);
        await AsyncStorage.setItem('userToken', loginServerResponse.token);
        setUser(loginServerResponse.user);
        console.log('user is: ', user);
        setIsLoggedIn(true);
      } else {
        Alert.alert('Login failed');
      }
    } else {
      Alert.alert('register failed');
    }
  };

  const {inputs, handleInputChange} = useSignUpForm();

  return (
    <View>
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="email"
        onChangeText={(txt) => handleInputChange('email', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
      />
      <Button title="Register!" onPress={doRegister} />
    </View>
  );
};

RegisterForm.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default RegisterForm;
