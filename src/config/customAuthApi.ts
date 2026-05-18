/** Custom Auth API (brunchtime.org) */
export const CUSTOM_AUTH_API = {
  BASE_URL: 'https://brunchtime.org/wp-json/custom/v1',
  API_KEY: 'uca_sk_3cebc4513707d4f877a63ee77316091814efbe98ff4831a94b76b7b03b27d828',
} as const;

/** ใช้ proxy ใน dev เพื่อหลีกเลี่ยงปัญหา CORS กับ header X-API-Key */
export const CHECK_USER_URL = import.meta.env.DEV
  ? '/custom-api/check-user'
  : `${CUSTOM_AUTH_API.BASE_URL}/check-user`;
