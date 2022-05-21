import {StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, {useEffect} from 'react'
import { useState } from 'react/cjs/react.development';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const navigation = useNavigation();
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            navigation.replace("Home")
          }
        })
  
        return unsubscribe;
      }, [])

    const signUp = () => {
        auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
          // Signed in 
          const user = userCredentials.user;
          console.log(user.email, ' created');
          // ...
        })
        .catch(error => alert(error.message));
      }  
  
      const signIn = () => {
        auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
          // Signed in 
          const user = userCredentials.user;
          console.log(user.email, ' logged in');
          // ...
        })
        .catch(error => alert(error.message));
      }  
      



  return (
    <View style={styles.container} behavior="padding">

        <View style={styles.inputContainer}>
         
            <TextInput placeholder="email" 
            value={email} onChangeText={(text) => {setEmail(text)}}
            style={styles.textBoxes}></TextInput> 

            <TextInput placeholder="password" 
            value={password} onChangeText={(text) => {setPassword(text)}}  
            style={styles.textBoxes} secureTextEntry></TextInput> 
        
       </View>

       <View style={styles.buttonContainer}>

        <TouchableOpacity onPress={signIn} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>  
        </TouchableOpacity>

        <TouchableOpacity onPress={signUp} style={[styles.button, styles.registerButton]}>
            <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>


      </View>


    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: '#DFE6F6',
        alignItems: 'center',
        justifyContent: 'center',
      },

      inputContainer: {
          width: '80%',
          marginTop: 100
      },
    
      textBoxes: {
        fontSize: 18,
        padding: 12,
        borderColor: 'black',
        borderWidth: 0.2,
        borderRadius: 5,
        marginTop: 5,
        backgroundColor: 'white',
    
      },

      buttonContainer: {
          width: '60%',
          alignItems: 'center',
          justifyContent: 'center', 
          marginTop: 30
      },

      button: {
        backgroundColor: '#8DB2FF',
        width: '100%',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',

      },

      buttonText: {
        color: 'white',
        fontSize: 16,
      },

      registerButton: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#8DB2FF',
        borderWidth: 2

      },

      registerButtonText: {
        color: '#8DB2FF',
        fontSize: 16,
      }
})