import React, {Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import colors from '../config/colors';
import LessonButton from './LessonButton';
import { Ionicons } from '@expo/vector-icons'

export default class ExpandableLesson extends Component {
    constructor(props) {
        super(props)

        this.state = {
            subsections: props.data,
            expanded: false,
            title: props.title,
            navigation: props.navigation,
        }
    }

    render() {
        return (
            <View>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.toggleExpand()}>
                    <Text style={styles.buttonText}>{this.state.title}</Text>
                    <Ionicons name={this.state.expanded ? 'md-arrow-dropdown': 'md-arrow-dropright'} 
                        size={32} color={colors.purduegray} style={styles.arrow}/>
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