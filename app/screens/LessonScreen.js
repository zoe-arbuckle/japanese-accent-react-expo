import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button, Modal } from 'react-native';

function LessonScreen({ route, navigation }) {
    const { data } = route.params;
    let buttons = [];

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
        buttons.push(
            <Button 
                title="Multiple Choice Quiz 2"
                key="Practice 2"
                // onPress={() => navigation.navigate('Practice', {
                //     chooseAmountQuiz: data.chooseAmountQuiz,
                // })}
                onPress={() => modalVisible = modalVisible}
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
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalView}>
                    <Text>Hello Modal</Text>
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

const styles = StyleSheet.create({
    buttonView: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        flex: 1,
        justifyContent: 'center',
        marginBottom: 20,
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
    screen: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    text: {
        color: 'black',
        fontSize: 18,
        marginTop: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'darkblue',
    }
});

export default LessonScreen;