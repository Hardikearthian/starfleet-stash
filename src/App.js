import { useAuth } from '@clerk/react';
import { useEffect, useState } from 'react';
import ExpenseDashboard from './pages/ExpenseDashboard.js';
import LandingPage from './pages/LandingPage.js';
import SplashScreen from './pages/SplashScreen.js';

/**
 * Root component of the Expense Tracker application.
 *
 * @returns {JSX.Element} The authenticated or public application view.
 */
function App() {
  const { isLoaded, isSignedIn } = useAuth();
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 1200);

    return () => {
      clearTimeout(splashTimer);
    };
  }, []);

  if (isSplashVisible || !isLoaded) {
    return <SplashScreen />;
  }

  if (isSignedIn) {
    return <ExpenseDashboard />;
  }

  return <LandingPage />;
}

export default App;