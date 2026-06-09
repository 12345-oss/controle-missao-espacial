import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import { ErrorBanner } from '../components/ErrorBanner';
import { AppNavigation } from '../navigation/types';
import { api } from '../services/api';

type Props = {
  navigation: AppNavigation;
};

const statusOptions = ['NORMAL', 'ATTENTION', 'CRITICAL'];

export function NewSensorScreen({ navigation }: Props) {
  const [form, setForm] = useState({
    name: 'Thermal Core D4',
    sensorType: 'Temperature',
    moduleName: 'Computational Module D',
    location: 'Engine Bay',
    reading: '82.6',
    unit: 'C',
    status: 'NORMAL'
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const update = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = async () => {
    setError('');

    if (!form.name || !form.sensorType || !form.moduleName || !form.location || !form.reading || !form.unit) {
      setError('Preencha todos os campos antes de enviar.');
      return;
    }

    const reading = Number(form.reading.replace(',', '.'));

    if (Number.isNaN(reading)) {
      setError('A leitura precisa ser um numero valido.');
      return;
    }

    setSaving(true);

    try {
      await api.post('/sensors', {
        ...form,
        reading
      });
      navigation.goBack();
    } catch {
      setError('Nao foi possivel salvar. Confira a conexao com o backend.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboard}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View>
            <Text style={styles.title}>Cadastrar leitura</Text>
            <Text style={styles.subtitle}>Requisicao POST para /api/sensors</Text>
          </View>

          {error ? <ErrorBanner message={error} /> : null}

          <Field label="Nome do sensor" value={form.name} onChangeText={(value) => update('name', value)} />
          <Field label="Tipo" value={form.sensorType} onChangeText={(value) => update('sensorType', value)} />
          <Field label="Modulo computacional" value={form.moduleName} onChangeText={(value) => update('moduleName', value)} />
          <Field label="Localizacao" value={form.location} onChangeText={(value) => update('location', value)} />
          <Field
            label="Leitura"
            value={form.reading}
            onChangeText={(value) => update('reading', value)}
            keyboardType="decimal-pad"
          />
          <Field label="Unidade" value={form.unit} onChangeText={(value) => update('unit', value)} />

          <View style={styles.statusGroup}>
            <Text style={styles.label}>Status</Text>
            <View style={styles.statusOptions}>
              {statusOptions.map((option) => {
                const selected = form.status === option;
                return (
                  <Pressable
                    key={option}
                    style={[styles.statusOption, selected && styles.statusOptionSelected]}
                    onPress={() => update('status', option)}
                  >
                    <Text style={[styles.statusText, selected && styles.statusTextSelected]}>{option}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <Pressable style={({ pressed }) => [styles.submit, pressed && styles.pressed]} onPress={submit} disabled={saving}>
            <Text style={styles.submitText}>{saving ? 'Enviando...' : 'Enviar leitura'}</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: 'default' | 'decimal-pad';
};

function Field({ label, value, onChangeText, keyboardType = 'default' }: FieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholderTextColor="#667085"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#10131a',
    flex: 1
  },
  keyboard: {
    flex: 1
  },
  container: {
    gap: 14,
    padding: 18,
    paddingBottom: 34
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
  field: {
    gap: 7
  },
  label: {
    color: '#d6def2',
    fontSize: 13,
    fontWeight: '800'
  },
  input: {
    backgroundColor: '#191e29',
    borderColor: '#252d3b',
    borderRadius: 8,
    borderWidth: 1,
    color: '#f5f7fb',
    fontSize: 16,
    minHeight: 48,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  statusGroup: {
    gap: 8
  },
  statusOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  statusOption: {
    backgroundColor: '#191e29',
    borderColor: '#252d3b',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  statusOptionSelected: {
    backgroundColor: '#123f35',
    borderColor: '#65d6ad'
  },
  statusText: {
    color: '#9aa6bc',
    fontSize: 12,
    fontWeight: '900'
  },
  statusTextSelected: {
    color: '#71f2c4'
  },
  submit: {
    alignItems: 'center',
    backgroundColor: '#65d6ad',
    borderRadius: 8,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    minHeight: 52,
    marginTop: 4
  },
  pressed: {
    opacity: 0.78
  },
  submitText: {
    color: '#10131a',
    fontSize: 16,
    fontWeight: '900'
  }
});
