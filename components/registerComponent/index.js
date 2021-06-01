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
import ReactNativeBiometrics from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RSA } from 'react-native-rsa-native';

const publicKey = `-----BEGIN PUBLIC KEY-----
        MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+Df4ahX8/VRSMZbL8s+yK68sH
        iRDWv1Mm82ALoz4sRfS0IiBe2QSpF6h1/kMWeF/kPTTYYlvnamEndOw4ghTkf0ZM
        g37WlQ4YCYiT8UrmzVDtgZmRg6JLB/S60OIpl99sGzlymWJOxJsQGiRTLd7PKhdg
        mP5yab2lmaJUiRA2sQIDAQAB
        -----END PUBLIC KEY-----`
const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQC+Df4ahX8/VRSMZbL8s+yK68sHiRDWv1Mm82ALoz4sRfS0IiBe
2QSpF6h1/kMWeF/kPTTYYlvnamEndOw4ghTkf0ZMg37WlQ4YCYiT8UrmzVDtgZmR
g6JLB/S60OIpl99sGzlymWJOxJsQGiRTLd7PKhdgmP5yab2lmaJUiRA2sQIDAQAB
AoGAI7ULTb5RJvv8LViaJUJEqeEdNyA4arBtlf7Zx7X242iNTh6vSEKrzn0kaG7J
+fnJwl8Bg7oPHE5vTHN6Qi+mbujQS55aPTD9he7llAFYKXvZhWtEKUEBVg4fNwNj
pVKeKQ/HQV9Yb/Hy9TXaGc2xDX/BWKiGW88JvXKw1GNHFvECQQDkHUBXIR5SUxKN
vQFLvTIA62E9OF7jruQ7i2EdSraOgA4bTuzilslSR4qc2tHJIYM18/2lYN6NCWcr
GT6SIGNNAkEA1UmuNITmSYj/8cYQtE/LS0jEfZBR+Wb/mmH3fi+/6pd9JVqqgG4v
LTK1uoKgJdQpsawpgjiMCVS9lK5ncULm9QJBALyAH4bgazoEQ7S0lrmLoiJ4X2ZD
isYC478AskOOVcTztLSER+QGTl6bl8N+XxUhiFexQ8zBe6Z4OrS2q6n88ZECQAF7
6cJjylZopZ9BCYy3oWp8ryFQh8F8ffrNA7PVETjIpQ5Fezo5igp+d9U8Y3Df8QpT
cFZ/njnSZR9Lt1yKYqECQAcyD8Ot50W0HDlKc1Jh0vAkIsK0s5RwBFu+LzYGOQcQ
lBjPHbx0FuSLqKWrHvnWh2j+mTx1FRPH6mefCdTWnV4=
-----END RSA PRIVATE KEY-----`

const genKey = (keyLength) => {
    var chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz*&-%/!?*+=()";
    var randomString = '';
    
    for (var i=0; i < keyLength; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomString += chars.substring(rnum,rnum+1);
    }
    return randomString;
};

const Register = () => {
  
    const [clientID, setClientID] = useState('');
    const [key, setKey] = useState('');
    const [authData, setAuthData] = useState('');

    const saveKey = () => {
      var gKey ='';
      gKey = genKey(20);
      console.log(gKey)
      // gKey = clientID + ':::' + gKey;
      setKey(gKey)
    }

    const saveAuthData = async () => {
      let dataToSave = {
        "clientId" : clientID,
        "key" : key
      }
      try {
          await AsyncStorage.setItem(clientID, JSON.stringify(dataToSave))
          console.log('Data successfully saved')
      } catch (e) {
        // saving error
      }
    }

    const getAuthData = async () => {
      try {
        const value = await AsyncStorage.getItem(clientID)
      if(value !== null) {
          // value previously stored
          console.log(value);
      }
      } catch(e) {
      // error reading value
      }
    }

    const asymmEncrypt = async () => {
      const message = `hello`
      try {
        const encodedMessage = await RSA.encrypt(message, publicKey);
        console.log('android encoded message:', encodedMessage);
        const decodedMessage = await RSA.decrypt(encodedMessage, privateKey);
        console.log('android encoded message:', decodedMessage);
      } catch (error) {
        console.log(error)
      }
      
    }

    
      return (
          <ScrollView style={{flex:1}}>
              <View style={{ flex: 1,alignItems:'center'}}>
                <View style={{padding: 24,flex: 1,justifyContent: "flex-start"}}>
                  <Text style={{fontFamily: 'Roboto', fontSize:18, marginTop: 30, marginBottom: 30, marginLeft:15,fontWeight:"bold",fontSize:30,}}>Data Registrasi</Text>
                  <View style={{flexDirection:'row'}}>
                      <Text style={styles.label}>Client ID</Text>
                      <Text style={{marginTop:15, fontWeight:'bold'}}>:</Text>
                      <TextInput style={styles.textinp} onChangeText={(clientID)=> setClientID(clientID)} onEndEditing={saveKey}></TextInput>   
                  </View>
                  <View style={{ flex: 1, alignItems: 'center', marginTop:'20%'}}>
                    <Button buttonStyle={styles.butlog} title="Simpan" color="#000" onPress={saveAuthData}/>
                    <Button buttonStyle={styles.butlog} title="Showdata" color="#000"onPress={getAuthData}/>
                    <Button buttonStyle={styles.butlog} title="Encrypted" color="#000"onPress={()=>{asymmEncrypt()}}/>
                  </View>
                  {/* <Text>key : {key}</Text> */}
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

export default Register;