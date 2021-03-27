import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button, Modal, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import colors from '../config/colors';
import { Ionicons } from '@expo/vector-icons';


function LessonScreen({ route, navigation }) {
    const { data } = route.params;
    let buttons = [];
    const [ modalVisible, setModalVisible ] = useState(false)
    const [ selectedOption, setSelectedOption ] = useState("1")
    const [ validationVisible, setValidationVisible ] = useState(false)
    const [ quizType, setQuizType ] = useState('')
    let max = 1

    if(data.multipleChoiceQuiz != undefined && data.multipleChoiceQuiz.questions.length > 0){
        max = data.multipleChoiceQuiz.questions.length
        if(max == undefined){
            max = 1
        }

        buttons.push(
            <Button 
                title="Multiple Choice"
                key="multipleChoice"
                onPress={() => {
                    setModalVisible(true)
                    setQuizType('multipleChoiceQuiz')
                }}
                style={styles.practiceButton}/>)
    }

    if(data.scrambler != undefined && data.scrambler.questions.length > 0){
        max = data.scrambler.questions.length
        if(max == undefined){
            max = 1
        }
        buttons.push(
            <Button 
                title="Scrambler"
                key="scrambler"
                onPress={() => {
                    setModalVisible(true)
                    setQuizType('scrambler')
                }}
                style={styles.practiceButton}/>
        )
    }

    if(data.conversationQuiz != undefined && data.conversationQuiz.questions.length  > 0){
        buttons.push(
            <Button
                title="Conversation Quiz"
                key="conversation"
                onPress={() => {
                    setModalVisible(true)
                    setQuizType('conversation')
                }}
                style={styles.practiceButton}/>
        )
    }

    if(data.letterSoundQuiz != undefined && data.letterSoundQuiz.questions.length > 0){
        buttons.push(
            <Button 
                title="Mora Basics"
                key="letterSound"
                onPress={() => {
                    setModalVisible(true)
                    setQuizType('letterSound')
                }}
                style={styles.practiceButton}
            />
        )
    }

    return (
        <SafeAreaView style={styles.screen}>
            <Modal visible={modalVisible} animationType="slide" transparent={true} 
                onRequestClose={() => setModalVisible(false)} supportedOrientations={['landscape']}>
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeModal}>
                        <Ionicons name='ios-close' size={32} color="black"/>
                    </TouchableOpacity>
                    <Text style={styles.text}>Please enter the number of questions you would like to practice between 1 and {max}.</Text>
                    { validationVisible && <Text style={styles.errorText}>Please enter a valid number.</Text>}
                    <TextInput style={styles.picker} value={selectedOption} onChangeText={(text) => {
                        setSelectedOption(text)
                    }}/>
                    <Button style={styles.practiceButton} title="Practice!" onPress={() => {
                        if(isNaN(parseInt(selectedOption))){
                            setValidationVisible(true)
                        } else {
                            setModalVisible(false)
                            navigateTo(navigation, data, selectedOption, max, quizType)
                            setValidationVisible(false)
                            setSelectedOption("1")
                        }
                    }}/>
                </View>
            </Modal>
            <View style={styles.lessonView}>
                <Text style={styles.title}>{data.lessonName}</Text>
                <View>
                    <Text style={styles.text}>{data.lessonText}</Text>
                </View>
            </View>
            <View style={styles.buttonView}>
                {buttons}
            </View>
            
        </SafeAreaView>
    );
};

function fitInputToRange(value, max){
    const intValue = parseInt(value)

    if (intValue < 1){
        return 1;
    } else if (intValue > max){
        return max;
    } else {
        return intValue;
    }
}

function navigateTo(navigation, data, selectedOption, max, quizType){
    switch (quizType) {
        case 'multipleChoiceQuiz':
            navigation.navigate('Practice', {
                multipleChoiceQuiz: data.multipleChoiceQuiz,
                numQuestions: fitInputToRange(selectedOption, max),
            })
            return;
        case 'scrambler':
            navigation.navigate('Practice', {
                scrambler: data.scrambler,
                numQuestions: fitInputToRange(selectedOption, max),
            })
            return;
        case 'conversation':
            navigation.navigate('Practice', {
                conversation: data.conversationQuiz,
                numQuestions: fitInputToRange(selectedOption, max),
            })
            return;
        case 'letterSound':
            navigation.navigate('Mode',{
                letterSound: data.letterSoundQuiz,
                numQuestions: fitInputToRange(selectedOption, max)
            })
            return;
        default:
            console.log("Unknown Quiz Type")
    }

}

const styles = StyleSheet.create({
    buttonView: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        flex: 1,
        justifyContent: 'center',
        marginBottom: 20,
    },
    closeModal: {
        alignSelf: 'flex-start'
    },
    errorText: {
        color: 'red',
        fontSize: 18,
        margin: 20,
    },
    lessonView: {
        flex: 6, 
    },
    modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
		  width: 0,
		  height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
        elevation: 5,
    },
    practiceButton: {
        margin: 30,
    },
    picker: {
        height: 50,
        width: 100,
        borderBottomColor: colors.primary,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        padding: 10,
    },
    screen: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    text: {
        color: 'black',
        fontSize: 18,
        margin: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'darkblue',
    }
});

export default LessonScreen;