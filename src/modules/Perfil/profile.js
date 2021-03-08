import React from 'react';
import { StyleSheet, Text, View, Button , Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class Profile extends React.Component {

    constructor(props){
        super(props)
    }

    render(){
        return (
            <View style={{
                height:Dimensions.get('window').height*0.2,
                backgroundColor:'#404040',
                width:Dimensions.get('window').width,
                alignItems:'center',
            }}>
                <View style={{
                    backgroundColor:'white',
                    borderRadius:Dimensions.get('window').height*0.1,
                    position:'absolute',
                    marginTop:Dimensions.get('window').height*0.1
                }}>
                    <Icon 
                        name={"user-circle"} 
                        size={Dimensions.get('window').height*0.2} 
                        color='#d5d5d5'
                    />
                </View>
            </View>
        );
    }

}