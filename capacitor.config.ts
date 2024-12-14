import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.brunchiegame',
  appName: 'ค้นใจค้นจอย Break the ice quiz',
  webDir: 'dist',
  "plugins": {
    "Purchases": {
      "apiKey": "your_api_key",
      "appUserId": "your_app_user_id",
      "simulatesAskToBuyInSandbox": true
    }
  }
};

export default config;
