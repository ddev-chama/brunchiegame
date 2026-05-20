/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Bearer token สำหรับเรียก POST /custom/v1/check-user */
  readonly VITE_WP_CHECK_USER_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
