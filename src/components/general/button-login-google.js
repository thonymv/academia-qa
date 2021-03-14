import React from 'react'
import { Text, Dimensions, TouchableOpacity } from 'react-native';
import { View } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinkedInModal from 'react-native-linkedin'

export default class ButtonLogin extends React.Component {

    constructor({ onPress, style }) {
        super({ onPress, style })
        this.state = {

        }
    }

    linkedRef = React.createRef()

    render() {
        return (
            <LinkedInModal
                ref={this.linkedRef}
                clientID="78ikxkp55pijkd"
                clientSecret="ofxarIbidMJ8UiIf"
                redirectUri="https://adprosoft.com/"
                onSuccess={token => console.log(token)}
                onError={err => console.error("error en: "+err.message)}
                renderButton={() => {
                    return (
                        <TouchableOpacity
                            onPress={()=>{this.linkedRef.current.open()}}
                            style={[
                                {
                                    width: '100%',
                                    borderRadius: 10,
                                    backgroundColor: '#30374c',
                                    paddingVertical: Dimensions.get('window').height*0.015,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                },
                                this.props.style
                            ]}
                        >
                            <Icon
                                name="google-plus-square"
                                size={Dimensions.get('window').height*0.035}
                                color="white"
                            />
                            <Text style={{
                                marginLeft: 5,
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: Dimensions.get('window').height*0.0175
                            }}>
                                Iniciar sesión con Google
                            </Text>
                        </TouchableOpacity>
                    )
                }}
            />
        )
    }

}