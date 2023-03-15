import { RiTempHotLine } from 'react-icons/ri';
import { BsSunrise, BsSunset } from 'react-icons/bs';
import { WiStrongWind } from 'react-icons/wi';
import { AiFillCloud } from 'react-icons/ai';
import { Clouds, WeatherObject } from './skyIcons';
import { useWeatherContext } from '../utilities/WeatherContext';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import puddle from './puddle.svg';
import { Tree, Trees } from './groundIcons';
type IconProps = {
  children?: React.ReactNode | React.ReactNode[];
};

const IconBackGround: React.FC<IconProps> = ({ children }) => {
  const {
    sys: { sunrise, sunset },
  } = useWeatherContext().weather;

  const classes: string[] = ['CurrentWeatherIconContainer'];
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

const GroundElement = () => {
  const {
    main: { rain, snow, temp },
  } = useWeatherContext().weather;
  const GroundIcon = null;
  if (!rain && !snow) return <></>;
  if (temp > 0) return;

  <motion.div></motion.div>;
};

export const CurrentWeatherIcon = () => {
  const { Cloud, Sun, Wind, Snow, Moon } = WeatherObject;
  const skyRef = useRef<HTMLDivElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);
  useEffect(() => {}, []);

  return (
    <IconBackGround>
      <div ref={skyRef} className='sky'>
        <Clouds cloudity={5} />
        <Sun />
      </div>
      <div ref={groundRef} className='ground'>
        <Trees amount={4} />
      </div>
    </IconBackGround>
  );
};
