import { WeatherIconContext } from '../../utilities/WeatherContext';
import { WeatherCardCity } from '../../utilities/useUserWeatherCard';
import { useFiveDaysWeather } from '../../utilities/useWeather';
import { SkyIcon } from '../weatherCards/iconComponents/SkyIcon';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiveDaysWeatherList } from '../weatherCards/fiveDaysWeather/FiveDaysWeatherList';
import {
  getTimeFromTimezone,
  getWeatherIconValues,
} from '../../utilities/getWeatherIconValues';
export const DashBoardFiveDaysWeatherCard = ({
  cardData,
}: {
  cardData: WeatherCardCity & { tempCard?: boolean };
}) => {
  const { latitude, longitude, cityName } = cardData;
  const { data, isFetching, isError } = useFiveDaysWeather(latitude, longitude);
  const [selectedWeatherDate, setSelectedWeatherDate] = useState(0);

  if (!data) return <>loading</>;
  const { hours, minutes } = getTimeFromTimezone(data.city.timezone);
  const iconValues = getWeatherIconValues(data.list[selectedWeatherDate]);
  return (
    <Link
      to={`/weather/${cardData.cityId}/current`}
      className={`dashboardWeatherCard  ${cardData.tempCard && 'tempCard'}`}>
      <h3 className='title'>
        {cityName} {hours}:{minutes}
      </h3>
      <WeatherIconContext.Provider value={{ ...iconValues, timezoneOffset: 0 }}>
        <div className='wrapper'>
          <SkyIcon />
          <FiveDaysWeatherList
            selectDate={setSelectedWeatherDate}
            selectedDate={selectedWeatherDate}
            weatherList={data?.list}
          />

          <p className='temperature'>{iconValues.temp.toFixed(0)}&deg;C</p>
        </div>
      </WeatherIconContext.Provider>
    </Link>
  );
};
