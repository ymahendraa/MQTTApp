import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import ReactNativeBiometrics from 'react-native-biometrics'
import MQTT from 'sp-react-native-mqtt'


// ReactNativeBiometrics.isSensorAvailable()
//   .then((resultObject) => {
//     const { available, biometryType } = resultObject
 
//     if (available && biometryType === ReactNativeBiometrics.TouchID) {
//       console.log('TouchID is supported')
//     } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
//       console.log('FaceID is supported')
//     } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
//       console.log('Biometrics is supported')
//     } else {
//       console.log('Biometrics not supported')
//     }
// })

ReactNativeBiometrics.createKeys('Confirm fingerprint')
  .then((resultObject) => {
    const { publicKey } = resultObject
    console.log(publicKey)
    // sendPublicKeyToServer(publicKey)
  })

// ReactNativeBiometrics.deleteKeys()
// .then((resultObject) => {
// const { keysDeleted } = resultObject

// if (keysDeleted) {
//     console.log('Successful deletion')
// } else {
//     console.log('Unsuccessful deletion because there were no keys to delete')
// }
// })

ReactNativeBiometrics.biometricKeysExist()
  .then((resultObject) => {
    const { keysExist } = resultObject
 
    if (keysExist) {
      console.log('Keys exist')
    } else {
      console.log('Keys do not exist or were deleted')
    }
})

let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
let payload = epochTimeSeconds + 'some message'
 
ReactNativeBiometrics.createSignature({
    promptMessage: 'Sign in',
    payload: payload
  })
  .then((resultObject) => {
    const { success, signature } = resultObject
 
    if (success) {
      console.log(signature)
    //   verifySignatureWithServer(signature, payload)
    MQTT.createClient({
      uri: 'mqtt://test.mosquitto.org:1883',
      clientId: 'your_client_id'
    }).then(function(client) {
    
      client.on('closed', function() {
        console.log('mqtt.event.closed');
      });
    
      client.on('error', function(msg) {
        console.log('mqtt.event.error', msg);
      });
    
      client.on('message', function(msg) {
        console.log('mqtt.event.message', msg);
      });
    
      client.on('connect', function() {
        console.log('connected');
        client.subscribe('/data', 0);
        client.publish('/data', "test", 0, false);
      });
    
      client.connect();
      })
      .catch(function(err){
        console.log(err);
      });
    }
  })

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

const connectionPage = () => {
    return (
        <View style={{flex:1, justifyContent:'center'}}>
            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <Text style={{fontFamily: 'Roboto', fontSize:18, marginTop: 30, marginBottom: 15, marginLeft:15,fontWeight:"bold",fontSize:20}}>Data Koneksi</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.label}>MQTT Broker</Text>
                    <TextInput style={styles.textinp}></TextInput>   
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.label}>Port</Text>
                    <TextInput style={styles.textinp}></TextInput>   
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput style={styles.textinp}></TextInput>   
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput style={styles.textinp}secureTextEntry></TextInput>   
                </View>
            </View>
            <Button buttonStyle={styles.butlog} title="Simpan" color="#000"/>  
        </View>
        
        
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
        marginLeft:20,
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
        marginBottom:350,
        alignContent:'center'
      },
});

export default connectionPage;