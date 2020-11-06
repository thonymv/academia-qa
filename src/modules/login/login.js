import React from 'react'
import { StyleSheet, View, Image, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import { Input } from '../../components/general'
import { Button, Text } from 'native-base'
export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //email:"user@example.com",
            email: '',
            password: '',
        }
        this.width = Dimensions.get('window').width
    }
    getHeight(width) {
        let source = resolveAssetSource(require('../../../assets/general/icon_login.png'))
        return (width * source.height) / source.width
    }

    login(){
        this.props.navigation.navigate('home')
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior="position"
                enabled
                style={{ flex: 1, alignItems: 'center', backgroundColor: '#efefef' }}
                keyboardVerticalOffset={-Dimensions.get('window').height*0.2}
            >
                <View style={{
                    width:Dimensions.get('window').width*0.7,
                    height:Dimensions.get('window').height*0.95,
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
                        password={(this.state.password.length > 0)}
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
                        onPress={()=>{
                            this.login()
                        }}
                    >
                        <Text> Entrar </Text>
                    </Button>
                </View>
                <View style={{
                    width: Dimensions.get('window').width * 0.7,
                    height:Dimensions.get('window').height*0.05,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems:'flex-end'
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