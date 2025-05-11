import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '@/data/Colors';
import axios from 'axios';
import PostList from '../Post/PostList';

// Define the Post type
interface Post {
  id: number;
  content: string;
  imageurl: string;
  visiblein: number;
  createon: string;
  createdby: string;
}

export default function LatestPost() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const tabOptions = [
    { label: 'Public', value: 0 },
    { label: 'Codies', value: 1 },
    { label: 'Football Team', value: 2 },
  ];

  useEffect(() => {
    GetPosts(tabOptions[selectedTab].value);
  }, [selectedTab]);

  const GetPosts = async (visibleIn: number) => {
    setLoading(true)
    console.log("Sending club value:", visibleIn);
    
      const result = await axios.get(`${process.env.EXPO_PUBLIC_HOST_URL}/post?club=${visibleIn}&orderField=id`);
      console.log("Fetched posts:", result.data);
      setPosts(result.data);
      setLoading(false);

  };
  

  return (
   
    <View style={{ marginTop: 15 }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 , marginBottom: 2}}>
        {tabOptions.map((tab, index) => (
          <Pressable key={index} onPress={() => setSelectedTab(index)}>
            <Text
              style={[
                styles.tabtext,
                {
                  backgroundColor: selectedTab === index ? Colors.PRIMARY : Colors.WHITE,
                  color: selectedTab === index ? Colors.WHITE : Colors.PRIMARY,
                },
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>
      
      <PostList posts={posts} 
      loading={loading}
       OnRefresh={GetPosts}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabtext: {
    padding: 4,
    fontSize: 15,
    paddingHorizontal: 10,
    borderRadius: 99,
  },
});
