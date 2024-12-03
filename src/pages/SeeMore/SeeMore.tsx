import React from 'react';
import {
  IonCard, IonCol, IonContent, IonGrid,
  IonPage, IonRow} from '@ionic/react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import MyFooter from "../../components/MyFooter/MyFooter";
import './SeeMore.css';

const SeeMore: React.FC = () => {
  return (
    <IonPage>
      <IonContent color='main'>
        <IonGrid>
          <IonRow className='head-my-app'>
            <img src='/icon/2-1.png'></img>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonCard className="custom-card">
                <Link 
                  to={{
                    pathname: "/shuffle",
                    state: {
                      path : "random",
                      src : "/card/2-3.png",
                    } 
                  }}
                >
                  <img src="/card/2-3.png" alt="random" />
                </Link>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard className="custom-card">
              <Link 
                  to={{
                    pathname: "/shuffle",
                    state: {
                      path : "icon-5",
                      src : "/card/2-4.png",
                    } 
                  }}
                >
                  <img src="/card/2-4.png" alt="icon-5" />
                </Link>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard className="custom-card">
              <Link 
                  to={{
                    pathname: "/shuffle",
                    state: {
                      path : "icon-2",
                      src : "/card/2-5.png",
                    } 
                  }}
                >
                  <img src="/card/2-5.png" alt="icon-2" />
                </Link>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard className="custom-card">
              <Link 
                  to={{
                    pathname: "/shuffle",
                    state: {
                      path : "icon-3",
                      src : "/card/2-6.png",
                    } 
                  }}
                >
                  <img src="/card/2-6.png" alt="icon-3" />
                </Link>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard className="custom-card">
              <Link 
                  to={{
                    pathname: "/shuffle",
                    state: {
                      path : "icon-4",
                      src : "/card/2-7.png",
                    } 
                  }}
                >
                  <img src="/card/2-7.png" alt="icon-4" />
                </Link>
              </IonCard>
            </IonCol>
            {/* <IonCol size="6">
              <IonCard className="custom-card">
              <Link 
                  to={{
                    pathname: "/shuffle",
                    state: {
                      path : "icon-7",
                      src : "/card/2-9.png",
                    } 
                  }}
                >
                  <img src="/card/2-9.png" alt="icon-7" />
                </Link>
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
