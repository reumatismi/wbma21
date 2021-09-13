import React from 'react';
import PropTypes from 'prop-types';
import {Input} from 'react-native-elements';

const FormTextInput = ({style, error, label, ...otherProps}) => {
  return (
    <Input
      errorStyle={{color: 'red'}}
      errorMessage={error}
      style={[style]}
      {...otherProps}
    />
  );
};

FormTextInput.propTypes = {
  style: PropTypes.object,
};

export default FormTextInput;
