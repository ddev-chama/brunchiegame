import React from 'react';
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
} from '@ionic/react';
import './Home.css';
import MyFooter from "../../components/MyFooter/MyFooter";
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const Home: React.FC = () => {
  
  const showCustomAlert = (title: string, content: string[]) => {
    const htmlContent = `
      <div style="text-align: left;">
        <h2 style="margin-bottom: 20px;">${title}</h2>
        <ul style="padding-left: 20px;">
          ${content.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `;

    swal({
      content: {
        element: "div",
        attributes: {
          innerHTML: htmlContent
        },
      },
      className: "custom-swal",
    });

    // Add custom styles to the SweetAlert
    const swalContainer = document.querySelector('.swal-modal') as HTMLElement;
    if (swalContainer) {
      swalContainer.style.width = 'auto';
      swalContainer.style.maxWidth = '80%';
      swalContainer.style.padding = '20px';
    }

    const closeButton = document.querySelector('.swal-close-button') as HTMLElement;
    if (closeButton) {
      closeButton.style.position = 'absolute';
      closeButton.style.right = '10px';
      closeButton.style.top = '10px';
      closeButton.style.fontSize = '24px';
      closeButton.style.fontWeight = 'bold';
      closeButton.style.cursor = 'pointer';
      closeButton.style.background = 'none';
      closeButton.style.border = 'none';
    }

    // Close the alert when clicking outside
    const overlay = document.querySelector('.swal-overlay') as HTMLElement;
    if (overlay) {
      overlay.onclick = (e) => {
        if (e.target === overlay && swal.close) {
          swal.close();
        }
      };
    }
  };

  const showQuestionList = () => {
    showCustomAlert("รายการหมวดหมู่คำถาม", [
      "หมวดหมู่ที่ 1 : สุ่มจากทุกหมวดคำถาม",
      "หมวดหมู่ที่ 2 : การงานการเงิน",
      "หมวดหมู่ที่ 3 : หมวดความสัมพันธ์",
      "หมวดหมู่ที่ 4 : หมวดทั่วไป",
      "หมวดหมู่ที่ 5 : หมวดความรัก",
      // "หมวดหมู่ที่ 6 : หมวด 18+",
    ]);
  };

  const showHowToPlay = () => {
    showCustomAlert("วิธีการเล่น", [
      "เลือกหมวดหมู่คำถามที่คุณสนใจ",
      "อ่านคำถามและคิดคำตอบ",
      "เลือกคำตอบที่คุณคิดว่าถูกต้อง",
      "ตอบคำถามข้อถัดไป",
    ]);
  };

  return (
    <IonPage>
      <IonContent color={'main'}>
        <IonGrid>
          <IonRow className='head-my-app'>
            <img src='/icon/KJKJ_LOGO.png' alt="KJKJ Logo"></img>
          </IonRow>

          <IonRow>
            <IonCol size='12'>
              <div className="relativeObject">
                <Link to="/GameSetup">
                  <img src='/icon/1-3.png' className='cardBg' alt="Card Background"></img>
                </Link>
                <img src='/icon/1-2.png' className='bonusIcon' alt="Bonus Icon"></img>
              </div>
            </IonCol>
          </IonRow>

          <IonRow style={{ padding: '5em 0' }}>
            <IonCol>
              <IonButton expand='block' color="light" shape='round' fill='outline' onClick={showQuestionList}>
                <b>ดูหมวดหมู่คำถาม</b>
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton expand='block' color="light" shape='round' fill='outline' onClick={showHowToPlay}>
                <b>วิธีการเล่น</b>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <MyFooter></MyFooter>
    </IonPage>
  );
};

export default Home;