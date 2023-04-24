import './styles/App.scss';
import { Header } from './Header';
import { CurrentWeatherCard } from './components/weatherCards/currentWeather/CurrentWeatherCard';
import { FiveDaysWeatherCard } from './components/weatherCards/fiveDaysWeather/FiveDaysWeatherCard';
import { SearchLocation } from './components/SearchLocation';
import { Route, Routes } from 'react-router-dom';
import { WeatherCards } from './components/weatherCards/currentWeather/WeatherCards';
import { supabase } from './utilities/supabase/supabase';
import { Dashboard } from './components/dashboard/Dashboard';
import { useEffect } from 'react';
import { useRootStore } from './store/store';
function App() {
  const theme = useRootStore((stete) => stete.theme);
  const setSession = useRootStore((state) => state.setSession);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, ses) => {
      setSession(ses);
    });
  }, []);
  return (
    <div className={`app ${theme === 'DARK' && 'dark'}`}>
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
