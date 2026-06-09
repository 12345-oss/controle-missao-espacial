import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ActionTile } from '../components/ActionTile';
import { EmptyState } from '../components/EmptyState';
import { ErrorBanner } from '../components/ErrorBanner';
import { StatusPill } from '../components/StatusPill';
import { AppNavigation } from '../navigation/types';
import { api } from '../services/api';
import { MissionStatus } from '../types/mission';
import { formatDateTime } from '../utils/date';

type Props = {
  navigation: AppNavigation;
};

export function DashboardScreen({ navigation }: Props) {
  const [status, setStatus] = useState<MissionStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadStatus = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.get<MissionStatus>('/mission/status');
      setStatus(response.data);
    } catch {
      setError('Nao foi possivel carregar a API. Confira se o backend esta rodando na porta 8080.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStatus();
  }, [loadStatus]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadStatus} tintColor="#ffffff" />}
      >
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.eyebrow}>Controle integrado</Text>
            <Text style={styles.title}>{status?.missionName ?? 'Orion Deep Space Mission'}</Text>
          </View>
          <StatusPill value={status?.overallStatus ?? 'NOMINAL'} />
        </View>

        {error ? <ErrorBanner message={error} /> : null}

        <View style={styles.statsGrid}>
          <Metric label="Sensores" value={status?.sensorCount ?? 0} />
          <Metric label="Sistemas" value={status?.systemCount ?? 0} />
          <Metric label="Eventos" value={status?.eventCount ?? 0} />
          <Metric label="Alertas criticos" value={status?.criticalAlertCount ?? 0} />
        </View>

        <View style={styles.actions}>
          <ActionTile
            icon="SN"
            label="Sensores"
            detail="Leituras e modulos computacionais"
            accent="#65d6ad"
            onPress={() => navigation.navigate('Sensors')}
          />
          <ActionTile
            icon="+"
            label="Cadastrar leitura"
            detail="Enviar POST para o backend"
            accent="#7aa2ff"
            onPress={() => navigation.navigate('NewSensor')}
          />
          <ActionTile
            icon="SY"
            label="Sistemas"
            detail="Status dos sistemas monitorados"
            accent="#ffd166"
            onPress={() => navigation.navigate('Systems')}
          />
          <ActionTile
            icon="AL"
            label="Alertas"
            detail="Alertas operacionais abertos"
            accent="#ff7a90"
            onPress={() => navigation.navigate('Alerts')}
          />
          <ActionTile
            icon="EV"
            label="Eventos"
            detail="Registros operacionais da missao"
            accent="#b69cff"
            onPress={() => navigation.navigate('Events')}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ultimas leituras</Text>
          {status?.lastUpdated ? <Text style={styles.updated}>{formatDateTime(status.lastUpdated)}</Text> : null}
        </View>

        {status?.latestSensors?.length ? (
          <View style={styles.sensorList}>
            {status.latestSensors.map((sensor) => (
              <View key={sensor.id} style={styles.sensorCard}>
                <View style={styles.sensorTop}>
                  <Text style={styles.sensorName}>{sensor.name}</Text>
                  <StatusPill value={sensor.status} />
                </View>
                <Text style={styles.sensorReading}>
                  {sensor.reading} {sensor.unit}
                </Text>
                <Text style={styles.sensorMeta}>{sensor.moduleName} - {sensor.location}</Text>
              </View>
            ))}
          </View>
        ) : (
          <EmptyState message="Nenhuma leitura recebida ainda." />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

type MetricProps = {
  label: string;
  value: number;
};

function Metric({ label, value }: MetricProps) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#10131a',
    flex: 1
  },
  container: {
    gap: 18,
    padding: 18,
    paddingBottom: 32
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between'
  },
  headerText: {
    flex: 1
  },
  eyebrow: {
    color: '#8b95a7',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
    textTransform: 'uppercase'
  },
  title: {
    color: '#f5f7fb',
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  metric: {
    backgroundColor: '#191e29',
    borderColor: '#252d3b',
    borderRadius: 8,
    borderWidth: 1,
    flexBasis: '47%',
    flexGrow: 1,
    padding: 14
  },
  metricValue: {
    color: '#f5f7fb',
    fontSize: 26,
    fontWeight: '900'
  },
  metricLabel: {
    color: '#9aa6bc',
    fontSize: 13,
    marginTop: 4
  },
  actions: {
    gap: 10
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sectionTitle: {
    color: '#f5f7fb',
    fontSize: 18,
    fontWeight: '900'
  },
  updated: {
    color: '#8b95a7',
    fontSize: 12
  },
  sensorList: {
    gap: 10
  },
  sensorCard: {
    backgroundColor: '#191e29',
    borderColor: '#252d3b',
    borderRadius: 8,
    borderWidth: 1,
    padding: 14
  },
  sensorTop: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between'
  },
  sensorName: {
    color: '#f5f7fb',
    flex: 1,
    fontSize: 16,
    fontWeight: '800'
  },
  sensorReading: {
    color: '#65d6ad',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 10
  },
  sensorMeta: {
    color: '#9aa6bc',
    fontSize: 13,
    marginTop: 4
  }
});
