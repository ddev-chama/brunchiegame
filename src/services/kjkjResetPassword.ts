import axios from 'axios';
import { KJKJ_RESET_PASSWORD_URL } from '../config/coreApi';

export interface KjkjResetPasswordPayload {
  email: string;
  reset_password_link: string;
}

export interface KjkjResetPasswordResponse {
  success?: boolean;
  sent: boolean;
  email?: string;
  message?: string;
  messageId?: string;
}

/** ส่งอีเมล reset password ผ่าน core-api (KJKJ template) */
export async function sendKjkjResetPasswordEmail(
  payload: KjkjResetPasswordPayload
): Promise<KjkjResetPasswordResponse> {
  console.log('[kjkjResetPassword] ส่งคำขอ reset email:', {
    email: payload.email,
    reset_password_link: payload.reset_password_link,
  });

  const { data } = await axios.post<KjkjResetPasswordResponse>(
    KJKJ_RESET_PASSWORD_URL,
    {
      email: payload.email,
      reset_password_link: payload.reset_password_link,
    },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  console.log('[kjkjResetPassword] ผลลัพธ์:', data);
  return data;
}
