import { dataForWeather } from './data5';
import './fiveDaysWeatherCard.scss';
import { FiveDaysWeatherIcon } from './FIveDaysWeatherIcon';
import { useState, useContext } from 'react';
import { FiveDaysWeather } from '../../WeatherTypes';



export const FiveDaysWeatherCard = () => {
  const weather = dataForWeather;
  const [selectedWeatherDate, setSelectedWeatherDate] = useState();
  const [weather5days] = useState(dataForWeather);

  return (
    <div className='fiveDaysWeatherCard'>
      <FiveDaysWeatherIcon />
    </div>
  );
};
