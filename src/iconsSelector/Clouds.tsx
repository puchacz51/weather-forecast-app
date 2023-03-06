import { useEffect, useRef, useState } from 'react';
import { HiCloud } from 'react-icons/hi';
import { BsFillDropletFill } from 'react-icons/bs';
import { motion, useAnimation, useTransform } from 'framer-motion';

type RainDropProps = {
  delayMs: number;
  leftPosition: number;
};

const RainDrop = ({ delayMs, leftPosition }: RainDropProps) => {
  console.log(leftPosition);

  const animation = useAnimation();
  useEffect(() => {
    animation.start({
      top: '110%',
      left: leftPosition + 'px',
      transition: { repeat: Infinity, duration: 1, delay: delayMs / 10 },
    });
  });

  return (
    <>
      <motion.div
        className='rainDrop'
        animate={animation}
        initial={{
          top: '60%',
          left: leftPosition + 'px',
          position: 'absolute',
          fontSize: 10,
        }}>
        <BsFillDropletFill />
      </motion.div>
    </>
  );
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
export const Rain = ({
  rain,
  cloud,
}: {
  rain: number;
  cloud: React.MutableRefObject<null> | React.MutableRefObject<HTMLDivElement>;
}) => {
  if (cloud.current == null) return <></>;

  const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = cloud.current;
  const rainDropAmount = 2 + Math.round(rain) > 8 ? 8 : 2 + Math.round(rain);
  const rainStep = Math.floor(offsetWidth / rainDropAmount);
  console.log(offsetLeft, offsetTop, offsetWidth, offsetHeight, rainStep);

  return (
    <>
      {Array(rainDropAmount)
        .fill(5)
        .map((_, i) => (
          <RainDrop
            delayMs={i * Math.random() * 10}
            leftPosition={i * rainStep}
          />
        ))}
    </>
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
      initial={{ left: '110%', fontSize: 60, top: '55%' }}
      whileHover={{ top: '53%' }}
      animate={animation}
      className='weatherIconContainer cloud'>
      <HiCloud />
      <Rain rain={10} cloud={cloudRef} />
    </motion.div>
  );
};
