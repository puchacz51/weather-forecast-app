import { RiWindyFill } from 'react-icons/ri';
import { Clouds, Moon, Sun, WeatherObject, Wind } from './skyIcons';
import { useWeatherContext } from '../utilities/WeatherContext';
import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { PrecipitationResult, Trees } from './groundIcons';

type IconProps = {
  children?: React.ReactNode | React.ReactNode[];
};

const IconBackGround: React.FC<IconProps> = ({ children }) => {
  const { isNight } = useWeatherContext().iconParams;
  return (
    <div className={`CurrentWeatherIconContainer ${isNight && 'night'}`}>
      {children}
    </div>
  );
};

export const CurrentWeatherIcon = () => {
  const skyRef = useRef<HTMLDivElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);
  const { isNight,isSnowy } = useWeatherContext().iconParams;

  useEffect(() => {}, []);
  return (
    <IconBackGround>
      <Wind />
      <div ref={skyRef} className='sky'>
        <Clouds />
        {isNight ? <Moon /> : <Sun />}
      </div>
      <div ref={groundRef} className={`ground ${isSnowy&&'snow'}`}>
        <Trees amount={10} />
        <PrecipitationResult />
      </div>
    </IconBackGround>
  );
};
