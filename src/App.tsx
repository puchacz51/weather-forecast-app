import './App.scss';
import { Header } from './Header';
import { useWaeatherStore } from './store/store';
import { CurrentWeatherCard } from './components/weatherCards/currentWeather/CurrentWeatherCard';
import { FiveDaysWeatherCard } from './components/weatherCards/fiveDaysWeather/FiveDaysWeatherCard';
import { SearchLocation } from './components/SearchLocation';
import { Route, Routes } from 'react-router-dom';
import { WeatherCards } from './components/weatherCards/currentWeather/WeatherCards';
import { supabase } from './utilities/supabase/supabase';
function App() {
  const { setUser, user } = useWaeatherStore();
  const { theme } = useWaeatherStore();
  // supabase.auth.onAuthStateChange((event, session) => {
  //   if (session?.user) {
  //     setUser(user);
  //   } else {
  //     setUser(null);
  //   }
  // });

  console.log(user);

  return (
    <div className={`App ${theme === 'DARK' && 'dark'}`}>
      <Header />
      <main>
        <Routes>
          <Route element={<SearchLocation />} path='/' />
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
