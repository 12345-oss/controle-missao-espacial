import axios from 'axios';
import { Platform } from 'react-native';

const runtime = globalThis as typeof globalThis & {
  process?: { env?: Record<string, string | undefined> };
};

const localApiUrl =
  Platform.OS === 'android' ? 'http://10.0.2.2:8080/api' : 'http://localhost:8080/api';

export const API_BASE_URL = runtime.process?.env?.EXPO_PUBLIC_API_URL ?? localApiUrl;

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000
});
