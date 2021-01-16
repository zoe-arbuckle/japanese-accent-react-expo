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
           {
                    lessons.map((item, index) => (
                        
                        <LessonButton 
                            key={item.lessonid}
                            title={item.lessonName}
                            onPress={() => navigation.navigate('Lesson', {
                                data: item,
                            })}/>
                    ))
                }
        </View>
    );
};

const styles =  StyleSheet.create({
    screen: {
        flex: 5,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'scroll',
    },
    logo: {
        flex: 1,
        height: 20,
        resizeMode: 'contain',
    }
});

export default HomeScreen;