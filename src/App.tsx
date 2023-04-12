import './App.scss';
import { Header } from './Header';
import { useWaeatherStore } from './store/store';
import { CurrentWeatherCard } from './components/weatherCards/currentWeather/CurrentWeatherCard';
import { FiveDaysWeatherCard } from './components/weatherCards/fiveDaysWeather/FiveDaysWeatherCard';
import { SearchLocation } from './components/SearchLocation';
import { Route, Routes } from 'react-router-dom';
import { WeatherCards } from './components/weatherCards/currentWeather/WeatherCards';
import { supabase } from './utilities/supabase/supabase';
import { Dashboard } from './components/dashboard/Dashboard';
import { useEffect } from 'react';
import { useUserStore } from './store/userStore';
function App() {
  const theme = useWaeatherStore(
    (stete) => stete.theme,
    (oldTheme, newTheme) => oldTheme === newTheme
  );
  const { setSession } = useUserStore();
  useEffect(() => {
    console.log('useEffect');
    supabase.auth.onAuthStateChange((_event, ses) => {
      console.log('session change', ses);
      setSession(ses);
    });
  }, []);
  return (
    <div className={`App ${theme === 'DARK' && 'dark'}`}>
      <Header />
      <main>
        <Routes>
          <Route element={<SearchLocation />} path='/' />
          <Route element={<Dashboard />} path='dashboard' />

          <Route path='weather/:cityId' element={<WeatherCards />}>
            <Route element={<FiveDaysWeatherCard />} path='5days' />
            <Route element={<CurrentWeatherCard />} path='current' />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
