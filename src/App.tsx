import './App.scss';
import { Header } from './Header';
import { useWaeatherStore } from './store/store';
import { CurrentWeatherCard } from './components/WeatherCard';

function App() {
  const { selectedCity } = useWaeatherStore();

  return (
    <div className='App'>
      <Header />
      <main>{selectedCity && <CurrentWeatherCard />}</main>
    </div>
  );
}

export default App;
