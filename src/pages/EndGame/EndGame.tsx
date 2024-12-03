import React from 'react';
import {
  IonButton, IonCol, IonContent, IonGrid,
  IonPage, IonRow} from '@ionic/react';
import MyFooter from "../../components/MyFooter/MyFooter";
import 'swiper/css';
import 'swiper/css/effect-cards';
import './style.css';
import { useHistory } from 'react-router-dom';

import { Browser, OpenOptions } from '@capacitor/browser';
 
const openBrowserWithOptions = async (url: string) => {
  const options: OpenOptions = {
    url: url,
    presentationStyle: 'fullscreen', // or 'popover'
    toolbarColor: '#ffffff',
  };
  
  await Browser.open(options);
};

const EndGame: React.FC = () => {

  const history = useHistory();

  const joyagain = async () => {
    return history.replace('/home');
  };
 
  return (
    <IonPage>
      <IonContent color='main'>
        <IonGrid>
          <IonRow className='head-my-app'>
            <img className='JoyAgain' src='icon/end-text.svg'></img>
          </IonRow>
          <IonRow>
            <div className='JoyAgain' onClick={joyagain}>
                <img src='/icon/JoyAgain.svg'></img>
            </div>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonButton expand='block' color="light" shape='round' fill='outline' routerLink='/home'><b>ให้คะแนนเรา</b></IonButton>
              <IonButton expand='block' color="light" shape='round' fill='outline' onClick={() => openBrowserWithOptions("https://www.brunchtimeshop.com")}><b>สนับสนุนเรา</b></IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <MyFooter />
    </IonPage>
  );
};

export default EndGame;
