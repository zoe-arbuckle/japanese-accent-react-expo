import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View, Image, SafeAreaView, Modal } from 'react-native'
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

		let array = props.questions
		var len;

		if (props.chooseNumber){
			len = props.chooseNumber;
		} else {
			len = array.length;
		}

		// shuffle the question array using the Fisher-Yates method

		for(let i = array.length - 1; i > 0; i--){
			const j = Math.floor(Math.random() * i)
			const temp = array[i]
			array[i] = array[j]
			array[j] = temp
		}

		array = array.slice(0, len)

		this.state = {
			volume: 1,
			questionList: array,
			question: array[0].question,
			answers: array[0].answers,
			answer: array[0].answer,
			audioName: array[0].audioName,
			currentIndex: 0,
			questionListLen: array.length,
			endQuiz: false,
			score: 0,
			navigation: props.navigation,
			multiAudio: props.multiAudio,
			modalVisible: false,
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
		for(const obj in soundObjects){
			try {
				soundObjects[obj].unloadAsync();
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
			let audioName;
			if(this.state.multiAudio){
				const index = Math.floor(Math.random() * Math.floor(2))
				audioName = questionList[question].audioName[index]
			} else {
				audioName = questionList[question].audioName
			}
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
		const correctAnswer = this.state.answer

		if(answerValue === correctAnswer){
			try{
				await correctSound.replayAsync()
			} catch (e){
				console.log(e)
			}
			if(this.state.gaveCorrectAnswer != false){
				this.setState({score: (this.state.score + 1)})
			}
			this.setState({modalVisible: true})
			setTimeout(() => {this.getNextQuestion()}, 1500)
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
		this.setState({modalVisible: false})
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
            <SafeAreaView style={styles.screen}>
				<Modal visible={this.state.modalVisible} animationType="slide" transparent={true}
					onRequestClose={() => this.setState({modalVisible: false})} supportedOrientations={['landscape']}>
					<View style={styles.modalView}>
						<Text style={styles.meaningText}>
							{this.state.questionList[this.state.currentIndex].meaning}
						</Text>
					</View>
				</Modal>
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
            </SafeAreaView>
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
	meaningText: {
		color: 'black',
		fontSize: 24,
	},
	modalView: {
		margin: 20,
		backgroundColor: colors.correct,
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		alignSelf: 'center',
		shadowColor: "#000",
		shadowOffset: {
		  width: 0,
		  height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		position: 'absolute',
		bottom: 0,
		width: '95%'
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
		backgroundColor: colors.primary,
		padding: 10,
		alignContent: 'flex-end',
		borderRadius: 10,
	},
	questionNumber: {
		color: 'black',
		fontSize: 24,
		alignItems: 'center',
		fontWeight: 'bold',
		flex: 1
	},
    questionText: {
        color: 'black',
		fontSize: 24,
		alignSelf: 'flex-end',
		flex: 8
    }
});