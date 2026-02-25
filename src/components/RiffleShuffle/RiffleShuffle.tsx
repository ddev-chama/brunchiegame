import React, { useEffect, useRef, useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import './RiffleShuffle.css';

interface LocationState {
  path: string;
  src: string;
}

const RiffleShuffle: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const location = useLocation<LocationState>();
  const history = useHistory();
  const stateData = location.state;
  const path = stateData?.path;
  const src = stateData?.src;

  // Create array of 20 cards
  const cardCount = 20;
  const cards = Array(cardCount).fill(null);

  const animateWave = async () => {
    if (!containerRef.current) return;

    // Remove initial class from all cards
    cardsRef.current.forEach(card => {
      if (card) card.classList.remove('initial');
    });

    // Add wave animation to each card with slight delay
    for (let i = 0; i < cardsRef.current.length; i++) {
      const card = cardsRef.current[i];
      if (card) {
        await new Promise(resolve => setTimeout(resolve, 50));
        card.classList.add('animating-wave');
      }
    }

    // Wait for animation to complete
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Reset cards
    cardsRef.current.forEach(card => {
      if (card) {
        card.classList.remove('animating-wave');
        card.classList.add('initial');
      }
    });

    // Navigate to next page: random -> RandomCard, อื่น -> PlayGame with path
    if (path === 'random') {
      history.replace('/randomcard');
    } else {
      history.replace({
        pathname: '/playgame',
        state: path
      });
    }
  };

  const handleShuffle = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    try {
      await animateWave();
    } finally {
      setIsAnimating(false);
    }
  };

  useEffect(() => {
    // Start animation automatically after component mounts
    handleShuffle();
  }, []);

  return (
    <IonPage>
      <IonContent>
        <div className="riffle-container">
          <div className="deck-container" ref={containerRef}>
            {cards.map((_, index) => (
              <div
                key={index}
                ref={el => cardsRef.current[index] = el}
                className="card initial"
                style={{
                  '--index': index,
                  zIndex: index,
                  backgroundImage: `url(${src})`
                } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RiffleShuffle;