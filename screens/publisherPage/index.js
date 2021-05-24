import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView
} from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import ReactNativeBiometrics from 'react-native-biometrics'

var mqtt    = require('sp-react-native-mqtt');


const publisherPage = ({route}) => {

  const navigation = useNavigation();

  const {uri, port, clientId, user, pass} = route.params

  const [topic, setTopic] = useState('');
  const [data, setData] = useState('');
  const [QoS, setQoS] = useState('');

  const MQTT = () => {
        mqtt.createClient({
          uri: `${uri}:${port}`,
          clientId: clientId,
          tls: false,
          user: user,
          pass: pass, 
        })
        .then(function(client) {
 
          client.on('message', function(msg) {
            console.log('mqtt.event.message', msg);
          });
        
          client.on('connect', function() {
            console.log('connected');
            // client.subscribe(topic, QoS);
            // client.publish(topic, data, QoS, false);
            client.subscribe('/data', 0);
            client.publish('/data', "test", 0, false);
          });
        
          client.connect();
          })
          .catch(function(err){
            console.log(err);
          });
        }
      

    return (
        <KeyboardAvoidingView style={{flex:1}}>
            <View style={{ flex: 1,alignItems:'center'}}>
              <View style={{padding: 24,flex: 1,justifyContent: "flex-start"}}>
                <Text style={{fontFamily: 'Roboto', fontSize:18, marginTop: 30, marginBottom: 30, marginLeft:15,fontWeight:"bold",fontSize:30,}}>Data Publish</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.label}>Topic</Text>
                    <Text style={{marginTop:15, fontWeight:'bold'}}>:</Text>
                    <TextInput style={styles.textinp} onChangeText={(topic)=> setTopic(topic)} ></TextInput>   
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.label}>Text Messages</Text>
                    <Text style={{marginTop:15, fontWeight:'bold'}}>:</Text>
                    <TextInput style={styles.textinp} onChangeText={(data)=> setData(data)}></TextInput>   
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.label}>QoS</Text>
                    <Text style={{marginTop:15, fontWeight:'bold'}}>:</Text>
                    <TextInput style={styles.textinp} onChangeText={(qos)=> setQoS(qos)}></TextInput>   
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Button buttonStyle={styles.butlog} title="Publish" color="#000" onPress={MQTT}/>
                  <View style={{ alignItems: 'center', flexDirection:'row', }}>
                    <Button buttonStyle={styles.butFunc} title="Publish" color="#000" onPress={() => navigation.navigate('publisherPage')}/>    
                    <Button buttonStyle={styles.butFunc} title="Subscribe" color="#000" onPress={() => navigation.navigate('publisherPage')}/>    
                  </View>    
                </View>
                
                <View style={{ flex : 1 }} />
              </View>    
            </View>
            
        </KeyboardAvoidingView>
        
        
    )
};

const styles = StyleSheet.create({
    textinp:{
        marginLeft:15,
        width: 239,
        height: 40,
        borderBottomWidth:1,
        fontSize:15,
        marginBottom: 25,
        marginTop:6
    },
    label:{
        marginTop:15,
        fontSize:15,
        fontWeight:"bold",
        width:100
    },
    butlog: {
        width: 130,
        height: 40,
        borderRadius: 15,
        alignSelf: 'center',
        backgroundColor: '#000',
        alignContent:'center'
    },
    butFunc:{
        width: 130,
        height: 40,
        borderRadius: 25,
        color:'#000',
        alignSelf: 'center',
        backgroundColor: '#ffff',
        alignContent:'center',
        marginTop:10,
        marginRight:10
    }
});

export default publisherPage;