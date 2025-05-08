import { View, Text, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import ClubCard from '@/components/Clubs/ClubCard'
import Button from '@/components/Shared/Button'
import Colors from '@/data/Colors'
import { AuthContext } from '@/context/AuthContext'

export type CLUB={
    id: number,
    name: string,
    club_logo: string,
    about: string,
    createdon: string,
    isFollowed: boolean
}

export default function ExploreClubs() {

    const [clubList, setClubList]= useState<CLUB[] | []>([])
    const {user}=useContext(AuthContext)
    const [followedClubSet, setFollowedClubSet] = useState<Set<number>>(new Set());

    useEffect(()=>{
        GetAllClubs();
    },[])


    const GetAllClubs = async () => {
        try {
          const result = await axios.get(process.env.EXPO_PUBLIC_HOST_URL+'/clubs');
          console.log("CLUBS RESPONSE:", result.data);
          setClubList(result.data); 
          GetUserFollowedClubs();// or .clubs based on actual response
        } catch (error) {
          console.error("Error fetching clubs:", error);
        }
      };

      const GetUserFollowedClubs=async()=>{
        const result=await axios.get(process.env.EXPO_PUBLIC_HOST_URL+"/clubfollower?u_email="+user?.email)
        console.log(result?.data);
        const clubIds = result.data.map((item: any) => item.club_id);
        setFollowedClubSet(new Set(clubIds)); 
      }
      
      const onAddClubBtnClick=()=>{

      }
      
      const isFollowed = (clubId: number) => followedClubSet.has(clubId); 
    
  return (
    <View>
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            margin: 10,
            alignItems: 'center',
            borderWidth: 1,
            borderStyle: 'dashed',  
            borderRadius: 15
            }}>
            <Text style={{
                fontSize: 17,
                color: Colors.GRAY
            }}>Create New College / Depatrment</Text>
            <Button text='+ Add ' onPress={()=>onAddClubBtnClick()} />
        </View>
    <FlatList 
      data={clubList}
      numColumns={2}
      renderItem={({ item }) => (
        <ClubCard {...item} isFollowed={isFollowed(item.id)} />
      )}
    />

    </View>
  )
}  