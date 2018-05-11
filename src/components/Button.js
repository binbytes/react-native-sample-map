import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

class Button extends Component {
    state = {}
    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <Text>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ccc',
        margin: 8,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default Button;