import React from 'react';
import { db } from '../firebase';
//import { List } from 'react-native-paper';
import { TouchableOpacity, StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';
import { useState, useEffect } from 'react/cjs/react.development';
import { List, Modal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../firebase'

 function Books({ id, title, author, read }){

    //const ref = db.collection('books');
    let x = "books_" + auth.currentUser?.email.toString();
    //console.log("collection ", x);
    const ref = db.collection(x);

    async function bookRead() {
        await ref.doc(id).update({
            read: !read,
        });
    }



    // MODIFY

    const [newTitle, setNewTitle] = useState("");
    const [newAuthor, setNewAuthor] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);


    const modifyBook = () => {
        setModalVisible(true);
        setNewTitle(title);
        setNewAuthor(author);

    }

    async function saveEdit(){
        //console.log('tytul aktualny --------', title);
        //console.log('tytul nowy --------', newTitle);
         await ref.doc(id).update({        
                title: newTitle,
                author: newAuthor       
        })
        setModalVisible(false); 
     
    }

    async function deleteData(){
        await ref.doc(id).delete();
        setModalVisible(false); 
       
    }

    const closeModal = () => {
        setModalVisible(false);
      
    }


    return(
      
         <List.Item
            //title={`${title} - ${author}`}
           title ={props => (
               <Text style={styles.title}>{"\"" + title + "\""}</Text>
           )
        }
           // onPress={() => bookRead()}
             left={props => (
                 <TouchableOpacity onPress={() => bookRead()} style={styles.button }>
                        <List.Icon {...props} icon={ read ? 'check-circle-outline' : 'checkbox-blank-circle-outline'} />
                 </TouchableOpacity>   
            )} 

            description={props => (
                <View style={styles.area}>  
               
                    <TouchableOpacity onPress={modifyBook} style={isModalVisible ? styles.modalButtonModify : styles.modalButton}>
                    <Text style={styles.author}>{author}</Text>  
                 <Modal animationType="fade" visible={isModalVisible} 
                    onRequestClose={() => setModalVisible(false)} >
                    <ScrollView style={styles.modalView}>
                    
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TextInput placeholder={title} value={newTitle} onChangeText={(text) => {setNewTitle(text)}}
                                style={styles.modalTextBoxes} editable={true}></TextInput> 
                         <TextInput placeholder={author} value={newAuthor} onChangeText={(text) => {setNewAuthor(text)}}
                                style={styles.modalTextBoxes} editable={true}></TextInput>

                    </View>

                        

                        <View style={styles.horizontal}>
                       
                        <TouchableOpacity onPress={() => saveEdit()} style={styles.buttonM}>
                            <Text style={styles.textM}>modify</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity onPress={() => deleteData()} style={styles.buttonM}>
                            <Text style={styles.textM}>delete</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity onPress={() => closeModal()} style={styles.buttonM}>
                            <Text style={styles.textM}>close</Text>
                        </TouchableOpacity>                   

                        </View>   
                       
                    </ScrollView>           
                </Modal> 
            </TouchableOpacity>   
                </View>
            )} 

            right={props => (
                <TouchableOpacity onPress={modifyBook} style={styles.button }>
                        <List.Icon {...props} icon={ 'pencil' } />
                 </TouchableOpacity>
            
       )}  
            
           
            
            /> 

    );

}

export default React.memo(Books); 


const styles = StyleSheet.create({

    area: {
        marginTop: 5,
      
    },

    button: {
        width: '10%',
        marginRight: 10
       
    },

    modalView: {
        
        height: '100%',
        width: '100%',
        backgroundColor: '#DFE6F6',
        borderColor: 'black',
        borderWidth: 1,
       
        
    },

    modalButton: {  
        width: '100%',
        
    },

    modalButtonModify: {
        height: 160,
    },

    modalTextBoxes: {
        fontSize: 14,
        width: '90%',
        height: 30,
        padding: 5,
        margin: 5,
        borderWidth: 0.2,
        borderRadius: 5,
        
        
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

      buttonEdit: {
          width: 80,
          backgroundColor: '#8DB2FF',
          height: 30
      },

      icons: {
          marginLeft: 130,
          flexDirection: 'row',
          
      },

      horizontal: {
          flex: 2,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
      },

      buttonM: {
        width: 60,
        height: 25,
        margin: 10,
        alignItems: 'center',
        backgroundColor: '#8DB2FF',
        borderRadius: 10,
      },

      textM: {
        fontSize: 14,
        
        color: 'white',
      },

      author: {
          marginLeft: 5,
          marginTop: 8,
      },

      title: {
        fontSize: 18,
      }



})