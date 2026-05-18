import React, { useState } from 'react';
import {
  IonContent,
  IonInput,
  IonPage,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonNote,
  IonText,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert';
import axios from 'axios';
import { checkUserExists, maskEmail } from '../../services/checkUser';
import { sendKjkjResetPasswordEmail } from '../../services/kjkjResetPassword';
import './ForgotPassword.css';

const ForgotPassword: React.FC = () => {
  const [username, setUsername] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const history = useHistory();

  const validate = (): string | null => {
    const value = username.trim();
    if (!value) {
      return 'กรุณากรอกชื่อผู้ใช้ (Username)';
    }
    if (/\s/.test(value)) {
      return 'ชื่อผู้ใช้ต้องไม่มีช่องว่าง';
    }
    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) {
      Swal({ title: 'กรุณาตรวจสอบข้อมูล', text: err, icon: 'error' });
      return;
    }

    setSubmitting(true);
    const loginValue = username.trim();
    console.log('[ForgotPassword] เริ่มขั้นตอนลืมรหัสผ่าน:', loginValue);

    try {
      // 1) ตรวจสอบว่ามี user ในระบบ + ได้ email และ reset_password_link
      const checkResult = await checkUserExists(loginValue);
      const exists = checkResult.success && checkResult.data?.username_exists === true;

      if (!exists) {
        console.log('[ForgotPassword] ไม่พบผู้ใช้ในระบบ');
        Swal({
          title: 'ไม่พบบัญชีผู้ใช้',
          text: 'ไม่พบชื่อผู้ใช้ (Username) นี้ในระบบ กรุณาตรวจสอบและลองอีกครั้ง',
          icon: 'error',
          className: 'swal-forgot-error',
          buttons: {
            cancel: { visible: false },
            confirm: { text: 'ตกลง', className: 'swal-btn-confirm' },
          },
        });
        return;
      }

      const userEmail = checkResult.data?.email?.trim();
      const resetPasswordLink = checkResult.data?.reset_password_link?.trim();

      console.log('[ForgotPassword] พบผู้ใช้:', {
        email: userEmail ? maskEmail(userEmail) : '(ไม่มี)',
        hasResetLink: Boolean(resetPasswordLink),
      });

      if (!userEmail || !resetPasswordLink) {
        console.error('[ForgotPassword] ข้อมูลไม่ครบจาก check-user:', checkResult.data);
        Swal({
          title: 'ไม่สามารถดำเนินการได้',
          text: 'ระบบไม่สามารถสร้างลิงก์ตั้งรหัสผ่านได้ กรุณาลองอีกครั้งภายหลัง',
          icon: 'error',
        });
        return;
      }

      // 2) ส่งอีเมล reset password ผ่าน core-api
      const mailResult = await sendKjkjResetPasswordEmail({
        email: userEmail,
        reset_password_link: resetPasswordLink,
      });

      console.log('[ForgotPassword] ผลลัพธ์ส่งอีเมล core-api:', mailResult);

      if (mailResult.sent === true) {
        const emailHint = `เราได้ส่งลิงก์ตั้งรหัสผ่านใหม่ไปที่ ${maskEmail(userEmail)} แล้ว กรุณาตรวจสอบกล่องจดหมาย (รวมถึงโฟลเดอร์สแปม)`;

        Swal({
          title: 'ส่งอีเมลแล้ว',
          text: emailHint,
          icon: 'success',
          className: 'swal-forgot-success',
          buttons: {
            cancel: { visible: false },
            confirm: { text: 'กลับไปเข้าสู่ระบบ', className: 'swal-btn-confirm' },
          },
        }).then(() => history.push('/login'));
      } else {
        Swal({
          title: 'ไม่สามารถส่งอีเมลได้',
          text:
            mailResult.message ||
            'ไม่สามารถส่งอีเมลได้ในขณะนี้ กรุณาลองใหม่ภายหลังหรือติดต่อผู้ดูแลระบบ',
          icon: 'error',
          className: 'swal-forgot-error',
          buttons: {
            cancel: { visible: false },
            confirm: { text: 'ลองอีกครั้ง', className: 'swal-btn-confirm' },
          },
        });
      }
    } catch (error) {
      console.error('[ForgotPassword] เกิดข้อผิดพลาด:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        Swal({
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถยืนยันตัวตนกับเซิร์ฟเวอร์ได้ กรุณาติดต่อผู้ดูแลระบบ',
          icon: 'error',
        });
        return;
      }
      Swal({
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองอีกครั้ง',
        icon: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <IonPage>
      <IonContent color="main">
        <IonGrid className="forgot-grid">
          <IonRow>
            <IonCol size="12">
              <IonImg src="/icon/KJKJ_LOGO.png" alt="Logo" />
            </IonCol>
          </IonRow>

          <IonRow className="forgot-info-row">
            <IonCol size="12">
              <div className="forgot-info-box">
                <strong>ลืมรหัสผ่าน</strong>
                <p>
                  กรอกชื่อผู้ใช้ (Username) ที่ใช้ลงทะเบียน ระบบจะตรวจสอบบัญชีก่อน
                  แล้วส่งลิงก์ตั้งรหัสผ่านใหม่ไปที่อีเมลของคุณ
                </p>
              </div>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <IonInput
                className="form_login"
                type="text"
                placeholder="ชื่อผู้ใช้ (Username)"
                value={username}
                onIonInput={(e) => setUsername(e.detail.value ?? '')}
                autocomplete="username"
                disabled={submitting}
              />
              <IonNote className="field-hint">
                ใช้ Username ที่ลงทะเบียนไว้ (ภาษาอังกฤษ/ตัวเลข ไม่มีช่องว่าง)
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
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? 'กำลังตรวจสอบ...' : 'ส่งลิงก์ตั้งรหัสผ่านใหม่'}
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow className="ion-padding-top">
            <IonCol size="12">
              <IonText className="forgot-back">
                จำรหัสผ่านได้แล้ว?{' '}
                <span className="link" onClick={() => history.push('/login')}>
                  กลับไปเข้าสู่ระบบ
                </span>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;
