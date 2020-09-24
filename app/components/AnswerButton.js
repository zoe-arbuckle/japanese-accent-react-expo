import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

import colors from '../config/colors'

const AnswerButton = ( {title, onPress} ) => {
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
		width: '100%',
		height: 50,
		backgroundColor: colors.purduegold,
		justifyContent: 'center',
		alignItems: 'center',
    },
    answerText: {
		color: 'black',
		fontSize: 18,
	},
})

export default AnswerButton