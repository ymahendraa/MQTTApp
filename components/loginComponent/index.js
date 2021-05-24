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
// import {axios} from 'react-native-axios';
import base64 from 'react-native-base64';

const storeDataUrl = async (value) => {
    try {
        await AsyncStorage.setItem('@url', value)
        console.log('data successfully saved')
    } catch (e) {
      // saving error
    }
}

const Login = () => {
  
    const [clientID, setClientID] = useState('');
    const [key, setKey] = useState('');
    const [url, setUrl] = useState('');

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem(clientID);
            if(value != null){
                const jsonValue = JSON.parse(value);
                setKey(jsonValue.key)
                console.log(jsonValue.key)
            }
            
        } catch(e) {
        // error reading value
        }
    }

    const login = () => {
        let data = {
            "username" : clientID,
            "password" : key
        }
        return fetch('https://de6c1f816d7c.ngrok.io/users/authenticate', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)})
            .then((response) => response.json())
            .then((json) => {
                return console.log(json);
            })
            .catch((error) => {
            console.error(error);
            });
        
    }

    const getBroker = () => {
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + base64.encode(clientID + ":" + key+'1'));
        fetch('https://de6c1f816d7c.ngrok.io/users', 
        {method:'GET',
        headers: headers,
        })
        .then(response => {
            if(response.status != 401){
                ReactNativeBiometrics.simplePrompt({promptMessage: 'Masukkan sidik jari'})
                .then((resultObject) => {
                    const { success } = resultObject
                    if (success) {
                        console.log('successful biometrics provided')
                        .then(response => response.json())
                        .then((json) =>{
                            return console.log(json)
                        })
                    } else {
                        console.log('user cancelled biometric prompt')
                    }
                })
                .catch(() => {
                    console.log('biometrics failed')
                })
        }})
        // .then((json) => {
        //     return console.log(json);
        // })
        .catch((error) => {
        console.error(error);
        });        
    }

    const mainFunction = async () =>{
        try {
            await getData();
            getBroker();
            // login();
        } catch (error) {
            
        }
    }

    // const saveKey = () => {
    //   var gKey ='';
    //   gKey = genKey(20);
    //   gKey = clientID + ':::' + gKey;
    //   setKey(gKey)
    //   console.log(key)
    // }
  
      return (
          <ScrollView style={{flex:1}}>
              <View style={{ flex: 1,alignItems:'center'}}>
                <View style={{padding: 24,flex: 1,justifyContent: "flex-start"}}>
                  <Text style={{fontFamily: 'Roboto', fontSize:18, marginTop: 30, marginBottom: 30, marginLeft:15,fontWeight:"bold",fontSize:30,}}>Data Login</Text>
                  {/* <View style={{flexDirection:'row'}}>
                      <Text style={styles.label}>URL</Text>
                      <Text style={{marginTop:15, fontWeight:'bold'}}>:</Text>
                      <TextInput style={styles.textinp} onChangeText={(url)=> setUrl(url)} onEndEditing={()=>{storeDataUrl(url)}}></TextInput>   
                  </View> */}
                  <View style={{flexDirection:'row'}}>
                      <Text style={styles.label}>Client ID</Text>
                      <Text style={{marginTop:15, fontWeight:'bold'}}>:</Text>
                      <TextInput style={styles.textinp} onChangeText={(clientID)=> setClientID(clientID)}  ></TextInput>   
                  </View>
                  <View style={{flexDirection:'row'}}>
                      <Text style={styles.label}>Password</Text>
                      <Text style={{marginTop:15, fontWeight:'bold'}}>:</Text>
                      <TextInput style={styles.textinp} onChangeText={(key)=> setKey(key)} ></TextInput>   
                  </View>
                  <View style={{ flex: 1, alignItems: 'center', marginTop:'20%'}}>
                    <Button buttonStyle={styles.butlog} title="Login" color="#000" onPress={mainFunction}/>
                       
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

export default Login;