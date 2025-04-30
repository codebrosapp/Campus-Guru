import { View, Text, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/data/Colors'
import Button from '@/components/Shared/Button'
import { useRouter } from 'expo-router'

export default function LandingScreen() {
  const router = useRouter();
    const [loading, setLoading] = useState(false);
  
  return (
    <View>
       <Image source={require('./../assets/images/login.png')}
         style={{
            width: '100%',
            height: 500
         }}
       />
       <View style={{
         padding: 20,
       }}>
        <Text style={{
            fontSize: 35,
            fontWeight: 'bold',
            textAlign: 'center'
        }}>
            Welcome to College Campus Guru
        </Text>

        <Text style={{
            fontSize: 17,
            textAlign: "center",
            marginTop: 10,
            color: Colors.GRAY
        }}>Your college news, Update in your pocket , Join the club, Register for new events and Many More</Text>

        <Button text='Get Started' 
        onPress={()=> router.push('/(auth)/SignUp')} loading={loading}/>

        <Pressable onPress={()=>router.push('/(auth)/SignIn')}>

        <Text style={{
               fontSize: 16,
               textAlign: 'center',
               color: Colors.GRAY,
               marginTop: 7
        }}>Already have an account? Sign In Here</Text>
        </Pressable>
       </View>
    </View>
  )
}