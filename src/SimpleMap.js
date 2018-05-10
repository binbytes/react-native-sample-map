import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView, { Marker, Animated } from 'react-native-maps';

export default class Screen1 extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mapRegion: null,
      lastLat: null,
      lastLong: null,
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
      this.setState({mapRegion: region, lastLat: region.latitude, longitude: region.longitude})
      // this.onRegionChange(region, region.latitude, region.longitude);
    },
    (error) => this.setState({ error: error.message }),
    { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 });
  }

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated
          style={{flex: 1}}
          region={this.state.mapRegion}
          showsUserLocation={true}
          followUserLocation={true}>
          <Marker
            coordinate={{
              latitude: (this.state.lastLat + 0.00050) || -36.82339,
              longitude: (this.state.lastLong + 0.00050) || -73.03569,
            }}>
            <View>
              <Text style={{ color: '#000' }}>
                {this.state.lastLong} / {this.state.lastLat}
              </Text>
            </View>
          </Marker>
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
