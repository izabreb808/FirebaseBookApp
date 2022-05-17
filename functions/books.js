import React from 'react';
import { db } from '../firebase';
//import { List } from 'react-native-paper';
import { TouchableOpacity, StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';
import { useState, useEffect } from 'react/cjs/react.development';
import { List, Modal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
//import { TouchableHighlight } from 'react-native-web';

 function Books({ id, title, author, read }){

    const ref = db.collection('books');

    async function bookRead() {
        await ref.doc(id).update({
            read: !read,
        });
    }

    console.log(author);


    // MODIFY

    const [newTitle, setNewTitle] = useState("");
    const [newAuthor, setNewAuthor] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);

    const modifyBook = () => {
        setModalVisible(true);
        setNewTitle(title);
        setNewAuthor(author);
        //console.log('tytul aktualny --------', title);
        //console.log('tytul nowy --------', newTitle);
    }

    async function saveEdit(){
        console.log('tytul aktualny --------', title);
        console.log('tytul nowy --------', newTitle);
         await ref.doc(id).update({        
                title: newTitle,
                author: newAuthor       
        })
        setModalVisible(false); 
    }





    const closeModal = () => {
        setModalVisible(false); 
    }


    return(
      
         <List.Item
            //title={`${title} - ${author}`}
           title={title}
           // onPress={() => bookRead()}
             left={props => (
                 <TouchableOpacity onPress={() => bookRead()} style={styles.button }>
                        <List.Icon {...props} icon={ read ? 'check-circle-outline' : 'checkbox-blank-circle-outline'} />
                 </TouchableOpacity>   
            )} 

            description={props => (
                <SafeAreaView>
                    <Text >{author}</Text>
                </SafeAreaView>
            )} 

           right={props => (
            <TouchableOpacity onPress={modifyBook} style={styles.modalButton}>
                
                    <List.Icon icon={'marker'} style={styles.icons} />
                    {/* <List.Icon icon={'pencil'} style={styles.icons} /> */}
                
                
                <Modal animationType="fade" visible={isModalVisible} 
                    onRequestClose={() => setModalVisible(false)} >
                    <ScrollView style={styles.modalView}>
                    

                        <TextInput placeholder={title} value={newTitle} onChangeText={(text) => {setNewTitle(text)}}
                                style={styles.modalTextBoxes} editable={true}></TextInput> 
                         <TextInput placeholder={author} value={newAuthor} onChangeText={(text) => {setNewAuthor(text)}}
                                style={styles.modalTextBoxes} editable={true}></TextInput>

                        <View style={styles.horizontal}>
                        <Button onPress={() => closeModal()} style={styles.buttonM} title='x'></Button> 
                        <Button onPress={() => saveEdit()} style={styles.buttonM} title='modify'></Button> 
                        <Button style={styles.buttonM} title='delete'></Button> 
                        

                        </View>
                        
                        
                       
                    </ScrollView>           
                </Modal> 
            </TouchableOpacity>   
       )} 
            
           
            
            /> 

    );

}

export default React.memo(Books); 


const styles = StyleSheet.create({

    button: {
        width: '10%',
        
    },

    modalView: {
        width: '100%',
        backgroundColor: 'white',
        
    },

    modalButton: {
        width: '50%',
        

    },

    modalTextBoxes: {
        fontSize: 8,
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
          backgroundColor: '#841584',
          height: 30
      },

      icons: {
          marginLeft: 130,
          flexDirection: 'row',
          
      },

      horizontal: {
          flex: 2,
          flexDirection: 'row'
          
      },

      buttonM: {
        width: '20%',
        padding: 1,
        fontSize: 12
      }



})