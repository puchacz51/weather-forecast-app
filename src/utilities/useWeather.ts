import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { CurrentWeather } from '../currentWeatherTypes';

type CoOrdinates = {
  params: { lon: number; lat: number };
};

const fetchMockWeather = async () => {
  const res = await axios.get(` http://localhost:3001/weather/1`);
  return res.data;
};

const testFetch = (time: number): Promise<CurrentWeather> =>
  new Promise((resolve, rejects) => {
    setTimeout(async () => {
      resolve(await fetchMockWeather());
    }, time);
  });
const fetchCurrentWeather = async (
  coOrdinates: CoOrdinates
): Promise<CurrentWeather> => {
  const {
    params: { lon, lat },
  } = coOrdinates;
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=8e4692783e3f92b0865c106b3d2a3681`
  );
  return res.data;
};

type UseWeather = (
  lon: number,
  lat: number
) => UseQueryResult<CurrentWeather[]>;
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

export { useCurrentWeather };
