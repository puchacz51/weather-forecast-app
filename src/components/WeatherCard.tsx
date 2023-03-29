import './styles/weatherCard.scss';
import { City } from '../utilities/type';
import { useCurrentWeather } from '../utilities/useWeather';
import { CgSpinnerAlt } from 'react-icons/cg';
import { CurrentWeatherIcon } from '../currentWeather/CurrentWeatherIcon';
import { useWaeatherStore } from '../store/store';
import {
  useWeatherContext,
  WeatherContext,
  WeatherIconContext,
  useWaetherIconContext,
} from '../utilities/WeatherContext';
import { FaTemperatureHigh, FaWind } from 'react-icons/fa';
import { WiHumidity, WiBarometer } from 'react-icons/wi';
import { GiHeavyRain } from 'react-icons/gi';
import { IconType } from 'react-icons';
// import { CurrentWeather } from '../WeatherTypes';
import {
  getPrecitipation,
  getWeatherIconValues,
} from '../utilities/getWeatherIconValues';
import { CurrentWeather } from '../WeatherTypes';
import { BsFillCloudsFill } from 'react-icons/bs';

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

const WeatherValues = ({ weatherData }: { weatherData: CurrentWeather }) => {
  const {
    weather: [sky],
    sys: { sunrise, sunset },
    clouds: { all: cloudity },
    timezone,
    wind,
    main,
  } = weatherData;
  const { temp, humidity, pressure } = main;
  const { deg: windDeg, speed: windSpeed } = wind;
  const { rain, snow } = getPrecitipation(weatherData);
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
      <WeatherValue
        name='cloudity'
        unit='%'
        Icon={BsFillCloudsFill}
        value={cloudity}
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
  const iconValues = getWeatherIconValues(weatherData);
  return (
    <div className='currentWeatherContainer'>
      <h3 className='cityName'>{name}</h3>
      <h4 className='cityTime'>
        {day}.{month}.{year} {hours}:{minutes}
      </h4>
      <WeatherIconContext.Provider value={iconValues}>
        <CurrentWeatherIcon />
      </WeatherIconContext.Provider>
      {/* <WeatherValues /> */}
      <WeatherValues weatherData={weatherData} />
    </div>
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
