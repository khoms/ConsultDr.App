import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthStack from './Screens/AuthStack';
import {AuthProvider} from './Provider/AuthProvider';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AuthStack />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
