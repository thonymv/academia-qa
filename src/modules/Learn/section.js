import React from 'react'
import { View, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import { Card, CardItem, Body, Button, Text, Left, Right, Spinner } from "native-base";
import ItemCourse from '../../components/learn/itemCourse'
import { Sections } from '../../model/Sections';

export default class Section extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            section:null
        }
        this.fontSize = Dimensions.get('window').width*0.03
        this.percentRadius = 8.5
        this.sectionsModel = new Sections()
        this.sectionsModel.find(this.props.route.params.id).then(section=>{
            this.setState({section})
        })
    }

    item = (course) => {
        var lessons = 0
        var lessonsPassed = 0
        course.modules.forEach(module => {
            module.lessons.forEach(lesson => {
                ++lessons
                if (lesson.passed > 0) {
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