import {
  IonContent,
  IonInput,
  IonPage,
  IonButton,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert';
import axios from 'axios';
import './Login.css';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { getLineLoginUrl } from '../../utils/lineAuth';
import { Purchases, LOG_LEVEL } from "@revenuecat/purchases-capacitor";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const history = useHistory();
  
  useEffect(() => {
      const userSession = localStorage.getItem('userSession');
      const token = localStorage.getItem('line_access_token');
      if (userSession || token) {
          history.replace('/home');
        } else {
          history.replace('/login');
      }
      (async () => {
        await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });
        await Purchases.configure({ apiKey: import.meta.env.VITE_API_KEY_PURCHASE });
        await Purchases.setSimulatesAskToBuyInSandbox({ simulatesAskToBuyInSandbox: true });
      });
  }, []);
  
  const handleLogin = async () => {
      const appUsername = email;
      const appPassword = password;
      
      try {
          const response = await axios.post('https://brunchtime.org/wp-json/simple-auth/v1/login', {
              login: appUsername,
              password: appPassword
          });

          if (response.status === 200) {
              localStorage.setItem('userData', JSON.stringify(response.data));
              
              if (response.data.token && response.data.user_id) {
                  localStorage.setItem('userId', response.data.user_id);
                  localStorage.setItem('user_display_name', response.data.user_display_name);
                  localStorage.setItem('userSession', response.data.token);

                  Swal({
                      title: 'เข้าสู่ระบบสำเร็จ',
                      text: 'คุณเข้าสู่ระบบเรียบร้อยแล้ว!',
                      icon: 'success',
                  }).then(() => {
                     window.location.replace('/home');
                      history.replace('/home');
                  });
              }
          }
      } catch (error) {
          console.error("Login error:", error);
          Swal({
              title: 'เข้าสู่ระบบล้มเหลว',
              text: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง!',
              icon: 'error',
          });
      }
  };

  const handleLineLogin = () => {
      try {
          const loginUrl = getLineLoginUrl();
          window.location.href = loginUrl;
      } catch (err) {
          Swal({
              title: 'เข้าสู่ระบบล้มเหลว',
              text: 'Please check environment configuration!',
              icon: 'error',
          });
          console.error('LINE login error:', err);
      }
  };

  const handleForgetPassword = () => {
      history.push('/forget');
  }
  
  const handleGuestLogin = () => {
      Swal({
          title: 'เข้าสู่ระบบสำเร็จ',
          text: 'คุณเข้าสู่ระบบเรียบร้อยแล้ว!',
          icon: 'success',
      }).then(() => {
          localStorage.setItem('userSession', 'guest');
          localStorage.setItem('user_display_name', 'Guest');
          localStorage.setItem('userId', 'none');
          window.location.replace('/home');
          history.replace('/home');
      });
  };

  const handleRegisterClick = () => {
      history.push('/register');
  };

  const handlePurchasePackage = async () => {
    const offerings = await Purchases.getOfferings();
    console.log(JSON.stringify(offerings));
  }

  return (
      <IonPage>
          <IonContent color={'main'}>
              <IonGrid>
                  <IonRow className='head-my-app'>
                      <IonCol size="12">
                          <img src="/icon/KJKJ_LOGO.png" alt="logo"></img>
                      </IonCol>
                  </IonRow>
                  <IonRow>
                      <IonInput
                          className="form_login"
                          placeholder="Email or Username"
                          type="text"
                          value={email}
                          onIonInput={(e) => setEmail(e.detail.value!)}
                          autocomplete="off"
                      ></IonInput>
                  </IonRow>
                  <IonRow className="ion-padding-top password-input-container">
                      <IonInput
                          type={showPassword ? "text" : "password"}
                          className="form_login"
                          placeholder="Password"
                          value={password}
                          onIonInput={(e) => setPassword(e.detail.value!)}
                          autocomplete="off"
                      ></IonInput>
                      <IonIcon
                          icon={showPassword ? eyeOutline : eyeOffOutline}
                          className="password-toggle-icon"
                          onClick={() => setShowPassword(!showPassword)}
                      />
                  </IonRow>
                  <IonRow className="ion-padding-top">
                      <IonCol>
                          <IonText className="ion-float-left">
                              <input type="checkbox" value={'save'} name="rememberMe" />
                              <label> Remember me</label>
                          </IonText>
                      </IonCol>
                      <IonCol>
                          <IonText className="ion-float-right" onClick={handleForgetPassword}>
                              Forget Password?
                          </IonText>
                      </IonCol>
                  </IonRow>
                  <IonRow className='ion-padding-top'>
                      <IonCol>
                          <IonButton
                              className="form_submit"
                              expand="block"
                              color={'submit'}
                              onClick={handleLogin}
                          >
                              SIGN IN
                          </IonButton>
                      </IonCol>
                  </IonRow>
                  <IonRow className='ion-padding-top'>
                      <IonCol size="12">
                          <IonButton
                              expand="block"
                              color="light"
                              shape="round"
                              fill="outline"
                              onClick={handleGuestLogin}
                          >
                              <b>JOIN AS GUEST</b>
                          </IonButton>
                      </IonCol>
                  </IonRow>
                  <IonRow>
                      <IonCol size="12" className="footer">
                          <img src="/icon/logo_footer.png" alt="footer logo"></img>
                      </IonCol>
                  </IonRow>
                  <IonRow className="ion-padding-top">
                      <IonCol>
                          <div className="forgotpass">
                              Don't have an account?
                              <span className='link' onClick={handleRegisterClick}>Register</span>
                          </div>
                      </IonCol>
                  </IonRow>
                  <IonRow className="ion-padding-top">
                      <IonCol>
                          <div className="forgotpass">
                              Test Purchases
                              <span className='link' onClick={handleRegisterClick}>APp Purchase</span>
                          </div>
                      </IonCol>
                  </IonRow>
              </IonGrid>
          </IonContent>
      </IonPage>
  );
};

export default Login;