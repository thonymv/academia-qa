import React from 'react'
import { StyleSheet, View, Image, Dimensions, TouchableOpacity, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import { Input, ButtonLogin} from '../../components/general'
import { Button, Spinner, Text, Toast, Root } from 'native-base'
import Users from '../../model/Users'
import Storage from '../../model/Storage';
import { StackActions } from '@react-navigation/native';
export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "matias@gmail.com",
            password: '12345678',
            load: false
        }
        this.width = Dimensions.get('window').width
        this.users = new Users()
        Storage.getToken().then((token) => {
            if (token) {
                this.users.logged().then((response) => {
                    if (response == "ok") {
                        this.props.navigation.dispatch(
                            StackActions.replace('home')
                        );
                    } else {
                        this.setState({ load: true })
                    }
                })
            } else {
                this.setState({ load: true })
            }
        })
    }

    getWidth(height) {
        let source = resolveAssetSource(require('../../../assets/general/icon_login.png'))
        return (height * source.width) / source.height
    }

    login() {
        if (this.state.load) {
            this.setState({ load: false })
            this.users.login(this.state.email, this.state.password).then(data => {
                if (data.res && data.token && data.name) {
                    Storage.storeData({ name: data.name }).then(() => {
                        Storage.storeToken(data.token).then(() => {
                            Toast.show({
                                text: "Usuario logueado correctamente",
                                buttonText: "Ok",
                                duration: 5000,
                                type: "success"
                            })
                            this.props.navigation.dispatch(
                                StackActions.replace('home')
                            );
                        })
                            .catch(err => {
                                this.setState({ load: true })
                                console.error(err);
                            })
                    })
                        .catch(err => {
                            this.setState({ load: true })
                            console.error(err);
                        })
                } else {
                    this.setState({ load: true })
                    Toast.show({
                        text: "Usuario o contraseña incorrecta",
                        buttonText: "Ok",
                        duration: 5000,
                        type: "danger"
                    })
                }
            })
                .catch(err => {
                    this.setState({ load: true })
                    console.error(err);
                    Toast.show({
                        text: "Ha ocurrido un error de comunicación, verifique su conexión a internet o intente mas tarde",
                        buttonText: "Ok",
                        duration: 5000,
                        type: "danger"
                    })
                })
        }
    }

    render() {
        if (!this.state.load) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner color='blue' />
                    <Text style={{ fontSize: Dimensions.get('window').width * 0.03 }}>Cargando...</Text>
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
                        style={{ height: Dimensions.get('window').height*0.265 , width:this.getWidth(Dimensions.get('window').height*0.265)}}
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
                    <ButtonLogin
                        onPress={()=>{
                            
                        }}
                        style={{
                            marginTop:Dimensions.get('window').height*0.05
                        }}
                    />
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