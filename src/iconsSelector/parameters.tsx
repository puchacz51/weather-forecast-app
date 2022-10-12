import { RiTempHotLine } from 'react-icons/ri';
import {
  BsSunrise,
  BsSunset,
  BsSunFill,
  BsSnow,
  BsFillCloudSnowFill,
  BsMoonFill,
} from 'react-icons/bs';
import { WiStrongWind } from 'react-icons/wi';
import { AiFillCloud } from 'react-icons/ai';
import { HiCloud } from 'react-icons/hi';
import { CurrentWeather } from '../currentWeatherTypes';
import { useState } from 'react';
import { transform } from 'typescript';
export const parametersICons = {
  temp: RiTempHotLine,
  sunset: BsSunset,
  sunrise: BsSunrise,
  wind: WiStrongWind,
  cloud: AiFillCloud,
};
export const WeatherObject = {
  Cloud: HiCloud,
  Sun: BsSunFill,
  Wind: WiStrongWind,
  Snow: BsSnow,
  RainyCloud: BsFillCloudSnowFill,
  Moon: BsMoonFill,
};

export const CurrentWeatherIcon = ({
  currentWeather,
}: {
  currentWeather: CurrentWeather;
}) => {
  const { Cloud, Sun, Wind, Snow, Moon } = WeatherObject;

  return (
    <div className='CurrentWeatherIconContainer'>
      <Clouds cloudity={30} />
      <Sun className='sun' />
    </div>
  );
};

const Clouds = ({ cloudity }: { cloudity: number }) => {
  const [amountOfClouds] = useState(Math.floor(cloudity / 25));
  const Cloud = WeatherObject.Cloud;
  if (!amountOfClouds) return;
  const Clouds = new Array(amountOfClouds).map((_, i) => {
    return Cloud({});
  });
  return <>{Clouds}</>;
};
