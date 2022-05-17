import { ScrollView, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react/cjs/react.development';
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase';
import  Books  from '../functions/books'


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




    // GET A DATA 

    const [ loading, setLoading ] = useState(true);
    const [ allbooks, setBooks ] = useState([]);

    useEffect(() => {
      return db.collection("books").onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot.forEach(doc => {
          const {title, author, read} = doc.data();
          list.push({
            id: doc.id,
            title,
            author,
            read,
          });
        });

        setBooks(list);

        //.log(list);
        console.log(allbooks);

         if (loading) {
          setLoading(false);
         
        }
        
      });
    }, []);


  
     if (loading) {
      return null; // or a spinner
      
    }
  



  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text>Email: {auth.currentUser?.email}</Text>
        <TouchableOpacity onPress={signOut} style={styles.button}>
           <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>

        <Text>Your list of books!</Text> 
     
     <ScrollView>

      <FlatList style={styles.list} 
            data={allbooks}   
          keyExtractor={(item) => item.id} 
          
          renderItem={({ item }) =>  
            <Books {...item} />
          }  
          >
           </FlatList> 
     </ScrollView>
        

 

      

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
  container:{
      padding: 10,
      marginTop: 50
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

    list: {
      flex: 1,

    }
  }) 