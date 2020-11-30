import React from 'react'
import { FlatList, Dimensions, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native'
import { View, Spinner, Text, Card, CardItem, Left } from 'native-base'
import Courses from '../../model/Courses'
import ItemModule from '../../components/learn/itemModule'
import Icon from 'react-native-vector-icons/FontAwesome5';

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

function Line({ marginLeft, width, height , hide}) {
    width = width ? width : 3
    return (
        <View style={{
            backgroundColor: hide?null:"#d5d5d5",
            width,
            flex: 1,
            height: height ? height : null,
            marginLeft: marginLeft - (width / 2)
        }} />
    )
}

export default class Course extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            course: null,
            activeIndex: null
        }
        this.fontSize = Dimensions.get('window').width * 0.03
        this.percentRadius = 8.5
        this.coursesModel = new Courses()
        this.coursesModel.find(this.props.route.params.id).then(course => {

            this.setState({ course })
        })
        this.premium = false
    }

    lesson = ({ lesson, marginLeft, unlocked, last }) => {
        var sizePoint = Dimensions.get('window').width * 0.035
        return (
            <View style={{

            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View>
                        <Line marginLeft={marginLeft} />
                        <View style={{
                            width: sizePoint,
                            height: sizePoint,
                            borderRadius: sizePoint / 2,
                            backgroundColor: lesson.passed ? '#0ec842' : (unlocked ? 'gray' : '#d5d5d5'),
                            marginLeft: marginLeft - (sizePoint / 2)
                        }} />
                        <Line marginLeft={marginLeft} hide={last} />
                    </View>
                    <TouchableOpacity style={{
                        marginVertical: Dimensions.get('window').height * 0.01,
                        marginLeft: Dimensions.get('window').width * 0.05,
                        backgroundColor: 'white',
                        width: Dimensions.get('window').width * 0.75,
                        paddingHorizontal: Dimensions.get('window').width * 0.04,
                        paddingVertical: Dimensions.get('window').height * 0.025,
                        borderRadius: Dimensions.get('window').width * 0.025,
                        flexDirection: 'row'
                    }}>
                        <Text style={{ color: "gray" }}>
                            {lesson.name}
                        </Text>
                        <View style={{
                            flex: 1,
                            alignItems: 'flex-end'
                        }}>
                            {!unlocked ?
                                <Icon name="lock" size={25} color="gray" />
                                :
                                null
                            }
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    moduleAproved = (module) => {
        var lessons = 0
        var lessonsPassed = 0
        module.lessons.forEach(lesson => {
            ++lessons
            if (lesson.passed > 0) {
                ++lessonsPassed
            }
        })
        return lessons != 0 && (lessonsPassed == lessons)
    }

    module = ({ module, show, last, onClick, index, unlocked }) => {
        var lessons = 0
        var lessonsPassed = 0
        module.lessons.forEach(lesson => {
            ++lessons
            if (lesson.passed > 0) {
                ++lessonsPassed
            }
            console.log(lesson);
        })
        var percent = 100 * lessonsPassed / lessons
        var radius = Dimensions.get('window').width * this.percentRadius / 100
        var marginLeft = Dimensions.get('window').width * 0.05
        return (
            <View>
                <TouchableOpacity
                    style={{}}
                    onPress={() => {
                        if (onClick) {
                            onClick(index)
                        }
                    }}
                >
                    <View style={{
                        marginLeft,
                        paddingVertical: Dimensions.get('window').width * 0.01,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <ItemModule
                            percent={percent}
                            radius={radius}
                            borderWidth={3}
                            img={module.image}
                            svg={true}
                            unlocked={unlocked}
                        />
                        <View style={{ marginLeft: Dimensions.get('window').width * 0.025 }}>
                            <Text style={{ fontSize: this.fontSize, alignSelf: 'flex-start' }}>{module.name}</Text>
                        </View>
                    </View>
                    {!last ?
                        <Line marginLeft={marginLeft + radius} height={Dimensions.get('window').height * 0.02} />
                        :
                        null
                    }
                </TouchableOpacity>
                {show && module.lessons.length ?
                    <View>
                        <FlatList
                            data={module.lessons}
                            renderItem={({ item, index }) => {
                                return this.lesson({
                                    lesson: item,
                                    marginLeft: marginLeft + radius,
                                    unlocked: (unlocked && (index == 0)) || (index != 0 && module.lessons[index - 1].passed > 0) || this.premium,
                                    last: (index + 1 == module.lessons.length) && last
                                })
                            }}
                            keyExtractor={item => item.id}
                        />
                        {!last ?
                            <Line marginLeft={marginLeft + radius} height={Dimensions.get('window').height * 0.02} />
                            :
                            null
                        }
                    </View>
                    :
                    null
                }
            </View>
        )
    }

    render() {
        if (!this.state.course) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner color='blue' />
                    <Text style={{ fontSize: Dimensions.get('window').width * 0.03 }}>Cargando...</Text>
                </View>
            );
        }
        return (
            <View>
                <FlatList
                    data={this.state.course.modules}
                    renderItem={({ item, index }) => {
                        return this.module({
                            index: index,
                            module: item,
                            unlocked: (index == 0) || this.moduleAproved(this.state.course.modules[index - 1]) || this.premium,
                            show: (this.state.activeIndex == index),
                            last: (index + 1 == this.state.course.modules.length),
                            onClick: (index) => {
                                LayoutAnimation.configureNext(LayoutAnimation.create(175, 'linear', 'opacity'));
                                if (index == this.state.activeIndex) {
                                    this.setState({ activeIndex: null })
                                } else {
                                    this.setState({ activeIndex: index })
                                }
                            }
                        })
                    }}
                    keyExtractor={item => item.id}
                />
            </View>
        )
    }
}