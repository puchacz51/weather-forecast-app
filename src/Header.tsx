import './Header.scss';
import { SearchCity } from './components/headerComponents/SearchCity';
import { CurrentWeatherCard } from './components/WeatherCard';
import { useWaeatherStore } from './store/store';

const ThemeSwitch = () => {
  return <button></button>;
};

export const Header = () => {
  return (
    <div className='wrapper'>
      <header className='header'>
        <SearchCity />
      </header>
    </div>
  );
};
