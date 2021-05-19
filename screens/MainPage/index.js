import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  Dimensions, 
  StatusBar,
  ScrollView
} from 'react-native';
import { Button } from 'react-native-elements';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ConnectionComponent from '../../components/connectionComponent/index';
import RegisterComponent from '../../components/registerComponent/index';
import LoginComponent from '../../components/loginComponent/index';

const FirstRoute = () => (
  <RegisterComponent/>
);

const SecondRoute = () => (
  <LoginComponent/>
);

const ThirdRoute = () => (
  <ConnectionComponent/>
)

const initialLayout = { width: Dimensions.get('window').width };

const mainPage = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Registrasi' },
    { key: 'second', title: 'Login' },
    { key: 'third', title: 'Koneksi'}
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: 'black' }}
    />
  );
  
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
  },
  scene: {
    flex: 1,
  },
});

export default mainPage;