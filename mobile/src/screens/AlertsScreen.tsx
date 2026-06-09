import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { EmptyState } from '../components/EmptyState';
import { ErrorBanner } from '../components/ErrorBanner';
import { StatusPill } from '../components/StatusPill';
import { api } from '../services/api';
import { MissionAlert } from '../types/mission';
import { formatDateTime } from '../utils/date';

export function AlertsScreen() {
  const [alerts, setAlerts] = useState<MissionAlert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadAlerts = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.get<MissionAlert[]>('/alerts');
      setAlerts(response.data);
    } catch {
      setError('Nao foi possivel carregar os alertas.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAlerts();
  }, [loadAlerts]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        contentContainerStyle={styles.container}
        data={alerts}
        keyExtractor={(item) => String(item.id)}
        refreshing={loading}
        onRefresh={loadAlerts}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Alertas criticos</Text>
            <Text style={styles.subtitle}>Ocorrencias que exigem resposta da operacao</Text>
          </View>
        }
        ListEmptyComponent={!loading ? <EmptyState message="Nenhum alerta registrado." /> : null}
        ListFooterComponent={error ? <ErrorBanner message={error} /> : null}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.titleGroup}>
                <Text style={styles.name}>{item.title}</Text>
                <Text style={styles.source}>{item.sourceSystem}</Text>
              </View>
              <StatusPill value={item.severity} />
            </View>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.meta}>
              {item.resolved ? 'Resolvido' : 'Aberto'} - {formatDateTime(item.createdAt)}
            </Text>
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
  titleGroup: {
    flex: 1
  },
  name: {
    color: '#f5f7fb',
    fontSize: 16,
    fontWeight: '800'
  },
  source: {
    color: '#ff7a90',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 3
  },
  message: {
    color: '#d6def2',
    fontSize: 15,
    lineHeight: 21,
    marginTop: 12
  },
  meta: {
    color: '#9aa6bc',
    fontSize: 13,
    marginTop: 8
  }
});
