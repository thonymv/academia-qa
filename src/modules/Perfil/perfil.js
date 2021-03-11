import React from 'react';
import Profile from './profile'
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import { Icon } from 'native-base';
import Course from '../Learn/course';

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
        </Stack.Navigator>
    );
}
