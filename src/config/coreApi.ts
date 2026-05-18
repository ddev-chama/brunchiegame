/** Core API (staging) สำหรับ KJKJ reset password email */
export const CORE_API = {
  BASE_URL: 'https://core-api.diamondgrains-staging.brunchtimeshop.com',
} as const;

export const KJKJ_RESET_PASSWORD_URL = import.meta.env.DEV
  ? '/core-api/api/auth/user/kjkj-reset-password'
  : `${CORE_API.BASE_URL}/api/auth/user/kjkj-reset-password`;
