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
import { maxNameLength } from '../../utilities/maxNameLength';
import { LoadingSpinner } from '../LoadingSpinner';
import { AnimatePresence, motion } from 'framer-motion';
export const DashBoardWeatherCard = ({
  cardData,
  cityId,
}: {
  cardData: WeatherCardCity & { tempCard?: boolean };
  cityId: number;
}) => {
  const { latitude, longitude, cityName } = cardData;

  const { data } = useCurrentWeather(latitude, longitude);
  const [panelIsOpen, setPanelIsOpen] = useState(false);
  if (!data)
    return (
      <div className={`dashboardWeatherCard `}>
        <div className='skyIcon'>
          {' '}
          <LoadingSpinner />
        </div>
      </div>
    );
  const { hours, minutes } = getTimeFromTimezone(data.timezone);
  const iconValues = getWeatherIconValues(data);

  return (
    <motion.button
      onClick={() => setPanelIsOpen((isOpen) => !isOpen)}
      className={`dashboardWeatherCard  ${cardData.tempCard && 'tempCard'}`}>
      <h3 className='title'>
        {maxNameLength(cityName, 13)} {hours}:{minutes}
      </h3>
      <WeatherIconContext.Provider value={{ ...iconValues, timezoneOffset: 0 }}>
        <div className='wrapper'>
          <CurrentWeatherIcon />
          <p className='temperature'>{iconValues.temp.toFixed(0)}&deg;C</p>
        </div>

        <AnimatePresence>
          {panelIsOpen && <DashboardWeatherCardPanel cityId={cityId} />}
        </AnimatePresence>
      </WeatherIconContext.Provider>
    </motion.button>
  );
};
