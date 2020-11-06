import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function payment() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold' , fontSize:20}}>Suscripción!</Text>
        </View>
    );
}

export default function Payment() {
    return (
        <Stack.Navigator initialRouteName="Suscripción" screenOptions={{
            headerStyle: {
                backgroundColor: '#404040',
                color: 'white'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerLeft: null
        }}>
            <Stack.Screen name="Suscripción" component={payment} />
        </Stack.Navigator>
    );
}