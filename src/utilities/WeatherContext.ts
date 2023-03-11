import { createContext, useContext } from 'react';
import { CurrentWeather } from '../currentWeatherTypes';
type WeatherContextType = {
  weather: CurrentWeather;
  iconParams: { skyContainer: null; groundContainer: null };
};

export const WeatherContext = createContext<WeatherContextType>({
  weather: {} as CurrentWeather,
  iconParams: { skyContainer: null, groundContainer: null },
});
export const useWeatherContext = () =>
  useContext<WeatherContextType>(WeatherContext);
