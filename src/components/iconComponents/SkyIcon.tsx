import { motion, useAnimation } from 'framer-motion';
import { BsSunFill } from 'react-icons/bs';
import { WiMoonAltNew } from 'react-icons/wi';
import { useState, useEffect } from 'react';
import { useWaetherIconContext } from '../../utilities/WeatherContext';
import { CloudsContainer } from './Clouds';
import { RiWindyFill } from 'react-icons/ri';

export const SunMoonCircle = () => {
  const { isNight } = useWaetherIconContext();

  const [rotate, setRotate] = useState(isNight ? 0 : 90);
  const [prevIsNight, setPrevIsNIght] = useState(isNight);
  useEffect(() => {
    if (isNight != prevIsNight) {
      setPrevIsNIght(isNight);
      setRotate((deg) => deg + 90);
    }
  }, [isNight]);
  return (
    <motion.div
      animate={{
        rotate: rotate,
        transition: {
          duration: 2,
        },
      }}
      initial={{
        position: 'absolute',
        width: '150%',
        top: '45%',
        left: '50%',
        translateX: '-50%',
        aspectRatio: '1',
      }}
      className='sunMoonContainer sky'
      style={{ left: '50%', top: 0 }}>
      <div className='moonContainer' style={{ left: '50%', top: 0 }}>
        <WiMoonAltNew className='moon' />
      </div>
      <div className='sunContainer' style={{ left: '100%', top: '50%' }}>
        <BsSunFill className='sun' />
      </div>
      <div className='moonContainer' style={{ left: '50%', top: '100%' }}>
        <WiMoonAltNew className='moon' />
      </div>
      <div className='sunContainer' style={{ left: 0, top: '50%' }}>
        <BsSunFill className='sun' />
      </div>
    </motion.div>
  );
};

export const Wind = () => {
  const { windSpeed } = useWaetherIconContext();
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

export const SkyIcon = () => {
  return (
    <div className='skyIcon '>
      <SunMoonCircle />
      <CloudsContainer />
    </div>
  );
};
