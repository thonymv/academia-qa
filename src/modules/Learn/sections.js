import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, ScrollView, RefreshControl, ToastAndroid, TouchableOpacity } from 'react-native';
import SectionComponent from '../../components/learn/section'
import { Sections, getInstanceArraySection } from '../../model/Sections'
import { Spinner } from 'native-base'
import { Icon, Toast } from 'native-base';
import Users from '../../model/Users';
import Storage from '../../model/Storage';
import { StackActions } from '@react-navigation/native';


export default class SectionsComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sections: getInstanceArraySection(),
            refresh: false,
            load: false
        }
        this.props.navigation.addListener('focus', () => {
        })
        this.sections = new Sections()
        this.sections.get().then((sections) => {
            this.setState({ sections, load: true })
        }).catch((err) => {
            this.setState({ load: true })
            console.error(err);
            ToastAndroid.show('Hubo un error al cargar la lista de contenidos, intente de nuevo', ToastAndroid.SHORT)
        })
        this.usersModel = new Users()
        this.props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ paddingLeft: 12.5, transform: [{ rotateY: '180deg' }] }} onPress={() => {
                    if (this.state.load) {
                        this.setState({ load: false })
                        this.usersModel.logout().then(data => {
                            if (data.res) {
                                console.log("Sesión cerrada correctamente en el servidor");
                            } else {
                                console.error("El servidor no pudo completar el cierre de sesión");
                            }
                            Storage.deleteToken().then(res => console.log("delete token res: " + res)).catch(err => console.error("delete token error: " + err))
                            Toast.show({
                                text: "Se ha cerrado la sesión correctamente",
                                buttonText: "Ok",
                                duration: 5000,
                                type:'success'
                            })
                            this.props.navigation.dispatch(
                                StackActions.replace('Login')
                            );
                        }).catch(err => {
                            Toast.show({
                                text: "Ha ocurrido un error inesperado al cerrar la sesión",
                                buttonText: "Ok",
                                duration: 5000,
                                type: "danger"
                            })
                            this.setState({ load: true })
                            console.error("error logout: " + err);
                        })
                    }
                }}>
                    <Icon name={"logout"} size={16} style={{ color: 'white' }} type={'MaterialCommunityIcons'} />
                </TouchableOpacity>
            )
        });
    }
    componentDidMount(){
    }
    render() {

        if (!this.state.load) {
            this.props.navigation.setOptions({headerShown: false})
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner color='blue' />
                    <Text style={{ fontSize: Dimensions.get('window').width * 0.03 }}>Cargando...</Text>
                </View>
            );
        }

        this.props.navigation.setOptions({headerShown: true})

        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <ScrollView
                    contentContainerStyle={{ width: Dimensions.get('window').width * 0.998 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refresh}
                            onRefresh={() => {
                                this.setState({ refresh: true })
                                this.sections.get().then((sections) => {
                                    this.setState({ sections, refresh: false })
                                })
                                    .catch((err) => {
                                        console.error(err);
                                        this.setState({ refresh: false })
                                        ToastAndroid.show('Hubo un error al cargar la lista de contenidos, intente de nuevo', ToastAndroid.SHORT)
                                    })
                            }}
                        />
                    }
                >
                    {this.state.sections.map((section) => {
                        return <SectionComponent navigation={this.props.navigation} section={section} />
                    })}
                </ScrollView>
            </View>
        );
    }
}