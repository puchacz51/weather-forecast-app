import { createContext, useContext } from 'react';
import { CurrentWeather } from '../WeatherTypes';
type WeatherIconParams = {
  skyContainer?: null | HTMLDivElement;
  groundContainer?: null | HTMLDivElement;
  isNight: boolean;
  cloudity: number;
  windSpeed: number;
  isSnowy: boolean;
  snow: number;
  rain: number;
};

type CurrentWeatherContextType = {
  weather: CurrentWeather;
  iconParams: WeatherIconParams;
};
type FiveDaysWeatherContextType = {
  weather: CurrentWeather;
  iconParams: WeatherIconParams;
};

export const WeatherContext = createContext<CurrentWeatherContextType>({
  weather: {} as CurrentWeather,
  iconParams: {
    skyContainer: null,
    groundContainer: null,
    cloudity: 0,
    isNight: false,
    windSpeed: 0,
    isSnowy: false,
    rain: 0,
    snow: 0,
  },
});
export const useWeatherContext = () =>
  useContext<FiveDaysWeatherContextType>(WeatherContext);
const fiveDaysWeatherContext = createContext<FiveDaysWeatherContextType | null>(
  null
);

const useFiveDaysWeatherContext = () =>
  useContext<FiveDaysWeatherContextType | null>(fiveDaysWeatherContext);
