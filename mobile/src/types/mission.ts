export type SensorModule = {
  id: number;
  name: string;
  sensorType: string;
  moduleName: string;
  location: string;
  reading: number;
  unit: string;
  status: string;
  recordedAt: string;
};

export type MonitoredSystem = {
  id: number;
  name: string;
  category: string;
  operationalStatus: string;
  telemetry: string;
  responsibleModule: string;
  updatedAt: string;
};

export type OperationalEvent = {
  id: number;
  title: string;
  description: string;
  eventType: string;
  missionPhase: string;
  severity: string;
  occurredAt: string;
};

export type MissionAlert = {
  id: number;
  title: string;
  message: string;
  severity: string;
  sourceSystem: string;
  resolved: boolean;
  createdAt: string;
};

export type MissionStatus = {
  missionName: string;
  overallStatus: string;
  sensorCount: number;
  systemCount: number;
  eventCount: number;
  criticalAlertCount: number;
  latestSensors: SensorModule[];
  lastUpdated: string;
};
