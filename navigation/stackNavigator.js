import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import connectionPage from '../screens/connectionPage/index';

const Stack = createStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator initialRouteName="connectionPage">
            <Stack.Screen
                name="connectionPage"
                component={connectionPage}
                options={{title:'Halaman Koneksi', headerTitleStyle:{color:'#ffff'}, headerStyle:{backgroundColor:'#000'}}}
            />
        </Stack.Navigator>
    )
}

export default AppStack;