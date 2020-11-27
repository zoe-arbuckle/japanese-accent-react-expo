import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Component } from "react";
import ScrambleButton from './ScrambleButton';

import colors from "../config/colors.js";
import ScoreScreen from '../screens/ScoreScreen';

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
            endQuiz: false,
            navigation: props.navigation
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

        try {
            await this.setState({currentAnswer: currentAnswerVal})
        } catch (e) {
            console.log(e)
        }
    };

    checkAnswer = async () => {
        let myAnswer = this.state.currentAnswer.join('')

        if(myAnswer === this.state.answer) {
            if(this.state.gaveCorrectAnswer != false){
                this.setState({score: (this.state.score + 1)})
            }
            this.getNextQuestion()
        } else {
            this.setState({gaveCorrectAnswer: false})
        }
    }

    getNextQuestion = async () => {
        let index = this.state.currentIndex + 1
        if (index == this.state.questionListLen) {
            this.setState({endQuiz: true})
        } else {
            const next = this.state.questionList[index]

            try {
                await this.setState({
                    question: next.question,
                    answers: next.answers,
                    answer: next.answer,
                    currentIndex: index,
                    gaveCorrectAnswer: null,
                })
            } catch (e){
                console.log(e)
            }
        }
    }

    render() {
        if(this.state.endQuiz){
            return <ScoreScreen 
                score={this.state.score}
                possibleScore={this.state.questionListLen}
                navigation={this.state.navigation}/>
        }

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
                    <TouchableOpacity style={styles.checkAnswerButton} onPress={this.checkAnswer}>
                        <Text style={styles.checkAnswerText}>Check Answer</Text>
                    </TouchableOpacity>
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
    audioButton: {
		width: 100,
		height: 100,
		margin: 10,
	},
    currentAnswerView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignContent: 'flex-start',
    },
    checkAnswerButton: {
        backgroundColor: colors.background,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        width: '80%',
        marginVertical: 20,
        height: 50
    },
    checkAnswerText:{
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center'
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