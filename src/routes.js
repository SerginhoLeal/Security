import React from 'react';
import {StatusBar} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Pages/Home';
import Adicionar from './Pages/Adicionar';
import Incidents from './Pages/Incidents';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden={true}/> 
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Adicionar" component={Adicionar} />
        <Stack.Screen name="Incidents" component={Incidents} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;