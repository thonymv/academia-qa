import React from 'react';
import { StatusBar,YellowBox} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/modules/login/login'
import Register from './src/modules/register/register'
import Home from './src/modules/home'

console.disableYellowBox = true
YellowBox.ignoreWarnings(['Warning:'])

StatusBar.setBackgroundColor('#212121')
StatusBar.setBarStyle('light-content')

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="Register" options={{ headerShown: false }}  component={Register} />
        <Stack.Screen name="home" options={{ headerShown: false }}  component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
