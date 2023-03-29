import './App.scss';
import { Header } from './Header';
import { useWaeatherStore } from './store/store';
import { CurrentWeatherCard } from './components/WeatherCard';
import { FiveDaysWeatherCard } from './components/fiveDaysWeather/FiveDaysWeatherCard';

function App() {
  const { selectedCity } = useWaeatherStore();

  return (
    <div className='App'>
      <Header />
      <main>{selectedCity && <CurrentWeatherCard />}</main>
      <FiveDaysWeatherCard />
    </div>
  );
}

export default App;
