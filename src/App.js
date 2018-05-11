import React, { Component } from 'react';
import { PermissionsAndroid, BackHandler } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Main from './MainScreen';
import SimpleMap from './containers/SimpleMap';
import DirectionMap from './containers/DirectionMap';
import CustomMarkerMap from './containers/CustomMarkerMap';
import CustomDirectionMap from './containers/CustomDirectionMap';

const RootNavigator = createStackNavigator({
    Main: {
        screen: Main,
        navigationOptions: {
            header: null
        }
    },
    SimpleMap: {
        screen: SimpleMap,
        navigationOptions: {
            header: null
        }
    },
    DirectionMap: {
        screen: DirectionMap,
        navigationOptions: {
            header: null
        }
    },
    CustomMarkerMap: {
        screen: CustomMarkerMap,
        navigationOptions: {
            header: null
        }
    },
    CustomDirectionMap: {
        screen: CustomDirectionMap,
        navigationOptions: {
            header: null
        }
    }
})

export default class App extends Component {

    async componentDidMount() {

        const navCheck = await PermissionsAndroid.check('android.permission.ACCESS_FINE_LOCATION')

        if (navCheck) {
            return
        } else {
            const permission = await PermissionsAndroid.request('android.permission.ACCESS_FINE_LOCATION')
            if(permission === PermissionsAndroid.RESULTS.GRANTED){
                return
            } else {
                BackHandler.exitApp()
            }
        }
    }

    render() {
        return (
            <RootNavigator />
        );
    }
}