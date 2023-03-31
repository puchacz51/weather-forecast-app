import { dataForWeather } from './data5';
import './fiveDaysWeatherCard.scss';
import { SkyIcon } from '../iconComponents/SkyIcon';
import { useState } from 'react';
import { WeatherIconContext } from '../../../utilities/WeatherContext';
import { getWeatherIconValues } from '../../../utilities/getWeatherIconValues';
import { FiveDaysWeatherList } from './FiveDaysWeatherList';
import { WeatherValues } from '../WeatherValues';
import { City } from '../../../utilities/type';
import { useWaeatherStore } from '../../../store/store';

export const FiveDaysWeatherCard = () => {
  const { selectedCity: city } = useWaeatherStore();
  const { city: name } = city as City;
  const [selectedWeatherDate, setSelectedWeatherDate] = useState(0);
  const [weather5days] = useState(dataForWeather);
  const iconsParams = getWeatherIconValues(
    weather5days.list[selectedWeatherDate]
  );

  return (
    <div className='fiveDaysWeatherCard weatherContainer'>
      <WeatherIconContext.Provider value={iconsParams}>
        <h3 className='cityName'>{name}</h3>

        <SkyIcon />

        <FiveDaysWeatherList
          selectDate={setSelectedWeatherDate}
          weatherList={weather5days.list}
        />

        <WeatherValues />
      </WeatherIconContext.Provider>
    </div>
  );
};
