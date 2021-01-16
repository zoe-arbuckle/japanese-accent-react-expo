import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Image } from 'react-native';

import LessonButton from '../components/LessonButton';

import data from '../assets/data'

let lessons = data.lessons;
// console.log(lessons);

function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.screen}>
            <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
            <ScrollView style={styles.lessons}>{
               lessons.map((item, index) => (
                    <LessonButton 
                        key={item.lessonid}
                        title={item.lessonName}
                        onPress={() => navigation.navigate('Lesson', {
                            data: item,
                        })}/>
                    ))}
            </ScrollView>
        </SafeAreaView>
        
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
    lessons: {
        flex: 6,
        backgroundColor: 'white',
        overflow: 'scroll',
        alignContent: 'center',
        width: '90%',
    },
    logo: {
        flex: 0.5,
        resizeMode: 'contain',
        alignSelf: 'center',
    }
});

export default HomeScreen;