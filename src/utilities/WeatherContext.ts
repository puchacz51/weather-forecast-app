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
  },
});
export const useWeatherContext = () =>
  useContext<WeatherContextType>(WeatherContext);
