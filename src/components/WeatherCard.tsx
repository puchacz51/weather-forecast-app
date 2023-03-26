import './styles/weatherCard.scss';
import { City,  } from '../utilities/type';
import { useCurrentWeather } from '../utilities/useWeather';
import { CgSpinnerAlt } from 'react-icons/cg';
import { CurrentWeatherIcon } from '../currentWeather/CurrentWeatherIcon';
import { useWaeatherStore } from '../store/store';
import { useWeatherContext, WeatherContext } from '../utilities/WeatherContext';
import { FaTemperatureHigh, FaWind } from 'react-icons/fa';
import { WiHumidity, WiBarometer } from 'react-icons/wi';
import { GiHeavyRain } from 'react-icons/gi';
import { IconType } from 'react-icons';
import { CurrentWeather } from '../WeatherTypes';
import { getCurrentWeatherIconValues } from '../utilities/getWeatherIconValues';

type WeatherValueProps = {
  name: string;
  value: number | string | null;
  unit: string;
  Icon: IconType;
};
const WeatherValue = ({ name, value, unit, Icon }: WeatherValueProps) => {
  return (
    <div className={`weatherValue`}>
      <div className='iconContainer '>
        <Icon className='icon' size='100%' />
      </div>
      <span className='name'>{name} : </span>
      <span className='value'>{`${value} ${unit}`}</span>
    </div>
  );
};

const WeatherValues = () => {
  const weatherData = useWeatherContext().weather;
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
    <div className='weatherValues'>
      <WeatherValue
        name='temperature'
        unit='*C'
        value={temp}
        Icon={FaTemperatureHigh}
      />
      <WeatherValue
        name='Humidity'
        unit='%'
        value={humidity}
        Icon={WiHumidity}
      />
      <WeatherValue
        name='pressure'
        unit='Hpa'
        value={pressure}
        Icon={WiBarometer}
      />
      <WeatherValue
        name='wind speed'
        unit='m/s'
        value={windSpeed}
        Icon={FaWind}
      />
      <WeatherValue
        name='precipitation'
        unit='mm'
        Icon={GiHeavyRain}
        value={(rain || 0) + (snow || 0)}
      />
    </div>
  );
};

export const CurrentWeatherCard = () => {
  const { selectedCity: city } = useWaeatherStore();
  const { city: name, longitude, latitude } = city as City;
  const { data: weatherData, isLoading } = useCurrentWeather(
    latitude,
    longitude
  );
  if (isLoading) return <CgSpinnerAlt />;
  if (!weatherData) return <p>undifined</p>;
  const { timezone } = weatherData;
  const currentTime = new Date(Date.now() - timezone * 1000);
  const [hours, minutes] = currentTime.toLocaleTimeString().split(':');
  const [day, month, year] = currentTime.toLocaleDateString().split('.');
  const iconValues = getCurrentWeatherIconValues(weatherData);
  return (
    <WeatherContext.Provider
      value={{
        weather: weatherData,
        iconParams: {
          skyContainer: null,
          groundContainer: null,
          ...iconValues,
        },
      }}>
      <div className='currentWeatherContainer'>
        <h3 className='cityName'>{name}</h3>
        <h4 className='cityTime'>
          {day}.{month}.{year} {hours}:{minutes}
        </h4>
        <CurrentWeatherIcon />
        <div className='iconContainer'></div>
        <WeatherValues />
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
