import React from 'react'
import { StyleSheet, View, Image, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import { Input } from '../../components/general'
import { Button, Spinner, Text } from 'native-base'
import Users from '../../model/Users'
import Storage from '../../model/Storage';
import { StackActions } from '@react-navigation/native';

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "anthony.mart996@gmail.com",
            password: '12345678',
            load:false
        }
        this.width = Dimensions.get('window').width
        this.users = new Users()
        Storage.getToken().then((token)=>{
            if (token) {
                this.users.logged().then((response)=>{
                    if (response == "ok") {
                        this.props.navigation.dispatch(
                            StackActions.replace('home')
                        );
                    }else{
                        this.setState({load:true})
                    }
                })
            }else{
                this.setState({load:true})
            }
        })
    }

    getHeight(width) {
        let source = resolveAssetSource(require('../../../assets/general/icon_login.png'))
        return (width * source.height) / source.width
    }

    login() {
        this.users.login(this.state.email, this.state.password).then(data => {
            Storage.storeData({ name: data.name }).then(() => {
                Storage.storeToken(data.token).then(() => {
                    this.props.navigation.dispatch(
                        StackActions.replace('home')
                    );
                })
            })
        })
    }

    render() {
        if (!this.state.load) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner color='blue' />
                    <Text style={{ fontSize: Dimensions.get('window').width*0.03}}>Cargando...</Text>
                </View>
            );
        }
        return (
            <KeyboardAvoidingView
                behavior="position"
                enabled
                style={{ flex: 1, alignItems: 'center', backgroundColor: '#efefef' }}
                keyboardVerticalOffset={-Dimensions.get('window').height * 0.2}
            >
                <View style={{
                    width: Dimensions.get('window').width * 0.7,
                    height: Dimensions.get('window').height * 0.95,
                    justifyContent: 'center'
                }}>
                    <Image
                        source={require('../../../assets/general/icon_login.png')}
                        style={{ height: this.getHeight(this.width * 0.7), width: this.width * 0.7 }}
                    />
                    <View style={{
                        paddingTop: 20,
                        paddingBottom: 40
                    }}>
                        <Text style={{ color: 'gray', textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
                            Bienvenido a la Academia
                    </Text>
                    </View>
                    <Input
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        placeholder={"Correo electrónico"}
                        icon='user'
                    />
                    <Input
                        style={{ marginTop: 20 }}
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        placeholder={"Contraseña"}
                        password={true}
                        icon='lock'
                    />
                    <View style={{
                        width: Dimensions.get('window').width * 0.7
                    }}>
                        <TouchableOpacity
                            style={{
                                alignSelf: 'flex-end',
                                paddingVertical: 10,
                                paddingLeft: 20
                            }}
                        >
                            <Text
                                style={{
                                    color: '#404040',
                                    fontWeight: 'bold',
                                    fontSize: 10
                                }}
                            >
                                ¿Olvidaste tu contraseña?
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <Button
                        style={{
                            backgroundColor: "#404040",
                            alignSelf: 'center',
                            marginTop: 20,
                            borderRadius: 25,
                            paddingHorizontal: 20
                        }}
                        onPress={() => {
                            this.login()
                        }}
                    >
                        <Text> Entrar </Text>
                    </Button>
                </View>
                <View style={{
                    width: Dimensions.get('window').width * 0.7,
                    height: Dimensions.get('window').height * 0.05,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-end'
                }}>
                    <View
                        style={{
                            paddingVertical: 10,
                        }}
                    >
                        <Text
                            style={{
                                color: '#404040',
                                fontWeight: 'bold',
                                fontSize: 12
                            }}
                        >
                            ¿Aún no tienes una cuenta?
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            paddingVertical: 10,
                            marginLeft: 5
                        }}
                    >
                        <Text
                            style={{
                                color: '#00a3fc',
                                fontWeight: 'bold',
                                fontSize: 12
                            }}
                        >
                            Registrate aquí
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}