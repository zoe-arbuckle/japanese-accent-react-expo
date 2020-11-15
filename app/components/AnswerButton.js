import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

import colors from '../config/colors'

const AnswerButton = ( {title, onPress, disabled} ) => {
    return (
        <TouchableOpacity
            style={disabled ? styles.disabledButton : styles.answerButton}
            onPress={onPress}
            disabled={disabled}>
            <Text style={styles.answerText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    answerButton: {
		margin: 10,
		width: '100%',
		height: 50,
		backgroundColor: colors.background,
		justifyContent: 'center',
		alignItems: 'center',
    },
    answerText: {
		color: 'black',
		fontSize: 18,
    },
    disabledButton:{
        margin: 10,
		width: '100%',
		height: 50,
		backgroundColor: colors.background,
		justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.4,
    }
})

export default AnswerButton