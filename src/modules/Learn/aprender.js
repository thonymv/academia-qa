import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Storage from '../../model/Storage';
import Section from '../../components/learn/section'

const Stack = createStackNavigator();

function learn() {
    Storage.getData().then((data) => {

    })
    Storage.getToken().then((token) => {

    })
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ width: Dimensions.get('window').width * 0.975 }}>
                <Section />
                <Section />
                <Section />
            </View>
        </View>
    );
}

export default function Learn() {
    return (
        <Stack.Navigator initialRouteName="Aprender" screenOptions={{
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
            <Stack.Screen name="Aprender" component={learn} />
        </Stack.Navigator>
    );
}