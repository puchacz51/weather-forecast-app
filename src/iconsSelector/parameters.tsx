import { RiTempHotLine } from 'react-icons/ri';
import { BsSunrise, BsSunset } from 'react-icons/bs';
import { WiStrongWind } from 'react-icons/wi';
import { AiFillCloud } from 'react-icons/ai';
import { CurrentWeather } from '../currentWeatherTypes';
import { useState } from 'react';
import { Clouds, WeatherObject } from './skyIcons';
import { useWeatherContext } from '../utilities/WeatherContext';

type IconProps = {
  children?: React.ReactNode | React.ReactNode[];
};

const IconBackGround: React.FC<IconProps> = ({ children }) => {
  const {
    sys: { sunrise, sunset },
  } = useWeatherContext().weather;

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

export const CurrentWeatherIcon = () => {
  const { Cloud, Sun, Wind, Snow, Moon } = WeatherObject;

  return (
    <IconBackGround>
      <div className='sky'>
        <Clouds cloudity={5} />
        <Sun />
      </div>
      <div className='ground'></div>
    </IconBackGround>
  );
};
