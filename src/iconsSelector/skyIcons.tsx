import { motion, useAnimation, useTransform } from 'framer-motion';

import { useEffect, useRef, useState } from 'react';
import {
  BsFillCloudSnowFill,
  BsMoonFill,
  BsSnow,
  BsSunFill,
} from 'react-icons/bs';
import { WiRaindrop, WiStrongWind } from 'react-icons/wi';
import './icons.scss';
import { RainyCloud } from './Clouds';
export { BsSunFill } from 'react-icons/bs';

export const Clouds = ({ cloudity }: { cloudity: number }) => {
  const [amountOfClouds] = useState(Math.round((cloudity + 10) / 25));

  const Cloud = WeatherObject.Cloud;
  if (amountOfClouds === 0) return <></>;
  if (amountOfClouds === 1) return <RainyCloud />;
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

const Sun = () => {
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

export const WeatherObject = {
  Cloud: BsFillCloudSnowFill,
  Sun: Sun,
  Wind: WiStrongWind,
  Snow: BsSnow,
  RainyCloud: BsFillCloudSnowFill,
  Moon: BsMoonFill,
  RainDrop: WiRaindrop,
};
