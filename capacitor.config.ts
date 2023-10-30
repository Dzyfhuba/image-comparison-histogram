import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.hafidzubaidillah.imageryapi',
  appName: 'ImageryAPI',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
