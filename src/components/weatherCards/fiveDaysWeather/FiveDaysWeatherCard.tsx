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
import { dataForWeather } from './data5';
import { useFiveDaysWeather } from '../../../utilities/useWeather';

export const FiveDaysWeatherCard = () => {
  const { selectedCity: city, setSelectedWeatherType } = useWaeatherStore();
  const { city: name, latitude: lat, longitude: lon } = city as City;
  const [selectedWeatherDate, setSelectedWeatherDate] = useState(0);
  const { data, isLoading } = useFiveDaysWeather(lat, lon);
  // const city = { city: 'testowe', longitude: 41, latitude: 30 };
  // const city = { city: 'testowe', longitude: 41, latitude: 30 };

  // const { city: name, longitude, latitude } = city as City;
  // const isLoading = false;
  // const data = dataForWeather;
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
      <WeatherIconContext.Provider value={iconsParams}>
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
        onClick={() => setSelectedWeatherType('CURRENT')}>
        current weather
      </button>
    </div>
  );
};
