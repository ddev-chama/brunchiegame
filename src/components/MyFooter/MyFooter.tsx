import { IonIcon, IonLabel, IonTabBar, IonTabButton } from '@ionic/react';
import { bag, home, logOutSharp, openSharp, people } from 'ionicons/icons';
import '../MyFooter/MyFooter.css';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert';
import { useCallback } from 'react';

const MyFooter: React.FC = () => {
  const history = useHistory();
  const isGuest = localStorage.getItem('userSession') === 'guest';

  const handleLogout = useCallback(() => {
    localStorage.removeItem('userSession');
    history.push('/login');
  }, [history]);

  const openExternal = useCallback((url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  const handleAccount = useCallback(() => {
    try {
      const raw = localStorage.getItem('userSession');
      const session = raw && raw !== 'guest' ? JSON.parse(raw) : null;
      const name = session?.username ?? 'ผู้ใช้';
      Swal({
        title: `ยินดีต้อนรับ ${name}`,
        icon: 'info',
      });
    } catch {
      Swal({ title: 'บัญชี', icon: 'info' });
    }
  }, []);

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
        <IonTabButton onClick={handleLogout} tab="logout">
          <IonIcon icon={logOutSharp} />
          <IonLabel>Logout</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </>
  );
};

export default MyFooter;
