import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/data/Colors';
import TextInputField from '@/components/Shared/TextInputField';
import Button from '@/components/Shared/Button';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/configs/FirebaseConfig';
import { upload } from 'cloudinary-react-native';
import { cld, options } from '@/configs/CloudinaryConfig';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { ToastAndroid, Alert, Platform } from 'react-native';


export default function SignUp() {
  const [profileImage, setProfileImage] = useState<string | undefined>();
  const [fullName, setFullName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onBtnPress = () => {
    if (!email?.length || !password?.length || !fullName?.length || !profileImage) {
      const message = 'Please enter all details!';
      if (Platform.OS === 'android') {
        ToastAndroid.show(message, ToastAndroid.BOTTOM);
      } else {
        Alert.alert('Incomplete Form', message);
      }
      return;
    }

    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        console.log(userCredentials);
        // Upload Profile Image to Cloudinary
        await upload(cld, {
          file: profileImage,
          options: options,
          callback: async (error: any, response: any) => {
            if (error) {
              console.log(error);
              setLoading(false);
              return;
            }

            if (response) {
              console.log(response?.url);

              try {
                // Send user data to your backend
                const result = await axios.post(`${process.env.EXPO_PUBLIC_HOST_URL}/user`, {
                  name: fullName,
                  email: email,
                  image: response?.url ?? '',
                });

                if (result.data.success) {
                  console.log('User created successfully, navigating to landing');
                  router.push('/landing');
                } else {
                  const message = 'Failed to create user';
                  if (Platform.OS === 'android') {
                    ToastAndroid.show(message, ToastAndroid.BOTTOM);
                  } else {
                    Alert.alert('Error', message);
                  }
                }
                setLoading(false);
              } catch (e) {
                console.log(e);
                setLoading(false);
              }
            }
          },
        });
      })
      .catch((error) => {
        const errorMsg = error?.message || 'An error occurred';
      
        if (Platform.OS === 'android') {
          ToastAndroid.show(errorMsg, ToastAndroid.BOTTOM);
        } else {
          Alert.alert('Error', errorMsg);
        }
      
        setLoading(false);
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ paddingTop: 40, padding: 20 }}>
      <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Create New Account</Text>

      <View style={{ display: 'flex', alignItems: 'center' }}>
        <TouchableOpacity onPress={pickImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Image
              source={require('./../../assets/images/profile.png')}
              style={styles.profileImage}
            />
          )}
          <Ionicons
            name="camera"
            size={24}
            color={Colors.PRIMARY}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
            }}
          />
        </TouchableOpacity>
      </View>

      <TextInputField label="Full Name" onChangeText={(v) => setFullName(v)} />
      <TextInputField label="College Email" onChangeText={(v) => setEmail(v)} />
      <TextInputField label="Password" password={true} onChangeText={(v) => setPassword(v)} />

      <Button text="Create Account" onPress={onBtnPress} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 99,
    marginTop: 20,
  },
});
