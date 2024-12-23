import React, { useState, useEffect, useRef } from 'react';
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

// Import JSON data
import question1Data from '../PlayGame/quiz/question1.json';
import question2Data from '../PlayGame/quiz/question2.json';
import question3Data from '../PlayGame/quiz/question3.json';
import question4Data from '../PlayGame/quiz/question4.json';

// Question sets configuration
const questionSets = {
  'question1': {
    questions: question1Data.questions,
    icon: 'icon-5'
  },
  'question2': {
    questions: question2Data.questions,
    icon: 'icon-2'
  },
  'question3': {
    questions: question3Data.questions,
    icon: 'icon-3'
  },
  'question4': {
    questions: question4Data.questions,
    icon: 'icon-4'
  }
};

const generateSlideImages = () => {
  const images: { [key: number]: string } = {};
  const totalImages = 20;
  const imageIndices = Array.from({ length: totalImages }, (_, i) => i + 1);

  // Fisher-Yates shuffle algorithm for better randomization
  for (let i = imageIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [imageIndices[i], imageIndices[j]] = [imageIndices[j], imageIndices[i]];
  }

  imageIndices.forEach((index, position) => {
    const imageNumber = index.toString().padStart(2, '0');
    images[position] = `/head/${imageNumber}.png`;
  });
  return images;
};

const slideImages = generateSlideImages();

// Function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

interface Question {
  text: string;
  iconFile: string;
}

const RandomCard: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lines, setLines] = useState<Question[]>([]);
  const swiperRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(slideImages[0]);

  const history = useHistory();
  const location = useLocation<string[]>();
  const loadMultipleTextContent = async () => {
    setLoading(true);
    try {
      const totalLines = 20;
      let allQuestions: Question[] = [];

      // Collect questions from all sets
      Object.entries(questionSets).forEach(([key, set]) => {
        const questionsWithIcons = set.questions.map(question => ({
          text: question,
          iconFile: set.icon
        }));
        allQuestions = [...allQuestions, ...questionsWithIcons];
      });

      // Shuffle all questions
      const shuffledQuestions = shuffleArray(allQuestions);

      // Take first 20 questions (or less if not enough questions)
      const selectedQuestions = shuffledQuestions.slice(0, totalLines);

      setLines(selectedQuestions);
      setCurrentSlide(0);
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMultipleTextContent();
  }, [location]);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(0);
    }
  }, [lines]);
  const seemorepage = () => {
    history.replace('/seemore');
  };
  const endgamepage = () => {
    history.push('/endgame');
  };

  const handleSlideChange = (swiper: any) => {
    if (swiper.activeIndex >= lines.length) {
      swiper.slideTo(0);
      endgamepage();
    } else {
      setCurrentSlide(swiper.activeIndex);
      setCurrentImage(slideImages[swiper.activeIndex] || slideImages[0]);
    }
  };

  return (
    <IonPage>
      <IonContent className='play-game-content'>
        <IonLoading
          isOpen={loading}
          message={'Loading...'}
          duration={3500}
        />
        <IonGrid>
          <IonRow>
            <IonCol size="12" className="ProgressTab">
              <img className='top' src={currentImage} alt='Progress Icon' />
              <h1 className='head-count'>{currentSlide + 1}/{lines.length}</h1>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className="cardContainer">
              <Swiper
                ref={swiperRef}
                effect="cards"
                modules={[EffectCards]}
                className="mySwiper"
                observer={true}
                observeParents={true}
                onSlideChange={handleSlideChange}
              >
                {lines.map((line, index) => (
                  <SwiperSlide key={index} className={`slide ${line.iconFile}`}>
                    <h1>{line.text}</h1>
                    <img src="/icon/LOGO.svg" className="TopiconInCard" alt="Slide Image" />
                    <img src={`/icon/${line.iconFile}.svg`} className="seccond-TopiconInCard" alt="Icon" />
                    <img src="/icon/LOGO.svg" className="BottomiconInCard" alt="Logo" />
                    <img src={`/icon/${line.iconFile}.svg`} className="seccond-BottomiconInCard" alt="Icon" />
                  </SwiperSlide>
                ))}
                <SwiperSlide className="slide">
                  <h1>End of Game</h1>
                </SwiperSlide>
              </Swiper>
            </IonCol>
            <IonCol size="12">
              <IonButton expand="block" color="main2" shape="round" fill="solid" onClick={seemorepage}>
                <b>All Category</b>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <MyFooter />
    </IonPage>
  );
};

export default RandomCard;
