import './fiveDaysWeatherCard.scss';
import { SkyIcon } from '../iconComponents/SkyIcon';
import { useState } from 'react';
import { WeatherIconContext } from '../../../utilities/WeatherContext';
import { getWeatherIconValues } from '../../../utilities/getWeatherIconValues';
import { FiveDaysWeatherList } from './FiveDaysWeatherList';
import { WeatherValues } from '../WeatherValues';
import { City } from '../../../utilities/type';
import { useWaeatherStore } from '../../../store/store';
import { useFiveDaysWeather } from '../../../utilities/useWeather';

export const FiveDaysWeatherCard = () => {
  const { selectedCity: city } = useWaeatherStore();
  const { city: name, latitude: lat, longitude: lon } = city as City;
  const [selectedWeatherDate, setSelectedWeatherDate] = useState(0);
  const { data, isLoading } = useFiveDaysWeather(lat, lon);

  if (isLoading)
    return (
      <div className='fiveDaysWeatherCard weatherContainer'>...loading</div>
    );
  if (!data)
    return <div className='fiveDaysWeatherCard weatherContainer'>error</div>;
  const iconsParams = getWeatherIconValues(data.list[selectedWeatherDate]);
  return (
    <div className='fiveDaysWeatherCard weatherContainer'>
      <WeatherIconContext.Provider value={iconsParams}>
        <h3 className='cityName'>{name}</h3>
        <SkyIcon />
        <FiveDaysWeatherList
          selectDate={setSelectedWeatherDate}
          selectedDate={selectedWeatherDate}
          weatherList={data?.list}
        />
        <WeatherValues />
      </WeatherIconContext.Provider>
    </div>
  );
};
