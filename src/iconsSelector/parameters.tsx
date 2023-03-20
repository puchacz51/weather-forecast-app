import { RiTempHotLine } from 'react-icons/ri';
import { BsSunrise, BsSunset } from 'react-icons/bs';
import { WiStrongWind } from 'react-icons/wi';
import { RiWindyFill } from 'react-icons/ri';
import { AiFillCloud } from 'react-icons/ai';
import { Clouds, Moon, Sun, WeatherObject } from './skyIcons';
import { useWeatherContext } from '../utilities/WeatherContext';
import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { PrecipitationResult, Trees } from './groundIcons';

type IconProps = {
  children?: React.ReactNode | React.ReactNode[];
};

const IconBackGround: React.FC<IconProps> = ({ children }) => {
  // const {
  //   sys: { sunrise, sunset },
  // } = useWeatherContext().weather;
  // const classes: string[] = [''];
  // const currentTime = 1677648999;
  // if (sunrise > currentTime || sunset < currentTime) {
  //   classes.push('night');
  // }
  const { isNight } = useWeatherContext().iconParams;

  return (
    <div className={`CurrentWeatherIconContainer ${isNight && 'night'}`}>
      {children}
    </div>
  );
};
// export const parametersICons = {
//   temp: RiTempHotLine,
//   sunset: BsSunset,
//   sunrise: BsSunrise,
//   wind: WiStrongWind,
//   cloud: AiFillCloud,
// };

const Wind = () => {
  const { windSpeed } = useWeatherContext().iconParams;
  const windSize = Math.max(5, windSpeed / 3);
  const animation = useAnimation();
  useEffect(() => {
    animation.start({
      transition: {
        duration: 20 / windSpeed,
        delay: 1.08,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'linear',
      },
      right: '-5%',
    });
  }, []);
  return (
    <motion.div
      animate={animation}
      initial={{
        position: 'absolute',
        zIndex: 200,
        width: windSize + '%',
        right: '100%',
        top: '50%',
        translateY: '-50%',
      }}>
      <RiWindyFill className='wind' />
    </motion.div>
  );
};

export const CurrentWeatherIcon = () => {
  const skyRef = useRef<HTMLDivElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);
  const { isNight } = useWeatherContext().iconParams;

  useEffect(() => {}, []);
  return (
    <IconBackGround>
      <Wind />
      <div ref={skyRef} className='sky'>
        <Clouds />
        {isNight ? <Moon /> : <Sun />}
      </div>
      <div ref={groundRef} className='ground snow'>
        <Trees amount={10} />
        <PrecipitationResult />
      </div>
    </IconBackGround>
  );
};
