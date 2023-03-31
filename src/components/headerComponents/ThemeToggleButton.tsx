import '../../Header.scss';
import { useState } from 'react';
import { motion } from 'framer-motion';
export const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(false);
  const switchOnAnimation = {
    backgroundColor: '#00ccff',
    translateX: '100%',
    transition: {
      duration: 0.5,
    },
  };
  const switchOFFAnimation = {
    backgroundColor: '#3cff00',
    translateX: '0%',
    transition: {
      duration: 0.5,
    },
  };

  const toggleSwitch = () => {
    setIsOn((isOn) => !isOn);
  };

  return (
    <div className='switchContainer'>
      <motion.div
        className='toggleElement'
        onClick={toggleSwitch}
        initial={{
          translateY: '-50%',
          left: 0,
        }}
        animate={isOn ? switchOnAnimation : switchOFFAnimation}></motion.div>
    </div>
  );
};
