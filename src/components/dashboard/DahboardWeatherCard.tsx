import { Link } from 'react-router-dom';
import { WeatherIconContext } from '../../utilities/WeatherContext';
import {
  getTimeFromTimezone,
  getWeatherIconValues,
} from '../../utilities/getWeatherIconValues';
import { WeatherCardCity } from '../../utilities/useUserWeatherCard';
import { useCurrentWeather } from '../../utilities/useWeather';
import { CurrentWeatherIcon } from '../weatherCards/currentWeather/CurrentWeatherIcon';
import { useState } from 'react';
import { DashboardWeatherCardPanel } from './DashboardWeatherCardValues';

export const DashBoardWeatherCard = ({
  cardData,
}: {
  cardData: WeatherCardCity & { tempCard?: boolean };
}) => {
  const { latitude, longitude, cityName } = cardData;
  const { data, isFetching, isError } = useCurrentWeather(latitude, longitude);
  const [panelIsOpen, setPanelIsOpen] = useState(false);
  if (!data) return <>loading</>;
  const { hours, minutes } = getTimeFromTimezone(data.timezone);
  const iconValues = getWeatherIconValues(data);

  return (
    <button
      // to={`/weather/${cardData.cityId}/current`}
      onClick={()=>setPanelIsOpen(isOpen=>!isOpen)}
      className={`dashboardWeatherCard  ${cardData.tempCard && 'tempCard'}`}>
      <h3 className='title'>
        {cityName} {hours}:{minutes}
      </h3>
      <WeatherIconContext.Provider value={{ ...iconValues, timezoneOffset: 0 }}>
        <div className='wrapper'>
          <CurrentWeatherIcon />
          <p className='temperature'>{iconValues.temp.toFixed(0)}&deg;C</p>
        </div>
        {panelIsOpen && <DashboardWeatherCardPanel />}
      </WeatherIconContext.Provider>
    </button>
  );
};
