import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

import colors from '../config/colors'

const RoundAnswerButton = ( {title, onPress} ) => {
    return (
        <TouchableOpacity
            style={styles.answerButton}
            onPress={onPress}>
            <Text style={styles.answerText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    answerButton: {
		margin: 10,
        width: "15%",
        aspectRatio: 1 / 1,
		justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid'
    },
    answerText: {
		color: 'black',
		fontSize: 24,
    }
})

export default RoundAnswerButton