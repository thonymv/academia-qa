import React from 'react';
import { StatusBar, YellowBox , View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/modules/login/login'
import Register from './src/modules/register/register'
import Home from './src/modules/home'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons';

console.disableYellowBox = true
YellowBox.ignoreWarnings(['Warning:'])

StatusBar.setBackgroundColor('#212121')
StatusBar.setBarStyle('light-content')

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.setState({ loading: false })
  }

  render() {

    if (this.state.loading) {
      return (
        <View></View>
      );
    }

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
          <Stack.Screen name="Register" options={{ headerShown: false }} component={Register} />
          <Stack.Screen name="home" options={{ headerShown: false }} component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
