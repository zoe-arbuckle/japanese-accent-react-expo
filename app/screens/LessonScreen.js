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
    let max = 1

    if(data.quiz != undefined && data.quiz.questions.length > 0){
        buttons.push(
            <Button 
                title="Multiple Choice Quiz"
                key="Practice"
                onPress={() => navigation.navigate('Practice', {
                    quiz: data.quiz,
                })}
                style={styles.practiceButton}/>)
    }

    if(data.chooseAmountQuiz != undefined && data.chooseAmountQuiz.questions.length > 0){
        max = data.chooseAmountQuiz.questions.length
        if(max == undefined){
            max = 1
        }

        buttons.push(
            <Button 
                title="Multiple Choice Quiz 2"
                key="Practice 2"
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.practiceButton}/>)
    }

    if(data.scrambler != undefined && data.scrambler.questions.length > 0){
        buttons.push(
            <Button 
                title="Scrambler"
                key="Scrambler Practice"
                onPress={() => navigation.navigate('Practice', {
                    scrambler: data.scrambler,
                })}
                style={styles.practiceButton}/>
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
                            navigation.navigate('Practice', {
                                chooseAmountQuiz: data.chooseAmountQuiz,
                                numQuestions: fitInputToRange(selectedOption, max),
                            })
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