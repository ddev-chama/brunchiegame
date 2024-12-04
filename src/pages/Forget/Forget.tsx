import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert';
import axios from 'axios';

const Forget: React.FC = () => {
  const [step, setStep] = useState(1); // Step 1: Email & Username, Step 2: New Password
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const history = useHistory();

  const handleVerifyUser = async () => {
    if (!email || !username) {
      Swal({
        title: 'กรุณากรอกข้อมูลให้ครบ',
        text: 'โปรดระบุอีเมลและชื่อผู้ใช้ของคุณ',
        icon: 'warning',
      });
      return;
    }

    try {
      // Add your verification logic here
      // e.g., check if email and username match in database
      
      // If verification successful, move to step 2
      setStep(2);
    } catch (error) {
      Swal({
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่พบข้อมูลผู้ใช้ กรุณาตรวจสอบข้อมูลอีกครั้ง',
        icon: 'error',
      });
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      Swal({
        title: 'กรุณากรอกรหัสผ่าน',
        text: 'โปรดกรอกรหัสผ่านใหม่และยืนยันรหัสผ่าน',
        icon: 'warning',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal({
        title: 'รหัสผ่านไม่ตรงกัน',
        text: 'กรุณากรอกรหัสผ่านให้ตรงกันทั้งสองช่อง',
        icon: 'warning',
      });
      return;
    }

    try {
      // Add your password reset logic here
      // e.g., update password in database
      const response = await axios.post('https://brunchtime.org/wp-json/simple-auth/v1/reset-password', {
        username: username,
        email: email,
        new_password: newPassword
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status !== 200) {
        throw new Error('Password reset failed');
      }
      
      Swal({
        title: 'เปลี่ยนรหัสผ่านสำเร็จ',
        text: 'คุณสามารถใช้รหัสผ่านใหม่ในการเข้าสู่ระบบได้',
        icon: 'success',
      }).then(() => {
        history.replace('/login');
      });
    } catch (error) {
      Swal({
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถเปลี่ยนรหัสผ่านได้ กรุณาลองใหม่อีกครั้ง',
        icon: 'error',
      });
    }
  };

  return (
    <IonPage>
      <IonContent color={'main'}>
        <IonGrid>
          <IonRow className='head-my-app'>
            <IonCol size="12">
              <img src="/icon/KJKJ_LOGO.png" alt="Logo" />
            </IonCol>
          </IonRow>
          
          <IonRow>
            <IonCol size="12" className="ion-text-center">
              <IonText>
                <h2>ลืมรหัสผ่าน?</h2>
                {step === 1 ? (
                  <p>กรุณากรอกอีเมลและชื่อผู้ใช้ของคุณเพื่อยืนยันตัวตน</p>
                ) : (
                  <p>กรุณากรอกรหัสผ่านใหม่ของคุณ</p>
                )}
              </IonText>
            </IonCol>
          </IonRow>

          {step === 1 ? (
            <>
              <IonRow className="ion-padding-top">
                <IonInput
                  type="email"
                  className="form_login"
                  placeholder="Email"
                  value={email}
                  onIonInput={e => setEmail(e.detail.value!)}
                  autocomplete="off"
                />
              </IonRow>

              <IonRow className="ion-padding-top">
                <IonInput
                  type="text"
                  className="form_login"
                  placeholder="Username"
                  value={username}
                  onIonInput={e => setUsername(e.detail.value!)}
                  autocomplete="off"
                />
              </IonRow>

              <IonRow className="ion-padding-top">
                <IonCol>
                  <IonButton
                    className="form_submit"
                    expand="block"
                    color={'submit'}
                    onClick={handleVerifyUser}
                  >
                    ยืนยันตัวตน
                  </IonButton>
                </IonCol>
              </IonRow>
            </>
          ) : (
            <>
              <IonRow className="ion-padding-top">
                <IonInput
                  type="password"
                  className="form_login"
                  placeholder="รหัสผ่านใหม่"
                  value={newPassword}
                  onIonInput={e => setNewPassword(e.detail.value!)}
                />
              </IonRow>

              <IonRow className="ion-padding-top">
                <IonInput
                  type="password"
                  className="form_login"
                  placeholder="ยืนยันรหัสผ่านใหม่"
                  value={confirmPassword}
                  onIonInput={e => setConfirmPassword(e.detail.value!)}
                />
              </IonRow>

              <IonRow className="ion-padding-top">
                <IonCol>
                  <IonButton
                    className="form_submit"
                    expand="block"
                    color={'submit'}
                    onClick={handleResetPassword}
                  >
                    เปลี่ยนรหัสผ่าน
                  </IonButton>
                </IonCol>
              </IonRow>
            </>
          )}

          <IonRow className="ion-padding-top">
            <IonCol size="12">
              <IonText>
                จำรหัสผ่านได้แล้ว? <span className='link' onClick={() => history.push('/login')}>เข้าสู่ระบบ</span>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Forget;