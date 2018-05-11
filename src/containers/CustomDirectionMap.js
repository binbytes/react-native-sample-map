import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import MapView, { Marker, Animated } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/MaterialIcons';

import MapButton from '../components/MapButton'

import { API_KEY } from '../mix/config';

export default class Screen2 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mapRegion: null,
            latitude: null,
            longitude: null,
            destination: null,
            mode: 'driving',
            color: '#4286f4CC'
        }
    }

    componentDidMount() {
        this.watchID = navigator.geolocation.watchPosition((position) => {
            // Create the object to update this.state.mapRegion through the onRegionChange function
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.00922 * 1.5,
                longitudeDelta: 0.00421 * 1.5
            }
            this.setState({ mapRegion: { latitude: region.latitude, longitude: region.longitude } })
            this.map.animateToRegion(region, 2000)
        },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    onMapPress = (e) => {
        this.setState({
            destination: e.nativeEvent.coordinate
        })
        this.map.fitToCoordinates([
            this.state.mapRegion,
            {
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude
            }
        ], {
                edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
                animated: true
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    ref={instance => this.map = instance}
                    style={styles.map}
                    showsUserLocation={true}
                    followUserLocation={true}
                    showsMyLocationButton={true}
                    onPress={this.onMapPress}>
                    {this.state.destination !== null ?
                        <View>
                            <Marker key={'1'} coordinate={this.state.destination} />
                            <MapViewDirections
                                origin={this.state.mapRegion}
                                destination={this.state.destination}
                                apikey={API_KEY}
                                strokeWidth={7}
                                strokeColor="#0FABF0"
                                mode={this.state.mode} />
                        </View> :
                        <View />
                    }
                </MapView>
                <View style={styles.buttonContainer}>
                    <MapButton iconName={'directions-car'} mode={'driving'} />
                    <MapButton iconName={'directions-bike'} mode={'bicycling'} />
                    <MapButton iconName={'directions-walk'} mode={'walking'} />
                    <MapButton iconName={'directions-transit'} mode={'transit'} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
});
