import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import Sections from './sections'
import Section from './section'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'native-base';
import Course from './course';
import Lesson from './lesson';

const Stack = createStackNavigator();

export default function Learn({navigation}) {
    return (
        <Stack.Navigator initialRouteName="sections" screenOptions={{
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
            <Stack.Screen
                name="sections"
                component={(props)=>(<Sections {...props} navigationTab={navigation} />)}
                options={{
                    title: 'Secciones'
                }}
            />
            <Stack.Screen
                name="section"
                component={Section}
                options={({ route, navigation }) => ({
                    title: route.params.name,
                    headerLeft: () => (
                        <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => {
                            navigation.goBack()
                        }}>
                            <Icon name={"arrowleft"} size={16} style={{ color: 'white' }} type={'AntDesign'} />
                        </TouchableOpacity>
                    ),
                    headerTitleStyle: {
                        fontWeight: 'normal',
                        fontSize: Dimensions.get('window').width * 0.035
                    }
                })}
            />
            <Stack.Screen
                name="course"
                component={Course}
                options={({ route, navigation }) => ({
                    title: route.params.name,
                    headerLeft: () => (
                        <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => {
                            navigation.goBack()
                        }}>
                            <Icon name={"arrowleft"} size={16} style={{ color: 'white' }} type={'AntDesign'} />
                        </TouchableOpacity>
                    ),
                    headerTitleStyle: {
                        fontWeight: 'normal',
                        fontSize: Dimensions.get('window').width * 0.035
                    }
                })}
            />
            <Stack.Screen
                name="lesson"
                component={Lesson}
                options={({ route, navigation }) => ({
                    title: route.params.name,
                    headerLeft: () => (
                        <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => {
                            navigation.goBack()
                        }}>
                            <Icon name={"arrowleft"} size={16} style={{ color: 'white' }} type={'AntDesign'} />
                        </TouchableOpacity>
                    ),
                    headerTitleStyle: {
                        fontWeight: 'normal',
                        fontSize: Dimensions.get('window').width * 0.035
                    }
                })}
            />
        </Stack.Navigator>
    );
}