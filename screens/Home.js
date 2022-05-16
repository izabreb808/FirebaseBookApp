import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { useState } from 'react/cjs/react.development';
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase';

const Home = () => {

  const navigation = useNavigation(); 
 
  const signOut = () => {
    auth.signOut()
    .then(() => {
      navigation.replace("Login")
    })
    .catch(error => alert(error.message));
  }


  // ADD A BOOK
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    const addBook = () => {
      if (title !== "" && author !== "") {
        db.collection("books").doc().set({
          author: author,
          title: title
        
      })
      .then(() => {
          console.log("Document successfully written!");
      }).catch((error) => {
        console.error("Error writing document: ", error);
    });
  
        setTitle("");
        setAuthor("");
      }
    } 


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text>Email: {auth.currentUser?.email}</Text>
        <TouchableOpacity onPress={signOut} style={styles.button}>
           <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
 
        <Text>Dodawanie:</Text>

        <TextInput placeholder="title" value={title} onChangeText={(text) => {setTitle(text)}}
                style={styles.textBoxes}></TextInput> 

        <TextInput placeholder="author" value={author} onChangeText={(text) => {setAuthor(text)}}
            style={styles.textBoxes}></TextInput> 

        <TouchableOpacity onPress={addBook} style={styles.button}>
            <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default Home

const styles = StyleSheet.create({
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
  }) 