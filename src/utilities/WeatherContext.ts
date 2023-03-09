import { createContext, useContext } from 'react';
import { CurrentWeather } from '../currentWeatherTypes';
type WeatherContextType = { weather: CurrentWeather };

export const WeatherContext = createContext<WeatherContextType>({
  weather: {} as CurrentWeather,
});
export const useWeatherContext = () =>
  useContext<WeatherContextType>(WeatherContext);
