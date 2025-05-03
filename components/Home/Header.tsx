import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react'
import Colors from '@/data/Colors'
import { AuthContext } from '@/context/AuthContext'

export default function Header() {
    const {user}= useContext(AuthContext)
  return (
    <View style={{
        display:'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
    }}>
        <View>
        <Text style= {{
            fontSize: 25,
            color: Colors.PRIMARY,
            fontWeight: 'bold'
        }}
        >Hey There!</Text>
        <Text style={{
            fontSize: 18,
            color: Colors.GRAY
        }}
        
        >Afebabalola University</Text>
        </View>
        <Image source={{uri:user?.image}} style={{
            width: 50,
            height: 50,
            borderRadius: 99
        }}  />
     
    </View>
  )
}