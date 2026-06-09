import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  icon: string;
  label: string;
  detail: string;
  accent: string;
  onPress: () => void;
};

export function ActionTile({ icon, label, detail, accent, onPress }: Props) {
  return (
    <Pressable style={({ pressed }) => [styles.tile, pressed && styles.pressed]} onPress={onPress}>
      <View style={[styles.iconBox, { backgroundColor: `${accent}22` }]}>
        <Text style={[styles.iconText, { color: accent }]}>{icon.slice(0, 2).toUpperCase()}</Text>
      </View>
      <View style={styles.copy}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.detail}>{detail}</Text>
      </View>
      <Text style={styles.arrow}>{'>'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    alignItems: 'center',
    backgroundColor: '#191e29',
    borderColor: '#252d3b',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    minHeight: 74,
    padding: 14
  },
  pressed: {
    opacity: 0.78
  },
  iconBox: {
    alignItems: 'center',
    borderRadius: 8,
    height: 44,
    justifyContent: 'center',
    width: 44
  },
  iconText: {
    fontSize: 13,
    fontWeight: '900'
  },
  copy: {
    flex: 1
  },
  arrow: {
    color: '#8b95a7',
    fontSize: 20,
    fontWeight: '900'
  },
  label: {
    color: '#f5f7fb',
    fontSize: 16,
    fontWeight: '800'
  },
  detail: {
    color: '#9aa6bc',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 3
  }
});
