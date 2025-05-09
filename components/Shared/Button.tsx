import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import Colors from '@/data/Colors';

type ButtonProps = {
  text: string;
  onPress: () => void;
  loading?: boolean;
  outline?: boolean;
};

export default function Button({ text, onPress, loading = false, outline = false }: ButtonProps) {
  const isSolid = loading || !outline;
  return (
    <TouchableOpacity
      onPress={!loading ? onPress : undefined} // prevent multiple presses
      activeOpacity={0.7}
      disabled={loading} // disables interaction
      style={{
        padding: 15,
        backgroundColor: outline ? Colors.WHITE : Colors.PRIMARY,
        borderWidth: outline ? 1 : 0,
        borderColor: Colors.PRIMARY ,
        marginTop: 15,
        borderRadius: 10,
        opacity: loading ? 0.6 : 1, // visual feedback
      }}
    >
      {loading ? (
        <ActivityIndicator color={isSolid? Colors.PRIMARY : Colors.WHITE} />
      ) : (
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: outline ? Colors.PRIMARY : Colors.WHITE,
          }}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}
