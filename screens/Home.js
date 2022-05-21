import { ScrollView, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, TextInput, FlatList, View } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react/cjs/react.development';
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase';
import  Books  from '../functions/books'
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';

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


    let x = "books_" + auth.currentUser?.email.toString();
    //console.log(x);
    const ref = db.collection(x);

    const addBook = () => {
      if (title !== "" && author !== "") {
        ref.doc().set({
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



    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);


    // GET A DATA 

    const [ loading, setLoading ] = useState(true);
    const [ allbooks, setBooks ] = useState([]);
    const [ readbooks, setReadBooks ] = useState([]);

    useEffect(() => {
      return ref.onSnapshot(querySnapshot => {
        const list = [];
        const listRead = [];
        querySnapshot.forEach(doc => {
          const {title, author, read} = doc.data();
          list.push({
            id: doc.id,
            title,
            author,
            read,
          });
          if ( read == true){
            listRead.push({
              id: doc.id,
              title,
              author,
              read,
            });
          }
         
        });

        setBooks(list);
        setReadBooks(listRead);

        //console.log(readbooks);

         if (loading) {
          setLoading(false);
         
        }
        
      });
    }, []);


    const [readBooksVisible, setReadBooksVisible] = React.useState(false);


    const changeView = () => {
      if (readBooksVisible) {

      setReadBooksVisible(false);
      console.log("zmiana na false");
      }
      else  {
        setReadBooksVisible(true);
        console.log("zmiana na true");
      }
    }



  
     if (loading) {
      return null; // or a spinner
      
    }

 


  return (
    <View style={styles.container} behavior="padding">


      <View style={{marginBottom: 5, height: '9%'}}>
        <View style={styles.horizontal}>
              <Text style={{fontSize: 15, width: '80%'}}>Email: {auth.currentUser?.email}</Text>
              <TouchableOpacity icon="log-out" onPress={signOut} style={{width: '20%'}}>
              <Text style={styles.buttonText}>Sign out</Text>
              </TouchableOpacity>
          </View>

          {/* <Text style={{marginLeft: 10}}>Your list of books:</Text>  */}

      </View>
     

      <ScrollView style={styles.scroll}>

        <FlatList style={styles.list} 
         ListHeaderComponent={()=>
          readBooksVisible ? <Text style={styles.header}>Your list of books:</Text> : <Text style={styles.header}>Your list of read books:</Text>} 
              data={readBooksVisible ? allbooks : readbooks}   
            keyExtractor={(item) => item.id} 
            
            renderItem={({ item }) =>  
              <Books {...item} />
            } 
            > </FlatList> 
      </ScrollView>

      
      <Provider>
        <View style={{flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

        <TouchableOpacity onPress={changeView} style={[styles.add, styles.button]}>
            <Text style={styles.buttonText}> {readBooksVisible ? 'Read books' : 'All books'} </Text> 
      </TouchableOpacity>

          <TouchableOpacity onPress={showDialog} style={[styles.add, styles.button]}>
            <Text style={styles.buttonText}> Add a book </Text> 
          </TouchableOpacity>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Add a new book</Dialog.Title>

              <Dialog.Content>
                <Paragraph>This is simple dialog</Paragraph>
                <TextInput placeholder="title" value={title} onChangeText={(text) => {setTitle(text)}}
                    style={styles.textBoxes} autoCorrect={false}></TextInput> 

                <TextInput placeholder="author" value={author} onChangeText={(text) => {setAuthor(text)}}
                    style={styles.textBoxes} autoCorrect={false}></TextInput> 
                </Dialog.Content>

                <Dialog.Actions>
                  <TouchableOpacity onPress={hideDialog} style={[styles.button, styles.add]}>
                    <Text style={styles.buttonText}> Close </Text> 
                  </TouchableOpacity>
                  <TouchableOpacity onPress={addBook} style={[styles.button, styles.add]}>
                      <Text style={styles.buttonText}>Add</Text>
                  </TouchableOpacity>       
                </Dialog.Actions>

            </Dialog>
          </Portal>
        </View>
      </Provider>   

    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
      height: '100%',
      backgroundColor: '#8DB2FF'
  },

   horizontal: {
      flex: 2,
      flexDirection: 'row',
      marginTop: 45,
      marginLeft: 10,
      
  },

    button: {
      backgroundColor: '#8DB2FF',
      width: '46%',
      padding: 12,
      borderRadius: 10,
      alignItems: 'center',
  
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
  
    buttonText: {
      color: 'white',
      fontSize: 16,
    },

    list: {
      flex: 1,
      marginTop: 5,

    },

    scroll: {
      height: '75%',
      marginBottom: 2,
      backgroundColor: '#DFE6F6',
      borderRadius: 10,
      marginLeft: 10,
      marginRight: 10,

    },

    add: {height: '80%', margin: 5},

    header: { marginLeft: 10, textAlign: 'center', fontFamily: 'serif'},
   


  }) 