import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { useState } from 'react/cjs/react.development';
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native';

const Home = () => {

  const navigation = useNavigation(); 
 
  const signOut = () => {
    auth.signOut()
    .then(() => {
      navigation.replace("Login")
    })
    .catch(error => alert(error.message));
  }


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text>Email: {auth.currentUser?.email}</Text>
        <TouchableOpacity onPress={signOut} style={styles.button}>
           <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
 
        <Text>Dodawanie:</Text>

       {/*  <TextInput placeholder="title" value={title} onChangeText={(text) => {setTitle(text)}}
                style={styles.textBoxes}></TextInput> 

        <TextInput placeholder="author" value={author} onChangeText={(text) => {setAuthor(text)}}
            style={styles.textBoxes}></TextInput> 

        <TouchableOpacity onPress={addBook} style={styles.button}>
            <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity> */}
    </KeyboardAvoidingView>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CCCCFF',
        alignItems: 'center',
        justifyContent: 'center',
      },

      inputContainer: {
          width: '80%'
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
        backgroundColor: '#841584',
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
        borderColor: '#841584',
        borderWidth: 2

      },

      registerButtonText: {
        color: '#841584',
        fontSize: 16,
      }
})