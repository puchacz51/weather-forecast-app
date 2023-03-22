import { motion, useAnimation } from 'framer-motion';
import { BsSunFill } from 'react-icons/bs';
import { WiMoonAltNew } from 'react-icons/wi';
import { dataForWeather } from './data5';
import { useEffect, useRef } from 'react';
import './fiveDaysWeatherCard.scss';
const SunMoonCircle = () => {
  const animation = useAnimation();
  const rotateDeg = useRef(180);
  useEffect(() => {
    animation
      .start({
        rotate: rotateDeg.current,
        transition: {
          repeat: Infinity,
          duration: 2,
        },
      })
      .then(() => (rotateDeg.current += 180));
  }, []);

  return (
    <motion.div
      animate={animation}
      initial={{
        position: 'absolute',
        width: '130%',
        top: '50%',
        left: '50%',
        translateX: '-50%',
        aspectRatio: '1',
      }}
      className='sunMoonContainer'>
      <WiMoonAltNew className='moon icon' />
      <BsSunFill className='sun icon' />
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
