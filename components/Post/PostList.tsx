import { View, Text, FlatList } from 'react-native';
import React from 'react';
import PostCard from './PostCard';

export default function PostList({ posts, OnRefresh, loading }: any) {
    return (
      <View>
        <FlatList
          data={posts}
          onRefresh={OnRefresh}
          refreshing={loading}
          renderItem={({ item }) => <PostCard post={item} />}
          keyExtractor={(item) => item.createon} // Use the timestamp as the key (likely unique)
        />
      </View>
    );
  }
