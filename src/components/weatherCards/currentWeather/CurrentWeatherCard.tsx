import '../styles/weatherCard.scss';
import { City } from '../../../utilities/type';
import { useCurrentWeather } from '../../../utilities/useWeather';
import { CgSpinnerAlt } from 'react-icons/cg';
import { CurrentWeatherIcon } from './CurrentWeatherIcon';
import { useWaeatherStore } from '../../../store/store';
import { WeatherIconContext } from '../../../utilities/WeatherContext';
import {
  getTimeFromTimezone,
  getWeatherIconValues,
} from '../../../utilities/getWeatherIconValues';
import { WeatherValues } from '../WeatherValues';
import { mockCurrrentWeatherData } from './data';

export const CurrentWeatherCard = () => {
  const { setSelectedWeatherType, selectedCity:city } = useWaeatherStore();
  // const city = { city: 'testowe', longitude: 41, latitude: 30 };

  const { city: name, longitude, latitude } = city as City;
   const { data: weatherData, isLoading } = useCurrentWeather(
    latitude,
    longitude
  );

  // const weatherData = mockCurrrentWeatherData;
  // const isLoading = false;
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
  const { day, hours, minutes, month, year } = getTimeFromTimezone(timezone);

  const iconValues = getWeatherIconValues(weatherData);
  return (
    <div className='currentWeather weatherContainer'>
      <div className='title'>
        <h3 className='cityName'>{name}</h3>
        <h4 className='cityTime'>
          {day}.{month}.{year} {hours}:{minutes}
        </h4>
      </div>
      <WeatherIconContext.Provider value={iconValues}>
        <CurrentWeatherIcon />
        <WeatherValues />
      </WeatherIconContext.Provider>
      <button
        className='selectWaetherTypeButton'
        onClick={() => setSelectedWeatherType('5DAYS')}>
        5 days weather
      </button>
    </div>
  );
};
