import { View } from 'native-base';
import React from 'react'
import { TextInput, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default class Input extends React.Component {
    constructor({ value, onChangeText, placeholder, password, style, icon, changeFocus}) {
        super({ value, onChangeText, placeholder, password, style, icon, changeFocus})
        this.state = {
            focus: false
        }
    }

    render() {
        const styles = StyleSheet.create({
            styleFocus: {
                borderWidth: 1,
                borderColor: '#00a3fc',
                color: '#00a3fc'
            },
            styleUnFocus: {
                borderWidth: 0,
                borderColor: 'gray',
                color: 'gray'
            },
            shadow: {
                shadowColor: '#000000',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 5,
                shadowOpacity: 1.0,
                elevation: 5
            }
        })
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={[
                    styles.shadow,
                    this.state.focus ? styles.styleFocus : styles.styleUnFocus,
                    this.props.style,
                    {
                        borderRadius: 25,
                        backgroundColor: 'white',
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        flexDirection: 'row'
                    }
                ]}
                onPress={()=>{if(this.input){this.input.blur(); this.input.focus()}}}
            >
                <Icon name={this.props.icon ? this.props.icon : null} size={25} color={this.state.focus ? "#00a3fc" : "gray"} />
                <TextInput
                    ref={(input) => { this.input = input }}
                    style={{ marginLeft: 10 , color:this.state.focus ? '#00a3fc' : 'gray'}}
                    onFocus={() => { this.setState({ focus: true });if(this.props.changeFocus){this.props.changeFocus(true);}}}
                    onBlur={() => { this.setState({ focus: false });if(this.props.changeFocus){this.props.changeFocus(false);}}}
                    placeholderTextColor={this.state.focus ? '#00a3fc' : 'gray'}
                    secureTextEntry={this.props.password}
                    onChangeText={text => { this.props.onChangeText ? this.props.onChangeText(text) : null }}
                    value={this.props.value ? this.props.value : null}
                    placeholder={this.props.placeholder ? this.props.placeholder : null}
                />
            </TouchableOpacity>
        )
    }
}