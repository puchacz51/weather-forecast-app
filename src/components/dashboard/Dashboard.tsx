import { useEffect, useState } from 'react';
import { CurrentWeather } from '../../WeatherTypes';
import { WeatherIconContext } from '../../utilities/WeatherContext';
import { getWeatherIconValues } from '../../utilities/getWeatherIconValues';
import { supabase } from '../../utilities/supabase/supabase';
import { CurrentWeatherIcon } from '../weatherCards/currentWeather/CurrentWeatherIcon';
import './dashboard.scss';
const testData = {
  coord: { lon: 18, lat: 53.12 },
  weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }],
  base: 'stations',
  main: {
    temp: 8.12,
    feels_like: 8.12,
    temp_min: 7.16,
    temp_max: 10.97,
    pressure: 1020,
    humidity: 81,
    sea_level: 21,
    grnd_level: 232,
  },
  visibility: 10000,
  wind: { speed: 1.03, deg: 110, gust: 3 },
  clouds: { all: 0 },
  dt: 1681158337,
  sys: {
    type: 1,
    id: 1688,
    country: 'PL',
    sunrise: 1681099281,
    sunset: 1681148224,
  },
  timezone: 7200,
  id: 3102014,
  name: 'Bydgoszcz',
  cod: 200,
} as CurrentWeather;

const DashBoardWeatherCard = () => {
  const iconValues = getWeatherIconValues(testData);
  return (
    <div className='dashboardWeatherCard'>
      <h3 className='title'>city name time</h3>
      <WeatherIconContext.Provider value={{...iconValues,timezoneOffset:0}}>
        <div className='wrapper'>
          <CurrentWeatherIcon />
          <p className='temperature'>{iconValues.temp.toFixed(0)}&deg;C</p>
        </div>
      </WeatherIconContext.Provider>
    </div>
  );
};

export const Dashboard = () => {


  //   const session = ;

  return (
    <div className='dashboard'>
      {/* <DashBoardWeatherCard /> */}
    </div>
  );
};
