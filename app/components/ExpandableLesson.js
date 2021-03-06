import React, {Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import colors from '../config/colors';
import LessonButton from './LessonButton';
import { Ionicons } from '@expo/vector-icons';

export default class ExpandableLesson extends Component {
    constructor(props) {
        super(props)

        this.state = {
            subsections: props.data,
            titleEnglish: props.titleEnglish,
            titleJapanese: props.titleJapanese,
            expanded: false,
            navigation: props.navigation,
            self: props.self,
            japanese: props.japanese,
        }
    }

    UNSAFE_componentWillUpdate({japanese}){
        if(this.state.japanese != japanese){
            this.setState((state, props) => {
                return {
                    japanese: props.japanese
                }
            })
        }
    }

    render() {
        return (
            <View>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.toggleExpand()}>
                    <Text style={styles.buttonText}>{this.state.japanese ? this.state.titleJapanese : this.state.titleEnglish}</Text>
                    <Ionicons name={this.state.expanded ? 'caret-down': 'caret-forward'} 
                        size={32} color="white" style={styles.arrow}/>
                </TouchableOpacity>
                {
                    this.state.expanded && this.state.subsections.map((item, index) => (
                        <LessonButton
                            key={item.lessonid}
                            title={item.lessonName}
                            onPress={() => this.state.navigation.navigate('Lesson', {
                                data: item,
                            })}
                        />
                    ))
                }
            </View>
        )
    }

    toggleExpand = () => {
        if(this.state.subsections != undefined){
            this.setState({expanded: !this.state.expanded})
        } else {
            this.state.navigation.navigate('Lesson', {
                data: this.state.self,
            })
        }
    }
}

const styles = StyleSheet.create({
    arrow: {
        alignSelf: 'flex-end',
        justifyContent: 'flex-end'
    },
    buttonContainer: {
        width: '100%',
        elevation: 8,
        backgroundColor: colors.primary,
        borderRadius: 10,
        paddingVertical: 10,
        marginVertical: 10,
        flexDirection: "row",
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    buttonText: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase'
    }
})