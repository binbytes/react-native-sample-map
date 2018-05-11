import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from './components/Button'

export default class App extends Component {

    constructor(props) {
        super(props)
        this.nav = this.props.navigation
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title={'Simple Map'} style={styles.button} onPress={() => this.nav.navigate('SimpleMap')} />
                <Button title={'Map with Fix Direction'} onPress={() => this.nav.navigate('DirectionMap')} />
                <Button title={'Map With Custom Marker'} onPress={() => this.nav.navigate('CustomMarkerMap')} />
                <Button title={'Map With Custom Direction'} onPress={() => this.nav.navigate('CustomDirectionMap')} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 16
    },
    button: {
        margin: 4
    }
})