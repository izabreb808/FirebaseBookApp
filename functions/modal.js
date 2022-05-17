import React from 'react';
import { db } from '../firebase';
import { List } from 'react-native-paper';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Modal } from 'react-native-paper';

 function Modal({ id, title, author, read }){

    const ref = db.collection('books');

    async function deleteBook(){
        await ref.doc(id).update({
            title: newTitle,
            author: newAuthor
        })

    }

    async function bookRead() {
        await ref.doc(id).update({
            read: !read,
        });
    }

    console.log(author);

    return(
      
         <List.Item
            //title={`${title} - ${author}`}
           title={title}
           // onPress={() => bookRead()}
             left={props => (
                 <TouchableOpacity onPress={() => bookRead()} style={styles.button }>
                        <List.Icon {...props} icon={ read ? 'check-circle-outline' : 'checkbox-blank-circle-outline'} marginTop />
                 </TouchableOpacity>   
            )} 

            description={props => (
                <Text width='80%'>{author}</Text>
            )} 

           right={props => (
            <TouchableOpacity onPress={deleteBook} style={styles.button }>
                <List.Icon icon='delete' />
            </TouchableOpacity>   
       )} 
            
           
            
            /> 

    );

}

export default React.memo(Modal); 


const styles = StyleSheet.create({

    button: {
        width: '10%',
        
    }
})

/* 
<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      ></Modal> */