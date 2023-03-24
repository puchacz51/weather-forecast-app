import { useEffect, useRef, useState } from 'react';
import { HiCloud } from 'react-icons/hi';
import { motion, useAnimation } from 'framer-motion';
import { Precipitation } from './Rain';

type CloudProps = {
  top: number;
  left: number;
  size: number;
  from?: 'left' | 'right' | 'top';
};
const cloudStartPostion = {
  left: {
    left: '110%',
    top: '53%',
  },
  right: {
    left: '-10%',
    top: '53%',
  },
  top: { left: '50%', top: '110%' },
};

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



export const RainyCloud = ({ top, left, size, from = 'left' }: CloudProps) => {
  const animation = useAnimation();
  const cloudRef = useRef(null);
  const [, setRefresh] = useState(false);
  useEffect(() => {
    animation
      .start({
        left: left + '%',
        top: top + '%',
        transition: { duration: 1 },
      })
      .then(() => setRefresh((state) => !state));
  }, []);

  return (
    <motion.div
      ref={cloudRef}
      initial={{
        ...cloudStartPostion[from],
        fontSize: size + '%',
      }}
      animate={animation}
      className='weatherIconContainer cloud'>
      <HiCloud />
      <Precipitation cloud={cloudRef} />
    </motion.div>
  );
};