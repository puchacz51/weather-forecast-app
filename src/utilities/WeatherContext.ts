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

export const useFiveDaysWeatherContext = () =>
  useContext<FiveDaysWeatherContextType>(FiveDaysWeatherContext);
