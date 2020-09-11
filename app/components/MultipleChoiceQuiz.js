import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native'
import { Component } from 'react'

import { Audio } from 'expo-av'

import colors from '../config/colors.js'
import sounds from '../config/sounds.js'

// constant values
const soundObjects = {}

export default class MultipleChoiceQuiz extends Component {
	state = {
		playbackInstance: null,
		volume: 1.0,
		questionList: null,
		question: null,
		answers: [],
		answer: 0,
		audioName: null,
		questionListLen: 0,
	}

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
		};
	}

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
			});
			this.loadAudio();
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
	
	pickAnswer = () => {

	}

	getNextQuestion = () => {
		let index = this.state.currentIndex + 1
		if(index == this.state.questionListLen){
			// end the quiz
			this.setState({endQuiz: true})
		} else {
			const next = this.state.questionList[index]

			this.setState({
				question: next.question,
				answers: next.answers,
				answer: next.answer,
				audioName: next.audioName,
				currentIndex: index,
			})
		}
		
	}

    render() {
        return (
            <View style={styles.screen}>
                <Text style={styles.questionText}>{this.state.question}</Text>
		    	<View style={styles.buttonView}>
		    		<TouchableOpacity style={styles.audioButton} onPress={this.playAudio}>
		    			<Image source={require('../assets/images/audio.png')} style={styles.audioImage}/>
		    		</TouchableOpacity>
		    		<View style={styles.answerView}>
		    			<TouchableOpacity style={styles.answerButton}>
		    				<Text style={styles.answerText}>{this.state.answers[0]}</Text>
		    			</TouchableOpacity>
		    			<TouchableOpacity style={styles.answerButton}>
		    				<Text style={styles.answerText}>{this.state.answers[1]}</Text>
		    			</TouchableOpacity>
		    		</View>
		    	</View>
				<TouchableOpacity style={styles.answerButton} onPress={this.getNextQuestion}>
					<Text>{this.state.endQuiz ? "End Quiz" : "Next Question" }</Text>
				</TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
	answerButton: {
		margin: 10,
		width: '100%',
		height: 50,
		backgroundColor: colors.purduegold,
		justifyContent: 'center',
		alignItems: 'center',
	},
	answerText: {
		color: 'black',
		fontSize: 18,
	},
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