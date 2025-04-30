import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import Colors from '@/data/Colors';

type ButtonProps = {
  text: string;
  onPress: () => void;
  loading?: boolean;
};

export default function Button({ text, onPress, loading = false }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={!loading ? onPress : undefined} // prevent multiple presses
      activeOpacity={0.7}
      disabled={loading} // disables interaction
      style={{
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        marginTop: 15,
        borderRadius: 10,
        opacity: loading ? 0.6 : 1, // visual feedback
      }}
    >
      {loading ? (
        <ActivityIndicator color={Colors.WHITE} />
      ) : (
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: Colors.WHITE,
          }}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}
