import { motion } from 'framer-motion';
import { BsSunFill } from 'react-icons/bs';
import { WiMoonAltNew } from 'react-icons/wi';
import { useState, useEffect } from 'react';
import { useFiveDaysWeatherContext } from '../../utilities/WeatherContext';

export const SunMoonCircle = () => {
  const { isNight } = useFiveDaysWeatherContext().iconParams;
  const [rotate, setRotate] = useState(isNight ? 90 : 0);
  const [prevIsNight, setPrevIsNIght] = useState(isNight);
  useEffect(() => {
    if (isNight != prevIsNight) {
      console.log(prevIsNight, isNight);
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
      // onClick={() => setRotate((state) => state + 90)}

      initial={{
        position: 'absolute',
        width: '150%',
        top: '45%',
        left: '50%',
        translateX: '-50%',
        aspectRatio: '1',
      }}
      className='sunMoonContainer'>
      <WiMoonAltNew className='moon' style={{ left: '50%', top: 0 }} />
      <BsSunFill className='sun' style={{ left: '100%', top: '50%' }} />
      <WiMoonAltNew className='moon' style={{ left: '50%', top: '100%' }} />
      <BsSunFill className='sun' style={{ left: 0, top: '50%' }} />
    </motion.div>
  );
};
