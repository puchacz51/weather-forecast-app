
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { WeatherObjectResult } from './type';
const options = {
  method: 'GET',
  url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily',
  headers: {
    'X-RapidAPI-Key': '290c6e5969msh1d1d0b23988287ap1fa071jsne3c2c553ced1',
    'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
  },
};

type CoOrdinates = {
  params: { lon: number; lat: number };
};

const fetchWeather = async (
  coOrdinates: CoOrdinates
): Promise<WeatherObjectResult> => {
  try {
    const res = await axios.request({ ...options, ...coOrdinates });
    return res.data;
  } catch (err) {
    throw err;
  }
};

type UseWeather = (lon: number, lat: number) => UseQueryResult<WeatherObjectResult>;

const useWeather: UseWeather = (lat, lon) => {
  const params = { params: { lat: lat, lon: lon } };
  return useQuery<WeatherObjectResult>([lat, lon], () => fetchWeather(params));
};
export { useWeather };
