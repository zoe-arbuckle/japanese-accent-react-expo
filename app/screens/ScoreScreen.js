import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import colors from '../config/colors'

function ScoreScreen({ score, possibleScore, navigation }) {
    return (
        <View style={styles.scoreView}>
            <View style={styles.resultView}>
                <Text>Welcome to the end of the quiz.</Text>
                <Text style={styles.scoreText}>Your score is {score} out of {possibleScore}.</Text>
            </View>
            <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Go back to the lesson?</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.backButton}
                onPress={() =>navigation.navigate('Home')}>
                <Text style={styles.backButtonText}>Go back to the home screen?</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    backButton:{
        backgroundColor: 'black',
        margin: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    backButtonText:{
        color: 'white',
        fontSize: 20,
    },
    resultView:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    scoreView: {
        flex: 1,
        backgroundColor: colors.purduegold,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scoreText: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    },
})


export default ScoreScreen