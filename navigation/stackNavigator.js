import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainPage from '../screens/MainPage/index';
// import publisherPage from '../screens/publisherPage/index';
import ConnectionComponent from '../components/connectionComponent';
import LoginComponent from '../components/loginComponent';

const Stack = createStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator initialRouteName="mainPage">
            <Stack.Screen
                name="mainPage"
                component={MainPage}
                options={{title:'MQTT App', headerTitleStyle:{color:'#ffff'}, headerStyle:{backgroundColor:'#000'}}}
            />
            <Stack.Screen
                name="loginPage"
                component={LoginComponent}
                options={{title:'MQTT App', headerTitleStyle:{color:'#ffff'}, headerStyle:{backgroundColor:'#000'}}}
            />
            <Stack.Screen
                name="connectionPage"
                component={ConnectionComponent}
                options={{title:'MQTT App', headerTitleStyle:{color:'#ffff'}, headerStyle:{backgroundColor:'#000'}}}
            />
        </Stack.Navigator>
    )
}

export default AppStack;