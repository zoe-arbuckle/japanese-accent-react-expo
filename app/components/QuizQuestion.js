import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native'
import { Component } from 'react'

import { Audio } from 'expo-av'

import colors from '../config/colors.js'

export default class QuizQuestion extends Component {

	state = {
		isPlaying: false,
		playbackInstance: null,
		currentIndex: 0,
		volume: 1.0,
		isBuffering: false
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
		await this.state.playbackInstance.unloadAsync();
	}

    async loadAudio() {
		const { isPlaying, volume} = this.state;
        try{
			const playbackInstance = new Audio.Sound();
			
			const status = {
				shouldPlay: isPlaying,
				volume
			}

			await playbackInstance.loadAsync(require('../assets/sounds/biza.mp3'), status, true);
			this.setState({playbackInstance})

        } catch(e){
            console.log(e);
        }
	}

    playAudio = async () => {
		console.log("playing audio")
		const { playbackInstance } = this.state;
		await playbackInstance.replayAsync();


    }

    render() {
        return (
            <View style={styles.screen}>
                <Text style={styles.questionText}>Which word do you hear?</Text>
		    	<View style={styles.buttonView}>
		    		<TouchableOpacity style={styles.audioButton} onPress={this.playAudio}>
		    			<Image source={require('../assets/images/audio.png')} style={styles.audioImage}/>
		    		</TouchableOpacity>
		    		<View style={styles.answerView}>
		    			<TouchableOpacity style={styles.answerButton}>
		    				<Text style={styles.answerText}>Button 1</Text>
		    			</TouchableOpacity>
		    			<TouchableOpacity style={styles.answerButton}>
		    				<Text style={styles.answerText}>Button 2</Text>
		    			</TouchableOpacity>
		    		</View>
		    	</View>
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