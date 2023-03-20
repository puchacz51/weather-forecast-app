import { createContext, useContext } from 'react';
import { CurrentWeather } from '../currentWeatherTypes';
type WeatherContextType = {
  weather: CurrentWeather;
  iconParams: {
    skyContainer: null | HTMLDivElement;
    groundContainer: null | HTMLDivElement;
    isNight: boolean;
    cloudity: number;
    windSpeed: number;
    isSnowy: boolean;
    snow: number;
    rain: number;
  };
};

export const WeatherContext = createContext<WeatherContextType>({
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
  useContext<WeatherContextType>(WeatherContext);
