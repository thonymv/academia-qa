import React from 'react';
import { Text, View , Dimensions, TouchableOpacity} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Courses from './courses'
import Course from '../Learn/course'
import Lesson from '../Learn/lesson'
import { Icon } from 'native-base';

const Stack = createStackNavigator();

export default function MyCoursesTab({navigation}) {
    return (
        <Stack.Navigator initialRouteName="Mis Cursos" screenOptions={{
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
            <Stack.Screen name="Mis Cursos" component={props=>(<Courses {...props} navigationTab={navigation} />)} />
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