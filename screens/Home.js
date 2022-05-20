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


      <View style={{height: '12%', marginBottom: 5}}>
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
          readBooksVisible ? <Text>Your list of books:</Text> : <Text>Your list of read books:</Text>} 
              data={readBooksVisible ? allbooks : readbooks}   
            keyExtractor={(item) => item.id} 
            
            renderItem={({ item }) =>  
              <Books {...item} />
            } 
       
           
            
            >
            </FlatList> 
      </ScrollView>

      <TouchableOpacity onPress={changeView} style={styles.add}>
            <Text style={{fontSize: 20}}> Change list </Text> 
          </TouchableOpacity>

      
      <Provider>
        <View>
          <TouchableOpacity onPress={showDialog} style={styles.add}>
            <Text style={{fontSize: 20}}> Add a book </Text> 
          </TouchableOpacity>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Add a new book</Dialog.Title>

              <Dialog.Content>
                <Paragraph>This is simple dialog</Paragraph>
                <TextInput placeholder="title" value={title} onChangeText={(text) => {setTitle(text)}}
                    style={styles.textBoxes}></TextInput> 

                <TextInput placeholder="author" value={author} onChangeText={(text) => {setAuthor(text)}}
                    style={styles.textBoxes}></TextInput> 
                </Dialog.Content>

                <Dialog.Actions>
                  <TouchableOpacity onPress={hideDialog} style={styles.button}>
                    <Text style={styles.buttonText}> Close </Text> 
                  </TouchableOpacity>
                  <TouchableOpacity onPress={addBook} style={styles.button}>
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
      backgroundColor: '#D0F8F6'
  },

   horizontal: {
      flex: 2,
      flexDirection: 'row',
      marginTop: 40,
      marginLeft: 10,
      
  },

    button: {
      backgroundColor: '#841584',
      width: '40%',
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
      

    },

    scroll: {
      height: '75%',
      marginBottom: 7,
      backgroundColor: '#F3BDAD',

    },

    add: {height: 30, marginLeft: 10, alignItems: 'center'},
   


  }) 