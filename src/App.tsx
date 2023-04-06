import './App.scss';
import { Header } from './Header';
import { useWaeatherStore } from './store/store';
import { CurrentWeatherCard } from './components/weatherCards/currentWeather/CurrentWeatherCard';
import { FiveDaysWeatherCard } from './components/weatherCards/fiveDaysWeather/FiveDaysWeatherCard';
import { SearchLocation } from './components/SearchLocation';
function App() {
  const { selectedCity, selectedCardType } = useWaeatherStore();
  const { theme } = useWaeatherStore();
  if (!selectedCity)
    return (
      <div className={`App ${theme === 'DARK' && 'dark'}`}>
        <Header />

        <main>
          <SearchLocation />
        </main>
      </div>
    );
  return (
    <div className={`App ${theme === 'DARK' && 'dark'}`}>
      <Header />
      <main>
        {/* <WeatherValues /> */}

        {/* <FiveDaysWeatherCard />
        <CurrentWeatherCard />
         */}
        {selectedCardType === 'CURRENT' && <CurrentWeatherCard />}
        {selectedCardType === '5DAYS' && <FiveDaysWeatherCard />}
      </main>
    </div>
  );
}

export default App;
