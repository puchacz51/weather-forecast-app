import { RiTempHotLine } from 'react-icons/ri';
import {
  BsSunrise,
  BsSunset,
  BsSunFill,
  BsSnow,
  BsFillCloudSnowFill,
  BsMoonFill,
} from 'react-icons/bs';
import { WiStrongWind, WiRaindrop } from 'react-icons/wi';
import { AiFillCloud } from 'react-icons/ai';
import { HiCloud } from 'react-icons/hi';
import { CurrentWeather } from '../currentWeatherTypes';
import { useState } from 'react';
import { motion } from 'framer-motion';

export const parametersICons = {
  temp: RiTempHotLine,
  sunset: BsSunset,
  sunrise: BsSunrise,
  wind: WiStrongWind,
  cloud: AiFillCloud,
};
export const WeatherObject = {
  Cloud: ({ className }: any) => (
    <div className={className}>
      <motion.div>
        <HiCloud />
      </motion.div>
    </div>
  ),
  Sun: BsSunFill,
  Wind: WiStrongWind,
  Snow: BsSnow,
  RainyCloud: BsFillCloudSnowFill,
  Moon: BsMoonFill,
  RainDrop: WiRaindrop,
};

export const CurrentWeatherIcon = ({
  currentWeather,
}: {
  currentWeather: CurrentWeather;
}) => {
  const { Cloud, Sun, Wind, Snow, Moon } = WeatherObject;

  return (
    <div className='CurrentWeatherIconContainer'>
      <Clouds cloudity={80} />
      <Sun className='sun' />
    </div>
  );
};

const Clouds = ({ cloudity }: { cloudity: number }) => {
  const [amountOfClouds] = useState(Math.round((cloudity + 10) / 25));

  const Cloud = WeatherObject.Cloud;
  if (amountOfClouds === 0) return <></>;
  if (amountOfClouds === 1)
    return (
      <Cloud className='cloud ' style={{ transform: 'translate(-50%,-50%)' }} />
    );
  if (amountOfClouds === 2)
    return (
      <>
        <Cloud
          className='cloud'
          style={{ transform: 'translate(-20%,-50%)' }}
        />
        <Cloud
          className='cloud'
          style={{ transform: 'translate(-80%,-50%)' }}
        />
      </>
    );
  if (amountOfClouds === 3)
    return (
      <>
        <Cloud
          className='cloud'
          style={{ transform: 'translate(-100%,-50%)' }}
        />
        <Cloud className='cloud' style={{ transform: 'translate(0%,-50%)' }} />
        <Cloud
          className='cloud'
          style={{ transform: 'translate(-50%,-55%)', color: 'white' }}
        />
      </>
    );
  else
    return (
      <>
        <Cloud
          className='cloud'
          style={{ transform: 'translate(-100%,-50%)' }}
        />
        <Cloud className='cloud' style={{ transform: 'translate(0%,-50%)' }} />

        <Cloud
          className='cloud'
          style={{ transform: 'translate(-50%,-70%)', color: 'white' }}
        />
      </>
    );
};
