import React from 'react';
import Navigator from './navigators/Navigators';
import {MainProvider} from './contexts/MainContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <MainProvider>
        <Navigator />
      </MainProvider>
    </SafeAreaProvider>
  );
};

export default App;
