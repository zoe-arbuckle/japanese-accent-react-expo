import 'react-native-gesture-handler';

import * as React from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './app/screens/HomeScreen';
import LessonScreen from './app/screens/LessonScreen';
import PracticeScreen from './app/screens/PracticeScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Lesson" component={LessonScreen} />
        <Stack.Screen name="Practice" component={PracticeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;