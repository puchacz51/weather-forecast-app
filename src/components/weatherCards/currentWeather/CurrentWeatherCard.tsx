import '../styles/weatherCard.scss';
import { City } from '../../../utilities/type';
import { useCurrentWeather } from '../../../utilities/useWeather';
import { CgSpinnerAlt } from 'react-icons/cg';
import { CurrentWeatherIcon } from './CurrentWeatherIcon';
import { useWaeatherStore } from '../../../store/store';
import { WeatherIconContext } from '../../../utilities/WeatherContext';
import { getWeatherIconValues } from '../../../utilities/getWeatherIconValues';
import { WeatherValues } from '../WeatherValues';

export const CurrentWeatherCard = () => {
  const { selectedCity: city, setSelectedWeatherType } = useWaeatherStore();
  const { city: name, longitude, latitude } = city as City;
  const { data: weatherData, isLoading } = useCurrentWeather(
    latitude,
    longitude
  );
  if (isLoading)
    return (
      <div className='currentWeather weatherContainer'>
        <h3 className='cityName'>{name}</h3>
        <div className='wrapperLoadingIcon'>
          <CgSpinnerAlt className='loadingIcon' />
        </div>
      </div>
    );

  if (!weatherData) return <p>undifined</p>;
  const { timezone } = weatherData;
  const currentTime = new Date(Date.now() - timezone * 1000);
  const [hours, minutes] = currentTime
    .toLocaleTimeString('en-US', { timeZone: 'Europe/London' })
    .split(':');
  const [day, month, year] = currentTime
    .toLocaleDateString('en-US', { timeZone: 'Europe/London' })
    .split('.');
  const iconValues = getWeatherIconValues(weatherData);
  console.log(timezone, new Date(Date.now()));
  return (
    <div className='currentWeather weatherContainer'>
      <h3 className='cityName'>{name}</h3>
      <h4 className='cityTime'>
        {day}.{month}.{year} {hours}:{minutes}
      </h4>
      <WeatherIconContext.Provider value={iconValues}>
        <CurrentWeatherIcon />
        <WeatherValues />
      </WeatherIconContext.Provider>
      <button
        className='selectWaetherTypeButton'
        onClick={() => setSelectedWeatherType('5DAYS')}>
        Weather for 5 days
      </button>
    </div>
  );
};
