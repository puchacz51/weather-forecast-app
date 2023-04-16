import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { CurrentWeather, FiveDaysWeather } from '../WeatherTypes';

type CoOrdinates = {
  params: { lon: number; lat: number };
};

const fetchCurrentWeather = async (
  coOrdinates: CoOrdinates
): Promise<CurrentWeather> => {
  const {
    params: { lon, lat },
  } = coOrdinates;
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
  );
  return res.data;
};

const fetchFiveDaysWeather = async (
  coOrdinates: CoOrdinates
): Promise<FiveDaysWeather> => {
  const {
    params: { lon, lat },
  } = coOrdinates;
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
  );

  return res.data;
};

type UseFiveDaysWeather = (
  lon: number,
  lat: number
) => UseQueryResult<FiveDaysWeather>;
type UseCurrentWeather = (
  lon: number,
  lat: number
) => UseQueryResult<CurrentWeather>;

const useCurrentWeather: UseCurrentWeather = (lat, lon) => {
  const params = { params: { lat: lat, lon: lon } };
  return useQuery<CurrentWeather>(
    [lon, lat],
    () => fetchCurrentWeather(params),
    {}
  );
};

export const useFiveDaysWeather: UseFiveDaysWeather = (lat, lon) => {
  const params = { params: { lat: lat, lon: lon } };
  return useQuery<FiveDaysWeather>(
    [lon, lat, '5Days'],
    () => fetchFiveDaysWeather(params),
    {}
  );
};
export { useCurrentWeather };
