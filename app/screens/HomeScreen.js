import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Image } from 'react-native';

import data from '../assets/data'
import ExpandableLesson from '../components/ExpandableLesson';

let lessons = data.lessons;

function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.screen}>
            <View>
                <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
                {/* TODO Add toggle language button */}
            </View>
            <ScrollView style={styles.lessons}>{
               lessons.map((item, index) => (
                   <ExpandableLesson 
                        key={item.lessonid}
                        self={item}
                        title={item.lessonName}
                        navigation={navigation}
                        data={item.subsections}
                   />
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