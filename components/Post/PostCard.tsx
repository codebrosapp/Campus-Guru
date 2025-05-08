import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import UserAvatar from './UserAvatar'
import Colors from '@/data/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface Post {
    id: number;
    content: string;
    imageurl: string;
    visiblein: string;
    createon: string;
    createdby: string;
  }

export default function PostCard({post}: any) {
    
  return (
    <View style={{
        padding: 7,
        backgroundColor: Colors.WHITE,
        borderRadius: 8,
        marginTop: 10,
    }}>
       <UserAvatar name={post.name} image={post.image} date={post.createon}/>
        <Text style={styles.content}>
        {post.content || 'No content available.'}
      </Text>

      <Image
  source={{ uri: post.imageurl }}
  style={styles.postImage}
  onError={(error) => console.error("Image load error:", post.imageurl, error)}
/>


    <View style={{
      marginTop: 10,
      display: 'flex',
      flexDirection: 'row',
      gap: 20,
      alignItems: 'center'
    }}>
      <View style={styles.subContainer}>
      <AntDesign name="like2" size={24} color="black" />
      <Text style={{fontSize: 17, color: Colors.GRAY }}>25</Text>
      </View>
      <View style={styles.subContainer}>
      <MaterialCommunityIcons name="comment-text-outline" size={24} color="black" />
      <Text style={{fontSize: 17, color: Colors.GRAY }}>25</Text>
      </View>
    </View>

  <Text style={{
    marginTop: 7,
    color: Colors.GRAY
  }}>
    View all comment
  </Text>

    </View>

    
  )
}

const styles = StyleSheet.create({
    card: {
      padding: 12,
      backgroundColor: Colors.WHITE,
      borderRadius: 10,
      marginBottom: 15,
      elevation: 3,
    },
    content: {
      fontSize: 15,
      marginTop: 8,
      color: '#333',
    },
    postImage: {
      width: '100%',
      height: 300,
      marginTop: 10,
      objectFit: 'cover',
      marginBottom: 15,
      borderRadius: 10,
    },
    subContainer:{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7
    }
  });