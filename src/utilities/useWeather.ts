import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { CurrentWeather } from '../currentWeatherTypes';
import { WeatherObjectResult, WeatherArray } from './type';

const optionsCurrentWeather = {
  method: 'GET',

  // url: 'http://localhost:3001/weather',
  url: 'https://api.openweathermap.org/data/2.5/weather',
  headers: {
    'X-RapidAPI-Key': '290c6e5969msh1d1d0b23988287ap1fa071jsne3c2c553ced1',
    'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
  },
};

type CoOrdinates = {
  params: { lon: number; lat: number };
};

const fetchCurrentWeather = async (
  coOrdinates: CoOrdinates
): Promise<CurrentWeather> => {
  const {
    params: { lon, lat },
  } = coOrdinates;

  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=8e4692783e3f92b0865c106b3d2a3681`
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};

type UseWeather = (
  lon: number,
  lat: number
) => UseQueryResult<CurrentWeather[]>;
type UseCurrentWeather = (
  lon: number,
  lat: number
) => UseQueryResult<CurrentWeather>;

// const useWeather: UseWeather = (lat, lon) => {
//   const params = { params: { lat: lat, lon: lon } };
//   return useQuery<CurrentWeather[]>([lat, lon], () =>
//     fetchCurrentWeather(params)
//   );
// };

const useCurrentWeather: UseCurrentWeather = (lat, lon) => {
  const params = { params: { lat: lat, lon: lon } };
  return useQuery<CurrentWeather>([lat, lon], () =>
    fetchCurrentWeather(params)
  );
};

export { useCurrentWeather };

// const options = {
//   method: 'GET',
//   // url: 'http://localhost:3001/weather',
//   url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly',
//   headers: {
//     'X-RapidAPI-Key': '290c6e5969msh1d1d0b23988287ap1fa071jsne3c2c553ced1',
//     'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
//   },
// };