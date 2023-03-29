import {
  CurrentWeather,
  FiveDaysWeather,
  FiveDaysWeatherElement,
} from '../WeatherTypes';

export const getPrecitipation = (
  waetherObject: FiveDaysWeatherElement | CurrentWeather
) => {
  let rain = 0;
  let snow = 0;
  rain += waetherObject?.rain?.['3h'] || 0;
  rain += waetherObject?.rain?.['1h'] || 0;
  snow += waetherObject?.snow?.['3h'] || 0;
  snow += waetherObject?.snow?.['1h'] || 0;
  return { rain, snow };
};

export const getWeatherIconValues = (
  weatherObject: CurrentWeather | FiveDaysWeatherElement
) => {
  const {
    wind,
    clouds,
    main: { temp },
    dt,
    sys,
  } = weatherObject;
  const { sunrise, sunset } = sys;

  const { snow, rain } = getPrecitipation(weatherObject);

  const { speed } = wind;
  const { all: cloudity } = clouds;
  const isNight = dt < sunrise || dt > sunset;
  const windSpeed = Math.min(100, Math.ceil(speed));
  const isSnowy = temp < 0 && snow ? true : false;

  return {
    isSnowy,
    cloudity,
    windSpeed,
    isNight,
    snow,
    rain,
  };
};

export const getAmountOfClouds = (cloudity: number) => {
  const cloudsAmount = Math.min(3, Math.round((cloudity + 5) / 33));

  return cloudsAmount;
};
