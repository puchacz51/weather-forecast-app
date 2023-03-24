import { CurrentWeather } from "../WeatherTypes";

export const getCurrentWeatherIconValues = (weatherObject: CurrentWeather) => {
  const {
    weather,
    wind,
    clouds,
    main: { temp, snow, rain },
  } = weatherObject;

  const { speed } = wind;
  const { icon } = weather[0];
  const { all: cloudity } = clouds;
  const isNight = icon.includes('n');
  const windSpeed = Math.min(100, Math.ceil(speed));
  const isSnowy = temp < 0 && snow ? true : false;

  return {
    isSnowy,
    cloudity,
    windSpeed,
    isNight,
    snow: snow || 0,
    rain: rain || 0,
  };
};
