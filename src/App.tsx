import './App.scss';
import { Header } from './Header';
import { useWaeatherStore } from './store/store';
import { CurrentWeatherCard } from './components/weatherCards/currentWeather/CurrentWeatherCard';
import { FiveDaysWeatherCard } from './components/weatherCards/fiveDaysWeather/FiveDaysWeatherCard';

function App() {
  const { selectedCity, selectedCardType } = useWaeatherStore();
  
  if (!selectedCity)
    return (
      <main>
        <Header />
      </main>
    );
  return (
    <div className='App'>
      <Header />
      <main>
        {selectedCardType === 'CURRENT' && <CurrentWeatherCard />}
        {selectedCardType === '5DAYS' && <FiveDaysWeatherCard />}
      </main>
    </div>
  );
}

export default App;
