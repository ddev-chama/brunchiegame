import React, { useState } from 'react';
import {
  IonContent,
  IonInput,
  IonPage,
  IonButton,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonNote,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert';
import axios, { AxiosError } from 'axios';
import './Register.css';

/** แปลง error จาก API เป็นข้อความแจ้งเตือนภาษาไทย */
function getRegisterErrorMessage(error: unknown): string {
  const fallback = 'มีปัญหาในการลงทะเบียน กรุณาลองอีกครั้ง';
  if (!axios.isAxiosError(error)) return fallback;
  const err = error as AxiosError<{ message?: string; code?: string; data?: { message?: string } }>;
  const data = err.response?.data;
  const msg = typeof data?.message === 'string' ? data.message : data?.data?.message;
  const code = data?.code ?? '';
  const status = err.response?.status;

  if (msg) {
    const lower = msg.toLowerCase();
    if (lower.includes('already') && (lower.includes('user') || lower.includes('username') || lower.includes('exist'))) {
      return 'ชื่อผู้ใช้ (Username) นี้ถูกใช้ไปแล้ว กรุณาเลือกชื่ออื่น';
    }
    if (lower.includes('already') && (lower.includes('email') || lower.includes('mail'))) {
      return 'อีเมลนี้ถูกใช้ลงทะเบียนไปแล้ว กรุณาใช้อีเมลอื่น';
    }
    if (lower.includes('invalid') || lower.includes('format') || lower.includes('not valid')) {
      return 'รูปแบบข้อมูลไม่ถูกต้อง: ' + msg;
    }
    if (msg.length <= 120) return msg;
  }

  switch (code) {
    case 'username_exists':
    case 'existing_user_login':
      return 'ชื่อผู้ใช้ (Username) นี้ถูกใช้ไปแล้ว กรุณาเลือกชื่ออื่น';
    case 'email_exists':
    case 'existing_user_email':
      return 'อีเมลนี้ถูกใช้ลงทะเบียนไปแล้ว กรุณาใช้อีเมลอื่น';
    case 'invalid_username':
      return 'รูปแบบ Username ไม่ถูกต้อง ใช้ได้เฉพาะภาษาอังกฤษ ตัวเลข และ _ . -';
    case 'invalid_email':
      return 'รูปแบบอีเมลไม่ถูกต้อง (เช่น name@example.com)';
    default:
      break;
  }

  if (status === 400) return 'ข้อมูลที่กรอกไม่ถูกต้อง (รูปแบบหรือค่าซ้ำ) กรุณาตรวจสอบอีกครั้ง';
  if (status === 409) return 'ชื่อผู้ใช้หรืออีเมลนี้ถูกใช้แล้ว กรุณาเปลี่ยนใหม่';
  return fallback;
}

/* กฎการกรอกฟอร์มลงทะเบียน */
const REG = {
  USERNAME_MIN: 3,
  USERNAME_MAX: 60,
  PASSWORD_MIN: 6,
  PASSWORD_MAX: 100,
  NAME_MAX: 100,
  EMAIL_MAX: 254,
} as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const history = useHistory();

  const validate = (): string | null => {
    const t = name.trim();
    if (!t) {
      return 'กรุณากรอกชื่อ (ไม่เว้นว่าง)';
    }
    if (t.length > REG.NAME_MAX) {
      return `ชื่อต้องไม่เกิน ${REG.NAME_MAX} ตัวอักษร`;
    }
    const e = email.trim();
    if (!e) {
      return 'กรุณากรอกอีเมล';
    }
    if (e.length > REG.EMAIL_MAX) {
      return `อีเมลต้องไม่เกิน ${REG.EMAIL_MAX} ตัวอักษร`;
    }
    if (!EMAIL_REGEX.test(e)) {
      return 'กรุณากรอกอีเมลให้ถูกต้อง (เช่น name@example.com)';
    }
    const u = username.trim();
    if (!u) {
      return 'กรุณากรอก Username (ไม่เว้นว่าง)';
    }
    if (u.length < REG.USERNAME_MIN) {
      return `Username ต้องมีอย่างน้อย ${REG.USERNAME_MIN} ตัวอักษร`;
    }
    if (u.length > REG.USERNAME_MAX) {
      return `Username ต้องไม่เกิน ${REG.USERNAME_MAX} ตัวอักษร`;
    }
    if (!/^[a-zA-Z0-9_.-]+$/.test(u)) {
      return 'Username ใช้ได้เฉพาะ ภาษาอังกฤษ ตัวเลข และ _ . - (ไม่มีช่องว่าง)';
    }
    if (password.length < REG.PASSWORD_MIN) {
      return `รหัสผ่านต้องมีอย่างน้อย ${REG.PASSWORD_MIN} ตัวอักษร (พิมพ์ใหญ่/เล็ก/ตัวเลข ได้)`;
    }
    if (password.length > REG.PASSWORD_MAX) {
      return `รหัสผ่านต้องไม่เกิน ${REG.PASSWORD_MAX} ตัวอักษร`;
    }
    if (password !== confirmPassword) {
      return 'รหัสผ่านกับยืนยันรหัสผ่านต้องตรงกัน';
    }
    return null;
  };

  const handleRegister = async () => {
    const err = validate();
    if (err) {
      Swal({
        title: 'กรุณาตรวจสอบข้อมูล',
        text: err,
        icon: 'error',
      });
      return;
    }

    try {
      const response = await axios.post(
        'https://brunchtime.org/wp-json/api/v1/mo-jwt-register',
        {
          apikey: 'JtYErGaibBfagjGyiYQUZlVEVVWjHiuq',
          username: username.trim(),
          password,
        }
      );

      if (response.status === 200) {
        Swal({
          title: 'ลงทะเบียนสำเร็จ',
          text: 'คุณได้ลงทะเบียนเรียบร้อยแล้ว!',
          icon: 'success',
        }).then(() => {
          window.location.replace('/');
        });
      }
    } catch (error) {
      console.error('[Register] API error:', error);
      const message = getRegisterErrorMessage(error);
      Swal({
        title: 'การลงทะเบียนล้มเหลว',
        text: message,
        icon: 'error',
      });
    }
  };

  return (
    <IonPage>
      <IonContent color="main">
        <IonGrid className="register-grid">
          <IonRow>
            <IonCol size="12">
              <IonImg src="/icon/KJKJ_LOGO.png" alt="Logo" />
            </IonCol>
          </IonRow>

          <IonRow className="register-info-row">
            <IonCol size="12">
              <div className="register-info-box">
                <strong>วิธีกรอกข้อมูล</strong>
                <ul>
                  <li><strong>ชื่อ:</strong> ภาษาไทยหรืออังกฤษ ไม่เกิน {REG.NAME_MAX} ตัว</li>
                  <li><strong>อีเมล:</strong> ที่อยู่อีเมลที่ใช้ติดต่อ (รูปแบบ name@domain.com)</li>
                  <li><strong>Username:</strong> ภาษาอังกฤษหรือตัวเลข เท่านั้น (ไม่มีช่องว่าง) {REG.USERNAME_MIN}-{REG.USERNAME_MAX} ตัว</li>
                  <li><strong>รหัสผ่าน:</strong> อย่างน้อย {REG.PASSWORD_MIN} ตัว (พิมพ์ใหญ่/เล็ก/ตัวเลข ได้)</li>
                  <li><strong>ยืนยันรหัสผ่าน:</strong> ต้องตรงกับรหัสผ่านด้านบน</li>
                </ul>
              </div>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <IonInput
                className="form_login"
                placeholder="Name (ชื่อ)"
                value={name}
                onIonInput={(e) => setName(e.detail.value ?? '')}
                autocomplete="name"
              />
              <IonNote className="field-hint">ชื่อที่ต้องการแสดง ไม่เกิน {REG.NAME_MAX} ตัวอักษร</IonNote>
            </IonCol>
          </IonRow>
          <IonRow className="ion-padding-top">
            <IonCol size="12">
              <IonInput
                className="form_login"
                type="email"
                inputMode="email"
                placeholder="Email (อีเมล)"
                value={email}
                onIonInput={(e) => setEmail(e.detail.value ?? '')}
                autocomplete="email"
              />
              <IonNote className="field-hint">ที่อยู่อีเมลที่ใช้ติดต่อ (เช่น name@example.com)</IonNote>
            </IonCol>
          </IonRow>
          <IonRow className="ion-padding-top">
            <IonCol size="12">
              <IonInput
                className="form_login"
                placeholder="Username"
                value={username}
                onIonInput={(e) => setUsername(e.detail.value ?? '')}
                autocomplete="username"
              />
              <IonNote className="field-hint">ภาษาอังกฤษหรือตัวเลข เท่านั้น (ไม่มีช่องว่าง) {REG.USERNAME_MIN}-{REG.USERNAME_MAX} ตัว</IonNote>
            </IonCol>
          </IonRow>
          <IonRow className="ion-padding-top">
            <IonCol size="12">
              <IonInput
                type="password"
                className="form_login"
                placeholder="Password (รหัสผ่าน)"
                value={password}
                onIonInput={(e) => setPassword(e.detail.value ?? '')}
                autocomplete="new-password"
              />
              <IonNote className="field-hint">อย่างน้อย {REG.PASSWORD_MIN} ตัวอักษร พิมพ์ใหญ่/เล็ก/ตัวเลข ได้</IonNote>
            </IonCol>
          </IonRow>
          <IonRow className="ion-padding-top">
            <IonCol size="12">
              <IonInput
                type="password"
                className="form_login"
                placeholder="Confirm Password (ยืนยันรหัสผ่าน)"
                value={confirmPassword}
                onIonInput={(e) => setConfirmPassword(e.detail.value ?? '')}
                autocomplete="new-password"
              />
              <IonNote className={`field-hint ${confirmPassword ? (password === confirmPassword ? 'field-hint--match' : 'field-hint--mismatch') : ''}`}>
                {confirmPassword ? (password === confirmPassword ? '✓ รหัสผ่านตรงกัน' : '✗ รหัสผ่านไม่ตรงกัน') : 'กรอกให้ตรงกับรหัสผ่านด้านบน'}
              </IonNote>
            </IonCol>
          </IonRow>
          <IonRow className="ion-padding-top">
            <IonCol size="12">
              <IonButton
                className="form_submit"
                expand="block"
                color="submit"
                shape="round"
                onClick={handleRegister}
              >
                REGISTER
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonText>
                Already have an account? <span className="link" onClick={() => history.push('/login')}>Login</span>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
