import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';

import colors from '../config/colors.js'

// function for playing audio when audio button pressed

// function for selecting an answer

function PracticeScreen({ navigation }) {
    return (
        <View style={styles.screen}>
            <Text style={styles.questionText}>Which word do you hear?</Text>
			<View style={styles.buttonView}>
				<TouchableOpacity style={styles.audioButton}>
					<Image source={require('../assets/Images/audio.png')} style={styles.audioImage}/>
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
};

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

export default PracticeScreen;