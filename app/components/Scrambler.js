import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, Modal } from "react-native";
import { Component } from "react";

import { Audio } from "expo-av";

import colors from "../config/colors.js";
import sounds from '../config/sounds.js'
import ScoreScreen from '../screens/ScoreScreen';
import ScrambleButton from './ScrambleButton';

// constant values
const soundObjects = {}
const correctSound = new Audio.Sound()
const incorrectSound = new Audio.Sound()

export default class Scrambler extends Component {
    // INITIALIZATION
    state = {}

    constructor(props){
        super(props)

        let questionArray = props.questions
        var len;

        if(props.chooseNumber){
            len = props.chooseNumber;
        } else {
            len = questionArray.length;
        }

        for(let i = questionArray.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * i)

			const temp = questionArray[i]
			questionArray[i] = questionArray[j]
            questionArray[j] = temp
            
        }

        questionArray = questionArray.slice(0, len)

        //shuffles answers too
        for(let i = 0; i < questionArray.length; i++){
            let q = questionArray[i]
            for(let j = 0; j < q.answers.length; j++){
                const k = Math.floor(Math.random() * j)
                const temp = q.answers[j]
                q.answers[j] = q.answers[k]
                q.answers[k] = temp
            }
            questionArray[i].answers = q.answers
        }
        
        this.state = {
            volume: 1,
			questionList: questionArray,
			question: questionArray[0].question,
			answers: questionArray[0].answers,
			answer: questionArray[0].answer,
			audioName: questionArray[0].audioName,
			currentIndex: 0,
			questionListLen: questionArray.length,
			endQuiz: false,
			score: 0,
            navigation: props.navigation,
            currentAnswer: [],
            modalVisible: false,
            multiAudio: props.multiAudio,
        };
    };

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
				if(soundObjects[this.state.audioName[0]]){
					await soundObjects[this.state.audioName[0]].replayAsync();
				} else if(await soundObjects[this.state.audioName[1]]) {
					await soundObjects[this.state.audioName[1]].replayAsync();
				}
			}
		} catch(e) {
			console.log(e)
		}
	}

    // HANDLING QUESTIONS
    addAnswer = value => async () => {
        // should consider removing from answer list
        let currentAnswerVal = this.state.currentAnswer

        currentAnswerVal.push(value)

        try {
            await this.setState({currentAnswer: currentAnswerVal})
        } catch (e) {
            console.log(e)
        }
    };

    clearAnswer = async () => {
        try {
            await this.setState({currentAnswer: []})
        } catch (e) {
            console.log(e)
        }
    }

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
                await correctSound.replayAsync()
            }
            if(this.state.questionList[this.state.currentIndex].meaning != undefined){
				this.setState({modalVisible: true})
				setTimeout(() => {this.getNextQuestion()}, 1500)
			} else {
				this.getNextQuestion()
			}
        } else {
            this.setState({gaveCorrectAnswer: false})
            await incorrectSound.replayAsync()
        }
    }

    getNextQuestion = async () => {
        this.setState({modalVisible: false})
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
                    audioName: next.audioName,
                    currentIndex: index,
                    gaveCorrectAnswer: null,
                    currentAnswer: [],
                })
            } catch (e){
                console.log(e)
            }

            this.playAudio()
        }
        // console.log(this.state.answer)
    }

    render() {
        if(this.state.endQuiz){
            return <ScoreScreen 
                score={this.state.score}
                possibleScore={this.state.questionListLen}
                navigation={this.state.navigation}/>
        }

        return (
            <SafeAreaView style={styles.screen}>
                <Modal visible={this.state.modalVisible && this.state.questionList[this.state.currentIndex].meaning != undefined} animationType="slide" transparent={true}
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
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.clearAnswerButton} onPress={this.clearAnswer}>
                        <Text style={styles.checkAnswerText}>Clear Answer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.checkAnswerButton} onPress={this.checkAnswer}>
                        <Text style={styles.checkAnswerText}>Check Answer</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

}

// STYLES

const styles = StyleSheet.create({
    answerView: {
        flexDirection: 'column',
        flex: 2,
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
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
    buttonView:{
        flexDirection: "row",
        flex: 2,
        margin: 10,
        justifyContent: 'center'
    },
    currentAnswerView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        flex: 2,
    },
    checkAnswerButton: {
        backgroundColor: colors.primary,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 24,
        flex: 1,
        margin: 20,
        height: 50
    },
    checkAnswerText:{
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    clearAnswerButton: {
        backgroundColor: colors.secondary,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 24,
        flex: 1,
        margin: 20,
        height: 50
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
    scrambleButtonView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignContent: 'flex-end',
        flex: 1,
    },
    screen: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    questionText: {
        color: 'black',
		fontSize: 24,
		flex: 8
    },
    questionNumber: {
		color: 'black',
		fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
		flex: 1
	},
    questionInfoView:{
		flexDirection: 'row',
		backgroundColor: colors.primary,
		padding: 10,
        alignSelf: 'flex-start',
		borderRadius: 5,
	},
})