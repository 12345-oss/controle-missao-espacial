import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  message: string;
};

export function ErrorBanner({ message }: Props) {
  return (
    <View style={styles.banner}>
      <Text style={styles.symbol}>!</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    alignItems: 'center',
    backgroundColor: '#451923',
    borderColor: '#713040',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    padding: 12
  },
  text: {
    color: '#ffd6de',
    flex: 1,
    fontSize: 13,
    lineHeight: 18
  },
  symbol: {
    color: '#ffb4c2',
    fontSize: 18,
    fontWeight: '900'
  }
});
