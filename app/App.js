/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

if (__DEV__) {
  import('./src/config/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';

import {UserProvider} from './src/contexts/UserContext';
import {MainStack} from './src/stacks/MainStack';

export default function () {
  return (
    <UserProvider>
      <StatusBar backgroundColor="#63c2d1" />
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </UserProvider>
  );
}
