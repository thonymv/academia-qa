import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function profile() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold' , fontSize:20}}>Perfil!</Text>
        </View>
    );
}

export default function Profile() {
    return (
        <Stack.Navigator initialRouteName="Perfil" screenOptions={{
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
            <Stack.Screen name="Perfil" component={profile} />
        </Stack.Navigator>
    );
}
