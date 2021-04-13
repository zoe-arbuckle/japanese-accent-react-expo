import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import colors from '../config/colors';

const PracticeButton = ( {title, onPress} ) => {
    return (
        <TouchableOpacity 
            style={styles.buttonContainer}
            onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: '30%',
        backgroundColor: colors.primary,
        borderRadius: 10,
        padding: 10,
        margin: 20
    },
    buttonText: {
        fontSize: 24,
        color: colors.background,
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase'
    }
})

export default PracticeButton