import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';
import {
  BsFillCloudSnowFill,
  BsMoonFill,
  BsSnow,
  BsSunFill,
} from 'react-icons/bs';
import { WiRaindrop, WiStrongWind } from 'react-icons/wi';
import { HiCloud } from 'react-icons/hi';
import './icons.scss';
export { BsSunFill } from 'react-icons/bs';

const Sun = () => {
  const [sunClasses, setSunClasses] = useState(['sun']);
  useEffect(() => {
    setSunClasses([...sunClasses, 'sunStart']);
  }, []);

  return <BsSunFill className={sunClasses.join(' ')} />;
};

export const WeatherObject = {
  Cloud: ({ className }: any) => (
    <motion.div>
      <HiCloud />
    </motion.div>
  ),
  Sun: Sun,
  Wind: WiStrongWind,
  Snow: BsSnow,
  RainyCloud: BsFillCloudSnowFill,
  Moon: BsMoonFill,
  RainDrop: WiRaindrop,
};
