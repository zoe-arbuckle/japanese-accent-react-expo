import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import colors from '../config/colors'

function SetModeScreen({ route, navigation }) {
    const {letterSoundQuiz} = route.params

    return (
        <SafeAreaView style={styles.scoreView}>
            <View style={styles.textView}>
                <Text>Please select the mode of the quiz.</Text>
            </View>
            <TouchableOpacity 
                style={styles.modeButton}
                onPress={() => navigation.navigate('Practice',{
                    letterSoundQuiz: letterSoundQuiz,
                    mode: 1,
                })}>
                <Text style={styles.modeButtonText}>Sound Only Mode</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.modeButton}
                onPress={() =>navigation.navigate('Practice',{
                    letterSoundQuiz: letterSoundQuiz,
                    mode: 0,
                })}>
                <Text style={styles.modeButtonText}>Letters Only Mode</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    modeButton:{
        backgroundColor: colors.primary,
        margin: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        width: '30%',
        aspectRatio: 5/1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    modeButtonText:{
        color: 'white',
        fontSize: 20,
    },
    textView:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    scoreView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scoreText: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    },
})


export default SetModeScreen