/** Custom Auth API (brunchtime.org) */
export const CUSTOM_AUTH_API = {
  BASE_URL: 'https://brunchtime.org/wp-json/custom/v1',
  API_KEY: 'uca_sk_aff4f9f1ef0d8cba93f1573c702e8d8ae794f1d538babc71fb386b4aea81e5a5',
} as const;

/** ใช้ proxy ใน dev เพื่อหลีกเลี่ยงปัญหา CORS กับ header X-API-Key */
export const CHECK_USER_URL = import.meta.env.DEV
  ? '/custom-api/check-user'
  : `${CUSTOM_AUTH_API.BASE_URL}/check-user`;
