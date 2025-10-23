
import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import MainContent from './components/MainContent';

const App: React.FC = () => {
  // This state determines if the app's "work" (e.g., data fetching) is done.
  const [isAppReady, setIsAppReady] = useState<boolean>(false);
  // This state controls the visibility of the loader component itself.
  const [isLoaderVisible, setLoaderVisible] = useState<boolean>(true);

  useEffect(() => {
    // Simulate a loading process like fetching data or initializing assets.
    const timer = setTimeout(() => {
      setIsAppReady(true);
    }, 6000); // This duration should be slightly longer than the loading screen's internal animations.

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white">
      <MainContent isVisible={!isLoaderVisible} />
      {isLoaderVisible && (
        <LoadingScreen
          isFinishing={isAppReady}
          onTransitionEnd={() => setLoaderVisible(false)}
        />
      )}
    </div>
  );
};

export default App;
