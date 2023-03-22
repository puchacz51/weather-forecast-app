import { motion, useAnimation, useTransform } from 'framer-motion';

import { useEffect, useRef, useState } from 'react';
import {
  BsFillCloudSnowFill,
  BsMoonFill,
  BsSnow,
  BsSunFill,
} from 'react-icons/bs';
import { WiMoonAltNew, WiRaindrop, WiStrongWind } from 'react-icons/wi';
import './icons.scss';
import { RainyCloud } from './Clouds';
import { useWeatherContext } from '../utilities/WeatherContext';
import { RiWindyFill } from 'react-icons/ri';
export { BsSunFill } from 'react-icons/bs';

export const Moon = () => {
  const animation = useAnimation();
  useEffect(() => {
    animation.start({
      top: '40%',
      transition: { duration: 1, staggerDirection: -1 },
      rotate: '180deg',
      translate: '-50% -50%',
      transformOrigin: '50%  50%',
    });
  }, []);
  const sunRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      whileHover={{
        rotate: 360,
        transition: { duration: 2, staggerDirection: -1 },
      }}
      ref={sunRef}
      animate={animation}
      className='weatherIconContainer moonContainer'>
      <WiMoonAltNew />
    </motion.div>
  );
};

export const Sun = () => {
  const animation = useAnimation();
  useEffect(() => {
    animation.start({
      top: '40%',
      transition: { duration: 1, staggerDirection: -1 },
      rotate: '180deg',
      translate: '-50% -50%',
      transformOrigin: '50%  50%',
    });
  }, []);
  const sunRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      whileHover={{
        rotate: 360,
        transition: { duration: 2, staggerDirection: -1 },
      }}
      ref={sunRef}
      animate={animation}
      className='weatherIconContainer sunContainer'>
      <BsSunFill />
    </motion.div>
  );
};
export const Clouds = () => {
  const { cloudity } = useWeatherContext().iconParams;
  const [amountOfClouds] = useState(Math.round((cloudity + 12) / 33));
  const cloudSize = ((cloudity + 12) / (amountOfClouds * 33)) * 60;
  if (amountOfClouds === 0) return <></>;
  if (amountOfClouds === 1)
    return <RainyCloud left={53} top={51} size={cloudSize + 5} />;
  if (amountOfClouds === 2)
    return (
      <div className='cloudsContainer'>
        <RainyCloud left={53} top={53} size={cloudSize + 10} from='right' />
        <RainyCloud left={47} top={49} size={cloudSize + 10} />
      </div>
    );
  else
    return (
      <div className='cloudsContainer'>
        <RainyCloud left={53} top={50} size={cloudSize + 20} from='right' />
        <RainyCloud left={47} top={47} size={cloudSize + 20} from='top' />
        <RainyCloud left={50} top={42} size={cloudSize + 20} />
      </div>
    );
};

export const Wind = () => {
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
  if (windSpeed < 2) return <></>;
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

export const WeatherObject = {
  Cloud: BsFillCloudSnowFill,
  Sun: Sun,
  Wind: WiStrongWind,
  Snow: BsSnow,
  RainyCloud: BsFillCloudSnowFill,
  Moon: BsMoonFill,
  RainDrop: WiRaindrop,
};
