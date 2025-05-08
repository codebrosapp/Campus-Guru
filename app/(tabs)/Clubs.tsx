import { View, Text } from 'react-native'
import React, { useState } from 'react'
import EmptyState from '@/components/Clubs/EmptyState'

export default function Clubs() {
  const [followedClub, setFollowedClubs] = useState([])
  return (
    <View style={{
      padding: 40
    }}>
      <Text style={{
        fontSize: 35,
        fontWeight: 'bold'
      }}>Clubs</Text>
      {followedClub?.length==0
      && <EmptyState/>}
    </View>
  )
}