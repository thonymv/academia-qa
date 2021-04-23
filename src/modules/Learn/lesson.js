import { View, Text, Icon, CardItem, Body, Card, Spinner, Button } from 'native-base'
import { TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Lessons from '../../model/Lessons'
import { WebView } from 'react-native-linkedin/node_modules/react-native-webview';

const { width } = Dimensions.get('window')

function Tab({ id, children, onPress, select }) {
    console.log("tab select: "+select);
    return (
        <TouchableOpacity
            onPress={() => {
                onPress(id)
            }}
            style={{
                paddingHorizontal: Dimensions.get('window').width * 0.025,
                paddingVertical: Dimensions.get('window').height * 0.015,
                backgroundColor: select ? '#a3a3a3' : null
            }}
        >
            {children}
        </TouchableOpacity>
    )
}

function IconTab({ name, type }) {

    return (
        <Icon
            name={name}
            size={Dimensions.get('window').height * 0.015}
            style={{ color: "white" }}
            type={type ? type : 'AntDesign'}
        />
    )
}

function ContainerTabs({ children }) {
    return (
        <ScrollView
            style={{ backgroundColor: '#b1b1b1' }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            <View style={{
                flexDirection: 'row',
                minWidth: Dimensions.get('window').width,
                backgroundColor: '#585858',
                justifyContent: 'center',
                paddingHorizontal: Dimensions.get('window').width * 0.025
            }}>
                {children}
            </View>
        </ScrollView>
    )
}

function SwiperTabs({ children, onScroll, reference }) {
    let event = {}
    return (
        <ScrollView
            style={{
                width
            }}
            ref={reference}
            horizontal
            pagingEnabled
            onScroll={(e) => { event = e && e.nativeEvent ? e.nativeEvent : event }}
            onMomentumScrollEnd={() => {
                let x = event && event.contentOffset ? event.contentOffset.x : -1
                if (x >= 0) {
                    onScroll({ page: Math.round(x / width) })
                }
            }}
            showsHorizontalScrollIndicator={false}>
            {children}
        </ScrollView>
    )
}

function ContentTab({ children }) {
    return (
        <View style={{
            width,
            paddingHorizontal: width * 0.1,
            flex: 1
        }}>
            <Card>
                <CardItem>
                    <Body>
                        <ScrollView>
                            {children}
                        </ScrollView>
                    </Body>
                </CardItem>
            </Card>
        </View>
    )
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}


export default function Lesson(props) {


    const lessonsModel = new Lessons()
    const [lesson, setLesson] = useState(null)
    const icon_content = { name: "clipboard-list", type: "FontAwesome5" }
    const icon_question = { name: "question", type: "Fontisto" }
    useEffect(() => {
        if (!lesson) {
            lessonsModel.find(props.route.params.id).then(lesson => {
                if (lesson.nodes) {
                    let nodes = lesson.nodes.reduce((acc, node) => {
                        node.icon = node.type_id == 1 ? icon_content : icon_question
                        node.select = acc.length ? false : true
                        acc.push(node)
                        return acc
                    }, [])
                    lesson.nodes = nodes
                }
                setLesson(lesson)

            })
        }
    })

    const changeTab = (id) => {
        let lessonTmp = clone(lesson)
        let nodes = lessonTmp.nodes.reduce((acc, node) => {
            node.select = false
            acc.push(node)
            return acc
        }, [])
        nodes[id]["select"] = true
        lessonTmp.nodes = nodes
        setLesson(lessonTmp)
    }

    const swiperRef = useRef(null)

    if (!lesson) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Spinner color='blue' />
                <Text style={{ fontSize: Dimensions.get('window').width * 0.03 }}>Cargando...</Text>
            </View>
        );
    }

    return (
        <View>
            <ContainerTabs>
                {lesson.nodes && lesson.nodes.map && lesson.nodes.map((node, index) => (
                    <Tab
                        id={index}
                        onPress={(id) => {
                            changeTab(id)
                            swiperRef.current.scrollTo({ x: (id * width), y: 0, animated: true })
                        }}
                        select={node.select}
                    >
                        <IconTab
                            name={node.icon.name}
                            type={node.icon.type}
                        />
                    </Tab>
                ))}
            </ContainerTabs>
            <SwiperTabs
                reference={swiperRef}
                onScroll={({ page }) => {
                    changeTab(page)
                }}
            >
                {lesson.nodes && lesson.nodes.map && lesson.nodes.map((node, index) => (
                    <ContentTab>
                        <WebView
                            source={{ html: node.content }}
                            originWhitelist={['*']}
                            style={{
                                flex: 1,
                                width: Dimensions.get('window').width,
                                height: Dimensions.get('window').height
                            }}
                        />
                    </ContentTab>
                ))}
            </SwiperTabs>
        </View>
    )

}