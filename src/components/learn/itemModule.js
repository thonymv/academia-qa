import React from 'react'
import { Text , TouchableOpacity} from 'react-native'
import ProgressCircle from 'react-native-progress-circle'
import { SERVER } from '../../config/config'
import SvgUri from 'expo-svg-uri'

export default function ItemCourse({ percent, radius, borderWidth, img, unlocked , onPress}) {
    const diameter = radius * 2
    return (<ProgressCircle
        percent={percent}
        radius={radius}
        borderWidth={(borderWidth)}
        color={(percent >= 100 || !unlocked ?"#f2f2f2":"#6ab4ff")}
        shadowColor={(percent >= 100 || !unlocked ?"#f2f2f2":"#d5d5d5")}
        bgColor="#f2f2f2"
    >
        <TouchableOpacity 
            onPress={onPress}
            style={{
                backgroundColor: (percent >= 100 ? '#0ec842' : (unlocked ? 'gray' : '#d5d5d5')),
                borderRadius: radius,
                width: (diameter * 0.95) - borderWidth * 2,
                height: (diameter * 0.95) - borderWidth * 2,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <SvgUri
                width={(diameter * 0.8) - borderWidth * 2}
                height={(diameter * 0.8) - borderWidth * 2}
                stroke={unlocked ? "white" : "gray"}
                source={{ uri: SERVER + "img/" + img }}
            />
        </TouchableOpacity>
    </ProgressCircle>)
}