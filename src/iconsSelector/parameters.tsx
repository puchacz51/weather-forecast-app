import { RiTempHotLine } from 'react-icons/ri';
import { BsSunrise, BsSunset } from 'react-icons/bs';
import { WiStrongWind } from 'react-icons/wi';
import { RiWindyFill } from 'react-icons/ri';
import { AiFillCloud } from 'react-icons/ai';
import { Clouds, WeatherObject } from './skyIcons';
import { useWeatherContext } from '../utilities/WeatherContext';
import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import puddle from './puddle.svg';
import { Trees } from './groundIcons';

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

const Wind = () => {
  const animation = useAnimation();
  useEffect(() => {
    animation.start({
      transition: {
        duration: 2,
        delay: 1,
        repeat: Infinity,
        repeatType: 'loop',
        
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
        width: '5%',
        right: '100%',
        top: '50%',
        translateY: '-50%',
      }}>
      <RiWindyFill className='wind' />
    </motion.div>
  );
};

export const CurrentWeatherIcon = () => {
  const { Cloud, Sun, Snow, Moon } = WeatherObject;
  const skyRef = useRef<HTMLDivElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);
  useEffect(() => {}, []);

  return (
    <IconBackGround>
      <Wind />
      <div ref={skyRef} className='sky'>
        <Clouds cloudity={5} />
        <Sun />
      </div>
      <div ref={groundRef} className='ground'>
        <Trees amount={10} />
      </div>
    </IconBackGround>
  );
};
