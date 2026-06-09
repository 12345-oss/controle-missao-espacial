import React, { useMemo, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { AlertsScreen } from './src/screens/AlertsScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { EventsScreen } from './src/screens/EventsScreen';
import { NewSensorScreen } from './src/screens/NewSensorScreen';
import { SensorsScreen } from './src/screens/SensorsScreen';
import { SystemsScreen } from './src/screens/SystemsScreen';
import { AppNavigation, ScreenName } from './src/navigation/types';

const titles: Record<ScreenName, string> = {
  Dashboard: 'Missao',
  Sensors: 'Sensores',
  NewSensor: 'Nova leitura',
  Systems: 'Sistemas',
  Events: 'Eventos',
  Alerts: 'Alertas'
};

export default function App() {
  const [screen, setScreen] = useState<ScreenName>('Dashboard');
  const [history, setHistory] = useState<ScreenName[]>([]);

  const navigation = useMemo<AppNavigation>(
    () => ({
      navigate: (nextScreen) => {
        setHistory((current) => [...current, screen]);
        setScreen(nextScreen);
      },
      goBack: () => {
        setHistory((current) => {
          const previous = current[current.length - 1] ?? 'Dashboard';
          setScreen(previous);
          return current.slice(0, -1);
        });
      }
    }),
    [screen]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.header}>
        {history.length > 0 ? (
          <Pressable style={styles.backButton} onPress={navigation.goBack}>
            <Text style={styles.backText}>{'<'}</Text>
          </Pressable>
        ) : (
          <View style={styles.backPlaceholder} />
        )}
        <Text style={styles.headerTitle}>{titles[screen]}</Text>
        <View style={styles.backPlaceholder} />
      </View>
      <View style={styles.content}>{renderScreen(screen, navigation)}</View>
    </SafeAreaView>
  );
}

function renderScreen(screen: ScreenName, navigation: AppNavigation) {
  switch (screen) {
    case 'Sensors':
      return <SensorsScreen navigation={navigation} />;
    case 'NewSensor':
      return <NewSensorScreen navigation={navigation} />;
    case 'Systems':
      return <SystemsScreen />;
    case 'Events':
      return <EventsScreen />;
    case 'Alerts':
      return <AlertsScreen />;
    case 'Dashboard':
    default:
      return <DashboardScreen navigation={navigation} />;
  }
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#10131a',
    flex: 1
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#10131a',
    borderBottomColor: '#252d3b',
    borderBottomWidth: 1,
    flexDirection: 'row',
    minHeight: 56,
    paddingHorizontal: 10
  },
  backButton: {
    alignItems: 'center',
    borderRadius: 8,
    height: 44,
    justifyContent: 'center',
    width: 44
  },
  backText: {
    color: '#f5f7fb',
    fontSize: 24,
    fontWeight: '900'
  },
  backPlaceholder: {
    height: 44,
    width: 44
  },
  headerTitle: {
    color: '#f5f7fb',
    flex: 1,
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center'
  },
  content: {
    flex: 1
  }
});
