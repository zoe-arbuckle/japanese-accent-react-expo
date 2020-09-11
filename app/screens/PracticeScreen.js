import React from 'react'

import MultipleChoiceQuiz from '../components/MultipleChoiceQuiz'

// function for playing audio when audio button pressed

// function for selecting an answer

function PracticeScreen({ route, navigation }) {
    const { quiz } = route.params;
    // console.log(quiz.questions);
    const questions = quiz.questions;
    return (
        <MultipleChoiceQuiz
            questions={questions}
        ></MultipleChoiceQuiz>
    );
};



export default PracticeScreen;