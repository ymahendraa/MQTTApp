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
import { RSA } from 'react-native-rsa-native';

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
      let message = key;
 
      RSA.generateKeys(1024) // set key size
      .then(keys => {
          console.log('1024 private:', keys.private); // the private key
          console.log('1024 public:', keys.public); // the public key
          RSA.encrypt(message, keys.public)
          .then(encodedMessage => {
              console.log(`the encoded message is ${encodedMessage}`);
              RSA.decrypt(encodedMessage, keys.private)
              .then(decryptedMessage => {
                  console.log(`The original message was ${decryptedMessage}`);
              });
          });
      });
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
                    <Button buttonStyle={styles.butlog} title="Simpan" color="#000" onPress={()=>{saveKey(),AEncrpytKey(key)}}/>
                       
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