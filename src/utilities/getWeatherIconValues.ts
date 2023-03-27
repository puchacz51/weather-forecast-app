import {
  CurrentWeather,
  FiveDaysWeather,
  FiveDaysWeatherElement,
} from '../WeatherTypes';

export const getWeatherIconValues = (
  weatherObject: CurrentWeather | FiveDaysWeatherElement,
  type: 'currentWeather' | 'fiveDaysWeather'
) => {
  const {
    wind,
    clouds,
    main: { temp },
    main,
    dt,
    sys,
  } = weatherObject;
  const { sunrise, sunset } = sys;
  let snowQuantity;
  let rainQuantity;
  if (type == 'fiveDaysWeather') {
    const { rain, snow } = weatherObject as FiveDaysWeatherElement;
    rainQuantity = rain?.['3h'] || 0;
    snowQuantity = snow?.['3h'] || 0;
  } else {
    const { snow, rain } = main;
    rainQuantity = rain || 0;
    snowQuantity = snow || 0;
  }
  const { speed } = wind;
  const { all: cloudity } = clouds;
  const isNight = dt < sunrise || dt > sunset;
  console.log(sunrise, dt, sunset,dt < sunrise , dt > sunset);

  const windSpeed = Math.min(100, Math.ceil(speed));
  const isSnowy = temp < 0 && snowQuantity ? true : false;

  return {
    isSnowy,
    cloudity,
    windSpeed,
    isNight,
    snow: snowQuantity,
    rain: rainQuantity,
  };
};

export const getAmountOfClouds = (cloudity: number) => {
  const cloudsAmount = Math.min(3, Math.round((cloudity + 5) / 33));

  return cloudsAmount;
};
// export const getFiveDaysWeatherIconValues = (
//   weatherObject: FiveDaysWeatherElement
// ) => {
//   const {
//     weather,
//     wind,
//     clouds,
//     main: { temp, snow, rain },
//   } = weatherObject;

//   const { speed } = wind;
//   const { icon } = weather[0];
//   const { all: cloudity } = clouds;
//   const isNight = icon.includes('n');
//   const windSpeed = Math.min(100, Math.ceil(speed));
//   const isSnowy = temp < 0 && snow ? true : false;

//   return {
//     isSnowy,
//     cloudity,
//     windSpeed,
//     isNight,
//     snow: snow || 0,
//     rain: rain || 0,
//   };
// };
