import React, { useState, useEffect } from 'react';
import {
  IonButton,
  IonCol, IonContent, IonGrid,
  IonPage, IonRow,
  IonLoading
} from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import MyFooter from "../../components/MyFooter/MyFooter";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import './PlayGame.css';

const fetchTextFileContent = async (filePath: string) => {
  const response = await fetch(filePath);
  const text = await response.text();
  return text;
};

const getRandomLines = (lines: string[], maxLines: number) => {
  // Shuffle the array
  const shuffled = lines.sort(() => 0.5 - Math.random());
  // Select up to maxLines from the shuffled array
  return shuffled.slice(0, maxLines);
};
interface statedata {
  state: string | null;
}

const generateSlideImages = () => {
  const images: { [key: number]: string } = {};
  const totalImages = 20;
  const imageIndices = Array.from({ length: totalImages }, (_, i) => i + 1);

  // Fisher-Yates shuffle algorithm for better randomization
  for (let i = imageIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [imageIndices[i], imageIndices[j]] = [imageIndices[j], imageIndices[i]];
  }

  // Map shuffled indices to image paths
  imageIndices.forEach((index, position) => {
    const imageNumber = index.toString().padStart(2, '0');
    images[position] = `/head/${imageNumber}.png`;
  });
  return images;
};

const slideImages = generateSlideImages();

const PlayGame: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [Icon_name, setIcon_name] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const location = useLocation<statedata>();
  const slideData = location.state;
  const [currentImage, setCurrentImage] = useState(slideImages[0]);

  const checkRandomStatus = (status: any) => {
    if(status != 'random'){
      return status;
    }
    else{
       // for random ,Create an array of the possible paths
      return history.replace('/randomcard');;
    }
  }
  
  const pathQuestion = (pathList: any) => {
    switch (pathList) {
      case 'icon-5':
        return '/txt/question1.txt';
      case 'icon-2':
        return '/txt/question2.txt';
      case 'icon-3':
        return '/txt/question3.txt';
      case 'icon-4':
        return '/txt/question4.txt';
      case 'icon-7':
        return '/txt/question7.txt';
      default:
        return '/txt/no_more.txt';
    }
  }

  const loadTextContent = async (pathList: any) => {
    try {
      const content = await fetchTextFileContent(pathQuestion(pathList));
      const linesArray = content.split('\n').filter(Boolean);
      // Get up to 10 random lines
      const randomLines = getRandomLines(linesArray, 20);
      setLines(randomLines);
      setCurrentSlide(0); // Reset to the first slide when loading new content
      setIcon_name(pathList);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slideData) {
      loadTextContent(checkRandomStatus(slideData));
    }
  }, [slideData]);

  const seemorepage = async () => {
    return history.push('/seemore');
  };
  const endgamepage = async () => {
    return history.push('/endgame');
  };

  const handleSlideChange = (swiper: any) => {
    if (swiper.activeIndex >= lines.length) {
      swiper.slideTo(0);
      endgamepage();
    } else {
      setCurrentSlide(swiper.activeIndex);
      // Update the current image based on the slide index
      setCurrentImage(slideImages[swiper.activeIndex] || slideImages[0]);
    }
  };
  
  return (
    <IonPage>
      <IonLoading
        isOpen={loading}
        message={'Loading...'}
        duration={3500}
      />
      <IonContent className='play-game-content'>
        <IonGrid>
          <IonRow >
            <IonCol size='12' className='ProgressTab'>
            <img className='top' src={currentImage} alt='Progress Icon' />
              <h1 className='head-count'>{currentSlide + 1}/{lines.length}</h1> {/* Adjusted to show number of displayed lines */}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className='cardContainer'>
              <Swiper
                effect={'cards'}
                modules={[EffectCards]}
                className="mySwiper"
                observer={true}
                observeParents={true}
                onSlideChange={handleSlideChange}
              >
                {lines.map((line, index) => (
                  <SwiperSlide key={index} className={'slide'+' '+Icon_name}>
                    <h1>{line}</h1> {/* Display the randomly selected line */}
                    <img src='/icon/LOGO.svg' className='TopiconInCard' alt='Slide Image' />
                    <img src={'icon/'+Icon_name+'.svg'} className='seccond-TopiconInCard' alt='Icon' />
                    <img src='/icon/LOGO.svg' className='BottomiconInCard' alt='Logo' />
                    <img src={'icon/'+Icon_name+'.svg'} className='seccond-BottomiconInCard' alt='Icon' />
                  </SwiperSlide>
                ))}
                <SwiperSlide className='slide'>
                  <h1>End of Game</h1>
                </SwiperSlide>
              </Swiper>
            </IonCol>
          </IonRow>
          <IonRow className="ion-padding-top">
            <IonCol size="12">
              <IonButton expand='block' color="main2" shape='round' fill='solid' onClick={seemorepage}><b>All Category</b></IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <MyFooter />
    </IonPage>
  );
};

export default PlayGame;
