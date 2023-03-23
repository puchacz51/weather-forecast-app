import { motion, useAnimation } from 'framer-motion';
import { BsSunFill } from 'react-icons/bs';
import { WiMoonAltNew } from 'react-icons/wi';
import { dataForWeather } from './data5';
import { useEffect, useRef, useState } from 'react';
import './fiveDaysWeatherCard.scss';
const SunMoonCircle = () => {
  const [rotate, setRotate] = useState(0);
  return (
    <motion.div
      animate={{
        rotate: rotate,
        transition: {
          duration: 2,
        },
      }}
      onClick={() => setRotate((state) => state + 90)}
      initial={{
        position: 'absolute',
        width: '150%',
        top: '45%',
        left: '50%',
        translateX: '-50%',
        aspectRatio: '1',
      }}
      className='sunMoonContainer'>
      <WiMoonAltNew className='moon icon' style={{ left: '50%', top: 0 }} />
      <BsSunFill className='sun icon ' style={{ left: '100%', top: '50%' }} />
      <WiMoonAltNew
        className='moon icon'
        style={{ left: '50%', top: '100%' }}
      />
      <BsSunFill className='sun icon ' style={{ left: 0, top: '50%' }} />
    </motion.div>
  );
};

export const FiveDaysWeatherCard = () => {
  const weather = dataForWeather;

  return (
    <div className='fiveDaysWeatherCard'>
      <SunMoonCircle />
    </div>
  );
};
