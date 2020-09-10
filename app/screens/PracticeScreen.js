import React from 'react'

import QuizQuestion from '../components/QuizQuestion'

// function for playing audio when audio button pressed

// function for selecting an answer

function PracticeScreen({ route, navigation }) {
    const { quiz } = route.params;
    console.log(quiz.questions);
    return (
        <QuizQuestion></QuizQuestion>
    );
};



export default PracticeScreen;