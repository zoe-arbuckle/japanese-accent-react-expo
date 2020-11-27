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
            answers: questionArray[0].answers,
            currentIndex: 0,
            questionListLen: props.questions.length,
            score: 0,
            currentAnswer: [],
        };
    };

    // handling questions
    addAnswer = value => async () => {
        let currentAnswerVal = this.state.currentAnswer

        currentAnswerVal.push(value)

        try {
            await this.setState({currentAnswer: currentAnswerVal})
        } catch (e) {
            console.log(e)
        }
    };

    removeAnswer = index => async () => {
        let currentAnswerVal = this.state.currentAnswer

        currentAnswerVal.splice(index, 1)

        console.log(currentAnswerVal)

        try {
            await this.setState({currentAnswer: currentAnswerVal})
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <View style={styles.screen}>
                <View style={styles.questionInfoView}>
                    <Text style={styles.questionText}>{this.state.question}</Text>
                    <Text style={styles.questionNumber}>{this.state.currentIndex + 1}/{this.state.questionListLen}</Text>
                </View>
                <View style={styles.answerView}>
                    <View style={styles.currentAnswerView}>
                        {
                            this.state.currentAnswer.map((value, index) => (
                                <ScrambleButton
                                    key={index}
                                    title={value}
                                    answer={true}
                                    onPress={this.removeAnswer(index)}/>
                            ))
                        }
                    </View>
                    <View style={styles.scrambleButtonView}>
                        {
                            this.state.answers.map((value, index) => (
                                <ScrambleButton
                                    key={index}
                                    title={value}
                                    answer={false}
                                    onPress={this.addAnswer(value)}/>
                            ))
                        }
                    </View>
                </View>
            </View>
        );
    }

}

// STYLES

const styles = StyleSheet.create({
    answerView: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
    },
    currentAnswerView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignContent: 'flex-start',
    },
    scrambleButtonView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignContent: 'flex-end',
    },
    screen: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    questionText: {
        color: 'black',
		fontSize: 18,
		flex: 8
    },
    questionNumber: {
		color: 'black',
		fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
		flex: 1
	},
    questionInfoView:{
		flexDirection: 'row',
		backgroundColor: colors.primary,
		padding: 10,
        alignSelf: 'flex-start',
		borderRadius: 10,
	},
})