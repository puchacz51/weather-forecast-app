import '../styles/weatherCard.scss';
import { City } from '../../../utilities/type';
import { useCurrentWeather } from '../../../utilities/useWeather';
import { CgSpinnerAlt } from 'react-icons/cg';
import { CurrentWeatherIcon } from './CurrentWeatherIcon';
import { useWaeatherStore } from '../../../store/store';
import { WeatherIconContext } from '../../../utilities/WeatherContext';
// import { CurrentWeather } from '../WeatherTypes';
import { getWeatherIconValues } from '../../../utilities/getWeatherIconValues';
import { WeatherValues } from '../WeatherValues';

export const CurrentWeatherCard = () => {
  const { selectedCity: city } = useWaeatherStore();
  const { city: name, longitude, latitude } = city as City;
  const { data: weatherData, isLoading } = useCurrentWeather(
    latitude,
    longitude
  );
  if (isLoading) return <CgSpinnerAlt />;
  if (!weatherData) return <p>undifined</p>;
  const { timezone } = weatherData;
  const currentTime = new Date(Date.now() - timezone * 1000);
  const [hours, minutes] = currentTime.toLocaleTimeString().split(':');
  const [day, month, year] = currentTime.toLocaleDateString().split('.');
  const iconValues = getWeatherIconValues(weatherData);
  return (
    <div className='currentWeather WeatherContainer'>
      <h3 className='cityName'>{name}</h3>
      <h4 className='cityTime'>
        {day}.{month}.{year} {hours}:{minutes}
      </h4>
      <WeatherIconContext.Provider value={iconValues}>
        <CurrentWeatherIcon />
        <WeatherValues />
      </WeatherIconContext.Provider>
    </div>
  );
};

export const DayWeatherList = () => {
  return (
    <div className='DayWeatherList'>
      <DayWeatherItem />
    </div>
  );
};
const DayWeatherItem = () => {
  return (
    <div className='DayWeatherItem'>
      <img src='./icons/c01d.png' alt='weatherIcon' />
    </div>
  );
};
