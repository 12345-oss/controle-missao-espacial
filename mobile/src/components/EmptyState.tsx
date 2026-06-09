import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  message: string;
};

export function EmptyState({ message }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.symbol}>--</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
    padding: 28
  },
  text: {
    color: '#9aa6bc',
    fontSize: 14,
    textAlign: 'center'
  },
  symbol: {
    color: '#8b95a7',
    fontSize: 22,
    fontWeight: '900'
  }
});
