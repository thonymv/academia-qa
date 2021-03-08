import React from 'react';
import Profile from './profile'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function ProfileModule() {
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
            <Stack.Screen name="Perfil" component={Profile} />
        </Stack.Navigator>
    );
}
