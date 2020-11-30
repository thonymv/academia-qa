import React from 'react';
import { StatusBar, YellowBox, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/modules/login/login'
import Register from './src/modules/register/register'
import Home from './src/modules/home'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons';
import OneSignal from 'react-native-onesignal';

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
    OneSignal.setLogLevel(6, 0);

    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
    OneSignal.init("10ad6894-368b-4aa6-b75c-8b8efadbe1a9", { kOSSettingsKeyAutoPrompt: false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption: 2 });
    OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

    // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
    //OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.setState({ loading: false })
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
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
