import React from 'react';
import Navigator from './navigators/Navigators';
import {MainProvider} from './contexts/MainContext';
import {KeyboardAvoidingView} from 'react-native';

const App = () => {
  return (
    <MainProvider>
      <Navigator />
    </MainProvider>
  );
};

export default App;
