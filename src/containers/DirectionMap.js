import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'

import { API_KEY } from '../mix/config'

const origin = {
  latitude: 22.30122195579693,
  longitude: 70.76267393802868,
}
const destination = { latitude: 22.328599, longitude: 70.769113 }

const region = {
  ...origin,
  latitudeDelta: 0.00922 * 1.5,
  longitudeDelta: 0.00421 * 1.5
}

export default class Screen2 extends Component {

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          region={region}
          showsUserLocation={true}
          followUserLocation={true}>
          <Marker coordinate={origin} />
          <Marker coordinate={destination} />
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={API_KEY}
            strokeWidth={5}
            strokeColor="hotpink"
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
