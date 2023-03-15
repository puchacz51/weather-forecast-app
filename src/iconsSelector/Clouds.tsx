import { useEffect, useRef, useState } from 'react';
import { HiCloud } from 'react-icons/hi';
import { motion, useAnimation } from 'framer-motion';
import { Rain } from './Rain';

export const CloudsType1 = () => {
  const animation = useAnimation();
  useEffect(() => {
    animation.start({
      left: '52%',
      top: '55%',
      transition: { duration: 1.5 },
    });
  });

  return (
    <motion.div
      initial={{ left: '110%', fontSize: 60, top: '55%' }}
      whileHover={{ top: '53%' }}
      animate={animation}
      className='weatherIconContainer cloud'>
      <HiCloud />
    </motion.div>
  );
};
export const RainyCloud = () => {
  const animation = useAnimation();
  const [rain, setrain] = useState(false);
  const cloudRef = useRef(null);
  useEffect(() => {
    animation.start({ left: '52%', top: '55%', transition: { duration: 1 } });
    setTimeout(() => {
      setrain(true);
    }, 1000);
  });
  return (
    <motion.div
      ref={cloudRef}
      initial={{
        left: '110%',
        fontSize: 50,
        top: '53%',
        height: '50%',
      }}
      whileHover={{ top: '52%' }}
      animate={animation}
      className='weatherIconContainer cloud'>
      <HiCloud />
      <Rain cloud={cloudRef} />
    </motion.div>
  );
};
