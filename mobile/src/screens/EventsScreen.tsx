import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { EmptyState } from '../components/EmptyState';
import { ErrorBanner } from '../components/ErrorBanner';
import { StatusPill } from '../components/StatusPill';
import { api } from '../services/api';
import { OperationalEvent } from '../types/mission';
import { formatDateTime } from '../utils/date';

export function EventsScreen() {
  const [events, setEvents] = useState<OperationalEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.get<OperationalEvent[]>('/events');
      setEvents(response.data);
    } catch {
      setError('Nao foi possivel carregar os eventos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        contentContainerStyle={styles.container}
        data={events}
        keyExtractor={(item) => String(item.id)}
        refreshing={loading}
        onRefresh={loadEvents}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Registros operacionais</Text>
            <Text style={styles.subtitle}>Historico de eventos da operacao</Text>
          </View>
        }
        ListEmptyComponent={!loading ? <EmptyState message="Nenhum evento registrado." /> : null}
        ListFooterComponent={error ? <ErrorBanner message={error} /> : null}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.titleGroup}>
                <Text style={styles.name}>{item.title}</Text>
                <Text style={styles.phase}>{item.eventType} - {item.missionPhase}</Text>
              </View>
              <StatusPill value={item.severity} />
            </View>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.meta}>{formatDateTime(item.occurredAt)}</Text>
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
  phase: {
    color: '#b69cff',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 3
  },
  description: {
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
