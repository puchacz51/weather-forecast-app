import './styles/weatherCard.scss';
import { City, WeatherObjectResult } from '../utilities/type';
import { useCurrentWeather } from '../utilities/useWeather';
import { CgSpinnerAlt } from 'react-icons/cg';
import { CurrentWeatherIcon } from '../iconsSelector/parameters';
import { useWaeatherStore } from '../store/store';
import { WeatherContext } from '../utilities/WeatherContext';

export const CurrentWeatherCard = () => {
  const { selectedCity: city } = useWaeatherStore();
  const { city: name, longitude, latitude } = city as City;
  const {
    data: weatherData,
    status,
    error,
    isLoading,
  } = useCurrentWeather(latitude, longitude);

  if (isLoading) return <CgSpinnerAlt />;
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
    <WeatherContext.Provider
      value={{
        weather: weatherData,
        iconParams: { skyContainer: null, groundContainer: null },
      }}>
      <div className='currentWeatherContainer'>
        <h3 className='cityName'>{name}</h3>
        <CurrentWeatherIcon />
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
    </WeatherContext.Provider>
  );
};



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
