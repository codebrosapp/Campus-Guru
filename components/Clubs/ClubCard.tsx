import { View, Text, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import Colors from '@/data/Colors'
import Button from '../Shared/Button'
import { AuthContext } from '@/context/AuthContext'
import axios from 'axios'

type CLUB = {
  id: number,
  name: string,
  club_logo: string,
  about: string,
  createdon: string,
  isFollowed: boolean,
  refreshData:()=>void
}

export default function ClubCard(club: CLUB) {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [followed, setFollowed] = useState(club.isFollowed);

  const onFollowBtnClick = async () => {
    setLoading(true);
    try {
      if (followed) {
        await axios.delete(`${process.env.EXPO_PUBLIC_HOST_URL}/clubfollower`, {
          data: {
            u_email: user?.email,
            clubId: club.id,
          },
        });
      } else {
        const result = await axios.post(`${process.env.EXPO_PUBLIC_HOST_URL}/clubfollower`, {
          u_email: user?.email,
          clubId: club.id,
        });
        if (result.data.message === "Already following") {
          console.log("Already following this club");
        }
      }
  
      setFollowed(!followed);
    } catch (error) {
      console.error('Follow/Unfollow error:', error);
    } finally {

      //club.refreshData()
      setLoading(false);
    }
  };
  

  return (
    <View style={{
      flex: 1,
      padding: 10,
      backgroundColor: Colors.WHITE,
      margin: 10,
      display: 'flex',
      alignItems: 'center',
      borderRadius: 15
    }}>
      <Image source={{ uri: club.club_logo }} style={{
        width: 80,
        height: 80,
        borderRadius: 99
      }} />
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{club.name}</Text>
      <Text numberOfLines={2} style={{ color: Colors.GRAY }}>{club.about}</Text>

      <Button
        text={followed ? 'Unfollow' : 'Follow'}
        loading={loading}
        outline={!followed}
        onPress={onFollowBtnClick}
      />
    </View>
  );
}
