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
import { useNavigate, useLocation } from 'react-router-dom';

export const CurrentWeatherCard = () => {
  const { selectedCity: city } = useWaeatherStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();
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
        onClick={() => navigate(pathname.replace('current', '5days'))}>
        5 days weather
      </button>
    </div>
  );
};
