import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const statusColors: Record<string, { backgroundColor: string; color: string }> = {
  NOMINAL: { backgroundColor: '#123f35', color: '#71f2c4' },
  NORMAL: { backgroundColor: '#123f35', color: '#71f2c4' },
  ONLINE: { backgroundColor: '#123f35', color: '#71f2c4' },
  ATTENTION: { backgroundColor: '#493716', color: '#ffd166' },
  WARNING: { backgroundColor: '#493716', color: '#ffd166' },
  DEGRADED: { backgroundColor: '#493716', color: '#ffd166' },
  CRITICAL: { backgroundColor: '#4a1720', color: '#ff7a90' }
};

type Props = {
  value: string;
};

export function StatusPill({ value }: Props) {
  const normalized = value.toUpperCase();
  const palette = statusColors[normalized] ?? { backgroundColor: '#2a3040', color: '#d6def2' };

  return (
    <View style={[styles.pill, { backgroundColor: palette.backgroundColor }]}>
      <Text style={[styles.text, { color: palette.color }]}>{normalized}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  text: {
    fontSize: 12,
    fontWeight: '800'
  }
});
