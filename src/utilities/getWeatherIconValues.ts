import { CurrentWeather, FiveDaysWeatherElement } from '../WeatherTypes';

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
  const { wind, clouds, main, dt, sys } = weatherObject;
  const { snow, rain } = getPrecitipation(weatherObject);
  const { speed, deg: windDeg } = wind;
  const { all: cloudity } = clouds;
  const { temp, humidity, pressure } = main;
  let isNight;
  if ('sunrise' in sys) {
    const { sunrise, sunset } = sys;

    isNight = dt < sunrise || dt > sunset;
  } else {
    weatherObject as FiveDaysWeatherElement;
    isNight = sys?.pod === 'n';
  }
  const windSpeed = Math.min(100, Math.ceil(speed));
  const isSnowy = temp < 0 && snow ? true : false;

  return {
    isSnowy,
    cloudity,
    windSpeed,
    isNight,
    snow,
    rain,
    windDeg,
    humidity,
    pressure,
    temp,
  };
};

export const getAmountOfClouds = (cloudity: number) => {
  const cloudsAmount = Math.min(3, Math.round((cloudity + 5) / 33));

  return cloudsAmount;
};

export const getTimeFromTimezone = (timezone: number, myDate = new Date()) => {
  // const myDate = new Date();
  const utc = new Date(myDate.getTime() + myDate.getTimezoneOffset() * 60000);
  const currentTime = new Date(utc.getTime() + timezone * 1000);
  const [hours, minutes] = currentTime.toLocaleTimeString().split(':');
  const [day, month, year] = currentTime.toLocaleDateString().split('.');

  const dayName = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
  });
  const dayNameShort = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
  });
  return { hours, minutes, day, month, year, dayName, dayNameShort };
};

// export const getDate
