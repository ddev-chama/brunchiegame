import axios from 'axios';
import { CHECK_USER_URL } from '../config/customAuthApi';

export interface CheckUserData {
  username_exists: boolean;
  email?: string;
  reset_password_link?: string;
}

export interface CheckUserResponse {
  success: boolean;
  data?: CheckUserData;
  code?: string;
  message?: string;
}

/** ตรวจสอบว่ามี username ในระบบหรือไม่ (Bearer token — หลีกเลี่ยง CORS กับ custom header) */
export async function checkUserExists(username: string): Promise<CheckUserResponse> {
  console.log('[checkUser] ตรวจสอบ username:', username);

  const token = import.meta.env.VITE_WP_CHECK_USER_KEY;
  if (!token || typeof token !== 'string' || !token.trim()) {
    console.error('[checkUser] ไม่พบ VITE_WP_CHECK_USER_KEY — ตั้งค่าใน .env แล้วรีสตาร์ท dev server');
    const err = new Error('MISSING_VITE_WP_CHECK_USER_KEY');
    throw err;
  }

  const { data } = await axios.post<CheckUserResponse>(
    CHECK_USER_URL,
    { username },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log('[checkUser] ผลลัพธ์:', data);
  return data;
}

/** ซ่อนส่วนหนึ่งของอีเมลก่อนแสดงผล */
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain || !local) return email;
  const visible = local.slice(0, Math.min(2, local.length));
  return `${visible}***@${domain}`;
}
