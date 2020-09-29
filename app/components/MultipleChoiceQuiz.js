import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View, Image, Button } from 'react-native'
import { Component } from 'react'

import { Audio } from 'expo-av'

import colors from '../config/colors.js'
import sounds from '../config/sounds.js'
import AnswerButton from './AnswerButton.js';

// constant values
const soundObjects = {}

export default class MultipleChoiceQuiz extends Component {

	/* INITIALIZATION */

	state = {}

	constructor(props){
		super(props);

		const array = props.questions

		// shuffle the question array using the Fisher-Yates method

		for(let i = array.length - 1; i > 0; i--){
			const j = Math.floor(Math.random() * i)
			const temp = array[i]
			array[i] = array[j]
			array[j] = temp
		}

		this.state = {
			volume: 0.5,
			questionList: props.questions,
			question: props.questions[0].question,
			answers: props.questions[0].answers,
			answer: props.questions[0].answer,
			audioName: props.questions[0].audioName,
			currentIndex: 0,
			questionListLen: props.questions.length,
			endQuiz: false,
			score: 0,
			disabled: false,
		};
	}

	// COMPONENT MOUNTING

    async componentDidMount() {
        try{
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                playsInSilentModeIOS: true,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
                shouldDuckAndroid: true,
                staysActiveInBackground: true,
                playThroughEarpieceAndroid: true
			})
			this.loadAudio()
        } catch(e) {
            console.log(e)
		}
	}
	
	async componentWillUnmount() {
		for (const question in this.state.questionList){
			const audioName = this.state.questionList[question].audioName
			await soundObjects[audioName].unloadAsync();
		}
	}

	// AUDIO

    async loadAudio() {
		const { volume } = this.state;
		await Audio.setIsEnabledAsync(true);
		const questionList = this.state.questionList

		for (const question in questionList){
			const audioName = questionList[question].audioName
			const source = sounds[audioName]
			try{
				soundObjects[audioName] = new Audio.Sound();

				const status = {
					shouldPlay: false,
					volume
				}
				await soundObjects[audioName].loadAsync(source)
			} catch(e){
				console.log(e);
			}
		}

		this.playAudio()
        
	}

    playAudio = async () => {
		console.log("playing audio for " + this.state.audioName)
		try { 
			if(soundObjects[this.state.audioName]){
				await soundObjects[this.state.audioName].replayAsync();
			}
		} catch(e) {
			console.log(e)
		}
	}

	// HANDLING QUESTIONS
	
	pickAnswer = answerValue => () => {
		const correctAnswer = this.state.answers[this.state.answer]
		this.setState({disabled: true})

		console.log(answerValue);
		if(answerValue === correctAnswer){
			this.setState({gaveCorrectAnswer: true, score: (this.state.score + 1)})
		} else {
			this.setState({gaveCorrectAnswer: false})
		}
	}

	getNextQuestion = async () => {
		let index = this.state.currentIndex + 1
		if(index == this.state.questionListLen){
			// end the quiz - need to give a score and navigate back to lesson
			this.setState({endQuiz: true})
			console.log(this.state.score)
		} else {
			const next = this.state.questionList[index]

			await this.setState({
				question: next.question,
				answers: next.answers,
				answer: next.answer,
				audioName: next.audioName,
				currentIndex: index,
				gaveCorrectAnswer: null,
				disabled: false,
			})

			this.playAudio()

		}
		
	}

	// RENDER

    render() {
		let nextQuestionButton;
		if(this.state.gaveCorrectAnswer){
			nextQuestionButton = 
				<TouchableOpacity style={styles.nextQuestionButtonCorrect} onPress={this.getNextQuestion}>
					<Text>{this.state.endQuiz ? "End Quiz" : "Well Done! Next Question?" }</Text>
				</TouchableOpacity>
		} else if(this.state.gaveCorrectAnswer == false) {
			nextQuestionButton = 
				<TouchableOpacity style={styles.nextQuestionButtonIncorrect} onPress={this.getNextQuestion}>
				<Text>Incorrect. Next Question</Text>
				</TouchableOpacity>
		} else {
			nextQuestionButton = <Text>Please answer the question to move on.</Text>
		}

        return (
            <View style={styles.screen}>
                <Text style={styles.questionText}>{this.state.question}</Text>
		    	<View style={styles.buttonView}>
		    		<TouchableOpacity style={styles.audioButton} onPress={this.playAudio}>
		    			<Image source={require('../assets/images/audio.png')} style={styles.audioImage}/>
		    		</TouchableOpacity>
		    		<View style={styles.answerView}>
					{
						this.state.answers.map((value, index) => (
							<AnswerButton
								key={index}
								title={value}
								onPress={this.pickAnswer(value)}
								disabled={this.state.disabled}/>
						))
					}
		    		</View>
		    	</View>
				{nextQuestionButton}
            </View>
        );
    }
}

// STYLE

const styles = StyleSheet.create({
	answerView: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	audioButton: {
		width: 100,
		height: 100,
		margin: 10,
	},
	audioImage: {
		width: 100,
		height: 100,
		resizeMode: 'contain',
	},
	buttonView: {
		flexDirection: 'row',
		width: '100%',
		margin: 50,
		alignItems: 'center',
	},
	nextQuestionButtonCorrect: {
		margin: 10,
		width: '100%',
		height: 50,
		backgroundColor: colors.correct,
		justifyContent: 'center',
		alignItems: 'center',
	},
	nextQuestionButtonIncorrect: {
		margin: 10,
		width: '100%',
		height: 50,
		backgroundColor: colors.incorrect,
		justifyContent: 'center',
		alignItems: 'center',
	},
    screen: {
        flex: 1,
        backgroundColor: 'white',
		padding: 10,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
    questionText: {
        color: 'black',
		fontSize: 18,
		alignSelf: 'auto',
    }
});