import React, { useState } from 'react';
import { Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Image, View, Modal } from 'react-native';

import data from '../assets/data'
import ExpandableLesson from '../components/ExpandableLesson';
import colors from '../config/colors';
import { Ionicons } from '@expo/vector-icons';

let lessons = data.lessons;

function HomeScreen({ navigation }) {
    var [ japanese, setJapanese ] = useState(false);
    const [ modalVisible, setModalVisible ] = useState(false)

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.header}>
                <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
                <TouchableOpacity onPress={() => {setModalVisible(true)}}> 
                    <Ionicons name={'settings'} 
                        size={32} color="black" style={styles.settings}/>
                </TouchableOpacity>
            </View>
            <Modal visible={modalVisible} animationType="slide" transparent={true}
                onRequestClose={() => setModalVisible(false)} supportedOrientations={['landscape']}>
                <View style={styles.modalView}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeModal}>
                        <Ionicons name='ios-close' size={32} color="black"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.languageButton} onPress={() => {
                    setJapanese(false)
                    setModalVisible(false)
                }}>
                    <Text style={styles.buttonText}>English</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.languageButton} onPress={() => {
                    setJapanese(true)
                    setModalVisible(false)
                }}>
                    <Text style={styles.buttonText}>日本語</Text>
                </TouchableOpacity>
                </View>
            </Modal>
            <ScrollView style={styles.lessons}>{
               lessons.map((item, index) => (
                   <ExpandableLesson 
                        japanese={japanese}
                        key={item.lessonid}
                        self={item}
                        titleEnglish={item.lessonName}
                        titleJapanese={item.lessonJapanese}
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
    },
    header: {
        flexDirection: 'row',
        flex: 0.5,
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%'
    },
    languageButton: {
        width: '100%',
        backgroundColor: colors.secondary,
        borderRadius: 10,
        paddingVertical: 10,
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    settings: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
    },
    modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
		  width: 0,
		  height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
        elevation: 5,
    },
    closeModal: {
        alignSelf: 'flex-start'
    },
    buttonText: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
    }
});

export default HomeScreen;