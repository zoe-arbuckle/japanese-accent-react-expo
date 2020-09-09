import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import colors from '../config/colors';

const LessonButton = ( {title, onPress} ) => {
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
        width: '100%',
        elevation: 8,
        backgroundColor: colors.secondary,
        borderRadius: 10,
        paddingVertical: 10,
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase'
    }
})

export default LessonButton