import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonContent } from '@ionic/react';

/** LINE login removed: redirect to login */
const Callback: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    history.replace('/login');
  }, [history]);

  return (
    <IonPage>
      <IonContent className="ion-padding" color="light">
        <p className="ion-text-center ion-padding">กำลังนำทาง...</p>
      </IonContent>
    </IonPage>
  );
};

export default Callback;
