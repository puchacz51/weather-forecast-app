import './fiveDaysWeatherCard.scss';
import { SkyIcon } from '../iconComponents/SkyIcon';
import { useState } from 'react';
import { WeatherIconContext } from '../../../utilities/WeatherContext';
import { getWeatherIconValues } from '../../../utilities/getWeatherIconValues';
import { FiveDaysWeatherList } from './FiveDaysWeatherList';
import { WeatherValues } from '../WeatherValues';
import { City } from '../../../utilities/type';
import { useWaeatherStore } from '../../../store/store';
import { CgSpinnerAlt } from 'react-icons/cg';
import { useFiveDaysWeather } from '../../../utilities/useWeather';
import { useLocation, useNavigate } from 'react-router-dom';

export const FiveDaysWeatherCard = () => {
  const { selectedCity: city, setSelectedWeatherType } = useWaeatherStore();
  const { city: name, latitude: lat, longitude: lon } = city as City;

  const [selectedWeatherDate, setSelectedWeatherDate] = useState(0);
  const { data, isLoading } = useFiveDaysWeather(lat, lon);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  if (isLoading)
    return (
      <div className='currentWeather weatherContainer'>
        <div className='title'>
          <h3 className='cityName'>{name}</h3>
        </div>
        <div className='wrapperLoadingIcon'>
          <CgSpinnerAlt className='loadingIcon' />
        </div>
      </div>
    );
  if (!data)
    return <div className='fiveDaysWeatherCard weatherContainer'>error</div>;
  const iconsParams = getWeatherIconValues(data.list[selectedWeatherDate]);
  return (
    <div className='fiveDaysWeatherCard weatherContainer'>
      <WeatherIconContext.Provider
        value={{ ...iconsParams, timezoneOffset: data.city.timezone }}>
        <div className='title'>
          <h3 className='cityName'>{name}</h3>
        </div>
        <SkyIcon />
        <FiveDaysWeatherList
          selectDate={setSelectedWeatherDate}
          selectedDate={selectedWeatherDate}
          weatherList={data?.list}
        />
        <WeatherValues />
      </WeatherIconContext.Provider>
      <button
        className='selectWaetherTypeButton'
        onClick={() => navigate(pathname.replace('5days', 'current'))}>
        current weather
      </button>
    </div>
  );
};
