import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonAvatar,
  IonBadge,
  IonAlert,
  IonProgressBar,
  IonFooter,
  IonButtons,
} from '@ionic/react';
import {
  settingsOutline,
  logOutOutline,
  trashOutline,
  starOutline,
  helpCircleOutline,
  bookOutline,
  ribbonOutline,
  personOutline,
  homeOutline,
  cardOutline,
  createOutline
} from 'ionicons/icons';
import { useHistory } from 'react-router';
import MyFooter from '../MyFooter/MyFooter';
import axios from 'axios';

const Menu: React.FC = () => {
    const history = useHistory();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const handleLogout = () => {
    localStorage.clear();// Remove session from localStorage
    history.replace('/login'); // Redirect to login page
  };

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
      "หมวดหมู่ที่ 6 : หมวด 18+",
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

const deleteAccount = async () => {
  try {
    const token = localStorage.getItem('userSession');
    const userId = localStorage.getItem('userId');
    const response = await axios({
      method: 'post',
      url: 'https://brunchtime.org/wp-json/simple-auth/v1/delete-account',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: {
        user_id: userId
      }
    });
    
    if (response.status === 200) {
      // Account deleted successfully
      swal({
        title: "ดำเนินการเสร็จสิ้น",
        text: "บัญชีของคุณถูกลบออกจากระบบแล้ว",
        icon: "success",
        buttons: {
          confirm: {
            text: "ตกลง",
            value: true,
            visible: true,
            className: "btn-success",
            closeModal: true
          }
        }
      }).then(() => {
        localStorage.clear(); // Clear local storage
        history.replace('/login'); // Redirect to login page
      });

      
    }
  } catch (error) {
    console.error('Error deleting account:', error);
    swal({
      title: "Error",
      text: "ไม่สามารถลบบัญชีได้ กรุณาลองใหม่อีกครั้ง",
      icon: "error",
      buttons: {
        confirm: {
          text: "ตกลง",
          value: true,
          visible: true,
          className: "btn-error",
          closeModal: true
        }
      }
    });
  }
};
  
  
  return (
    <IonPage>
      <IonHeader className="ion-no-border ">
        <IonToolbar style={{ '--background': '#FFD84D' }}>
        </IonToolbar>
      </IonHeader>

      <IonContent className='head-my-app' style={{ '--background': '#FFD84D' }}>
        {/* Profile Card */}
        <IonCard className="ion-margin" style={{ borderRadius: '16px', margin: '16px' }}>
          <IonCardContent>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>{localStorage.getItem('user_display_name')}</h2>
                </div>
                <p style={{ margin: '4px 0', color: '#666' }}>ID: {localStorage.getItem('userId')}</p>
                <p style={{ margin: 0, color: '#10b981' }}>ออนไลน์</p>
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Menu Items */}
        <div className="ion-padding">
          <IonItem 
            button 
            detail={true} 
            lines="full"
            onClick={showHowToPlay}
            style={{ '--background': 'white', borderRadius: '12px', marginBottom: '8px' }}
          >
            <IonIcon icon={bookOutline} slot="start" style={{ color: '#FFD84D' }} />
            <IonLabel>วิธีการเล่น</IonLabel>
          </IonItem>

          <IonItem 
            button 
            detail={true} 
            lines="full"
            onClick={showQuestionList}
            style={{ '--background': 'white', borderRadius: '12px', marginBottom: '8px' }}
          >
            <IonIcon icon={helpCircleOutline} slot="start" style={{ color: '#FFD84D' }} />
            <IonLabel>รายการหมวดหมู่คำถาม</IonLabel>
          </IonItem>

          {localStorage.getItem('userSession') !== 'guest' && (
            <IonItem 
              button 
              onClick={()=>deleteAccount()}
              lines="full" 
              style={{ '--background': '#fee2e2', borderRadius: '12px', marginBottom: '8px' }}
            >
              <IonIcon icon={trashOutline} slot="start" style={{ color: '#ef4444' }} />
              <IonLabel color="danger">ลบบัญชี</IonLabel>
            </IonItem>
          )}

          <IonItem 
            button 
            lines="full"
            style={{ '--background': '#fee2e2', borderRadius: '12px' }}
            onClick={handleLogout}
          >
            <IonIcon icon={logOutOutline} slot="start" style={{ color: '#ef4444' }} />
            <IonLabel color="danger">ออกจากระบบ</IonLabel>
          </IonItem>
        </div>
      </IonContent>
      <MyFooter></MyFooter>

      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => setShowDeleteAlert(false)}
        header="ยืนยันการลบบัญชี"
        message="การดำเนินการนี้ไม่สามารถย้อนกลับได้ บัญชีของคุณและข้อมูลทั้งหมดจะถูกลบออกจากระบบอย่างถาวร"
        buttons={[
          {
            text: 'ยกเลิก',
            role: 'cancel',
            handler: () => {
              setShowDeleteAlert(false);
            },
          },
          {
            text: 'ลบบัญชี',
            role: 'destructive',
            handler: () => {
              console.log('Delete account');
            },
          },
        ]}
      />
    </IonPage>
  );
};

export default Menu;

function showCustomAlert(arg0: string, arg1: string[]) {
    throw new Error('Function not implemented.');
}
