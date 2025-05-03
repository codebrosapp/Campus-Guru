import { View, Text, TextInput, StyleSheet, Image } from 'react-native'
import React from 'react'
import Colors from '@/data/Colors'

export default function WritePost() {
    
  return (
    <View>
     
     <TextInput placeholder='Write your post here... '
      placeholderTextColor="#999"
      style={styles.textInput}
      multiline={true}
      numberOfLines={5}
      maxLength={1000}
      />

      <Image source={require('./../../assets/images/image.png')} 
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textInput:{
    padding: 10,
    backgroundColor: Colors.WHITE,
    height: 140,
    marginTop: 10,
    borderRadius: 15,
    textAlignVertical: 'top',
    elevation: 7
  },

  image:{
    width:100,
    height:100,
    borderRadius:15,
    marginTop: 15,
 
  }
})

