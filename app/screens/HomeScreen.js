import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import LessonButton from '../components/LessonButton';

import data from '../assets/data'

let lessons = data.lessons;
// console.log(lessons);

function HomeScreen({ navigation }) {
    return (
        <View style={styles.screen}>
            <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
            <View style={styles.lessons}>{
               lessons.map((item, index) => (
                    <LessonButton 
                        key={item.lessonid}
                        title={item.lessonName}
                        onPress={() => navigation.navigate('Lesson', {
                            data: item,
                        })}/>
                    ))}
            </View>
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
    lessons: {
        flex: 5,
        backgroundColor: 'white',
        overflow: 'scroll',
        alignContent: 'center',
        justifyContent: 'center',
        width: '90%',
    },
    logo: {
        flex: 2,
        resizeMode: 'contain',
        alignSelf: 'center',
    }
});

export default HomeScreen;