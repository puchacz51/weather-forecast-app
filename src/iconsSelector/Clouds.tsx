import { useEffect, useState } from 'react';
import { HiCloud } from 'react-icons/hi';
import { BsFillDropletFill } from 'react-icons/bs';
import { motion, useAnimation, useTransform } from 'framer-motion';

export const CloudsType1 = () => {
  const animation = useAnimation();
  useEffect(() => {
    animation.start({ left: '52%', top: '55%', transition: { duration: 1 } });
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
export const Rain = ({ rain }: { rain: number }) => {
  const rainDropAmount = 2 + Math.round(rain);
  const animation = useAnimation();
  useEffect(() => {
    animation.start({
      top: '110%',
      transition: { repeat: Infinity },
    });
  });

  return (
    <>
      {Array(rainDropAmount)
        .fill(1)
        .map((_, i) => {
          console.log(i);

          return (
            <motion.div
              className='rain'
              animate={animation}
              initial={{
                top: '60%',
                left: `${50 + i}%`,
                position: 'absolute',
                transitionDelay: `${i}00ms`,
                fontSize: 10,
              }}>
              <BsFillDropletFill />
            </motion.div>
          );
        })}
    </>
  );
};

export const RainyCloud = () => {
  const animation = useAnimation();
  const [rain, setrain] = useState(false);

  useEffect(() => {
    animation.start({ left: '52%', top: '55%', transition: { duration: 1 } });
    setTimeout(() => {
      setrain(true);
    }, 1000);
  });

  return (
    <motion.div
      initial={{ left: '110%', fontSize: 60, top: '55%' }}
      whileHover={{ top: '53%' }}
      animate={animation}
      className='weatherIconContainer cloud'>
      <HiCloud />
      <Rain rain={10} />
    </motion.div>
  );
};
