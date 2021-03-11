import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions , TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Thumbnail, Spinner , Card, CardItem, Left, Toast, Icon as IconNB} from 'native-base'
import { SERVER , MIN_PASSED} from '../../config/config'
import Users from '../../model/Users'
import Storage from '../../model/Storage';
import ItemCourse from '../../components/learn/itemCourse'
import { ScrollView } from 'react-native-gesture-handler';
import { StackActions } from '@react-navigation/native';

export default class Profile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
        this.fontSize = Dimensions.get('window').width*0.025
        this.percentRadius = 8.5
        this.usersModel = new Users()
        this.props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ paddingLeft: 12.5, transform: [{ rotateY: '180deg' }] }} onPress={() => {
                    if (this.state.user) {
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
                    <IconNB name={"logout"} size={16} style={{ color: 'white' }} type={'MaterialCommunityIcons'} />
                </TouchableOpacity>
            )
        });
    }

    componentDidMount() {
        this.usersModel.current().then((response) => {
            this.setState({ user: response })
        }).catch((err)=>console.error(err))
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
            })
        });
        var percent = lessons >0?(100 * lessonsPassed / lessons):0
        return (
            <View
                style={{width:Dimensions.get('window').width*0.9}}
                
            >
                <View style={{
                    flexDirection:'row',
                    width:'100%',
                    paddingHorizontal:10,
                    paddingVertical:10
                }}>
                    <View
                        style={{
                            paddingRight:10
                        }}
                    >
                        <ItemCourse
                            percent={percent}
                            radius={Dimensions.get('window').width * this.percentRadius / 100}
                            borderWidth={3}
                            img={course.image}
                            onPress={() => {
                                this.props.navigation.navigate('course', {
                                    name: course.name,
                                    id: course.id
                                });
                            }}
                        />
                    </View>
                    <View style={{alignSelf:'flex-start',marginTop:Dimensions.get('window').height*0.0075,flex:1}}>
                        <Text style={{ fontSize: this.fontSize , alignSelf:'flex-start',fontWeight:'bold'}}>{course.name.capitalize()}</Text>
                        <Text style={{ fontSize: this.fontSize ,color:"#d5d5d5",fontWeight:'bold'}}>Módulos:{course.modules.length} / Lecciones:{lessons}</Text>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'flex-end'
                        }}>
                            <TouchableOpacity
                                onPress={()=>{}}
                                disabled={percent<100}
                                style={{
                                    borderRadius: 10,
                                    backgroundColor: percent<100?'#d5d5d5':'#00a3fc',
                                    padding: 7.5,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Icon
                                    name="file-text"
                                    size={20}
                                    color="white"
                                />
                                <Text style={{
                                    marginLeft: 5,
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: 10
                                }}>
                                    Certificado
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{
                    backgroundColor:'#e7e7e7',
                    width:'100%',
                    height:1,
                }}/>
            </View>
        )
    }

    render() {
        if (!this.state.user) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner color='blue' />
                    <Text style={{ fontSize: Dimensions.get('window').width * 0.03 }}>Cargando...</Text>
                </View>
            );
        }

        var lessons = 0
        var lessonsPassed = 0
        var modules = 0
        var modulesPassed = 0
        var coursesPassed = 0
        this.state.user.courses.forEach(course=>{
            var modulesPassedTmp = 0
            course.modules.forEach(module => {
                ++modules
                var lessonsPassedTmp = 0
                module.lessons.forEach(lesson => {
                    ++lessons
                    if (lesson.percent >= MIN_PASSED) {
                        ++lessonsPassed
                        ++lessonsPassedTmp
                    }
                })
                if (module.lessons.length > 0 && module.lessons.length == lessonsPassedTmp) {
                    ++modulesPassed
                    ++modulesPassedTmp
                }
            });
            if (course.modules.length > 0 && course.modules.length == modulesPassedTmp) {
                ++coursesPassed
            }
        })

        return (
            <ScrollView>
                <View style={{
                    alignItems:'center'
                }}>
                    <View style={{
                        height: Dimensions.get('window').height * 0.25,
                        backgroundColor: '#404040',
                        width: Dimensions.get('window').width,
                        alignItems: 'center',
                    }}>
                        <View style={{
                            alignItems:'center',
                            paddingTop:Dimensions.get('window').height*0.0375
                        }}>
                            <Text style={{
                                fontWeight:'bold',
                                fontSize:Dimensions.get('window').width*0.0625,
                                color:'white'
                            }}>
                                {this.state.user.name.capitalize()}
                                {" "}
                                {this.state.user.last_name.capitalize()}
                            </Text>
                            <Text style={{
                                fontSize:Dimensions.get('window').width*0.04,
                                color:'white'
                            }}>
                                {this.state.user.email}
                            </Text>
                        </View>
                        <View style={{
                            backgroundColor: 'white',
                            borderRadius: Dimensions.get('window').height * 0.1,
                            position: 'absolute',
                            marginTop: Dimensions.get('window').height * 0.15
                        }}>
                            <Thumbnail
                                style={{
                                    width: Dimensions.get('window').height * 0.2,
                                    height: Dimensions.get('window').height * 0.2,
                                    borderRadius: Dimensions.get('window').height * 0.1
                                }}
                                source={{ uri: SERVER + "img/users/" + this.state.user.img }}
                            />
                        </View>
                    </View>
                    <View style={{
                        alignItems:'center',
                        marginTop:Dimensions.get('window').height*0.115,
                        marginBottom:Dimensions.get('window').height*0.02,
                        paddingVertical:Dimensions.get('window').height*0.02,
                        width:Dimensions.get('window').width*0.9,
                        backgroundColor:'white',
                        borderRadius:15,
                        minHeight:Dimensions.get('window').height*0.475
                    }}>
                        <View style={{
                            flexDirection:'row',
                            alignItems:'center'
                        }}>
                            <View style={{
                                alignItems:'center',
                                paddingHorizontal:Dimensions.get('window').width*0.03
                            }}>
                                <Text style={{
                                    fontSize:Dimensions.get('window').width*0.0625,
                                    fontWeight:'bold',
                                    color:'#6ab4ff'
                                }}>
                                    {modulesPassed}
                                </Text>
                                <Text style={{
                                    fontSize:Dimensions.get('window').width*0.03,
                                    textAlign:'center',
                                    color:'#6ab4ff'
                                }}>
                                    Módulos
                                </Text>
                            </View>
                            <View style={{
                                alignItems:'center',
                                paddingHorizontal:Dimensions.get('window').width*0.03
                            }}>
                                <Text style={{
                                    fontSize:Dimensions.get('window').width*0.0625,
                                    fontWeight:'bold',
                                    color:'gray'
                                }}>
                                    {lessonsPassed}
                                </Text>
                                <Text style={{
                                    fontSize:Dimensions.get('window').width*0.03,
                                    textAlign:'center',
                                    color:'gray'
                                }}>
                                    Lecciones
                                </Text>
                            </View>
                            <View style={{
                                alignItems:'center',
                                paddingHorizontal:Dimensions.get('window').width*0.03
                            }}>
                                <Text style={{
                                    fontSize:Dimensions.get('window').width*0.0625,
                                    fontWeight:'bold',
                                    color:'#0ec842'
                                }}>
                                    {coursesPassed}
                                </Text>
                                <Text style={{
                                    fontSize:Dimensions.get('window').width*0.03,
                                    textAlign:'center',
                                    color:'#0ec842'
                                }}>
                                    Cursos
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            marginTop:15
                        }}>
                            <Text style={{
                                fontWeight:'bold'
                            }}>
                                Estatus de mis cursos
                            </Text>
                        </View>
                        <View style={{
                            backgroundColor:'#e7e7e7',
                            width:Dimensions.get('window').width*0.9,
                            marginTop:10,
                            height:1,
                        }}/>
                        <FlatList
                            data={this.state.user.courses}
                            renderItem={({ item }) => this.item(item)}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }

    
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}