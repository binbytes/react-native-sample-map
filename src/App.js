import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import Main from './MainScreen';
import SimpleMap from './containers/SimpleMap';
import DirectionMap from './containers/DirectionMap';
import CustomMarkerMap from './containers/CustomMarkerMap';
import CustomDirectionMap from './containers/CustomDirectionMap';

const RootNavigator = StackNavigator({
    Main: {
        screen: Main,
        navigationOptions:{
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
    render() {
        return (
            <RootNavigator />
        );
    }
}