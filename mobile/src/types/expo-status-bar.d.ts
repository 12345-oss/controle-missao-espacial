declare module 'expo-status-bar' {
  import type { ComponentType } from 'react';

  export type StatusBarStyle = 'auto' | 'inverted' | 'light' | 'dark';

  export type StatusBarProps = {
    style?: StatusBarStyle;
    hidden?: boolean;
    animated?: boolean;
    backgroundColor?: string;
    translucent?: boolean;
  };

  export const StatusBar: ComponentType<StatusBarProps>;
}
