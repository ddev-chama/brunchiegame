import axios from 'axios';
import { CHECK_USER_URL, CUSTOM_AUTH_API } from '../config/customAuthApi';

export interface CheckUserData {
  username_exists: boolean;
  email?: string;
}

export interface CheckUserResponse {
  success: boolean;
  data?: CheckUserData;
  code?: string;
  message?: string;
}

/** ตรวจสอบว่ามี username ในระบบหรือไม่ */
export async function checkUserExists(username: string): Promise<CheckUserResponse> {
  console.log('[checkUser] ตรวจสอบ username:', username);

  const { data } = await axios.post<CheckUserResponse>(
    CHECK_USER_URL,
    { username },
    {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': CUSTOM_AUTH_API.API_KEY,
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
