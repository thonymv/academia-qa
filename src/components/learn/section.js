import React from 'react'
import { View, TouchableOpacity, Dimensions, FlatList, Modal, Alert, TouchableHighlight, Image } from 'react-native'
import { Card, CardItem, Body, Button, Text, Left, Right, Thumbnail } from "native-base";
import ItemCourse from './itemCourse'
import { MIN_PASSED, SERVER } from '../../config/config'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';


export default class SectionComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
        this.fontSize = Dimensions.get('window').width * 0.03
        this.percentRadius = 8.5
    }

    getHeight(width, sourceDir) {
        let source = resolveAssetSource(sourceDir)
        return (width * source.height) / source.width
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
        return (<TouchableOpacity
            style={{ marginRight: 20 }}
            onPress={() => {
                this.props.navigation.navigate('course', {
                    name: course.name,
                    id: course.id
                });
            }}
        >
            <ItemCourse
                percent={percent}
                radius={Dimensions.get('window').width * this.percentRadius / 100}
                borderWidth={3}
                img={course.image}
            />
            <View style={{ width: Dimensions.get('window').width * this.percentRadius / 50, marginTop: 5 }}>
                <Text style={{ color: 'gray', fontSize: this.fontSize * 0.9, textAlign: 'center' }}>
                    {course.name}
                </Text>
            </View>
            {
                course.locked ? (
                    <View style={{
                        position: 'absolute',
                        alignItems: 'flex-end',
                        width: '100%'
                    }}>
                        <Icon
                            name="lock"
                            size={25}
                            color="gray"
                            style={{
                                opacity: 0.65
                            }}
                        />
                    </View>
                ) : null
            }
        </TouchableOpacity>)
    }

    reduceText = (text, length) => {
        var result = ""
        for (let i = text.length; i > 0; --i) {
            if (text[i] == " " && i <= length) {
                result = text.substring(0, i)
                break;
            }
        }
        return result
    }

    render() {
        return (
            <View>
                <Card>
                    <CardItem >
                        <Body>
                            <Text style={{ fontSize: this.fontSize }}>{this.props.section.name}</Text>
                        </Body>
                        <Right>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                    style={{ paddingHorizontal: 5 }}
                                    onPress={() => {
                                        this.props.navigation.navigate('section', { id: this.props.section.id, name: this.props.section.name });
                                    }}
                                >
                                    <Text style={{ color: '#00a3fc', fontSize: this.fontSize - 1 }}>VER MAS</Text>
                                </TouchableOpacity>
                            </View>
                        </Right>
                    </CardItem>
                    <View style={{ marginTop: -5, paddingHorizontal: 17.5 }}>
                        <Text style={{ color: 'gray', fontSize: this.fontSize }}>{this.reduceText(this.props.section.description, 60)}...</Text>
                    </View>
                    <CardItem >
                        <Body >
                            <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data={this.props.section.courses}
                                    renderItem={({ item }) => this.item(item)}
                                    keyExtractor={item => item.id}
                                />
                            </View>
                        </Body>
                    </CardItem>
                </Card>
            </View>
        )
    }
}