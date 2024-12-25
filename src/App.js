// src/App.js
import React from 'react';
import AppNavigator from './AppNavigator';
import {NotificationProvider} from './components/NotificationContext';

const App = () => {
  return <AppNavigator />;
};

export default App;
