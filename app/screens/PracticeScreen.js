import React from 'react'
import { Text } from 'react-native'

import MultipleChoiceQuiz from '../components/MultipleChoiceQuiz'
import Scrambler from '../components/Scrambler';

// function for playing audio when audio button pressed

// function for selecting an answer

function PracticeScreen({
    route,
    navigation
}) {
    const {
        quiz,
        scrambler
    } = route.params;
    // console.log(quiz.questions);
    if (quiz != undefined) {
        const questions = quiz.questions;
        if (questions.length == 0) {
            return ( <Text> There are no questions: ) </Text>)
        } else {
            return ( <MultipleChoiceQuiz questions = {
                questions
            } navigation = {
                navigation
            } />);
        }
    }
    if (scrambler != undefined) {
        const questions = scrambler.questions
        return ( <Scrambler questions = {
            questions
        } navigation = {
            navigation
        } /> )
    }
}



export default PracticeScreen;