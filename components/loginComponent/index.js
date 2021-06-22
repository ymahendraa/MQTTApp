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
// import base64 from 'react-native-base64';
// import { RSA } from 'react-native-rsa-native';
import CryptoJS from "react-native-crypto-js";
import { NetworkInfo } from "react-native-network-info";

// const publicKey = `-----BEGIN PUBLIC KEY-----
//         MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+Df4ahX8/VRSMZbL8s+yK68sH
//         iRDWv1Mm82ALoz4sRfS0IiBe2QSpF6h1/kMWeF/kPTTYYlvnamEndOw4ghTkf0ZM
//         g37WlQ4YCYiT8UrmzVDtgZmRg6JLB/S60OIpl99sGzlymWJOxJsQGiRTLd7PKhdg
//         mP5yab2lmaJUiRA2sQIDAQAB
//         -----END PUBLIC KEY-----`
// const privateKey = `-----BEGIN RSA PRIVATE KEY-----
// MIICXAIBAAKBgQC+Df4ahX8/VRSMZbL8s+yK68sHiRDWv1Mm82ALoz4sRfS0IiBe
// 2QSpF6h1/kMWeF/kPTTYYlvnamEndOw4ghTkf0ZMg37WlQ4YCYiT8UrmzVDtgZmR
// g6JLB/S60OIpl99sGzlymWJOxJsQGiRTLd7PKhdgmP5yab2lmaJUiRA2sQIDAQAB
// AoGAI7ULTb5RJvv8LViaJUJEqeEdNyA4arBtlf7Zx7X242iNTh6vSEKrzn0kaG7J
// +fnJwl8Bg7oPHE5vTHN6Qi+mbujQS55aPTD9he7llAFYKXvZhWtEKUEBVg4fNwNj
// pVKeKQ/HQV9Yb/Hy9TXaGc2xDX/BWKiGW88JvXKw1GNHFvECQQDkHUBXIR5SUxKN
// vQFLvTIA62E9OF7jruQ7i2EdSraOgA4bTuzilslSR4qc2tHJIYM18/2lYN6NCWcr
// GT6SIGNNAkEA1UmuNITmSYj/8cYQtE/LS0jEfZBR+Wb/mmH3fi+/6pd9JVqqgG4v
// LTK1uoKgJdQpsawpgjiMCVS9lK5ncULm9QJBALyAH4bgazoEQ7S0lrmLoiJ4X2ZD
// isYC478AskOOVcTztLSER+QGTl6bl8N+XxUhiFexQ8zBe6Z4OrS2q6n88ZECQAF7
// 6cJjylZopZ9BCYy3oWp8ryFQh8F8ffrNA7PVETjIpQ5Fezo5igp+d9U8Y3Df8QpT
// cFZ/njnSZR9Lt1yKYqECQAcyD8Ot50W0HDlKc1Jh0vAkIsK0s5RwBFu+LzYGOQcQ
// lBjPHbx0FuSLqKWrHvnWh2j+mTx1FRPH6mefCdTWnV4=
// -----END RSA PRIVATE KEY-----`
// const storeDataUrl = async (value) => {
//     try {
//         await AsyncStorage.setItem('@url', value)
//         console.log('data successfully saved')
//     } catch (e) {
//       // saving error
//     }
// }

const Login = () => {
    // Get Local IP
// NetworkInfo.getIPAddress().then(ipAddress => {
//   console.log(ipAddress);
// });

    const navigation = useNavigation();
  
    const [clientID, setClientID] = useState('');
    const [key, setKey] = useState('');
    const [brokerProp, setBrokerProp] = useState({});
    const br = 'sdasd'
    // const [authPayload, setAuthPayload] = useState('')

    // const asymmEncrypt = async () => {
    //     try {
    //         let authPay = clientID + ':::' + key;
    //         const encryptedAuthPay = await RSA.encrypt(authPay, publicKey);
    //         console.log('android encoded message:', encryptedAuthPay);
    //         const decryptedAuthPay = await RSA.decrypt(encryptedAuthPay, privateKey);
    //         console.log('android decoded message:', decryptedAuthPay);
    //         var base64enc = base64.encode(encryptedAuthPay);
    //         console.log('base64:'+ base64enc)
    //         var base64dec = base64.decode(base64enc);
    //         console.log('base64 dec :' + base64dec)
    //         setAuthPayload(base64enc);
    //     } catch (error) {
    //       console.log(error)
    //     }
        
    //   }

    const alertTwoButton = (message) => {
        if (message == 'ok') {
            Alert.alert(
                "Login status",
                "Successfully logged in",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => null }
                ]
              );
        } else if (message == 'not registered') {
            Alert.alert(
                "Login status",
                "ClientID is incorrect",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => null }
                ]
              );
        } else if (message == 'conn err') {
            Alert.alert(
                "Login status",
                "Login failed, request timeout",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => null }
                ]
              );
        } else if (message == 'login succ') {
            Alert.alert(
                "Login status",
                "Login success, input your fingerprint for two factor auth",
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
              { text: "OK", onPress: () => navigation.navigate('connectionPage', {val: brokerProp}) }
            ]
          );
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem(clientID);
            if(value != null){
                const jsonValue = JSON.parse(value);
                setKey(jsonValue.key);
                console.log(jsonValue.key);
            }
            else{
              alertTwoButton('not registered')
            }
            
        } catch(e) {
        // error reading value
        }
    }

    const loginToServer = () => {
        let data = {
          "clientID" : clientID,
          "key" : key
        }
        
        return fetch('https://568ee87adaeb.ngrok.io/users/authenticate', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)})
            .then(response => {
                if(response.ok){
                    // await alertTwoButton('login succ')
                    ReactNativeBiometrics.simplePrompt({promptMessage: 'Masukkan sidik jari'})
                    .then((resultObject) => {
                        const { success } = resultObject;
                        if (success) {
                            console.log('successful biometrics provided');
                            response.json()
                            .then((json) => {
                                // Decrypt
                                let bytes  = CryptoJS.AES.decrypt(json, key);
                                let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                                console.log('decrypted data :', decryptedData)
                                setBrokerProp(decryptedData);
                                // console.log(brokerProp)
                            })
                            alertTwoButton('ok')
                        } else {
                            console.log('user cancelled biometric prompt');
                        }
                    })
                    .catch(() => {
                        console.log('biometrics failed');
                    })
                }else if (response.status == 400){
                    alertTwoButton('not registered');
                }else if (response.status == 408){
                    alertTwoButton('conn err');
                }else if (response.status == 500){
                  alertTwoButton('not registered');
                }
            })
            .catch((error) => {
            console.error(error);
            });
    }

    // const getBroker = () => {
    //     let headers = new Headers();
    //     headers.set('Authorization', 'Basic ' + authPayload);
    //     // headers.set('Authorization', 'Basic ' + base64.encode(clientID + ':' + key));
    //     // console.log(headers)
    //     fetch('https://848689cc2b05.ngrok.io/users', 
    //     {method:'GET',
    //     headers: headers,
    //     })
    //     .then(response => {
    //         if(response.ok){
    //             // await alertTwoButton('login succ')
    //             ReactNativeBiometrics.simplePrompt({promptMessage: 'Masukkan sidik jari'})
    //             .then((resultObject) => {
    //                 const { success } = resultObject;
    //                 if (success) {
    //                     console.log('successful biometrics provided');
    //                     response.json()
    //                     .then((json) => {
    //                         setBrokerProp(json);
    //                         console.log(brokerProp)
    //                     })
    //                     alertTwoButton('ok')
    //                 } else {
    //                     console.log('user cancelled biometric prompt');
    //                 }
    //             })
    //             .catch(() => {
    //                 console.log('biometrics failed');
    //             })
    //         }else if (response.status == 401){
    //             alertTwoButton('not registered');
    //         }else if (response.status == 408){
    //             alertTwoButton('conn err');
    //         }
    //     })
    //     // .then((response) => response.json())
    //     // .then((json) => {
    //     //     return console.log(json);
    //     // })
    //     .catch((error) => {
    //     console.error(error);
    //     });        
    // }

    // const login = () => {
    //   let data = {
    //             "payload" : authPayload
    //   }
    //   RNFetchBlob.config({
    //     trusty : true
    //   })
    //   .then('POST', 'http://192.168.8.135:4000/users/authenticate',{
    //     'Content-Type' : 'application/json',
    //     data
    //   })
    //   .then(response => {
    //     if(response.ok){
    //         // await alertTwoButton('login succ')
    //         ReactNativeBiometrics.simplePrompt({promptMessage: 'Masukkan sidik jari'})
    //         .then((resultObject) => {
    //             const { success } = resultObject;
    //             if (success) {
    //                 console.log('successful biometrics provided');
    //                 response.json()
    //                 .then((json) => {
    //                     // Decrypt
    //                     let bytes  = CryptoJS.AES.decrypt(json, key);
    //                     let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    //                     console.log('decrypted data :', decryptedData)
    //                     setBrokerProp(decryptedData);
    //                     // console.log(brokerProp)
    //                 })
    //                 alertTwoButton('ok')
    //             } else {
    //                 console.log('user cancelled biometric prompt');
    //             }
    //         })
    //         .catch(() => {
    //             console.log('biometrics failed');
    //         })
    //     }else if (response.status == 400){
    //         alertTwoButton('not registered');
    //     }else if (response.status == 408){
    //         alertTwoButton('conn err');
    //     }
    // })
    // .catch((error) => {
    // console.error(error);
    // });
    // }

    // const mainFunction = async () => {
    //     try {
    //         // await getData()
    //         getBroker()
    //         // login();
    //     } catch (error) {
            
    //     }
    // }

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
                      <TextInput style={styles.textinp} onChangeText={(clientID)=> setClientID(clientID)}  onEndEditing={()=>{getData()}}></TextInput>   
                  </View>
                  {/* <View style={{flexDirection:'row'}}>
                      <Text style={styles.label}>Password</Text>
                      <Text style={{marginTop:15, fontWeight:'bold'}}>:</Text>
                      <TextInput style={styles.textinp} onChangeText={(key)=> setKey(key)} ></TextInput>   
                  </View> */}
                  <View style={{ flex: 1, marginTop:'20%', flexDirection:'row', alignSelf:'center'}}>                      
                            <Button buttonStyle={styles.butlog} title="Login" color="#000" onPress={loginToServer}/>
                            <Button buttonStyle={styles.butlog} title="Broker Prop" color="#000" onPress={alertBrokerProp}/>
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
        marginHorizontal:10
      },
});

export default Login;