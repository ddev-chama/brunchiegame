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

// Import all question sets
import question1Data from './quiz/question1.json';
import question2Data from './quiz/question2.json';
import question3Data from './quiz/question3.json';
import question4Data from './quiz/question4.json';
import question7Data from './quiz/question7.json';

// TypeScript interfaces
interface QuestionSet {
  questions: string[];
}

interface QuestionSets {
  [key: string]: string[];
}
interface Question {
  text: string;
  category?: string;
}

interface StateData {
  state: string | null;
}

// Question sets mapping
const questionSets: QuestionSets = {
  'question1': question1Data.questions,
  'question2': question2Data.questions,
  'question3': question3Data.questions,
  'question4': question4Data.questions,
  'question7': question7Data.questions,
};

// Fetch questions function
const fetchQuestions = async (questionSet: string): Promise<string[]> => {
  try {
    const questions = questionSets[questionSet];
    if (!questions) {
      console.warn(`Question set ${questionSet} not found`);
      return [];
    }
    return questions;
  } catch (error) {
    console.error('Error loading questions:', error);
    return [];
  }
};
  
// Get random questions helper
const getRandomQuestions = (questions: string[], count: number): Question[] => {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length)).map(text => ({
    text,
    category: undefined
  }));
};

// Generate slide images helper
const generateSlideImages = () => {
  const images: { [key: number]: string } = {};
  const totalImages = 20;
  const imageIndices = Array.from({ length: totalImages }, (_, i) => i + 1);

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

const PlayGame: React.FC = () => {
  const [lines, setLines] = useState<Question[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [icon_name, setIcon_name] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [cachedQuestions, setCachedQuestions] = useState<QuestionSets>({});
  const [currentImage, setCurrentImage] = useState(slideImages[0]);
  const [error, setError] = useState<string | null>(null);

  const history = useHistory();
  const location = useLocation<StateData>();
  const slideData = location.state;
  const checkRandomStatus = (status: any) => {
    if (status !== 'random') {
      return status;
    } else {
      return history.replace('/randomcard');
    }
  }

  const pathQuestion = (pathList: string): string => {
    switch (pathList) {
      case 'icon-5':
        return 'question1';
      case 'icon-2':
        return 'question2';
      case 'icon-3':
        return 'question3';
      case 'icon-4':
        return 'question4';
      case 'icon-7':
        return 'question7';
      default:
        return 'question1';
    }
  }

  const loadTextContent = async (pathList: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const questionSet = pathQuestion(pathList);
      
      // Check cache first
      if (cachedQuestions[questionSet]) {
        const randomQuestions = getRandomQuestions(cachedQuestions[questionSet], 20);
        setLines(randomQuestions);
        setCurrentSlide(0);
        setIcon_name(pathList);
        return;
      }

      // Load questions if not cached
      const questionsArray = await fetchQuestions(questionSet);
      
      if (questionsArray.length === 0) {
        throw new Error('No questions found for this category');
      }

      // Cache the questions
      setCachedQuestions(prev => ({
        ...prev,
        [questionSet]: questionsArray
      }));

      const randomQuestions = getRandomQuestions(questionsArray, 20);
      setLines(randomQuestions);
      setCurrentSlide(0);
      setIcon_name(pathList);
    } catch (error) {
      console.error('Error loading questions:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (slideData) {
      loadTextContent(checkRandomStatus(slideData));
    }
  }, [slideData]);

  const seemorepage = () => {
    history.push('/seemore');
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

  if (error) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <div className="error-container">
            <h2>Error</h2>
            <p>{error}</p>
            <IonButton onClick={() => history.push('/seemore')}>
              Return to Categories
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonLoading
        isOpen={loading}
        message={'Loading...'}
        duration={3500}
      />
      <IonContent className='play-game-content'>
        <IonGrid>
          <IonRow>
            <IonCol size='12' className='ProgressTab'>
              <img className='top' src={currentImage} alt='Progress Icon' />
              <h1 className='head-count'>{currentSlide + 1}/{lines.length}</h1>
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
                {lines.map((question, index) => (
                  <SwiperSlide key={index} className={'slide'+' '+icon_name}>
                    <h1>{question.text}</h1>
                    <img src='/icon/LOGO.svg' className='TopiconInCard' alt='Slide Image' />
                    <img src={'icon/'+icon_name+'.svg'} className='seccond-TopiconInCard' alt='Icon' />
                    <img src='/icon/LOGO.svg' className='BottomiconInCard' alt='Logo' />
                    <img src={'icon/'+icon_name+'.svg'} className='seccond-BottomiconInCard' alt='Icon' />
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
              <IonButton 
                expand='block' 
                color="main2" 
                shape='round' 
                fill='solid' 
                onClick={seemorepage}
              >
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
export default PlayGame;
