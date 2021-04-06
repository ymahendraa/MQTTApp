import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import mainPage from '../screens/MainPage/index';
import publisherPage from '../screens/publisherPage/index';

const Stack = createStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator initialRouteName="mainPage">
            <Stack.Screen
                name="mainPage"
                component={mainPage}
                options={{title:'MQTT App', headerTitleStyle:{color:'#ffff'}, headerStyle:{backgroundColor:'#000'}}}
            />
            <Stack.Screen
                name="publisherPage"
                component={publisherPage}
                options={{title:'Halaman Publish', headerTitleStyle:{color:'#ffff'}, headerStyle:{backgroundColor:'#000'}}}
            />
        </Stack.Navigator>
    )
}

export default AppStack;