import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native'
import { Component } from 'react'

import { Audio } from 'expo-av'

import colors from '../config/colors.js'
import sounds from '../config/sounds.js'
import AnswerButton from './AnswerButton.js';
import ScoreScreen from '../screens/ScoreScreen.js';

// constant values
const soundObjects = {}
const correctSound = new Audio.Sound()
const incorrectSound = new Audio.Sound()

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
			volume: 1,
			questionList: props.questions,
			question: props.questions[0].question,
			answers: props.questions[0].answers,
			answer: props.questions[0].answer,
			audioName: props.questions[0].audioName,
			currentIndex: 0,
			questionListLen: props.questions.length,
			endQuiz: false,
			score: 0,
			navigation: props.navigation
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
		await correctSound.unloadAsync()
		await incorrectSound.unloadAsync()
		for (const question in this.state.questionList){
			const audioName = this.state.questionList[question].audioName
			try {
				await soundObjects[audioName].unloadAsync();
			} catch (e){
				console.log(e)
			}
		}
	}

	// AUDIO

    async loadAudio() {
		const { volume } = this.state;
		try {
			await Audio.setIsEnabledAsync(true);
		}catch(e){
			console.log(e)
		}
	
		const questionList = this.state.questionList
		// load the audio for the audio feedback
		try{
			const status = {
				shouldPlay: false,
				volume
			}
			await correctSound.loadAsync(sounds.correct)
			await incorrectSound.loadAsync(sounds.incorrect)
		}catch(e){
			console.log(e)
		}

		// load the audio for the questions
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
		if(!this.state.endQuiz){
			this.playAudio()
		}
        
	}

    playAudio = async () => {
		try { 
			if(soundObjects[this.state.audioName]){
				await soundObjects[this.state.audioName].replayAsync();
			}
		} catch(e) {
			console.log(e)
		}
	}

	// HANDLING QUESTIONS
	
	pickAnswer = answerValue => async () => {
		const correctAnswer = this.state.answers[this.state.answer]

		if(answerValue === correctAnswer){
			try{
				await correctSound.replayAsync()
			} catch (e){
				console.log(e)
			}
			if(this.state.gaveCorrectAnswer != false){
				this.setState({score: (this.state.score + 1)})
			}
			this.getNextQuestion()
		} else {
			try{
				await incorrectSound.replayAsync()
			} catch (e){
				console.log(e)
			}
			this.setState({gaveCorrectAnswer: false})
		}
	}

	getNextQuestion = async () => {
		let index = this.state.currentIndex + 1
		if(index == this.state.questionListLen){
			// end the quiz - need to give a score and navigate back to lesson
			this.setState({endQuiz: true})
		} else {
			const next = this.state.questionList[index]

			try { 
				await this.setState({
					question: next.question,
					answers: next.answers,
					answer: next.answer,
					audioName: next.audioName,
					currentIndex: index,
					gaveCorrectAnswer: null,
				})
			} catch(e){
				console.log(e)
			}

			this.playAudio()

		}
		
	}

	// RENDER

    render() {
		// return the score screen if the quiz is over
		if(this.state.endQuiz){
			return (
				<ScoreScreen
					score={this.state.score}
					possibleScore={this.state.questionListLen}
					navigation={this.state.navigation}/>
			)
		}

        return (
            <View style={styles.screen}>
				<View style={styles.questionInfoView}>
                	<Text style={styles.questionText}>{this.state.question}</Text>
					<Text style={styles.questionNumber}>{this.state.currentIndex + 1}/{this.state.questionListLen}</Text>
				</View>
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
								onPress={this.pickAnswer(value)}/>
						))
					}
		    		</View>
		    	</View>
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
	questionInfoView:{
		flexDirection: 'row',
		backgroundColor: colors.background,
		padding: 10,
		alignContent: 'flex-end',
		borderRadius: 10,
	},
	questionNumber: {
		color: 'black',
		fontSize: 18,
		alignItems: 'center',
		fontWeight: 'bold',
		flex: 1
	},
    questionText: {
        color: 'black',
		fontSize: 18,
		alignSelf: 'flex-end',
		flex: 8
    }
});