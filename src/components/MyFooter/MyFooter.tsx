import {  IonIcon, IonLabel, IonTabBar, IonTabButton  } from '@ionic/react';
import { bag, home, logOutSharp, openSharp,people } from 'ionicons/icons';
import '../MyFooter/MyFooter.css';
import { useHistory } from 'react-router-dom'; // Import useHistory for redirection
import Swal from 'sweetalert';
import { useEffect, useState } from 'react';
import { getUserProfile } from '../../utils/lineAuth';

interface UserProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
  email?: string;
}

const MyFooter: React.FC = () => {
  const history = useHistory(); // Hook to access the history object
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const isGuest = localStorage.getItem('userSession') === 'guest';

  useEffect(() => {
    
    const token = localStorage.getItem('line_access_token');
    if (token) {
      const fetchProfile = async () => {
        try {
          const userProfile = await getUserProfile();
          setProfile(userProfile);
        } catch (err) {
          console.error('Profile fetch error:', err);
        } 
      };

      fetchProfile();
      
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('userSession'); // Remove session from localStorage
    localStorage.removeItem('line_access_token'); // Remove line session from localStorage
    history.push('/login'); // Redirect to login page
  };

  const openExternal = (url: string) => {
    console.log('[MyFooter] openExternal:', url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  const handleAccount = () => {
    Swal({
      title: `ยินดีต้อนรับ ${profile?.displayName}`,
      text: `
        รายละเอียดบัญชี:
        ${profile?.email ? `\nอีเมล: ${profile.email}` : ''}
        ${profile?.statusMessage ? `\nสถานะ: ${profile.statusMessage}` : ''}
        \nUser ID: ${profile?.userId}
      `,
      icon: 'success',
      content: {
        element: "div",
        attributes: {
          innerHTML: `
            <div class="flex justify-center">
              <img
                src="${profile?.pictureUrl}"
                alt="${profile?.displayName}"
                class="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
          `
        }
      }
    });
  }

  return (
    <>
        <IonTabBar slot="bottom" className="custom-tab-bar">
          <IonTabButton onClick={() => history.replace('/home')} tab="home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton onClick={() => openExternal('https://www.brunchtimeshop.com/products')} tab="contacts">
            <IonIcon icon={bag} />
            <IonLabel>Shop</IonLabel>
          </IonTabButton>
          <IonTabButton onClick={() => openExternal('https://www.brunchtimeshop.com')} tab="settings">
            <IonIcon icon={openSharp} />
            <IonLabel>Website</IonLabel>
          </IonTabButton>
          {!isGuest && (
            <IonTabButton onClick={handleAccount} tab="account">
              <IonIcon icon={people} />
              <IonLabel>Account</IonLabel>
            </IonTabButton>
          )}
          <IonTabButton onClick={handleLogout} tab="logout"> {/* Use onClick for logout */}
          <IonIcon icon={logOutSharp} />
          <IonLabel>Logout</IonLabel>
        </IonTabButton>
        </IonTabBar>
    </>
  );
};

export default MyFooter;
