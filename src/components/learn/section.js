import React from 'react'
import { View, TouchableOpacity, Dimensions , FlatList} from 'react-native'
import { Card, CardItem, Body, Button, Text, Left, Right } from "native-base";
import ItemCourse from './itemCourse'


export default class Section extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.fontSize = Dimensions.get('window').width*0.033

        this.data = [
            {
                id:"1",
                name:"React Native",
                img:"react.png",
                percent:40
            },
            {
                id:"2",
                name:"Laravel",
                img:"laravel.png",
                percent:25
            },
            {
                id:"3",
                name:"Javascript",
                img:"js.png",
                percent:100
            },
            {
                id:"4",
                name:"Php",
                img:"php.png",
                percent:80
            },
            {
                id:"5",
                name:"html5",
                img:"html5.png",
                percent:40
            }
        ]
    }

    item = ({ name, img, percent }) => {
        var percentRadius = 7.5
        return (<TouchableOpacity style={{ marginHorizontal: 10 }}>
            <ItemCourse
                percent={percent}
                radius={Dimensions.get('window').width * percentRadius / 100}
                borderWidth={3}
                img={img}
            />
            <View style={{ width: Dimensions.get('window').width * percentRadius / 50, marginTop: 5 }}>
                <Text style={{ color: 'gray', fontSize: this.fontSize * 0.8, textAlign: 'center' }}>
                    {name}
                </Text>
            </View>
        </TouchableOpacity>)
    }

    render() {
        var Item = this.item
        return (<Card>
            <CardItem >
                <Body>
                    <Text style={{ fontSize: this.fontSize }}>Hacerse un científico de datos</Text>
                </Body>
                <Right>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ paddingHorizontal: 5 }}>
                            <Text style={{ color: '#00a3fc', fontSize: this.fontSize - 1 }}>VER MAS</Text>
                        </TouchableOpacity>
                    </View>
                </Right>
            </CardItem>
            <View style={{ marginTop: -5, paddingHorizontal: 17.5 }}>
                <Text style={{ color: 'gray', fontSize: this.fontSize }}>Desbloquear información valiosa. Cuenta la historia...</Text>
            </View>
            <CardItem >
                <Body>
                    <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={this.data}
                            renderItem={({item}) => this.item(item)}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </Body>
            </CardItem>
        </Card>)
    }
}