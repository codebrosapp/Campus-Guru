import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ToastAndroid, Alert, Platform} from 'react-native'
import React, { useContext, useState } from 'react'
import Colors from '@/data/Colors'
import DropDownPicker from 'react-native-dropdown-picker'
import Button from '../Shared/Button';
import * as ImagePicker from 'expo-image-picker';
import { cld, options } from '@/configs/CloudinaryConfig';
import { upload } from 'cloudinary-react-native';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'expo-router';


export default function WritePost() {
  
  const [selectedImage, setSelectedImage] = useState<string|undefined>();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [content, setContent] = useState<string|null>();
  const {user}=useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [item, setItems] = useState([
    {label: 'Public', value: 'Public'},
    {label: 'SRC', value: 'SRC'},
    {label: 'COMHSSA', value: 'COMHSSA'},
    {label: 'NUENSA', value: 'ABCD Club'},
    {label: 'COSSA', value: 'COSSA'},
  ])
  const router=useRouter();
    
  const onPostBtnClick = async() => {

    if(!content) {
      const message='Please enter content';
        if (Platform.OS === 'android') {
              ToastAndroid.show(message, ToastAndroid.BOTTOM);
            } else {
              Alert.alert('Incomplete Form', message);
            }
            return;
    }

    setLoading(true);

    //Upload Image
    let uploadImageUrl='';
    if(selectedImage) {
      const resultData:any = await new Promise(async(resolve,reject)=>{
        await upload(cld, {
          file:selectedImage,
          options:options,
          callback:(error:any,response:any)=>{
            if(error) {
              reject(error)
            } else {
              resolve(response)
            }
          }
        })
      })

      uploadImageUrl=resultData&&resultData?.url
    }

    const result= await axios.post(process.env.EXPO_PUBLIC_HOST_URL+'/post',{
      content:content,
      imageUrl:uploadImageUrl,
      visibleIn:value,
      email:user?.email
    })
    console.log(result.data);
    setLoading(false);
    router.replace('/(tabs)/Home')
  }

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0.5,
      });
  
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    };

  return (
    <View>
     
     <TextInput placeholder='Write your post here... '
      placeholderTextColor="#999"
      style={styles.textInput}
      multiline={true}
      numberOfLines={5}
      maxLength={1000}
      onChangeText={(value)=>setContent(value)}

      />
          
      <TouchableOpacity onPress={pickImage}>
      {selectedImage? <Image source={{uri:selectedImage}} 
        style={styles.image}
      />:
        <Image source={require('./../../assets/images/image.png')} 
        style={styles.image}
      />}

      </TouchableOpacity>    

       
       <View style={{
           marginTop: 15
       }}>


      <DropDownPicker
         items={item}
         open={open}
         value={value}
         setOpen={setOpen}
         setValue={setValue}
         setItems={setItems}
         style={{
          marginTop: 15,
          borderWidth: 0,
          elevation: 1
         }}
      />
      </View>

      <Button text='Post' 
      onPress={()=>onPostBtnClick()}
      loading={loading}
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

