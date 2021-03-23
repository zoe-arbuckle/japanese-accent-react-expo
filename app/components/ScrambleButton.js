import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

import colors from '../config/colors'

const ScrambleButton = ( {title, onPress, answer} ) => {
    return (
        <TouchableOpacity
            style={answer ? styles.answerButton: styles.scrambleButton}
            onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ScrambleButton

const styles = StyleSheet.create({
    answerButton: {
        margin: '1%',
        width: '10%',
        marginBottom: '10%',
        aspectRatio: 2/1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    scrambleButton: {
        margin: '1%',
        width: '10%',
        aspectRatio: 2/1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: 'black',
        fontSize: 24
    }
})