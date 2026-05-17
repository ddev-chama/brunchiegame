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
  } from '@ionic/react';
  import React, { useEffect, useState } from 'react';
  import { useHistory } from 'react-router-dom';
  import Swal from 'sweetalert';
  import axios from 'axios';
  import './Login.css';

  const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const history = useHistory();
    
    useEffect(() => {
      const userSession = localStorage.getItem('userSession');
      if (userSession) {
        history.push('/home');
      } else {
        history.push('/login');
      }
    }, [history]);
    
  const handleLogin = async () => {
    
    const appUsername = email; // Assuming email is used as username
    const appPassword = password; // Use the application password here
    
    try {
      // const response = await axios.post('/api/mo-jwt', {
      const response = await axios.post('https://brunchtime.org/wp-json/api/v1/mo-jwt', {
        apikey: 'VjcvgYEbgJWiVHvoyIjwbnfiwypawNog',
        username: appUsername,
        password: appPassword
      });

      // Successful login logic
      if (response.status === 200) {
        localStorage.setItem('userSession', JSON.stringify({ username: appUsername })); // Save username or other data
        Swal({
          title: 'เข้าสู่ระบบสำเร็จ',
          text: 'คุณเข้าสู่ระบบเรียบร้อยแล้ว!',
          icon: 'success',
          className: 'swal-login-success',
          buttons: {
            cancel: { visible: false },
            confirm: { text: 'ตกลง', className: 'swal-btn-confirm' },
          },
        }).then(() => {
          history.replace('/home'); // Navigate to home page
          window.location.replace('/');
        });
      }
    }
    catch (error) {
      // Handle login failure
      console.error("Login error:", error);
      Swal({
        title: 'เข้าสู่ระบบล้มเหลว',
        text: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง!',
        icon: 'error',
        className: 'swal-login-error',
        buttons: {
          cancel: { visible: false },
          confirm: { text: 'ลองอีกครั้ง', className: 'swal-btn-confirm' },
        },
      });
    }
  };

  const handleGuestLogin = () => {
    Swal({
      title: 'เข้าสู่ระบบสำเร็จ',
      text: 'คุณเข้าสู่ระบบเรียบร้อยแล้ว!',
      icon: 'success',
      className: 'swal-login-success',
      buttons: {
        cancel: { visible: false },
        confirm: { text: 'ตกลง', className: 'swal-btn-confirm' },
      },
    }).then(() => {
      localStorage.setItem('userSession', 'guest'); // Set session for guest
      history.push('/home'); // Redirect to home
      window.location.replace('/');
    });
  };
  const handleRegisterClick = () => {
    history.push('/register');
  };

  const handleForgotPasswordClick = () => {
    console.log('[Login] ไปหน้าลืมรหัสผ่าน');
    history.push('/forgot-password');
  };
    return (
      <IonPage>
        <IonContent color={'main'}>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonImg src="/icon/KJKJ_LOGO.png"></IonImg>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonInput
                className="form_login"
                placeholder="อีเมล (Email)"
                value={email}
                onIonInput={(e) => setEmail(e.detail.value!)}
                autocomplete="off"
              ></IonInput>
            </IonRow>
            <IonRow className="ion-padding-top">
              <IonInput
                type="password"
                className="form_login"
                placeholder="รหัสผ่าน (Password)"
                value={password}
                onIonInput={(e) => setPassword(e.detail.value!)}
                autocomplete="off"
              ></IonInput>
            </IonRow>
            <IonRow className="ion-padding-top">
              <IonCol>
                <IonText className="ion-float-left">
                  <input type="checkbox" value={'save'} name="rememberMe" />
                  <label> จดจำฉัน</label>
                </IonText>
              </IonCol>
              <IonCol>
                <IonText className="ion-float-right">
                  <span className="forgot-password-link" onClick={handleForgotPasswordClick}>
                    ลืมรหัสผ่าน?
                  </span>
                </IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton
                  className="form_submit"
                  expand="block"
                  color="submit"
                  shape="round"
                  onClick={handleLogin}
                >
                  เข้าสู่ระบบ
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonButton
                  expand="block"
                  color="light"
                  shape="round"
                  fill="outline"
                  onClick={handleGuestLogin} // Use handleGuestLogin
                >
                  <b>เข้าแบบผู้เยี่ยมชม</b>
                </IonButton>
              </IonCol>
            </IonRow>
            
            {/* <IonRow>
              <IonCol className="sub_login">
                <IonImg className="sub_login" src="/icon/line.png"></IonImg>
                <IonImg className="sub_login" src="/icon/facebook.png"></IonImg>
              </IonCol>
            </IonRow> */}
            <IonRow>
              <IonCol size="12">
                <IonImg className="footer" src="/icon/logo_footer.png"></IonImg>
              </IonCol>
            </IonRow>
            <IonRow className="ion-padding-top">
              <IonCol>
                <div className="forgotpass">
                  ยังไม่มีบัญชี? <span className="link" onClick={handleRegisterClick}>ลงทะเบียน</span>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Login;
  