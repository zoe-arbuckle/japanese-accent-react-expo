import React from 'react'
import { Text } from 'react-native'

import MultipleChoiceQuiz from '../components/MultipleChoiceQuiz'
import SpellOutQuiz from '../components/SpellOutQuiz';

// function for playing audio when audio button pressed

// function for selecting an answer

function PracticeScreen({
    route,
    navigation
}) {
    const {
        quiz,
        spellQuiz
    } = route.params;
    // console.log(quiz.questions);
    if (quiz != undefined) {
        const questions = quiz.questions;
        if (questions.length == 0) {
            return ( <Text> There are no questions: ) </Text>)
        } else {
            return ( <MultipleChoiceQuiz questions = {
                questions
            }
            navigation = {
                navigation
            } >
            </MultipleChoiceQuiz>);
        }
    }
    if (spellQuiz != undefined) {
        return ( <SpellOutQuiz/> )
    }
}



export default PracticeScreen;