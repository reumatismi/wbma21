import React, {handleInputChange} from 'react';
import PropTypes from 'prop-types';
import {View, Button, TextInput} from 'react-native';
import Proptypes from 'prop-types';

const FormTextInput = ({style, ...otherProps}) => {
  return <TextInput style={[styles.textInput, style]} {...otherProps} />;
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

export default FormTextInput;
