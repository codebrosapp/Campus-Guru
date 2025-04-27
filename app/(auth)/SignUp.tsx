import { View, Text, Touchable, TouchableOpacity, ToastAndroid } from 'react-native'
import React, {useState} from 'react'
import { Image } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/data/Colors';
import TextInputField from '@/components/Shared/TextInputField';
import Button from '@/components/Shared/Button';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/configs/FirebaseConfig';
import {upload} from 'cloudinary-react-native';
import { cld, options } from '@/configs/CloudinaryConfig';
import axios from 'axios'
import { useRouter } from 'expo-router';


export default function SignUp() {
    const [profileImage, setProfileImage] = useState<string|undefined>();
    const [fullName, setFullName]=useState<string|undefined>();
    const [email, setEmail]=useState<string|undefined>();
    const [password, setPassword]=useState<string|undefined>();
    const router = useRouter();

    const onBtnPress = () => { 
        if(!email?.length || !password?.length || !fullName?.length)
        {
            ToastAndroid.show('Please enter all details!',ToastAndroid.BOTTOM);
            return;
        }

        createUserWithEmailAndPassword(auth,email,password)
        .then(async(userCredentails)=>{
            console.log(userCredentails);
            //Upload Profile Image
             await upload(cld, {
                file:profileImage,
                options:options,
                callback: async(error:any, response:any)=>{
                    if(error) 
                    {
                        console.log(error)
                    }
                    if(response)
                    {
                        console.log(response?.url)
                        const result=await axios.post(process.env.EXPO_PUBLIC_HOST_URL+"/user",{
                          name: fullName,
                          email: email,
                          image: response?.url
                        });
                        console.log(result);
                        //Route to home screen
                        router.push('/landing') 

                    }
                }
             })
            //Save to Database

        }).catch((error)=>{
            const errorMsg=error?.message
            ToastAndroid.show(errorMsg,ToastAndroid.BOTTOM)
        })
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [4, 4],
          quality: 0.5,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setProfileImage(result.assets[0].uri);
        }
      };

  return (
    <View style={{
        paddingTop: 40,
        padding: 20
    }}>
      <Text style={{
        fontSize: 25,
        fontWeight: 'bold'
      }}>Create New Account</Text>

      <View style={{
        display: 'flex',
        alignItems: 'center'
      }}>

        <View>
         
         <TouchableOpacity onPress= {pickImage}>
         {profileImage?
           <Image source={{uri:profileImage}} style={styles.profileImage}/> 
        :
      <Image source={require('./../../assets/images/profile.png')}
         style={styles.profileImage}
      />}
      <Ionicons name="camera" size={24} color={Colors.PRIMARY} 
        style={{
            position: 'absolute',
            bottom: 0,
            right: 0
        }}
      />
      </TouchableOpacity>
    </View>

    </View>
    <TextInputField  label="Full Name" onChangeText={(v) => setFullName(v)} />
    <TextInputField  label="College Email" onChangeText={(v) => setEmail(v)} />
    <TextInputField  label="Password" password={true} onChangeText={(v) => setPassword(v)} />
      
      <Button text='Create Account' onPress={()=>onBtnPress()}/>
    </View>
  )
}

const styles = StyleSheet.create({
    profileImage:{
        width: 100,
        height: 100,
        borderRadius: 99,
        marginTop: 20
     }
});