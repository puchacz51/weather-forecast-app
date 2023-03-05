import { RiTempHotLine } from 'react-icons/ri';
import {
  BsSunrise,
  BsSunset,
} from 'react-icons/bs';
import { WiStrongWind } from 'react-icons/wi';
import { AiFillCloud } from 'react-icons/ai';
import { CurrentWeather } from '../currentWeatherTypes';
import {  useState } from 'react';
import { WeatherObject } from './skyIcons';

type IconProps = {
  weather: CurrentWeather;
  children?: React.ReactNode | React.ReactNode[];
};

const IconBackGround: React.FC<IconProps> = ({ children, weather }) => {
  const {
    sys: { sunrise, sunset },
  } = weather;

  const classes: string[] = ['CurrentWeatherIconContainer'];
  // const currentTime = new Date().getTime();
  const currentTime = 1677648999;

  if (sunrise > currentTime || sunset < currentTime) {
    classes.push('night');
  }

  return <div className={classes.join(' ')}>{children}</div>;
};

export const parametersICons = {
  temp: RiTempHotLine,
  sunset: BsSunset,
  sunrise: BsSunrise,
  wind: WiStrongWind,
  cloud: AiFillCloud,
};

export const CurrentWeatherIcon = ({
  currentWeather,
}: {
  currentWeather: CurrentWeather;
}) => {
  const { Cloud, Sun, Wind, Snow, Moon } = WeatherObject;

  return (
    <IconBackGround weather={currentWeather}>
      <div className='sky'>
        <Clouds cloudity={80} />
        <Sun  />
      </div>
      <div className='ground'></div>
    </IconBackGround>
  );
};

const Clouds = ({ cloudity }: { cloudity: number }) => {
  const [amountOfClouds] = useState(Math.round((cloudity + 10) / 25));

  const Cloud = WeatherObject.Cloud;
  if (amountOfClouds === 0) return <></>;
  if (amountOfClouds === 1)
    return (
      <div className='cloudContainer'>
        <Cloud className='cloud ' />
      </div>
    );
  if (amountOfClouds === 2)
    return (
      <div className='cloudsContainer'>
        <Cloud className='cloud' />
        <Cloud className='cloud' />
      </div>
    );
  if (amountOfClouds === 3)
    return (
      <div className='cloudsContainer'>
        <Cloud
          className='cloud'
          style={{ transform: 'translate(-100%,-50%)' }}
        />
        <Cloud className='cloud' style={{ transform: 'translate(0%,-50%)' }} />
        <Cloud
          className='cloud'
          style={{ transform: 'translate(-50%,-55%)', color: 'white' }}
        />
      </div>
    );
  else
    return (
      <div className='cloudsContainer'>
        <Cloud
          className='cloud'
          style={{ transform: 'translate(-100%,-50%)' }}
        />
        <Cloud className='cloud' style={{ transform: 'translate(0%,-50%)' }} />

        <Cloud
          className='cloud'
          style={{ transform: 'translate(-50%,-70%)', color: 'white' }}
        />
      </div>
    );
};
