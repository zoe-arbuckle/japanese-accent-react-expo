import React from 'react'
import { Text } from 'react-native'

import MultipleChoiceQuiz from '../components/MultipleChoiceQuiz'

// function for playing audio when audio button pressed

// function for selecting an answer

function PracticeScreen({ route, navigation }) {
    const { quiz } = route.params;
    // console.log(quiz.questions);
    const questions = quiz.questions;
    if(questions.length == 0){
        return (
            <Text>There are no questions :)</Text>
        )
    } else {
        return (
            <MultipleChoiceQuiz
                questions={questions}
            ></MultipleChoiceQuiz>
        );
    }
};



export default PracticeScreen;