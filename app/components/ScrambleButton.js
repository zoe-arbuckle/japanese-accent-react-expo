import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

import colors from '../config/colors'

const ScrambleButton = ( {title, onPress} ) => {
    return (
        <TouchableOpacity
            style={styles.scrambleButton}
            onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ScrambleButton

const styles = StyleSheet.create({
    scrambleButton: {
        margin: 5,
        width: 50,
        height: 50,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: 'black',
        fontSize: 18
    }
})