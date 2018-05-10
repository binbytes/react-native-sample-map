import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView, { Marker, Animated } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { API_KEY } from './mix/config'

const destination = { latitude: 22.328599, longitude: 70.769113 };

export default class Screen2 extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mapRegion: null,
      lastLat: null,
      lastLong: null
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
      this.setState({ mapRegion: region, lastLat: region.latitude, longitude: region.longitude })
      // this.onRegionChange(region, region.latitude, region.longitude);
    },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated
          style={{ flex: 1 }}
          region={this.state.mapRegion}
          showsUserLocation={true}
          followUserLocation={true}>
          <MapViewDirections
            origin={this.state.mapRegion}
            destination={destination}
            apikey={API_KEY}
            strokeWidth={5}
            strokeColor="hotpink"
          />
        </Animated>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
