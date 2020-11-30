import React from 'react'
import ProgressCircle from 'react-native-progress-circle'
import { Thumbnail, View } from 'native-base'
import { SERVER } from '../../config/config'

export default function ItemCourse({ percent, radius, borderWidth, img }) {
    const diameter = radius * 2
    return (<ProgressCircle
        percent={percent}
        radius={radius}
        borderWidth={borderWidth}
        color={(percent >= 100 ? "#0ec842" : "#6ab4ff")}
        shadowColor="#d5d5d5"
        bgColor="#fff"
    >
        <Thumbnail
            style={{
                width: (diameter * 0.95) - borderWidth * 2,
                height: (diameter * 0.95) - borderWidth * 2,
                borderRadius: radius
            }}
            source={{ uri: SERVER + "img/" + img }}
        />

    </ProgressCircle>)
}