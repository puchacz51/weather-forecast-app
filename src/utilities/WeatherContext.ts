import { createContext, useContext } from 'react';

type IconContextType = {
  isNight: boolean;
  cloudity: number;
  windSpeed: number;
  isSnowy: boolean;
  snow: number;
  rain: number;
  windDeg: number;
  humidity: number;
  pressure: number;
  temp: number;
};

export const WeatherIconContext = createContext<IconContextType>({
  isNight: false,
  cloudity: 0,
  windSpeed: 0,
  isSnowy: false,
  rain: 0,
  snow: 0,
  windDeg: 0,
  humidity: 0,
  pressure: 0,
  temp: 0,
});
export const useWaetherIconContext = () =>
  useContext<IconContextType>(WeatherIconContext);
