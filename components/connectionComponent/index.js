import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  ScrollView
} from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import CryptoJS from "react-native-crypto-js";
import ReactNativeBiometrics from 'react-native-biometrics';

ReactNativeBiometrics.createKeys('Confirm fingerprint')
  .then((resultObject) => {
    const { publicKey } = resultObject
    console.log(publicKey)
    // sendPublicKeyToServer(publicKey)
})

ReactNativeBiometrics.biometricKeysExist()
  .then((resultObject) => {
    const { keysExist } = resultObject
 
    if (keysExist) {
      console.log('Keys exist')
    } else {
      console.log('Keys do not exist or were deleted')
    }
})

// let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
// let payload = epochTimeSeconds + 'some message'
 
// ReactNativeBiometrics.createSignature({
//     promptMessage: 'Sign in',
//     payload: payload
//   })
//   .then((resultObject) => {
//     const { success, signature } = resultObject
 
//     if (success) {
//       console.log(signature)
//     //   verifySignatureWithServer(signature, payload)
    
//     }
//   })

// ReactNativeBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint'})
// .then((resultObject) => {
// const { success } = resultObject

// if (success) {
//     console.log('successful biometrics provided')
// } else {
//     console.log('user cancelled biometric prompt')
// }
// })
// .catch(() => {
// console.log('biometrics failed')
// })

const Connection = ({route}) => {

    const { val } = route.params;
    // console.log(val)
    const [address, setAddress] = useState('');
    const [port, setPort] = useState('');
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    const [clientId, setClientId] = useState('');
  
    const [topicSub, setTopicSub] = useState('');
    const [topicPub, setTopicPub] = useState('');
    const [data, setData] = useState('');
    const [QoS, setQoS] = useState(0.0);
  
    const [message, setMessage] = useState([]);
  
    var MQTT = require('sp-react-native-mqtt')
  
    // const connectSub = ()=>{
    //   MQTT.createClient({
    //     uri: `${address}:${port}`,
    //     clientId: clientId,
    //     tls:false
    //   })
    //   .then(function(client) {
      
    //     client.on('closed', function() {
    //       console.log('mqtt.event.closed');
    //     });
      
    //     client.on('error', function(msg) {
    //       console.log('mqtt.event.error', msg);
    //     });
      
    //     client.on('message', function(msg) {
    //       console.log('mqtt.event.message', msg);
    //       setMessage(msg)
    //     });
      
    //     client.on('connect', function() {
    //       console.log('connected');
    //       client.subscribe(topicSub, 0);
    //     });
      
    //     client.connect();
    //     })
    //     .catch(function(err){
    //       console.log(err);
    //     });
    // } 
  
    // const connectPub = ()=>{
    //   MQTT.createClient({
    //     uri: `${address}:${port}`,
    //     clientId: clientId,
    //     tls:false,
    //   })
    //   .then(function(client) {
      
    //     client.on('closed', function() {
    //       console.log('mqtt.event.closed');
    //     });
      
    //     client.on('error', function(msg) {
    //       console.log('mqtt.event.error', msg);
    //     });
      
    //     client.on('message', function(msg) {
    //       console.log('mqtt.event.message', msg);
    //       setMessage(msg)
    //     });
      
    //     client.on('connect', function() {
    //       console.log('connected');
    //       client.publish(topicPub, data, QoS, false);
    //     });
      
    //     client.connect();
    //     })
    //     .catch(function(err){
    //       console.log(err);
    //     });
    // } 
  
    const mqttConnectSub = () => {
        MQTT.createClient({
          uri: `${address}:${port}`,
          clientId: clientId,
          tls:false
        })
        .then(function(client) {
        
          client.on('closed', function() {
            console.log('mqtt.event.closed');
          });
        
          client.on('error', function(msg) {
            console.log('mqtt.event.error', msg);
          });
        
          client.on('message', function(msg) {
            console.log('mqtt.event.message', msg);
            setMessage(msg)
          });
        
          client.on('connect', function() {
            console.log('connected');
            client.subscribe(topicSub, QoS);
          });
        
          client.connect();
          })
          .catch(function(err){
            console.log(err);
          });
    }
  
    const mqttConnectPub = () => {
        MQTT.createClient({
          uri: `mqtt://${val.url}:${val.port}`,
          clientId: clientId,
          tls:false,
        })
        .then(function(client) {
        
          client.on('closed', function() {
            console.log('mqtt.event.closed');
          });
        
          client.on('error', function(msg) {
            console.log('mqtt.event.error', msg);
          });
        
          client.on('message', function(msg) {
            console.log('mqtt.event.message', msg);
            setMessage(msg)
          });
        
          client.on('connect', function() {
            console.log('connected');
            let ciphertext = CryptoJS.AES.encrypt(data, val.K1).toString(); 
            client.publish(topicPub, ciphertext, QoS, false);
          });
        
          client.connect();
          })
          .catch(function(err){
            console.log(err);
          });
        } 
        
     
  
      return (
          <ScrollView style={{flex:1}}>
              <View style={{ flex: 1,alignItems:'center'}}>
                <View style={{padding: 24,flex: 1,justifyContent: "flex-start"}}>
                  <Text style={{fontFamily: 'Roboto', fontSize:18, marginTop: 30, marginBottom: 30, marginLeft:15,fontWeight:"bold",fontSize:30,}}>Connection Data</Text>
                  <View style={{flexDirection:'row'}}>
                      <Text style={styles.label}>MQTT Broker</Text>
                      <Text style={{marginTop:15, fontWeight:'bold'}}>:</Text>
                      <TextInput style={styles.textinp} onChangeText={(address)=> setAddress(address)} value={val.url} ></TextInput>   
                  </View>
                  <View style={{flexDirection:'row'}}>
                      <Text style={styles.label}>Port</Text>
                      <Text style={{marginTop:15, fontWeight:'bold'}}>:</Text>
                      <TextInput style={styles.textinp} value={val.port}></TextInput>   
                  </View>
                  {/* <View style={{flexDirection:'row'}}>
                      <Text style={styles.label}>Client ID</Text>
                      <Text style={{marginTop:15, fontWeight:'bold'}}>:</Text>
                      <TextInput style={styles.textinp} onChangeText={(clientId)=> setClientId(clientId)}></TextInput>   
                  </View> */}
                  <View style={{flexDirection:'row'}}>
                      <Text style={styles.label}>Subscribe</Text>
                      <Text style={{marginTop:15, fontWeight:'bold'}}>:</Text>
                      <TextInput style={styles.textinp} onChangeText={(topic)=> setTopicSub(topic)} placeholder='topic'></TextInput>   
                  </View>
                  <Text>data : {message.data}</Text>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Button buttonStyle={styles.butlog} title="Simpan" color="#000" onPress={mqttConnectSub}/>
                       
                  </View>
                  
                  <View style={{ flex : 1 }} />
                </View>    
              </View>
  
              <View style={{ flex: 1,alignItems:'center'}}>
                <View style={{padding: 24,flex: 1,justifyContent: "flex-start"}}>
                  <Text style={{fontFamily: 'Roboto', fontSize:18, marginTop: 30, marginBottom: 30, marginLeft:15,fontWeight:"bold",fontSize:30,}}>Data to Publish</Text>
                  <View style={{flexDirection:'row'}}>
                      <Text style={styles.label}>Topic</Text>
                      <Text style={{marginTop:15, fontWeight:'bold'}}>:</Text>
                      <TextInput style={styles.textinp} onChangeText={(topic)=> setTopicPub(topic)} placeholder='topic'></TextInput>   
                  </View>
                  <View style={{flexDirection:'row'}}>
                      <Text style={styles.label}>Text Messages</Text>
                      <Text style={{marginTop:15, fontWeight:'bold'}}>:</Text>
                      <TextInput style={styles.textinp} onChangeText={(data)=> setData(data)}></TextInput>   
                  </View>
                  <View style={{flexDirection:'row'}}>
                      <Text style={styles.label}>QoS</Text>
                      <Text style={{marginTop:15, fontWeight:'bold'}}>:</Text>
                      <TextInput style={styles.textinp} onChangeText={(qos)=> setQoS(parseFloat(qos))}></TextInput>   
                  </View>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Button buttonStyle={styles.butlog} title="Publish" color="#000" onPress={mqttConnectPub}/>   
                  </View>
                  
                  <View style={{ flex : 1 }} />
                </View>    
              </View>
              
          </ScrollView>
          
          
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
    
});

export default Connection;