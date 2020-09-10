import React from 'react'

import QuizQuestion from '../components/QuizQuestion'

// function for playing audio when audio button pressed

// function for selecting an answer

function PracticeScreen({ route, navigation }) {
    const { quiz } = route.params;
    // console.log(quiz.questions);
    const currentQuestion = quiz.questions[0];
    return (
        <QuizQuestion
            question={currentQuestion.question}
            answers={currentQuestion.answers}
            answer={currentQuestion.answer}
            audioName={currentQuestion.audioName}
        ></QuizQuestion>
    );
};



export default PracticeScreen;