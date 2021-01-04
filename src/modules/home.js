import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';
import Profile from './Perfil/perfil'
import Learn from './Learn/aprender'
import Payment from './payment/payment'

const Tab = createBottomTabNavigator();

export default function Home() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    var iconName;
                    var type;
                    switch (route.name) {
                        case 'Perfil':
                            iconName = focused ? 'user' : 'user';
                            break;
                        case 'Aprender':
                            iconName = focused ? 'code-braces' : 'code-braces';
                            type = 'MaterialCommunityIcons'
                            break;
                        case 'Suscripción':
                            iconName = focused ? 'payment' : 'payment';
                            type = 'MaterialIcons'
                            break;
                        default:
                            break;
                    }
                    return <Icon name={iconName} size={size} style={{ color: color }} type={type ? type : 'AntDesign'} />
                },
            })}
            tabBarOptions={{
                activeTintColor: '#00a3fc',
                inactiveTintColor: 'gray',
                style: {
                    height: Dimensions.get('window').height * 0.08,
                    paddingBottom: Dimensions.get('window').height * 0.01,
                },
            }}

        >
            <Tab.Screen name="Aprender" component={Learn} />
            <Tab.Screen name="Suscripción" component={Payment} />
            <Tab.Screen name="Perfil" component={Profile} />
        </Tab.Navigator>
    );
}