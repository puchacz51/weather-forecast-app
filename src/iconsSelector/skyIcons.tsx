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
  const [amountOfClouds] = useState(Math.round((cloudity + 12) / 33));
  const cloudSize = ((cloudity + 12) / (amountOfClouds * 33)) * 60;
  const Cloud = WeatherObject.Cloud;
  console.log(cloudSize);

  if (amountOfClouds === 0) return <></>;
  if (amountOfClouds === 1)
    return <RainyCloud left={53} top={53} size={cloudSize} />;
  if (amountOfClouds === 2)
    return (
      <div className='cloudsContainer'>
        <RainyCloud left={53} top={53} size={cloudSize + 5} from='right' />
        <RainyCloud left={47} top={49} size={cloudSize + 5} />
      </div>
    );
  if (amountOfClouds >= 3)
    return (
      <div className='cloudsContainer'>
        <RainyCloud left={53} top={50} size={cloudSize + 20} from='right' />
        <RainyCloud left={47} top={47} size={cloudSize + 20} from='top' />
        <RainyCloud left={50} top={42} size={cloudSize + 20} />
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
