export type RootStackParamList = {
  Dashboard: undefined;
  Sensors: undefined;
  NewSensor: undefined;
  Systems: undefined;
  Events: undefined;
  Alerts: undefined;
};

export type ScreenName = keyof RootStackParamList;

export type AppNavigation = {
  navigate: (screen: ScreenName) => void;
  goBack: () => void;
};
