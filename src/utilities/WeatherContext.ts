import { createContext, useContext } from 'react';
import { CurrentWeather, FiveDaysWeatherElement } from '../WeatherTypes';
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
  weather: FiveDaysWeatherElement;
  iconParams: WeatherIconParams;
};
type IconContextType = {
  isNight: boolean;
  cloudity: number;
  windSpeed: number;
  isSnowy: boolean;
  snow: number;
  rain: number;
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
  useContext<CurrentWeatherContextType>(WeatherContext);
export const FiveDaysWeatherContext = createContext<FiveDaysWeatherContextType>(
  {
    weather: {} as FiveDaysWeatherElement,
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
  }
);

export const WeatherIconContext = createContext<IconContextType>({
  isNight: false,
  cloudity: 0,
  windSpeed: 0,
  isSnowy: false,
  rain: 0,
  snow: 0,
});
export const useWaetherIconContext = () =>
  useContext<IconContextType>(WeatherIconContext);
export const useFiveDaysWeatherContext = () =>
  useContext<FiveDaysWeatherContextType>(FiveDaysWeatherContext);
