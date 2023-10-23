import { Button, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { firestore, addDoc,MESSAGES, collection, serverTimestamp, onSnapshot, query, orderBy } from './firebase/Config';
import { useEffect, useState } from 'react';
import  Constants  from 'expo-constants';
import { convertFirebaseTimeStamptoJS } from './helper/Functions';


export default function App() {
  const [messages, setMessages] = useState ([])
  const [newMessage, setNewMessage] = useState('')

  const save = async() => {
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: newMessage,
      created: serverTimestamp()
    })
    setNewMessage('')
    console.log("Message saved.")
  }

  useEffect (()=> {
    const q = query(collection(firestore,MESSAGES), orderBy('created', 'desc'))

    const unsubscribe = onSnapshot(q, (querySnapshot)=> {
      const tempMessages =[]

      querySnapshot.forEach((doc) => {
        const messageObject ={
          id: doc.id,
          text: doc.data().text,
          created: convertFirebaseTimeStamptoJS(doc.data().created)
        }
        tempMessages.push(messageObject)
      })
      setMessages(tempMessages)
    })

    return () => {
      unsubscribe
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {
          messages.map((message) => (
            <View style = {styles.message} key = {message.id}>
              <Text style = {styles.messageInfo}>{message.created}</Text>
              <Text>{message.text}</Text>
            </View>
          ))
        }
      </ScrollView>
      <TextInput placeholder='Send message...' value={newMessage} onChangeText={text => setNewMessage(text)}/>
      <Button title='Send' type="button" onPress={save} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
  },
  message: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,

  },
  messageInfo: {
    fontSize: 12
  }
});
