import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { EmptyState } from '../components/EmptyState';
import { ErrorBanner } from '../components/ErrorBanner';
import { StatusPill } from '../components/StatusPill';
import { AppNavigation } from '../navigation/types';
import { api } from '../services/api';
import { SensorModule } from '../types/mission';
import { formatDateTime } from '../utils/date';

type Props = {
  navigation: AppNavigation;
};

export function SensorsScreen({ navigation }: Props) {
  const [sensors, setSensors] = useState<SensorModule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadSensors = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.get<SensorModule[]>('/sensors');
      setSensors(response.data);
    } catch {
      setError('Nao foi possivel carregar as leituras.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSensors();
  }, [loadSensors]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        contentContainerStyle={styles.container}
        data={sensors}
        keyExtractor={(item) => String(item.id)}
        refreshing={loading}
        onRefresh={loadSensors}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.title}>Leituras de sensores</Text>
              <Text style={styles.subtitle}>Modulos computacionais da missao</Text>
            </View>
            <Pressable style={styles.addButton} onPress={() => navigation.navigate('NewSensor')}>
              <Text style={styles.addText}>+</Text>
            </Pressable>
          </View>
        }
        ListEmptyComponent={!loading ? <EmptyState message="Nenhum sensor cadastrado." /> : null}
        ListFooterComponent={error ? <ErrorBanner message={error} /> : null}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardTitleGroup}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.type}>{item.sensorType}</Text>
              </View>
              <StatusPill value={item.status} />
            </View>
            <Text style={styles.reading}>
              {item.reading} {item.unit}
            </Text>
            <Text style={styles.meta}>{item.moduleName}</Text>
            <Text style={styles.meta}>{item.location} - {formatDateTime(item.recordedAt)}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#10131a',
    flex: 1
  },
  container: {
    gap: 12,
    padding: 18,
    paddingBottom: 32
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    marginBottom: 4
  },
  headerText: {
    flex: 1
  },
  title: {
    color: '#f5f7fb',
    fontSize: 24,
    fontWeight: '900'
  },
  subtitle: {
    color: '#9aa6bc',
    fontSize: 14,
    marginTop: 4
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: '#65d6ad',
    borderRadius: 8,
    height: 44,
    justifyContent: 'center',
    width: 44
  },
  addText: {
    color: '#10131a',
    fontSize: 26,
    fontWeight: '900'
  },
  card: {
    backgroundColor: '#191e29',
    borderColor: '#252d3b',
    borderRadius: 8,
    borderWidth: 1,
    padding: 14
  },
  cardHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between'
  },
  cardTitleGroup: {
    flex: 1
  },
  name: {
    color: '#f5f7fb',
    fontSize: 16,
    fontWeight: '800'
  },
  type: {
    color: '#9aa6bc',
    fontSize: 13,
    marginTop: 3
  },
  reading: {
    color: '#65d6ad',
    fontSize: 28,
    fontWeight: '900',
    marginTop: 12
  },
  meta: {
    color: '#9aa6bc',
    fontSize: 13,
    marginTop: 4
  }
});
