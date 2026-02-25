import React, { useEffect, useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import {
  PRELOAD_ASSET_URLS,
  PRELOAD_CACHE_KEY,
  PRELOAD_VERSION,
} from '../../config/preloadAssets';
import './Preload.css';

const preloadOne = (url: string): Promise<void> =>
  fetch(url, { cache: 'force-cache' }).then(() => {});

const Preload: React.FC = () => {
  const history = useHistory();
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(PRELOAD_ASSET_URLS.length);

  useEffect(() => {
    const cached = localStorage.getItem(PRELOAD_CACHE_KEY);
    if (cached === PRELOAD_VERSION) {
      console.log('[Preload] Already cached, redirect to login');
      history.replace('/login');
      return;
    }

    let cancelled = false;
    const totalCount = PRELOAD_ASSET_URLS.length;
    setTotal(totalCount);

    const run = async () => {
      let done = 0;
      for (const url of PRELOAD_ASSET_URLS) {
        if (cancelled) return;
        try {
          await preloadOne(url);
        } catch (e) {
          console.warn('[Preload] Failed to preload:', url, e);
        }
        done += 1;
        setProgress(done);
      }
      if (cancelled) return;
      localStorage.setItem(PRELOAD_CACHE_KEY, PRELOAD_VERSION);
      console.log('[Preload] Preload done, redirect to login');
      history.replace('/login');
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [history]);

  const percent = total ? Math.round((progress / total) * 100) : 0;

  return (
    <IonPage className="preload-page">
      <IonContent color="main" className="preload-content" fullscreen>
        <div className="preload-center">
          <div className="preload-content-inner">
          <div className="preload-card">
            <div className="preload-logo-wrap">
              <img
                src="/icon/KJKJ_LOGO.png"
                alt="Logo"
                className="preload-logo"
              />
              <div className="preload-logo-glow" aria-hidden />
            </div>
            <h1 className="preload-title">Brunchie Game</h1>
            <p className="preload-desc">กำลังเตรียมข้อมูลให้พร้อมเล่น</p>
            <div className="preload-progress-wrap">
              <div className="preload-progress-track">
                <div
                  className="preload-progress-fill"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div className="preload-meta">
                <span className="preload-percent">{percent}%</span>
                <span className="preload-count">
                  {progress} / {total} ไฟล์
                </span>
              </div>
            </div>
            <div className="preload-dots" aria-hidden>
              <span className="preload-dot" />
              <span className="preload-dot" />
              <span className="preload-dot" />
            </div>
          </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Preload;
