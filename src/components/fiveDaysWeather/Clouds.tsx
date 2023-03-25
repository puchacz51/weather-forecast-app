import { useEffect, useRef, useState } from 'react';
import { HiCloud } from 'react-icons/hi';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { Precipitation } from '../../currentWeather/Rain';
import { useFiveDaysWeatherContext } from '../../utilities/WeatherContext';
import { getAmountOfClouds } from '../../utilities/getWeatherIconValues';

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

export const RainyCloud = ({ top, left, size, from = 'left' }: CloudProps) => {
  const animation = useAnimation();
  const cloudRef = useRef(null);
  const [i, setRefresh] = useState(false);

  useEffect(() => {
    animation
      .start({
        left: left + '%',
        top: top + '%',
      })
      .then(() => setRefresh((state) => !state));
  }, []);

  useEffect(() => {
    animation.start({ fontSize: size + '%' });
  }, [size]);
  return (
    <motion.div
      ref={cloudRef}
      initial={{
        ...cloudStartPostion[from],
        fontSize: size + '%',
        position: 'absolute',
        translate: '-50% -50%',
        transitionDuration: '.5s',
      }}
      animate={animation}
      exit={{
        fontSize: 0,
      }}
      className='cloud'>
      <HiCloud />
      <Precipitation cloud={cloudRef} />
    </motion.div>
  );
};

export const CloudsContainer = () => {
  const { cloudity } = useFiveDaysWeatherContext().iconParams;
  const cloudAmount = getAmountOfClouds(cloudity);

  return (
    <AnimatePresence>
      {cloudAmount > 0 && (
        <RainyCloud
          key='cloud1'
          left={55}
          top={53}
          size={50 + cloudity / 2.5}
        />
      )}
      {cloudAmount > 1 && (
        <RainyCloud
          key='cloud2'
          left={45}
          top={51}
          size={50 + cloudity / 2}
          from='right'
        />
      )}
      {cloudAmount > 2 && (
        <RainyCloud
          key='cloud3'
          left={50}
          top={50}
          size={50 + cloudity / 1.5}
          from='top'
        />
      )}
    </AnimatePresence>
  );
};
