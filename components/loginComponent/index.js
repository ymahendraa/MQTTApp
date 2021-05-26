import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import ReactNativeBiometrics from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    const [brokerProp, setBrokerProp] = useState({});

    const setBrokerProperties = () => {

    }

    const alertTwoButton = (message) => {
        Alert.alert(
            "Login status",
            message ? "Successfully logged in" : "Login failed, user not registered yet",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => null }
            ]
          );
    }

    const alertBrokerProp = () => {
        Alert.alert(
            "Broker Properties",
            "URL : "+ JSON.stringify(brokerProp.url) + "\n" + "PORT :" + JSON.stringify(brokerProp.port),
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
    }

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

    const loginToServer = () => {
        let data = {
            "username" : clientID,
            "password" : key
        }
        return fetch('https://50c94f5921b8.ngrok.io/users/authenticate', {
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
        headers.set('Authorization', 'Basic ' + base64.encode(clientID + ":" + key));
        fetch('https://50c94f5921b8.ngrok.io/users', 
        {method:'GET',
        headers: headers,
        })
        .then(response => {
            if(response.ok){
                ReactNativeBiometrics.simplePrompt({promptMessage: 'Masukkan sidik jari'})
                .then((resultObject) => {
                    const { success } = resultObject;
                    if (success) {
                        console.log('successful biometrics provided');
                        response.json()
                        .then((json) => {
                            setBrokerProp(json);
                            console.log(brokerProp)
                        })
                        alertTwoButton(true)
                    } else {
                        console.log('user cancelled biometric prompt');
                    }
                })
                .catch(() => {
                    console.log('biometrics failed');
                })
        }else{
            alertTwoButton(false)
        }
        })
        // .then((response) => response.json())
        // .then((json) => {
        //     return console.log(json);
        // })
        .catch((error) => {
        console.error(error);
        });        
    }

    const mainFunction = async () => {
        try {
            await getData()
            .then(getBroker())
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
                      <TextInput style={styles.textinp} onChangeText={(clientID)=> setClientID(clientID)}  onEndEditing={getData}></TextInput>   
                  </View>
                  <View style={{flexDirection:'row'}}>
                      <Text style={styles.label}>Password</Text>
                      <Text style={{marginTop:15, fontWeight:'bold'}}>:</Text>
                      <TextInput style={styles.textinp} onChangeText={(key)=> setKey(key)} ></TextInput>   
                  </View>
                  <View style={{flexDirection:'row'}}>
                        <View style={{ flex: 1, alignItems: 'center', marginTop:'5%', marginLeft:'5%'}}>
                            <Button buttonStyle={styles.butlog} title="Login" color="#000" onPress={mainFunction}/>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', marginTop:'5%',marginRight:'5%'}}>
                            <Button buttonStyle={styles.butlog} title="Broker Prop" color="#000" onPress={alertBrokerProp}/>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', marginTop:'5%',marginRight:'5%'}}>
                            <Button buttonStyle={styles.butlog} title="POST" color="#000" onPress={loginToServer}/>
                        </View>
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