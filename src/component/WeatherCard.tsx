import { City, WeatherObjectResult } from '../utilities/type';
import { useCurrentWeather } from '../utilities/useWeather';
import { CgSpinnerAlt } from 'react-icons/cg';
import { CurrentWeatherIcon } from '../iconsSelector/parameters';

export const CurrentWeatherCard = ({ city }: { city: City }) => {
  const { city: name, longitude, latitude } = city;

  const {
    data: weatherData,
    status,
    error,
    isLoading,
  } = useCurrentWeather(longitude || 18, latitude || 53);

  if (!weatherData) return <p>undifined</p>;

  const {
    weather: [sky],
    sys: { sunrise, sunset },
    clouds,
    timezone,
    wind,
    main,
  } = weatherData;
  const { temp, humidity, pressure, rain, snow } = main;

  const { deg: windDeg, speed: windSpeed } = wind;
  return (
    <div className='currentWeatherContainer'>
      <h3 className='cityName'>{name}</h3>
      <CurrentWeatherIcon currentWeather={weatherData} />
      <div className='iconContainer'></div>
      <div className='description'>
        <p>Temperature: {temp}*C</p>
        <p>Humidity: {humidity}%</p>
        <p>Atmospheric pressure: {pressure} HPa</p>
        <p>wind speed: {windSpeed} m/s</p>
        <p>rain {rain || 0} mm</p>
        {snow && <p>snow:{snow} </p>}
      </div>
    </div>
  );
};

// const CityWeatherCard = ({ city }: { city: City }) => {
//   const { city: name, longitude, latitude } = city;

//   const {
//     data: weather,
//     status,
//     error,
//     isLoading,
//   } = useWeather(longitude, latitude);

//   if (isLoading || !weather)
//     return (
//       <div className='WeatherCardLoaded'>
//         dssd
//         <CgSpinnerAlt />
//       </div>
//     );
//   const [currentWeather, weatherDays] = weather;
//   return (
//     <div className='WeatherCard'>
//       <h3 className='title'>{name}</h3>
//       {/* <p>{currentWeather.temp}</p> */}
//       <DayWeatherList />
//     </div>
//   );
// };

export const DayWeatherList = () => {
  return (
    <div className='DayWeatherList'>
      <DayWeatherItem />
    </div>
  );
};
const DayWeatherItem = () => {
  return (
    <div className='DayWeatherItem'>
      <img src='./icons/c01d.png' alt='weatherIcon' />
    </div>
  );
};
