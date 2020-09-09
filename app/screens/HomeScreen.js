import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import LessonButton from '../components/LessonButton';

import data from '../assets/data'

let lessons = data.lessons;
console.log(lessons);

function HomeScreen({ navigation }) {
    return (
        <View style={styles.screen}>
           {
                    lessons.map((item, index) => (
                        
                        <LessonButton 
                            key={item.lessonid}
                            title={item.lessonName}
                            onPress={() => navigation.navigate('Lesson', {
                                lessonName: item.lessonName,
                            })}>
                        </LessonButton>
                    ))
                }
        </View>
    );
};

const styles =  StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomeScreen;