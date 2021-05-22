import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button, Modal, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import colors from '../config/colors';
import { Ionicons } from '@expo/vector-icons';
import PracticeButton from '../components/PracticeButton';

function LessonScreen({ route, navigation }) {
    const { data } = route.params;
    let buttons = [];
    const [ modalVisible, setModalVisible ] = useState(false)
    const [ selectedOption, setSelectedOption ] = useState("1")
    const [ validationVisible, setValidationVisible ] = useState(false)
    const [ quizType, setQuizType ] = useState('')
    const [ max, setMax ] = useState(1)
    const [ pitchData, setPitchData ] = useState({})

    if(data.multipleChoiceQuiz != undefined && data.multipleChoiceQuiz.questions.length > 0){
        buttons.push(
            <PracticeButton 
                title="Multiple Choice"
                key="multipleChoice"
                onPress={() => {
                    setMax(data.multipleChoiceQuiz.questions.length)
                    setSelectedOption(data.multipleChoiceQuiz.questions.length.toString())
                    setModalVisible(true)
                    setQuizType('multipleChoiceQuiz')
                }}
                style={styles.practiceButton}/>)
    }

    if(data.scrambler != undefined && data.scrambler.questions.length > 0){
        buttons.push(
            <PracticeButton 
                title="Scrambler"
                key="scrambler"
                onPress={() => {
                    setMax(data.scrambler.questions.length)
                    setSelectedOption(data.scrambler.questions.length.toString())
                    setModalVisible(true)
                    setQuizType('scrambler')
                }}
                style={styles.practiceButton}/>
        )
    }

    if(data.conversationQuiz != undefined && data.conversationQuiz.questions.length  > 0){
        buttons.push(
            <PracticeButton
                title="Conversation Quiz"
                key="conversation"
                onPress={() => {
                    setMax(data.conversationQuiz.questions.length)
                    setSelectedOption(data.conversationQuiz.questions.length.toString())
                    setModalVisible(true)
                    setQuizType('conversation')
                }}
                style={styles.practiceButton}/>
        )
    }

    if(data.letterSoundQuiz != undefined && data.letterSoundQuiz.questions.length > 0){
        buttons.push(
            <PracticeButton 
                title="Mora Basics"
                key="letterSound"
                onPress={() => {
                    setMax(data.letterSoundQuiz.questions.length)
                    setSelectedOption(data.letterSoundQuiz.questions.length.toString())
                    setModalVisible(true)
                    setQuizType('letterSound')
                }}
                style={styles.practiceButton}
            />
        )
    }

    if(data.pitchQuiz != undefined){
        for (var index in data.pitchQuiz.quizNames){
            const name = data.pitchQuiz.quizNames[index]
            if(data[name] != undefined && data[name].questions.length > 0){
                buttons.push(
                    <PracticeButton 
                        title={name}
                        key={name}
                        onPress={() => {
                            setMax(data[name].questions.length)
                            setSelectedOption(data[name].questions.length.toString())
                            setModalVisible(true)
                            setQuizType('pitchQuiz')
                            setPitchData(data[name])
                        }}
                        style={styles.practiceButton}
                    />
                )
            }
            
        }
        
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
                            navigateTo(navigation, data, selectedOption, max, quizType, pitchData)
                            setValidationVisible(false)
                            setSelectedOption("1")
                        }
                    }}/>
                </View>
            </Modal>
            <View style={styles.lessonView}>
                <Text style={styles.title}>{data.lessonName}</Text>
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

function navigateTo(navigation, data, selectedOption, max, quizType, pitchData){
    switch (quizType) {
        case 'multipleChoiceQuiz':
            navigation.navigate('Practice', {
                multipleChoice: data.multipleChoiceQuiz,
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
        case 'pitchQuiz':
            navigation.navigate('Practice',{
                pitchQuiz: pitchData,
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
        flex: 4,
        justifyContent: 'center',
        alignItems:'flex-start',
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
        flex: 1,
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
        width: '80%',
        elevation: 8,
        backgroundColor: colors.primary,
        borderRadius: 10,
        paddingVertical: 10,
        marginVertical: 10,
        alignSelf: 'center'
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
        marginTop: 20,
    }
});

export default LessonScreen;