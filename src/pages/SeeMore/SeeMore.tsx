import React, { useState } from 'react';
import {
  IonCard, IonCol, IonContent, IonGrid,
  IonImg, IonPage, IonRow} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import MyFooter from "../../components/MyFooter/MyFooter";
import './SeeMore.css';

const SeeMore: React.FC = () => {
  const history = useHistory();
  const [isNavigating, setIsNavigating] = useState(false);

  const goToShuffle = (path: string, src: string) => {
    if (isNavigating) {
      console.log('[SeeMore] goToShuffle ignored (already navigating)');
      return;
    }
    console.log('[SeeMore] goToShuffle', { path, src });
    setIsNavigating(true);
    history.push({
      pathname: '/shuffle',
      state: { path, src },
    });
  };

  return (
    <IonPage>
      <IonContent color='main'>
        <IonGrid className={isNavigating ? 'see-more--navigating' : ''}>
          <IonRow className='custom-card'>
            <IonImg src='/icon/2-1.png'></IonImg>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonCard className="custom-card" button onClick={() => goToShuffle('random', '/card/2-3.png')} disabled={isNavigating}>
                <img src="/card/2-3.png" alt="random" />
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard className="custom-card" button onClick={() => goToShuffle('icon-5', '/card/2-4.png')} disabled={isNavigating}>
                <img src="/card/2-4.png" alt="icon-5" />
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard className="custom-card" button onClick={() => goToShuffle('icon-2', '/card/2-5.png')} disabled={isNavigating}>
                <img src="/card/2-5.png" alt="icon-2" />
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard className="custom-card" button onClick={() => goToShuffle('icon-3', '/card/2-6.png')} disabled={isNavigating}>
                <img src="/card/2-6.png" alt="icon-3" />
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard className="custom-card" button onClick={() => goToShuffle('icon-4', '/card/2-7.png')} disabled={isNavigating}>
                <img src="/card/2-7.png" alt="icon-4" />
              </IonCard>
            </IonCol>
            {/* <IonCol size="6">
              <IonCard className="custom-card" button onClick={() => goToShuffle('icon-7', '/card/2-9.png')}>
                <img src="/card/2-9.png" alt="icon-7" />
              </IonCard>
            </IonCol> */}
          </IonRow>
        </IonGrid>
      </IonContent>
      <MyFooter />
    </IonPage>
  );
};

export default SeeMore;
