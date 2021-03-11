import React from 'react'
import { View, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import { Card, CardItem, Body, Button, Text, Left, Right, Spinner , Toast, Icon} from "native-base";
import ItemCourse from '../../components/learn/itemCourse'
import Users from '../../model/Users';
import Storage from '../../model/Storage';
import {MIN_PASSED} from '../../config/config'
import { StackActions } from '@react-navigation/native';

export default class Section extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            section:null
        }
        this.fontSize = Dimensions.get('window').width*0.03
        this.percentRadius = 8.5
        var userModel = new Users()
        userModel.current().then(user=>{
            this.setState({
                section:{courses:user.courses}
            })
        })
        this.usersModel = new Users()
        this.props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ paddingLeft: 12.5, transform: [{ rotateY: '180deg' }] }} onPress={() => {
                    if (this.state.section) {
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

    item = (course) => {
        var lessons = 0
        var lessonsPassed = 0
        course.modules.forEach(module => {
            module.lessons.forEach(lesson => {
                ++lessons
                if (lesson.percent >= MIN_PASSED) {
                    ++lessonsPassed
                }
                console.log(lesson);
            })
        });
        var percent = 100 * lessonsPassed / lessons
        return (
            <TouchableOpacity
                style={{}}
                onPress={() => {
                    this.props.navigation.navigate('course', {
                        name: course.name,
                        id: course.id
                    });
                }}
            >
                <Card>
                    <CardItem >
                        <Left>
                            <ItemCourse
                                onPress={() => {
                                    this.props.navigation.navigate('course', {
                                        name: course.name,
                                        id: course.id
                                    });
                                }}
                                percent={percent}
                                radius={Dimensions.get('window').width * this.percentRadius / 100}
                                borderWidth={3}
                                img={course.image}
                            />
                            <View style={{alignSelf:'flex-start',marginTop:Dimensions.get('window').height*0.0075}}>
                                <Text style={{ fontSize: this.fontSize , alignSelf:'flex-start'}}>{course.name}</Text>
                                <Text style={{ fontSize: this.fontSize ,color:"gray"}}>Módulos:{course.modules.length} / Lecciones:{lessons}</Text>
                            </View>
                        </Left>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        )
    }
    render() {
        if (!this.state.section) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner color='blue' />
                    <Text style={{ fontSize: Dimensions.get('window').width*0.03}}>Cargando...</Text>
                </View>
            );
        }
        return (
            <View style={{paddingHorizontal:Dimensions.get('window').width*0.025}}>
                <FlatList
                    data={this.state.section.courses}
                    renderItem={({ item }) => this.item(item)}
                    keyExtractor={item => item.id}
                />
            </View>
        )
    }
}