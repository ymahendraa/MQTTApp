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
// import { RSA } from 'react-native-rsa-native';
import ReactNativeBiometrics from 'react-native-biometrics';



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

    const saveKey = () => {
      var gKey ='';
      gKey = genKey(20);
      gKey = clientID + ':::' + gKey;
      setKey(gKey)
      console.log(key)
    }

    const AEncrpytKey = (key) => {
      var RSA = require('react-native-rsa');
      let message = key;
      // let pKey = 'MIIDUTCCAjkCFHQlox5YfwcefcV3713UjRuHv3r/MA0GCSqGSIb3DQEBCwUAMGUxCzAJBgNVBAYTAklEMRcwFQYDVQQIDA5Tb3V0aC1TdWxhd2VzaTERMA8GA1UEBwwITWFrYXNzYXIxGjAYBgNVBAsMEVRlbGtvbV9Vbml2ZXJzaXR5MQ4wDAYDVQQDDAVNQUhFTjAeFw0yMTA0MTIxNDM4MjVaFw00ODA4MjcxNDM4MjVaMGUxCzAJBgNVBAYTAklEMRcwFQYDVQQIDA5Tb3V0aC1TdWxhd2VzaTERMA8GA1UEBwwITWFrYXNzYXIxGjAYBgNVBAsMEVRlbGtvbV9Vbml2ZXJzaXR5MQ4wDAYDVQQDDAVNQUhFTjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAOpH1tlQZF2IuT8+SopqPd8JPX9SkMVtXdtI6Ei4AdZrH4E28eCwKm9sEtWmv1g1C3Z9EH0Ut/DxHhi07OP5bcAB4hXh5NeAuX7ajZwjua09CWg74s7aBEIPoLoE3HHO1zzEsfKQ/gonPU3RkNt6wLKmXpjjSToiRaWMtLXfK4RshngoMDthZ/gSVwSbH3lRRpYzv/ZlQDJX7iTFNE1FxAr0tVFrvJQEGDBcX3SQWIamh7bdJoUl0rokYiPQUwdbYU+cGVFzHMh5+nJqsbi1h2kGVSjKpSi7yg6fH6abT88dnJEruKWBcC76h8JxOIgooy2e5squwqOisxE077Bq/N0CAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAzq/ivkE274O05mALVvPYPObviMd622VU+y5dCm8f6ITChjoc73nbZJbnZwSSUhu1qYiQ99P9lPNHoe/qmJ9jjsvoxK3BqQJAqZiQflN29d2Pdng2OSbZ4VmeN2jF3e7AoryHgHWlP37Zgv3gy+Nw3iquGRav41pTHQexil62pmSTKo0y/BN84ff4iVQc2BrCIdOZA5raG/eSNDMTiXyKXcR9/ODBQt4RiR9TX47h71p+8DdajFgQepfl32iozlO4vcI8u40SwoQwMM1ngm9HduATUYe9QyR29xVge261JC/TDNyllIVCtEjM2rQKy44gKe9Fj3C1T4uavy9S+GV1IA=='
      // let publicKey = JSON.stringify(pKey);
      
      }
  
      return (
          <ScrollView style={{flex:1}}>
              <View style={{ flex: 1,alignItems:'center'}}>
                <View style={{padding: 24,flex: 1,justifyContent: "flex-start"}}>
                  <Text style={{fontFamily: 'Roboto', fontSize:18, marginTop: 30, marginBottom: 30, marginLeft:15,fontWeight:"bold",fontSize:30,}}>Data Registrasi</Text>
                  <View style={{flexDirection:'row'}}>
                      <Text style={styles.label}>Client ID</Text>
                      <Text style={{marginTop:15, fontWeight:'bold'}}>:</Text>
                      <TextInput style={styles.textinp} onChangeText={(clientID)=> setClientID(clientID)} ></TextInput>   
                  </View>
                  <View style={{ flex: 1, alignItems: 'center', marginTop:'20%'}}>
                    <Button buttonStyle={styles.butlog} title="Simpan" color="#000"/>
                       
                  </View>
                  <Text>key : {key}</Text>
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