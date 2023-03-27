import { dataForWeather } from './data5';
import './fiveDaysWeatherCard.scss';
import { SkyIcon } from '../iconComponents/SkyIcon';
import { useState } from 'react';
import { FiveDaysWeatherElement } from '../../WeatherTypes';
import {
  WeatherIconContext,
} from '../../utilities/WeatherContext';
import { getWeatherIconValues } from '../../utilities/getWeatherIconValues';
import { FiveDaysWeatherList } from './FiveDaysWeatherList';

const FiveDaysWeatherParams = ({
  weather,
}: {
  weather: FiveDaysWeatherElement;
}) => {
  const {
    clouds: { all: cloudity },
    rain = { '3h': 0 },
    snow = { '3h': 0 },
  } = weather;
  return (
    <div className='fiveDaysWeatherParams'>
      <span>cloudity: {cloudity}</span>
      <span>rain: {rain['3h']}</span>
      <span>snow: {snow['3h']}</span>
    </div>
  );
};

export const FiveDaysWeatherCard = () => {
  const [selectedWeatherDate, setSelectedWeatherDate] = useState(0);
  const [weather5days] = useState(dataForWeather);
  const iconsParams = getWeatherIconValues(
    weather5days.list[selectedWeatherDate],
    'fiveDaysWeather'
  );

  return (
    <div className='fiveDaysWeatherCard'>
      <WeatherIconContext.Provider value={iconsParams}>
        <SkyIcon />
      </WeatherIconContext.Provider>

      <FiveDaysWeatherList
        selectDate={setSelectedWeatherDate}
        weatherList={weather5days.list}
      />
      <FiveDaysWeatherParams weather={weather5days.list[selectedWeatherDate]} />
    </div>
  );
};
