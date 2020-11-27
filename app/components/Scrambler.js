import React from 'react'
import { Text, View, StyleSheet } from "react-native";
import { Component } from "react";
import ScrambleButton from './ScrambleButton';

import colors from "../config/colors.js";

export default class Scrambler extends Component {
    // INITIALIZATION
    state = {}

    constructor(props){
        //TODO initialize
        super(props)

        const questionArray = props.questions

        this.state = {
            questionList: questionArray,
            question: questionArray[0].question,
            answer: questionArray[0].answer,
            answers: questionArray[0].answers
        }
    }

    render() {
        return (
            <View style={styles.screen}>
                <View style={styles.questionInfoView}>
                    <Text style={styles.questionText}>{this.state.question}</Text>
                </View>
                <View>
                    <View style={styles.answerButtonView}>
                        {
                            this.state.answers.map((value, index) => (
                                <ScrambleButton 
                                    key={index}
                                    title={value}
                                    onPress={console.log(value)}/>
                            ))
                        }
                    </View>
                </View>
            </View>
        )
    }

}

// STYLES

const styles = StyleSheet.create({
    answerButtonView: {
        flexDirection: 'row',
        width: '100%',
        margin: 50,
        alignItems: 'center'
    },
    screen: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 10,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    questionText: {
        color: 'black',
		fontSize: 18,
		alignSelf: 'flex-end',
		flex: 8
    },
    questionInfoView:{
		flexDirection: 'row',
		backgroundColor: colors.primary,
		padding: 10,
		alignContent: 'flex-end',
		borderRadius: 10,
	},
})