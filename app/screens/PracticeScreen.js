import React from 'react'
import { Text } from 'react-native'

import MultipleChoiceQuiz from '../components/MultipleChoiceQuiz'
import Scrambler from '../components/Scrambler';
import LetterSoundQuiz from '../components/LetterSoundQuiz';
import { getNativeSourceFromSource } from 'expo-av/build/AV';
import PitchQuiz from '../components/PitchQuiz';

// function for playing audio when audio button pressed

// function for selecting an answer

function PracticeScreen({
    route,
    navigation
}) {
    const {
        multipleChoice,
        scrambler,
        conversation,
        letterSound,
        pitchQuiz,
        numQuestions,
        mode,
    } = route.params;

    if(multipleChoice != undefined){
        const questions = multipleChoice.questions;
        return (
            <MultipleChoiceQuiz questions = {
                questions
            } chooseNumber={
                numQuestions
            } navigation = {
                navigation
            } />
        );
    }

    if(conversation != undefined){
        const questions = conversation.questions;
        return (
            <MultipleChoiceQuiz questions = {
                questions
            } chooseNumber = {
                numQuestions
            } multiAudio = {
                true
            } navigation = {
                navigation
            } />
        );
    }

    if (scrambler != undefined) {
        const questions = scrambler.questions
        return ( <Scrambler questions = {
            questions
        } chooseNumber = {
            numQuestions
        } multiAudio = {
            scrambler.multiAudio
        } navigation = {
            navigation
        } /> )
    }

    if (letterSound != undefined) {
        const questions = letterSound.questions
        return ( <LetterSoundQuiz questions = {
            questions
        } chooseNumber ={
            numQuestions
        } navigation = {
            navigation
        } mode ={
            mode
        } />)
    }

    if(pitchQuiz != undefined){
        const questions = pitchQuiz.questions
        return ( <PitchQuiz questions = {
            questions
        } chooseNumber = {
            numQuestions
        } navigation = {
            navigation
        }   
        />)
    }
}



export default PracticeScreen;