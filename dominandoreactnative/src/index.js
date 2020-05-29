import React from 'react';
import { StatusBar } from 'react-native';
import './config/ReactotronConfig';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#002FA7" />
      <Routes />
    </NavigationContainer>
  );
}
